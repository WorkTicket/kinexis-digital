export const CTA_LABEL = "Book a strategy call";
export const NAV_CONTACT_HREF = "/contact";
export const NAV_CONTACT_LABEL = "Contact";

export type MegaMenuId = "services" | "industries" | "resources";

export type MegaLink = {
  href: string;
  key: string;
};

export type MegaGroup = {
  key: string;
  links: MegaLink[];
};

export type MegaFeature = {
  href: string;
  secondaryHref?: string;
};

export type MainNavItem = {
  href: string;
  label: string;
  key: string;
  /** Copy lives at `nav.mega.{menu}` */
  menu?: MegaMenuId;
  groups?: MegaGroup[];
  feature?: MegaFeature;
};

/**
 * Menus only list pages that exist. Channel names that share a URL
 * (Google Ads, Meta, local SEO) stay on that service page.
 */
export const mainNavLinks: MainNavItem[] = [
  { href: "/case-studies", key: "caseStudies", label: "Work" },
  {
    href: "/services",
    key: "services",
    label: "Services",
    menu: "services",
    groups: [
      {
        key: "program",
        links: [
          { href: "/services/seo", key: "seo" },
          { href: "/services/paid-media", key: "paidAds" },
          { href: "/services/web-design", key: "webDesign" },
          { href: "/services/branding", key: "branding" },
          { href: "/services/content-marketing", key: "content" },
        ],
      },
      {
        key: "proof",
        links: [
          { href: "/case-studies/landscaping-company-growth", key: "a1" },
          { href: "/case-studies/plumbing-company-growth", key: "preferred" },
          { href: "/case-studies/ecommerce-store-growth", key: "manos" },
        ],
      },
    ],
    feature: {
      href: "/contact",
      secondaryHref: "/audit",
    },
  },
  {
    href: "/industries",
    key: "industries",
    label: "Industries",
    menu: "industries",
    groups: [
      {
        key: "contractors",
        links: [
          { href: "/industries/home-services", key: "homeServices" },
          { href: "/industries/plumbing", key: "plumbing" },
          { href: "/industries/hvac", key: "hvac" },
          { href: "/industries/roofing", key: "roofing" },
          { href: "/industries/landscaping", key: "landscaping" },
        ],
      },
      {
        key: "commerce",
        links: [
          { href: "/industries/ecommerce", key: "ecommerce" },
          { href: "/industries/saas", key: "saas" },
          { href: "/industries/fintech", key: "fintech" },
        ],
      },
    ],
    feature: {
      href: "/industries/home-services",
      secondaryHref: "/case-studies",
    },
  },
  { href: "/about", key: "about", label: "About" },
  { href: "/blog", key: "blog", label: "Blog" },
  {
    href: "/resources",
    key: "resources",
    label: "Resources",
    menu: "resources",
    groups: [
      {
        key: "guides",
        links: [
          { href: "/blog/local-seo-checklist", key: "localSeoChecklist" },
          { href: "/blog/seo-audit-framework", key: "seoAuditFramework" },
          { href: "/blog/landing-page-best-practices", key: "landingPageBestPractices" },
          { href: "/blog/ab-testing-framework", key: "abTestingFramework" },
          { href: "/blog/local-seo-strategy-2026", key: "localSeoStrategy" },
        ],
      },
      {
        key: "read",
        links: [
          { href: "/blog", key: "blog" },
          { href: "/case-studies", key: "work" },
          { href: "/blog/website-conversion-optimization", key: "conversion" },
        ],
      },
    ],
    feature: {
      href: "/audit",
      secondaryHref: "/blog/local-seo-checklist",
    },
  },
];

export function megaDestinations(item: MainNavItem): string[] {
  const hrefs = item.groups?.flatMap((group) => group.links.map((link) => link.href)) ?? [];
  if (item.feature) {
    hrefs.push(item.feature.href);
    if (item.feature.secondaryHref) hrefs.push(item.feature.secondaryHref);
  }
  return hrefs;
}

/** Longest matching href wins, so a guide doesn't also light up the blog index. */
export function activeMegaHref(pathname: string, hrefs: readonly string[]) {
  let best: string | undefined;
  for (const href of hrefs) {
    const match = pathname === href || pathname.startsWith(`${href}/`);
    if (!match) continue;
    if (!best || href.length > best.length) best = href;
  }
  return best;
}

export function isMainNavActive(
  pathname: string,
  item: MainNavItem,
  items: readonly MainNavItem[],
) {
  if (pathname === item.href || pathname.startsWith(`${item.href}/`)) return true;
  const tops = items.map((entry) => entry.href);
  return megaDestinations(item).some((href) => {
    if (href === item.href) return false;
    const covered = tops.some(
      (top) => top !== item.href && (href === top || href.startsWith(`${top}/`)),
    );
    if (covered) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  });
}

export const footerServiceLinks = [
  { href: "/services/web-design", key: "webDesignShort" as const },
  { href: "/services/seo", key: "seo" as const },
  { href: "/services/branding", key: "brandingShort" as const },
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
  { href: "/industries/home-services", label: "Home Services", key: "homeServices" },
  { href: "/industries/plumbing", label: "Plumbing", key: "plumbing" },
  { href: "/industries/landscaping", label: "Landscaping", key: "landscaping" },
  { href: "/industries/hvac", label: "HVAC", key: "hvac" },
  { href: "/industries/roofing", label: "Roofing", key: "roofing" },
  { href: "/industries/ecommerce", label: "E-commerce", key: "ecommerce" },
];
