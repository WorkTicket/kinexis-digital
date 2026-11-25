/**
 * Assert published plan amounts and text-back rules stay aligned across
 * plans-catalog, i18n/prices, and Spanish plan helpers. Does not invent prices.
 * Policy source: docs/CONTENT.md (not parsed here).
 */
import assert from "node:assert/strict";
import { bundleServer } from "./bundle-server.mjs";

const mod = await bundleServer("scripts/commercial-consistency-harness.ts", ".tmp-commercial-consistency.mjs");

assert.equal(mod.CATALOG_PLANS.find((p) => p.slug === "website")?.amount, 97);
assert.equal(mod.CATALOG_PLANS.find((p) => p.slug === "lead-system")?.amount, 197);
assert.equal(mod.CATALOG_PLANS.find((p) => p.slug === "plus")?.amount, 297);
assert.equal(mod.CATALOG_PLANS.find((p) => p.slug === "own-it")?.amount, 1497);

assert.equal(mod.TEXTBACK_MATRIX.website, "Add-on $97/mo");
assert.equal(mod.TEXTBACK_MATRIX.leadSystem, "Optional · $1/mo 2nd number + carrier");
assert.equal(mod.TEXTBACK_MATRIX.plus, "Optional · EN/ES · $1/mo 2nd number + carrier");
assert.equal(mod.TEXTBACK_MATRIX.ownIt, "Add-on $97/mo");

assert.equal(mod.PRICES.websiteMo.usd, "$97");
assert.equal(mod.PRICES.websiteMo.eur, "97 €");
assert.equal(mod.PRICES.leadMo.usd, "$197");
assert.equal(mod.PRICES.leadMo.eur, "197 €");
assert.equal(mod.PRICES.plusMo.usd, "$297");
assert.equal(mod.PRICES.plusMo.eur, "297 €");
assert.equal(mod.PRICES.ownIt.usd, "$1,497");
assert.equal(mod.PRICES.ownIt.eur, "1.497 €");
assert.equal(mod.PRICES.secondNumberMo.usd, "$1");
assert.equal(mod.PRICES.secondNumberMo.eur, "1 €");
assert.equal(mod.PRICES.textBackAddonMo.usd, "$97");
assert.equal(mod.PRICES.textBackAddonMo.eur, "97 €");
assert.equal(mod.PRICES.newPage.usd, "$99");
assert.equal(mod.PRICES.newPage.eur, "99 €");
assert.equal(mod.PRICES.siteCareMo.usd, "$39");
assert.equal(mod.PRICES.siteCareMo.eur, "39 €");

assert.equal(mod.toSpainEuros("Website at $97/mo or Own It $1,497"), "Website at 97 €/mo or Own It 1.497 €");

const usdPlans = mod.spanishPlans((s) => s, { currency: "usd" });
const eurPlans = mod.spanishPlans((s) => s, { currency: "eur" });
assert.match(JSON.stringify(usdPlans), /\$97/);
assert.match(JSON.stringify(eurPlans), /97 €/);
assert.doesNotMatch(JSON.stringify(eurPlans), /\$97/);

const leadUsd = usdPlans.find((plan) => plan.slug === "lead-system");
const leadEur = eurPlans.find((plan) => plan.slug === "lead-system");
assert.ok(leadUsd?.features.some(([, detail]) => String(detail).includes("$1")));
assert.ok(leadEur?.features.some(([, detail]) => String(detail).includes("1 €")));

console.log("Commercial consistency checks passed: plan amounts, text-back matrix, USD/EUR numerals, spanishPlans.");
