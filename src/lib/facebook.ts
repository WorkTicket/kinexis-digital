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
 * Recommendations currently public on the Facebook page.
 * Replaced by the Graph API when FACEBOOK_PAGE_ACCESS_TOKEN is set.
 * Trade/city match live client sites in `src/data/liveSites.ts`.
 */
export const PUBLISHED_FACEBOOK_REVIEWS: FacebookReview[] = [
  {
    id: "mac-christensen",
    name: "Mac Christensen",
    role: "Owner",
    company: "A1 Property Services",
    trade: "Landscaping",
    city: "Cedar Falls, Iowa",
    // Matches the live Facebook recommendation text. Reads like a typo for "can't" —
    // ask Mac before changing; do not silently rewrite client words.
    quote:
      "Would Highly recommend Kinexis Digital! They turned my dull website into a lead generating machine! You can go wrong with this company.",
    date: "October 25, 2026",
    recommends: true,
  },
  {
    id: "hunter-norris",
    name: "Hunter Norris",
    role: "Owner",
    company: "Preferred Plumbing Solutions",
    trade: "Plumbing",
    city: "Spirit Lake, Idaho",
    quote:
      "So grateful to Kinexis Digital! They captured the essence of our plumbing business right away and created a modern website that builds instant trust. 10/10 team!",
    date: "September 22, 2026",
    recommends: true,
  },
  {
    id: "natalia-moreno",
    name: "Natalia Moreno",
    role: "Owner",
    company: "Manos Creativas Bynmw",
    trade: "Crochet patterns",
    city: "Valencia, Spain",
    quote:
      "Great work! They designed my website exceeding all expectations. Highly recommended for their professionalism. You can see an example of their work on my site",
    date: "September 22, 2026",
    recommends: true,
  },
];
