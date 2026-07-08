import { pricingHubPageContent } from "@/content/pricing/pricing-hub-page";
import { servicePillarBySlug } from "@/content/services/architecture/build-service-page-data";
import { pricingRoutes, type PricingSlug } from "@/content/registry/site-routes";
import type { ServiceSeoSlug } from "@/content/service-seo/types";
import type { Locale } from "@/i18n/routing";
import { pricingHubGroups } from "@/lib/pricing-related-links";
import { getLocalizedContent } from "@/lib/get-localized-content";

const serviceTranslationKeys: Record<PricingSlug, string> = {
  seo: "seo",
  "local-seo": "localSeo",
  "ppc-management": "ppcManagement",
  "google-ads": "googleAds",
  "meta-ads": "metaAds",
  "web-design": "webDesign",
  cro: "cro",
  "email-marketing": "emailMarketing",
  "content-marketing": "contentMarketing",
  "social-media": "socialMedia",
  "video-marketing": "videoMarketing",
  branding: "branding",
  analytics: "analytics",
  "growth-consulting": "growthConsulting",
  funnels: "funnels",
  "paid-ads": "paidAds",
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
      const pillar = servicePillarBySlug[slug as ServiceSeoSlug];
      const translationKey = serviceTranslationKeys[slug];

      return {
        slug,
        href: pricingRoutes[slug],
        label: serviceLabels[translationKey] ?? slug,
        description: content.cardDescriptions[slug],
        startingRange: pillar.pricing.tiers[0]?.range ?? "",
      };
    }),
  }));
}
