#!/usr/bin/env node
/**
 * Focused PSI checker — runs given URLs N times per strategy and reports the
 * median LCP/score to cut through PSI run-to-run variance.
 *
 * Usage: node scripts/psi-check.mjs <runs> <url1> [url2...]
 */
import { loadEnvLocal } from "./load-env-local.mjs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
loadEnvLocal(path.join(__dirname, ".."));

const PSI_API = "https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed";
const args = process.argv.slice(2);
const runs = parseInt(args[0], 10) || 3;
const urls = args.slice(1);
const strategies = ["mobile", "desktop"];

function median(nums) {
  const s = nums.filter((n) => n != null).sort((a, b) => a - b);
  if (!s.length) return null;
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : Math.round((s[m - 1] + s[m]) / 2);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Canonical host is www — apex 301s and inflates LCP ~780ms in PSI. */
function canonicalUrl(url) {
  try {
    const u = new URL(url);
    if (u.hostname === "kinexisdigital.com") u.hostname = "www.kinexisdigital.com";
    return u.toString();
  } catch {
    return url;
  }
}

async function runOnce(url, strategy) {
  const canonical = canonicalUrl(url);
  const u = new URL(PSI_API);
  u.searchParams.set("url", canonical);
  u.searchParams.set("strategy", strategy);
  u.searchParams.set("category", "performance");
  if (process.env.GOOGLE_PSI_API_KEY) u.searchParams.set("key", process.env.GOOGLE_PSI_API_KEY);
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(u, { headers: { Accept: "application/json" } });
    if (res.ok) {
      const data = await res.json();
      const lr = data.lighthouseResult;
      const a = lr?.audits ?? {};
      return {
        score: lr?.categories?.performance?.score != null ? Math.round(lr.categories.performance.score * 100) : null,
        lcp: a["largest-contentful-paint"]?.numericValue ?? null,
        fcp: a["first-contentful-paint"]?.numericValue ?? null,
        tbt: a["total-blocking-time"]?.numericValue ?? null,
        cls: a["cumulative-layout-shift"]?.numericValue ?? null,
        si: a["speed-index"]?.numericValue ?? null,
      };
    }
    await sleep(3000);
  }
  return null;
}

for (const url of urls) {
  console.log(`\n=== ${url} ===`);
  for (const strategy of strategies) {
    const results = [];
    for (let i = 0; i < runs; i++) {
      const r = await runOnce(url, strategy);
      if (r) results.push(r);
      await sleep(1200);
    }
    if (!results.length) {
      console.log(`  ${strategy}: all runs failed`);
      continue;
    }
    const mScore = median(results.map((r) => r.score));
    const mLcp = median(results.map((r) => r.lcp));
    const mFcp = median(results.map((r) => r.fcp));
    const mTbt = median(results.map((r) => r.tbt));
    const mSi = median(results.map((r) => r.si));
    const mCls = median(results.map((r) => Math.round((r.cls ?? 0) * 1000)));
    const scores = results.map((r) => r.score).join("/");
    console.log(
      `  ${strategy}: score~${mScore} (${scores}) LCP~${mLcp} FCP~${mFcp} TBT~${mTbt} SI~${mSi} CLS~${(mCls / 1000).toFixed(3)}`
    );
  }
}
