/**
 * Unit matrix for contractor website cost helper (plans-catalog amounts only).
 */
import assert from "node:assert/strict";
import { bundleServer } from "./bundle-server.mjs";

const mod = await bundleServer(
  "scripts/contractor-website-cost-harness.ts",
  ".tmp-contractor-website-cost.mjs",
);

assert.equal(mod.CATALOG_PLANS.find((p) => p.slug === "website")?.amount, 97);
assert.equal(mod.CATALOG_PLANS.find((p) => p.slug === "lead-system")?.amount, 197);
assert.equal(mod.CATALOG_PLANS.find((p) => p.slug === "plus")?.amount, 297);
assert.equal(mod.CATALOG_PLANS.find((p) => p.slug === "own-it")?.amount, 1497);
assert.equal(mod.SITE_CARE_MONTHLY_USD, 39);
assert.equal(mod.OWN_IT_INCLUDED_HOSTING_MONTHS, 12);

assert.equal(mod.DEFAULT_MONTHLY_PLAN, "website");
assert.equal(mod.DEFAULT_MONTHS, 36);

const months = [12, 36, 60];
for (const m of months) {
  assert.equal(mod.monthlyPlanTotal("website", m), 97 * m);
  assert.equal(mod.monthlyPlanTotal("lead-system", m), 197 * m);
  assert.equal(mod.monthlyPlanTotal("plus", m), 297 * m);
  assert.equal(mod.ownItTotal(m, false), 1497);
  assert.equal(mod.ownItTotal(m, true), 1497 + 39 * Math.max(0, m - 12));
}

assert.equal(mod.monthlyPlanTotal("website", 36), 3492);
assert.equal(mod.monthlyPlanTotal("lead-system", 36), 7092);
assert.equal(mod.monthlyPlanTotal("plus", 36), 10692);
assert.equal(mod.ownItTotal(12, true), 1497);
assert.equal(mod.ownItTotal(36, true), 2433);
assert.equal(mod.ownItTotal(60, true), 3369);
assert.equal(mod.ownItTotal(36, false), 1497);

const defaults = mod.compareTotals({
  monthlyPlan: mod.DEFAULT_MONTHLY_PLAN,
  months: mod.DEFAULT_MONTHS,
  siteCare: false,
});
assert.equal(defaults.monthlyTotal, 3492);
assert.equal(defaults.ownItTotal, 1497);
assert.notEqual(defaults.monthlyTotal, 7092);

const withCare = mod.compareTotals({
  monthlyPlan: "website",
  months: 36,
  siteCare: true,
});
assert.equal(withCare.ownItTotal, 2433);

console.log(
  "Contractor website cost checks passed: 12/36/60 matrix, Site Care on/off, default Website+$3,492.",
);
