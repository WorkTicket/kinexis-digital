export type IndustryCategoryId =
  | "home-services"
  | "professional-services"
  | "hospitality"
  | "healthcare"
  | "manufacturing"
  | "financial-services"
  | "technology"
  | "ecommerce";

export type IndustryEntry = {
  slug: string;
  categoryId: IndustryCategoryId;
  label: string;
  shortDescription: string;
  primaryServices: string[];
  relatedCaseStudySlugs?: string[];
};

export type IndustryCategory = {
  id: IndustryCategoryId;
  label: string;
  description: string;
  industries: IndustryEntry[];
};

export const industryCategories: IndustryCategory[] = [
  {
    id: "technology",
    label: "Technology",
    description: "Pipeline and product-led acquisition for software teams that measure growth in demos, trials, and revenue.",
    industries: [
      { slug: "saas", categoryId: "technology", label: "SaaS", shortDescription: "Trial-to-paid paths, content that earns demos, and analytics that show what closes.", primaryServices: ["content-marketing", "funnels", "ppc-management", "analytics"] },
      { slug: "startups", categoryId: "technology", label: "Startups", shortDescription: "Sharp positioning, fast experiments, and growth that respects burn rate.", primaryServices: ["growth-consulting", "branding", "ppc-management", "funnels"] },
      { slug: "ai-companies", categoryId: "technology", label: "AI Companies", shortDescription: "Category-defining content, demo funnels, and enterprise demand that holds up in long sales cycles.", primaryServices: ["content-marketing", "web-design", "seo", "growth-consulting"] },
      { slug: "software-companies", categoryId: "technology", label: "Software Companies", shortDescription: "Product marketing, comparison SEO, and sales content that shortens the evaluate-and-buy path.", primaryServices: ["seo", "content-marketing", "ppc-management", "analytics"] },
      { slug: "fintech", categoryId: "technology", label: "Fintech", shortDescription: "Compliant campaigns, trust signals that convert, and onboarding flows built for funded accounts.", primaryServices: ["funnels", "ppc-management", "content-marketing", "analytics"] },
      { slug: "cybersecurity", categoryId: "technology", label: "Cybersecurity", shortDescription: "Technical authority, ABM, and enterprise pipeline for buyers who research before they talk.", primaryServices: ["content-marketing", "seo", "growth-consulting", "email-marketing"] },
    ],
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    description: "Shopping campaigns, retention systems, and conversion work judged by ROAS, AOV, and LTV.",
    industries: [
      { slug: "shopify-brands", categoryId: "ecommerce", label: "Shopify Brands", shortDescription: "Shopping ads, product SEO, and email flows built to lift AOV and LTV.", primaryServices: ["ppc-management", "meta-ads", "email-marketing", "funnels"] },
      { slug: "dtc-brands", categoryId: "ecommerce", label: "DTC Brands", shortDescription: "Paid social, UGC creative, and retention automation that turns first buys into repeats.", primaryServices: ["meta-ads", "video-marketing", "email-marketing", "funnels"], relatedCaseStudySlugs: ["ecommerce-store-growth"] },
      { slug: "online-retailers", categoryId: "ecommerce", label: "Online Retailers", shortDescription: "Catalog SEO, marketplace strategy, and margin-aware ROAS, not vanity traffic.", primaryServices: ["seo", "ppc-management", "analytics", "funnels"] },
      { slug: "amazon-sellers", categoryId: "ecommerce", label: "Amazon Sellers", shortDescription: "Listing performance, off-Amazon traffic, and brand demand that lives beyond the marketplace.", primaryServices: ["ppc-management", "seo", "email-marketing", "analytics"] },
      { slug: "subscription-boxes", categoryId: "ecommerce", label: "Subscription Boxes", shortDescription: "Trial acquisition, churn reduction, and retention email that keeps subscribers paying.", primaryServices: ["meta-ads", "email-marketing", "funnels", "content-marketing"] },
      { slug: "b2b-ecommerce", categoryId: "ecommerce", label: "B2B E-Commerce", shortDescription: "Account-based acquisition, catalog SEO, and quote-to-order paths for commercial buyers.", primaryServices: ["seo", "ppc-management", "email-marketing", "analytics"] },
    ],
  },
  {
    id: "financial-services",
    label: "Financial Services",
    description: "Trust-first positioning, compliant funnels, and high-intent lead capture for regulated financial brands.",
    industries: [
      { slug: "financial-advisors", categoryId: "financial-services", label: "Financial Advisors", shortDescription: "Authority content, seminar funnels, and nurture that fills calendars with qualified meetings.", primaryServices: ["content-marketing", "seo", "email-marketing", "funnels"] },
      { slug: "insurance", categoryId: "financial-services", label: "Insurance", shortDescription: "Quote funnels, comparison-intent SEO, and retargeting that drives binds and renewals.", primaryServices: ["ppc-management", "seo", "funnels", "email-marketing"] },
      { slug: "mortgage-lenders", categoryId: "financial-services", label: "Mortgage Lenders", shortDescription: "Rate-shopping intent capture, compliant funnels, and nurture for referral partners.", primaryServices: ["ppc-management", "seo", "funnels", "email-marketing"] },
      { slug: "banks", categoryId: "financial-services", label: "Banks", shortDescription: "Product awareness, branch-local SEO, and cross-sell campaigns that move deposits and applications.", primaryServices: ["seo", "content-marketing", "email-marketing", "analytics"] },
      { slug: "wealth-management", categoryId: "financial-services", label: "Wealth Management", shortDescription: "High-net-worth nurture, seminar funnels, and authority content that earns consultations.", primaryServices: ["content-marketing", "seo", "email-marketing", "funnels"] },
      { slug: "credit-unions", categoryId: "financial-services", label: "Credit Unions", shortDescription: "Member acquisition, community SEO, and product cross-sell that grows share of wallet.", primaryServices: ["seo", "social-media", "email-marketing", "ppc-management"] },
    ],
  },
  {
    id: "professional-services",
    label: "Professional Services",
    description: "Authority content, trust signals, and demand gen for firms that win high-value clients on reputation.",
    industries: [
      { slug: "law-firms", categoryId: "professional-services", label: "Law Firms", shortDescription: "Practice-area SEO, compliant content, and intake pages built to convert consultations.", primaryServices: ["seo", "content-marketing", "ppc-management", "funnels"] },
      { slug: "dentists", categoryId: "professional-services", label: "Dentists", shortDescription: "New patient funnels, local SEO, and reputation work that fills the chair.", primaryServices: ["seo", "ppc-management", "web-design", "funnels"] },
      { slug: "medical-practices", categoryId: "professional-services", label: "Medical Practices", shortDescription: "HIPAA-aware marketing, provider SEO, and booking paths that turn searches into appointments.", primaryServices: ["seo", "content-marketing", "web-design", "analytics"] },
      { slug: "accountants", categoryId: "professional-services", label: "Accountants", shortDescription: "Seasonal tax campaigns, thought leadership, and nurture that turns referrals into retainers.", primaryServices: ["seo", "email-marketing", "content-marketing", "ppc-management"] },
      { slug: "consultants", categoryId: "professional-services", label: "Consultants", shortDescription: "Clear positioning, authority content, and demand gen built for pipeline, not vanity reach.", primaryServices: ["branding", "content-marketing", "seo", "growth-consulting"] },
      { slug: "real-estate", categoryId: "professional-services", label: "Real Estate", shortDescription: "Listing visibility, agent branding, and nurture for buyers and sellers ready to move.", primaryServices: ["seo", "social-media", "web-design", "ppc-management"] },
    ],
  },
  {
    id: "healthcare",
    label: "Healthcare",
    description: "Compliant patient acquisition, trust-building content, and growth measured in booked appointments.",
    industries: [
      { slug: "medical", categoryId: "healthcare", label: "Medical", shortDescription: "Provider SEO, patient education, and intake paths that convert research into appointments.", primaryServices: ["seo", "content-marketing", "web-design", "analytics"] },
      { slug: "dental", categoryId: "healthcare", label: "Dental", shortDescription: "New patient funnels, local visibility, and treatment pages for high-intent searches.", primaryServices: ["seo", "ppc-management", "funnels", "email-marketing"] },
      { slug: "wellness", categoryId: "healthcare", label: "Wellness", shortDescription: "Membership funnels, community content, and email systems that keep members coming back.", primaryServices: ["social-media", "email-marketing", "web-design", "content-marketing"] },
      { slug: "chiropractors", categoryId: "healthcare", label: "Chiropractors", shortDescription: "New patient acquisition, local SEO, and treatment pages that turn searches into bookings.", primaryServices: ["seo", "ppc-management", "web-design", "funnels"] },
      { slug: "physical-therapy", categoryId: "healthcare", label: "Physical Therapy", shortDescription: "Referral growth, provider SEO, and insurance-aware intake that completes the booking.", primaryServices: ["seo", "content-marketing", "ppc-management", "analytics"] },
      { slug: "pharmacies", categoryId: "healthcare", label: "Pharmacies", shortDescription: "Local visibility, prescription transfer campaigns, and community trust that drives foot traffic.", primaryServices: ["seo", "ppc-management", "email-marketing", "social-media"] },
    ],
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    description: "B2B demand gen, technical content, and ABM for industrial buyers with long sales cycles.",
    industries: [
      { slug: "industrial", categoryId: "manufacturing", label: "Industrial", shortDescription: "Technical SEO, spec-sheet content, and nurture sequences built for long buying cycles.", primaryServices: ["seo", "content-marketing", "ppc-management", "analytics"] },
      { slug: "b2b-manufacturing", categoryId: "manufacturing", label: "B2B Manufacturing", shortDescription: "ABM campaigns, distributor SEO, and lead scoring aligned with how sales actually closes.", primaryServices: ["seo", "growth-consulting", "email-marketing", "analytics"] },
      { slug: "automotive", categoryId: "manufacturing", label: "Automotive", shortDescription: "OEM and aftermarket demand gen, technical content, and dealer network SEO.", primaryServices: ["seo", "content-marketing", "ppc-management", "analytics"] },
      { slug: "aerospace", categoryId: "manufacturing", label: "Aerospace", shortDescription: "Compliance-aware content, long-cycle ABM, and technical authority for enterprise buyers.", primaryServices: ["content-marketing", "seo", "growth-consulting", "email-marketing"] },
      { slug: "food-production", categoryId: "manufacturing", label: "Food Production", shortDescription: "Buyer education, distributor SEO, and trade show follow-up that turns meetings into orders.", primaryServices: ["content-marketing", "seo", "email-marketing", "analytics"] },
      { slug: "packaging", categoryId: "manufacturing", label: "Packaging", shortDescription: "Spec-driven content, comparison SEO, and lead gen aligned with how packaging buyers decide.", primaryServices: ["seo", "content-marketing", "ppc-management", "growth-consulting"] },
    ],
  },
  {
    id: "hospitality",
    label: "Hospitality",
    description: "Direct bookings, seasonal campaigns, and brand work that fills rooms and tables without OTA dependency.",
    industries: [
      { slug: "hotels", categoryId: "hospitality", label: "Hotels", shortDescription: "Direct booking funnels, seasonal PPC, and visual storytelling that earns the click away from OTAs.", primaryServices: ["web-design", "ppc-management", "seo", "social-media"] },
      { slug: "resorts", categoryId: "hospitality", label: "Resorts", shortDescription: "Luxury positioning, multi-channel campaigns, and experience content that sells packages.", primaryServices: ["branding", "video-marketing", "ppc-management", "web-design"] },
      { slug: "restaurants", categoryId: "hospitality", label: "Restaurants", shortDescription: "Local discovery, reservation flows, and social content that fills tables on peak nights.", primaryServices: ["social-media", "seo", "meta-ads", "web-design"] },
      { slug: "bars-nightlife", categoryId: "hospitality", label: "Bars & Nightlife", shortDescription: "Event promotion, local discovery, and social campaigns that drive covers and foot traffic.", primaryServices: ["social-media", "meta-ads", "seo", "video-marketing"] },
      { slug: "cafes", categoryId: "hospitality", label: "Cafes", shortDescription: "Neighborhood visibility, loyalty programs, and Instagram discovery that turns walks into visits.", primaryServices: ["social-media", "seo", "email-marketing", "web-design"] },
      { slug: "event-venues", categoryId: "hospitality", label: "Event Venues", shortDescription: "Inquiry funnels, visual portfolios, and seasonal campaigns that book tours and contracts.", primaryServices: ["web-design", "seo", "ppc-management", "social-media"] },
    ],
  },
  {
    id: "home-services",
    label: "Home Services",
    description: "Local leads, service-area SEO, and paid campaigns for trades that live on calls and booked jobs.",
    industries: [
      { slug: "hvac", categoryId: "home-services", label: "HVAC", shortDescription: "Seasonal demand capture, emergency-intent SEO, and local service ads judged by booked jobs.", primaryServices: ["seo", "ppc-management", "web-design", "funnels"] },
      { slug: "roofing", categoryId: "home-services", label: "Roofing", shortDescription: "Storm-season campaigns, geo-targeted landing pages, and review-driven local visibility.", primaryServices: ["seo", "ppc-management", "funnels"] },
      { slug: "landscaping", categoryId: "home-services", label: "Landscaping", shortDescription: "Visual portfolio sites, seasonal PPC, and local pack work that wins the estimate call.", primaryServices: ["seo", "web-design", "social-media", "ppc-management"], relatedCaseStudySlugs: ["landscaping-company-growth"] },
      { slug: "plumbing", categoryId: "home-services", label: "Plumbing", shortDescription: "Emergency-intent Google Ads, 24/7 call tracking, and service-area SEO for high-intent searches.", primaryServices: ["ppc-management", "seo", "funnels", "analytics"], relatedCaseStudySlugs: ["plumbing-company-growth"] },
      { slug: "electrical", categoryId: "home-services", label: "Electrical", shortDescription: "Licensed-trades positioning, local SEO, and quote flows that convert calls into booked work.", primaryServices: ["seo", "web-design", "ppc-management", "funnels"] },
      { slug: "pest-control", categoryId: "home-services", label: "Pest Control", shortDescription: "Seasonal demand capture, local pack dominance, and service-area campaigns built for booked treatments.", primaryServices: ["ppc-management", "seo", "funnels", "analytics"] },
    ],
  },
];

