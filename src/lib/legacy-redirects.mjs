/**
 * Single 301 map for the English-first rebuild.
 * Middleware applies this after stripping /en|/es so locale + dest never chain.
 */

export const LOCATION_REDIRECT_DEST = "/about";

const LOCALES = ["en", "es-ES", "es-419", "es"];

/** Retired case study slug → replacement slug. Empty string = case-studies hub. */
export const CASE_STUDY_SLUG_REDIRECTS = {
  "dental-practice-local-seo": "plumbing-company-growth",
  "saas-analytics-platform": "ecommerce-store-growth",
  "fintech-app-startup": "ecommerce-store-growth",
  "b2b-consulting-firm": "ecommerce-store-growth",
  "saas-platform-growth": "ecommerce-store-growth",
  "premium-ecommerce-brand": "",
};

/** Long-tail /services/[slug] → five-pillar hub anchor. */
export const SERVICE_HUB_ANCHOR_BY_SLUG = {
  "web-design": "web-design",
  "landing-pages": "web-design",
  cro: "web-design",
  funnels: "web-design",
  "website-maintenance": "web-design",
  "website-speed": "web-design",
  seo: "seo",
  "local-seo": "seo",
  analytics: "seo",
  branding: "branding",
  "paid-media": "paid-media",
  "ppc-management": "paid-media",
  "google-ads": "paid-media",
  "paid-ads": "paid-media",
  "meta-ads": "paid-media",
  "youtube-ads": "paid-media",
  "microsoft-ads": "paid-media",
  "content-marketing": "content-marketing",
  "email-marketing": "content-marketing",
  "social-media": "content-marketing",
  "video-marketing": "content-marketing",
  copywriting: "content-marketing",
  "marketing-automation-crm": "content-marketing",
  "growth-consulting": "",
  "marketing-audits": "",
  "fractional-cmo": "",
  "training-workshops": "",
};

/** Dedicated service pages that render instead of hub-anchor redirects. */
export const FLAGSHIP_SERVICE_SLUGS = [
  "web-design",
  "seo",
  "branding",
  "paid-media",
  "content-marketing",
];
const FLAGSHIP_SERVICE_SET = new Set(FLAGSHIP_SERVICE_SLUGS);

export function isFlagshipServiceSlug(slug) {
  return FLAGSHIP_SERVICE_SET.has(slug);
}

export const STANDALONE_INDUSTRY_SLUGS = ["home-services", "ecommerce"];

export const INDUSTRY_HUB_SLUGS = [
  "home-services",
  "ecommerce",
  "healthcare",
  "dental",
  "legal",
  "real-estate",
  "restaurants",
  "saas",
  "automotive",
  "fitness",
  "construction",
  "professional-services",
  "financial-services",
  "education",
  "beauty-wellness",
];

/** Live category slugs that are not rebuild hub chapters. */
export const INDUSTRY_CATEGORY_REDIRECTS = {
  technology: "/industries#saas",
  hospitality: "/industries#restaurants",
  manufacturing: "/industries",
};

const RETIRED_EXACT = {
  "/google-ads-vs-seo": "/resources",
  "/seo-vs-ppc": "/resources",
  "/wordpress-vs-webflow": "/resources",
  "/local-seo-vs-google-ads": "/resources",
};

const STANDALONE_INDUSTRY_SET = new Set(STANDALONE_INDUSTRY_SLUGS);
const INDUSTRY_HUB_SET = new Set(INDUSTRY_HUB_SLUGS);

function caseStudyDestination(slug) {
  return slug ? `/case-studies/${slug}` : "/case-studies";
}

export function serviceHubPath(slug) {
  if (FLAGSHIP_SERVICE_SET.has(slug)) return `/services/${slug}`;
  if (!(slug in SERVICE_HUB_ANCHOR_BY_SLUG)) return "/services";
  const anchor = SERVICE_HUB_ANCHOR_BY_SLUG[slug];
  if (!anchor) return "/services";
  if (FLAGSHIP_SERVICE_SET.has(anchor)) return `/services/${anchor}`;
  return `/services#${anchor}`;
}

export function stripLocalePrefix(pathname) {
  const match = pathname.match(/^\/(en|es)(\/.*)?$/);
  if (!match) return pathname;
  const rest = match[2] ?? "";
  return rest === "" ? "/" : rest;
}

function startsWithPrefix(pathname, prefix) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function matchIndustryPath(pathname) {
  if (pathname === "/industries") return null;
  if (!pathname.startsWith("/industries/")) return null;

  const parts = pathname.split("/").filter(Boolean);
  const category = parts[1];
  const nested = parts.slice(2);

  if (STANDALONE_INDUSTRY_SET.has(category)) {
    return nested.length > 0 ? `/industries/${category}` : null;
  }

  for (const segment of nested) {
    if (INDUSTRY_HUB_SET.has(segment)) return `/industries#${segment}`;
  }

  if (category in INDUSTRY_CATEGORY_REDIRECTS) {
    return INDUSTRY_CATEGORY_REDIRECTS[category];
  }

  if (INDUSTRY_HUB_SET.has(category)) return `/industries#${category}`;

  return "/industries";
}

function matchServicePath(pathname) {
  if (pathname === "/services") return null;
  if (!pathname.startsWith("/services/")) return null;

  const slug = pathname.slice("/services/".length).split("/").filter(Boolean)[0];
  if (!slug) return "/services";
  if (FLAGSHIP_SERVICE_SET.has(slug)) return null;
  return serviceHubPath(slug);
}

