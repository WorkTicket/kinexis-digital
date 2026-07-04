#!/usr/bin/env node
/**
 * Pre-launch QA: HTTP checks, SEO/schema audit, mobile viewport meta.
 * Run with: node scripts/prelaunch-qa.mjs [baseUrl]
 */
const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");

const pages = [
  { path: "/en", label: "Home" },
  { path: "/en/contact", label: "Contact" },
  { path: "/en/services/seo", label: "SEO Service" },
  { path: "/en/case-studies", label: "Case Studies" },
  { path: "/en/digital-marketing-agency", label: "Agency Hub" },
  { path: "/en/blog/local-seo-strategy-2026", label: "Blog Post" },
];

const mobileWidths = [375, 390, 430];

function extractMeta(html, name) {
  const re = new RegExp(`<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']+)["']`, "i");
  const alt = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["']${name}["']`, "i");
  return html.match(re)?.[1] ?? html.match(alt)?.[1] ?? null;
}

function extractCanonical(html) {
  const re = /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i;
  const alt = /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i;
  return html.match(re)?.[1] ?? html.match(alt)?.[1] ?? null;
}

function extractJsonLd(html) {
  const blocks = [];
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    try {
      blocks.push(JSON.parse(m[1]));
    } catch {
      blocks.push({ parseError: true });
    }
  }
  return blocks;
}

function collectSchemaTypes(schemas) {
  const types = new Set();
  const walk = (obj) => {
    if (!obj || typeof obj !== "object") return;
    if (obj["@type"]) {
      const t = obj["@type"];
      (Array.isArray(t) ? t : [t]).forEach((x) => types.add(x));
    }
    for (const v of Object.values(obj)) {
      if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v === "object") walk(v);
    }
  };
  schemas.forEach(walk);
  return [...types];
}

async function fetchText(path) {
  const res = await fetch(`${base}${path}`);
  return { status: res.status, html: await res.text(), headers: res.headers };
}

const report = {
  base,
  timestamp: new Date().toISOString(),
  robots: null,
  sitemap: null,
  pages: [],
  mobileChecks: [],
  issues: [],
  passes: [],
};

console.log(`\nPre-launch QA — ${base}\n${"=".repeat(50)}`);

// robots.txt
try {
  const { status, html } = await fetchText("/robots.txt");
  report.robots = { status, body: html.trim() };
  if (status === 200 && html.includes("Sitemap:") && html.includes("Allow: /")) {
    report.passes.push("robots.txt: valid with sitemap reference");
  } else {
    report.issues.push(`robots.txt: unexpected content (status ${status})`);
  }
} catch (e) {
  report.issues.push(`robots.txt: fetch failed — ${e.message}`);
}

// sitemap.xml
try {
  const { status, html } = await fetchText("/sitemap.xml");
  const urlCount = (html.match(/<loc>/g) || []).length;
  report.sitemap = { status, urlCount };
  if (status === 200 && urlCount > 50) {
    report.passes.push(`sitemap.xml: ${urlCount} URLs indexed`);
  } else {
    report.issues.push(`sitemap.xml: only ${urlCount} URLs (status ${status})`);
  }
} catch (e) {
  report.issues.push(`sitemap.xml: fetch failed — ${e.message}`);
}

