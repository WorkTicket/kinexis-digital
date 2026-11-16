import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getReviewsTestKv } from "@/lib/reviews-test-kv";

/** Structural KV surface. Avoids the generated `KVNamespace` global, which CI does not have. */
type ReviewsKv = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
};

type ReviewsEnv = CloudflareEnv & { REVIEWS?: ReviewsKv };

function rateKv(): ReviewsKv | null {
  const test = getReviewsTestKv();
  if (test) return test;
  try {
    const env = getCloudflareContext().env as ReviewsEnv;
    return env.REVIEWS ?? null;
  } catch {
    return null;
  }
}

/** Default max accepted requests per window when callers omit maxHits. */
const DEFAULT_MAX_HITS: Record<string, number> = {
  contact: 5,
  checkout: 10,
  // Reviews: one submission per window (hour) per IP — spam surface.
  review: 1,
  "invoice-admin": 20,
  "review-moderate": 40,
};

type RateState = { hits: number[] };

function parseState(raw: string | null): number[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as RateState | number[];
    if (Array.isArray(parsed)) {
      return parsed.filter((n) => typeof n === "number" && Number.isFinite(n));
    }
    if (parsed && Array.isArray(parsed.hits)) {
      return parsed.hits.filter((n) => typeof n === "number" && Number.isFinite(n));
    }
  } catch {
    // Legacy single-hit keys stored "1" — treat as one hit at epoch so the window still blocks once.
    if (raw === "1") return [0];
  }
  return [];
}

/**
 * Sliding-window rate limit.
 * Returns true when the caller should be rejected.
 *
 * Policy:
 * - Missing KV (local Node / tests without memory KV): fail open so forms still work.
 * - Empty IP with KV: fail closed for payment/admin buckets; fail open (logged) for contact/review
 *   so a misconfigured proxy cannot 429 every public form. Cloudflare traffic has cf-connecting-ip.
 * - KV read/write errors: fail closed.
 *
 * Not as strong as a Durable Object under concurrent writers; DO upgrade is an owner gate
 * (new binding). This replaces the single-boolean cooldown key.
 */
export async function isRateLimited(
  bucket: string,
  ip: string,
  windowSeconds: number,
  maxHits?: number,
): Promise<boolean> {
  const kv = rateKv();
  if (!kv) return false;

  const limit = Math.max(1, maxHits ?? DEFAULT_MAX_HITS[bucket] ?? 5);
  const windowMs = Math.max(1, windowSeconds) * 1000;
  const sensitive = bucket === "checkout" || bucket === "invoice-admin";

  if (!ip) {
    console.error("Rate limit: empty client IP", { bucket, sensitive });
    return sensitive;
  }

  const key = `rate:${bucket}:${ip}`;
  const now = Date.now();

  try {
    const prior = parseState(await kv.get(key)).filter((t) => now - t < windowMs);
    if (prior.length >= limit) {
      // Refresh TTL so the window cannot be skipped by key expiry alone.
      await kv.put(key, JSON.stringify({ hits: prior }), {
        expirationTtl: Math.max(60, windowSeconds),
      });
      return true;
    }
    const hits = [...prior, now];
    await kv.put(key, JSON.stringify({ hits }), {
      expirationTtl: Math.max(60, windowSeconds),
    });
    return false;
  } catch (error) {
    console.error("Rate limit check failed", {
      bucket,
      error: error instanceof Error ? error.message : "unknown",
    });
    return true;
  }
}
