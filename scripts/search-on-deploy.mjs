#!/usr/bin/env node
// Confirms the canonical host is ready for Google Search Console, then
// submits the live sitemap to IndexNow. Google reads the sitemap from
// robots.txt. IndexNow notifies the engines that participate in that protocol.
//
//   node scripts/search-on-deploy.mjs --preflight   key file only
//   node scripts/search-on-deploy.mjs --dry-run     live checks, no IndexNow POST
//   SEARCH_NOTIFY=0                                 skip the live step
//   SEARCH_BASE_URL                                 fetch this host instead of the canonical origin

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dryRun = process.argv.includes("--dry-run");
const preflight = process.argv.includes("--preflight");
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const USER_AGENT = "Mozilla/5.0 (compatible; KinexisSearchDeploy/1.0; +https://www.kinexisdigital.com)";

// Paths that must stay out of the sitemap. Keep these aligned with robots.ts
// and pages that set indexable: false.
const NON_INDEXABLE = [/^\/api(?:\/|$)/, /^\/pay(?:\/|$)/, /^\/client-login(?:\/|$)/];

const failures = [];
const warnings = [];

function pass(message) {
  console.log(`ok   ${message}`);
}

function warn(message) {
  warnings.push(message);
  console.log(`warn ${message}`);
}

function fail(message) {
  failures.push(message);
  console.log(`fail ${message}`);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function loadEnvFiles() {
  const locked = new Set(Object.keys(process.env));
  for (const name of [".env", ".env.local", ".env.production", ".env.production.local"]) {
    const path = join(root, name);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq <= 0) continue;
      const key = trimmed.slice(0, eq).trim();
      if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key) || locked.has(key)) continue;
      let value = trimmed.slice(eq + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  }
}

function loadKey() {
  const publicDir = join(root, "public");
  const matches = readdirSync(publicDir).flatMap((name) => {
    if (!name.endsWith(".txt")) return [];
    const key = name.slice(0, -".txt".length);
    if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) return [];
    const body = readFileSync(join(publicDir, name), "utf8").replace(/^\uFEFF/, "").trim();
    return body === key ? [key] : [];
  });
  if (matches.length !== 1) {
    throw new Error(
      matches.length === 0
        ? "IndexNow key file missing. Add public/<key>.txt containing the key."
        : `Expected one IndexNow key file in public/, found ${matches.length}.`,
    );
  }
  return matches[0];
}

function originOf(value, label) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`Invalid ${label}: ${value}`);
  }
  return url.origin;
}

function isLocal(origin) {
  const { hostname } = new URL(origin);
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
}

function decodeXml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'");
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i"));
  return match ? decodeXml(match[2] ?? match[3] ?? "") : "";
}

function tags(html, tagName) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi"))].map((match) => match[0]);
}

function starRules(robots) {
  let applies = false;
  const disallow = [];
  const allow = [];
  for (const raw of robots.split(/\r?\n/)) {
    const line = raw.split("#")[0].trim();
    if (!line) continue;
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const field = line.slice(0, idx).trim().toLowerCase();
    const value = line.slice(idx + 1).trim();
    if (field === "user-agent") applies = value === "*";
    else if (applies && field === "disallow" && value) disallow.push(value);
    else if (applies && field === "allow" && value) allow.push(value);
  }
  return { disallow, allow };
}

function robotsBlocks(pathname, rules) {
  // Prefix rules only. Longest match wins, and Allow wins a tie.
  const matches = (rule) => pathname.startsWith(rule);
  let best = { length: -1, blocked: false };
  for (const rule of rules.disallow) {
    if (matches(rule) && rule.length > best.length) best = { length: rule.length, blocked: true };
  }
  for (const rule of rules.allow) {
    if (matches(rule) && rule.length >= best.length) best = { length: rule.length, blocked: false };
  }
  return best.blocked;
}

function parseSitemap(xml) {
  return [...xml.matchAll(/<url\b[^>]*>([\s\S]*?)<\/url>/gi)].map((match) => {
    const body = match[1];
    return {
      loc: decodeXml(body.match(/<loc>([^<]*)<\/loc>/i)?.[1]?.trim() ?? ""),
      lastmod: decodeXml(body.match(/<lastmod>([^<]*)<\/lastmod>/i)?.[1]?.trim() ?? ""),
    };
  });
}

