#!/usr/bin/env node
/**
 * Prints the LCP element + LCP timing breakdown for a URL, to localize what the
 * largest-contentful-paint element actually is and where its time goes.
 *
 * Usage: node scripts/psi-lcp.mjs <url> [mobile|desktop]
 */
import { loadEnvLocal } from "./load-env-local.mjs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
loadEnvLocal(path.join(__dirname, ".."));

const PSI_API = "https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed";
const url = process.argv[2];
const strategy = process.argv[3] || "mobile";

if (!url) {
  console.error("Usage: node scripts/psi-lcp.mjs <url> [mobile|desktop]");
  process.exit(1);
}

function textOf(items) {
  if (!Array.isArray(items)) return [];
  return items.map((it) => {
    const node = it.node ?? it;
    return node?.snippet || node?.nodeLabel || node?.selector || JSON.stringify(it).slice(0, 160);
  });
}

const u = new URL(PSI_API);
u.searchParams.set("url", url);
u.searchParams.set("strategy", strategy);
u.searchParams.set("category", "performance");
if (process.env.GOOGLE_PSI_API_KEY) u.searchParams.set("key", process.env.GOOGLE_PSI_API_KEY);

const res = await fetch(u, { headers: { Accept: "application/json" } });
if (!res.ok) {
  console.error(`PSI failed: ${res.status} ${await res.text()}`);
  process.exit(1);
}
const data = await res.json();
const a = data.lighthouseResult?.audits ?? {};

const num = (id) => a[id]?.numericValue;
console.log(`\n=== ${url} (${strategy}) ===`);
console.log(
  `score ${Math.round((data.lighthouseResult?.categories?.performance?.score ?? 0) * 100)} | ` +
    `LCP ${Math.round(num("largest-contentful-paint") ?? 0)}ms | FCP ${Math.round(num("first-contentful-paint") ?? 0)}ms | ` +
    `TBT ${Math.round(num("total-blocking-time") ?? 0)}ms | SI ${Math.round(num("speed-index") ?? 0)}ms`
);

const lcpEl = a["largest-contentful-paint-element"];
if (lcpEl?.details?.items) {
  console.log("\nLCP element:");
  for (const grp of lcpEl.details.items) {
    if (grp.items) console.log("  " + textOf(grp.items).join("\n  "));
    else console.log("  " + textOf([grp]).join("\n  "));
  }
}

const breakdown = a["lcp-breakdown-insight"] || a["lcp-lazy-loaded"];
if (breakdown?.details?.items) {
  console.log("\nLCP breakdown:");
  for (const grp of breakdown.details.items) {
    const sub = grp.items ?? [grp];
    for (const it of sub) {
      const label = it.label || it.phase || it.subpart;
      const val = it.duration ?? it.value ?? it.timing;
      if (label) console.log(`  ${label}: ${typeof val === "number" ? Math.round(val) + "ms" : val ?? ""}`);
    }
  }
}

const opps = Object.values(a)
  .filter((x) => x?.details?.type === "opportunity" && (x.numericValue ?? 0) > 0)
  .sort((x, y) => (y.numericValue ?? 0) - (x.numericValue ?? 0))
  .slice(0, 6);
if (opps.length) {
  console.log("\nTop opportunities:");
  for (const o of opps) console.log(`  ${o.title}: ~${Math.round(o.numericValue)}ms`);
}
