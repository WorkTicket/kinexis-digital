/**
 * Representative mobile Lighthouse run using the repo's lighthouse dependency.
 * Usage: node scripts/lighthouse-budget.mjs [baseUrl]
 * Default baseUrl: http://127.0.0.1:3000
 */
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";

const base = (process.argv[2] || "http://127.0.0.1:3000").replace(/\/$/, "");
const paths = ["/", "/pricing", "/portfolio", "/contact"];
const budgets = { performance: 0.85, accessibility: 0.9, "best-practices": 0.9, seo: 0.9 };

const chrome = await launch({ chromeFlags: ["--headless", "--no-sandbox"] });
let failed = false;
try {
  for (const path of paths) {
    const url = `${base}${path}`;
    const result = await lighthouse(url, {
      port: chrome.port,
      output: "json",
      onlyCategories: Object.keys(budgets),
      formFactor: "mobile",
      screenEmulation: { mobile: true, width: 412, height: 915, deviceScaleFactor: 2.625, disabled: false },
    });
    const cats = result?.lhr?.categories ?? {};
    console.log(`\n${url}`);
    for (const [id, min] of Object.entries(budgets)) {
      const score = cats[id]?.score ?? 0;
      const ok = score >= min;
      if (!ok) failed = true;
      console.log(`  ${id}: ${score.toFixed(2)} (budget ${min}) ${ok ? "OK" : "FAIL"}`);
    }
  }
} finally {
  await chrome.kill();
}
process.exit(failed ? 1 : 0);
