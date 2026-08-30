import { serviceHubPath } from "@/lib/legacy-redirects.mjs";

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

export const serviceRoutes: Record<ServiceSlug, string> = Object.fromEntries(
  serviceSlugs.map((slug) => [slug, serviceHubPath(slug)]),
) as Record<ServiceSlug, string>;

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
  "/services",
  "/blog",
  "/blog/posts",
  "/case-studies",
  "/industries",
  "/resources",
  "/audit",
  "/thank-you",
  "/privacy",
  "/terms",
] as const;

/** Legacy slugs — 301 to canonical service; excluded from sitemap. */
export const sitemapExcludedServiceSlugs = ["google-ads", "paid-ads"] as const;

export const sitemapServiceSlugs = serviceSlugs.filter(
  (slug) => !(sitemapExcludedServiceSlugs as readonly string[]).includes(slug),
);

/** Canonical service page when a slug has been retired or merged. */
export const serviceSlugCanonical: Partial<Record<ServiceSlug, ServiceSlug>> = {
  "google-ads": "ppc-management",
  "paid-ads": "ppc-management",
};

export function resolveServiceSlug(slug: ServiceSlug): ServiceSlug {
  return serviceSlugCanonical[slug] ?? slug;
}

export const blogSlugs = [
  "seo-pricing-guide",
  "how-long-does-seo-take",
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
  "ecommerce-store-growth",
] as const;
