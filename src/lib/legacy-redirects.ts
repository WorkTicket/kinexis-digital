/** Live URLs that this site no longer serves. Permanent redirects keep one English URL. */

function go(source: string, destination: string) {
  const rule = { source, destination, permanent: true as const };
  if (source.includes(":")) return [rule];
  return [rule, { source: `${source}.html`, destination, permanent: true as const }];
}

/** Preserve retired English and Spanish URLs without redirect chains. */
function localized(source: string, destination: string) {
  return [
    ...go(source, destination),
    ...go(`/en${source}`, destination),
    ...go(`/es${source}`, `/es${destination}`),
    ...go(`/es-es${source}`, `/es-es${destination}`),
  ];
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
  ...localized("/services/web-design", "/web-design"),
  ...localized("/services/seo", "/seo-services"),
  ...localized("/services/branding", "/web-design"),
  ...localized("/services/paid-media", "/services"),
  ...localized("/services/content-marketing", "/blog"),
  ...localized("/blog/posts", "/blog"),
  ...localized("/case-studies", "/portfolio"),
  { source: "/case-studies/:path*", destination: "/portfolio", permanent: true as const },
  { source: "/en/case-studies/:path*", destination: "/portfolio", permanent: true as const },
  { source: "/es/case-studies/:path*", destination: "/es/portfolio", permanent: true as const },
  { source: "/es-es/case-studies/:path*", destination: "/es-es/portfolio", permanent: true as const },
  ...localized("/resources", "/blog"),
  { source: "/resources/:path*", destination: "/blog", permanent: true as const },
  { source: "/en/resources/:path*", destination: "/blog", permanent: true as const },
  { source: "/es/resources/:path*", destination: "/es/blog", permanent: true as const },
  { source: "/es-es/resources/:path*", destination: "/es-es/blog", permanent: true as const },
  { source: "/blog/category/:slug", destination: "/blog", permanent: true as const },
  ...Object.entries(BLOG).flatMap(([slug, destination]) => localized(`/blog/${slug}`, destination)),
  // The old site nested trade pages under /home-services. Current pages cover
  // the same trade directly and are the only equivalent industry destinations.
  { source: "/industries/home-services/:slug", destination: "/industries/:slug", permanent: true as const },
  { source: "/en/industries/home-services/:slug", destination: "/industries/:slug", permanent: true as const },
  { source: "/es/industries/home-services/:slug", destination: "/es/industries/:slug", permanent: true as const },
  { source: "/es-es/industries/home-services/:slug", destination: "/es-es/industries/:slug", permanent: true as const },
  ...go("/en", "/"),
  { source: "/en/:path*", destination: "/:path*", permanent: true as const },
];
