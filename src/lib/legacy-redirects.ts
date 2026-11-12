/** Live URLs that this site no longer serves. Permanent redirects keep one English URL. */

function go(source: string, destination: string) {
  const rule = { source, destination, statusCode: 301 as const };
  if (source.includes(":")) return [rule];
  return [rule, { source: `${source}.html`, destination, statusCode: 301 as const }];
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

function localizedWildcard(source: string, destination: string) {
  return [
    { source, destination, statusCode: 301 as const },
    { source: `/en${source}`, destination, statusCode: 301 as const },
    { source: `/es${source}`, destination: `/es${destination}`, statusCode: 301 as const },
    { source: `/es-es${source}`, destination: `/es-es${destination}`, statusCode: 301 as const },
  ];
}

/**
 * Old nested industry paths that still have a live flattened trade page.
 * Must be registered before the nested industries catch-all.
 */
const NESTED_LIVE_INDUSTRY: Record<string, string> = {
  "/industries/home-services/landscaping": "/industries/landscaping",
  "/industries/home-services/plumbing": "/industries/plumbing",
  "/industries/home-services/hvac": "/industries/hvac",
  "/industries/home-services/electrical": "/industries/electrical",
  "/industries/home-services/roofing": "/industries/roofing",
};

/** Old article slugs mapped to the closest current page. */
const BLOG: Record<string, string> = {
  "diseno-web-para-contratistas": "/blog/web-design-for-contractors",
  "small-business-website-cost": "/pricing",
  "website-not-generating-leads": "/blog/turn-clicks-into-calls",
  "website-traffic-no-calls": "/blog/turn-clicks-into-calls",
  "website-redesign-signs": "/blog/website-mistakes-that-cost-you-calls",
  "website-builder-vs-professional": "/blog/wix-vs-squarespace-vs-managed-website-contractors",
  "google-ads-vs-facebook-ads": "/services",
  "more-leads-from-service-website": "/blog/turn-clicks-into-calls",
  "seo-pricing-guide": "/seo-services",
  "how-long-does-seo-take": "/seo-services",
  "local-seo-strategy-2026": "/blog/local-seo-get-found-get-called",
  "email-nurture-sequences-that-book-calls": "/blog",
  "website-conversion-optimization": "/blog/turn-clicks-into-calls",
  "google-business-profile-tips": "/blog/google-business-profile-checklist",
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

/** Retired top-level comparison / marketing pages from the previous site. */
const ORPHANS: Record<string, string> = {
  "/digital-marketing-agency": "/services",
  "/google-ads-vs-seo": "/seo-services",
  "/seo-vs-ppc": "/seo-services",
  "/local-seo-vs-google-ads": "/seo-services",
  "/wordpress-vs-webflow": "/web-design",
  "/login": "/contact",
  "/signup": "/contact",
  "/team": "/about",
  // Retired offer page; pricing replaced it.
  "/lead-magnet": "/pricing",
  // Search Console: crawlers sometimes turn "$97/mo" into a bare /mo path.
  "/mo": "/pricing",
};

export const LEGACY_REDIRECTS = [
  // Retired icon mark still requested by Search Console → current schema logo.
  { source: "/assets/logos/KINEXIS_icon_mark.avif", destination: "/favicon-512.webp", statusCode: 301 as const },
  { source: "/assets/logos/KINEXIS_icon_mark.webp", destination: "/favicon-512.webp", statusCode: 301 as const },
  { source: "/assets/logos/KINEXIS_icon_mark.png", destination: "/favicon-512.webp", statusCode: 301 as const },
  // Nested industry URLs that map 1:1 onto live flattened trade pages.
  ...Object.entries(NESTED_LIVE_INDUSTRY).flatMap(([source, destination]) =>
    localized(source, destination),
  ),
  // Every other nested industry tree (technology/fintech, manufacturing/*, …)
  // consolidates onto the industries hub in one hop.
  ...localizedWildcard("/industries/:category/:slug", "/industries"),
  ...localizedWildcard("/industries/:category/:slug/:path*", "/industries"),
  // Retired location × service microsites. Web-design city URLs keep design intent.
  ...localized("/locations", "/seo-services"),
  ...localizedWildcard("/locations/:city/web-design", "/web-design"),
  ...localizedWildcard("/locations/:path*", "/seo-services"),
  // Specific service detail pages before the services catch-all.
  ...localized("/services/landing-pages", "/web-design"),
  ...localized("/services/web-design", "/web-design"),
  ...localized("/services/seo", "/seo-services"),
  ...localized("/services/local-seo", "/seo-services"),
  ...localized("/services/branding", "/web-design"),
  ...localized("/services/paid-media", "/services"),
  ...localized("/services/content-marketing", "/blog"),
  ...localizedWildcard("/services/:path+", "/services"),
  // Retired landing-page and information-architecture families.
  ...localizedWildcard("/pricing/:path+", "/pricing"),
  // Bare /solutions index (Search Console still has the old hubs) plus detail slugs.
  ...localized("/solutions", "/services"),
  ...localizedWildcard("/solutions/:path+", "/services"),
  // Old team profile URLs.
  ...localizedWildcard("/team/:path*", "/about"),
  // Root orphans from the previous marketing site.
  ...Object.entries(ORPHANS).flatMap(([source, destination]) => localized(source, destination)),
  // The client update form is singular internally; preserve the plural URL
  // used in older references and send each locale straight to its form.
  ...localized("/updates", "/update"),
  ...localized("/blog/posts", "/blog"),
  ...localized("/case-studies", "/portfolio"),
  // Live trade proof pages beat the generic portfolio hub for these case URLs.
  ...localized("/case-studies/plumbing-company-growth", "/industries/plumbing"),
  ...localized("/case-studies/landscaping-company-growth", "/industries/landscaping"),
  { source: "/case-studies/:path*", destination: "/portfolio", statusCode: 301 as const },
  { source: "/en/case-studies/:path*", destination: "/portfolio", statusCode: 301 as const },
  { source: "/es/case-studies/:path*", destination: "/es/portfolio", statusCode: 301 as const },
  { source: "/es-es/case-studies/:path*", destination: "/es-es/portfolio", statusCode: 301 as const },
  ...localized("/resources", "/blog"),
  { source: "/resources/:path*", destination: "/blog", statusCode: 301 as const },
  { source: "/en/resources/:path*", destination: "/blog", statusCode: 301 as const },
  { source: "/es/resources/:path*", destination: "/es/blog", statusCode: 301 as const },
  { source: "/es-es/resources/:path*", destination: "/es-es/blog", statusCode: 301 as const },
  ...localizedWildcard("/blog/category/:slug", "/blog"),
  ...Object.entries(BLOG).flatMap(([slug, destination]) => localized(`/blog/${slug}`, destination)),
  // English-locale Spanish slugs: keep /es copies live, retire EN duplicates.
  ...go("/blog/pagina-web-para-plomeros", "/industries/plumbing"),
  ...go("/en/blog/pagina-web-para-plomeros", "/industries/plumbing"),
  ...go("/blog/como-pedir-resenas-en-google", "/blog/how-to-ask-for-google-reviews-contractor"),
  ...go("/en/blog/como-pedir-resenas-en-google", "/blog/how-to-ask-for-google-reviews-contractor"),
  ...go("/en", "/"),
];
