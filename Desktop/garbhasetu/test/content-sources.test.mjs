import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const routes = new Map([
  ["/", "app/[locale]/page.tsx"],
  ["/services", "app/[locale]/services/page.tsx"],
  ["/packages", "app/[locale]/packages/page.tsx"],
  ["/contact", "app/[locale]/contact/page.tsx"],
]);
const categories = new Set(["clinic-material", "cultural-context", "general-health-guidance"]);
const publicationStatuses = new Set(["existing-pending-review", "published", "draft", "excluded"]);
const reviewStates = new Set(["not-applicable", "pending-review", "pending-practitioner-review", "verified-source", "practitioner-reviewed"]);

async function json(path) {
  return JSON.parse(await readFile(new URL(path, root), "utf8"));
}

async function messageValue(locale, key) {
  const data = await json(`messages/${locale}.json`);
  return key.split(".").reduce((value, segment) => value?.[segment], data);
}

function assertUniqueIds(records, label) {
  const ids = records.map(({ id }) => id);
  assert.equal(new Set(ids).size, ids.length, `${label} IDs must be unique`);
}

test("content sources use conservative, public-safe records", async () => {
  const sources = await json("lib/content-sources.json");
  assertUniqueIds(sources, "source");
  assert.deepEqual(new Set(sources.map(({ category }) => category)), categories);

  for (const source of sources) {
    assert.match(source.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(source.title && source.publisher && source.locator && source.accessDate && source.evidence);
    assert.ok(["verified", "pending-verification"].includes(source.verificationStatus));
    assert.ok(source.url || source.documentPath, `${source.id} needs a URL or document path`);
    if (source.url) assert.match(source.url, /^https:\/\//, `${source.id} URL must be HTTPS`);
    if (source.documentPath) {
      assert.match(source.documentPath, /^docs\//, `${source.id} document path must stay private`);
      await access(new URL(source.documentPath, root));
    }
  }

  assert.ok(sources.some(({ id }) => id === "clinic-presentation-2026"));
  assert.ok(sources.some(({ id }) => id === "clinic-garbhasanskar-guide-2026"));
  assert.ok(sources.some(({ id }) => id === "who-antenatal-care-2016"));
  assert.ok(sources.some(({ id }) => id === "acog-exercise-during-pregnancy"));
  assert.ok(sources.some(({ id }) => id === "britannica-samskara-cultural-context-2026"));
});

test("section citations resolve to routes, translations, sources, and real fragments", async () => {
  const [sections, sources] = await Promise.all([json("lib/content-sections.json"), json("lib/content-sources.json")]);
  assertUniqueIds(sections, "section");
  const sourceIds = new Set(sources.map(({ id }) => id));

  for (const section of sections) {
    assert.ok(routes.has(section.route), `${section.id} has an allowed route`);
    assert.ok(publicationStatuses.has(section.publicationStatus), `${section.id} has a valid publication state`);
    assert.ok(section.messageKeys.length && section.sourceIds.length && section.limitations);
    assert.ok(["factual", "cultural", "clinical", "operational"].includes(section.claimCategory));
    for (const sourceId of section.sourceIds) assert.ok(sourceIds.has(sourceId), `${section.id} uses known source ${sourceId}`);
    for (const locale of ["en", "gu"]) {
      for (const key of section.messageKeys) assert.notEqual(await messageValue(locale, key), undefined, `${section.id} key ${key} exists in ${locale}`);
    }
    for (const category of ["factual", "cultural", "clinical", "operational"]) {
      assert.ok(reviewStates.has(section.review[category]), `${section.id} has ${category} review state`);
    }
    if (section.fragment !== null) {
      assert.match(section.fragment, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      const page = await readFile(new URL(routes.get(section.route), root), "utf8");
      assert.match(page, new RegExp(`id=["']${section.fragment}["']`), `${section.id} fragment exists on its route`);
    }
  }
});

test("new published material cannot bypass provenance or practitioner review", async () => {
  const [sections, sources] = await Promise.all([json("lib/content-sections.json"), json("lib/content-sources.json")]);
  const sourceById = new Map(sources.map((source) => [source.id, source]));

  for (const section of sections.filter(({ publicationStatus }) => publicationStatus === "published")) {
    assert.ok(section.sourceIds.every((id) => sourceById.get(id).verificationStatus === "verified"), `${section.id} needs verified source support`);
    if (section.claimCategory === "clinical") {
      assert.equal(section.review.clinical, "practitioner-reviewed", `${section.id} needs practitioner clinical review`);
    }
  }
});
