import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";
import { writeFileSync, mkdirSync } from "node:fs";

const url = process.argv[2] || "https://kinexisdigital.com/";
const mode = process.argv[3] || "mobile";

mkdirSync(".audit", { recursive: true });

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

function summarizeItems(items) {
  if (!Array.isArray(items)) return items ?? null;
  return items.slice(0, 8).map((i) => {
    if (typeof i !== "object" || !i) return i;
    return {
      snippet: i.node?.snippet || i.node?.nodeLabel || undefined,
      selector: i.node?.selector || undefined,
      url: i.url || i.href || i.source || undefined,
      label: i.label || i.message || i.failureReason || i.type || undefined,
      subItems: Array.isArray(i.subItems?.items)
        ? i.subItems.items.slice(0, 5).map((s) => s.relatedNode?.snippet || s.node?.snippet || s.reason || s.message || s)
        : undefined,
    };
  });
}

const chrome = await launch({
  chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
  logLevel: "silent",
});

try {
  const result = await lighthouse(url, {
    port: chrome.port,
    output: "json",
    logLevel: "error",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo", "agentic-browsing"],
    ...(mode === "mobile" ? MOBILE : DESKTOP),
    maxWaitForLoad: 60000,
  });
  const lhr = result.lhr;
  const failed = Object.entries(lhr.audits)
    .filter(([, a]) => a.score !== null && a.score < 1 && !["informative", "manual", "notApplicable"].includes(a.scoreDisplayMode))
    .map(([id, a]) => ({
      id,
      title: a.title,
      score: a.score,
      display: a.displayValue,
      mode: a.scoreDisplayMode,
      items: summarizeItems(a.details?.items),
    }));

  const agenticIds = [
    "agent-accessibility-tree",
    "cumulative-layout-shift",
    "llms-txt",
    "webmcp-form-coverage",
    "webmcp-registered-tools",
    "webmcp-schema-validity",
  ];
  const agentic = Object.fromEntries(
    agenticIds
      .filter((id) => lhr.audits[id])
      .map((id) => {
        const a = lhr.audits[id];
        return [
          id,
          {
            score: a.score,
            mode: a.scoreDisplayMode,
            title: a.title,
            display: a.displayValue,
            items: summarizeItems(a.details?.items),
          },
        ];
      }),
  );

  const out = {
    url,
    mode,
    scores: Object.fromEntries(Object.entries(lhr.categories).map(([k, v]) => [k, v.score])),
    failed,
    agentic,
    warnings: lhr.runWarnings,
  };
  const outPath = `.audit/lh-diagnose-${mode}.json`;
  writeFileSync(outPath, JSON.stringify(out, null, 2));
  writeFileSync(`.audit/lh-diagnose-${mode}-full.json`, JSON.stringify(lhr));
  console.log(JSON.stringify(out, null, 2));
  console.log(`wrote ${outPath}`);
} finally {
  await chrome.kill();
}
