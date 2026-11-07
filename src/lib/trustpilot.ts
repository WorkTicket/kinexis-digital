/** Direct Trustpilot review form for Kinexis Digital. */
export const TRUSTPILOT_EVALUATE_URL = "https://www.trustpilot.com/evaluate/kinexisdigital.com";
export const TRUSTPILOT_PROFILE_URL = "https://www.trustpilot.com/review/kinexisdigital.com";
export const TRUSTPILOT_DOMAIN = "kinexisdigital.com";

/** Trustpilot Business Unit ID (API + profile). */
export const TRUSTPILOT_BUSINESS_UNIT_ID = "6aef824c0156593a34415361";

export type TrustpilotReview = {
  id: string;
  name: string;
  quote: string;
  date: string;
  stars: number;
};

type ApiReview = {
  id?: string;
  stars?: number;
  text?: string;
  createdAt?: string;
  consumer?: { displayName?: string };
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

function fromApi(review: ApiReview): TrustpilotReview | null {
  const quote = review.text?.trim();
  if (!quote) return null;
  const stars = Math.min(5, Math.max(1, Math.round(review.stars ?? 5)));
  const created = review.createdAt ?? "";
  const name = review.consumer?.displayName?.trim() || "Trustpilot User";
  return {
    id: review.id || `${name}-${created}`,
    name,
    quote,
    date: created ? formatDate(created) : "",
    stars,
  };
}

/** Live Trustpilot reviews via API (optional). Display widgets need a paid Trustpilot plan. */
export async function getTrustpilotReviews(): Promise<TrustpilotReview[]> {
  const apiKey = process.env.TRUSTPILOT_API_KEY?.trim();
  if (!apiKey) return [];

  const businessUnitId = process.env.TRUSTPILOT_BUSINESS_UNIT_ID?.trim() || TRUSTPILOT_BUSINESS_UNIT_ID;

  try {
    const url = new URL(`https://api.trustpilot.com/v1/business-units/${businessUnitId}/reviews`);
    url.searchParams.set("perPage", "12");
    url.searchParams.set("orderBy", "createdat.desc");
    const response = await fetch(url, {
      headers: { apikey: apiKey },
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];
    const body = (await response.json()) as { reviews?: ApiReview[] };
    return (body.reviews ?? [])
      .map(fromApi)
      .filter((review): review is TrustpilotReview => review !== null);
  } catch {
    return [];
  }
}
