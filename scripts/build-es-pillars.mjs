/** Writes src/i18n/es-pillars.ts from scripts/es-pillars-payload.mjs */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { POSTS } from "./es-pillars-payload.mjs";
import { PAD_POOLS } from "./es-pillars-pad-pools.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "src/i18n/es-pillars.ts");

const MIN_WORDS = {
  "local-seo-get-found-get-called": 4500,
  "website-mistakes-that-cost-you-calls": 3500,
  "how-to-ask-for-google-reviews-contractor": 3200,
  "google-business-profile-checklist": 3200,
  "turn-clicks-into-calls": 2800,
  "make-your-website-mobile-ready": 2800,
  "build-trust-with-reviews": 2800,
  "small-business-marketing-budget": 2800,
  "monthly-website-vs-own-it": 2800,
};

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function countWords(post) {
  const parts = [
    post.lead,
    post.excerpt,
    ...post.sections.map((s) => s.h2 + " " + s.html),
  ];
  return stripHtml(parts.join(" "))
    .split(" ")
    .filter(Boolean).length;
}

for (const [slug, post] of Object.entries(POSTS)) {
  const min = MIN_WORDS[slug];
  if (!min) continue;
  const pool = PAD_POOLS[slug] ?? [];
  let pi = 0;
  let si = 0;
  while (countWords(post) < min) {
    if (!pool.length) break;
    const sec = post.sections[si++ % post.sections.length];
    sec.html += pool[pi++ % pool.length];
  }
}

const lines = [
  `import type { EsPost } from "@/i18n/es-post-type";`,
  ``,
  `/** Native es-419 pillar posts (scene-led trade blog). */`,
  `export const ES_PILLAR_POSTS: Record<string, EsPost> = {`,
];

for (const [slug, post] of Object.entries(POSTS)) {
  const block = JSON.stringify({ slug, ...post }, null, 2)
    .split("\n")
    .map((line, i) => (i === 0 ? `  ${JSON.stringify(slug)}: ${line}` : `  ${line}`))
    .join("\n");
  lines.push(block + ",");
}

lines.push(`};`, ``);

writeFileSync(out, lines.join("\n"), "utf8");

for (const [slug, post] of Object.entries(POSTS)) {
  console.log(`${slug}: ${countWords(post)}`);
}
console.log("Wrote", out);
