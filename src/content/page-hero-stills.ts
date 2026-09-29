/**
 * Unique full-bleed stills for marketing PageHero hubs.
 * Keep paths under /public/assets — one composition per page.
 */
export const pageHeroStills = {
  services: {
    // Full demand program — distinct from individual service stills
    src: "/assets/images/editorial/service-paid-media.webp",
  },
  about: {
    src: "/assets/images/industries/industry-professional-services.webp",
    srcSm: "/assets/images/industries/industry-professional-services-thumb.webp",
  },
  caseStudies: {
    src: "/assets/images/case-studies/ecommerce-store-growth.webp",
  },
  industries: {
    src: "/assets/images/editorial/market-home-services.webp",
    srcSm: "/assets/images/editorial/market-home-services-thumb.webp",
  },
  contact: {
    src: "/assets/images/editorial/market-saas.webp",
    srcSm: "/assets/images/editorial/market-saas-thumb.webp",
  },
  resources: {
    src: "/assets/images/resources/web-performance.webp",
  },
  audit: {
    src: "/assets/images/editorial/service-seo.webp",
  },
} as const;

export type PageHeroStillKey = keyof typeof pageHeroStills;
