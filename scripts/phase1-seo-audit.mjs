#!/usr/bin/env node
/**
 * Phase 1 — SEO baseline audit (inventory only, no fixes).
 * Produces one row per crawled URL with technical SEO signals.
 *
 * Usage: node scripts/phase1-seo-audit.mjs [baseUrl]
 * Output: docs/seo-remediation/phase-01-audit.csv + phase-01-audit-summary.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseArg = (process.argv[2] || "https://www.kinexisdigital.com").replace(/\/$/, "");
const USER_AGENT = "KinexisPhase1Audit/1.0";

const EXTRA_PROBE_URLS = [
  "/",
  "/en",
  "/es",
  "/services/cro",
  "/en/services/cro",
  "/es/services/cro",
  "/lead-magnet",
  "/en/lead-magnet",
  "/es/lead-magnet",
];

function csvEscape(value) {
  const s = value == null ? "" : String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function extractCanonical(html) {
  const re = /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i;
  const alt = /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i;
  return html.match(re)?.[1] ?? html.match(alt)?.[1] ?? "";
}

function extractHtmlLang(html) {
  const m = html.match(/<html[^>]+lang=["']([^"']+)["']/i);
  return m?.[1] ?? "";
}

function extractRobotsMeta(html) {
  const re = /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i;
  const alt = /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']robots["']/i;
  return html.match(re)?.[1] ?? html.match(alt)?.[1] ?? "";
}

function extractHreflang(html) {
  const tags = [];
  const re =
    /<link[^>]+rel=["']alternate["'][^>]+hreflang=["']([^"']+)["'][^>]+href=["']([^"']+)["'][^>]*>/gi;
  const reAlt =
    /<link[^>]+hreflang=["']([^"']+)["'][^>]+href=["']([^"']+)["'][^>]+rel=["']alternate["'][^>]*>/gi;
  for (const pattern of [re, reAlt]) {
    let m;
    while ((m = pattern.exec(html)) !== null) {
      tags.push({ hreflang: m[1], href: m[2] });
    }
  }
  return tags;
}

function extractInternalLinks(html, pageUrl) {
  const links = [];
  const re = /href=["']([^"'#]+)/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const href = m[1];
    if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) continue;
    try {
      const u = new URL(href, pageUrl);
      if (u.origin === new URL(baseArg).origin) {
        links.push(u.pathname + (u.search || ""));
      }
    } catch {
      /* skip */
    }
  }
  return links;
}

function deriveIndexability(status, robotsMeta, xRobotsTag) {
  if (status < 200 || status >= 300) return "non-200";
  const combined = `${robotsMeta} ${xRobotsTag}`.toLowerCase();
  if (combined.includes("noindex")) return "noindex";
  if (combined.includes("nofollow") && !combined.includes("follow")) return "nofollow";
  return "indexable";
}

async function fetchPage(url, redirectMode = "manual") {
  try {
    const res = await fetch(url, {
      redirect: redirectMode,
      headers: { "User-Agent": USER_AGENT, Accept: "text/html,application/xhtml+xml" },
    });
    const xRobotsTag = res.headers.get("x-robots-tag") ?? "";
    let html = "";
    const contentType = res.headers.get("content-type") ?? "";
    if (contentType.includes("text/html") || contentType.includes("application/xhtml")) {
      html = await res.text();
    } else if (res.status < 300) {
      html = await res.text();
    }
    return {
      url,
      status: res.status,
      location: res.headers.get("location") ?? "",
      xRobotsTag,
      html,
      error: null,
    };
  } catch (e) {
    return { url, status: 0, location: "", xRobotsTag: "", html: "", error: e.message };
  }
}

async function resolveFinalUrl(startUrl) {
  let current = startUrl;
  const chain = [];
  for (let i = 0; i < 10; i++) {
    const res = await fetchPage(current, "manual");
    chain.push({ url: current, status: res.status, location: res.location });
    if (res.status >= 300 && res.status < 400 && res.location) {
      current = new URL(res.location, current).href;
      continue;
    }
    return {
      startUrl,
      finalUrl: current,
      finalStatus: res.status,
      redirectChain: chain,
      html: res.html,
      xRobotsTag: res.xRobotsTag,
      error: res.error,
    };
  }
  return {
    startUrl,
    finalUrl: current,
    finalStatus: 0,
    redirectChain: chain,
    html: "",
    xRobotsTag: "",
    error: "redirect chain exceeded 10 hops",
  };
}

