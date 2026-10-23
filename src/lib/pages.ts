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
};

export const PAGES = {
  home: {
    path: "/",
    title: "Trade Websites With Practical Follow-Up | Kinexis Digital",
    absolute: true,
    indexable: true,
    priority: 1,
    changeFrequency: "weekly",
    description: "Websites, SEO, missed-call texts, and review requests for service businesses across the US. See a free homepage before choosing a plan.",
  },
  services: {
    path: "/services",
    title: "Websites, SEO, and Site Care",
    crumb: "Services",
    pageType: "CollectionPage",
    indexable: true,
    priority: 0.9,
    description: "See how Kinexis helps US service businesses with website design, SEO, ongoing site care, and a free review of their current site.",
  },
  "web-design": {
    path: "/web-design",
    title: "Trade Website Design Across the US",
    crumb: "Web Design",
    service: "Web design",
    indexable: true,
    priority: 0.9,
    description: "Websites for plumbers, HVAC companies, roofers, and other trades. Review a homepage built for your business before you pay.",
  },
  "seo-services": {
    path: "/seo-services",
    title: "SEO for Service Businesses Nationwide",
    crumb: "SEO Services",
    service: "Search engine optimization",
    indexable: true,
    priority: 0.9,
    description: "Technical cleanup, page improvements, useful content, and clear reporting for US service businesses that want better search visibility.",
  },
  audit: {
    path: "/audit",
    title: "Get a Clear Website Fix List",
    crumb: "Free Audit",
    service: "Website and SEO audit",
    indexable: true,
    priority: 0.9,
    description: "Send us your website for a free review of speed, mobile use, indexing, and contact paths. We will explain which fixes should come first.",
  },
  contact: {
    path: "/contact",
    title: "Talk With Kinexis About Your Website",
    crumb: "Contact",
    pageType: "ContactPage",
    indexable: true,
    priority: 0.8,
    description: "Tell Kinexis about your service business and website goals. Send a message, call, or schedule time to discuss the four plans.",
  },
  "website-management": {
    path: "/website-management",
    title: "Website Upkeep for US Businesses",
    crumb: "Website Management",
    service: "Website management",
    indexable: true,
    priority: 0.8,
    description: "Keep your business site current without managing it yourself. Kinexis handles hosting, small changes, backups, security, and support.",
  },
  about: {
    path: "/about",
    title: "How Kinexis Works With Service Businesses",
    crumb: "About",
    pageType: "AboutPage",
    indexable: true,
    priority: 0.7,
    description: "Learn who Kinexis works with, what to expect, and how a trade website moves from a free homepage preview to a confirmed launch.",
  },
  portfolio: {
    path: "/portfolio",
    title: "Website Concepts and Live Client Sites",
    crumb: "Portfolio",
    pageType: "CollectionPage",
    indexable: true,
    priority: 0.8,
    description: "Explore clearly labeled concept designs for US trades, then browse a separate collection of live websites built for Kinexis clients.",
  },
  industries: {
    path: "/industries",
    title: "Website Ideas for Your Trade",
    crumb: "Industries",
    pageType: "CollectionPage",
    indexable: true,
    priority: 0.9,
    description: "See how a website can fit plumbing, HVAC, electrical, roofing, landscaping, and other service trades across the United States.",
  },
  reviews: {
    path: "/reviews",
    title: "What Kinexis Clients Have Shared",
    crumb: "Reviews",
    indexable: true,
    priority: 0.6,
    description: "Read recommendations that clients have posted about Kinexis Digital on Facebook. Review text is shown in the client’s own words.",
  },
  upgrades: {
    path: "/upgrades",
    title: "Optional Website Add-Ons",
    crumb: "Upgrades",
    indexable: true,
    priority: 0.5,
    description: "Add an extra page, ongoing site care, or missed-call text-back when your business needs it. See the written pricing and timing.",
  },
  pricing: {
    path: "/pricing",
    title: "Kinexis Website Plans and Pricing",
    crumb: "Pricing",
    service: "Web design",
    indexable: true,
    priority: 0.9,
    description: "Compare Website at $97/mo, Lead System at $197/mo, Plus at $297/mo, and Own It at $1,497. Every plan starts with a free preview.",
  },
  pay: {
    path: "/pay",
    title: "Choose a Plan and Pay Securely",
    crumb: "Checkout",
    // Checkout is a utility step, not a search landing page. Keep authority on
    // the pricing page instead of asking Google to index near-duplicate intent.
    indexable: false,
    description: "Use PayPal to start the Kinexis plan you approved or pay an agreed invoice or deposit through the secure checkout page.",
  },
  blog: {
    path: "/blog",
    title: "Practical Website and SEO Notes",
    crumb: "Blog",
    pageType: "CollectionPage",
    indexable: true,
    priority: 0.7,
    changeFrequency: "weekly",
    description: "Read practical guidance on websites, search visibility, reviews, and marketing budgets for service businesses across the United States.",
  },
  faqs: {
    path: "/faqs",
    title: "Questions About Kinexis Website Plans",
    crumb: "FAQs",
    pageType: "FAQPage",
    indexable: true,
    priority: 0.6,
    description: "Get clear answers about pricing, billing, site ownership, launch timing, SEO, photos, writing, and the 60-day lead guarantee.",
  },
  update: {
    path: "/update",
    title: "Send Us a Website Change",
    crumb: "Site Updates",
    indexable: true,
    priority: 0.3,
    changeFrequency: "yearly",
    description: "Tell Kinexis which page needs a small change and attach any helpful file. Requests are handled one at a time within your plan timing.",
  },
  "strategy-call": {
    path: "/strategy-call",
    title: "Talk Through Your Website Plans",
    crumb: "Strategy Call",
    indexable: true,
    priority: 0.7,
    description: "Choose a time to discuss your current website, the services you want to promote, and whether one of the four Kinexis plans fits.",
  },
  terms: {
    path: "/terms",
    title: "Kinexis Plan and Billing Terms",
    crumb: "Terms",
    indexable: true,
    priority: 0.2,
    changeFrequency: "yearly",
    description: "Read the current Kinexis website plan, billing, cancellation, ownership, texting, and 60-day lead guarantee terms.",
  },
  privacy: {
    path: "/privacy",
    title: "How Kinexis Handles Your Information",
    crumb: "Privacy",
    indexable: true,
    priority: 0.2,
    changeFrequency: "yearly",
    description: "Read what Kinexis collects from website forms, calls, email, server logs, and analytics, plus how that information is used and shared.",
  },
  "client-login": {
    path: "/client-login",
    title: "Open the Kinexis Client Portal",
    indexable: false,
    description: "Active Kinexis clients can open the project portal here. Contact us if your emailed access link has not arrived or no longer works.",
  },
} satisfies Record<string, PageMeta>;
export type PageKey = keyof typeof PAGES;
