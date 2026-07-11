#!/usr/bin/env node
/**
 * Phase 6 — Internal linking audit.
 * Crawls sitemap URLs; builds inlink/outlink graph; detects 3xx outlinks,
 * thin dofollow inlinks, mixed nofollow inlinks, orphans; compares Ahrefs exports.
 *
 * Usage: node scripts/phase6-internal-links-audit.mjs [baseUrl]
 * Output: docs/seo-remediation/phase-06-audit.csv
 *         docs/seo-remediation/phase-06-validation.json
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = (process.argv[2] || "https://www.kinexisdigital.com").replace(/\/$/, "");
const USER_AGENT = "KinexisPhase6InternalLinks/1.0";
const CONCURRENCY = 8;
const MIN_DOFOLLOW_INLINKS = 3;

const AHREFS_EXPORTS = {
  links_to_redirect_https: path.join(
    __dirname,
    "..",
    "docs",
    "seo-remediation",
    "ahrefs-export",
    "kinexisdigital_01-jul-2026_page-has-links-to_2026-07-02_16-41-17.csv"
  ),
  links_to_redirect_http: path.join(
    __dirname,
    "..",
    "docs",
    "seo-remediation",
    "ahrefs-export",
    "kinexisdigital_01-jul-2026_page-has-links-to_2026-07-02_16-42-07.csv"
  ),
  one_dofollow_inlink_indexable: path.join(
    __dirname,
    "..",
    "docs",
    "seo-remediation",
    "ahrefs-export",
    "kinexisdigital_01-jul-2026_page-has-only-one_2026-07-02_16-41-30.csv"
  ),
  one_dofollow_inlink_not_indexable: path.join(
    __dirname,
    "..",
    "docs",
    "seo-remediation",
    "ahrefs-export",
    "kinexisdigital_01-jul-2026_page-has-only-one_2026-07-02_16-41-49.csv"
  ),
  mixed_inlinks_indexable: path.join(
    __dirname,
    "..",
    "docs",
    "seo-remediation",
    "ahrefs-export",
    "kinexisdigital_01-jul-2026_page-has-nofollow_2026-07-02_16-41-24.csv"
  ),
  mixed_inlinks_not_indexable: path.join(
    __dirname,
    "..",
    "docs",
    "seo-remediation",
    "ahrefs-export",
    "kinexisdigital_01-jul-2026_page-has-nofollow_2026-07-02_16-41-43.csv"
  ),
  outgoing_nofollow: path.join(
    __dirname,
    "..",
    "docs",
    "seo-remediation",
    "ahrefs-export",
    "kinexisdigital_01-jul-2026_page-has-nofollow_2026-07-02_16-42-14.csv"
  ),
};

const INTENTIONAL_NOINDEX_PATHS = new Set(["/en/lead-magnet", "/es/lead-magnet"]);
const LEAD_MAGNET_PATHS = INTENTIONAL_NOINDEX_PATHS;

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

function pageKey(url) {
  return normalizePathname(url);
}

function extractRobotsMeta(html) {
  const re = /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i;
  const alt = /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']robots["']/i;
  return html.match(re)?.[1] ?? html.match(alt)?.[1] ?? "";
}

function pageLevelNofollow(robotsMeta, xRobotsTag) {
  const combined = `${robotsMeta} ${xRobotsTag}`.toLowerCase();
  return combined.includes("nofollow") && !combined.includes("follow");
}

function pageLevelNoindex(robotsMeta, xRobotsTag) {
  const combined = `${robotsMeta} ${xRobotsTag}`.toLowerCase();
  return combined.includes("noindex");
}

function isInternalHref(u, pageUrl) {
  const pageOrigin = new URL(pageUrl).origin;
  if (u.origin === pageOrigin) return true;
  if (u.hostname === "www.kinexisdigital.com" || u.hostname === "kinexisdigital.com") return true;
  return /^\/(en|es)(\/|$)/.test(u.pathname);
}

function extractInternalLinks(html, pageUrl, pageNofollow) {
  const origin = new URL(pageUrl).origin;
  const links = [];
  const anchorRe = /<a\b[^>]*href=["']([^"'#]+)["'][^>]*>/gi;
  let m;
  while ((m = anchorRe.exec(html)) !== null) {
    const tag = m[0];
    const href = m[1];
    if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) continue;
    try {
      const u = new URL(href, pageUrl);
      if (!isInternalHref(u, pageUrl)) continue;
      let p = u.pathname;
      if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
      const relNofollow = /\bnofollow\b/i.test(tag);
      const isDofollow = !pageNofollow && !relNofollow;
      links.push({
        href: `${origin}${p}`,
        path: p,
        dofollow: isDofollow,
        nofollow: !isDofollow,
        relNofollow,
        pageLevelNofollow: pageNofollow,
      });
    } catch {
      /* skip */
    }
  }
  return links;
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

