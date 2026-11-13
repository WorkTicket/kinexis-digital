/** One-off builder: writes src/i18n/es-pillars-more.ts from embedded Spanish bodies. */
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { POSTS } from "./es-pillars-more-payload.mjs";

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "src/i18n/es-pillars-more.ts");

const lines = [
  `import type { EsPost } from "@/i18n/es-post-type";`,
  ``,
  `/** Native es-419 pillar bodies (PILLAR_POSTS_MORE slugs). */`,
  `export const ES_PILLAR_POSTS_MORE: Record<string, EsPost> = {`,
];

for (const [slug, post] of Object.entries(POSTS)) {
  lines.push(`  ${JSON.stringify(slug)}: ${JSON.stringify({ slug, ...post }, null, 2).replace(/\n/g, "\n  ").replace(/^  /, "")},`);
}

lines.push(`};`, ``);
writeFileSync(out, lines.join("\n"), "utf8");
console.log("Wrote", out);
