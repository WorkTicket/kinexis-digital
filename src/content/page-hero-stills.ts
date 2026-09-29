/**
 * Unique full-bleed stills for marketing PageHero hubs.
 * Prefer bright agency craft / UI plates over gothic desk photography.
 * Optional `focus` is CSS object-position for pages tuned under the left wash.
 */
export const pageHeroStills = {
  services: {
    src: "/assets/images/agency/hero-services.webp",
    srcSm: "/assets/images/agency/hero-services-sm.webp",
  },
  about: {
    src: "/assets/images/agency/hero-about.webp?v=20260929b",
    srcSm: "/assets/images/agency/hero-about-sm.webp?v=20260929b",
    /** Bias desk craft into the clear right half under the wash */
    focus: "78% 42%",
  },
  caseStudies: {
    src: "/assets/images/agency/hero-work.webp",
    srcSm: "/assets/images/agency/hero-work-sm.webp",
  },
  industries: {
    src: "/assets/images/agency/hero-industries.webp",
    srcSm: "/assets/images/agency/hero-industries-sm.webp",
  },
  contact: {
    src: "/assets/images/agency/hero-contact.webp",
    srcSm: "/assets/images/agency/hero-contact-sm.webp",
  },
  resources: {
    src: "/assets/images/agency/hero-resources.webp",
    srcSm: "/assets/images/agency/hero-resources-sm.webp",
  },
  audit: {
    // SEO craft plate — on-brand UI language
    src: "/assets/images/services/service-seo.webp",
  },
} as const;

export type PageHeroStillKey = keyof typeof pageHeroStills;
