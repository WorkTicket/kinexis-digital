import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";

type ReviewsEnv = CloudflareEnv & { REVIEWS?: KVNamespace };

function rateKv(): KVNamespace | null {
  try {
    const env = getCloudflareContext().env as ReviewsEnv;
    return env.REVIEWS ?? null;
  } catch {
    return null;
  }
}

/**
 * Returns true when the caller should be rejected.
 * Missing KV (local Node / tests) fails open so forms still work.
 * With KV: empty IP fails open (logged); read/write errors fail closed.
 */
export async function isRateLimited(
  bucket: string,
  ip: string,
  windowSeconds: number,
): Promise<boolean> {
  const kv = rateKv();
  if (!kv) return false;
  // Missing client IP: fail open so a misconfigured proxy cannot 429 every form.
  // Legitimate Cloudflare traffic always has cf-connecting-ip.
  if (!ip) {
    console.error("Rate limit skipped: empty client IP", { bucket });
    return false;
  }
  const key = `rate:${bucket}:${ip}`;
  try {
    const hit = await kv.get(key);
    if (hit) return true;
    await kv.put(key, "1", { expirationTtl: Math.max(60, windowSeconds) });
    return false;
  } catch (error) {
    console.error("Rate limit check failed", { bucket, error: error instanceof Error ? error.message : "unknown" });
    return true;
  }
}
