/**
 * Controlled message matching for paid landers.
 * Query values are mapped through an allowlist — never rendered as copy.
 */

export const DEFAULT_HEADLINE_KEY = "build_business" as const;
export const DEFAULT_MARKET_KEY = "default" as const;

export const LANDING_HEADLINES = {
  build_business: ["Build your business.", "We'll build the website."],
  business_grown: ["Your business has grown.", "Has your website?"],
} as const;

export type LandingHeadlineKey = keyof typeof LANDING_HEADLINES;

export const LANDING_MARKETS = {
  default: "Custom websites for contractors & home-service businesses.",
  raleigh: "Custom websites for Raleigh contractors & home-service businesses.",
} as const;

export type LandingMarketKey = keyof typeof LANDING_MARKETS;

/** Approved utm_content values → headline variant. */
const HEADLINE_BY_CONTENT: Record<string, LandingHeadlineKey> = {
  build_business: "build_business",
  business_grown: "business_grown",
};

/** Approved market tokens (query `market` or mapped from campaign). */
const MARKET_BY_TOKEN: Record<string, LandingMarketKey> = {
  raleigh: "raleigh",
  wake: "raleigh",
  "wake-county": "raleigh",
};

/** Approved utm_campaign values → market. Add Boise / Omaha / Cedar Valley here later. */
const MARKET_BY_CAMPAIGN: Record<string, LandingMarketKey> = {
  raleigh_contractors: "raleigh",
};

export type LandingMessageInput = {
  utmContent?: string | null;
  utmCampaign?: string | null;
  market?: string | null;
};

export type LandingMessage = {
  headlineKey: LandingHeadlineKey;
  headlineLines: readonly [string, string];
  marketKey: LandingMarketKey;
  marketLine: string;
};

function normalizeToken(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  const token = value.trim().toLowerCase().replace(/\s+/g, "_");
  return token.length > 0 && token.length <= 80 ? token : undefined;
}

export function resolveLandingMessage(
  input: LandingMessageInput = {},
): LandingMessage {
  const content = normalizeToken(input.utmContent);
  const campaign = normalizeToken(input.utmCampaign);
  const marketToken = normalizeToken(input.market);

  const headlineKey =
    (content && HEADLINE_BY_CONTENT[content]) || DEFAULT_HEADLINE_KEY;
  const marketKey =
    (marketToken && MARKET_BY_TOKEN[marketToken]) ||
    (campaign && MARKET_BY_CAMPAIGN[campaign]) ||
    DEFAULT_MARKET_KEY;

  const headlineLines = LANDING_HEADLINES[headlineKey];

  return {
    headlineKey,
    headlineLines,
    marketKey,
    marketLine: LANDING_MARKETS[marketKey],
  };
}
