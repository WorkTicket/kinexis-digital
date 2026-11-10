/** Graph page id for Kinexis Digital. The public profile id cannot be queried for ratings. */
export const FACEBOOK_PAGE_ID = "1342631805590605";
export const FACEBOOK_PAGE_URL = "https://www.facebook.com/profile.php?id=61591998497960";
export const FACEBOOK_REVIEW_URL = "https://www.facebook.com/profile.php?id=61591998497960&sk=reviews";

export type FacebookReview = {
  id: string;
  name: string;
  role?: string;
  company?: string;
  /** Business type shown on review cards (e.g. Plumbing). */
  trade?: string;
  /** City / region shown on review cards. */
  city?: string;
  quote: string;
  date: string;
  recommends: boolean;
};

/**
 * Fallback Facebook recommendations when Graph API is unavailable.
 * Client quotes shown on /reviews live in `REVIEWS` (Website source) — keep this
 * empty so the same people are not listed twice under Facebook.
 */
export const PUBLISHED_FACEBOOK_REVIEWS: FacebookReview[] = [];
