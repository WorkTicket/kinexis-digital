#!/usr/bin/env node
/**
 * Phase 10 — Performance & Core Web Vitals audit.
 * Runs PageSpeed Insights on priority template samples (mobile + desktop),
 * cross-references Ahrefs slow-page export, writes CSV + validation JSON.
 *
 * Usage: node scripts/phase10-performance-audit.mjs [baseUrl] [--save-json]
 * Output: docs/seo-remediation/phase-10-audit.csv
 *         docs/seo-remediation/phase-10-validation.json
 *         docs/seo-remediation/phase-10-lighthouse/ (with --save-json)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnvLocal } from "./load-env-local.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
loadEnvLocal(root);
const args = process.argv.slice(2);
const saveJson = args.includes("--save-json");
const quickMode = args.includes("--quick");
const base = (args.find((a) => !a.startsWith("--")) || "https://www.kinexisdigital.com").replace(
  /\/$/,
  ""
);

const AHREFS_SLOW_EXPORT = path.join(
  root,
  "docs",
  "seo-remediation",
  "ahrefs-export",
  "kinexisdigital_01-jul-2026_slow-page_2026-07-02_16-46-51.csv"
);

/** Priority template PSI samples (one URL per template). */
const TEMPLATE_SAMPLES = [
  { template: "homepage", url: `${base}/en` },
  { template: "service", url: `${base}/en/services/seo` },
  { template: "service_heavy", url: `${base}/en/services/ppc-management` },
  { template: "location_city", url: `${base}/en/locations/toronto` },
  { template: "location_service", url: `${base}/en/locations/toronto/seo` },
  { template: "industry_detail", url: `${base}/en/industries/technology/startups` },
  { template: "blog_post", url: `${base}/en/blog/technical-seo-fundamentals` },
  { template: "solution", url: `${base}/en/solutions/seo-for-hvac-companies` },
  { template: "contact", url: `${base}/en/contact` },
  { template: "pricing", url: `${base}/en/pricing/seo` },
];

const PRIORITY_TEMPLATES = [
  "homepage",
  "service",
  "location_city",
  "location_service",
  "industry_detail",
  "blog_post",
  "solution",
  "contact",
];

const STRATEGIES = quickMode ? ["mobile"] : ["mobile", "desktop"];
const SAMPLES = quickMode
  ? TEMPLATE_SAMPLES.filter((s) => PRIORITY_TEMPLATES.includes(s.template))
  : TEMPLATE_SAMPLES;

/** Lighthouse lab thresholds (web.dev). */
const THRESHOLDS = {
  lcpMs: 2500,
  inpMs: 200,
  cls: 0.1,
};

const PSI_API = "https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed";

