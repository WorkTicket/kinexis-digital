import assert from "node:assert/strict";
import { build } from "esbuild";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const bundle = await build({
  entryPoints: ["src/lib/lead-quality.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  write: false,
  absWorkingDir: root,
});
const source = bundle.outputFiles[0]?.contents;
assert.ok(source);
const mod = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
const { deriveLeadQuality } = mod;

const full = deriveLeadQuality({
  trade: "Plumbing",
  decisionMaker: "Yes, I decide",
  hasWebsite: "Want one",
  startTimeline: "Within 30 days",
  planInterest: "Lead System",
});
assert.equal(full.served_trade, true);
assert.equal(full.decision_maker, true);
assert.equal(full.has_or_wants_site, true);
assert.equal(full.budget_fit, true);
assert.equal(full.start_within_90_days, true);
assert.equal(full.hint_score, 5);
assert.equal(full.qualified_hint, true);

const tire = deriveLeadQuality({
  trade: "Other trade",
  decisionMaker: "No, I'm gathering info",
  hasWebsite: "No",
  startTimeline: "Just exploring",
});
assert.equal(tire.served_trade, false);
assert.equal(tire.decision_maker, false);
assert.equal(tire.has_or_wants_site, false);
assert.equal(tire.budget_fit, "unknown");
assert.equal(tire.start_within_90_days, false);
assert.equal(tire.hint_score, 0);
assert.equal(tire.qualified_hint, false);

const spam = deriveLeadQuality({
  trade: "Plumbing",
  decisionMaker: "yes",
  hasWebsite: "yes",
  startTimeline: "Within 30 days",
  planInterest: "Own It",
  spamSuspect: true,
});
assert.equal(spam.hint_score, 5);
assert.equal(spam.qualified_hint, false);
assert.equal(spam.spam_suspect, true);

console.log("Lead quality flag derivation checks passed.");
