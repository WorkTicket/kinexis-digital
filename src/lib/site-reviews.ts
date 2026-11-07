import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export type SiteReview = {
  id: string;
  name: string;
  quote: string;
  date: string;
  stars: number;
  createdAt: string;
};

const LIST_KEY = "site-reviews:v1";
const MAX_STORED = 100;

type ReviewsEnv = CloudflareEnv & { REVIEWS?: KVNamespace };

function reviewsKv(): KVNamespace | null {
  try {
    const env = getCloudflareContext().env as ReviewsEnv;
    return env.REVIEWS ?? null;
  } catch {
    return null;
  }
}

function formatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Denver",
  }).format(date);
}

function normalizeList(value: unknown): SiteReview[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is SiteReview => {
    if (!item || typeof item !== "object") return false;
    const review = item as SiteReview;
    return (
      typeof review.id === "string" &&
      typeof review.name === "string" &&
      typeof review.quote === "string" &&
      typeof review.stars === "number" &&
      typeof review.createdAt === "string"
    );
  });
}

/** Published on-site reviews from KV (newest first). */
export async function getSiteReviews(): Promise<SiteReview[]> {
  const kv = reviewsKv();
  if (!kv) return [];
  try {
    const raw = await kv.get(LIST_KEY, "json");
    return normalizeList(raw).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return [];
  }
}

export async function addSiteReview(input: {
  name: string;
  quote: string;
  stars: number;
}): Promise<SiteReview | null> {
  const kv = reviewsKv();
  if (!kv) return null;

  const createdAt = new Date().toISOString();
  const review: SiteReview = {
    id: `site-${createdAt}-${Math.random().toString(36).slice(2, 10)}`,
    name: input.name,
    quote: input.quote,
    stars: input.stars,
    createdAt,
    date: formatDate(createdAt),
  };

  const existing = await getSiteReviews();
  const next = [review, ...existing].slice(0, MAX_STORED);
  await kv.put(LIST_KEY, JSON.stringify(next));
  return review;
}

/** Simple IP throttle: at most one review every `windowSeconds`. */
export async function reviewRateLimited(ip: string, windowSeconds = 3600): Promise<boolean> {
  const kv = reviewsKv();
  if (!kv || !ip) return false;
  const key = `rate:review:${ip}`;
  try {
    const hit = await kv.get(key);
    if (hit) return true;
    await kv.put(key, "1", { expirationTtl: windowSeconds });
    return false;
  } catch {
    return false;
  }
}
