/**
 * Legacy photographic PageHero stills.
 * Marketing hubs are type-led (no atmosphere photo) as of the no-photo redesign.
 * Kept only if a future route opts back into atmosphereSrc.
 */
const V = "20260929e";

export const pageHeroStills = {
  services: {
    src: `/assets/images/agency/hero-services.webp?v=${V}`,
    srcSm: `/assets/images/agency/hero-services-sm.webp?v=${V}`,
    focus: "78% 42%",
  },
  about: {
    src: `/assets/images/agency/hero-about.webp?v=20260929d`,
    srcSm: `/assets/images/agency/hero-about-sm.webp?v=20260929d`,
    focus: "80% 44%",
  },
  caseStudies: {
    src: `/assets/images/agency/hero-work.webp?v=${V}`,
    srcSm: `/assets/images/agency/hero-work-sm.webp?v=${V}`,
    focus: "76% 40%",
  },
  industries: {
    src: `/assets/images/agency/hero-industries.webp?v=${V}`,
    srcSm: `/assets/images/agency/hero-industries-sm.webp?v=${V}`,
    focus: "78% 42%",
  },
  contact: {
    src: `/assets/images/agency/hero-contact.webp?v=${V}`,
    srcSm: `/assets/images/agency/hero-contact-sm.webp?v=${V}`,
    focus: "72% 45%",
  },
  resources: {
    src: `/assets/images/agency/hero-resources.webp?v=${V}`,
    srcSm: `/assets/images/agency/hero-resources-sm.webp?v=${V}`,
    focus: "74% 42%",
  },
  audit: {
    src: `/assets/images/agency/hero-audit.webp?v=${V}`,
    srcSm: `/assets/images/agency/hero-audit-sm.webp?v=${V}`,
    focus: "78% 40%",
  },
} as const;

export type PageHeroStillKey = keyof typeof pageHeroStills;
