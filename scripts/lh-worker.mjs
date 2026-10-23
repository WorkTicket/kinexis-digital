// Lighthouse worker. Reads a JSON job list, keeps one Chrome alive, emits NDJSON results.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { launch as launchChrome } from "chrome-launcher";
import lighthouse from "lighthouse";

const jobsPath = process.argv[2];
const worker = Number(process.argv[3] || 0);
const BASE = process.env.LH_BASE || "http://127.0.0.1:3491";
const OUT = ".audit/lh";
const jobs = JSON.parse(readFileSync(jobsPath, "utf8"));

mkdirSync(OUT, { recursive: true });

const MOBILE = {
  formFactor: "mobile",
  screenEmulation: { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75, disabled: false },
  throttling: {
    rttMs: 150,
    throughputKbps: 1638.4,
    cpuSlowdownMultiplier: 4,
    requestLatencyMs: 150 * 3.75,
    downloadThroughputKbps: 1638.4 * 0.9,
    uploadThroughputKbps: 1638.4 * 0.9 * 0.75,
  },
};
const DESKTOP = {
  formFactor: "desktop",
  screenEmulation: { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false },
  throttling: {
    rttMs: 40,
    throughputKbps: 10240,
    cpuSlowdownMultiplier: 1,
    requestLatencyMs: 0,
    downloadThroughputKbps: 0,
    uploadThroughputKbps: 0,
  },
};

const chrome = await launchChrome({
  chromeFlags: [
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--hide-scrollbars",
    "--disable-extensions",
    "--mute-audio",
  ],
  logLevel: "silent",
});

function emit(value) {
  process.stdout.write(`${JSON.stringify(value)}\n`);
}

for (const job of jobs) {
  const { mode, path } = job;
  const name = `${mode}${path === "/" ? "_home" : path.replaceAll("/", "_")}`;
  const jsonPath = `${OUT}/${name}.json`;
  try {
    const result = await lighthouse(`${BASE}${path}`, {
      port: chrome.port,
      output: "json",
      logLevel: "error",
      onlyCategories: ["performance"],
      ...(mode === "mobile" ? MOBILE : DESKTOP),
      disableStorageReset: false,
      maxWaitForLoad: 45000,
    });
    if (!result) throw new Error("no result");
    const report = result.lhr;
    writeFileSync(jsonPath, JSON.stringify(report));
    const a = report.audits;
    emit({
      ok: true,
      worker,
      name,
      mode,
      path,
      score: Math.round((report.categories.performance.score ?? 0) * 100),
      fcp: a["first-contentful-paint"]?.numericValue,
      lcp: a["largest-contentful-paint"]?.numericValue,
      tbt: a["total-blocking-time"]?.numericValue,
      cls: a["cumulative-layout-shift"]?.numericValue,
      si: a["speed-index"]?.numericValue,
      lcpElement:
        a["largest-contentful-paint-element"]?.details?.items?.[0]?.items?.[0]?.node?.snippet ||
        a["largest-contentful-paint-element"]?.details?.items?.[0]?.items?.[0]?.node?.nodeLabel ||
        "",
      warnings: report.runWarnings || [],
    });
  } catch (error) {
    emit({ ok: false, worker, mode, path, error: String(error?.message || error).slice(0, 300) });
  }
}

await chrome.kill();
