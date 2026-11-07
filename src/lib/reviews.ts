import { getFacebookReviews } from "@/lib/facebook";
import { getSiteReviews } from "@/lib/site-reviews";
import { getTrustpilotReviews } from "@/lib/trustpilot";

export type ReviewSource = "site" | "trustpilot" | "facebook";

export type DisplayReview = {
  id: string;
  name: string;
  role?: string;
  company?: string;
  trade?: string;
  city?: string;
  quote: string;
  date: string;
  stars: number;
  source: ReviewSource;
  /** ISO-ish stamp for sorting; empty dates sort last. */
  sortKey: string;
};

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

export const REVIEW_SOURCE_LABEL: Record<ReviewSource, string> = {
  site: "Website",
  trustpilot: "Trustpilot",
  facebook: "Website",
};

/** All client reviews in one list, newest first, same shape for every source. */
export async function getAllReviews(): Promise<DisplayReview[]> {
  const [facebook, trustpilot, site] = await Promise.all([
    getFacebookReviews(),
    getTrustpilotReviews(),
    getSiteReviews(),
  ]);

  const reviews: DisplayReview[] = [
    ...site.map((review) => ({
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
    // Kept as site-labeled cards — originally from Facebook, shown as website reviews.
    ...facebook.map((review) => ({
      id: `facebook-${review.id}`,
      name: review.name,
      role: review.role,
      company: review.company,
      trade: review.trade,
      city: review.city,
      quote: review.quote,
      date: review.date,
      stars: review.recommends ? 5 : 1,
      source: "site" as const,
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
