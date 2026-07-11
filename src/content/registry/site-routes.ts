export const serviceSlugs = [
  "seo",
  "local-seo",
  "ppc-management",
  "google-ads",
  "meta-ads",
  "youtube-ads",
  "microsoft-ads",
  "web-design",
  "cro",
  "email-marketing",
  "content-marketing",
  "copywriting",
  "social-media",
  "video-marketing",
  "branding",
  "analytics",
  "growth-consulting",
  "marketing-audits",
  "marketing-automation-crm",
  "fractional-cmo",
  "training-workshops",
  "funnels",
  "paid-ads",
  "landing-pages",
  "website-maintenance",
  "website-speed",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export const coreRevenueServices: ServiceSlug[] = [
  "seo",
  "local-seo",
  "ppc-management",
  "meta-ads",
  "youtube-ads",
  "microsoft-ads",
  "web-design",
  "cro",
  "funnels",
  "email-marketing",
  "content-marketing",
  "copywriting",
  "social-media",
  "video-marketing",
  "branding",
  "analytics",
  "growth-consulting",
  "marketing-audits",
  "marketing-automation-crm",
  "fractional-cmo",
  "training-workshops",
  "landing-pages",
  "website-maintenance",
  "website-speed",
];

export const serviceRoutes: Record<ServiceSlug, string> = {
  seo: "/services/seo",
  "local-seo": "/services/local-seo",
  "ppc-management": "/services/ppc-management",
  "google-ads": "/services/google-ads",
  "meta-ads": "/services/meta-ads",
  "youtube-ads": "/services/youtube-ads",
  "microsoft-ads": "/services/microsoft-ads",
  "web-design": "/services/web-design",
  cro: "/services/cro",
  "email-marketing": "/services/email-marketing",
  "content-marketing": "/services/content-marketing",
  copywriting: "/services/copywriting",
  "social-media": "/services/social-media",
  "video-marketing": "/services/video-marketing",
  branding: "/services/branding",
  analytics: "/services/analytics",
  "growth-consulting": "/services/growth-consulting",
  "marketing-audits": "/services/marketing-audits",
  "marketing-automation-crm": "/services/marketing-automation-crm",
  "fractional-cmo": "/services/fractional-cmo",
  "training-workshops": "/services/training-workshops",
  funnels: "/services/funnels",
  "paid-ads": "/services/paid-ads",
  "landing-pages": "/services/landing-pages",
  "website-maintenance": "/services/website-maintenance",
  "website-speed": "/services/website-speed",
};

export const serviceLabels: Record<ServiceSlug, string> = {
  seo: "SEO Services",
  "local-seo": "Local SEO Services",
  "ppc-management": "Google Ads (PPC) Management",
  "google-ads": "Google Ads (PPC) Management",
  "meta-ads": "Meta Ads Management",
  "youtube-ads": "YouTube Ads Management",
  "microsoft-ads": "Microsoft Ads (Bing Ads) Management",
  "web-design": "Website Design & Development",
  cro: "Conversion Rate Optimization",
  "email-marketing": "Email Marketing & Automation",
  "content-marketing": "Content Marketing Services",
  copywriting: "Copywriting & Content Creation",
  "social-media": "Social Media Marketing Services",
  "video-marketing": "Video Marketing Services",
  branding: "Branding & Visual Identity",
  analytics: "Analytics & Reporting",
  "growth-consulting": "Digital Marketing Strategy",
  "marketing-audits": "Marketing Audits",
  "marketing-automation-crm": "Marketing Automation & CRM Consulting",
  "fractional-cmo": "Fractional CMO Services",
  "training-workshops": "Training & Workshops",
  funnels: "Customer Journey & Funnel Strategy",
  "paid-ads": "Paid Ads",
  "landing-pages": "Landing Page Design & Optimization",
  "website-maintenance": "Website Maintenance & Support",
  "website-speed": "Website Speed & Performance Optimization",
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
  "/pricing",
  "/privacy",
  "/terms",
] as const;

/** Legacy slugs — 301 to canonical service; excluded from sitemap. */
export const sitemapExcludedServiceSlugs = ["google-ads", "paid-ads"] as const;

/** Retired pricing slugs — 301 to canonical target; excluded from sitemap. */
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

/** Canonical service page when a slug has been retired or merged. */
export const serviceSlugCanonical: Partial<Record<ServiceSlug, ServiceSlug>> = {
  "google-ads": "ppc-management",
  "paid-ads": "ppc-management",
};

export function resolvePricingSlug(slug: PricingSlug): PricingSlug {
  return pricingSlugCanonical[slug] ?? slug;
}

export function resolveServiceSlug(slug: ServiceSlug): ServiceSlug {
  return serviceSlugCanonical[slug] ?? slug;
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
