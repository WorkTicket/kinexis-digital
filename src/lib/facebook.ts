/** Graph page id for Kinexis Digital. The public profile id cannot be queried for ratings. */
export const FACEBOOK_PAGE_ID = "1342631805590605";
export const FACEBOOK_PAGE_URL = "https://www.facebook.com/profile.php?id=61591998497960";
export const FACEBOOK_REVIEW_URL = "https://www.facebook.com/profile.php?id=61591998497960&sk=reviews";

export type FacebookReview = {
  id: string;
  name: string;
  quote: string;
  date: string;
  recommends: boolean;
};

/**
 * Recommendations currently public on the Facebook page.
 * Replaced by the Graph API when FACEBOOK_PAGE_ACCESS_TOKEN is set.
 */
const PUBLISHED_REVIEWS: FacebookReview[] = [
  {
    id: "preferred-plumbing-solutions",
    name: "Preferred Plumbing Solutions",
    quote: "So grateful to Kinexis Digital! They captured the essence of our plumbing business right away and created a modern website that builds instant trust. 10/10 team!",
    date: "September 22, 2026",
    recommends: true,
  },
  {
    id: "manos-creativas-bynmw",
    name: "Manos Creativas Bynmw",
    quote: "Great work! They designed my website exceeding all expectations. Highly recommended for their professionalism. You can see an example of their work on my site",
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
  { quote: "So grateful to Kinexis Digital", name: "Preferred Plumbing Solutions" },
  { quote: "Great work! They designed my website", name: "Manos Creativas Bynmw" },
];

function fromGraph(review: GraphReview): FacebookReview | null {
  const quote = review.review_text?.trim();
  if (!quote) return null;
  const created = review.created_time ?? "";
  const given = review.reviewer?.name?.trim();
  const known = KNOWN_REVIEWERS.find((item) => quote.startsWith(item.quote));
  const name = given || known?.name || "Facebook reviewer";
  return {
    id: review.id || `${name}-${created}`,
    name,
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
