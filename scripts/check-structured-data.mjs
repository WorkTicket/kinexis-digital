/**
 * Validate JSON-LD across representative page types.
 * Usage: node scripts/check-structured-data.mjs [baseUrl]
 */
const base = (process.argv[2] || "http://127.0.0.1:3000").replace(/\/$/, "");

const PAGES = [
  { path: "/", requireTypes: ["Organization", "WebSite"] },
  { path: "/pricing", requireTypes: ["Organization", "WebSite"] },
  { path: "/faqs", requireTypes: ["FAQPage", "Organization"] },
  { path: "/blog", requireTypes: ["Organization", "WebSite"] },
  { path: "/case-studies/preferred-plumbing", requireTypes: ["Organization"] },
  { path: "/industries/plumbing", requireTypes: ["Organization"] },
  { path: "/portfolio", requireTypes: ["Organization", "WebSite"] },
  { path: "/contact", requireTypes: ["Organization"] },
  { path: "/es", requireTypes: ["Organization", "WebSite"] },
];

function collectTypes(node, out = new Set()) {
  if (!node || typeof node !== "object") return out;
  if (Array.isArray(node)) {
    for (const item of node) collectTypes(item, out);
    return out;
  }
  if (typeof node["@type"] === "string") out.add(node["@type"]);
  if (Array.isArray(node["@type"])) for (const t of node["@type"]) out.add(t);
  if (node["@graph"]) collectTypes(node["@graph"], out);
  for (const value of Object.values(node)) {
    if (value && typeof value === "object") collectTypes(value, out);
  }
  return out;
}

function extractJsonLd(html) {
  const blocks = [];
  for (const match of html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    const raw = match[1].trim();
    try {
      blocks.push(JSON.parse(raw));
    } catch {
      blocks.push({ __parseError: true, raw: raw.slice(0, 120) });
    }
  }
  return blocks;
}

function collectOrgIds(node, out = []) {
  if (!node || typeof node !== "object") return out;
  if (Array.isArray(node)) {
    for (const item of node) collectOrgIds(item, out);
    return out;
  }
  const type = node["@type"];
  const isOrg = type === "Organization" || (Array.isArray(type) && type.includes("Organization"));
  if (isOrg && typeof node["@id"] === "string") out.push(node["@id"]);
  if (node["@graph"]) collectOrgIds(node["@graph"], out);
  for (const value of Object.values(node)) {
    if (value && typeof value === "object") collectOrgIds(value, out);
  }
  return out;
}

let failed = 0;
const expectedOrgId = `${base.includes("kinexisdigital.com") ? "https://www.kinexisdigital.com" : base}/#org`;
for (const page of PAGES) {
  const url = `${base}${page.path}`;
  try {
    const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(25_000) });
    if (!res.ok) {
      failed += 1;
      console.log(`FAIL ${res.status} ${page.path}`);
      continue;
    }
    const html = await res.text();
    const blocks = extractJsonLd(html);
    if (!blocks.length) {
      failed += 1;
      console.log(`FAIL ${page.path} — no JSON-LD`);
      continue;
    }
    if (blocks.some((b) => b.__parseError)) {
      failed += 1;
      console.log(`FAIL ${page.path} — invalid JSON-LD JSON`);
      continue;
    }
    const types = collectTypes(blocks);
    const missing = page.requireTypes.filter((t) => !types.has(t));
    if (missing.length) {
      failed += 1;
      console.log(`FAIL ${page.path} — missing ${missing.join(", ")} (found: ${[...types].join(", ") || "none"})`);
      continue;
    }
    const orgIds = collectOrgIds(blocks);
    const badOrg = orgIds.find((id) => id.includes("://kinexisdigital.com/") || (id.includes("kinexisdigital.com") && !id.includes("://www.")));
    if (badOrg) {
      failed += 1;
      console.log(`FAIL ${page.path} — non-www Organization @id ${badOrg}`);
      continue;
    }
    if (page.requireTypes.includes("Organization") && orgIds.length && !orgIds.every((id) => id === expectedOrgId || id.endsWith("/#org"))) {
      // Allow only the canonical www English org id for this brand.
      const off = orgIds.filter((id) => id !== expectedOrgId);
      if (off.length) {
        failed += 1;
        console.log(`FAIL ${page.path} — Organization @id must be ${expectedOrgId} (found ${off.join(", ")})`);
        continue;
      }
    }
    console.log(`OK   ${page.path} — ${[...types].sort().join(", ")}`);
  } catch (error) {
    failed += 1;
    console.log(`FAIL ${page.path} — ${error instanceof Error ? error.message : "error"}`);
  }
}

console.log(`\nStructured data: ${PAGES.length - failed}/${PAGES.length} page types OK`);
process.exit(failed ? 1 : 0);
