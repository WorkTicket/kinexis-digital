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
const PUBLISHED_REVIEWS: FacebookReview[] = [
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

type GraphReview = {
  id?: string;
  created_time?: string;
  recommendation_type?: string;
  review_text?: string;
  reviewer?: { name?: string };
};

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

const KNOWN_REVIEWERS = [
  { quote: "Would Highly recommend Kinexis Digital", name: "Mac Christensen", role: "Owner", company: "A1 Property Services", trade: "Landscaping", city: "Cedar Falls, Iowa" },
  { quote: "They got our plumbing business right away", name: "Hunter Norris", role: "Owner", company: "Preferred Plumbing Solutions", trade: "Plumbing", city: "Spirit Lake, Idaho" },
  { quote: "So grateful to Kinexis Digital", name: "Hunter Norris", role: "Owner", company: "Preferred Plumbing Solutions", trade: "Plumbing", city: "Spirit Lake, Idaho" },
  { quote: "So happy with my new site", name: "Natalia Moreno", role: "Owner", company: "Manos Creativas Bynmw", trade: "Crochet patterns", city: "Valencia, Spain" },
  { quote: "Great work! They designed my website", name: "Natalia Moreno", role: "Owner", company: "Manos Creativas Bynmw", trade: "Crochet patterns", city: "Valencia, Spain" },
];

function fromGraph(review: GraphReview): FacebookReview | null {
  const quote = review.review_text?.trim();
  if (!quote) return null;
  const created = review.created_time ?? "";
  const given = review.reviewer?.name?.trim();
  const known = KNOWN_REVIEWERS.find((item) => quote.startsWith(item.quote));
  const name = known?.name || given || "Facebook User";
  return {
    id: review.id || `${name}-${created}`,
    name,
    role: known?.role,
    company: known?.company,
    trade: known?.trade,
    city: known?.city,
    quote,
    date: created ? formatDate(created) : "",
    recommends: review.recommendation_type !== "negative",
  };
}

/** Live recommendations from the Facebook page, refreshed about once an hour. */
export async function getFacebookReviews(): Promise<FacebookReview[]> {
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN?.trim();
  if (!token) return PUBLISHED_REVIEWS;

  try {
    const url = new URL(`https://graph.facebook.com/v26.0/${FACEBOOK_PAGE_ID}/ratings`);
    url.searchParams.set("fields", "created_time,recommendation_type,review_text,reviewer");
    url.searchParams.set("limit", "12");
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    });
    if (!response.ok) return PUBLISHED_REVIEWS;
    const body = (await response.json()) as { data?: GraphReview[] };
    const reviews = (body.data ?? [])
      .map((review) => ({ created: review.created_time ?? "", card: fromGraph(review) }))
      .filter((item): item is { created: string; card: FacebookReview } => item.card !== null)
      .sort((a, b) => b.created.localeCompare(a.created))
      .map((item) => item.card);
    return reviews.length > 0 ? reviews : PUBLISHED_REVIEWS;
  } catch {
    return PUBLISHED_REVIEWS;
  }
}
