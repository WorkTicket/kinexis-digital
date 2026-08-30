export type LandingPageProof = {
  metric: string;
  label: string;
};

export type LandingPageSample = {
  image: string;
  imageAlt: string;
  client: string;
  metric: string;
  label: string;
  href?: string;
  industry?: string;
  mechanism?: string;
  summary?: string;
};

export type LandingPageProcessStep = {
  title: string;
  detail: string;
};

export type LandingPageScopeItem = {
  title: string;
  description: string;
};

export type LandingPageLogo = {
  src: string;
  alt: string;
  name: string;
};

export type LandingPageTestimonial = {
  quote: string;
  name: string;
  role: string;
};

export type LandingPageSpotlight = {
  image: string;
  imageAlt: string;
  kicker: string;
  title: string;
  body: string;
};

export type LandingPageEntry = {
  slug: string;
  /** Locale-unprefixed service path for soft internal links if needed */
  serviceHref: string;
  serviceLabel: string;
  metaTitle: string;
  metaDescription: string;
  badge: string;
  headline: string;
  headlineAccent: string;
  subheadline: string;
  /** Short facts under the hero lede (timeline, scope, reply speed). */
  heroMeta?: string[];
  formTitle: string;
  formSubtitle: string;
  submitLabel: string;
  formFootnote: string;
  formDetailsPlaceholder?: string;
  /** Website URL required — use on site-review offers. */
  websiteRequired?: boolean;
  /** Free review / audit offers use the audit conversion label + /thank-you/audit. */
  conversionKind: "lead" | "audit";
  proofIntro: string;
  proofTitle?: string;
  proof: LandingPageProof[];
  samplesTitle?: string;
  samplesIntro?: string;
  samples?: LandingPageSample[];
  bulletsTitle: string;
  bullets: string[];
  /** Title + description rows — preferred when the lander has a scope chapter. */
  scopeItems?: LandingPageScopeItem[];
  processTitle?: string;
  processIntro?: string;
  process?: LandingPageProcessStep[];
  formAsideTitle?: string;
  formAsideSubtitle?: string;
  formSteps?: LandingPageProcessStep[];
  formTrust?: string[];
  closingTitle?: string;
  closingCopy?: string;
  faqs: { question: string; answer: string }[];
  stickyCtaLabel: string;
  /** Hide the mid-page link off to the organic service page (paid landers). */
  hideServiceLink?: boolean;
  /** Put the lead form in the hero so the first viewport is headline + convert. */
  heroIntake?: boolean;
  /** URL-only first step, then name/email. Use on the general conversion-review lander. */
  stagedHeroForm?: boolean;
  logos?: LandingPageLogo[];
  testimonial?: LandingPageTestimonial;
  /** City / neighborhood chips for local Meta landers. */
  serviceArea?: string[];
  /** Visual proof band directly under the hero (before/after or local analog). */
  spotlight?: LandingPageSpotlight;
};

const CLIENT_LOGOS = {
  a1: {
    src: "/assets/logos/clients/a1-property-services.svg",
    alt: "A1 Property Services",
    name: "A1 Property Services",
  },
  plumbing: {
    src: "/assets/logos/clients/preferred-plumbing.webp",
    alt: "Preferred Plumbing",
    name: "Preferred Plumbing",
  },
  manos: {
    src: "/assets/logos/clients/manos-creativas.webp",
    alt: "Manos Creativas",
    name: "Manos Creativas",
  },
} as const satisfies Record<string, LandingPageLogo>;