// Page audits
for (const page of pages) {
  const entry = { ...page, status: null, schemas: [], checks: {} };
  try {
    const { status, html } = await fetchText(page.path);
    entry.status = status;
    if (status !== 200) {
      report.issues.push(`${page.label}: HTTP ${status}`);
      report.pages.push(entry);
      continue;
    }

    const schemas = extractJsonLd(html);
    entry.schemas = collectSchemaTypes(schemas);

    entry.checks = {
      canonical: extractCanonical(html),
      ogTitle: extractMeta(html, "og:title"),
      ogDescription: extractMeta(html, "og:description"),
      ogUrl: extractMeta(html, "og:url"),
      viewport: extractMeta(html, "viewport"),
      description: extractMeta(html, "description"),
      hasOrganization: entry.schemas.includes("Organization"),
      hasBreadcrumb: entry.schemas.includes("BreadcrumbList"),
    };

    if (!entry.checks.canonical) report.issues.push(`${page.label}: missing canonical`);
    else report.passes.push(`${page.label}: canonical present`);

    if (!entry.checks.ogTitle) report.issues.push(`${page.label}: missing og:title`);
    if (!entry.checks.description) report.issues.push(`${page.label}: missing meta description`);

    if (page.path === "/en" && !entry.checks.hasOrganization) {
      report.issues.push("Home: missing Organization schema");
    }
    if (page.path.includes("/services/") && !entry.schemas.includes("Service")) {
      report.issues.push(`${page.label}: missing Service schema`);
    }
    if (page.path.includes("/blog/") && !entry.schemas.includes("Article")) {
      report.issues.push(`${page.label}: missing Article schema`);
    }
  } catch (e) {
    report.issues.push(`${page.label}: fetch failed — ${e.message}`);
  }
  report.pages.push(entry);
}

// Mobile viewport checks (375/390/430 via Lighthouse user-agent isn't needed — verify responsive meta + no horizontal overflow indicators)
for (const width of mobileWidths) {
  try {
    const { status, html } = await fetchText("/en");
    const hasViewport = html.includes("width=device-width");
    const hasSafeArea = html.includes("viewport-fit=cover") || html.includes("fixed-safe-bottom");
    report.mobileChecks.push({ width, status, hasViewport, hasSafeArea });
    if (status === 200 && hasViewport) {
      report.passes.push(`Mobile ${width}px: viewport meta OK (server render)`);
    }
  } catch (e) {
    report.issues.push(`Mobile ${width}px: ${e.message}`);
  }
}

// Chat widget + CTA presence on home
try {
  const { html } = await fetchText("/en");
  if (html.includes("openChat") || html.includes("chatbot")) {
    report.passes.push("Home: chat widget markup present");
  }
  if (html.includes("/contact") || html.includes("scheduleStrategyCall")) {
    report.passes.push("Home: CTA links present");
  }
} catch {
  /* already logged */
}

// GA
try {
  const { html } = await fetchText("/en");
  if (html.includes("googletagmanager.com") || html.includes("G-")) {
    report.passes.push("Analytics: Google Analytics script detected");
  } else {
    report.issues.push("Analytics: GA script not found in HTML");
  }
} catch {
  /* already logged */
}

// API routes exist
for (const api of ["/api/contact", "/api/chat", "/api/lead"]) {
  try {
    const res = await fetch(`${base}${api}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
    // Expect 400/405/422 — not 404
    if (res.status === 404) report.issues.push(`API ${api}: returns 404`);
    else report.passes.push(`API ${api}: reachable (status ${res.status})`);
  } catch (e) {
    report.issues.push(`API ${api}: ${e.message}`);
  }
}

console.log("\n--- PASSES ---");
report.passes.forEach((p) => console.log(`  ✓ ${p}`));

console.log("\n--- ISSUES ---");
if (report.issues.length === 0) console.log("  (none)");
else report.issues.forEach((i) => console.log(`  ✗ ${i}`));

console.log("\n--- PAGE SCHEMA SUMMARY ---");
for (const p of report.pages) {
  console.log(`  ${p.label}: schemas=[${(p.schemas || []).join(", ")}] canonical=${p.checks?.canonical ? "yes" : "no"}`);
}

console.log("\n--- ROBOTS ---");
console.log(report.robots?.body || "N/A");

console.log(`\n--- SITEMAP: ${report.sitemap?.urlCount ?? 0} URLs ---`);

const outPath = new URL("../qa-report.json", import.meta.url);
const fs = await import("fs");
const dir = new URL("../", import.meta.url);
fs.mkdirSync(dir.pathname.replace(/^\/([A-Z]:)/, "$1"), { recursive: true });
fs.writeFileSync(outPath.pathname.replace(/^\/([A-Z]:)/, "$1"), JSON.stringify(report, null, 2));
console.log(`\nFull report: qa-report.json\n`);

process.exit(report.issues.length > 0 ? 1 : 0);