export const allIndustries: IndustryEntry[] = industryCategories.flatMap((c) => c.industries);

export function getIndustryBySlug(slug: string): IndustryEntry | undefined {
  return allIndustries.find((i) => i.slug === slug);
}

export function getCategoryById(id: IndustryCategoryId): IndustryCategory | undefined {
  return industryCategories.find((c) => c.id === id);
}

/** SERP meta descriptions per category (120-155 chars); separate from hero subtitle copy. */
export const industryCategoryMetaDescriptions: Record<IndustryCategoryId, { en: string }> = {
  technology: {
    en: "Demand gen and product-led acquisition for SaaS, fintech, and software companies. Built for trial conversion, demos, and pipeline growth.",
  },
  ecommerce: {
    en: "Shopping campaigns, retention email, and conversion work for Shopify, DTC, and retail brands. Judged by ROAS and LTV, not vanity traffic.",
  },
  "financial-services": {
    en: "Trust-first positioning, compliant funnels, and high-intent lead capture for advisors, insurance, mortgage, and banking brands.",
  },
  "professional-services": {
    en: "Authority content, trust signals, and demand gen for law firms, dentists, consultants, and high-value client acquisition.",
  },
  healthcare: {
    en: "Compliant patient acquisition, trust-building content, and measurable growth for medical, dental, wellness, and care providers.",
  },
  manufacturing: {
    en: "B2B demand gen, technical content, and account-based marketing for industrial, automotive, and packaging buyers with long sales cycles.",
  },
  hospitality: {
    en: "Direct booking optimization, seasonal campaigns, and brand work for hotels, restaurants, and venues. Fill rooms and tables without over-relying on OTAs.",
  },
  "home-services": {
    en: "Local lead gen, service-area SEO, and paid campaigns for HVAC, roofing, plumbing, and trades. Built for emergency intent and map pack wins.",
  },
};

export function getIndustriesByCategory(categoryId: IndustryCategoryId): IndustryEntry[] {
  return allIndustries.filter((i) => i.categoryId === categoryId);
}
