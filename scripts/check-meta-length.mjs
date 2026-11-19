/**
 * Guardrail from the high-intent SEO plan + search:notify / search-on-deploy:
 * meta descriptions must be 120–155 chars; no title contains "Kinexis" twice.
 * Industry pages (EN + ES) are included so a long metaDescription cannot ship.
 */
import fs from "node:fs";

const MIN = 120;
const MAX = 155;
const MAX_TITLE = 70;

const files = [
  "src/lib/pages.ts",
  "src/data/industries.ts",
  "src/lib/content.ts",
  "src/i18n/industries-es.ts",
];

const failures = [];
let industryMetaCount = 0;

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  for (const match of text.matchAll(/(?:metaDescription|description|excerpt):\s*"((?:\\.|[^"\\])*)"/g)) {
    const value = match[1].replace(/\\"/g, '"');
    // Skip short card/excerpt noise under 80 chars in industries cards etc. by requiring metaDescription or pages description keys nearby
    if (match[0].startsWith("excerpt:") && value.length < 100) continue;
    if (match[0].startsWith("description:") && !file.includes("pages.ts") && !file.includes("industries")) continue;
    if (value.length > 0 && (value.length < MIN || value.length > MAX)) {
      // Allow intentionally short page crumbs/service blurbs in pages.ts non-description fields — already filtered
      if (match[0].includes("metaDescription") || (file.includes("pages.ts") && match[0].startsWith("description:"))) {
        failures.push(`${file}: length ${value.length} (need ${MIN}–${MAX}) → ${value}`);
      }
      if (match[0].startsWith("excerpt:") && value.length > MAX) {
        failures.push(`${file}: excerpt length ${value.length} (max ${MAX}) → ${value.slice(0, 80)}…`);
      }
    }
    if (match[0].includes("metaDescription") && file.includes("industries")) {
      industryMetaCount += 1;
    }
  }
  for (const match of text.matchAll(/(?:metaTitle|seoTitle|title):\s*"((?:\\.|[^"\\])*)"/g)) {
    const value = match[1];
    const count = (value.match(/Kinexis/g) || []).length;
    if (count > 1) failures.push(`${file}: Kinexis×${count} → ${value}`);
  }
  if (file === "src/lib/content.ts" || file === "src/i18n/es-pillars.ts") {
    for (const match of text.matchAll(/seoTitle["']?\s*:\s*"((?:\\.|[^"\\])*)"/g)) {
      const value = match[1];
      const fullTitle = /Kinexis/i.test(value) ? value : `${value} | Kinexis Digital`;
      if (fullTitle.length > MAX_TITLE) {
        failures.push(`${file}: SEO title length ${fullTitle.length} (max ${MAX_TITLE}) → ${fullTitle}`);
      }
    }
  }
}

// Sanity: both EN and ES industry catalogs must expose metaDescription fields.
if (industryMetaCount < 2) {
  failures.push(`expected industry metaDescription fields in industries catalogs, found ${industryMetaCount}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`meta length / brand checks passed (${industryMetaCount} industry metaDescriptions, ${MIN}–${MAX} chars)`);
