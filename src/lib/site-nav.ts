export const CTA_LABEL = "Book a strategy call";
export const NAV_CONTACT_HREF = "/contact";
export const NAV_CONTACT_LABEL = "Contact";

export type NavChild = {
  href: string;
  label: string;
  description?: string;
};

export type MainNavItem = {
  href: string;
  label: string;
  key: string;
  children?: NavChild[];
  featured?: NavChild[];
  allLabel?: string;
  mega?: "services" | "industries";
  megaIntro?: string;
  dropdown?: string;
};

export const mainNavLinks: MainNavItem[] = [
  { href: "/case-studies", key: "caseStudies", label: "Work" },
  { href: "/services", key: "services", label: "Services" },
  {
    href: "/industries",
    key: "industries",
    label: "Industries",
    allLabel: "All industries",
    children: [
      { href: "/industries/home-services", label: "Home Services" },
      { href: "/industries/ecommerce", label: "E-commerce" },
    ],
  },
  { href: "/about", key: "about", label: "About" },
  { href: "/blog", key: "blog", label: "Blog" },
  { href: "/resources", key: "resources", label: "Resources" },
];

export const serviceNavGroups = [
  {
    key: "searchAndAds" as const,
    links: [
      { href: "/services/seo", key: "seo" as const },
      { href: "/services/seo", key: "localSeo" as const },
      { href: "/services/paid-media", key: "ppcManagement" as const },
      { href: "/services/paid-media", key: "metaAds" as const },
      { href: "/services/paid-media", key: "youtubeAds" as const },
      { href: "/services/paid-media", key: "microsoftAds" as const },
    ],
  },
  {
    key: "webAndConversion" as const,
    links: [
      { href: "/services/web-design", key: "webDesign" as const },
      { href: "/services/web-design", key: "landingPages" as const },
      { href: "/services/web-design", key: "cro" as const },
      { href: "/services/web-design", key: "websiteMaintenance" as const },
      { href: "/services/web-design", key: "websiteSpeed" as const },
      { href: "/services/seo", key: "analytics" as const },
    ],
  },
  {
    key: "brandAndContent" as const,
    links: [
      { href: "/services/branding", key: "branding" as const },
      { href: "/services/content-marketing", key: "contentMarketing" as const },
      { href: "/services/content-marketing", key: "emailMarketing" as const },
      { href: "/services/content-marketing", key: "socialMedia" as const },
      { href: "/services/content-marketing", key: "videoMarketing" as const },
      { href: "/services/content-marketing", key: "copywriting" as const },
    ],
  },
  {
    key: "growthAndStrategy" as const,
    links: [
      { href: "/services", key: "growthConsulting" as const },
      { href: "/audit", key: "marketingAudits" as const },
      { href: "/services", key: "funnels" as const },
      { href: "/services", key: "marketingAutomation" as const },
      { href: "/services", key: "fractionalCmo" as const },
      { href: "/services", key: "trainingWorkshops" as const },
    ],
  },
] as const;

export type ServiceNavLink = (typeof serviceNavGroups)[number]["links"][number];

export const serviceNavLinks: readonly ServiceNavLink[] = [
  ...serviceNavGroups[0].links,
  ...serviceNavGroups[1].links,
  ...serviceNavGroups[2].links,
  ...serviceNavGroups[3].links,
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
] as const;

export const footerServiceLinks = [
  { href: "/services/web-design", key: "webDesignShort" as const },
  { href: "/services/seo", key: "seo" as const },
  { href: "/services/branding", key: "branding" as const },
  { href: "/services/paid-media", key: "ppcManagementPricing" as const },
  { href: "/services/content-marketing", key: "contentMarketing" as const },
  { href: "/contact", key: "pricing" as const },
];

export const footerNavLinks = [
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Work" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
  { href: "/audit", label: "Audit" },
  { href: "/contact", label: "Contact" },
];

export const footerIndustryLinks = [
  { href: "/industries/home-services", label: "Home Services" },
  { href: "/industries/ecommerce", label: "E-commerce" },
];
