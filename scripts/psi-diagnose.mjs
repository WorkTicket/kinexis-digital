#!/usr/bin/env node
/**
 * Diagnose CLS + LCP for one URL/strategy: prints the CLS value, the
 * layout-shift-elements culprits (snippet + score), the LCP element, and TTFB.
 *
 * Usage: node scripts/psi-diagnose.mjs <url> [mobile|desktop]
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
  console.error("Usage: node scripts/psi-diagnose.mjs <url> [mobile|desktop]");
  process.exit(1);
}

const u = new URL(PSI_API);
u.searchParams.set("url", url);
u.searchParams.set("strategy", strategy);
u.searchParams.set("category", "performance");
if (process.env.GOOGLE_PSI_API_KEY) u.searchParams.set("key", process.env.GOOGLE_PSI_API_KEY);

const res = await fetch(u, { headers: { Accept: "application/json" } });
if (!res.ok) {
  console.error(`PSI ${res.status} ${res.statusText}`);
  process.exit(1);
}
const data = await res.json();
const lr = data.lighthouseResult;
const a = lr?.audits ?? {};

console.log(`\n=== ${url} [${strategy}] ===`);
console.log(
  `score ${Math.round((lr?.categories?.performance?.score ?? 0) * 100)} | ` +
    `LCP ${Math.round(a["largest-contentful-paint"]?.numericValue ?? 0)}ms | ` +
    `FCP ${Math.round(a["first-contentful-paint"]?.numericValue ?? 0)}ms | ` +
    `TBT ${Math.round(a["total-blocking-time"]?.numericValue ?? 0)}ms | ` +
    `SI ${Math.round(a["speed-index"]?.numericValue ?? 0)}ms | ` +
    `CLS ${(a["cumulative-layout-shift"]?.numericValue ?? 0).toFixed(3)}`
);
console.log(`TTFB (server-response-time): ${Math.round(a["server-response-time"]?.numericValue ?? 0)}ms`);

const lcpEl = a["largest-contentful-paint-element"];
console.log(`\n--- LCP element ---`);
const lcpItems = lcpEl?.details?.items ?? [];
for (const item of lcpItems) {
  const nodes = item?.items ?? (item?.node ? [item] : []);
  for (const n of nodes) {
    if (n?.node?.snippet) console.log(`  ${n.node.snippet}`);
    if (n?.node?.nodeLabel) console.log(`    label: ${n.node.nodeLabel}`);
  }
  if (item?.type === "debugdata" && item?.items) {
    for (const phase of item.items) {
      console.log(`  phase:`, JSON.stringify(phase));
    }
  }
}

console.log(`\n--- layout-shift-elements (CLS culprits) ---`);
const shiftItems = a["layout-shift-elements"]?.details?.items ?? [];
if (!shiftItems.length) console.log("  (none reported)");
for (const item of shiftItems) {
  console.log(`  score ${(item.score ?? 0).toFixed(4)}  ${item.node?.snippet ?? ""}`);
  if (item.node?.nodeLabel) console.log(`    label: ${item.node.nodeLabel}`);
}
