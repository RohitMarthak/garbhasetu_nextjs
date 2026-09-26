import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const publishedAssets = [
  "public/photos/hero-garden-path.webp",
  "public/photos/reading-book-tea.webp",
  "public/photos/food-vegetable-basket.webp",
  "public/photos/conversation-meeting-room.webp",
  "public/illustrations/reading-music.svg",
  "public/illustrations/conversation-support.svg",
  "public/illustrations/journal-path.svg",
  "public/illustrations/nourishment.svg",
];

test("published editorial assets exist and have provenance records", async () => {
  const register = await readFile(new URL("docs/asset-sources.md", root), "utf8");
  for (const path of publishedAssets) {
    await access(new URL(path, root));
    assert.match(register, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `${path} has a register entry`);
  }
});

test("replaced or unapproved photos are outside the public tree", async () => {
  const publicFiles = await Promise.allSettled([
    access(new URL("public/photos/spices.jpg", root)),
    access(new URL("public/photos/meditation.jpg", root)),
    access(new URL("public/photos/lotus.jpg", root)),
    access(new URL("public/photos/family-shared-tea.webp", root)),
  ]);
  assert.ok(publicFiles.every(({ status }) => status === "rejected"));

  for (const path of ["docs/audit-assets/spices.jpg", "docs/audit-assets/meditation.jpg", "docs/audit-assets/lotus.jpg", "docs/audit-assets/candidate-family-shared-tea.webp"]) {
    await access(new URL(path, root));
  }
});

test("local SVG motifs contain no executable or external content", async () => {
  for (const path of publishedAssets.filter((path) => path.endsWith(".svg"))) {
    const source = await readFile(new URL(path, root), "utf8");
    assert.match(source, /<svg\b[^>]*viewBox=/);
    assert.doesNotMatch(source, /<(?:script|foreignObject)\b|\bon\w+=|\b(?:href|src)=/i);
  }
});
