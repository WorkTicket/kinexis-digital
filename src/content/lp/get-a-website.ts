import type { LandingPageEntry } from "@/content/registry/landing-pages";
import { LANDING_HEADLINES, LANDING_MARKETS } from "@/lib/landing-message-match";

const A1_STILL = "/assets/images/lp/a1-desktop.webp";
const A1_CASE_STILL = "/assets/images/case-studies/landscaping-company-growth.webp";
const A1_MOBILE_STILL = "/assets/images/lp/a1-mobile.webp";
const PLUMBING_STILL = "/assets/images/case-studies/plumbing-company-growth.webp";

const CTA = "Get My Free Website Plan";

export const getAWebsite: LandingPageEntry = {
  slug: "get-a-website",
  serviceHref: "/services/web-design",
  serviceLabel: "Web design & development",
  metaTitle: "Custom Websites for Contractors",
  metaDescription:
    "Custom websites built for contractors and home-service businesses. Mobile-first, speed optimized, SEO ready, and designed around calls and quote requests.",
  badge: "Websites for contractors & home services",
  headline: LANDING_HEADLINES.build_business.join(" "),
  headlineAccent: "",
  headlineLines: [...LANDING_HEADLINES.build_business],
  marketLine: LANDING_MARKETS.default,
  subheadline:
    "Custom websites designed to turn more visitors into calls, quote requests, and booked work.",
  heroCtaLabel: CTA,
  heroFinePrint: "No obligation. Built around your business.",
  heroMeta: ["Custom built", "Mobile first", "SEO ready", "You own it"],
  heroStill: {
    src: A1_STILL,
    mobileSrc: A1_MOBILE_STILL,
    alt: "A1 Property Services website on a phone, built by KINEXIS",
  },
  formTitle: "Let's plan the website your business actually needs",
  formSubtitle:
    "Tell us a little about your business. We'll use it to recommend the right website structure, conversion path, and next steps.",
  submitLabel: CTA,
  continueLabel: "Continue",
  formCtaHint: "No obligation. Built around your business.",
  formFootnote:
    "Your information is used to respond to your website request.",
  formAsideTitle: "What the plan covers",
  formAsideSubtitle:
    "If you already have a website, we'll also review the areas most likely to affect mobile usability, speed, search, and lead capture.",
  formStep1Title: "First, tell us about the business",
  formStep2Title: "Where should we send your plan?",
  noWebsiteLabel: "I don't have a website yet",
  investmentLabel: "Website investment",
  timelineLabel: "Timeline",
  privacyMicrocopy:
    "Your information is used to respond to your website request.",
  successTitle: "We've got it.",
  successCopy:
    "Your request has been received. We'll review the information you sent and follow up using the contact details you provided.",
  planHasSiteTitle: "If you already have a website",
  planHasSiteItems: [
    "Mobile experience",
    "Speed and performance",
    "Call and quote path",
    "Search and SEO foundation",
    "Lead capture and tracking",
  ],
  planNoSiteTitle: "If you don't have a website yet",
  planNoSiteItems: [
    "Recommended site structure",
    "Recommended service pages",
    "Primary conversion path",
    "Mobile strategy",
    "Search and SEO foundation",
    "Build recommendations",
  ],
  formSteps: [
    {
      title: "We learn the business",
      detail: "What you sell, who you serve, and what customers should do next.",
    },
    {
      title: "You get a website plan",
      detail: "Structure, conversion path, and the right next step for your situation.",
    },
    {
      title: "A clear recommendation",
      detail: "Scope and price before you commit to a build.",
    },
  ],
  formTrust: ["No obligation", "Works with or without a current site", "You own the website"],
  websiteRequired: false,
  hideWebsite: false,
  essentialsOnly: false,
  twoStepQualify: true,
  phoneRequired: true,
  phoneOptional: false,
  businessNameRequired: true,
  conversionKind: "audit",
  auditLayout: true,
  hideServiceLink: true,
  budgetOptions: [
    { value: "1500-3000", label: "$1,500–$3,000" },
    { value: "3000-5000", label: "$3,000–$5,000" },
    { value: "5000-plus", label: "$5,000+" },
    { value: "not-sure", label: "Not sure yet" },
  ],
  timelineOptions: [
    { value: "asap", label: "ASAP" },
    { value: "30-days", label: "Within 30 days" },
    { value: "1-3-months", label: "1–3 months" },
    { value: "researching", label: "Just researching" },
  ],
  painEyebrow: "Where jobs leak",
  painTitle: "A good-looking website can still lose the job",
  painSubtitle:
    "A website has to do more than look professional. It needs to make the next step obvious.",
  painItems: [
    {
      title: "Mobile",
      body: "The quote action disappears or becomes difficult to use.",
    },
    {
      title: "Calls",
      body: "The phone number gets buried when the customer is ready to call.",
    },
    {
      title: "Speed",
      body: "The visitor waits too long before seeing the offer.",
    },
    {
      title: "Search",
      body: "Weak page structure makes services and locations harder for search engines to understand.",
    },
  ],
  samplesTitle: "See what a better website can do",
  samplesIntro:
    "These are live KINEXIS sites. Each one made the next step easier to find on a phone.",
  samples: [
    {
      image: A1_CASE_STILL,
      imageAlt:
        "A1 Property Services website after the mobile quote-path rebuild",
      client: "A1 Property Services",
      kind: "Landscaping",
      metric: "1.8% → 3.9%",
      label: "conversion rate",
      industry: "Landscaping",
      summary:
        "The quote action used to disappear on mobile. The redesign created a persistent mobile quote path.",
    },
    {
      image: PLUMBING_STILL,
      imageAlt:
        "Preferred Plumbing website with call and contact actions in clear view",
      client: "Preferred Plumbing",
      kind: "Plumbing",
      metric: "22 → 52",
      label: "calls per month",
      industry: "Plumbing",
      summary:
        "Important contact actions were difficult to find. They were moved into much more visible positions.",
    },
  ],
  buildTitle: "Built around how customers actually hire",
  buildIntro: "",
  sellPoints: [
    {
      title: "Custom Design",
      body: "Built around the company, customer, and sale.",
    },
    {
      title: "Mobile First",
      body: "Designed around the device many customers search from.",
    },
    {
      title: "Conversion Path",
      body: "Calls and quote requests are intentionally built into the layout.",
    },
    {
      title: "Performance",
      body: "Built to load quickly on real mobile connections.",
    },
    {
      title: "SEO Foundation",
      body: "Clean structure, service pages, and technical fundamentals.",
    },
    {
      title: "You Own It",
      body: "No proprietary website builder locking you into the agency.",
    },
    {
      title: "Under the hood",
      body: "Next.js · Tailwind CSS · Cloudflare",
      quiet: true,
    },
  ],
  processTitle: "From plan to launch",
  processIntro: "",
  process: [
    {
      title: "Plan",
      detail:
        "We learn what you sell, who you serve, and what customers need to do next.",
    },
    {
      title: "Build",
      detail:
        "KINEXIS designs and develops the site around mobile use, speed, search, and conversions.",
    },
    {
      title: "Launch",
      detail:
        "The website goes live with the core tracking and technical setup ready.",
    },
  ],
  fitTitle: "Built for contractors & home services",
  fitNote: "",
  fitItems: [
    "Construction",
    "Roofing",
    "Plumbing",
    "HVAC",
    "Landscaping",
    "Electrical",
    "Remodeling",
    "Home Services",
  ],
  pricingTitle: "What does a custom website cost?",
  pricingAnchor: "",
  pricingQualify:
    "Every project is different, but most KINEXIS builds fall into one of these ranges.",
  pricingIntro:
    "You'll know the recommended scope before committing to a project.",
  pricingNote:
    "You'll know the recommended scope before committing to a project.",
  pricing: [
    {
      name: "Essential",
      price: "$2,000–$3,000",
      body: "A focused site for a smaller service business.",
    },
    {
      name: "Growth",
      price: "$3,000–$5,000",
      body: "More services, pages, and a stronger conversion path.",
    },
    {
      name: "Custom",
      price: "$5,000+",
      body: "Larger builds, extra integrations, and expanded content.",
    },
  ],
  proofIntro:
    "Results from published KINEXIS client projects. Individual results vary.",
  proofTitle: "",
  proof: [
    { metric: "1.8% → 3.9%", label: "conversion rate · A1 Property Services" },
    { metric: "22 → 52", label: "calls per month · Preferred Plumbing" },
    { metric: "Custom built", label: "No template lock-in" },
    { metric: "You own it", label: "The site is yours" },
  ],
  bulletsTitle: "What you actually get",
  bullets: [],
  closingTitle: "Your business deserves a website that looks the part.",
  closingCopy:
    "If you need a first site or you're replacing an outdated one, we'll build the right foundation.",
  closingFinePrint: "No obligation.",
  faqs: [
    {
      question: "How much does a website cost?",
      answer:
        "Most projects fall between roughly $2,000 and $5,000, with larger custom builds available.",
    },
    {
      question: "Do I need an existing website?",
      answer:
        "No. KINEXIS builds first websites as well as complete redesigns.",
    },
    {
      question: "Do I own my website?",
      answer: "Yes. Ownership is a core part of the KINEXIS offer.",
    },
    {
      question: "Is SEO included?",
      answer:
        "The website is built with a technical and structural SEO foundation. That is not a promise of search rankings.",
    },
    {
      question: "Will it work on mobile?",
      answer:
        "The site is designed mobile-first and tested across appropriate viewport sizes.",
    },
    {
      question: "Do you only work with Raleigh businesses?",
      answer:
        "No. KINEXIS can work with businesses outside Raleigh. Raleigh wording on this landing page may be campaign-specific.",
    },
  ],
  stickyCtaLabel: CTA,
};
