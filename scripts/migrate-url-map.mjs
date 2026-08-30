import { writeFileSync } from "node:fs";
import { resolveLegacyRedirect } from "../src/lib/legacy-redirects.mjs";

const LIVE = "https://www.kinexisdigital.com";

function locPaths(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

function pathname(url) {
  try {
    return new URL(url).pathname.replace(/\/$/, "") || "/";
  } catch {
    return url;
  }
}

function bucket(p) {
  if (p === "/" || p === "/en" || p === "/es") return "home";
  const n = p.replace(/^\/(en|es)(?=\/|$)/, "") || "/";
  if (n.startsWith("/services")) return "services";
  if (n.startsWith("/industries")) return "industries";
  if (n.startsWith("/locations")) return "locations";
  if (n.startsWith("/blog")) return "blog";
  if (n.startsWith("/case-studies")) return "case-studies";
  if (n.startsWith("/solutions")) return "solutions";
  if (n.startsWith("/pricing")) return "pricing";
  if (n.startsWith("/lp")) return "landing-pages";
  if (n.startsWith("/lead-magnet")) return "lead-magnet";
  if (n.startsWith("/team")) return "team";
  if (n.startsWith("/about") || n.startsWith("/digital-marketing-agency")) {
    return "about";
  }
  if (n.startsWith("/contact") || n.startsWith("/thank-you")) return "contact";
  if (n.startsWith("/resources")) return "resources";
  if (n === "/privacy" || n === "/terms") return "legal";
  if (n.includes("vs")) return "comparisons";
  return "other";
}

const res = await fetch(`${LIVE}/sitemap.xml`, {
  headers: { "user-agent": "kinexis-migrate-prep" },
});
const xml = await res.text();
const urls = locPaths(xml);

const KEEP_PREFIXES = [
  "/",
  "/about",
  "/contact",
  "/services",
  "/blog",
  "/case-studies",
  "/industries",
  "/industries/home-services",
  "/industries/ecommerce",
  "/resources",
  "/audit",
  "/privacy",
  "/terms",
  "/thank-you",
  "/lp/",
];

function isKeepDest(path) {
  const bare = path.split("#")[0];
  if (KEEP_PREFIXES.includes(bare)) return true;
  if (bare.startsWith("/blog/")) return true;
  if (bare.startsWith("/case-studies/")) return true;
  if (bare.startsWith("/lp/")) return true;
  return false;
}

const rows = urls.map((u) => {
  const p = pathname(u);
  const resolved = resolveLegacyRedirect(p);
  const dest = resolved
    ? `${resolved.path}${resolved.hash ? `#${resolved.hash}` : ""}`
    : p;
  return {
    live: u,
    path: p,
    bucket: bucket(p),
    dest,
    hops: resolved ? 1 : 0,
  };
});

const missing = rows.filter((r) => !isKeepDest(r.dest));
const byBucket = {};
for (const r of rows) {
  byBucket[r.bucket] ??= { count: 0, hops: 0 };
  byBucket[r.bucket].count += 1;
  byBucket[r.bucket].hops += r.hops > 0 ? 1 : 0;
}

const summary = {
  liveSitemapCount: urls.length,
  redirected: rows.filter((r) => r.hops > 0).length,
  unmappedDestinations: missing.map((r) => `${r.path} → ${r.dest}`),
  byBucket,
};

console.log(JSON.stringify(summary, null, 2));
if (missing.length) {
  writeFileSync(
    "docs/seo-remediation/migrate-url-map.json",
    JSON.stringify({ summary, missing }, null, 2),
  );
  process.exitCode = 1;
}
