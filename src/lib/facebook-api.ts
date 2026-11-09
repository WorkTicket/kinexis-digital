import "server-only";

import {
  FACEBOOK_PAGE_ID,
  type FacebookReview,
  PUBLISHED_FACEBOOK_REVIEWS,
} from "@/lib/facebook";

type GraphReview = {
  id?: string;
  created_time?: string;
  recommendation_type?: string;
  review_text?: string;
  reviewer?: { name?: string };
};

const KNOWN_REVIEWERS = [
  { quote: "Would Highly recommend Kinexis Digital", name: "Mac Christensen", role: "Owner", company: "A1 Property Services", trade: "Landscaping", city: "Cedar Falls, Iowa" },
  { quote: "They got our plumbing business right away", name: "Hunter Norris", role: "Owner", company: "Preferred Plumbing Solutions", trade: "Plumbing", city: "Spirit Lake, Idaho" },
  { quote: "So grateful to Kinexis Digital", name: "Hunter Norris", role: "Owner", company: "Preferred Plumbing Solutions", trade: "Plumbing", city: "Spirit Lake, Idaho" },
  { quote: "So happy with my new site", name: "Natalia Moreno", role: "Owner", company: "Manos Creativas Bynmw", trade: "Crochet patterns", city: "Valencia, Spain" },
  { quote: "Great work! They designed my website", name: "Natalia Moreno", role: "Owner", company: "Manos Creativas Bynmw", trade: "Crochet patterns", city: "Valencia, Spain" },
];

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
  if (!token) return PUBLISHED_FACEBOOK_REVIEWS;

  try {
    const url = new URL(`https://graph.facebook.com/v26.0/${FACEBOOK_PAGE_ID}/ratings`);
    url.searchParams.set("fields", "created_time,recommendation_type,review_text,reviewer");
    url.searchParams.set("limit", "12");
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    });
    if (!response.ok) return PUBLISHED_FACEBOOK_REVIEWS;
    const body = (await response.json()) as { data?: GraphReview[] };
    const reviews = (body.data ?? [])
      .map((review) => ({ created: review.created_time ?? "", card: fromGraph(review) }))
      .filter((item): item is { created: string; card: FacebookReview } => item.card !== null)
      .sort((a, b) => b.created.localeCompare(a.created))
      .map((item) => item.card);
    return reviews.length > 0 ? reviews : PUBLISHED_FACEBOOK_REVIEWS;
  } catch {
    return PUBLISHED_FACEBOOK_REVIEWS;
  }
}