async function fetchSitemapUrls(base) {
  const res = await fetch(`${base}/sitemap.xml`, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`sitemap fetch failed: HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => {
      try {
        return new URL(m[1]).href;
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

function normalizePathname(url) {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

async function main() {
  const started = new Date().toISOString();
  console.log(`\nPhase 1 SEO audit — ${baseArg}\n${"=".repeat(60)}\n`);

  const sitemapUrls = await fetchSitemapUrls(baseArg);
  console.log(`Sitemap URLs: ${sitemapUrls.length}`);

  const probeUrls = EXTRA_PROBE_URLS.map((p) => `${baseArg}${p.startsWith("/") ? p : `/${p}`}`);
  const allStartUrls = [...new Set([...sitemapUrls, ...probeUrls])];
  console.log(`Total URLs to resolve (sitemap + probes): ${allStartUrls.length}\n`);

  const sitemapPathSet = new Set(sitemapUrls.map((u) => normalizePathname(u)));
  const rows = [];
  const inlinkTargets = new Map();

  for (let i = 0; i < allStartUrls.length; i++) {
    const startUrl = allStartUrls[i];
    const resolved = await resolveFinalUrl(startUrl);
    const finalPath = normalizePathname(resolved.finalUrl);
    const inSitemap = sitemapPathSet.has(normalizePathname(startUrl)) || sitemapPathSet.has(finalPath);

    let canonical = "";
    let htmlLang = "";
    let robotsMeta = "";
    let hreflangSet = "";
    let internalLinks = [];

    if (resolved.finalStatus === 200 && resolved.html) {
      canonical = extractCanonical(resolved.html);
      htmlLang = extractHtmlLang(resolved.html);
      robotsMeta = extractRobotsMeta(resolved.html);
      const hreflangs = extractHreflang(resolved.html);
      hreflangSet = hreflangs.map((t) => `${t.hreflang}:${t.href}`).join(" | ");
      internalLinks = extractInternalLinks(resolved.html, resolved.finalUrl);
      for (const link of internalLinks) {
        inlinkTargets.set(link, (inlinkTargets.get(link) ?? 0) + 1);
      }
    }

    const redirectHops = resolved.redirectChain.filter((c) => c.status >= 300 && c.status < 400).length;
    const indexability = deriveIndexability(resolved.finalStatus, robotsMeta, resolved.xRobotsTag);

    rows.push({
      start_url: startUrl,
      http_status: resolved.finalStatus,
      final_url: resolved.finalUrl,
      redirect_hops: redirectHops,
      redirect_chain: resolved.redirectChain.map((c) => `${c.status}:${c.url}${c.location ? `->${c.location}` : ""}`).join(" > "),
      indexability,
      robots_meta: robotsMeta,
      x_robots_tag: resolved.xRobotsTag,
      canonical,
      html_lang: htmlLang,
      hreflang_set: hreflangSet,
      hreflang_count: hreflangSet ? hreflangSet.split(" | ").length : 0,
      in_sitemap: inSitemap ? "yes" : "no",
      internal_outlinks: internalLinks.length,
      error: resolved.error ?? "",
    });

    if ((i + 1) % 25 === 0 || i + 1 === allStartUrls.length) {
      process.stdout.write(`  Resolved ${i + 1}/${allStartUrls.length} URLs\r`);
    }
  }

  console.log("\n\nCounting internal inlinks across crawled 200 pages...\n");

  for (const row of rows) {
    if (row.http_status !== 200) {
      row.internal_inlinks = 0;
      continue;
    }
    const pathKey = normalizePathname(row.final_url);
    row.internal_inlinks = inlinkTargets.get(pathKey) ?? 0;
  }

  const headers = [
    "start_url",
    "http_status",
    "final_url",
    "redirect_hops",
    "redirect_chain",
    "indexability",
    "robots_meta",
    "x_robots_tag",
    "canonical",
    "html_lang",
    "hreflang_count",
    "hreflang_set",
    "in_sitemap",
    "internal_outlinks",
    "internal_inlinks",
    "error",
  ];

  const outDir = path.join(__dirname, "..", "docs", "seo-remediation");
  fs.mkdirSync(outDir, { recursive: true });

  const csvPath = path.join(outDir, "phase-01-audit.csv");
  const csvLines = [headers.join(",")];
  for (const row of rows) {
    csvLines.push(headers.map((h) => csvEscape(row[h])).join(","));
  }
  fs.writeFileSync(csvPath, csvLines.join("\n"), "utf8");

  const summary = {
    base: baseArg,
    started,
    finished: new Date().toISOString(),
    sitemap_url_count: sitemapUrls.length,
    urls_crawled: rows.length,
    status_breakdown: {},
    indexability_breakdown: {},
    redirect_urls: rows.filter((r) => r.redirect_hops > 0).length,
    redirect_chains_over_1: rows.filter((r) => r.redirect_hops > 1).length,
    missing_canonical_200: rows.filter((r) => r.http_status === 200 && !r.canonical).length,
    missing_hreflang_200: rows.filter((r) => r.http_status === 200 && r.hreflang_count === 0).length,
    noindex_pages: rows.filter((r) => r.indexability === "noindex").length,
    not_in_sitemap_200: rows.filter((r) => r.http_status === 200 && r.in_sitemap === "no").length,
    hreflang_invalid_signals: rows.filter((r) => {
      if (r.http_status !== 200 || !r.hreflang_set) return false;
      return r.hreflang_set.includes("http://") || r.canonical.startsWith("http://");
    }).length,
    canonical_http: rows.filter((r) => r.canonical.startsWith("http://")).length,
    html_lang_invalid: rows.filter((r) => r.http_status === 200 && r.html_lang && !/^(en|es(-419)?)$/.test(r.html_lang)).length,
  };

  for (const row of rows) {
    summary.status_breakdown[row.http_status] = (summary.status_breakdown[row.http_status] ?? 0) + 1;
    summary.indexability_breakdown[row.indexability] = (summary.indexability_breakdown[row.indexability] ?? 0) + 1;
  }

  const summaryPath = path.join(outDir, "phase-01-audit-summary.json");
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), "utf8");

  console.log("=".repeat(60));
  console.log("PHASE 1 AUDIT SUMMARY");
  console.log("=".repeat(60));
  console.log(JSON.stringify(summary, null, 2));
  console.log(`\nCSV: ${csvPath}`);
  console.log(`Summary JSON: ${summaryPath}\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