function csvEscape(value) {
  const s = value == null ? "" : String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function normalizeUrl(url) {
  try {
    const u = new URL(url);
    u.hash = "";
    let p = u.pathname;
    if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
    u.pathname = p;
    return u.href;
  } catch {
    return url;
  }
}

function loadAhrefsSlowRows(csvPath) {
  if (!fs.existsSync(csvPath)) return [];
  const text = fs.readFileSync(csvPath, "utf8");
  const lines = text.trim().split(/\r?\n/).slice(1);
  return lines.map((line) => {
    const m = line.match(/^(\d+),(https?:\/\/[^,]+)/);
    if (!m) return null;
    const cols = line.split(",");
    const url = normalizeUrl(m[2]);
    const ttfb = parseInt(cols[8], 10) || null;
    const loading = parseInt(cols[9], 10) || null;
    const indexable = cols[11]?.toLowerCase() === "true";
    return { url, ttfb, loading, indexable, isHttps: url.startsWith("https://") };
  }).filter(Boolean);
}

function inferTemplateFromPath(pathname) {
  const p = pathname.replace(/^\/(en|es)/, "") || "/";
  if (p === "/") return "homepage";
  if (p.startsWith("/services/")) return "service";
  if (/\/locations\/[^/]+\/[^/]+/.test(p)) return "location_service";
  if (p.startsWith("/locations/")) return "location_city";
  if (/\/industries\/[^/]+\/[^/]+/.test(p)) return "industry_detail";
  if (p.startsWith("/industries/")) return "industry_category";
  if (p.startsWith("/blog/")) return "blog_post";
  if (p.startsWith("/solutions/")) return "solution";
  if (p === "/solutions") return "solutions_hub";
  if (p.startsWith("/contact")) return "contact";
  if (p.startsWith("/pricing/")) return "pricing";
  if (p.startsWith("/case-studies/")) return "case_study";
  if (p.includes("-vs-")) return "comparison";
  return "other";
}

function auditMetric(audit, id) {
  const a = audit?.[id];
  if (!a) return { ms: null, display: "", score: null };
  return {
    ms: typeof a.numericValue === "number" ? a.numericValue : null,
    display: a.displayValue ?? "",
    score: a.score ?? null,
  };
}

function extractMetrics(lighthouseResult) {
  const audits = lighthouseResult?.audits ?? {};
  const lcp = auditMetric(audits, "largest-contentful-paint");
  const cls = auditMetric(audits, "cumulative-layout-shift");
  const inp =
    auditMetric(audits, "interaction-to-next-paint").ms != null
      ? auditMetric(audits, "interaction-to-next-paint")
      : auditMetric(audits, "experimental-interaction-to-next-paint");
  const ttfb = auditMetric(audits, "server-response-time");
  const fcp = auditMetric(audits, "first-contentful-paint");
  const si = auditMetric(audits, "speed-index");
  const tbt = auditMetric(audits, "total-blocking-time");

  return {
    performanceScore: lighthouseResult?.categories?.performance?.score ?? null,
    lcpMs: lcp.ms,
    lcpDisplay: lcp.display,
    cls: cls.ms,
    clsDisplay: cls.display,
    inpMs: inp.ms,
    inpDisplay: inp.display,
    ttfbMs: ttfb.ms,
    ttfbDisplay: ttfb.display,
    fcpMs: fcp.ms,
    fcpDisplay: fcp.display,
    speedIndexMs: si.ms,
    speedIndexDisplay: si.display,
    tbtMs: tbt.ms,
    tbtDisplay: tbt.display,
  };
}

function cwvPass(metrics) {
  const issues = [];
  if (metrics.lcpMs != null && metrics.lcpMs > THRESHOLDS.lcpMs) {
    issues.push(`lcp_${Math.round(metrics.lcpMs)}ms`);
  }
  if (metrics.inpMs != null && metrics.inpMs > THRESHOLDS.inpMs) {
    issues.push(`inp_${Math.round(metrics.inpMs)}ms`);
  }
  if (metrics.cls != null && metrics.cls > THRESHOLDS.cls) {
    issues.push(`cls_${metrics.cls.toFixed(3)}`);
  }
  return { pass: issues.length === 0, issues };
}

async function runPsi(url, strategy) {
  const apiUrl = new URL(PSI_API);
  apiUrl.searchParams.set("url", url);
  apiUrl.searchParams.set("strategy", strategy);
  apiUrl.searchParams.set("category", "performance");
  if (process.env.GOOGLE_PSI_API_KEY) {
    apiUrl.searchParams.set("key", process.env.GOOGLE_PSI_API_KEY);
  }

  const started = Date.now();
  const res = await fetch(apiUrl, {
    headers: { Accept: "application/json" },
  });
  const elapsed = Date.now() - started;

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`PSI ${strategy} ${url}: HTTP ${res.status} — ${body.slice(0, 200)}`);
  }

  const data = await res.json();
  const lighthouseResult = data.lighthouseResult;
  const metrics = extractMetrics(lighthouseResult);
  const cwv = cwvPass(metrics);

  return {
    url,
    strategy,
    elapsedMs: elapsed,
    metrics,
    cwvPass: cwv.pass,
    cwvIssues: cwv.issues,
    lighthouseResult,
    loadingExperience: data.loadingExperience ?? null,
  };
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const started = new Date().toISOString();
  console.log(`Phase 10 performance audit — ${base}`);
  console.log(`Templates: ${SAMPLES.length} × strategies: ${STRATEGIES.join(", ")}${quickMode ? " (quick)" : ""}\n`);

  const ahrefsRows = loadAhrefsSlowRows(AHREFS_SLOW_EXPORT);
  const ahrefsHttps = ahrefsRows.filter((r) => r.isHttps);
  const ahrefsHttp = ahrefsRows.filter((r) => !r.isHttps);

  const outDir = path.join(root, "docs", "seo-remediation");
  const lighthouseDir = path.join(outDir, "phase-10-lighthouse");
  if (saveJson) fs.mkdirSync(lighthouseDir, { recursive: true });

  const rows = [];
  const failures = [];

  for (const sample of SAMPLES) {
    for (const strategy of STRATEGIES) {
      const label = `${sample.template}/${strategy}`;
      process.stdout.write(`PSI ${label}... `);
      try {
        const result = await runPsi(sample.url, strategy);
        console.log(
          `score=${result.metrics.performanceScore ?? "n/a"} LCP=${result.metrics.lcpDisplay || "n/a"} CWV=${result.cwvPass ? "pass" : result.cwvIssues.join(",")}`
        );

        if (saveJson && result.lighthouseResult) {
          const safeName = `${sample.template}-${strategy}.json`;
          fs.writeFileSync(
            path.join(lighthouseDir, safeName),
            JSON.stringify(result.lighthouseResult, null, 2),
            "utf8"
          );
        }

        rows.push({
          template: sample.template,
          url: sample.url,
          strategy,
          performance_score: result.metrics.performanceScore,
          lcp_ms: result.metrics.lcpMs != null ? Math.round(result.metrics.lcpMs) : "",
          lcp_display: result.metrics.lcpDisplay,
          inp_ms: result.metrics.inpMs != null ? Math.round(result.metrics.inpMs) : "",
          inp_display: result.metrics.inpDisplay,
          cls: result.metrics.cls != null ? result.metrics.cls.toFixed(3) : "",
          cls_display: result.metrics.clsDisplay,
          ttfb_ms: result.metrics.ttfbMs != null ? Math.round(result.metrics.ttfbMs) : "",
          ttfb_display: result.metrics.ttfbDisplay,
          fcp_ms: result.metrics.fcpMs != null ? Math.round(result.metrics.fcpMs) : "",
          speed_index_ms: result.metrics.speedIndexMs != null ? Math.round(result.metrics.speedIndexMs) : "",
          tbt_ms: result.metrics.tbtMs != null ? Math.round(result.metrics.tbtMs) : "",
          cwv_pass: result.cwvPass,
          cwv_issues: result.cwvIssues.join(";"),
          psi_elapsed_ms: result.elapsedMs,
        });

        if (!result.cwvPass) {
          failures.push({ template: sample.template, strategy, url: sample.url, issues: result.cwvIssues });
        }
      } catch (e) {
        console.log(`FAIL — ${e.message}`);
        failures.push({ template: sample.template, strategy, url: sample.url, issues: [e.message] });
        rows.push({
          template: sample.template,
          url: sample.url,
          strategy,
          performance_score: "",
          lcp_ms: "",
          lcp_display: "",
          inp_ms: "",
          inp_display: "",
          cls: "",
          cls_display: "",
          ttfb_ms: "",
          ttfb_display: "",
          fcp_ms: "",
          speed_index_ms: "",
          tbt_ms: "",
          cwv_pass: false,
          cwv_issues: e.message,
          psi_elapsed_ms: "",
        });
      }

      // PSI rate limit courtesy pause
      await sleep(1500);
    }
  }

  const priorityTemplates = PRIORITY_TEMPLATES;

  const priorityRows = rows.filter((r) => priorityTemplates.includes(r.template));
  const priorityCwvFails = priorityRows.filter((r) => !r.cwv_pass);
  const mobilePriorityFails = priorityRows.filter((r) => r.strategy === "mobile" && !r.cwv_pass);
  const desktopPriorityFails = priorityRows.filter((r) => r.strategy === "desktop" && !r.cwv_pass);

  const phase10Pass =
    mobilePriorityFails.length === 0 &&
    desktopPriorityFails.length === 0 &&
    !rows.some((r) => String(r.cwv_issues).includes("HTTP 429"));

  const psiQuotaExceeded = rows.some((r) => String(r.cwv_issues).includes("HTTP 429"));

  const ahrefsByTemplate = {};
  for (const row of ahrefsRows) {
    const tmpl = inferTemplateFromPath(new URL(row.url).pathname);
    ahrefsByTemplate[tmpl] = (ahrefsByTemplate[tmpl] ?? 0) + 1;
  }

  const summary = {
    timestamp: started,
    finished: new Date().toISOString(),
    base,
    psi_samples: SAMPLES.length,
    psi_runs: rows.length,
    cwv_thresholds: THRESHOLDS,
    priority_templates: priorityTemplates,
    priority_cwv_failures: priorityCwvFails.length,
    mobile_priority_failures: mobilePriorityFails.length,
    desktop_priority_failures: desktopPriorityFails.length,
    ahrefs_slow_page_total: ahrefsRows.length,
    ahrefs_slow_https_www: ahrefsHttps.length,
    ahrefs_slow_http_dupes: ahrefsHttp.length,
    ahrefs_by_template: ahrefsByTemplate,
    psi_quota_exceeded: psiQuotaExceeded,
    phase10Pass,
  };

  fs.mkdirSync(outDir, { recursive: true });

  const csvHeaders = [
    "template",
    "url",
    "strategy",
    "performance_score",
    "lcp_ms",
    "lcp_display",
    "inp_ms",
    "inp_display",
    "cls",
    "cls_display",
    "ttfb_ms",
    "ttfb_display",
    "fcp_ms",
    "speed_index_ms",
    "tbt_ms",
    "cwv_pass",
    "cwv_issues",
    "psi_elapsed_ms",
  ];
  const csvPath = path.join(outDir, "phase-10-audit.csv");
  fs.writeFileSync(
    csvPath,
    [csvHeaders.join(","), ...rows.map((r) => csvHeaders.map((h) => csvEscape(r[h])).join(","))].join(
      "\n"
    ),
    "utf8"
  );

  const validationPath = path.join(outDir, "phase-10-validation.json");
  fs.writeFileSync(
    validationPath,
    JSON.stringify(
      {
        summary,
        failures: failures.slice(0, 50),
        ahrefsSlowPage: {
          export: path.basename(AHREFS_SLOW_EXPORT),
          httpsRows: ahrefsHttps.map((r) => ({ url: r.url, ttfb: r.ttfb })),
          httpDupeRows: ahrefsHttp.map((r) => ({ url: r.url, ttfb: r.ttfb, note: "expect_clear_on_recrawl" })),
        },
        rows,
      },
      null,
      2
    ),
    "utf8"
  );

  console.log("\n--- Summary ---");
  console.log(JSON.stringify(summary, null, 2));
  console.log(`\nCSV: ${csvPath}`);
  console.log(`Validation JSON: ${validationPath}`);
  if (saveJson) console.log(`Lighthouse JSON: ${lighthouseDir}\n`);

  process.exit(phase10Pass ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
