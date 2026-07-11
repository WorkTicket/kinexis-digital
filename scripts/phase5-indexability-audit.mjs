#!/usr/bin/env node
/**
 * Phase 5 — Indexability audit.
 * Crawls sitemap URLs + Ahrefs noindex sample; validates robots meta,
 * X-Robots-Tag, robots.txt, sitemap alignment, intentional suppressions.
 *
 * Usage: node scripts/phase5-indexability-audit.mjs [baseUrl]
 * Output: docs/seo-remediation/phase-05-audit.csv
 *         docs/seo-remediation/phase-05-validation.json
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = (process.argv[2] || "https://www.kinexisdigital.com").replace(/\/$/, "");
const USER_AGENT = "KinexisPhase5Indexability/1.0";
const CONCURRENCY = 8;

const AHREFS_EXPORTS = {
  noindex_page: path.join(
    __dirname,
    "..",
    "docs",
    "seo-remediation",
    "ahrefs-export",
    "kinexisdigital_01-jul-2026_noindex-page_2026-07-02_16-40-59.csv"
  ),
  noindex_and_nofollow: path.join(
    __dirname,
    "..",
    "docs",
    "seo-remediation",
    "ahrefs-export",
    "kinexisdigital_01-jul-2026_noindex-and-nofoll_2026-07-02_16-41-11.csv"
  ),
  nofollow_page: path.join(
    __dirname,
    "..",
    "docs",
    "seo-remediation",
    "ahrefs-export",
    "kinexisdigital_01-jul-2026_nofollow-page_2026-07-02_16-40-53.csv"
  ),
  page_has_nofollow_outgoing: path.join(
    __dirname,
    "..",
    "docs",
    "seo-remediation",
    "ahrefs-export",
    "kinexisdigital_01-jul-2026_page-has-nofollow_2026-07-02_16-42-14.csv"
  ),
};

const INTENTIONAL_NOINDEX_PATHS = new Set(["/en/lead-magnet", "/es/lead-magnet"]);

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

function normalizePathname(url) {
  try {
    const u = new URL(url);
    let p = u.pathname;
    if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
    return p;
  } catch {
    return url;
  }
}

function extractRobotsMeta(html) {
  const re = /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i;
  const alt = /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']robots["']/i;
  return html.match(re)?.[1] ?? html.match(alt)?.[1] ?? "";
}

function extractHreflangCount(html) {
  const re = /<link[^>]+rel=["']alternate["'][^>]+hreflang=/gi;
  return (html.match(re) ?? []).length;
}

function countNofollowInternalLinks(html, pageUrl) {
  const origin = new URL(pageUrl).origin;
  let total = 0;
  let nofollow = 0;
  const anchorRe = /<a\b[^>]*href=["']([^"'#]+)["'][^>]*>/gi;
  let m;
  while ((m = anchorRe.exec(html)) !== null) {
    const tag = m[0];
    const href = m[1];
    if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) continue;
    try {
      const u = new URL(href, pageUrl);
      if (u.origin !== origin) continue;
      total++;
      if (/\bnofollow\b/i.test(tag)) nofollow++;
    } catch {
      /* skip */
    }
  }
  return { total, nofollow };
}

function deriveIndexability(status, robotsMeta, xRobotsTag) {
  if (status < 200 || status >= 300) return "non-200";
  const combined = `${robotsMeta} ${xRobotsTag}`.toLowerCase();
  if (combined.includes("noindex")) return "noindex";
  if (combined.includes("nofollow") && !combined.includes("follow")) return "nofollow_only";
  return "indexable";
}

function parseRobotsDirectives(robotsMeta, xRobotsTag) {
  const combined = `${robotsMeta} ${xRobotsTag}`.toLowerCase();
  const tokens = combined.split(/[,\s]+/).filter(Boolean);
  return {
    index: !tokens.includes("noindex"),
    follow: !tokens.includes("nofollow"),
    noindex: tokens.includes("noindex"),
    nofollow: tokens.includes("nofollow"),
  };
}

function isIntentionalNoindex(url) {
  return INTENTIONAL_NOINDEX_PATHS.has(normalizePathname(url));
}

function loadAhrefsRowUrls(csvPath) {
  if (!fs.existsSync(csvPath)) return [];
  const text = fs.readFileSync(csvPath, "utf8");
  return [
    ...new Set(
      [...text.matchAll(/^0,(https?:\/\/[^,]+)/gm)].map((m) => normalizeUrl(m[1]))
    ),
  ];
}

