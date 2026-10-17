#!/usr/bin/env node
/**
 * Measures how soon the Meta pixel fires its first `facebook.com/tr` beacon on
 * the get-a-website lander, under a throttled Pixel 7 profile.
 *
 * The beacon is aborted so no real conversions are recorded; aborting happens
 * after the request is observed, so timing is unaffected.
 *
 * Usage:
 *   node scripts/measure-meta-pixel.mjs
 *   node scripts/measure-meta-pixel.mjs --url=https://www.kinexisdigital.com/lp/get-a-website --runs=3
 *   node scripts/measure-meta-pixel.mjs --no-throttle --headed
 */
import { chromium, devices } from "playwright";

const DEFAULTS = {
  url: "https://www.kinexisdigital.com/lp/get-a-website",
  runs: 3,
  cpu: 4,
  throttle: true,
  headed: false,
};

function parseArgs(argv) {
  const opts = { ...DEFAULTS };
  for (const arg of argv) {
    if (arg === "--headed") opts.headed = true;
    else if (arg === "--no-throttle") opts.throttle = false;
    else if (arg.startsWith("--url=")) opts.url = arg.slice(6);
    else if (arg.startsWith("--runs=")) opts.runs = Number(arg.slice(7));
    else if (arg.startsWith("--cpu=")) opts.cpu = Number(arg.slice(6));
  }
  return opts;
}

// Lighthouse "Slow 4G": 150ms RTT, 1.6 Mbps down, 750 Kbps up.
const SLOW_4G = {
  offline: false,
  latency: 150,
  downloadThroughput: (1.6 * 1024 * 1024) / 8,
  uploadThroughput: (750 * 1024) / 8,
};

async function measureOnce(browser, opts) {
  const context = await browser.newContext({
    ...devices["Pixel 7"],
    locale: "en-US",
  });
  const page = await context.newPage();

  const client = await context.newCDPSession(page);
  await client.send("Network.enable");
  if (opts.throttle) {
    await client.send("Network.emulateNetworkConditions", SLOW_4G);
    await client.send("Emulation.setCPUThrottlingRate", { rate: opts.cpu });
  }
  // Block at the network layer so no real conversion is sent. Chrome still
  // emits `requestWillBeSent` for the attempt, which is what we time.
  await client.send("Network.setBlockedURLs", { urls: ["*facebook.com/tr*"] });

  const trTimestamps = [];
  const heroWidths = new Set();
  let fbeventsLoaded = false;
  let navTimestamp = null;

  client.on("Network.requestWillBeSent", event => {
    const { request, timestamp, type } = event;
    if (navTimestamp == null && type === "Document") navTimestamp = timestamp;
    if (/facebook\.com\/tr/.test(request.url)) trTimestamps.push(timestamp);
  });

  page.on("request", request => {
    const hero = request.url().match(/hero-devices-(\d+)-v3\.avif/);
    if (hero) heroWidths.add(Number(hero[1]));
  });

  page.on("response", response => {
    if (/connect\.facebook\.net\/en_US\/fbevents\.js/.test(response.url())) {
      fbeventsLoaded = true;
    }
  });

  try {
    await page.goto(opts.url, { waitUntil: "load", timeout: 60_000 });
    await page.waitForTimeout(1_500);
  } finally {
    const loadMs = await page
      .evaluate(() => {
        const nav = performance.getEntriesByType("navigation")[0];
        return nav ? nav.loadEventEnd || nav.duration : null;
      })
      .catch(() => null);

    await context.close();

    const first =
      navTimestamp == null || trTimestamps.length === 0
        ? null
        : (Math.min(...trTimestamps) - navTimestamp) * 1000;

    return {
      msToFirstTr: first == null ? null : Math.round(first),
      msToFirstTrAfterLoad:
        first == null || loadMs == null ? null : Math.round(first - loadMs),
      loadMs: loadMs == null ? null : Math.round(loadMs),
      trCount: trTimestamps.length,
      fbeventsLoaded,
      heroWidths: [...heroWidths].sort((a, b) => a - b),
    };
  }
}

function median(values) {
  const sorted = values.filter(v => v != null).sort((a, b) => a - b);
  if (!sorted.length) return null;
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

const opts = parseArgs(process.argv.slice(2));
const browser = await chromium.launch({ headless: !opts.headed });
const runs = [];

console.log(`URL: ${opts.url}`);
console.log(
  `Profile: Pixel 7${opts.throttle ? ` · Slow 4G · ${opts.cpu}x CPU` : " · unthrottled"} · ${opts.runs} run(s)`,
);
console.log(`facebook.com/tr: blocked (aborted after observation)\n`);

try {
  for (let i = 1; i <= opts.runs; i += 1) {
    const result = await measureOnce(browser, opts);
    runs.push(result);
    console.log(
      `run ${i}: first /tr ${result.msToFirstTr ?? "n/a"}ms (load+${result.msToFirstTrAfterLoad ?? "n/a"}ms) ` +
        `· load ${result.loadMs ?? "n/a"}ms · /tr x${result.trCount} ` +
        `· fbevents ${result.fbeventsLoaded ? "yes" : "no"} ` +
        `· hero ${result.heroWidths.length ? result.heroWidths.join(",") : "none"}`,
    );
  }
} finally {
  await browser.close();
}

const heroWidths = new Set(runs.flatMap(r => r.heroWidths));
const summary = {
  url: opts.url,
  throttling: opts.throttle ? `Slow 4G, ${opts.cpu}x CPU` : "none",
  runs: runs.length,
  medianMsToFirstTr: median(runs.map(r => r.msToFirstTr)),
  medianMsToFirstTrAfterLoad: median(runs.map(r => r.msToFirstTrAfterLoad)),
  medianLoadMs: median(runs.map(r => r.loadMs)),
  fbeventsLoadedEveryRun: runs.every(r => r.fbeventsLoaded),
  heroWidthsSelected: [...heroWidths].sort((a, b) => a - b),
  runs,
};

console.log("\n" + JSON.stringify(summary, null, 2));
