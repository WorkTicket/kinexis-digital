/**
 * Representative Lighthouse budget run using the repo's lighthouse dependency.
 * Usage:
 *   node scripts/lighthouse-budget.mjs [baseUrl] [--form-factor=mobile|desktop|both]
 * Default baseUrl: http://127.0.0.1:3000
 * Default form-factor: both (mobile then desktop)
 */
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";

const argv = process.argv.slice(2);
const formArg = argv.find((a) => a.startsWith("--form-factor="));
const formFactorChoice = (formArg?.split("=")[1] || "both").toLowerCase();
const base = (argv.find((a) => !a.startsWith("--")) || "http://127.0.0.1:3000").replace(/\/$/, "");
const paths = ["/", "/pricing", "/portfolio", "/contact"];
const budgets = { performance: 0.85, accessibility: 0.9, "best-practices": 0.9, seo: 0.9 };

const factors =
  formFactorChoice === "mobile"
    ? ["mobile"]
    : formFactorChoice === "desktop"
      ? ["desktop"]
      : ["mobile", "desktop"];

function optionsFor(formFactor, port) {
  if (formFactor === "desktop") {
    return {
      port,
      output: "json",
      onlyCategories: Object.keys(budgets),
      formFactor: "desktop",
      screenEmulation: {
        mobile: false,
        width: 1350,
        height: 940,
        deviceScaleFactor: 1,
        disabled: false,
      },
      throttlingMethod: "simulate",
    };
  }
  return {
    port,
    output: "json",
    onlyCategories: Object.keys(budgets),
    formFactor: "mobile",
    screenEmulation: {
      mobile: true,
      width: 412,
      height: 915,
      deviceScaleFactor: 2.625,
      disabled: false,
    },
  };
}

const chrome = await launch({ chromeFlags: ["--headless", "--no-sandbox"] });
let failed = false;
try {
  for (const formFactor of factors) {
    console.log(`\n=== form-factor=${formFactor} ===`);
    for (const path of paths) {
      const url = `${base}${path}`;
      const result = await lighthouse(url, optionsFor(formFactor, chrome.port));
      const cats = result?.lhr?.categories ?? {};
      console.log(`\n${url} (${formFactor})`);
      for (const [id, min] of Object.entries(budgets)) {
        const score = cats[id]?.score ?? 0;
        const ok = score >= min;
        if (!ok) failed = true;
        console.log(`  ${id}: ${score.toFixed(2)} (budget ${min}) ${ok ? "OK" : "FAIL"}`);
      }
    }
  }
} finally {
  await chrome.kill();
}
process.exit(failed ? 1 : 0);
