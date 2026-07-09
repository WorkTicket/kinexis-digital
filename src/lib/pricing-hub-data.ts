import { getPricingPageContent } from "@/content/pricing/get-pricing-page-content";
import { pricingHubPageContent } from "@/content/pricing/pricing-hub-page";
import { pricingRoutes, type PricingSlug } from "@/content/registry/site-routes";
import type { Locale } from "@/i18n/routing";
import { pricingHubGroups } from "@/lib/pricing-related-links";
import { getLocalizedContent } from "@/lib/get-localized-content";

const serviceTranslationKeys: Record<PricingSlug, string> = {
  seo: "seo",
  "local-seo": "localSeo",
  "ppc-management": "ppcManagementPricing",
  "google-ads": "googleAds",
  "meta-ads": "metaAdsPricing",
  "web-design": "webDesignPricing",
  cro: "cro",
  "email-marketing": "emailMarketing",
  "content-marketing": "contentMarketing",
  copywriting: "copywriting",
  "social-media": "socialMedia",
  "video-marketing": "videoMarketing",
  branding: "branding",
  analytics: "analytics",
  "growth-consulting": "growthConsulting",
  "marketing-audits": "marketingAudits",
  "marketing-automation-crm": "marketingAutomation",
  "fractional-cmo": "fractionalCmo",
  "training-workshops": "trainingWorkshops",
  funnels: "funnels",
  "paid-ads": "paidAds",
  "youtube-ads": "youtubeAds",
  "microsoft-ads": "microsoftAds",
  "landing-pages": "landingPages",
  "website-maintenance": "websiteMaintenance",
  "website-speed": "websiteSpeed",
};

export type PricingHubCard = {
  slug: PricingSlug;
  href: string;
  label: string;
  description: string;
  startingRange: string;
};

export type PricingHubSection = {
  key: (typeof pricingHubGroups)[number]["key"];
  title: string;
  subtitle: string;
  cards: PricingHubCard[];
};

function parsePriceValue(range: string): number | null {
  const normalized = range.replace(/,/g, "");
  const kMatch = normalized.match(/\$([\d.]+)\s*K\b/i);
  if (kMatch) return parseFloat(kMatch[1]) * 1000;

  const match = normalized.match(/\$([\d.]+)/);
  return match ? parseFloat(match[1]) : null;
}

function getLowestTierRange(tiers: { range: string }[]): string {
  if (tiers.length === 0) return "";

  let lowestRange = tiers[0].range;
  let lowestValue = parsePriceValue(lowestRange) ?? Number.POSITIVE_INFINITY;

  for (const tier of tiers.slice(1)) {
    const value = parsePriceValue(tier.range);
    if (value !== null && value < lowestValue) {
      lowestValue = value;
      lowestRange = tier.range;
    }
  }

  return lowestRange;
}

/** Strip hub-duplicative prefixes and management suffixes for card display. */
export function formatHubStartingRange(range: string): string {
  return range
    .replace(/^(From|Desde)\s+/i, "")
    .replace(/\s+(mgmt|gestión)$/i, "")
    .trim();
}

export function getHubStartingRange(slug: PricingSlug, locale: Locale): string {
  const pricingContent = getPricingPageContent(slug, locale);
  return formatHubStartingRange(getLowestTierRange(pricingContent.tiers));
}

export function buildPricingHubSections(
  locale: Locale,
  serviceLabels: Record<string, string>,
): PricingHubSection[] {
  const content = getLocalizedContent(pricingHubPageContent, locale);

  return pricingHubGroups.map((group) => ({
    key: group.key,
    title: content.groups[group.key].title,
    subtitle: content.groups[group.key].subtitle,
    cards: group.slugs.map((slug) => {
      const translationKey = serviceTranslationKeys[slug];

      return {
        slug,
        href: pricingRoutes[slug],
        label: serviceLabels[translationKey] ?? slug,
        description: content.cardDescriptions[slug],
        startingRange: getHubStartingRange(slug, locale),
      };
    }),
  }));
}