/** Unprefixed path → dest (may include hash), or null to keep. */
export function matchUnprefixedLegacyRedirect(pathname) {
  if (startsWithPrefix(pathname, "/locations")) return LOCATION_REDIRECT_DEST;
  if (startsWithPrefix(pathname, "/pricing")) return "/contact";
  if (startsWithPrefix(pathname, "/lead-magnet")) return "/contact";
  if (startsWithPrefix(pathname, "/digital-marketing-agency")) return "/about";
  if (startsWithPrefix(pathname, "/solutions")) return "/services";
  if (startsWithPrefix(pathname, "/team")) return "/about";
  if (startsWithPrefix(pathname, "/clients")) return "/case-studies";

  if (pathname === "/lp" || pathname === "/lp/") return "/contact";

  if (pathname in RETIRED_EXACT) return RETIRED_EXACT[pathname];

  for (const [oldSlug, newSlug] of Object.entries(CASE_STUDY_SLUG_REDIRECTS)) {
    if (pathname === `/case-studies/${oldSlug}`) {
      return caseStudyDestination(newSlug);
    }
  }

  const serviceDest = matchServicePath(pathname);
  if (serviceDest) return serviceDest;

  return matchIndustryPath(pathname);
}

/**
 * Full request path → one-hop dest, or null if the URL should render.
 * Locale prefixes always 301 onto the unprefixed dest.
 */
export function resolveLegacyRedirect(pathname) {
  const normalized = stripLocalePrefix(pathname);
  const mapped = matchUnprefixedLegacyRedirect(normalized) ?? normalized;
  if (mapped === pathname) return null;

  const hashIndex = mapped.indexOf("#");
  if (hashIndex === -1) return { path: mapped, hash: "" };
  return {
    path: mapped.slice(0, hashIndex) || "/",
    hash: mapped.slice(hashIndex + 1),
  };
}

function rule(source, destination) {
  return { source, destination, permanent: true };
}

function localeVariants(sourcePath) {
  const path = sourcePath.startsWith("/") ? sourcePath : `/${sourcePath}`;
  return [path, ...LOCALES.map((locale) => `/${locale}${path}`)];
}

function rulesFor(sourcePath, destination) {
  return localeVariants(sourcePath).map((source) => rule(source, destination));
}

/** Redirect rules consumed by next.config.mjs `redirects()`. */
export function getLegacyRedirects() {
  const redirects = [
    ...rulesFor("/locations", LOCATION_REDIRECT_DEST),
    ...rulesFor("/locations/:path*", LOCATION_REDIRECT_DEST),
    ...rulesFor("/pricing", "/contact"),
    ...rulesFor("/pricing/:path*", "/contact"),
    ...rulesFor("/lead-magnet", "/contact"),
    ...rulesFor("/lead-magnet/:path*", "/contact"),
    ...rulesFor("/digital-marketing-agency", "/about"),
    ...rulesFor("/digital-marketing-agency/:path*", "/about"),
    ...rulesFor("/solutions", "/services"),
    ...rulesFor("/solutions/:path*", "/services"),
    ...rulesFor("/team", "/about"),
    ...rulesFor("/team/:path*", "/about"),
    ...rulesFor("/clients", "/case-studies"),
    ...rulesFor("/clients/:path*", "/case-studies"),
    ...rulesFor("/lp", "/contact"),
    ...rulesFor("/google-ads-vs-seo", "/resources"),
    ...rulesFor("/seo-vs-ppc", "/resources"),
    ...rulesFor("/wordpress-vs-webflow", "/resources"),
    ...rulesFor("/local-seo-vs-google-ads", "/resources"),
  ];

  for (const slug of Object.keys(SERVICE_HUB_ANCHOR_BY_SLUG)) {
    if (FLAGSHIP_SERVICE_SET.has(slug)) continue;
    redirects.push(...rulesFor(`/services/${slug}`, serviceHubPath(slug)));
  }
  for (const slug of STANDALONE_INDUSTRY_SLUGS) {
    redirects.push(...rulesFor(`/industries/${slug}/:path+`, `/industries/${slug}`));
  }

  for (const [category, dest] of Object.entries(INDUSTRY_CATEGORY_REDIRECTS)) {
    redirects.push(...rulesFor(`/industries/${category}`, dest));
    redirects.push(...rulesFor(`/industries/${category}/:path*`, dest));
  }

  // Live nested paths whose last segment is itself a hub chapter.
  // Must be listed before the parent /:path* rule — Next uses first match.
  const NESTED_HUB_CHAPTERS = [{ parent: "healthcare", child: "dental" }];
  for (const { parent, child } of NESTED_HUB_CHAPTERS) {
    redirects.push(
      ...rulesFor(`/industries/${parent}/${child}`, `/industries#${child}`),
      ...rulesFor(`/industries/${parent}/${child}/:path*`, `/industries#${child}`),
    );
  }

  for (const slug of INDUSTRY_HUB_SLUGS) {
    if (STANDALONE_INDUSTRY_SET.has(slug)) continue;
    redirects.push(...rulesFor(`/industries/${slug}`, `/industries#${slug}`));
    redirects.push(...rulesFor(`/industries/${slug}/:path*`, `/industries#${slug}`));
  }

  for (const [oldSlug, newSlug] of Object.entries(CASE_STUDY_SLUG_REDIRECTS)) {
    redirects.push(
      ...rulesFor(`/case-studies/${oldSlug}`, caseStudyDestination(newSlug)),
    );
  }

  redirects.push(
    rule("/en", "/"),
    rule("/es", "/"),
    rule("/en/:path*", "/:path*"),
    rule("/es/:path*", "/:path*"),
  );

  return redirects;
}