export const landingPages: LandingPageEntry[] = [
  {
    slug: "google-ads-management",
    serviceHref: "/services/paid-media",
    serviceLabel: "Google Ads management",
    metaTitle: "Google Ads Management That Stops Waste",
    metaDescription:
      "Google Ads management for businesses tired of burning budget. Account rebuilds, negative keywords, and conversion tracking that actually reports profit.",
    badge: "Google Ads management",
    headline: "Stop paying for clicks",
    headlineAccent: "that never become customers.",
    subheadline:
      "We take over accounts that look busy and make them profitable. That means cleaning search terms, fixing conversion tracking, and putting budget only where it earns the right to stay.",
    formTitle: "Get a free Ads account review",
    formSubtitle:
      "Tell us where you're spending. We'll tell you what's leaking, and what to fix first.",
    submitLabel: "Request my review",
    formFootnote: "No pitch deck. Practical findings within one business day.",
    conversionKind: "audit",
    formAsideTitle: "What happens next",
    formAsideSubtitle:
      "A look at the live account. What's leaking, and what to fix first.",
    formSteps: [
      {
        title: "We open the account",
        detail: "Search terms, tracking, and where budget actually goes.",
      },
      {
        title: "You get written notes",
        detail: "Waste, tracking gaps, and the first changes that pay.",
      },
      {
        title: "A clear next step",
        detail: "Rebuild, tighter management, or a fix you can run yourself.",
      },
    ],
    formTrust: [
      "Findings within one business day",
      "No pitch deck",
      "We work in your Ads account",
    ],
    closingTitle: "We'll tell you where the budget is leaking.",
    closingCopy:
      "Send the account details. You get practical notes within one business day, not a slide deck.",
    proofIntro: "Results from accounts we rebuilt, not vanity dashboards.",
    proof: [
      { metric: "+118%", label: "pipeline from Ads + CRO" },
      { metric: "−43%", label: "CAC · SaaS platform, 8 mo" },
      { metric: "$4,100", label: "monthly ad spend after cut (was $6,800)" },
      { metric: "2.4X", label: "order volume · Manos Creativas, 8 mo" },
    ],
    bulletsTitle: "What we fix first",
    bullets: [
      "Broken or missing conversion tracking. If Ads can't see leads, it optimizes for noise",
      "Search term waste and negative keyword gaps that quietly drain budget",
      "Landing pages that don't match the ad promise, so Quality Score and ROAS suffer together",
      "Campaign structure that mixes intent levels and makes bidding guesswork",
    ],
    faqs: [
      {
        question: "Do you take over existing Google Ads accounts?",
        answer:
          "Yes. Most clients come to us with an account that's been running for months or years. We audit it, strip what doesn't convert, and rebuild around the offers that actually pay.",
      },
      {
        question: "How fast will we see improvement?",
        answer:
          "Tracking and waste cuts often show within the first two weeks. Meaningful ROAS shifts usually take 30–60 days once the account is structured and learning from clean conversion data.",
      },
      {
        question: "What's the minimum monthly ad spend you work with?",
        answer:
          "We work best when there's enough spend to learn from, typically a few thousand dollars a month or more. Below that, we may recommend a tighter geo or offer focus instead of spreading thin.",
      },
      {
        question: "Is this the same as your PPC management service?",
        answer:
          "Yes. This page is built for paid traffic. The ongoing service covers Google Ads (and related search campaigns) under our PPC management engagement.",
      },
    ],
    stickyCtaLabel: "Get my free review",
  },
  {
    slug: "seo",
    serviceHref: "/services/seo",
    serviceLabel: "SEO",
    metaTitle: "SEO That Builds Pipeline, Not Just Rankings",
    metaDescription:
      "SEO for companies that need leads and revenue, not ranking screenshots. Technical foundations, content that ranks, and pages built to convert.",
    badge: "Search engine optimization",
    headline: "SEO that shows up",
    headlineAccent: "in your pipeline.",
    subheadline:
      "Rankings are a means, not the goal. We build the technical base, the pages that match how buyers search, and the conversion paths so traffic turns into conversations.",
    formTitle: "Get a free SEO growth audit",
    formSubtitle:
      "Share your site URL and market. We'll flag what's holding organic growth back, and what to prioritize.",
    submitLabel: "Request my SEO audit",
    formFootnote: "Clear findings. No 40-page report designed to impress instead of act.",
    conversionKind: "audit",
    formAsideTitle: "What happens next",
    formAsideSubtitle:
      "A look at the live site. What's capping organic growth, and what to do first.",
    formSteps: [
      {
        title: "We review the site",
        detail: "Crawl, pages, and the path from search to a real conversation.",
      },
      {
        title: "You get a short audit",
        detail: "What's holding growth back, ranked by impact.",
      },
      {
        title: "A clear next step",
        detail: "Technical work, pages, or content — not a generic retainer pitch.",
      },
    ],
    formTrust: [
      "Clear findings, not a 40-page PDF",
      "Tied to leads, not vanity ranks",
      "Reply within one business day",
    ],
    closingTitle: "We'll tell you what's capping organic growth.",
    closingCopy:
      "Share the URL and market. You get a short audit you can act on, not a ranking slideshow.",
    proofIntro: "Organic growth our clients can point to in their CRM.",
    proof: [
      { metric: "+181%", label: "organic traffic · Landscaping, 10 mo" },
      { metric: "2.8X", label: "qualified leads · Landscaping, 10 mo" },
      { metric: "+140%", label: "organic traffic · SaaS, 8 mo" },
      { metric: "+$5,600", label: "monthly revenue · Landscaping" },
    ],
    bulletsTitle: "How we approach SEO",
    bullets: [
      "Fix crawl, index, and Core Web Vitals issues that quietly cap growth",
      "Map keywords to pages that match buyer intent, not thin content for every synonym",
      "Strengthen internal linking so authority reaches the pages that should convert",
      "Measure leads and revenue, not just positions on a weekly rank tracker",
    ],
    faqs: [
      {
        question: "How long does SEO take to work?",
        answer:
          "Most sites see meaningful movement in 3–6 months. Competitive markets and weak technical foundations take longer. We set expectations against your niche, not a generic timeline.",
      },
      {
        question: "Do you guarantee #1 rankings?",
        answer:
          "No honest agency does. We guarantee the work: sound technical SEO, pages worth ranking, and reporting tied to leads, not vanity screenshots.",
      },
      {
        question: "Can SEO work with our Google Ads?",
        answer:
          "It should. Paid search covers demand you need now; SEO compounds. We align messaging and conversion tracking across both so you're not running two disconnected systems.",
      },
      {
        question: "What if we already have an SEO retainer?",
        answer:
          "Bring what you've got. Our audit shows what's working, what's theater, and where budget should actually go.",
      },
    ],
    stickyCtaLabel: "Get my SEO audit",
  },
  {
    slug: "local-seo",
    serviceHref: "/services/seo",
    serviceLabel: "Local SEO",
    metaTitle: "Local SEO That Fills the Phone",
    metaDescription:
      "Local SEO for service businesses that need map pack visibility, more calls, and booked jobs, not another list of citation logins.",
    badge: "Local SEO",
    headline: "Show up when locals",
    headlineAccent: "are ready to hire.",
    subheadline:
      "Map pack, Google Business Profile, and location pages that earn calls. Built for trades, clinics, and home-service businesses that live or die by local demand.",
    formTitle: "Get a free local visibility check",
    formSubtitle:
      "Add your market and site in the form. We'll show where you're invisible, and how to fix it.",
    submitLabel: "Check my local visibility",
    formFootnote: "Practical GBP and local-pack findings. No junk citation spam.",
    conversionKind: "audit",
    formAsideTitle: "What happens next",
    formAsideSubtitle:
      "A look at the map pack and profile. Where you're invisible, and how to fix it.",
    formSteps: [
      {
        title: "We check local visibility",
        detail: "GBP, map pack, and the pages that should earn the call.",
      },
      {
        title: "You get a short report",
        detail: "Gaps in categories, reviews, and service-area coverage.",
      },
      {
        title: "A clear next step",
        detail: "Profile work, pages, or both — no junk citation list.",
      },
    ],
    formTrust: [
      "Practical GBP findings",
      "No citation spam",
      "Reply within one business day",
    ],
    closingTitle: "We'll show you where you're invisible locally.",
    closingCopy:
      "Add the market and the site. You get map-pack findings you can act on, not a login to another citation tool.",
    proofIntro: "Local operators who needed phones to ring.",
    proof: [
      { metric: "136%", label: "more emergency calls · Plumbing" },
      { metric: "28/50", label: "local pack keywords · Landscaping" },
      { metric: "+170%", label: "site traffic · Plumbing, 8 mo" },
      { metric: "+$5,200", label: "monthly revenue · Plumbing" },
    ],
    bulletsTitle: "What local SEO actually includes",
    bullets: [
      "Google Business Profile optimized for the categories and services that drive jobs",
      "Service-area pages that are unique and useful, not city-name spam",
      "Review velocity and response workflows that build trust in the map pack",
      "Call tracking and form paths so you know which searches book work",
    ],
    faqs: [
      {
        question: "Do you help with Google Business Profile?",
        answer:
          "Yes. GBP is often the highest-leverage local asset. Categories, services, photos, posts, and review response all matter, and most profiles leave money on the table.",
      },
      {
        question: "We serve multiple cities. Can you cover that?",
        answer:
          "Yes. We build a service-area structure that matches how you actually dispatch jobs, without duplicate thin pages that Google ignores.",
      },
      {
        question: "How is this different from regular SEO?",
        answer:
          "Local SEO prioritizes map pack, proximity signals, and call conversion. National SEO plays a different game. If most of your revenue is within a drive-time radius, local comes first.",
      },
      {
        question: "Will this reduce our need for Google Ads?",
        answer:
          "Often, yes for branded and high-intent local queries. Ads still win for emergency spikes and competitive auctions. We can run both without them fighting each other.",
      },
    ],
    stickyCtaLabel: "Check my visibility",
  },
  {
    slug: "web-design",
    serviceHref: "/services/web-design",
    serviceLabel: "Web design & development",
    metaTitle: "Web Design & Development That Converts",
    metaDescription:
      "Phone-first web design and frontend development. New sites or rebuilds. Fast pages, a clear offer, and a conversion path that matches the ad. Written notes in one business day.",
    badge: "Web design & development",
    headline: "Websites we design",
    headlineAccent: "and actually build.",
    subheadline:
      "Need a first site, or is the one you have leaking the click? We design and ship phone-first websites. If you have a URL, we review mobile load time, whether the next step stays visible on a phone, and the first leak after the click. If you don't, we start from the offer and who has to convert. Written notes in one business day. New build, rebuild, or a repair. Not a deck.",
    heroMeta: [
      "New site or a rebuild",
      "Written notes in one business day",
      "We keep 8 to 10 active clients",
    ],
    formTitle: "Get a free website consult",
    formSubtitle:
      "Have a URL? We check mobile load, whether the CTA stays on a 390px screen, and the first leak. No site yet? Leave it blank and tell us what the first version has to do.",
    submitLabel: "Get my notes",
    formFootnote:
      "Written notes within one business day. We keep 8 to 10 active clients, so a project only happens when it fits.",
    formDetailsPlaceholder: "What you want built or fixed first",
    websiteRequired: false,
    conversionKind: "audit",
    heroIntake: true,
    stagedHeroForm: false,
    logos: [CLIENT_LOGOS.a1, CLIENT_LOGOS.manos, CLIENT_LOGOS.plumbing],
    testimonial: {
      quote:
        "The quote button used to disappear on a phone. After the rebuild, conversion went from 1.8% to 3.9%.",
      name: "A1 Property Services",
      role: "Landscaping · published case",
    },
    formAsideTitle: "What you get back",
    formAsideSubtitle:
      "Written notes on the job. New build, rebuild, or a repair, and what to do first.",
    formSteps: [
      {
        title: "We look at the brief",
        detail: "Live URL if you have one. Offer and conversion path if you don't.",
      },
      {
        title: "You get written notes",
        detail: "What the first site has to do, or what's killing the one you have.",
      },
      {
        title: "A quote that matches the work",
        detail: "A new site, a rebuild, and a landing-page repair are different jobs.",
      },
    ],
    formTrust: [
      "Written notes in one business day",
      "No deck, no bait-and-switch",
      "You own the code when we ship",
    ],
    closingTitle: "Have a URL, or need one built.",
    closingCopy:
      "Written notes in one business day. New build, rebuild, or a repair, and what to do first.",
    proofTitle: "Numbers that moved after the site did.",
    proofIntro:
      "Published work. Conversion, orders, and leads, scored after the site started finishing the job.",
    proof: [
      { metric: "3.9%", label: "conversion rate · A1 Property Services (was 1.8%)" },
      { metric: "2.4×", label: "monthly orders · Manos Creativas after rebuild" },
      { metric: "52/mo", label: "emergency calls · Preferred Plumbing (was 22)" },
      { metric: "2.4K+", label: "leads generated across published work" },
    ],
    samplesTitle: "Sites we designed and shipped.",
    samplesIntro:
      "Three businesses. Same job: make the next step obvious on a phone, then keep score on leads, calls, and orders.",
    samples: [
      {
        image: "/assets/images/case-studies/landscaping-company-growth.webp",
        imageAlt:
          "A1 Property Services site preview showing local lead-gen pages",
        client: "A1 Property Services",
        metric: "3.9%",
        label: "conversion after the site and CTA rebuild",
        href: "/case-studies/landscaping-company-growth",
        industry: "Home services",
        mechanism: "Phone-first rebuild. Quote form stays on screen.",
        summary:
          "The old brochure site buried the quote button on a phone. After the rebuild, conversion moved from 1.8% to 3.9%, and qualified leads followed.",
      },
      {
        image: "/assets/images/case-studies/plumbing-company-growth.webp",
        imageAlt:
          "Preferred Plumbing site preview focused on emergency call capture",
        client: "Preferred Plumbing",
        metric: "52/mo",
        label: "emergency calls after the site could take a call on a phone",
        href: "/case-studies/plumbing-company-growth",
        industry: "Home services",
        mechanism: "Emergency-first site. Click-to-call stays on screen.",
        summary:
          "Ads were bringing the click, but the site could not finish a call on a phone. After the rebuild, emergency calls went from 22 to 52 a month.",
      },
      {
        image: "/assets/images/case-studies/ecommerce-store-growth.webp?v=20260822a",
        imageAlt:
          "Manos Creativas storefront preview after conversion-led rebuild",
        client: "Manos Creativas",
        metric: "2.4×",
        label: "monthly orders after the conversion rebuild",
        href: "/case-studies/ecommerce-store-growth",
        industry: "E-commerce",
        mechanism: "Product pages, checkout path, and trust on a phone.",
        summary:
          "A conversion-led rebuild and tighter product pages lifted orders from 32 to 78 a month, without stacking promo discounts.",
      },
    ],
    bulletsTitle: "What you actually get",
    bullets: [
      "Phone-first design and a frontend build. You do not get a mockup that still needs another team to code.",
      "One primary CTA and a form or click-to-call that stays obvious on a 390px screen.",
      "Speed work so paid traffic is not wasted on a slow first load.",
      "Forms, thank-you pages, and Ads events wired before we call it launched.",
    ],
    scopeItems: [
      {
        title: "Design and frontend build",
        description:
          "Phone comps first, then production code. You do not get a mockup that still needs another team.",
      },
      {
        title: "One obvious next step",
        description:
          "A form or click-to-call that stays visible on a 390px screen.",
      },
      {
        title: "Speed that protects the visit",
        description:
          "The first load has to earn the visit, paid or organic.",
      },
      {
        title: "Tracking before launch",
        description:
          "Forms, thank-you pages, and Ads events wired before we call it live.",
      },
    ],
    processTitle: "How a project runs",
    processIntro:
      "Consult first. Then comps on a phone. Then production code with tracking on.",
    process: [
      {
        title: "Consult",
        detail:
          "Live site if you have one. Offer and conversion path if you don't. You leave knowing new build vs repair, and what to do first.",
      },
      {
        title: "Design",
        detail:
          "Phone comps first, then tablet and desktop. You approve screens before production code.",
      },
      {
        title: "Build & launch",
        detail:
          "Frontend, CMS if you need it, forms, and conversion events. Live when the path actually captures a lead.",
      },
    ],
    faqs: [
      {
        question: "I don't have a website yet. Can you still help?",
        answer:
          "Yes. A first site is a normal project. The consult starts from the offer, who has to convert, and what the homepage has to do on a phone. You still get written notes in one business day, then a quote for a new build.",
      },
      {
        question: "Do you redesign existing sites or only build new ones?",
        answer:
          "Both. Sometimes a full rebuild is the right call. Sometimes fixing structure, speed, and the conversion path on the current stack is enough. The consult tells you which.",
      },
      {
        question: "Is this design only, or do you write the code too?",
        answer:
          "Both. We design and build. We do not hand you a Figma file and walk away.",
      },
      {
        question: "How long does a typical project take?",
        answer:
          "Most marketing sites land in 6–12 weeks, depending on content readiness and scope. You get a real timeline after the consult, not a number invented for the ad.",
      },
      {
        question: "What does a project cost?",
        answer:
          "It depends on new build vs repair, pages, and integrations. A landing-page repair and a full site are different jobs. We quote after the consult so the number matches the work.",
      },
      {
        question: "Who owns the site when you are done?",
        answer:
          "You do. Code, CMS, and accounts sit in your name. We are not holding the keys.",
      },
      {
        question: "Will the new site be good for SEO and ads?",
        answer:
          "Yes. URLs, headings, internal links, and conversion events get planned during design, not bolted on after the pixels are done.",
      },
    ],
    stickyCtaLabel: "Get my notes",
    hideServiceLink: true,
  },
  {
    slug: "facebook-web-design",
    serviceHref: "/services/web-design",
    serviceLabel: "Web design & development",
    metaTitle: "Turn Your Website Into More Customers",
    metaDescription:
      "Websites and marketing built to generate growth for San Antonio businesses. New site or a live one. Free consult. We tell you what is in the way.",
    badge: "San Antonio growth consult",
    headline: "Turn your website",
    headlineAccent: "into more customers.",
    subheadline:
      "San Antonio owners reach out with a site that is not producing, ads that waste money, or no site at all. We look at the website, SEO, and ads together so visits turn into calls and jobs. If you have a URL, paste it. If you need one built, say so. Written notes, not a deck.",
    heroMeta: [
      "San Antonio and nearby cities",
      "New site, rebuild, SEO, or ads",
      "Written consult in one business day",
    ],
    serviceArea: [
      "San Antonio",
      "Alamo Heights",
      "Stone Oak",
      "Helotes",
      "Schertz",
      "New Braunfels",
    ],
    formTitle: "Get your free growth consultation",
    formSubtitle:
      "URL if you have one. Site, ads, or both. Starting from scratch is enough.",
    submitLabel: "Get my free consult",
    formFootnote:
      "Written notes within one business day. We keep 8 to 10 active clients, so a project only happens when it fits.",
    formDetailsPlaceholder: "New site, ads, or SEO. Whatever isn't converting.",
    websiteRequired: false,
    conversionKind: "audit",
    heroIntake: true,
    logos: [CLIENT_LOGOS.plumbing, CLIENT_LOGOS.a1, CLIENT_LOGOS.manos],
    testimonial: {
      quote:
        "Ads were 70% of new jobs and costing more every month. After the site, local SEO, and tracking work, emergency calls went from 22 to 52 a month and ad spend dropped from $6,800 to $4,100.",
      name: "Preferred Plumbing",
      role: "Family-owned plumbing · published case",
    },
    spotlight: {
      image: "/assets/images/case-studies/plumbing-company-growth.webp",
      imageAlt:
        "Preferred Plumbing site after the rebuild, built to capture emergency calls on a phone",
      kicker: "Same leak, local operators",
      title: "Ads running. Phone still quiet.",
      body:
        "Preferred Plumbing had spend climbing and a site that could not finish the job. After the rebuild, local SEO, and cleaner tracking, emergency calls more than doubled and ad spend came down. That is the pattern we see on San Antonio service businesses too.",
    },
    formAsideTitle: "What you get back",
    formAsideSubtitle:
      "Written notes on the job. Live site if you have one. What to build or fix first.",
    formSteps: [
      {
        title: "We look at the brief",
        detail: "Live URL if you have one. Offer, market, and ads if you don't.",
      },
      {
        title: "You get written notes",
        detail: "What's killing conversions, and what to do first.",
      },
      {
        title: "A clear next step",
        detail: "Site work, ads, SEO, or a mix. Quoted to match the job.",
      },
    ],
    formTrust: [
      "Notes in one business day",
      "No deck, no bait-and-switch",
      "San Antonio owners, not a national mill",
    ],
    closingTitle: "Have a site, or need one built.",
    closingCopy:
      "Free growth consult for San Antonio owners. Written notes in one business day. What to build or fix first, and what is not worth spending on.",
    proofTitle: "Local operators. Real numbers.",
    proofIntro:
      "These are service businesses that had ads or a site that was not finishing the job. The numbers moved after both got fixed.",
    proof: [
      { metric: "136%", label: "more emergency calls · Preferred Plumbing" },
      { metric: "$4,100", label: "monthly ad spend after the cut (was $6,800)" },
      { metric: "2.8×", label: "qualified leads · A1 Property Services, 10 mo" },
    ],
    samplesTitle: "Work that looks like this market.",
    samplesIntro:
      "Local service businesses. Site, search, and ads treated as one system, not three disconnected retainers.",
    samples: [
      {
        image: "/assets/images/case-studies/plumbing-company-growth.webp",
        imageAlt:
          "Preferred Plumbing site preview focused on emergency call capture",
        client: "Preferred Plumbing",
        metric: "136%",
        label: "more emergency calls after site, SEO, and ad cleanup",
        href: "/case-studies/plumbing-company-growth",
        industry: "Home services",
        mechanism: "Emergency-first site. Local pack. Less wasted ad spend.",
        summary:
          "A family-owned shop was paying $6,800 a month in ads for shrinking returns. The site could not capture a call on a phone. After the rebuild, local SEO, and tracking, emergency calls went from 22 to 52 a month and ad spend dropped to $4,100.",
      },
      {
        image: "/assets/images/case-studies/landscaping-company-growth.webp",
        imageAlt:
          "A1 Property Services site preview showing local lead-gen pages",
        client: "A1 Property Services",
        metric: "2.8×",
        label: "qualified leads after local pages and a phone-first rebuild",
        href: "/case-studies/landscaping-company-growth",
        industry: "Home services",
        mechanism: "Neighborhood pages. Quote form on screen. Local pack.",
        summary:
          "Referrals had been the whole engine. Seasonal swings made growth guesswork. Local pages and a site built to book jobs took qualified leads from 10 to 28 a month.",
      },
    ],
    bulletsTitle: "What the consult actually covers",
    bullets: [
      "The website: is the offer obvious on a phone, and does the next step have a place to land.",
      "SEO: are you even showing up for the searches that should produce jobs in San Antonio.",
      "Google Ads and Meta Ads: where budget is working, and where it is paying for noise.",
      "The path after the click: forms, calls, thank-you pages, and whether you can trust the numbers.",
    ],
    scopeItems: [
      {
        title: "Website that earns the visit",
        description:
          "Phone-first design and a frontend build. The next step stays on screen.",
      },
      {
        title: "SEO that produces work",
        description:
          "Pages and local signals aimed at searches that should become jobs in San Antonio, not traffic for its own sake.",
      },
      {
        title: "Google Ads and Meta Ads",
        description:
          "Campaigns pointed at a page that can convert, with tracking that reports the real outcome.",
      },
      {
        title: "A conversion path you can measure",
        description:
          "Forms, calls, and events wired before we call anything launched.",
      },
    ],
    processTitle: "How a consult turns into a project",
    processIntro:
      "You do not buy a retainer to find out what is wrong. The consult comes first.",
    process: [
      {
        title: "Consult",
        detail:
          "Live site and ads if they exist. Offer and conversion path if they don't. You leave with written notes, not a slide deck.",
      },
      {
        title: "Scope",
        detail:
          "Site, SEO, ads, or a mix. You approve the job before anyone starts production work.",
      },
      {
        title: "Build",
        detail:
          "We design and ship. Tracking is on when it goes live, so you can see if it actually moved.",
      },
    ],
    faqs: [
      {
        question: "Do I have to get on a call to get the consult?",
        answer:
          "No. Send a URL if you have one, or a short note if you need a site built. We send written notes within one business day. A call only if you want to talk through what to do first.",
      },
      {
        question: "I don't have a website yet. Can you still help?",
        answer:
          "Yes. A first site is a normal project here. The consult starts from who you serve in San Antonio, what the homepage has to do on a phone, and whether ads or SEO even make sense yet.",
      },
      {
        question: "Is this only for San Antonio businesses?",
        answer:
          "This campaign is built for San Antonio owners. We also work with businesses outside the city. The consult starts with your site if you have one, or with what the first site has to do.",
      },
      {
        question: "I only need help with one thing. Site, ads, or SEO.",
        answer:
          "That is fine. Most people reach out because one piece feels broken. The consult still looks at how the three connect, then we quote the part that is actually leaking.",
      },
      {
        question: "My ads are already running. Can you look at those too?",
        answer:
          "Yes. An outdated site and wasted ad spend usually show up together. The consult covers the page the ads send people to, and whether the campaigns are paying for the wrong clicks.",
      },
      {
        question: "Is this design only, or do you write the code too?",
        answer:
          "Both. We design and build. We do not hand you a Figma file and walk away.",
      },
      {
        question: "How long does a typical project take?",
        answer:
          "Most marketing sites land in 6–12 weeks, depending on content and scope. You get a real timeline after the consult, not a number invented for the ad.",
      },
      {
        question: "What does a project cost?",
        answer:
          "It depends on a new site vs a repair, and how much is site work vs ads vs SEO. We quote after the consult so the number matches the job.",
      },
    ],
    stickyCtaLabel: "Get my free consult",
    hideServiceLink: true,
  },
];

export const landingPageSlugs = landingPages.map((p) => p.slug);

export function getLandingPage(slug: string): LandingPageEntry | undefined {
  return landingPages.find((p) => p.slug === slug);
}
