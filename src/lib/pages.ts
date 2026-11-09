// Single source of truth for page metadata, sitemap and redirects.
// Set indexable:true only once a page has real copy (no placeholders).
export type PageMeta = {
  path: string;
  title: string;
  description: string;
  indexable: boolean;
  absolute?: boolean;
  /** Short breadcrumb label. Falls back to the title before any brand suffix. */
  crumb?: string;
  /** schema.org page type. Defaults to WebPage. */
  pageType?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "FAQPage";
  /** When set, the page also emits a Service node for this offering. */
  service?: string;
  priority?: number;
  changeFrequency?: "weekly" | "monthly" | "yearly";
  /** ISO date (YYYY-MM-DD) for sitemap lastmod. */
  updatedAt?: string;
};

/** Default sitemap lastmod when a page has no more specific content date. */
export const SITE_CONTENT_UPDATED = "2026-11-09";

export const PAGES = {
  home: {
    path: "/",
    title: "Website Plans From $97/mo for Local Businesses | Kinexis Digital",
    absolute: true,
    indexable: true,
    priority: 1,
    changeFrequency: "weekly",
    description: "Get a professional website from $97/mo, plus missed-call text-back and Google review requests. See your free homepage preview first. No card required.",
  },
  services: {
    path: "/services",
    title: "Web Design, SEO & Website Management",
    crumb: "Services",
    pageType: "CollectionPage",
    indexable: true,
    priority: 0.9,
    description: "Explore professional web design, SEO, website management, and free website audits for businesses across the United States.",
  },
  "web-design": {
    path: "/web-design",
    title: "Website Design Process — Free Homepage Preview",
    crumb: "Web Design",
    service: "Web design",
    indexable: true,
    priority: 0.9,
    description: "Share a design direction, logo, and photos. We prepare a free homepage preview in 2 business days—no card required—then revise until it fits before you choose a plan.",
  },
  "seo-services": {
    path: "/seo-services",
    title: "SEO Services for Business Websites",
    crumb: "SEO Services",
    service: "Search engine optimization",
    indexable: true,
    priority: 0.9,
    description: "Improve your website’s search visibility with technical SEO, page optimization, useful content, and straightforward reporting.",
  },
  audit: {
    path: "/audit",
    title: "Free Website Audit for SEO, Speed & UX",
    crumb: "Free Audit",
    service: "Website and SEO audit",
    indexable: true,
    priority: 0.9,
    description: "Get a free website audit covering SEO, speed, mobile usability, indexing, and conversion paths, with a clear list of recommended improvements.",
  },
  contact: {
    path: "/contact",
    title: "Discuss Your Website Project",
    crumb: "Contact",
    pageType: "ContactPage",
    indexable: true,
    priority: 0.8,
    description: "Contact Kinexis Digital to discuss a new website, redesign, SEO, or ongoing website management for your business. Get a clear next step.",
  },
  "website-management": {
    path: "/website-management",
    title: "Website Management & Maintenance",
    crumb: "Website Management",
    service: "Website management",
    indexable: true,
    priority: 0.8,
    description: "Keep your business website secure, current, and supported with managed hosting, backups, routine updates, small edits, and direct help.",
  },
  about: {
    path: "/about",
    title: "About Our Web Design Agency",
    crumb: "About",
    pageType: "AboutPage",
    indexable: true,
    priority: 0.7,
    description: "Learn how Kinexis Digital plans, designs, launches, and supports professional business websites across the United States.",
  },
  portfolio: {
    path: "/portfolio",
    title: "Web Design Portfolio & Client Sites",
    crumb: "Portfolio",
    pageType: "CollectionPage",
    indexable: true,
    priority: 0.8,
    description: "Explore live Kinexis client sites and design work for local service businesses to find the right direction for your website.",
  },
  industries: {
    path: "/industries",
    title: "Website Design for Service Industries",
    crumb: "Industries",
    pageType: "CollectionPage",
    indexable: true,
    priority: 0.9,
    description: "Explore website design ideas for plumbing, HVAC, electrical, roofing, landscaping, and other service industries across the United States.",
  },
  reviews: {
    path: "/reviews",
    title: "Client Reviews for Kinexis Digital",
    crumb: "Reviews",
    indexable: true,
    priority: 0.6,
    description: "Read client reviews for Kinexis Digital on this site, Trustpilot, and Facebook — and leave your own review in a few clicks.",
  },
  upgrades: {
    path: "/upgrades",
    title: "Website Add-Ons & Upgrades",
    crumb: "Upgrades",
    indexable: true,
    priority: 0.5,
    description: "Expand your website with extra pages and ongoing site care as your business grows. See available add-ons, pricing, and turnaround times.",
  },
  pricing: {
    path: "/pricing",
    title: "How Much Does a Small Business Website Cost?",
    crumb: "Pricing",
    service: "Web design",
    indexable: true,
    priority: 0.9,
    description: "Website plans from $97/mo, Lead System $197/mo, Plus $297/mo, or Own It for $1,497. Free homepage preview in 2 business days. No card required.",
  },
  pay: {
    path: "/pay",
    title: "Choose a Plan and Pay Securely",
    crumb: "Checkout",
    // Checkout is a utility step, not a search landing page. Keep authority on
    // the pricing page instead of asking Google to index near-duplicate intent.
    indexable: false,
    description: "Use PayPal to start the Kinexis plan you approved or pay an agreed invoice or deposit through the secure checkout page with confidence.",
  },
  blog: {
    path: "/blog",
    title: "Web Design & SEO Resources",
    crumb: "Blog",
    pageType: "CollectionPage",
    indexable: true,
    priority: 0.7,
    changeFrequency: "weekly",
    description: "Read practical guides on web design, SEO, website performance, online reviews, and digital marketing for growing businesses.",
  },
  faqs: {
    path: "/faqs",
    title: "Website Design FAQs",
    crumb: "FAQs",
    pageType: "FAQPage",
    indexable: true,
    priority: 0.6,
    description: "Get clear answers about pricing, billing, site ownership, launch timing, SEO, photos, writing, and the 60-day lead guarantee.",
  },
  update: {
    path: "/update",
    title: "Request a Website Update",
    crumb: "Site Updates",
    // Existing-client utility form, not a search landing page.
    indexable: false,
    priority: 0.3,
    changeFrequency: "yearly",
    description: "Tell Kinexis which page needs a small change and attach any helpful file. Requests are handled one at a time within your plan timing.",
  },
  "strategy-call": {
    path: "/strategy-call",
    title: "Book a Website Strategy Call",
    crumb: "Strategy Call",
    indexable: true,
    priority: 0.7,
    description: "Choose a time to discuss your current website, the services you want to promote, and whether one of the four Kinexis plans fits.",
  },
  terms: {
    path: "/terms",
    title: "Kinexis Plan and Billing Terms",
    crumb: "Terms",
    indexable: false,
    priority: 0.2,
    changeFrequency: "yearly",
    description: "Read the current Kinexis website plan, billing, cancellation, ownership, texting, and 60-day lead guarantee terms before you begin.",
  },
  privacy: {
    path: "/privacy",
    title: "How Kinexis Handles Your Information",
    crumb: "Privacy",
    indexable: false,
    priority: 0.2,
    changeFrequency: "yearly",
    description: "Read what Kinexis collects from website forms, calls, email, server logs, and analytics, plus how that information is used and shared.",
  },
} satisfies Record<string, PageMeta>;
export type PageKey = keyof typeof PAGES;