function hasOrganization(data) {
  const found = [];
  const visit = (node) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach(visit);
      return;
    }
    found.push(node);
    if (node["@graph"]) visit(node["@graph"]);
  };
  visit(data);
  return found.some((node) => {
    const type = node["@type"];
    const types = Array.isArray(type) ? type : [type];
    return types.includes("Organization") || types.includes("ProfessionalService");
  });
}

function timeoutMs() {
  const parsed = Number(process.env.SEARCH_TIMEOUT_MS ?? 25000);
  if (!Number.isFinite(parsed)) return 25000;
  return Math.min(120000, Math.max(1000, parsed));
}

async function request(url, attempts) {
  const timeout = timeoutMs();
  let lastError = new Error(`Could not fetch ${url}`);
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        redirect: "manual",
        cache: "no-store",
        signal: AbortSignal.timeout(timeout),
        headers: {
          accept: "text/html,application/xhtml+xml,application/xml,text/plain,*/*",
          "cache-control": "no-cache",
          "user-agent": USER_AGENT,
        },
      });
      if ((response.status === 404 || response.status >= 500) && attempt < attempts) {
        await response.body?.cancel().catch(() => {});
        await delay(750 * attempt);
        continue;
      }
      return response;
    } catch (error) {
      lastError = error instanceof Error ? error : lastError;
      if (attempt < attempts) await delay(750 * attempt);
    }
  }
  throw lastError;
}

async function textFrom(url, attempts) {
  const response = await request(url, attempts);
  const text = await response.text();
  return { response, text };
}

