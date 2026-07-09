import { getCloudflareContext } from "@opennextjs/cloudflare";

interface KvBinding {
  get(key: string): Promise<string | null>;
  get(key: string, type: "json"): Promise<unknown>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

const MAX_MEMORY_ENTRIES = 10_000;
const buckets = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 8;

setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of buckets) {
    if (now > bucket.resetAt) {
      buckets.delete(key);
    }
  }
}, 60_000).unref();

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

let kvEnabled: boolean | null = null;

function resolveKvBinding(): KvBinding | null {
  try {
    const ctx = getCloudflareContext();
    const kv = ctx?.env?.RATE_LIMIT_KV as KvBinding | undefined;
    kvEnabled = kv != null;
    return kv ?? null;
  } catch {
    kvEnabled = false;
    return null;
  }
}

function getKvBinding(): KvBinding | null {
  if (kvEnabled === null) {
    return resolveKvBinding();
  }
  if (!kvEnabled) return null;
  try {
    return getCloudflareContext()?.env?.RATE_LIMIT_KV ?? null;
  } catch {
    kvEnabled = false;
    return null;
  }
}

async function checkKvRateLimit(kv: KvBinding, key: string): Promise<boolean> {
  const kvKey = `rl:${key}`;

  const raw = await kv.get(kvKey, "json");
  const stored = raw as RateLimitBucket | null;
  const now = Date.now();

  if (!stored || now > stored.resetAt) {
    await kv.put(kvKey, JSON.stringify({ count: 1, resetAt: now + WINDOW_MS } satisfies RateLimitBucket), {
      expirationTtl: Math.ceil(WINDOW_MS / 1000),
    });
    return false;
  }

  if (stored.count >= MAX_REQUESTS) return true;

  const remainingTtl = Math.max(1, Math.ceil((stored.resetAt - now) / 1000));
  await kv.put(
    kvKey,
    JSON.stringify({ count: stored.count + 1, resetAt: stored.resetAt } satisfies RateLimitBucket),
    { expirationTtl: remainingTtl },
  );
  return false;
}

export function getClientIp(request: Request): string {
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp;

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  return "unknown";
}

export async function isRateLimited(key: string): Promise<boolean> {
  const kv = getKvBinding();
  if (kv) {
    try {
      return await checkKvRateLimit(kv, key);
    } catch {
      kvEnabled = false;
    }
  }

  const now = Date.now();

  const existing = buckets.get(key);
  if (!existing || now > existing.resetAt) {
    if (buckets.size >= MAX_MEMORY_ENTRIES) {
      const firstKey = buckets.keys().next().value;
      if (firstKey !== undefined) buckets.delete(firstKey);
    }
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (existing.count >= MAX_REQUESTS) return true;

  existing.count += 1;
  return false;
}