async function fetchPage(url) {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "User-Agent": USER_AGENT, Accept: "text/html" },
    });
    const html =
      res.headers.get("content-type")?.includes("text/html") ? await res.text() : "";
    return {
      url,
      finalUrl: res.url,
      status: res.status,
      html,
      xRobotsTag: res.headers.get("x-robots-tag") ?? "",
      error: null,
    };
  } catch (e) {
    return {
      url,
      finalUrl: url,
      status: 0,
      html: "",
      xRobotsTag: "",
      error: e.message,
    };
  }
}

async function probeRedirect(targetUrl) {
  try {
    const res = await fetch(targetUrl, {
      redirect: "manual",
      headers: { "User-Agent": USER_AGENT },
    });
    return {
      url: targetUrl,
      status: res.status,
      isRedirect: res.status >= 300 && res.status < 400,
      location: res.headers.get("location") ?? "",
    };
  } catch (e) {
    return { url: targetUrl, status: 0, isRedirect: false, location: "", error: e.message };
  }
}

async function fetchSitemapUrls() {
  const res = await fetch(`${base}/sitemap.xml`, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`sitemap fetch failed: HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => {
      const pathname = normalizePathname(m[1]);
      return normalizeUrl(`${base}${pathname}`);
    })
    .filter(Boolean);
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

async function main() {
  const started = new Date().toISOString();
  console.log(`\nPhase 6 internal links audit — ${base}\n${"=".repeat(60)}\n`);

  const sitemapUrls = await fetchSitemapUrls();
  const extraUrls = [`${base}/en/lead-magnet`, `${base}/es/lead-magnet`].map(normalizeUrl);
  const allUrls = [...new Set([...sitemapUrls, ...extraUrls])];
  console.log(`Sitemap URLs: ${sitemapUrls.length} (+ ${extraUrls.length} lead-magnet)\n`);

  let done = 0;
  const pageData = await mapPool(
    allUrls,
    async (url) => {
      const fetchResult = await fetchPage(url);
      const robotsMeta = extractRobotsMeta(fetchResult.html);
      const pageNofollow = pageLevelNofollow(robotsMeta, fetchResult.xRobotsTag);
      const pageNoindex = pageLevelNoindex(robotsMeta, fetchResult.xRobotsTag);
      const outlinks =
        fetchResult.status === 200
          ? extractInternalLinks(fetchResult.html, fetchResult.finalUrl, pageNofollow)
          : [];

      done++;
      if (done % 50 === 0 || done === allUrls.length) {
        process.stdout.write(`  Crawled ${done}/${allUrls.length} URLs\r`);
      }

      return {
        url,
        finalUrl: normalizeUrl(fetchResult.finalUrl),
        path: normalizePathname(fetchResult.finalUrl),
        status: fetchResult.status,
        inSitemap: sitemapUrls.includes(normalizeUrl(url)),
        pageNoindex,
        pageNofollow,
        intentionalNoindex: INTENTIONAL_NOINDEX_PATHS.has(normalizePathname(fetchResult.finalUrl)),
        outlinks,
        error: fetchResult.error,
      };
    },
    CONCURRENCY
  );
  console.log("\n");

  const pageByUrl = new Map(pageData.map((p) => [pageKey(p.finalUrl), p]));

  const inlinkGraph = new Map();
  for (const page of pageData) {
    inlinkGraph.set(pageKey(page.finalUrl), { dofollow: 0, nofollow: 0, sources: [] });
  }

  const redirectOutlinks = [];
  const uniqueRedirectTargets = new Set();

  for (const page of pageData) {
    for (const link of page.outlinks) {
      const targetKey = pageKey(link.href);
      const target = pageByUrl.get(targetKey);
      if (target) {
        const stats = inlinkGraph.get(targetKey);
        if (link.dofollow) stats.dofollow++;
        else stats.nofollow++;
        stats.sources.push({
          from: page.finalUrl,
          dofollow: link.dofollow,
          pageLevelNofollow: link.pageLevelNofollow,
          relNofollow: link.relNofollow,
        });
      } else {
        uniqueRedirectTargets.add(link.href);
      }
    }
  }

  console.log(`Probing ${uniqueRedirectTargets.size} external-to-graph targets for redirects...`);
  const redirectProbeCache = new Map();
  await mapPool(
    [...uniqueRedirectTargets],
    async (targetUrl) => {
      const probe = await probeRedirect(targetUrl);
      redirectProbeCache.set(targetUrl, probe);
    },
    CONCURRENCY
  );

  for (const page of pageData) {
    for (const link of page.outlinks) {
      if (pageByUrl.has(link.href)) continue;
      const probe = redirectProbeCache.get(link.href);
      if (probe?.isRedirect) {
        redirectOutlinks.push({
          source: page.finalUrl,
          target: link.href,
          status: probe.status,
          location: probe.location,
        });
      }
    }
  }

  const rows = pageData.map((page) => {
    const inlinks = inlinkGraph.get(pageKey(page.finalUrl)) ?? { dofollow: 0, nofollow: 0, sources: [] };
    const outTo3xx = redirectOutlinks.filter((r) => r.source === page.finalUrl);
    const issues = [];

    if (page.status !== 200) issues.push(`page_status_${page.status}`);
    if (page.inSitemap && inlinks.dofollow < MIN_DOFOLLOW_INLINKS) {
      issues.push("thin_dofollow_inlinks");
    }
    if (page.inSitemap && inlinks.dofollow === 0 && inlinks.nofollow === 0) {
      issues.push("orphan_no_inlinks");
    }
    if (inlinks.dofollow > 0 && inlinks.nofollow > 0) {
      issues.push("mixed_dofollow_nofollow_inlinks");
    }
    if (outTo3xx.length > 0) issues.push("outlinks_to_redirect");

    const nofollowSources = inlinks.sources.filter((s) => !s.dofollow);
    const leadMagnetNofollowOnly =
      inlinks.nofollow === 1 &&
      inlinks.dofollow >= 1 &&
      nofollowSources.length === 1 &&
      LEAD_MAGNET_PATHS.has(normalizePathname(nofollowSources[0]?.from ?? ""));

    return {
      url: page.url,
      final_url: page.finalUrl,
      path: page.path,
      http_status: page.status,
      in_sitemap: page.inSitemap ? "yes" : "no",
      indexable: page.pageNoindex ? "no" : "yes",
      intentional_noindex: page.intentionalNoindex ? "yes" : "no",
      page_level_nofollow: page.pageNofollow ? "yes" : "no",
      dofollow_inlinks: inlinks.dofollow,
      nofollow_inlinks: inlinks.nofollow,
      total_inlinks: inlinks.dofollow + inlinks.nofollow,
      internal_outlinks: page.outlinks.length,
      outlinks_to_3xx: outTo3xx.length,
      outlinks_3xx_targets: outTo3xx.map((r) => r.target).join("|"),
      lead_magnet_nofollow_pattern: leadMagnetNofollowOnly ? "yes" : "no",
      issues: [...new Set(issues)].join(";"),
      pass:
        page.intentionalNoindex ||
        (page.inSitemap &&
          inlinks.dofollow >= MIN_DOFOLLOW_INLINKS &&
          outTo3xx.length === 0 &&
          !issues.includes("orphan_no_inlinks")),
    };
  });

  const ahrefsUrlsByExport = {};
  for (const [name, csvPath] of Object.entries(AHREFS_EXPORTS)) {
    ahrefsUrlsByExport[name] = loadAhrefsRowUrls(csvPath);
  }

  function compareAhrefs(exportName, urls, liveCheck) {
    return urls.map((ahrefsUrl) => {
      const live = rows.find((r) => normalizeUrl(r.final_url) === normalizeUrl(ahrefsUrl));
      return {
        export: exportName,
        ahrefs_url: ahrefsUrl,
        live_found: Boolean(live),
        live_dofollow_inlinks: live?.dofollow_inlinks ?? null,
        live_nofollow_inlinks: live?.nofollow_inlinks ?? null,
        live_outlinks_to_3xx: live?.outlinks_to_3xx ?? null,
        live_lead_magnet_pattern: live?.lead_magnet_nofollow_pattern ?? null,
        ahrefs_still_applies: live ? liveCheck(live) : null,
        live_issues: live?.issues ?? "",
      };
    });
  }

  const ahrefsComparison = [
    ...compareAhrefs(
      "links_to_redirect",
      [
        ...ahrefsUrlsByExport.links_to_redirect_https,
        ...ahrefsUrlsByExport.links_to_redirect_http,
      ],
      (live) => live.outlinks_to_3xx > 0
    ),
    ...compareAhrefs(
      "one_dofollow_inlink_indexable",
      ahrefsUrlsByExport.one_dofollow_inlink_indexable,
      (live) => live.dofollow_inlinks < MIN_DOFOLLOW_INLINKS && live.in_sitemap === "yes"
    ),
    ...compareAhrefs(
      "mixed_inlinks_indexable",
      ahrefsUrlsByExport.mixed_inlinks_indexable,
      (live) =>
        live.dofollow_inlinks > 0 &&
        live.nofollow_inlinks > 0 &&
        live.lead_magnet_nofollow_pattern !== "yes"
    ),
    ...compareAhrefs(
      "outgoing_nofollow",
      ahrefsUrlsByExport.outgoing_nofollow,
      (live) => live.page_level_nofollow === "no"
    ),
  ];

  const sitemapRows = rows.filter((r) => r.in_sitemap === "yes");
  const thinInlink = sitemapRows.filter((r) => r.dofollow_inlinks < MIN_DOFOLLOW_INLINKS);
  const mixedInlinks = sitemapRows.filter((r) => r.issues.includes("mixed_dofollow_nofollow_inlinks"));
  const leadMagnetPattern = sitemapRows.filter((r) => r.lead_magnet_nofollow_pattern === "yes");
  const redirectLinkPages = sitemapRows.filter((r) => r.outlinks_to_3xx > 0);
  const orphans = sitemapRows.filter((r) => r.issues.includes("orphan_no_inlinks"));

  let srcHasRelNofollow = false;
  const srcDir = path.join(__dirname, "..", "src");
  if (fs.existsSync(srcDir)) {
    const walk = (dir) => {
      for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, ent.name);
        if (ent.isDirectory() && ent.name !== "node_modules") walk(full);
        else if (/\.(tsx?|jsx?)$/.test(ent.name)) {
          const text = fs.readFileSync(full, "utf8");
          if (/rel=["']nofollow|rel=\{[^}]*nofollow/.test(text)) srcHasRelNofollow = true;
        }
      }
    };
    walk(srcDir);
  }

  const summary = {
    timestamp: started,
    finished: new Date().toISOString(),
    base,
    sitemap_url_count: sitemapUrls.length,
    urls_crawled: rows.length,
    min_dofollow_inlinks_target: MIN_DOFOLLOW_INLINKS,
    sitemap_pass: sitemapRows.filter((r) => r.pass).length,
    sitemap_fail: sitemapRows.filter((r) => !r.pass).length,
    thin_dofollow_inlinks: thinInlink.length,
    thin_dofollow_inlinks_urls: thinInlink.map((r) => r.final_url),
    mixed_inlinks_count: mixedInlinks.length,
    lead_magnet_nofollow_pattern_count: leadMagnetPattern.length,
    outlinks_to_redirect_pages: redirectLinkPages.length,
    outlinks_to_redirect_total: redirectOutlinks.length,
    orphan_count: orphans.length,
    orphan_urls: orphans.map((r) => r.final_url),
    src_has_rel_nofollow_on_internal: srcHasRelNofollow,
    ahrefs_still_applies: {
      links_to_redirect: ahrefsComparison
        .filter((c) => c.export === "links_to_redirect")
        .filter((c) => c.ahrefs_still_applies === true).length,
      one_dofollow_inlink: ahrefsComparison
        .filter((c) => c.export === "one_dofollow_inlink_indexable")
        .filter((c) => c.ahrefs_still_applies === true).length,
      mixed_inlinks_unexplained: ahrefsComparison
        .filter((c) => c.export === "mixed_inlinks_indexable")
        .filter((c) => c.ahrefs_still_applies === true).length,
    },
    ahrefs_resolved: {
      links_to_redirect: ahrefsComparison
        .filter((c) => c.export === "links_to_redirect")
        .filter((c) => c.ahrefs_still_applies === false).length,
      one_dofollow_inlink: ahrefsComparison
        .filter((c) => c.export === "one_dofollow_inlink_indexable")
        .filter((c) => c.ahrefs_still_applies === false).length,
    },
    phase6Pass:
      redirectLinkPages.length === 0 &&
      orphans.length === 0 &&
      thinInlink.length === 0 &&
      !srcHasRelNofollow,
  };

  const outDir = path.join(__dirname, "..", "docs", "seo-remediation");
  fs.mkdirSync(outDir, { recursive: true });

  const csvHeaders = [
    "url",
    "final_url",
    "path",
    "http_status",
    "in_sitemap",
    "indexable",
    "intentional_noindex",
    "page_level_nofollow",
    "dofollow_inlinks",
    "nofollow_inlinks",
    "total_inlinks",
    "internal_outlinks",
    "outlinks_to_3xx",
    "outlinks_3xx_targets",
    "lead_magnet_nofollow_pattern",
    "issues",
    "pass",
  ];
  const csvPath = path.join(outDir, "phase-06-audit.csv");
  fs.writeFileSync(
    csvPath,
    [csvHeaders.join(","), ...rows.map((r) => csvHeaders.map((h) => csvEscape(r[h])).join(","))].join("\n"),
    "utf8"
  );

  const validationPath = path.join(outDir, "phase-06-validation.json");
  fs.writeFileSync(
    validationPath,
    JSON.stringify(
      {
        summary,
        ahrefsComparison,
        redirectOutlinks,
        thinInlink,
        mixedInlinks: mixedInlinks.slice(0, 20),
        leadMagnetPatternCount: leadMagnetPattern.length,
        failures: sitemapRows.filter((r) => !r.pass),
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

  process.exit(summary.phase6Pass ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
