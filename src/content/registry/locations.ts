export type LocationEntry = {
  slug: string;
  city: string;
  state: string;
  region: string;
  country: string;
  description: string;
  localProof: string[];
  services: string[];
  relatedCaseStudySlugs?: string[];
};

export const locations: LocationEntry[] = [
  {
    slug: "toronto",
    city: "Toronto",
    state: "Ontario",
    region: "Greater Toronto Area",
    country: "Canada",
    description:
      "Digital marketing for Toronto SaaS, professional services, and healthcare brands competing in one of Canada's most crowded search markets. We build SEO, paid media, and conversion systems tuned to GTA buyer behavior, not generic agency playbooks.",
    localProof: [
      "Campaign experience across downtown Toronto, Mississauga, and North York corridors",
      "Average Google Ads CPC benchmarks tracked for GTA professional services verticals",
      "Bilingual EN/FR content capability for Quebec-adjacent markets",
    ],
    services: ["seo", "google-ads", "ppc-management", "web-design", "content-marketing", "growth-consulting"],
    relatedCaseStudySlugs: ["saas-analytics-platform", "b2b-consulting-firm"],
  },
  {
    slug: "dallas",
    city: "Dallas",
    state: "Texas",
    region: "Dallas-Fort Worth Metro",
    country: "United States",
    description:
      "Growth marketing for Dallas-Fort Worth contractors, home services, and healthcare providers. We combine local SEO, Google Ads, and conversion-focused sites with Texas market data from real client campaigns.",
    localProof: [
      "Landscaping case study: +340% organic traffic for DFW-area home services client",
      "Google Ads CPC tracking for HVAC, roofing, and contractor keywords across DFW",
      "Service-area campaigns spanning Dallas, Plano, Frisco, and Fort Worth",
    ],
    services: ["seo", "local-seo", "google-ads", "web-design", "funnels", "ppc-management"],
    relatedCaseStudySlugs: ["landscaping-company-growth", "dental-practice-local-seo"],
  },
  {
    slug: "austin",
    city: "Austin",
    state: "Texas",
    region: "Central Texas",
    country: "United States",
    description:
      "Marketing for Austin tech startups and local service businesses in one of the fastest-growing US metros. Product-led content, paid acquisition, and sites built for demo and call conversion.",
    localProof: [
      "SaaS case study: 4X MRR growth with combined content and paid search",
      "Austin startup web builds from $12K with Core Web Vitals optimization",
      "Separate campaigns for tech vs. trades keywords reflecting Austin's dual market",
    ],
    services: ["seo", "google-ads", "web-design", "content-marketing", "growth-consulting", "analytics"],
    relatedCaseStudySlugs: ["saas-analytics-platform", "fintech-app-startup"],
  },
  {
    slug: "bogota",
    city: "Bogotá",
    state: "Cundinamarca",
    region: "Bogotá Metropolitan Area",
    country: "Colombia",
    description:
      "Bilingual digital marketing for Bogotá firms selling locally and into North America. Spanish SEO, US-targeted Google Ads, and export-ready websites with proper hreflang and market-specific messaging.",
    localProof: [
      "Bilingual EN/ES campaigns for fintech and BPO clients",
      "Lower CPC benchmarks vs. US metros for test-and-scale paid programs",
      "US market entry sites for Colombian B2B exporters",
    ],
    services: ["seo", "google-ads", "web-design", "content-marketing", "ppc-management"],
    relatedCaseStudySlugs: ["fintech-app-startup", "b2b-consulting-firm"],
  },
  {
    slug: "cedar-falls",
    city: "Cedar Falls",
    state: "Iowa",
    region: "Waterloo-Cedar Falls Metro",
    country: "United States",
    description:
      "KINEXIS helps Cedar Falls businesses grow through integrated SEO, paid media, and conversion systems, from downtown retailers to regional service contractors across the Waterloo-Cedar Falls metro.",
    localProof: [
      "Serving businesses across downtown Cedar Falls, College Hill, and the Cedar Valley",
      "Deep experience with Iowa home services, healthcare, and professional services markets",
      "Local case studies with verified traffic, lead, and revenue outcomes",
    ],
    services: ["seo", "web-design", "google-ads", "ppc-management", "funnels", "email-marketing"],
    relatedCaseStudySlugs: ["landscaping-company-growth"],
  },
  {
    slug: "cedar-rapids",
    city: "Cedar Rapids",
    state: "Iowa",
    region: "Eastern Iowa",
    country: "United States",
    description:
      "Growth marketing for Cedar Rapids companies that need predictable lead flow, from manufacturing and professional services to healthcare and home services across Linn County.",
    localProof: [
      "Landscaping Company case study: +340% organic traffic over 8 months for Cedar Rapids area contractors.",
      "Campaign experience across CR metro including Marion and Hiawatha",
      "Local SEO and Google Ads optimized for Eastern Iowa search behavior",
    ],
    services: ["seo", "google-ads", "web-design", "funnels", "content-marketing"],
    relatedCaseStudySlugs: ["landscaping-company-growth"],
  },
  {
    slug: "des-moines",
    city: "Des Moines",
    state: "Iowa",
    region: "Central Iowa",
    country: "United States",
    description:
      "Full-service digital marketing for Des Moines businesses scaling beyond word-of-mouth: SaaS startups, professional firms, and regional brands competing statewide.",
    localProof: [
      "Demand generation for Central Iowa B2B and professional services",
      "Paid media and SEO campaigns tuned for Des Moines metro search volume",
      "Enterprise-ready analytics and attribution for multi-location brands",
    ],
    services: ["seo", "ppc-management", "growth-consulting", "analytics", "web-design"],
  },
  {
    slug: "waterloo",
    city: "Waterloo",
    state: "Iowa",
    region: "Waterloo-Cedar Falls Metro",
    country: "United States",
    description:
      "Digital marketing systems for Waterloo businesses: local trades, healthcare providers, and manufacturers who need measurable ROI from every marketing dollar.",
    localProof: [
      "Cross-metro campaigns spanning Waterloo and Cedar Falls",
      "Local service ads and geo-fenced PPC for trades and contractors",
      "Conversion-optimized sites built for mobile-first Iowa buyers",
    ],
    services: ["seo", "google-ads", "web-design", "social-media", "funnels"],
  },
];

export function getLocationBySlug(slug: string): LocationEntry | undefined {
  return locations.find((l) => l.slug === slug);
}

export const locationServiceSlugs = [
  "digital-marketing-agency",
  "seo",
  "web-design",
  "google-ads",
  "ppc-management",
] as const;

export type LocationServiceSlug = (typeof locationServiceSlugs)[number];

export function getLocationServiceLabel(slug: LocationServiceSlug, city: string): string {
  const labels: Record<LocationServiceSlug, string> = {
    "digital-marketing-agency": `Digital Marketing Agency ${city}`,
    seo: `SEO ${city}`,
    "web-design": `Web Design ${city}`,
    "google-ads": `Google Ads ${city}`,
    "ppc-management": `PPC Management ${city}`,
  };
  return labels[slug];
}

export function getLocationHeroLines(
  slug: LocationServiceSlug,
  city: string
): { line1: string; line2: string } {
  const line1Map: Record<LocationServiceSlug, string> = {
    "digital-marketing-agency": "Digital marketing in",
    seo: "SEO services in",
    "web-design": "Web design in",
    "google-ads": "Google Ads in",
    "ppc-management": "PPC management in",
  };
  return { line1: line1Map[slug], line2: `${city}.` };
}
