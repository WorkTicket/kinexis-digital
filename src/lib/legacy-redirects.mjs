/**
 * 301 redirect map for retired URL patterns (Phase A removal).
 *
 * Location pages were removed in favor of /digital-marketing-agency.
 * Case studies were consolidated from 6 slugs to 3 canonical slugs.
 */

export const LOCATION_REDIRECT_DEST = "/digital-marketing-agency";

/** Retired case study slug → replacement slug. Empty string = redirect to /case-studies hub. */
export const CASE_STUDY_SLUG_REDIRECTS = {
  "dental-practice-local-seo": "plumbing-company-growth",
  "saas-analytics-platform": "saas-platform-growth",
  "fintech-app-startup": "saas-platform-growth",
  "b2b-consulting-firm": "saas-platform-growth",
  "premium-ecommerce-brand": "",
};

const LOCALES = ["en", "es"];

function caseStudyDestination(slug) {
  return slug ? `/case-studies/${slug}` : "/case-studies";
}

/** Redirect rules consumed by next.config.mjs `redirects()`. */
export function getLegacyRedirects() {
  const redirects = [
    {
      source: "/:locale(en|es)/locations",
      destination: "/:locale/digital-marketing-agency",
      permanent: true,
    },
    {
      source: "/:locale(en|es)/locations/:path*",
      destination: "/:locale/digital-marketing-agency",
      permanent: true,
    },
    {
      source: "/locations",
      destination: "/en/digital-marketing-agency",
      permanent: true,
    },
    {
      source: "/locations/:path*",
      destination: "/en/digital-marketing-agency",
      permanent: true,
    },
  ];

  for (const [oldSlug, newSlug] of Object.entries(CASE_STUDY_SLUG_REDIRECTS)) {
    const destPath = caseStudyDestination(newSlug);

    for (const locale of LOCALES) {
      redirects.push({
        source: `/${locale}/case-studies/${oldSlug}`,
        destination: `/${locale}${destPath}`,
        permanent: true,
      });
    }

    redirects.push({
      source: `/case-studies/${oldSlug}`,
      destination: `/en${destPath}`,
      permanent: true,
    });
  }

  return redirects;
}

/** Unprefixed legacy paths for middleware (single-hop before locale prefixing). */
export function matchUnprefixedLegacyRedirect(pathname) {
  if (pathname === "/locations" || pathname.startsWith("/locations/")) {
    return `/en${LOCATION_REDIRECT_DEST}`;
  }

  for (const [oldSlug, newSlug] of Object.entries(CASE_STUDY_SLUG_REDIRECTS)) {
    if (pathname === `/case-studies/${oldSlug}`) {
      return `/en${caseStudyDestination(newSlug)}`;
    }
  }

  return null;
}
