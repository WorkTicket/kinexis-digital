/**
 * IMPORTANT — SERVERLESS LIMITATION:
 * This module-level Map is reset on every cold start. In Cloudflare Workers (via
 * opennextjs-cloudflare), each isolate shares state within a single request batch
 * but a new isolate (cold start) starts with an empty Map. This means rate limiting
 * is best-effort: it catches rapid-fire abuse within the same warm isolate but does
 * NOT enforce limits across cold starts or across multiple edge nodes.
 *
 * For production-grade rate limiting, replace with Cloudflare KV:
 *   const count = await env.RATE_LIMIT_KV.get(key);
 *   await env.RATE_LIMIT_KV.put(key, String(newCount), { expirationTtl: WINDOW_S });
 * and bind a KV namespace named RATE_LIMIT_KV in wrangler.toml.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 8;

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("cf-connecting-ip") ?? "unknown";
}

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (bucket.count >= MAX_REQUESTS) return true;

  bucket.count += 1;
  return false;
}
