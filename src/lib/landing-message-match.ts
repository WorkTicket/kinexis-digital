/**
 * Controlled message matching for paid landers.
 * Query values are mapped through an allowlist — never rendered as copy.
 */

import { localeContent } from "@/i18n/locale-content";
import type { Locale } from "@/i18n/routing";

export const DEFAULT_HEADLINE_KEY = "business_grown" as const;
export const DEFAULT_MARKET_KEY = "default" as const;

const headlinesByLocale = localeContent({
  en: {
    build_business: [
      "Build your business.",
      "We'll build the website.",
    ] as const,
    business_grown: [
      "Get a Website Built to",
      "Bring You More Business",
    ] as const,
  },
  "es-419": {
    build_business: [
      "Haz crecer tu negocio.",
      "Nosotros hacemos el sitio web.",
    ] as const,
    business_grown: [
      "Un sitio web hecho para",
      "traerte más negocio",
    ] as const,
  },
});

/** English map kept for tests and allowlist typing. */
export const LANDING_HEADLINES = headlinesByLocale.en;

export type LandingHeadlineKey = keyof typeof LANDING_HEADLINES;

const marketsByLocale = localeContent({
  en: {
    default: "Working with contractors and home-service crews",
    // Raleigh ads still map here. The line names the work, not a city.
    raleigh: "Working with contractors and home-service crews",
  },
  "es-419": {
    default: "Trabajamos con contratistas y equipos de servicios del hogar.",
    raleigh: "Trabajamos con contratistas y equipos de servicios del hogar.",
  },
});

/** English map kept for tests and allowlist typing. */
export const LANDING_MARKETS = marketsByLocale.en;

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
  locale?: Locale | null;
};

export type LandingMessage = {
  headlineKey: LandingHeadlineKey;
  headlineLines: readonly string[];
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
  const locale = input.locale ?? "en";

  const headlineKey =
    (content && HEADLINE_BY_CONTENT[content]) || DEFAULT_HEADLINE_KEY;
  const marketKey =
    (marketToken && MARKET_BY_TOKEN[marketToken]) ||
    (campaign && MARKET_BY_CAMPAIGN[campaign]) ||
    DEFAULT_MARKET_KEY;

  const headlines = headlinesByLocale[locale] ?? headlinesByLocale.en;
  const markets = marketsByLocale[locale] ?? marketsByLocale.en;
  const headlineLines = headlines[headlineKey];

  return {
    headlineKey,
    headlineLines,
    marketKey,
    marketLine: markets[marketKey],
  };
}
