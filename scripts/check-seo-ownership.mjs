/**
 * Cannibalization guard: enforce keyword → URL ownership and block forbidden
 * generic contractor-cost blog slugs that would compete with /pricing.
 */
import assert from "node:assert/strict";
import { bundleServer } from "./bundle-server.mjs";

const mod = await bundleServer("scripts/seo-ownership-harness.ts", ".tmp-seo-ownership.mjs");

const {
  KEYWORD_OWNERSHIP,
  FORBIDDEN_BLOG_SLUGS,
  AVOID_NEW_MONEY_INTENTS,
  normalizeOwnedPath,
  POSTS,
  PAGES,
  INDUSTRIES,
} = mod;

assert.ok(Array.isArray(KEYWORD_OWNERSHIP) && KEYWORD_OWNERSHIP.length >= 20, "ownership map too short");
assert.ok(FORBIDDEN_BLOG_SLUGS.includes("contractor-website-cost"), "missing pricing cannibal slug");
assert.ok(AVOID_NEW_MONEY_INTENTS.length >= 2, "avoid-list empty");

const postSlugs = new Set(POSTS.map((p) => p.slug));
const pagePaths = new Set(Object.values(PAGES).map((p) => normalizeOwnedPath(p.path)));
const industrySlugs = new Set(INDUSTRIES.map((i) => i.slug));

for (const slug of FORBIDDEN_BLOG_SLUGS) {
  assert.ok(!postSlugs.has(slug), `Forbidden blog slug present (cannibalizes /pricing): ${slug}`);
}

// Intent → owns must be unique per normalized path family for cost-of-contractor.
const pricingOwners = KEYWORD_OWNERSHIP.filter((row) => normalizeOwnedPath(row.owns) === "/pricing");
assert.ok(
  pricingOwners.some((row) => /contractor website cost/i.test(row.intent)),
  "/pricing must own contractor website cost",
);

const seenIntents = new Map();
for (const row of KEYWORD_OWNERSHIP) {
  const intentKey = row.intent.trim().toLowerCase();
  assert.ok(intentKey, "empty intent");
  assert.ok(row.owns && row.owns.startsWith("/"), `owns must be a path: ${row.intent}`);
  if (seenIntents.has(intentKey)) {
    assert.equal(
      normalizeOwnedPath(seenIntents.get(intentKey)),
      normalizeOwnedPath(row.owns),
      `Duplicate intent with conflicting owners: ${row.intent}`,
    );
  } else {
    seenIntents.set(intentKey, row.owns);
  }

  const owns = normalizeOwnedPath(row.owns);
  if (owns.startsWith("/blog/")) {
    const slug = owns.slice("/blog/".length);
    // Phase-1 articles may land after this guard; only assert when listed as required-live.
    const requiredLive = new Set([
      "plumber-website-cost",
      "web-design-for-contractors",
      "website-mistakes-that-cost-you-calls",
      "turn-clicks-into-calls",
      "local-seo-get-found-get-called",
      "google-business-profile-checklist",
      "monthly-website-vs-own-it",
      "wix-vs-squarespace-vs-managed-website-contractors",
      "freelancer-vs-agency-vs-subscription-website",
      "contractor-website-redesign-checklist",
    ]);
    if (requiredLive.has(slug)) {
      assert.ok(postSlugs.has(slug), `Owned blog URL missing from POSTS: ${owns}`);
    }
  } else if (owns.startsWith("/industries/")) {
    const slug = owns.slice("/industries/".length);
    assert.ok(industrySlugs.has(slug), `Owned industry hub missing: ${owns}`);
  } else if (owns === "/pricing" || owns === "/web-design" || owns === "/seo-services" || owns === "/portfolio") {
    assert.ok(pagePaths.has(owns), `Owned page missing from PAGES: ${owns}`);
  }
}

// Soft check: no POST title/seoTitle claiming generic contractor website cost.
for (const post of POSTS) {
  const hay = `${post.slug} ${post.title} ${post.seoTitle ?? ""} ${post.excerpt ?? ""}`.toLowerCase();
  if (FORBIDDEN_BLOG_SLUGS.includes(post.slug)) {
    assert.fail(`Forbidden slug in POSTS: ${post.slug}`);
  }
  const claimsGenericCost =
    /\bcontractor website cost\b/.test(hay) ||
    /\bhow much does a contractor website cost\b/.test(hay) ||
    /\bcost of a contractor website\b/.test(hay);
  if (claimsGenericCost && post.slug !== "monthly-website-vs-own-it") {
    assert.fail(
      `Post appears to target generic contractor website cost (owned by /pricing): ${post.slug}`,
    );
  }
}

console.log(
  `SEO ownership checks passed: ${KEYWORD_OWNERSHIP.length} intents, ${FORBIDDEN_BLOG_SLUGS.length} forbidden slugs, ${postSlugs.size} posts scanned.`,
);
