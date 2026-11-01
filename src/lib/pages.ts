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
    title: "Professional Web Design for Businesses | Kinexis Digital",
    absolute: true,
    indexable: true,
    priority: 1,
    changeFrequency: "weekly",
    description: "Kinexis Digital builds fast, professional websites for businesses across the US. See a free homepage preview before choosing a website plan.",
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
    title: "Professional Website Design for Businesses",
    crumb: "Web Design",
    service: "Web design",
    indexable: true,
    priority: 0.9,
    description: "Get a fast, professional website built around your brand, services, and goals. Review your homepage before choosing a plan or paying.",
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
    title: "Web Design Portfolio & Website Templates",
    crumb: "Portfolio",
    pageType: "CollectionPage",
    indexable: true,
    priority: 0.8,
    description: "Explore professional website templates and live Kinexis client sites to find the right design direction for your business website.",
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
    description: "Read recommendations that clients have posted about Kinexis Digital on Facebook. Review text is shown in the client’s own words.",
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
    title: "Website Design Plans & Pricing",
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
    indexable: true,
    priority: 0.2,
    changeFrequency: "yearly",
    description: "Read the current Kinexis website plan, billing, cancellation, ownership, texting, and 60-day lead guarantee terms before you begin.",
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
} satisfies Record<string, PageMeta>;
export type PageKey = keyof typeof PAGES;
