#!/usr/bin/env node
/**
 * Local Lighthouse performance check for priority templates.
 * Usage: node scripts/lighthouse-templates.mjs [baseUrl]
 */
import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

function chromeFlags() {
  try {
    const { chromium } = require("playwright");
    const exe = chromium.executablePath();
    if (exe) {
      process.env.CHROME_PATH = exe;
    }
  } catch {
    /* system Chrome */
  }
  const userData = mkdtempSync(path.join(tmpdir(), "lh-"));
  return `--headless=new --disable-gpu --disable-dev-shm-usage --no-first-run --user-data-dir=${userData}`;
}

const base = (process.argv[2] || "http://127.0.0.1:3000").replace(/\/$/, "");

const PAGES = [
  { name: "homepage", path: "/" },
  { name: "service", path: "/services/seo" },
  { name: "industry", path: "/industries/home-services" },
  { name: "blog", path: "/blog/technical-seo-fundamentals" },
  { name: "contact", path: "/contact" },
];

function run(args) {
  return new Promise((resolve, reject) => {
    const child = spawn("npx", args, {
      stdio: ["ignore", "pipe", "pipe"],
      shell: false,
      windowsHide: true,
    });
    let out = "";
    let err = "";
    child.stdout.on("data", (d) => {
      out += d;
    });
    child.stderr.on("data", (d) => {
      err += d;
    });
    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(err || out || `exit ${code}`));
        return;
      }
      resolve(out);
    });
  });
}

async function audit(url, formFactor) {
  const args = [
    "--yes",
    "lighthouse",
    url,
    "--only-categories=performance",
    "--output=json",
    "--quiet",
    `--chrome-flags=${chromeFlags()}`,
  ];
  if (formFactor === "desktop") {
    args.push("--preset=desktop");
  } else {
    args.push("--form-factor=mobile", "--screenEmulation.mobile");
  }
  const raw = await run(args);
  const json = JSON.parse(raw);
  const cat = json.categories?.performance?.score;
  const audits = json.audits ?? {};
  return {
    score: cat == null ? null : Math.round(cat * 100),
    lcp: audits["largest-contentful-paint"]?.displayValue ?? "",
    tbt: audits["total-blocking-time"]?.displayValue ?? "",
    cls: audits["cumulative-layout-shift"]?.displayValue ?? "",
    fcp: audits["first-contentful-paint"]?.displayValue ?? "",
    si: audits["speed-index"]?.displayValue ?? "",
  };
}

async function main() {
  console.log(`Lighthouse templates — ${base}\n`);
  const rows = [];
  for (const page of PAGES) {
    for (const form of ["mobile", "desktop"]) {
      const url = `${base}${page.path}`;
      process.stdout.write(`${page.name}/${form}... `);
      try {
        const result = await audit(url, form);
        const pass = result.score != null && result.score >= 95;
        console.log(
          `${result.score} ${pass ? "PASS" : "FAIL"}  LCP=${result.lcp} TBT=${result.tbt} SI=${result.si} CLS=${result.cls}`,
        );
        rows.push({ ...page, form, ...result, pass });
      } catch (error) {
        console.log(`ERROR ${error.message.slice(0, 180)}`);
        rows.push({ ...page, form, score: null, pass: false, error: error.message });
      }
    }
  }

  const failed = rows.filter((r) => !r.pass);
  console.log(
    `\n${rows.filter((r) => r.pass).length}/${rows.length} at 95+. ${failed.length ? `Below: ${failed.map((r) => `${r.name}/${r.form}:${r.score}`).join(", ")}` : "All clear."}`,
  );
  process.exit(failed.length ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
