/** Live URLs that this site no longer serves. Permanent redirects keep one English URL. */

function go(source: string, destination: string) {
  const rule = { source, destination, permanent: true as const };
  if (source.includes(":")) return [rule];
  return [rule, { source: `${source}.html`, destination, permanent: true as const }];
}

/** Old article slugs mapped to the closest current page. */
const BLOG: Record<string, string> = {
  "small-business-website-cost": "/blog/small-business-marketing-budget",
  "website-not-generating-leads": "/blog/turn-clicks-into-calls",
  "website-traffic-no-calls": "/blog/turn-clicks-into-calls",
  "website-redesign-signs": "/blog/website-mistakes-that-cost-you-calls",
  "website-builder-vs-professional": "/web-design",
  "google-ads-vs-facebook-ads": "/services",
  "more-leads-from-service-website": "/blog/turn-clicks-into-calls",
  "seo-pricing-guide": "/seo-services",
  "how-long-does-seo-take": "/seo-services",
  "local-seo-strategy-2026": "/blog/local-seo-get-found-get-called",
  "email-nurture-sequences-that-book-calls": "/blog",
  "website-conversion-optimization": "/blog/turn-clicks-into-calls",
  "google-business-profile-tips": "/blog/local-seo-get-found-get-called",
  "seo-vs-google-ads": "/seo-services",
  "technical-seo-fundamentals": "/seo-services",
  "local-business-growth-playbook": "/blog",
  "technical-seo-guide": "/seo-services",
  "internal-linking-guide": "/blog",
  "seo-audit-framework": "/audit",
  "link-building-strategies": "/seo-services",
  "local-seo-checklist": "/blog/local-seo-get-found-get-called",
  "quality-score-guide": "/blog",
  "negative-keywords-guide": "/blog",
  "landing-page-best-practices": "/blog/turn-clicks-into-calls",
  "roas-calculations": "/blog",
  "heatmap-analysis": "/blog",
  "conversion-psychology": "/blog/turn-clicks-into-calls",
  "ab-testing-framework": "/blog",
  "landing-page-optimization": "/blog/turn-clicks-into-calls",
  "lifecycle-marketing": "/blog",
  "automated-nurture-sequences": "/blog",
  "email-segmentation": "/blog",
  "attribution-models": "/blog",
  "ga4-reporting": "/blog",
  "marketing-dashboards": "/blog",
};

export const LEGACY_REDIRECTS = [
  ...go("/services/web-design", "/web-design"),
  ...go("/services/seo", "/seo-services"),
  ...go("/services/branding", "/web-design"),
  ...go("/services/paid-media", "/services"),
  ...go("/services/content-marketing", "/blog"),
  ...go("/blog/posts", "/blog"),
  ...go("/resources", "/blog"),
  { source: "/resources/:path*", destination: "/blog", permanent: true as const },
  { source: "/blog/category/:slug", destination: "/blog", permanent: true as const },
  ...Object.entries(BLOG).flatMap(([slug, destination]) => go(`/blog/${slug}`, destination)),
  ...go("/en", "/"),
  { source: "/en/:path*", destination: "/:path*", permanent: true as const },
];
