#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "..", "docs", "seo-remediation", "phase-10-lighthouse");

const targets = process.argv.slice(2);
const files = fs
  .readdirSync(dir)
  .filter((f) => /-(mobile|desktop)\.json$/.test(f))
  .filter((f) => targets.length === 0 || targets.some((t) => f.includes(t)))
  .sort();

for (const file of files) {
  let lh;
  try {
    lh = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  } catch {
    continue;
  }
  const a = lh.audits ?? {};
  console.log(`\n### ${file}`);

  // LCP element
  const lcpEl = a["largest-contentful-paint-element"];
  if (lcpEl?.details?.items) {
    for (const grp of lcpEl.details.items) {
      if (grp.node) console.log(`  LCP node: ${grp.node.snippet?.slice(0, 140)}`);
      if (grp.items) {
        for (const p of grp.items) {
          if (p.phase) console.log(`    ${p.phase}: ${Math.round(p.timing)}ms`);
        }
      }
    }
  }

  // Critical request chains / render-blocking
  const rb = a["render-blocking-resources"];
  if (rb?.details?.items?.length) {
    console.log(`  render-blocking:`);
    for (const it of rb.details.items) {
      console.log(`    ${it.url?.slice(-60)} — ${Math.round(it.wastedMs || 0)}ms ${Math.round((it.totalBytes||0)/1024)}kb`);
    }
  }

  // Network requests at document start (first few by end time)
  const netReq = a["network-requests"];
  if (netReq?.details?.items?.length) {
    const items = netReq.details.items
      .filter((i) => i.resourceType === "Script" || i.resourceType === "Document" || i.resourceType === "Font" || i.resourceType === "Stylesheet")
      .slice(0, 12);
    console.log(`  key requests:`);
    for (const it of items) {
      const size = Math.round((it.transferSize || 0) / 1024);
      console.log(`    [${it.resourceType}] ${String(it.url).slice(-55)} ${size}kb`);
    }
  }
}
