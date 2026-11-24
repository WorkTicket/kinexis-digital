/**
 * 5-word shingle Jaccard on generated trade cost/pages bodies (lead + sections + FAQs).
 * Matches docs/seo/CONTENT-PLAN.md §5.1.
 */
import { bundleServer } from "./bundle-server.mjs";

const mod = await bundleServer(
  "scripts/measure-trade-post-similarity-harness.ts",
  ".tmp-measure-trade-similarity.mjs",
);
const { GENERATED_COST_POSTS, GENERATED_PAGES_POSTS } = mod;

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#?\w+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** @param {{ lead: string; sections: { h2: string; html: string }[]; faqs?: { q: string; a: string }[] }} post */
function bodyText(post) {
  const parts = [post.lead];
  for (const section of post.sections) {
    parts.push(section.h2, section.html);
  }
  for (const faq of post.faqs ?? []) {
    parts.push(faq.q, faq.a);
  }
  return stripHtml(parts.join(" ")).toLowerCase();
}

function shingles(text, wordCount = 5) {
  const words = text.split(/\s+/).filter(Boolean);
  const set = new Set();
  for (let i = 0; i <= words.length - wordCount; i++) {
    set.add(words.slice(i, i + wordCount).join(" "));
  }
  return set;
}

function jaccardPercent(a, b) {
  if (a.size === 0 && b.size === 0) return 100;
  let inter = 0;
  for (const token of a) {
    if (b.has(token)) inter += 1;
  }
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : (inter / union) * 100;
}

function seriesStats(label, postsBySlug) {
  const slugs = Object.keys(postsBySlug).sort();
  const keyed = slugs.map((slug) => ({
    slug,
    shingles: shingles(bodyText(postsBySlug[slug])),
  }));

  const pairRows = [];
  for (let i = 0; i < keyed.length; i++) {
    for (let j = i + 1; j < keyed.length; j++) {
      const sim = jaccardPercent(keyed[i].shingles, keyed[j].shingles);
      pairRows.push({ a: keyed[i].slug, b: keyed[j].slug, sim });
    }
  }

  const sims = pairRows.map((p) => p.sim);
  const avg = sims.reduce((sum, v) => sum + v, 0) / sims.length;
  const min = Math.min(...sims);
  const max = Math.max(...sims);
  pairRows.sort((x, y) => y.sim - x.sim);

  console.log(`\n${label}`);
  console.log(`  N articles: ${slugs.length}`);
  console.log(`  Pairs: ${pairRows.length}`);
  console.log(`  Avg: ${avg.toFixed(1)}%`);
  console.log(`  Min: ${min.toFixed(1)}%`);
  console.log(`  Max: ${max.toFixed(1)}%`);
  console.log("  Highest pairs:");
  for (const row of pairRows.slice(0, 3)) {
    console.log(`    ${row.a} ↔ ${row.b}: ${row.sim.toFixed(1)}%`);
  }

  return { n: slugs.length, avg, min, max };
}

const cost = seriesStats("Cost (*-website-cost)", GENERATED_COST_POSTS);
const pages = seriesStats("Pages (*-website-pages)", GENERATED_PAGES_POSTS);

console.log("\nSummary (for CONTENT-PLAN T3/T4):");
console.log(`  Cost avg: ${cost.avg.toFixed(1)}% (min ${cost.min.toFixed(1)}%, max ${cost.max.toFixed(1)}%, N=${cost.n})`);
console.log(`  Pages avg: ${pages.avg.toFixed(1)}% (min ${pages.min.toFixed(1)}%, max ${pages.max.toFixed(1)}%, N=${pages.n})`);