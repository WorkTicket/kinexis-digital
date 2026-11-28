import assert from "node:assert/strict";
import { build } from "esbuild";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const bundle = await build({
  entryPoints: ["src/lib/marketing-attribution.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  write: false,
});
const source = bundle.outputFiles[0]?.contents;
assert.ok(source);
const attribution = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);

assert.deepEqual(attribution.sanitizeMarketingAttribution({
  utm_source: "first source",
  utm_medium: "paid-search",
  utm_campaign: "spring_2026",
  utm_content: "hero+button",
  utm_term: "plumber",
  gclid: "GCLID_123",
  fbclid: "FBCLID-456",
  referrer: "https://search.example/results?email=private#top",
}), {
  utm_source: "first source",
  utm_medium: "paid-search",
  utm_campaign: "spring_2026",
  utm_content: "hero+button",
  utm_term: "plumber",
  gclid: "GCLID_123",
  fbclid: "FBCLID-456",
  referrer: "https://search.example/results",
});
assert.deepEqual(attribution.sanitizeMarketingAttribution({
  utm_source: "x".repeat(101),
  utm_medium: "bad\r\nBcc: victim@example.test",
  gclid: "contains spaces",
  fbclid: "x".repeat(257),
  referrer: "javascript:alert(1)",
}), {});

const boot = await readFile(path.join(root, "public/assets/js/boot.js"), "utf8");
assert.match(boot, /track\("generate_lead",\s*leadPayload\)/);
assert.match(boot, /accepted\s*&&\s*isCountedLead/);
assert.match(boot, /body\.accepted\s*===\s*true/);
assert.doesNotMatch(boot, /if \(href\.startsWith\("tel:"\)\) \{[\s\S]*?track\("generate_lead"/);
assert.match(boot, /track\("phone_tap",\s*\{\s*page_path:\s*location\.pathname,\s*event_role:\s*"diagnostic"\s*\}\)/);
assert.match(boot, /event_role:\s*"diagnostic"/);
assert.match(boot, /QUEUEABLE_GA/);
assert.match(boot, /flushPendingTrack/);
assert.match(boot, /setTimeout\(loadGa,\s*45000\)/);
assert.match(boot, /setTimeout\(ensureMeta,\s*45000\)/);
assert.match(boot, /if \(!gaLoaded\)/);
assert.match(boot, /if \(!metaBooted\)/);
assert.match(boot, /consent",\s*"update"/);
assert.match(boot, /window\.fbq\("consent",\s*adsAllowed \? "grant" : "revoke"\)/);
assert.match(boot, /const leadFormsInFlight = new WeakSet\(\)/);
assert.match(boot, /data\.set\("kx_event_id", metaEventId\)/);
assert.match(boot, /window\.__KINEXIS_TRACK_META_LEAD__\s*=/);
assert.match(boot, /content_name: cfg\.metaContentNameByForm\[form\],[\s\S]*?form_path: formPath/);
assert.match(boot, /lastGaPageViewPath/);
assert.match(boot, /lastMetaPageViewPath/);
assert.match(boot, /trackMeta\("Lead"/);
assert.match(boot, /allow_google_signals:\s*false/);
assert.match(boot, /ad_storage:\s*"denied"/);

console.log("Analytics correction contract checks passed: attribution sanitization, canonical lead event, consent gates, pending flush, GA4-only (no Google Ads signals), and in-flight form deduplication.");