async function fetchPage(url, redirect = "follow") {
  try {
    const res = await fetch(url, {
      redirect,
      headers: { "User-Agent": USER_AGENT, Accept: "text/html" },
    });
    const html =
      res.headers.get("content-type")?.includes("text/html") ? await res.text() : "";
    return {
      url,
      finalUrl: res.url,
      status: res.status,
      html,
      location: res.headers.get("location") ?? "",
      xRobotsTag: res.headers.get("x-robots-tag") ?? "",
      error: null,
    };
  } catch (e) {
    return {
      url,
      finalUrl: url,
      status: 0,
      html: "",
      location: "",
      xRobotsTag: "",
      error: e.message,
    };
  }
}

async function fetchSitemapUrls() {
  const res = await fetch(`${base}/sitemap.xml`, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`sitemap fetch failed: HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => normalizeUrl(m[1]))
    .filter(Boolean);
}

async function auditRobotsTxt() {
  const res = await fetch(`${base}/robots.txt`, { headers: { "User-Agent": USER_AGENT } });
  const text = res.ok ? await res.text() : "";
  const issues = [];
  if (!res.ok) issues.push(`robots_txt_status_${res.status}`);

  const disallowLines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.toLowerCase().startsWith("disallow:"))
    .map((l) => l.replace(/^disallow:\s*/i, "").trim());

  const contentDisallows = disallowLines.filter(
    (d) => d && d !== "/api/" && !d.startsWith("/api/")
  );
  if (contentDisallows.some((d) => d === "/" || d.startsWith("/en") || d.startsWith("/es"))) {
    issues.push("robots_blocks_content");
  }
  if (!disallowLines.some((d) => d === "/api/" || d.startsWith("/api"))) {
    issues.push("api_not_disallowed");
  }
  if (!text.toLowerCase().includes("sitemap:")) issues.push("missing_sitemap_directive");

  return {
    status: res.status,
    disallow_rules: disallowLines,
    content_disallows: contentDisallows,
    has_sitemap_directive: text.toLowerCase().includes("sitemap:"),
    issues: issues.join(";"),
    pass: issues.length === 0,
  };
}

async function mapPool(items, fn, limit) {
  const results = new Array(items.length);
  let idx = 0;
  async function worker() {
    while (idx < items.length) {
      const i = idx++;
      results[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

function auditRow(pageUrl, fetchResult, inSitemap) {
  const robotsMeta = extractRobotsMeta(fetchResult.html);
  const indexability = deriveIndexability(fetchResult.status, robotsMeta, fetchResult.xRobotsTag);
  const directives = parseRobotsDirectives(robotsMeta, fetchResult.xRobotsTag);
  const intentional = isIntentionalNoindex(fetchResult.finalUrl);
  const hreflangCount = extractHreflangCount(fetchResult.html);
  const linkStats =
    fetchResult.status === 200 ? countNofollowInternalLinks(fetchResult.html, fetchResult.finalUrl) : { total: 0, nofollow: 0 };

  const issues = [];
  if (fetchResult.status !== 200) issues.push(`page_status_${fetchResult.status}`);

  if (inSitemap) {
    if (indexability !== "indexable") issues.push("sitemap_url_not_indexable");
    if (directives.noindex) issues.push("accidental_noindex_in_sitemap");
    if (!directives.follow) issues.push("accidental_nofollow_in_sitemap");
  } else if (fetchResult.status === 200 && indexability === "indexable" && !intentional) {
    issues.push("indexable_not_in_sitemap");
  }

  if (indexability === "noindex" && !intentional && fetchResult.status === 200) {
    issues.push("unexpected_noindex");
  }

  if (intentional) {
    if (!directives.noindex) issues.push("lead_magnet_missing_noindex");
    if (directives.nofollow) issues.push("lead_magnet_accidental_nofollow");
  }

  return {
    url: pageUrl,
    final_url: fetchResult.finalUrl,
    http_status: fetchResult.status,
    in_sitemap: inSitemap ? "yes" : "no",
    indexability,
    robots_meta: robotsMeta,
    x_robots_tag: fetchResult.xRobotsTag,
    index_directive: directives.index ? "index" : "noindex",
    follow_directive: directives.follow ? "follow" : "nofollow",
    intentional_noindex: intentional ? "yes" : "no",
    hreflang_count: hreflangCount,
    internal_links_total: linkStats.total,
    internal_links_nofollow: linkStats.nofollow,
    page_level_nofollow_cascade: directives.nofollow ? "yes" : "no",
    issues: [...new Set(issues)].join(";"),
    pass:
      issues.length === 0 ||
      (intentional && issues.every((i) => !i.startsWith("accidental_") && i !== "unexpected_noindex")),
    error: fetchResult.error ?? "",
  };
}

async function probeHttpLeadMagnet() {
  const httpUrl = "http://www.kinexisdigital.com/en/lead-magnet";
  const res = await fetchPage(httpUrl, "manual");
  const issues = [];
  if (res.status === 200) issues.push("http_serves_200");
  if (res.status !== 301 && res.status !== 308) issues.push(`unexpected_status_${res.status}`);
  const target = res.location ? normalizeUrl(new URL(res.location, httpUrl).href) : "";
  if (target && !target.startsWith("https://")) issues.push("redirect_not_https");
  if (target && normalizePathname(target) !== "/en/lead-magnet") issues.push("redirect_wrong_path");

  let httpsRobots = "";
  if (target) {
    const httpsRes = await fetchPage(target, "follow");
    httpsRobots = extractRobotsMeta(httpsRes.html);
    if (!httpsRobots.toLowerCase().includes("noindex")) issues.push("https_target_not_noindex");
  }

  return {
    http_url: httpUrl,
    status: res.status,
    location: res.location,
    redirect_target: target,
    https_robots_meta: httpsRobots,
    issues: issues.join(";"),
    pass: issues.length === 0 && (res.status === 301 || res.status === 308),
  };
}

async function compareAhrefsExports(ahrefsUrls, liveByUrl) {
  const comparisons = [];
  for (const url of ahrefsUrls) {
    const live = liveByUrl.get(normalizeUrl(url));
    const path = normalizePathname(url);
    const isHttpDuplicate = url.startsWith("http://");
    const isLeadMagnet = path.endsWith("/lead-magnet");

    comparisons.push({
      ahrefs_url: url,
      is_http_duplicate: isHttpDuplicate,
      is_lead_magnet: isLeadMagnet,
      intentional: isLeadMagnet,
      live_found: Boolean(live),
      live_indexability: live?.indexability ?? null,
      live_robots_meta: live?.robots_meta ?? "",
      live_index_directive: live?.index_directive ?? "",
      live_follow_directive: live?.follow_directive ?? "",
      ahrefs_expected: isLeadMagnet ? "noindex,follow (intentional)" : "index,follow",
      live_matches_intent:
        isLeadMagnet && live
          ? live.index_directive === "noindex" && live.follow_directive === "follow"
          : live
            ? live.index_directive === "index" && live.follow_directive === "follow"
            : isHttpDuplicate
              ? null
              : false,
      stale_http_row: isHttpDuplicate,
    });
  }
  return comparisons;
}

async function main() {
  const started = new Date().toISOString();
  console.log(`\nPhase 5 indexability audit — ${base}\n${"=".repeat(60)}\n`);

  const [sitemapUrls, robotsTxtAudit] = await Promise.all([fetchSitemapUrls(), auditRobotsTxt()]);
  console.log(`Sitemap URLs: ${sitemapUrls.length}`);
  console.log(`robots.txt: ${robotsTxtAudit.pass ? "PASS" : "FAIL"}\n`);

  const sitemapSet = new Set(sitemapUrls.map(normalizeUrl));
  const extraUrls = [`${base}/en/lead-magnet`, `${base}/es/lead-magnet`].map(normalizeUrl);
  const allUrls = [...new Set([...sitemapUrls, ...extraUrls])];

  let done = 0;
  const rows = await mapPool(
    allUrls,
    async (url) => {
      const fetchResult = await fetchPage(url);
      const row = auditRow(url, fetchResult, sitemapSet.has(normalizeUrl(url)));
      done++;
      if (done % 50 === 0 || done === allUrls.length) {
        process.stdout.write(`  Crawled ${done}/${allUrls.length} URLs\r`);
      }
      return row;
    },
    CONCURRENCY
  );
  console.log("\n");

  const httpLeadMagnetProbe = await probeHttpLeadMagnet();
  console.log(
    `${httpLeadMagnetProbe.pass ? "PASS" : "FAIL"} HTTP lead-magnet → ${httpLeadMagnetProbe.status}${httpLeadMagnetProbe.location ? ` → ${httpLeadMagnetProbe.redirect_target}` : ""}`
  );

  const liveByUrl = new Map(rows.map((r) => [normalizeUrl(r.final_url), r]));
  const ahrefsUrlsByExport = {};
  for (const [name, csvPath] of Object.entries(AHREFS_EXPORTS)) {
    ahrefsUrlsByExport[name] = loadAhrefsRowUrls(csvPath);
  }
  const allAhrefsUrls = [
    ...new Set(Object.values(ahrefsUrlsByExport).flat()),
  ];
  const ahrefsComparison = await compareAhrefsExports(allAhrefsUrls, liveByUrl);

  const sitemapRows = rows.filter((r) => r.in_sitemap === "yes");
  const leadMagnetRows = rows.filter((r) => r.intentional_noindex === "yes");
  const unexpectedNoindex = rows.filter((r) => r.issues.includes("unexpected_noindex"));
  const sitemapNotIndexable = sitemapRows.filter((r) => r.indexability !== "indexable");

  const issueCounts = {};
  for (const row of rows) {
    if (!row.issues) continue;
    for (const issue of row.issues.split(";").filter(Boolean)) {
      issueCounts[issue] = (issueCounts[issue] ?? 0) + 1;
    }
  }

  const summary = {
    timestamp: started,
    finished: new Date().toISOString(),
    base,
    sitemap_url_count: sitemapUrls.length,
    urls_crawled: rows.length,
    sitemap_indexable_pass: sitemapRows.filter((r) => r.indexability === "indexable").length,
    sitemap_indexable_fail: sitemapNotIndexable.length,
    sitemap_pass: sitemapRows.filter((r) => r.pass && r.indexability === "indexable").length,
    sitemap_fail: sitemapRows.filter((r) => !r.pass || r.indexability !== "indexable").length,
    accidental_noindex_on_sitemap: sitemapRows.filter((r) => r.issues.includes("accidental_noindex_in_sitemap")).length,
    unexpected_noindex_count: unexpectedNoindex.length,
    intentional_noindex_pages: leadMagnetRows.length,
    intentional_noindex_pass: leadMagnetRows.filter((r) => r.index_directive === "noindex" && r.follow_directive === "follow").length,
    lead_magnet_hreflang_present: leadMagnetRows.filter((r) => r.hreflang_count >= 3).length,
    lead_magnet_outgoing_nofollow: leadMagnetRows.map((r) => ({
      url: r.final_url,
      internal_links_nofollow: r.internal_links_nofollow,
      internal_links_total: r.internal_links_total,
    })),
    indexability_breakdown: {},
    issue_breakdown: issueCounts,
    robots_txt: robotsTxtAudit,
    http_lead_magnet_probe: httpLeadMagnetProbe,
    ahrefs_exports: Object.fromEntries(
      Object.entries(ahrefsUrlsByExport).map(([k, urls]) => [k, { url_count: urls.length, urls }])
    ),
    ahrefs_unique_urls: allAhrefsUrls.length,
    ahrefs_live_matches_intent: ahrefsComparison.filter((c) => c.live_matches_intent === true).length,
    ahrefs_stale_http_rows: ahrefsComparison.filter((c) => c.stale_http_row).length,
    phase5Pass:
      sitemapRows.every((r) => r.indexability === "indexable" && r.index_directive === "index" && r.follow_directive === "follow") &&
      unexpectedNoindex.length === 0 &&
      leadMagnetRows.every((r) => r.index_directive === "noindex" && r.follow_directive === "follow") &&
      robotsTxtAudit.pass &&
      httpLeadMagnetProbe.pass,
  };

  for (const row of rows) {
    summary.indexability_breakdown[row.indexability] =
      (summary.indexability_breakdown[row.indexability] ?? 0) + 1;
  }

  const outDir = path.join(__dirname, "..", "docs", "seo-remediation");
  fs.mkdirSync(outDir, { recursive: true });

  const csvHeaders = [
    "url",
    "final_url",
    "http_status",
    "in_sitemap",
    "indexability",
    "robots_meta",
    "x_robots_tag",
    "index_directive",
    "follow_directive",
    "intentional_noindex",
    "hreflang_count",
    "internal_links_total",
    "internal_links_nofollow",
    "page_level_nofollow_cascade",
    "issues",
    "pass",
    "error",
  ];
  const csvPath = path.join(outDir, "phase-05-audit.csv");
  const csvLines = [csvHeaders.join(",")];
  for (const row of rows) {
    csvLines.push(csvHeaders.map((h) => csvEscape(row[h])).join(","));
  }
  fs.writeFileSync(csvPath, csvLines.join("\n"), "utf8");

  const validationPath = path.join(outDir, "phase-05-validation.json");
  fs.writeFileSync(
    validationPath,
    JSON.stringify(
      {
        summary,
        ahrefsComparison,
        leadMagnetRows,
        unexpectedNoindex,
        sitemapFailures: sitemapRows.filter((r) => r.indexability !== "indexable" || !r.pass),
        failures: rows.filter((r) => !r.pass && r.intentional_noindex !== "yes"),
      },
      null,
      2
    ),
    "utf8"
  );

  console.log("\n--- Summary ---");
  console.log(JSON.stringify(summary, null, 2));
  console.log(`\nCSV: ${csvPath}`);
  console.log(`Validation JSON: ${validationPath}\n`);

  process.exit(summary.phase5Pass ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
