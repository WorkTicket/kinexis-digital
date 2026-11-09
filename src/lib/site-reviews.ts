import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { SITE } from "@/lib/site";

export type SiteReview = {
  id: string;
  name: string;
  quote: string;
  date: string;
  stars: number;
  createdAt: string;
};

export type PendingSiteReview = SiteReview & {
  email: string;
  approveKey: string;
  rejectKey: string;
};

const LIST_KEY = "site-reviews:v1";
const PENDING_KEY = "site-reviews:pending:v1";
const MAX_STORED = 100;
const MAX_PENDING = 50;

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

function normalizePending(value: unknown): PendingSiteReview[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is PendingSiteReview => {
    if (!item || typeof item !== "object") return false;
    const review = item as PendingSiteReview;
    return (
      typeof review.id === "string" &&
      typeof review.name === "string" &&
      typeof review.quote === "string" &&
      typeof review.stars === "number" &&
      typeof review.createdAt === "string" &&
      typeof review.email === "string" &&
      typeof review.approveKey === "string" &&
      typeof review.rejectKey === "string"
    );
  });
}

function randomKey() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 14)}`;
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

async function getPendingRaw(): Promise<PendingSiteReview[]> {
  const kv = reviewsKv();
  if (!kv) return [];
  try {
    const raw = await kv.get(PENDING_KEY, "json");
    return normalizePending(raw).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return [];
  }
}

/** Queue a review for staff approval before it appears on the site. */
export async function queueSiteReview(input: {
  name: string;
  email: string;
  quote: string;
  stars: number;
}): Promise<PendingSiteReview | null> {
  const kv = reviewsKv();
  if (!kv) return null;

  const createdAt = new Date().toISOString();
  const review: PendingSiteReview = {
    id: `site-${createdAt}-${Math.random().toString(36).slice(2, 10)}`,
    name: input.name,
    email: input.email,
    quote: input.quote,
    stars: input.stars,
    createdAt,
    date: formatDate(createdAt),
    approveKey: randomKey(),
    rejectKey: randomKey(),
  };

  const existing = await getPendingRaw();
  const next = [review, ...existing].slice(0, MAX_PENDING);
  await kv.put(PENDING_KEY, JSON.stringify(next));
  return review;
}

export function moderationLinks(review: PendingSiteReview, origin = SITE.url) {
  const base = origin.replace(/\/$/, "");
  return {
    approve: `${base}/api/reviews/moderate?action=approve&id=${encodeURIComponent(review.id)}&key=${encodeURIComponent(review.approveKey)}`,
    reject: `${base}/api/reviews/moderate?action=reject&id=${encodeURIComponent(review.id)}&key=${encodeURIComponent(review.rejectKey)}`,
  };
}

export async function approvePendingReview(id: string, key: string): Promise<"ok" | "missing" | "bad-key" | "unavailable"> {
  const kv = reviewsKv();
  if (!kv) return "unavailable";

  const pending = await getPendingRaw();
  const index = pending.findIndex((item) => item.id === id);
  if (index < 0) return "missing";
  const review = pending[index];
  if (review.approveKey !== key) return "bad-key";

  const published: SiteReview = {
    id: review.id,
    name: review.name,
    quote: review.quote,
    date: review.date,
    stars: review.stars,
    createdAt: review.createdAt,
  };

  const existing = await getSiteReviews();
  const nextPublished = [published, ...existing.filter((item) => item.id !== published.id)].slice(0, MAX_STORED);
  const nextPending = pending.filter((_, i) => i !== index);

  await Promise.all([
    kv.put(LIST_KEY, JSON.stringify(nextPublished)),
    kv.put(PENDING_KEY, JSON.stringify(nextPending)),
  ]);
  return "ok";
}

export async function rejectPendingReview(id: string, key: string): Promise<"ok" | "missing" | "bad-key" | "unavailable"> {
  const kv = reviewsKv();
  if (!kv) return "unavailable";

  const pending = await getPendingRaw();
  const index = pending.findIndex((item) => item.id === id);
  if (index < 0) return "missing";
  if (pending[index].rejectKey !== key) return "bad-key";

  const nextPending = pending.filter((_, i) => i !== index);
  await kv.put(PENDING_KEY, JSON.stringify(nextPending));
  return "ok";
}
