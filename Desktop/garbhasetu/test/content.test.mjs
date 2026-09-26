import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function messages(locale) {
  return JSON.parse(await readFile(new URL(`messages/${locale}.json`, root), "utf8"));
}

function shape(value) {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, shape(child)]));
  }
  return typeof value;
}

function placeholders(value, path = "", result = {}) {
  if (typeof value === "string") {
    result[path] = [...value.matchAll(/\{([a-zA-Z][\w]*)\}/g)].map((match) => match[1]).sort();
  } else if (Array.isArray(value)) {
    value.forEach((child, index) => placeholders(child, `${path}[${index}]`, result));
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, child]) => placeholders(child, path ? `${path}.${key}` : key, result));
  }
  return result;
}

test("English and Gujarati messages have the same structure", async () => {
  const [en, gu] = await Promise.all([messages("en"), messages("gu")]);
  assert.deepEqual(shape(gu), shape(en));
  assert.deepEqual(placeholders(gu), placeholders(en));
});

test("translated arrays use stable semantic IDs", async () => {
  const expected = {
    practices: ["reading", "conversation", "creative", "journal"],
    stages: ["antenatal", "labour", "lactation", "postpartum"],
    pillars: ["antenatal", "labour", "lactation", "postpartum"],
    labourPlans: ["counselling", "presence"],
    neoItems: ["neonatal", "binder", "incision"],
    plans: ["anc", "ancPnc", "lactation", "labourOnline", "labourPresence", "incontinence"],
  };

  for (const locale of ["en", "gu"]) {
    const data = await messages(locale);
    assert.deepEqual(data.home.practices.map(({ id }) => id), expected.practices);
    assert.deepEqual(data.home.stages.map(({ id }) => id), expected.stages);
    assert.deepEqual(data.services.pillars.map(({ id }) => id), expected.pillars);
    assert.deepEqual(data.services.labourPlansRich.map(({ id }) => id), expected.labourPlans);
    assert.deepEqual(data.services.neoItemsRich.map(({ id }) => id), expected.neoItems);
    assert.deepEqual(data.packages.plans.map(({ id }) => id), expected.plans);
  }
});

test("published offline package arithmetic stays consistent", async () => {
  const source = await readFile(new URL("lib/site.ts", root), "utf8");
  const value = (name) => Number(source.match(new RegExp(`${name}:\\s*(\\d+)`))?.[1]);
  const sessions = value("offlineSessions");
  const perSession = value("perSession");
  const list = value("offlineList");
  const pay = value("offlinePay");
  const discount = value("discountPercent");

  assert.equal(sessions * perSession, pay);
  assert.equal(list * (1 - discount / 100), pay);
});
