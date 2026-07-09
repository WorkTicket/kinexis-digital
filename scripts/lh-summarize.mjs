#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "..", "docs", "seo-remediation", "phase-10-lighthouse");

const files = fs
  .readdirSync(dir)
  .filter((f) => /-(mobile|desktop)\.json$/.test(f))
  .sort();

function ms(v) {
  return v == null ? "-" : Math.round(v);
}

for (const file of files) {
  let lh;
  try {
    lh = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  } catch {
    console.log(`\n### ${file} — PARSE ERROR`);
    continue;
  }
  const a = lh.audits ?? {};
  const score = lh.categories?.performance?.score;
  const lcp = a["largest-contentful-paint"]?.numericValue;
  const fcp = a["first-contentful-paint"]?.numericValue;
  const tbt = a["total-blocking-time"]?.numericValue;
  const cls = a["cumulative-layout-shift"]?.numericValue;
  const si = a["speed-index"]?.numericValue;
  const ttfb = a["server-response-time"]?.numericValue;

  console.log(`\n### ${file}`);
  console.log(
    `score=${score != null ? Math.round(score * 100) : "-"} LCP=${ms(lcp)} FCP=${ms(fcp)} TBT=${ms(tbt)} CLS=${cls?.toFixed(3) ?? "-"} SI=${ms(si)} TTFB=${ms(ttfb)}`
  );

  // LCP element
  const lcpEl = a["largest-contentful-paint-element"];
  const node = lcpEl?.details?.items?.[0]?.items?.[0]?.node ?? lcpEl?.details?.items?.[0]?.node;
  if (node) {
    console.log(`  LCP element: <${node.snippet?.slice(0, 120) ?? node.selector}>`);
  }
  // LCP phases
  const phases = a["largest-contentful-paint-element"]?.details?.items?.find((i) => i.items)?.items;
  if (phases) {
    for (const p of phases) {
      if (p.phase) console.log(`    phase ${p.phase}: ${ms(p.timing)} (${p.percent ?? ""})`);
    }
  }

  // Top opportunities & diagnostics with savings
  const opps = Object.entries(a)
    .filter(([, v]) => v && v.details && (v.details.overallSavingsMs || v.details.overallSavingsBytes) && v.score !== 1)
    .map(([id, v]) => ({
      id,
      savingsMs: v.details.overallSavingsMs ?? 0,
      savingsKb: v.details.overallSavingsBytes ? Math.round(v.details.overallSavingsBytes / 1024) : 0,
    }))
    .filter((o) => o.savingsMs > 30 || o.savingsKb > 20)
    .sort((x, y) => y.savingsMs - x.savingsMs);
  for (const o of opps) {
    console.log(`  opp ${o.id}: ${ms(o.savingsMs)}ms ${o.savingsKb}kb`);
  }

  // Failed non-perf-opportunity audits that commonly cost points
  const notable = [
    "render-blocking-resources",
    "unused-javascript",
    "unused-css-rules",
    "unminified-javascript",
    "legacy-javascript",
    "third-party-summary",
    "mainthread-work-breakdown",
    "bootup-time",
    "uses-long-cache-ttl",
    "prioritize-lcp-image",
    "lcp-lazy-loaded",
    "layout-shifts",
    "font-display",
    "uses-responsive-images",
    "modern-image-formats",
    "efficient-animated-content",
    "dom-size",
  ];
  for (const id of notable) {
    const v = a[id];
    if (v && v.score != null && v.score < 0.9 && !opps.find((o) => o.id === id)) {
      const disp = v.displayValue ? ` (${v.displayValue})` : "";
      console.log(`  audit ${id}: score=${v.score.toFixed(2)}${disp}`);
    }
  }
}
