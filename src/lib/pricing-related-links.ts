import { activePricingSlugs, pricingRoutes, serviceLabels, type PricingSlug } from "@/content/registry/site-routes";

const pricingLabelOverrides: Partial<Record<PricingSlug, string>> = {
  "web-design": "Website Design",
  "ppc-management": "Google Ads (PPC)",
  "meta-ads": "Meta Ads",
};

function formatPricingLinkLabel(slug: PricingSlug): string {
  const base =
    pricingLabelOverrides[slug] ??
    serviceLabels[slug].replace(/ Services$/, "").replace(/ Management$/, "");
  return `${base} Pricing`;
}

export const pricingHubGroups = [
  { key: "searchAndAds", slugs: ["seo", "local-seo", "ppc-management", "meta-ads", "youtube-ads", "microsoft-ads"] as const satisfies readonly PricingSlug[] },
  { key: "webAndConversion", slugs: ["web-design", "landing-pages", "cro", "website-maintenance", "website-speed", "analytics"] as const satisfies readonly PricingSlug[] },
  { key: "brandAndContent", slugs: ["branding", "content-marketing", "email-marketing", "social-media", "video-marketing", "copywriting"] as const satisfies readonly PricingSlug[] },
  { key: "growthAndStrategy", slugs: ["growth-consulting", "marketing-audits", "funnels", "marketing-automation-crm", "fractional-cmo", "training-workshops"] as const satisfies readonly PricingSlug[] },
] as const;

export type PricingHubGroupKey = (typeof pricingHubGroups)[number]["key"];

const pricingGroups: PricingSlug[][] = pricingHubGroups.map((group) => [...group.slugs]);

export function getPricingRelatedLinks(
  slug: PricingSlug,
  limit = 3,
): { href: string; label: string }[] {
  const group = pricingGroups.find((g) => g.includes(slug)) ?? [];
  return group
    .filter((s) => s !== slug && s in pricingRoutes)
    .slice(0, limit)
    .map((s) => ({
      href: pricingRoutes[s],
      label: formatPricingLinkLabel(s),
    }));
}

export function getAllPricingLinks(): { href: string; label: string }[] {
  return activePricingSlugs.map((slug) => ({
    href: pricingRoutes[slug],
    label: formatPricingLinkLabel(slug),
  }));
}
