#!/usr/bin/env node
/**
 * Phase 2 URL Architecture validation.
 * Usage: node scripts/phase2-url-architecture.mjs [baseUrl]
 */
import { writeFileSync } from "node:fs";
const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");

const REDIRECT_PROBES = [
  { path: "/services/cro", maxHops: 1, finalIncludes: "/services/funnels" },
  { path: "/en/services/cro", maxHops: 1, finalIncludes: "/en/services/funnels" },
  { path: "/es/services/cro", maxHops: 1, finalIncludes: "/es/services/funnels" },
  { path: "/pricing/cro", maxHops: 1, finalIncludes: "/pricing/funnels" },
];

const BLOG_SLUGS = [
  "technical-seo-guide",
  "local-seo-checklist",
  "landing-page-best-practices",
  "seo-audit-framework",
];

const UNPREFIXED_REL = /href=["']\/services\//i;
const LOCALE_PREFIXED = /href=["']\/en\/services\/|href=["']\/es\/services\//;

async function followRedirectChain(path) {
  const chain = [];
  let url = `${base}${path}`;
  for (let i = 0; i < 10; i++) {
    const res = await fetch(url, { redirect: "manual", headers: { "User-Agent": "KinexisPhase2/1.0" } });
    chain.push({ url, status: res.status });
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location");
      if (!loc) break;
      url = new URL(loc, url).href;
      continue;
    }
    return { chain, finalUrl: url, finalStatus: res.status };
  }
  return { chain, finalUrl: url, finalStatus: 0, error: "too many hops" };
}

async function fetchHtml(path) {
  const res = await fetch(`${base}${path}`, {
    redirect: "follow",
    headers: { "User-Agent": "KinexisPhase2/1.0" },
  });
  return { path, status: res.status, html: await res.text(), finalUrl: res.url };
}

function extractInternalLinks(html, pageUrl) {
  const links = [];
  const re = /href=["']([^"'#]+)/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const href = m[1];
    if (href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    try {
      const u = new URL(href, pageUrl);
      if (u.origin === new URL(base).origin) links.push(u.pathname);
    } catch {
      /* skip */
    }
  }
  return links;
}

async function checkRedirect(path, maxHops, finalIncludes) {
  const { chain, finalUrl, finalStatus } = await followRedirectChain(path);
  const hops = chain.filter((c) => c.status >= 300 && c.status < 400).length;
  const ok = hops <= maxHops && finalStatus === 200 && finalUrl.includes(finalIncludes);
  return { path, ok, hops, maxHops, finalUrl, finalStatus, chain };
}

async function checkBlogLinks(locale, slug) {
  const path = `/${locale}/blog/${slug}`;
  const { html, status, finalUrl } = await fetchHtml(path);
  const unprefixed = UNPREFIXED_REL.test(html);
  const hasLocaleLinks = LOCALE_PREFIXED.test(html);
  const links = extractInternalLinks(html, finalUrl);
  const redirectLinks = [];
  for (const link of links) {
    if (!link.startsWith(`/${locale}/`) && !link.match(/^\/(en|es)\//)) {
      const probe = await followRedirectChain(link);
      if (probe.chain.some((c) => c.status >= 300 && c.status < 400)) {
        redirectLinks.push({ link, chain: probe.chain.map((c) => c.status) });
      }
    }
  }
  return {
    path,
    status,
    unprefixedServiceLinks: unprefixed,
    hasLocalePrefixedServiceLinks: hasLocaleLinks,
    internalLinksToRedirect: redirectLinks,
    ok: status === 200 && !unprefixed && redirectLinks.length === 0,
  };
}

const results = {
  timestamp: new Date().toISOString(),
  base,
  redirectProbes: [],
  blogLinkChecks: [],
  summary: {},
};

console.log(`Phase 2 validation — ${base}\n`);

for (const probe of REDIRECT_PROBES) {
  const r = await checkRedirect(probe.path, probe.maxHops, probe.finalIncludes);
  results.redirectProbes.push(r);
  console.log(
    `${r.ok ? "PASS" : "FAIL"} redirect ${probe.path}: ${r.hops} hop(s) → ${r.finalUrl} (${r.finalStatus})`
  );
}

for (const slug of BLOG_SLUGS) {
  for (const locale of ["en", "es"]) {
    const r = await checkBlogLinks(locale, slug);
    results.blogLinkChecks.push(r);
    console.log(
      `${r.ok ? "PASS" : "FAIL"} blog ${r.path}: unprefixed=${r.unprefixedServiceLinks}, redirectLinks=${r.internalLinksToRedirect.length}`
    );
  }
}

const redirectFails = results.redirectProbes.filter((r) => !r.ok).length;
const blogFails = results.blogLinkChecks.filter((r) => !r.ok).length;

results.summary = {
  redirectProbesPass: results.redirectProbes.length - redirectFails,
  redirectProbesFail: redirectFails,
  blogChecksPass: results.blogLinkChecks.length - blogFails,
  blogChecksFail: blogFails,
  phase2Pass: redirectFails === 0 && blogFails === 0,
};

console.log("\n--- Summary ---");
console.log(JSON.stringify(results.summary, null, 2));

writeFileSync(
  "docs/seo-remediation/phase-02-validation.json",
  JSON.stringify(results, null, 2)
);

process.exit(results.summary.phase2Pass ? 0 : 1);
