/** Client-safe review display types and labels (no server-only imports). */

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

export const REVIEW_SOURCE_LABEL: Record<ReviewSource, string> = {
  site: "Website",
  trustpilot: "Trustpilot",
  facebook: "Facebook",
};
