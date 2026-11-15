/**
 * Route-handler integration tests for /api/reviews and /api/reviews/moderate.
 * KV and email are process-local doubles. This is not a live Cloudflare or SMTP check.
 */
import assert from "node:assert/strict";
import { bundleServer } from "./bundle-server.mjs";

process.env.REVIEWS_TEST_MEMORY = "1";

const routes = await bundleServer("scripts/reviews-route-harness.ts", ".tmp-reviews-routes.mjs");
const kv = routes.createMemoryReviewsKv();
routes.setReviewsTestKv(kv);

const origin = "http://localhost:3000";
/** Keep in sync with REVIEW_QUOTE_MIN in src/lib/review-limits.ts (20). */
const quote = "x".repeat(24);

const mailCalls = [];
const originalBinding = process.env.CONTACT_EMAIL;
delete process.env.CONTACT_EMAIL;

function formRequest(path, fields, headers = {}) {
  const form = new FormData();
  for (const [key, value] of Object.entries(fields)) form.set(key, value);
  return new Request(`${origin}${path}`, {
    method: "POST",
    headers: {
      Origin: origin,
      "cf-connecting-ip": headers.ip ?? "203.0.113.10",
      ...headers,
    },
    body: form,
  });
}

async function submitReview(extra = {}, headers = {}) {
  return routes.reviewsPost(
    formRequest(
      "/api/reviews",
      {
        name: "Alex Client",
        email: "alex@example.com",
        quote,
        stars: "5",
        ...extra,
      },
      headers,
    ),
  );
}

// Missing KV would 503; with test KV a valid review queues.
{
  const response = await submitReview();
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.ok, true);
  assert.equal(body.pending, true);
}

// Validation boundaries
assert.equal((await submitReview({ name: "" }, { ip: "203.0.113.11" })).status, 400);
assert.equal((await submitReview({ email: "not-an-email" }, { ip: "203.0.113.12" })).status, 400);
assert.equal((await submitReview({ quote: "short" }, { ip: "203.0.113.13" })).status, 400);
assert.equal((await submitReview({ stars: "0" }, { ip: "203.0.113.14" })).status, 400);
assert.equal((await submitReview({ stars: "6" }, { ip: "203.0.113.15" })).status, 400);

// Cross-site and content-type guards
assert.equal(
  (await routes.reviewsPost(
    new Request(`${origin}/api/reviews`, {
      method: "POST",
      headers: { Origin: "https://attacker.example", "cf-connecting-ip": "203.0.113.16" },
      body: (() => {
        const form = new FormData();
        form.set("name", "Alex");
        form.set("email", "alex@example.com");
        form.set("quote", quote);
        form.set("stars", "5");
        return form;
      })(),
    }),
  )).status,
  403,
);
assert.equal(
  (await routes.reviewsPost(
    new Request(`${origin}/api/reviews`, {
      method: "POST",
      headers: {
        Origin: origin,
        "Content-Type": "application/json",
        "cf-connecting-ip": "203.0.113.17",
      },
      body: JSON.stringify({ name: "Alex" }),
    }),
  )).status,
  415,
);

// Honeypot: 200 and no pending growth from this call's identity alone
{
  const before = await kv.get("site-reviews:pending:v1", "json");
  const beforeCount = Array.isArray(before) ? before.length : 0;
  const response = await submitReview({ _gotcha: "bot" }, { ip: "203.0.113.18" });
  assert.equal(response.status, 200);
  const after = await kv.get("site-reviews:pending:v1", "json");
  const afterCount = Array.isArray(after) ? after.length : 0;
  assert.equal(afterCount, beforeCount);
}

// Rate limit: second review from same IP within the window is 429
{
  const ip = "203.0.113.19";
  assert.equal((await submitReview({}, { ip })).status, 200);
  assert.equal((await submitReview({}, { ip })).status, 429);
}

// Moderation: GET is confirm-only; POST with approve key publishes once
{
  const pending = await kv.get("site-reviews:pending:v1", "json");
  assert.ok(Array.isArray(pending) && pending.length > 0);
  const review = pending[0];
  const links = routes.moderationLinks(review, origin);

  const confirm = await routes.moderateGet(new Request(links.approve));
  assert.equal(confirm.status, 200);
  assert.match(await confirm.text(), /Publish this review/);
  // Still pending after GET
  const stillPending = await kv.get("site-reviews:pending:v1", "json");
  assert.ok(Array.isArray(stillPending) && stillPending.some((item) => item.id === review.id));

  const published = await routes.moderatePost(
    formRequest("/api/reviews/moderate", {
      action: "approve",
      id: review.id,
      key: review.approveKey,
    }, { ip: "203.0.113.20" }),
  );
  assert.equal(published.status, 200);
  assert.match(await published.text(), /Review published/);

  const live = await routes.getSiteReviews();
  assert.ok(live.some((item) => item.id === review.id && item.quote === review.quote));

  const replay = await routes.moderatePost(
    formRequest("/api/reviews/moderate", {
      action: "approve",
      id: review.id,
      key: review.approveKey,
    }, { ip: "203.0.113.21" }),
  );
  assert.equal(replay.status, 404);
}

// Reject path + bad key
{
  const ip = "203.0.113.22";
  assert.equal((await submitReview({ name: "Reject Me" }, { ip })).status, 200);
  const pending = await kv.get("site-reviews:pending:v1", "json");
  const review = pending.find((item) => item.name === "Reject Me");
  assert.ok(review);

  const badKey = await routes.moderatePost(
    formRequest("/api/reviews/moderate", {
      action: "reject",
      id: review.id,
      key: "0".repeat(64),
    }, { ip: "203.0.113.23" }),
  );
  assert.equal(badKey.status, 403);

  const rejected = await routes.moderatePost(
    formRequest("/api/reviews/moderate", {
      action: "reject",
      id: review.id,
      key: review.rejectKey,
    }, { ip: "203.0.113.24" }),
  );
  assert.equal(rejected.status, 200);
  assert.match(await rejected.text(), /Review rejected/);
  const after = await kv.get("site-reviews:pending:v1", "json");
  assert.ok(Array.isArray(after) && !after.some((item) => item.id === review.id));
  const live = await routes.getSiteReviews();
  assert.ok(!live.some((item) => item.id === review.id));
}

// Incomplete moderation link
assert.equal(
  (await routes.moderateGet(new Request(`${origin}/api/reviews/moderate?action=approve`))).status,
  400,
);

void mailCalls;
if (originalBinding === undefined) delete process.env.CONTACT_EMAIL;
else process.env.CONTACT_EMAIL = originalBinding;

console.log(
  "Reviews route checks passed: queue, validation, cross-site, honeypot, rate limit, confirm-only GET, approve, reject, bad key, replay.",
);
