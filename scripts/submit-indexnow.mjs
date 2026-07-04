#!/usr/bin/env node
/**
 * Bulk IndexNow submission from live sitemap (Phase 9).
 * Run only after phase9-sitemap-audit.mjs passes.
 *
 * Usage:
 *   node scripts/submit-indexnow.mjs [baseUrl]
 *   INDEXNOW_KEY=... node scripts/submit-indexnow.mjs
 *
 * Output: docs/seo-remediation/phase-09-indexnow-log.json
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const base = (process.argv[2] || "https://www.kinexisdigital.com").replace(/\/$/, "");
const USER_AGENT = "KinexisIndexNowSubmit/1.0";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_URLS_PER_REQUEST = 10_000;

function loadIndexNowConfig() {
  const configPath = path.join(root, "indexnow.public.json");
  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath, "utf8"));
  }
  return null;
}

function resolveKey() {
  if (process.env.INDEXNOW_KEY?.trim()) {
    return process.env.INDEXNOW_KEY.trim();
  }
  const config = loadIndexNowConfig();
  if (config?.key) return config.key;
  throw new Error(
    "INDEXNOW_KEY not set. Run: node scripts/setup-indexnow.mjs"
  );
}

async function fetchSitemapUrls() {
  const res = await fetch(`${base}/sitemap.xml`, {
    headers: { "User-Agent": USER_AGENT, Accept: "application/xml,text/xml" },
  });
  if (!res.ok) throw new Error(`sitemap fetch failed: HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function submitBatch({ host, key, keyLocation, urlList }, attempt = 1) {
  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "User-Agent": USER_AGENT,
    },
    body: JSON.stringify({ host, key, keyLocation, urlList }),
  });
  const ok = res.ok || res.status === 202;
  if (!ok && res.status === 403 && attempt < 3) {
    await new Promise((r) => setTimeout(r, attempt * 2000));
    return submitBatch({ host, key, keyLocation, urlList }, attempt + 1);
  }
  return { status: res.status, statusText: res.statusText, ok };
}

async function main() {
  const key = resolveKey();
  const config = loadIndexNowConfig();
  const host = config?.host || new URL(base).host;
  const keyLocation = config?.keyLocation || `${base}/${key}.txt`;

  console.log(`IndexNow submit — ${host}`);
  console.log(`Key location: ${keyLocation}\n`);

  const keyCheck = await fetch(keyLocation, { headers: { "User-Agent": USER_AGENT } });
  if (!keyCheck.ok) {
    console.warn(`WARN: key file not reachable (${keyCheck.status}) — deploy public/${key}.txt first.`);
  } else {
    const body = (await keyCheck.text()).trim();
    if (body !== key) {
      throw new Error(`Key file content mismatch at ${keyLocation}`);
    }
    console.log("Key file verified.\n");
  }

  const urls = await fetchSitemapUrls();
  console.log(`Sitemap URLs: ${urls.length}`);

  const batches = [];
  for (let i = 0; i < urls.length; i += MAX_URLS_PER_REQUEST) {
    batches.push(urls.slice(i, i + MAX_URLS_PER_REQUEST));
  }

  const results = [];
  for (let i = 0; i < batches.length; i++) {
    const urlList = batches[i];
    console.log(`Submitting batch ${i + 1}/${batches.length} (${urlList.length} URLs)...`);
    const result = await submitBatch({ host, key, keyLocation, urlList });
    results.push({
      batch: i + 1,
      url_count: urlList.length,
      http_status: result.status,
      status_text: result.statusText,
      success: result.ok,
    });
    if (!result.ok) {
      console.error(`Batch ${i + 1} failed: HTTP ${result.status} ${result.statusText}`);
    }
  }

  const log = {
    timestamp: new Date().toISOString(),
    base,
    host,
    keyLocation,
    total_urls: urls.length,
    batch_count: batches.length,
    all_success: results.every((r) => r.success),
    results,
  };

  const outPath = path.join(root, "docs", "seo-remediation", "phase-09-indexnow-log.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(log, null, 2) + "\n", "utf8");

  console.log(`\nLog: ${outPath}`);
  console.log(JSON.stringify({ all_success: log.all_success, total_urls: log.total_urls }, null, 2));

  process.exit(log.all_success ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