async function pool(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  const worker = async () => {
    for (;;) {
      const index = next;
      next += 1;
      if (index >= items.length) return;
      results[index] = await fn(items[index]);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

function onHost(loc, origin) {
  const url = new URL(loc);
  const target = new URL(origin);
  url.protocol = target.protocol;
  url.host = target.host;
  return url.href;
}

function checkHomepage(html, canonicalOrigin) {
  const lang = html.match(/<html\b[^>]*\blang\s*=\s*("([^"]*)"|'([^']*)')/i);
  const language = lang?.[2] || lang?.[3] || "";
  if (language.toLowerCase().startsWith("en")) pass(`html lang ${language}`);
  else fail("homepage html lang must start with en");

  const title = decodeXml(html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "").replace(/\s+/g, " ").trim();
  if (title) pass(`title ${title.slice(0, 90)}`);
  else fail("homepage is missing a title");

  const metas = tags(html, "meta");
  const viewport = metas.some((tag) => attr(tag, "name").toLowerCase() === "viewport" && attr(tag, "content"));
  if (viewport) pass("viewport meta tag");
  else fail("homepage is missing a viewport meta tag");

  const robots = metas
    .filter((tag) => ["robots", "googlebot"].includes(attr(tag, "name").toLowerCase()))
    .map((tag) => attr(tag, "content").toLowerCase());
  if (robots.some((value) => value.split(",").some((part) => part.trim() === "noindex"))) {
    fail("homepage robots meta is noindex");
  } else {
    pass(robots.length ? `robots ${robots.join(" | ")}` : "robots index,follow (default)");
  }

  const canonicalHref = tags(html, "link")
    .filter((tag) => attr(tag, "rel").toLowerCase().split(/\s+/).includes("canonical"))
    .map((tag) => attr(tag, "href"))
    .find(Boolean);
  if (!canonicalHref) {
    fail("homepage is missing a canonical link");
  } else {
    let canonical;
    try {
      canonical = new URL(canonicalHref, canonicalOrigin);
    } catch {
      canonical = null;
    }
    if (canonical && canonical.origin === canonicalOrigin && (canonical.pathname === "/" || canonical.pathname === "")) {
      pass(`canonical ${canonical.origin}${canonical.pathname}`);
    } else {
      fail(`homepage canonical must be ${canonicalOrigin}/`);
    }
  }

  const expected = process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim() ?? "";
  const tokens = metas
    .filter((tag) => attr(tag, "name").toLowerCase() === "google-site-verification")
    .map((tag) => attr(tag, "content"))
    .filter(Boolean);
  if (expected && tokens.includes(expected)) pass("google-site-verification meta tag matches the build token");
  else if (expected) fail("homepage is missing the NEXT_PUBLIC_GSC_VERIFICATION token");
  else if (tokens.length) pass("google-site-verification meta tag is present");
  else warn("no google-site-verification meta tag. Set NEXT_PUBLIC_GSC_VERIFICATION for a URL-prefix property, or verify the domain with DNS TXT.");

  let structured = false;
  let invalidJsonLd = false;
  for (const match of html.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      if (hasOrganization(JSON.parse(match[1]))) structured = true;
    } catch {
      invalidJsonLd = true;
    }
  }
  if (invalidJsonLd) fail("homepage JSON-LD could not be parsed");
  else if (structured) pass("JSON-LD Organization");
  else fail("homepage JSON-LD is missing Organization");
}

function indexabilityProblems(html, expectedUrl) {
  const problems = [];
  const metas = tags(html, "meta");
  const links = tags(html, "link");
  const title = decodeXml(html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "").replace(/\s+/g, " ").trim();
  const description = metas
    .filter((tag) => attr(tag, "name").toLowerCase() === "description")
    .map((tag) => attr(tag, "content").replace(/\s+/g, " ").trim())
    .find(Boolean);
  const robots = metas
    .filter((tag) => ["robots", "googlebot"].includes(attr(tag, "name").toLowerCase()))
    .map((tag) => attr(tag, "content").toLowerCase());
  const canonicals = links
    .filter((tag) => attr(tag, "rel").toLowerCase().split(/\s+/).includes("canonical"))
    .map((tag) => attr(tag, "href"))
    .filter(Boolean);
  const lang = html.match(/<html\b[^>]*\blang\s*=\s*("([^"]*)"|'([^']*)')/i);
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;

  if (!title) problems.push("missing title");
  if (!description) problems.push("missing meta description");
  if (!lang?.[2] && !lang?.[3]) problems.push("missing html lang");
  if (h1Count !== 1) problems.push(`${h1Count} h1 elements`);
  if (robots.some((value) => value.split(",").some((part) => part.trim() === "noindex"))) problems.push("noindex");
  if (canonicals.length !== 1) {
    problems.push(`${canonicals.length} canonical links`);
  } else {
    try {
      const expected = new URL(expectedUrl);
      const canonical = new URL(canonicals[0], expected);
      const clean = (url) => `${url.origin}${url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "")}`;
      if (clean(canonical) !== clean(expected)) problems.push(`canonical is ${canonical.href}`);
    } catch {
      problems.push("invalid canonical URL");
    }
  }

  let jsonLdCount = 0;
  for (const match of html.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    jsonLdCount += 1;
    try {
      JSON.parse(match[1]);
    } catch {
      problems.push("invalid JSON-LD");
    }
  }
  if (jsonLdCount === 0) problems.push("missing JSON-LD");
  return problems;
}

function checkRobots(text, canonicalOrigin, key) {
  if (Buffer.byteLength(text) > 500 * 1024) fail("robots.txt is over Google's 500 KiB limit");
  const expected = `${canonicalOrigin}/sitemap.xml`;
  const listed = [...text.matchAll(/^\s*sitemap:\s*(\S+)\s*$/gim)].map((match) => match[1]);
  if (listed.includes(expected)) pass(`robots.txt sitemap ${expected}`);
  else fail(`robots.txt must list ${expected}`);

  const rules = starRules(text);
  const paths = ["/", "/robots.txt", "/sitemap.xml", `/${key}.txt`];
  const blocked = paths.filter((path) => robotsBlocks(path, rules));
  if (blocked.length) fail(`robots.txt blocks ${blocked.join(", ")}`);
  else pass("robots.txt allows the homepage, sitemap, and IndexNow key");
}

function checkSitemap(xml, canonicalOrigin) {
  if (xml.length > 50 * 1024 * 1024) {
    fail("sitemap.xml is over the 50 MB protocol limit");
    return [];
  }
  if (!/<urlset\b/i.test(xml) || !/<\/urlset>/i.test(xml)) {
    fail("sitemap.xml is missing a urlset");
    return [];
  }
  const entries = parseSitemap(xml);
  if (entries.length === 0) fail("sitemap.xml has no URLs");
  if (entries.length > 50000) fail("sitemap.xml has more than 50,000 URLs");

  const seen = new Set();
  const locs = [];
  for (const entry of entries) {
    if (!entry.loc) {
      fail("sitemap.xml has a url without loc");
      continue;
    }
    let url;
    try {
      url = new URL(entry.loc);
    } catch {
      fail(`sitemap loc is not a URL: ${entry.loc}`);
      continue;
    }
    const problems = [];
    if (url.origin !== canonicalOrigin) problems.push(`outside ${canonicalOrigin}`);
    if (url.protocol !== "https:") problems.push("must be https");
    if (NON_INDEXABLE.some((pattern) => pattern.test(url.pathname))) problems.push("non-indexable path");
    if (!entry.lastmod || Number.isNaN(Date.parse(entry.lastmod))) problems.push("missing a valid lastmod");
    if (seen.has(entry.loc)) problems.push("duplicated");
    seen.add(entry.loc);
    if (problems.length) fail(`sitemap loc ${entry.loc} is ${problems.join(", ")}`);
    else locs.push(entry.loc);
  }
  if (entries.length && locs.length === entries.length) pass(`sitemap.xml ${locs.length} URLs with lastmod`);
  return locs;
}

function concurrency() {
  const parsed = Number(process.env.SEARCH_CONCURRENCY ?? 8);
  if (!Number.isFinite(parsed)) return 8;
  return Math.min(12, Math.max(1, Math.floor(parsed)));
}

async function checkUrls(locs, fetchOrigin, limit) {
  const bad = [];
  await pool(locs, limit, async (loc) => {
    const target = onHost(loc, fetchOrigin);
    try {
      const response = await request(target, 2);
      const status = response.status;
      if (status !== 200) {
        await response.body?.cancel().catch(() => {});
        bad.push(`${status} ${loc}`);
        return;
      }
      const contentType = response.headers.get("content-type") ?? "";
      if (!contentType.includes("text/html")) {
        await response.body?.cancel().catch(() => {});
        bad.push(`non-HTML ${loc} (${contentType || "no content-type"})`);
        return;
      }
      const html = await response.text();
      const problems = indexabilityProblems(html, loc);
      if (problems.length) bad.push(`${loc} (${problems.join(", ")})`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "request failed";
      bad.push(`error ${loc} (${message.slice(0, 160)})`);
    }
  });
  if (bad.length === 0) pass(`${locs.length} sitemap URLs are indexable with complete on-page signals`);
  else {
    const sample = bad.slice(0, 8).join("; ");
    const extra = bad.length > 8 ? `; and ${bad.length - 8} more` : "";
    fail(`${bad.length} sitemap URLs were not 200: ${sample}${extra}`);
  }
}

async function submitIndexNow(locs, canonicalOrigin, key) {
  const endpoint = process.env.INDEXNOW_ENDPOINT?.trim() || INDEXNOW_ENDPOINT;
  const payloadBase = {
    host: new URL(canonicalOrigin).host,
    key,
    keyLocation: `${canonicalOrigin}/${key}.txt`,
  };
  const statuses = [];
  for (let index = 0; index < locs.length; index += 10000) {
    const urlList = locs.slice(index, index + 10000);
    let status = 0;
    let body = "";
    for (let attempt = 1; attempt <= 4; attempt += 1) {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({ ...payloadBase, urlList }),
        signal: AbortSignal.timeout(timeoutMs()),
      });
      status = response.status;
      body = await response.text();
      if (![403, 429, 500, 502, 503, 504].includes(status) || attempt === 4) break;
      await delay(2000 * attempt);
    }
    statuses.push(status);
    if (![200, 201, 202].includes(status)) {
      fail(`IndexNow returned ${status}${body ? `: ${body.slice(0, 300)}` : ""}`);
      return;
    }
  }
  pass(`IndexNow accepted ${locs.length} URLs (${statuses.join(", ")}) at ${payloadBase.keyLocation}`);
}

async function run() {
  loadEnvFiles();
  const key = loadKey();
  if (preflight) {
    pass(`IndexNow key file public/${key}.txt`);
    return;
  }
  if (process.env.SEARCH_NOTIFY === "0") {
    console.log("Search notify skipped (SEARCH_NOTIFY=0).");
    return;
  }

  const canonicalOrigin = originOf(
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.kinexisdigital.com",
    "NEXT_PUBLIC_SITE_URL",
  );
  if (new URL(canonicalOrigin).protocol !== "https:") {
    throw new Error(`Canonical site URL must be https (${canonicalOrigin}).`);
  }
  const fetchOrigin = process.env.SEARCH_BASE_URL?.trim()
    ? originOf(process.env.SEARCH_BASE_URL.trim(), "SEARCH_BASE_URL")
    : canonicalOrigin;
  if (!isLocal(fetchOrigin) && new URL(fetchOrigin).protocol !== "https:") {
    throw new Error(`Checked host must be https (${fetchOrigin}).`);
  }

  console.log(`Canonical host ${canonicalOrigin}`);
  if (fetchOrigin !== canonicalOrigin) console.log(`Checked host    ${fetchOrigin}`);

  const homeUrl = `${fetchOrigin}/`;
  const robotsUrl = `${fetchOrigin}/robots.txt`;
  const sitemapUrl = `${fetchOrigin}/sitemap.xml`;
  const keyUrl = `${fetchOrigin}/${key}.txt`;

  const [home, robots, sitemap, keyFile] = await Promise.all([
    textFrom(homeUrl, 5),
    textFrom(robotsUrl, 5),
    textFrom(sitemapUrl, 5),
    textFrom(keyUrl, 5),
  ]);

  if (home.response.status === 200) checkHomepage(home.text, canonicalOrigin);
  else fail(`${homeUrl} returned ${home.response.status}`);

  if (robots.response.status === 200) checkRobots(robots.text, canonicalOrigin, key);
  else fail(`${robotsUrl} returned ${robots.response.status}`);

  let locs = [];
  if (sitemap.response.status === 200) locs = checkSitemap(sitemap.text, canonicalOrigin);
  else fail(`${sitemapUrl} returned ${sitemap.response.status}`);

  const keyBody = keyFile.text.replace(/^\uFEFF/, "").trim();
  if (keyFile.response.status === 200 && keyBody === key) pass(`IndexNow key ${keyUrl}`);
  else if (keyFile.response.status !== 200) fail(`${keyUrl} returned ${keyFile.response.status}`);
  else fail(`IndexNow key file at ${keyUrl} does not contain the key`);

  const keyType = keyFile.response.headers.get("content-type") ?? "";
  if (keyBody === key && keyType && !keyType.includes("text/plain")) {
    warn(`IndexNow key content-type is ${keyType}`);
  }

  if (locs.length) await checkUrls(locs, fetchOrigin, concurrency());

  const ready = failures.length === 0;
  const liveCanonical = fetchOrigin === canonicalOrigin;
  if (!ready) {
    console.log("IndexNow skipped because readiness checks failed.");
  } else if (dryRun) {
    console.log(`IndexNow dry run. ${locs.length} URLs would be submitted to ${INDEXNOW_ENDPOINT}.`);
  } else if (!liveCanonical) {
    console.log("IndexNow skipped. Submission runs when the checked host is the canonical host.");
  } else {
    await submitIndexNow(locs, canonicalOrigin, key);
  }

  if (warnings.length) console.log(`${warnings.length} warning${warnings.length === 1 ? "" : "s"}.`);
  if (failures.length) {
    console.log(`${failures.length} check${failures.length === 1 ? "" : "s"} failed.`);
    process.exitCode = 1;
    return;
  }
  console.log(`Search Console sitemap: ${canonicalOrigin}/sitemap.xml`);
}

run().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
