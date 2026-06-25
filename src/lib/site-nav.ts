export const mainNavLinks = [
  { href: "/digital-marketing-agency", key: "agency" as const },
  { href: "/services", key: "services" as const, dropdown: "services" as const },
  { href: "/case-studies", key: "caseStudies" as const },
  { href: "/industries", key: "industries" as const, dropdown: "industries" as const },
  { href: "/about", key: "about" as const },
  { href: "/blog", key: "blog" as const },
  { href: "/resources", key: "resources" as const, dropdown: "resources" as const },
] as const;

export const serviceNavGroups = [
  {
    key: "searchAndAds" as const,
    links: [
      { href: "/services/seo", key: "seo" as const },
      { href: "/services/local-seo", key: "localSeo" as const },
      { href: "/services/google-ads", key: "googleAds" as const },
      { href: "/services/meta-ads", key: "metaAds" as const },
      { href: "/services/ppc-management", key: "ppcManagement" as const },
      { href: "/services/paid-ads", key: "paidAds" as const },
    ],
  },
  {
    key: "webAndConversion" as const,
    links: [
      { href: "/services/web-design", key: "webDesign" as const },
      { href: "/services/funnels", key: "funnels" as const },
      { href: "/services/analytics", key: "analytics" as const },
    ],
  },
  {
    key: "brandAndContent" as const,
    links: [
      { href: "/services/branding", key: "branding" as const },
      { href: "/services/content-marketing", key: "contentMarketing" as const },
      { href: "/services/email-marketing", key: "emailMarketing" as const },
      { href: "/services/social-media", key: "socialMedia" as const },
      { href: "/services/video-marketing", key: "videoMarketing" as const },
      { href: "/services/growth-consulting", key: "growthConsulting" as const },
    ],
  },
] as const;

export type ServiceNavLink = (typeof serviceNavGroups)[number]["links"][number];

export const serviceNavLinks: readonly ServiceNavLink[] = [
  ...serviceNavGroups[0].links,
  ...serviceNavGroups[1].links,
  ...serviceNavGroups[2].links,
];

export const resourceNavGroups = [
  {
    key: "guides" as const,
    links: [
      { href: "/blog/local-seo-checklist", key: "localSeoChecklist" as const },
      { href: "/blog/seo-audit-framework", key: "seoAuditFramework" as const },
      { href: "/blog/landing-page-best-practices", key: "landingPageBestPractices" as const },
      { href: "/blog/ab-testing-framework", key: "abTestingFramework" as const },
    ],
  },
  {
    key: "comparisons" as const,
    links: [
      { href: "/google-ads-vs-seo", key: "googleAdsVsSeo" as const },
      { href: "/seo-vs-ppc", key: "seoVsPpc" as const },
      { href: "/local-seo-vs-google-ads", key: "localSeoVsGoogleAds" as const },
      { href: "/wordpress-vs-webflow", key: "wordpressVsWebflow" as const },
    ],
  },
  {
    key: "solutions" as const,
    links: [
      { href: "/solutions", key: "viewAllSolutions" as const },
    ],
  },
] as const;

export const footerServiceLinks = [
  { href: "/pricing/seo", key: "pricing" as const },
  ...serviceNavLinks.slice(0, 5),
];

/** Featured markets linked from the footer for local SEO equity. */
export const footerLocationLinks = [
  { href: "/locations/dallas", city: "Dallas" },
  { href: "/locations/austin", city: "Austin" },
  { href: "/locations/toronto", city: "Toronto" },
  { href: "/locations/bogota", city: "Bogotá" },
  { href: "/locations/cedar-falls", city: "Cedar Falls" },
  { href: "/locations/cedar-rapids", city: "Cedar Rapids" },
  { href: "/locations/des-moines", city: "Des Moines" },
  { href: "/locations/waterloo", city: "Waterloo" },
] as const;
