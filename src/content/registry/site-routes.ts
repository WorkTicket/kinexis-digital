export const serviceSlugs = [
  "seo",
  "local-seo",
  "ppc-management",
  "google-ads",
  "meta-ads",
  "web-design",
  "cro",
  "email-marketing",
  "content-marketing",
  "social-media",
  "video-marketing",
  "branding",
  "analytics",
  "growth-consulting",
  "funnels",
  "paid-ads",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export const coreRevenueServices: ServiceSlug[] = [
  "seo",
  "local-seo",
  "ppc-management",
  "google-ads",
  "meta-ads",
  "web-design",
  "funnels",
  "email-marketing",
  "content-marketing",
  "social-media",
  "video-marketing",
  "branding",
  "analytics",
  "growth-consulting",
];

export const serviceRoutes: Record<ServiceSlug, string> = {
  seo: "/services/seo",
  "local-seo": "/services/local-seo",
  "ppc-management": "/services/ppc-management",
  "google-ads": "/services/google-ads",
  "meta-ads": "/services/meta-ads",
  "web-design": "/services/web-design",
  cro: "/services/funnels",
  "email-marketing": "/services/email-marketing",
  "content-marketing": "/services/content-marketing",
  "social-media": "/services/social-media",
  "video-marketing": "/services/video-marketing",
  branding: "/services/branding",
  analytics: "/services/analytics",
  "growth-consulting": "/services/growth-consulting",
  funnels: "/services/funnels",
  "paid-ads": "/services/paid-ads",
};

export const serviceLabels: Record<ServiceSlug, string> = {
  seo: "SEO Services",
  "local-seo": "Local SEO Services",
  "ppc-management": "PPC Management",
  "google-ads": "Google Ads Management",
  "meta-ads": "Meta Ads Management",
  "web-design": "Web Design Services",
  cro: "Conversion Rate Optimization",
  "email-marketing": "Email Marketing Services",
  "content-marketing": "Content Marketing Services",
  "social-media": "Social Media Marketing Services",
  "video-marketing": "Video Marketing Services",
  branding: "Branding Services",
  analytics: "Marketing Analytics Services",
  "growth-consulting": "Growth Consulting Services",
  funnels: "Funnels & Conversion Rate Optimization",
  "paid-ads": "Paid Ads",
};

export const staticPageRoutes = [
  "/",
  "/about",
  "/contact",
  "/lead-magnet",
  "/services",
  "/blog",
  "/blog/posts",
  "/case-studies",
  "/digital-marketing-agency",
  "/industries",
  "/solutions",
  "/resources",
  "/privacy",
  "/terms",
] as const;

/** Legacy slug — redirects to funnels; excluded from sitemap. */
export const sitemapExcludedServiceSlugs = ["cro"] as const;

/** Retired pricing slugs — 301 to ppc-management; excluded from sitemap. */
export const sitemapExcludedPricingSlugs = ["google-ads", "paid-ads"] as const;

export const sitemapServiceSlugs = serviceSlugs.filter(
  (slug) => !(sitemapExcludedServiceSlugs as readonly string[]).includes(slug),
);

export const pricingSlugs = serviceSlugs;
export type PricingSlug = ServiceSlug;

/** Canonical pricing page when a slug has been retired or merged. */
export const pricingSlugCanonical: Partial<Record<PricingSlug, PricingSlug>> = {
  "google-ads": "ppc-management",
  "paid-ads": "ppc-management",
};

export function resolvePricingSlug(slug: PricingSlug): PricingSlug {
  return pricingSlugCanonical[slug] ?? slug;
}

export const sitemapPricingSlugs = pricingSlugs.filter(
  (slug) =>
    !(sitemapExcludedServiceSlugs as readonly string[]).includes(slug) &&
    !(sitemapExcludedPricingSlugs as readonly string[]).includes(slug),
);

/** Active pricing pages indexed and statically generated (excludes retired slugs). */
export const activePricingSlugs = sitemapPricingSlugs;

export const pricingRoutes = Object.fromEntries(
  serviceSlugs.map((slug) => [slug, `/pricing/${slug}`]),
) as Record<PricingSlug, string>;

export const comparisonSlugs = [
  "google-ads-vs-seo",
  "seo-vs-ppc",
  "wordpress-vs-webflow",
  "local-seo-vs-google-ads",
] as const;
export type ComparisonSlug = (typeof comparisonSlugs)[number];

export const comparisonRoutes: Record<ComparisonSlug, string> = {
  "google-ads-vs-seo": "/google-ads-vs-seo",
  "seo-vs-ppc": "/seo-vs-ppc",
  "wordpress-vs-webflow": "/wordpress-vs-webflow",
  "local-seo-vs-google-ads": "/local-seo-vs-google-ads",
};

export const authorSlugs = ["sarah-mitchell", "james-chen", "maria-rodriguez"] as const;
export type AuthorSlug = (typeof authorSlugs)[number];

export const blogSlugs = [
  "local-seo-strategy-2026",
  "email-nurture-sequences-that-book-calls",
  "website-conversion-optimization",
  "google-business-profile-tips",
  "seo-vs-google-ads",
  "technical-seo-fundamentals",
  "local-business-growth-playbook",
  "technical-seo-guide",
  "internal-linking-guide",
  "seo-audit-framework",
  "link-building-strategies",
  "local-seo-checklist",
  "quality-score-guide",
  "negative-keywords-guide",
  "landing-page-best-practices",
  "roas-calculations",
  "heatmap-analysis",
  "conversion-psychology",
  "ab-testing-framework",
  "landing-page-optimization",
  "lifecycle-marketing",
  "automated-nurture-sequences",
  "email-segmentation",
  "attribution-models",
  "ga4-reporting",
  "marketing-dashboards",
] as const;

export const caseStudySlugs = [
  "landscaping-company-growth",
  "plumbing-company-growth",
  "saas-platform-growth",
] as const;
