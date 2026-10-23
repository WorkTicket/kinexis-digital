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
    title: "Websites and SEO for US Service Businesses | Kinexis Digital",
    absolute: true,
    indexable: true,
    priority: 1,
    changeFrequency: "weekly",
    description: "Website design, SEO, and website management for service businesses across the United States. Kinexis Digital turns searches into calls.",
  },
  services: {
    path: "/services",
    title: "Website and SEO Services",
    crumb: "Services",
    pageType: "CollectionPage",
    indexable: true,
    priority: 0.9,
    description: "Website design, SEO, website management, and a free audit for service businesses across the United States. See what Kinexis Digital does.",
  },
  "web-design": {
    path: "/web-design",
    title: "Website Design for US Service Businesses",
    crumb: "Web Design",
    service: "Web design",
    indexable: true,
    priority: 0.9,
    description: "Website design for plumbers, HVAC companies, roofers, and other service businesses across the United States. Free homepage preview before you pay.",
  },
  "seo-services": {
    path: "/seo-services",
    title: "Nationwide SEO Services",
    crumb: "SEO Services",
    service: "Search engine optimization",
    indexable: true,
    priority: 0.9,
    description: "Technical SEO, on-page optimization, content, and reporting for businesses across the United States. Request a free SEO audit from Kinexis Digital.",
  },
  audit: {
    path: "/audit",
    title: "Free Website and SEO Audit",
    crumb: "Free Audit",
    service: "Website and SEO audit",
    indexable: true,
    priority: 0.9,
    description: "Free website and SEO audit for US businesses. We review speed, indexing, on-page SEO, and conversion, then tell you what to fix first.",
  },
  contact: {
    path: "/contact",
    title: "Contact Our Digital Marketing Agency",
    crumb: "Contact",
    pageType: "ContactPage",
    indexable: true,
    priority: 0.8,
    description: "Talk with Kinexis Digital, a digital marketing agency serving businesses across the United States. Call, email, or book a strategy call.",
  },
  "website-management": {
    path: "/website-management",
    title: "Website Management for US Businesses",
    crumb: "Website Management",
    service: "Website management",
    indexable: true,
    priority: 0.8,
    description: "Hosting, updates, security, and support for business websites across the United States. Kinexis Digital keeps your site fast, safe, and current.",
  },
  about: {
    path: "/about",
    title: "About Our Digital Marketing Agency",
    crumb: "About",
    pageType: "AboutPage",
    indexable: true,
    priority: 0.7,
    description: "Kinexis Digital is a US digital marketing agency for local service businesses. See who we build for and how a site goes from free preview to launch.",
  },
  portfolio: {
    path: "/portfolio",
    title: "Web Design Portfolio for US Trades",
    crumb: "Portfolio",
    pageType: "CollectionPage",
    indexable: true,
    priority: 0.8,
    description: "Websites Kinexis Digital has designed for pool care, HVAC, plumbing, roofing, and other service businesses across the United States.",
  },
  industries: {
    path: "/industries",
    title: "Websites for US Service Businesses",
    crumb: "Industries",
    pageType: "CollectionPage",
    indexable: true,
    priority: 0.9,
    description: "Website design for plumbing, HVAC, electrical, roofing, landscaping, and other trades. Built for service businesses across the United States.",
  },
  reviews: {
    path: "/reviews",
    title: "Reviews from US Service Businesses",
    crumb: "Reviews",
    indexable: true,
    priority: 0.6,
    description: "Recommendations clients across the United States have left for Kinexis Digital, a nationwide digital marketing and web design agency.",
  },
  upgrades: {
    path: "/upgrades",
    title: "Website Upgrades and Add-Ons",
    crumb: "Upgrades",
    indexable: true,
    priority: 0.5,
    description: "Optional website upgrades from Kinexis Digital, including extra pages, site care, and missed-call text-back for businesses across the US.",
  },
  pricing: {
    path: "/pricing",
    title: "Website and Marketing Pricing",
    crumb: "Pricing",
    service: "Web design",
    indexable: true,
    priority: 0.9,
    description: "Clear pricing for US service businesses: Website $97/mo, Lead System $197/mo, Plus $297/mo, or Own It for $1,497. Free homepage preview first.",
  },
  pay: {
    path: "/pay",
    title: "Plans and Secure Checkout",
    crumb: "Checkout",
    indexable: true,
    priority: 0.4,
    description: "Choose a Kinexis Digital website plan and check out securely with PayPal. Already have an invoice or deposit? Pay your agreed amount here.",
  },
  blog: {
    path: "/blog",
    title: "Digital Marketing Blog",
    crumb: "Blog",
    pageType: "CollectionPage",
    indexable: true,
    priority: 0.7,
    changeFrequency: "weekly",
    description: "SEO, web design, and digital marketing guides for service businesses across the United States. Practical notes from Kinexis Digital.",
  },
  faqs: {
    path: "/faqs",
    title: "Digital Marketing FAQs",
    crumb: "FAQs",
    pageType: "FAQPage",
    indexable: true,
    priority: 0.6,
    description: "Answers about Kinexis Digital plans, website ownership, the 60-day lead guarantee, SEO, and working with a US digital marketing agency.",
  },
  update: {
    path: "/update",
    title: "Request a Website Update",
    crumb: "Site Updates",
    indexable: true,
    priority: 0.3,
    changeFrequency: "yearly",
    description: "Ask Kinexis Digital to update a page on your website. Small edits are handled one at a time, within the time included in your plan.",
  },
  "strategy-call": {
    path: "/strategy-call",
    title: "Schedule a Strategy Call",
    crumb: "Strategy Call",
    indexable: true,
    priority: 0.7,
    description: "Book a strategy call with Kinexis Digital. We review your business, your goals, and which plan fits companies across the United States.",
  },
  terms: {
    path: "/terms",
    title: "Website Plan Terms and Conditions",
    crumb: "Terms",
    indexable: true,
    priority: 0.2,
    changeFrequency: "yearly",
    description: "Plan and billing terms for Kinexis Digital websites, including the 60-day lead guarantee and the Own It purchase option.",
  },
  privacy: {
    path: "/privacy",
    title: "Privacy Policy for Website Visitors",
    crumb: "Privacy",
    indexable: true,
    priority: 0.2,
    changeFrequency: "yearly",
    description: "How Kinexis Digital collects, uses, and shares information from forms, calls, and email, and how to ask us about an inquiry.",
  },
  "client-login": {
    path: "/client-login",
    title: "Client Portal Login for Active Clients",
    indexable: false,
    description: "Portal login for active Kinexis Digital clients. We email access when a website project is underway, and you can contact us if the link is missing.",
  },
} satisfies Record<string, PageMeta>;
export type PageKey = keyof typeof PAGES;
