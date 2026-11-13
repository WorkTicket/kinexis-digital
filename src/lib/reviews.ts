import "server-only";

import { REVIEWS } from "@/lib/content";
import { getFacebookReviews } from "@/lib/facebook-api";
import { type DisplayReview } from "@/lib/review-display";
import { getSiteReviews } from "@/lib/site-reviews";
import { getTrustpilotReviews } from "@/lib/trustpilot-api";

export type { DisplayReview, ReviewSource } from "@/lib/review-display";
export { REVIEW_SOURCE_LABEL } from "@/lib/review-display";
export { REVIEW_QUOTE_MAX, REVIEW_QUOTE_MIN, clipReviewQuote } from "./review-limits";

const MONTHS: Record<string, string> = {
  january: "01",
  february: "02",
  march: "03",
  april: "04",
  may: "05",
  june: "06",
  july: "07",
  august: "08",
  september: "09",
  october: "10",
  november: "11",
  december: "12",
};

/** Turn "October 25, 2026" into a sortable key. */
function sortKeyFromLabel(date: string, fallback = "") {
  const match = date.trim().match(/^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/);
  if (!match) return fallback || date;
  const month = MONTHS[match[1].toLowerCase()];
  if (!month) return fallback || date;
  return `${match[3]}-${month}-${match[2].padStart(2, "0")}`;
}

function contextBlob(review: DisplayReview) {
  return [review.trade, review.city, review.company, review.name].filter(Boolean).join(" ");
}

/** Spain crochet / non-US shop reviews don't match US trade homepage visitors. */
export function isUsTradeReview(review: DisplayReview) {
  const blob = contextBlob(review);
  if (/\b(spain|valencia|crochet)\b/i.test(blob)) return false;
  if (/\b(iowa|idaho|michigan|texas|\bmi\b|\btx\b|united states|\busa\b)\b/i.test(blob)) return true;
  // Curated site reviews without a foreign marker still count as home candidates.
  return review.source !== "facebook" || Boolean(review.city || review.trade);
}

const RESULT_RE =
  /\b(enquir(?:y|ies)|calls?|leads?|reviews?|book(?:ed|ing)?|generat(?:e|ing|or)|increase|brings? in work|missed)\b/i;

/** Score homepage candidates: US trades + outcome language first; demote awkward wording. */
function homeScore(review: DisplayReview) {
  if (!isUsTradeReview(review)) return -1000;
  let score = 10;
  if (RESULT_RE.test(review.quote)) score += 40;
  if (review.trade) score += 10;
  if (review.city) score += 5;
  // Ambiguous "can go wrong" without "can't" — keep the live wording on /reviews, but
  // do not feature it on the homepage until the client confirms or edits on Facebook.
  if (/\bcan go wrong\b/i.test(review.quote) && !/\bcan'?t go wrong\b/i.test(review.quote)) return -100;
  return score;
}

/** Homepage strip: US trade reviews that mention results when available. */
export function pickHomeReviews(reviews: DisplayReview[], limit = 3): DisplayReview[] {
  return [...reviews]
    .map((review, index) => ({ review, index, score: homeScore(review) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.review.sortKey.localeCompare(a.review.sortKey) || a.index - b.index)
    .slice(0, limit)
    .map((item) => item.review);
}

/** Human-readable source line for the homepage rating (Trustpilot when present). */
export function reviewSourceSummary(reviews: DisplayReview[]): string {
  const sources = new Set(reviews.map((review) => review.source));
  const parts: string[] = [];
  if (sources.has("trustpilot")) parts.push("Trustpilot");
  if (sources.has("facebook")) parts.push("Facebook");
  if (sources.has("site")) parts.push("website");
  if (parts.length === 0) return "client reviews";
  if (parts.length === 1) return parts[0];
  if (parts.length === 2) return `${parts[0]} & ${parts[1]}`;
  return `${parts.slice(0, -1).join(", ")}, & ${parts[parts.length - 1]}`;
}

/** Build-time curated reviews. No network — safe for LCP paths like home. */
export function getCuratedReviews(): DisplayReview[] {
  return REVIEWS.map((review) => ({
    id: `${review.source}-${review.id}`,
    name: review.name,
    role: review.role,
    company: review.company,
    trade: review.trade,
    city: review.city,
    quote: review.quote,
    date: review.date,
    stars: review.stars,
    source: review.source,
    sortKey: sortKeyFromLabel(review.date, review.id),
  }));
}

/** All client reviews in one list, newest first, same shape for every source. */
export async function getAllReviews(): Promise<DisplayReview[]> {
  const [facebook, trustpilot, site] = await Promise.all([
    getFacebookReviews(),
    getTrustpilotReviews(),
    getSiteReviews(),
  ]);

  const curatedIds = new Set(REVIEWS.map((review) => review.id));
  // Prefer curated cards when the same client also appears on Facebook / KV.
  const curatedNames = new Set(REVIEWS.map((review) => review.name.trim().toLowerCase()));
  const curatedQuoteStarts = REVIEWS.map((review) =>
    review.quote.trim().slice(0, 48).toLowerCase(),
  );

  const reviews: DisplayReview[] = [
    ...getCuratedReviews(),
    ...site
      .filter((review) => !curatedIds.has(review.id))
      .map((review) => ({
        id: `site-${review.id}`,
        name: review.name,
        quote: review.quote,
        date: review.date,
        stars: review.stars,
        source: "site" as const,
        sortKey: review.createdAt || sortKeyFromLabel(review.date),
      })),
    ...trustpilot.map((review) => ({
      id: `trustpilot-${review.id}`,
      name: review.name,
      quote: review.quote,
      date: review.date,
      stars: review.stars,
      source: "trustpilot" as const,
      sortKey: sortKeyFromLabel(review.date, review.id),
    })),
    ...facebook
      .filter((review) => {
        if (curatedIds.has(review.id)) return false;
        const name = review.name.trim().toLowerCase();
        if (curatedNames.has(name)) return false;
        const start = review.quote.trim().slice(0, 48).toLowerCase();
        return !curatedQuoteStarts.some((prefix) => start.startsWith(prefix) || prefix.startsWith(start));
      })
      .map((review) => ({
        id: `facebook-${review.id}`,
        name: review.name,
        role: review.role,
        company: review.company,
        trade: review.trade,
        city: review.city,
        quote: review.quote,
        date: review.date,
        stars: review.recommends ? 5 : 1,
        source: "facebook" as const,
        sortKey: sortKeyFromLabel(review.date, review.id),
      })),
  ];

  return reviews.sort((a, b) => b.sortKey.localeCompare(a.sortKey));
}

/** Average star rating for a review list (0 when empty). */
export function averageReviewStars(reviews: DisplayReview[]): number {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, review) => sum + review.stars, 0);
  return total / reviews.length;
}
