/**
 * Guardrail from the high-intent SEO plan:
 * meta descriptions 120–155 chars; no title contains "Kinexis" twice.
 */
import fs from "node:fs";

const files = [
  "src/lib/pages.ts",
  "src/data/industries.ts",
  "src/lib/content.ts",
  "src/i18n/industries-es.ts",
];

const failures = [];

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  for (const match of text.matchAll(/(?:metaDescription|description|excerpt):\s*"((?:\\.|[^"\\])*)"/g)) {
    const value = match[1].replace(/\\"/g, '"');
    // Skip short card/excerpt noise under 80 chars in industries cards etc. by requiring metaDescription or pages description keys nearby
    if (match[0].startsWith("excerpt:") && value.length < 100) continue;
    if (match[0].startsWith("description:") && !file.includes("pages.ts") && !file.includes("industries")) continue;
    if (value.length > 0 && (value.length < 120 || value.length > 155)) {
      // Allow intentionally short page crumbs/service blurbs in pages.ts non-description fields — already filtered
      if (match[0].includes("metaDescription") || (file.includes("pages.ts") && match[0].startsWith("description:"))) {
        failures.push(`${file}: length ${value.length} → ${value}`);
      }
      if (match[0].startsWith("excerpt:") && value.length > 155) {
        failures.push(`${file}: excerpt length ${value.length} → ${value.slice(0, 80)}…`);
      }
    }
  }
  for (const match of text.matchAll(/(?:metaTitle|seoTitle|title):\s*"((?:\\.|[^"\\])*)"/g)) {
    const value = match[1];
    const count = (value.match(/Kinexis/g) || []).length;
    if (count > 1) failures.push(`${file}: Kinexis×${count} → ${value}`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("meta length / brand checks passed");
