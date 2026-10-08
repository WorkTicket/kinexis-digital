/**
 * Live production content for /lp/get-a-website.
 * Basic sites from $500. Custom multi-page sites from $2,000+.
 * No $200/$120 sticker addon board.
 */

import type { LandingPageEntry } from "@/content/registry/landing-pages";
import { buildSpanishGetAWebsite } from "@/content/lp/get-a-website-es";
import { localeContent } from "@/i18n/locale-content";
import type { Locale } from "@/i18n/routing";
import { applyLocalePricing, formatEsInteger } from "@/i18n/currency";
import { isSpanishLocale } from "@/i18n/spanish";
import { getBusinessWhatsAppHref } from "@/lib/business";

const A1_DESKTOP = "/assets/images/lp/a1-desktop.webp?v=20261006d";
const A1_MOBILE = "/assets/images/lp/a1-mobile-3x.webp?v=20261006d";
const PLUMBING_DESKTOP = "/assets/images/lp/plumbing-desktop-still.webp?v=20261006d";

/** Sticky and header keep the call. The hero button names the free plan. */
const CTA = "Book a 15-Minute Project Call";
const REPLY = "We usually call back the same day";
const DELIVERY = "Most sites go live in 2 to 6 weeks.";
const PRICE_LINE =
  "Basic websites from $500. Custom multi-page websites from $2,000+.";
const LOW_ES = formatEsInteger(500);
const HIGH_ES = formatEsInteger(2000);

/** Two starting prices. No $200/$120 addons. */
const softPricing = localeContent({
  en: {
    pricingTitle: PRICE_LINE,
    pricingAnchor: "From $500",
    pricingQualify:
      "Final pricing depends on pages, content, and how much has to be custom. Exact quote after the call.",
    pricingDelivery: DELIVERY,
    pricingIntro:
      "Basic is a smaller site. Custom is built around every service and the areas you cover.",
    pricingNote:
      "The call is free. You only pay if you decide to build. Optional hosting, maintenance, and support are available after launch.",
    pricingHighlights: [
      "Written scope before work begins",
      "Milestone-based payment option",
    ] as string[],
    basicName: "Basic",
    basicPrice: "From $500",
    basicItems: [
      "A few pages",
      "Mobile-fast",
      "Click-to-call button",
      "You own the site",
    ] as string[],
    customName: "Custom",
    customPrice: "From $2,000+",
    customItems: [
      "Covers every service",
      "Quote form",
      "Built around your service areas",
      "You own the site",
    ] as string[],
    monthlyTitle: "Keep us on after launch if you want to",
    monthlyCopy:
      "After launch, optional hosting, maintenance, and ongoing support are available if you want help keeping the site current. The proposal spells out what is included.",
    heroPrice: PRICE_LINE,
    proofSupportLabel: "ongoing support",
    proofStartMetric: "2–6 weeks",
    costFaqAnswer:
      "Basic websites from $500. Custom multi-page websites from $2,000+. You'll get a written number before anything is built.",
    hostingFaqAnswer:
      "We can host the site after launch, or you can take it to your own provider. You own the website either way. The proposal states whose account the hosting sits in.",
    maintenanceFaqAnswer:
      "No. Ongoing maintenance and support are optional unless a specific proposal says otherwise. A lot of clients launch, settle in, and add help later. Hosting is separate — with us, or on your own provider.",
  },
  "es-419": {
    pricingTitle: `Sitios básicos desde ${LOW_ES}. Sitios a medida de varias páginas desde ${HIGH_ES}+.`,
    pricingAnchor: `Desde ${LOW_ES}`,
    pricingQualify:
      "El precio final depende de las páginas, el contenido y cuánto hay que personalizar. La cotización exacta llega después de la llamada.",
    pricingDelivery: "La mayoría de los sitios sale en vivo en 2 a 6 semanas.",
    pricingIntro:
      "El básico es un sitio más corto. El a medida se construye alrededor de cada servicio y las zonas que cubres.",
    pricingNote:
      "La llamada es gratis. Solo pagas si decides construir. Hosting, mantenimiento y soporte opcionales están disponibles después del lanzamiento.",
    pricingHighlights: [
      "Alcance por escrito antes de empezar",
      "Opción de pago por hitos",
    ],
    basicName: "Básico",
    basicPrice: `Desde ${LOW_ES}`,
    basicItems: [
      "Unas pocas páginas",
      "Rápido en el celular",
      "Botón de clic para llamar",
      "El sitio es tuyo",
    ],
    customName: "A medida",
    customPrice: `Desde ${HIGH_ES}+`,
    customItems: [
      "Cubre cada servicio",
      "Formulario de cotización",
      "Hecho alrededor de tus zonas de servicio",
      "El sitio es tuyo",
    ],
    monthlyTitle: "Puedes seguir con nosotros después del lanzamiento",
    monthlyCopy:
      "Después del lanzamiento, hosting, mantenimiento y soporte continuo opcionales están disponibles si quieres ayuda para mantener el sitio al día. La propuesta detalla qué incluye.",
    heroPrice: `Sitios básicos desde ${LOW_ES}. Sitios a medida de varias páginas desde ${HIGH_ES}+.`,
    proofSupportLabel: "soporte continuo",
    proofStartMetric: "2–6 semanas",
    costFaqAnswer: `Sitios básicos desde ${LOW_ES}. Sitios a medida de varias páginas desde ${HIGH_ES}+. Recibes un número por escrito antes de construir nada.`,
    hostingFaqAnswer:
      "Podemos alojar el sitio después del lanzamiento, o puedes llevarlo a tu propio proveedor. El sitio es tuyo de cualquier forma. La propuesta indica en qué cuenta queda el hosting.",
    maintenanceFaqAnswer:
      "No. El mantenimiento y el soporte continuo son opcionales salvo que una propuesta diga lo contrario. Muchos clientes lanzan, se asientan y lo suman después. El hosting es aparte: con nosotros o en tu propio proveedor.",
  },
  "es-ES": {
    pricingTitle: `Sitios básicos desde ${LOW_ES} €. Sitios a medida de varias páginas desde ${HIGH_ES} €+.`,
    pricingAnchor: `Desde ${LOW_ES} €`,
    pricingQualify:
      "El precio final depende de las páginas, el contenido y cuánto hay que personalizar. La cotización exacta llega después de la llamada.",
    pricingDelivery: "La mayoría de los sitios sale en vivo en 2 a 6 semanas.",
    pricingIntro:
      "El básico es un sitio más corto. El a medida se construye alrededor de cada servicio y las zonas que cubres.",
    pricingNote:
      "La llamada es gratis. Solo pagas si decides construir. Hosting, mantenimiento y soporte opcionales están disponibles después del lanzamiento.",
    pricingHighlights: [
      "Alcance por escrito antes de empezar",
      "Opción de pago por hitos",
    ],
    basicName: "Básico",
    basicPrice: `Desde ${LOW_ES} €`,
    basicItems: [
      "Unas pocas páginas",
      "Rápido en el móvil",
      "Botón de clic para llamar",
      "El sitio es tuyo",
    ],
    customName: "A medida",
    customPrice: `Desde ${HIGH_ES} €+`,
    customItems: [
      "Cubre cada servicio",
      "Formulario de presupuesto",
      "Hecho alrededor de tus zonas de servicio",
      "El sitio es tuyo",
    ],
    monthlyTitle: "Puedes seguir con nosotros después del lanzamiento",
    monthlyCopy:
      "Después del lanzamiento, hosting, mantenimiento y soporte continuo opcionales están disponibles si quieres ayuda para mantener el sitio al día. La propuesta detalla qué incluye.",
    heroPrice: `Sitios básicos desde ${LOW_ES} €. Sitios a medida de varias páginas desde ${HIGH_ES} €+.`,
    proofSupportLabel: "soporte continuo",
    proofStartMetric: "2–6 semanas",
    costFaqAnswer: `Sitios básicos desde ${LOW_ES} €. Sitios a medida de varias páginas desde ${HIGH_ES} €+. Recibes un número por escrito antes de construir nada.`,
    hostingFaqAnswer:
      "Podemos alojar el sitio después del lanzamiento, o puedes llevarlo a tu propio proveedor. El sitio es tuyo de cualquier forma. La propuesta indica en qué cuenta queda el hosting.",
    maintenanceFaqAnswer:
      "No. El mantenimiento y el soporte continuo son opcionales salvo que una propuesta diga lo contrario. Muchos clientes lanzan, se asientan y lo suman después. El hosting es aparte: con nosotros o en tu propio proveedor.",
  },
});

const baseGetAWebsite: LandingPageEntry = {
  slug: "get-a-website",
  serviceHref: "/services/web-design",
  serviceLabel: "Web design & development",
  metaTitle: "Custom Contractor Websites",
  metaDescription:
    "Custom websites for contractors and home-service businesses. Fast on a phone, built to get calls, and you own it. Basic websites from $500. Custom multi-page websites from $2,000+.",
  badge: "Custom websites for contractors",
  headline: "Get a Website Built to Bring You More Business",
  headlineAccent: "",
  headlineLines: [
    "Get a Website Built to",
    "Bring You More Business",
  ],
  marketLine: "Working with contractors across the U.S.",
  subheadline:
    "Custom websites for contractors and home-service businesses. Fast, mobile-first, SEO-ready, and built to turn visitors into calls and quote requests.",
  heroCtaLabel: CTA,
  headerCtaLabel: "Book a 15-Min Call",
  heroFinePrint: `${DELIVERY} No obligation. ${REPLY}.`,
  heroPrice: softPricing.en.heroPrice,
  heroMeta: ["Custom Built", "No Templates", "You Own Your Website"],
  heroPortrait: {
    src: "/assets/images/lp/colton-wehr-819.webp?v=20261005p",
    srcSet:
      "/assets/images/lp/colton-wehr-480.webp?v=20261005p 480w, /assets/images/lp/colton-wehr-640.webp?v=20261005p 640w, /assets/images/lp/colton-wehr-819.webp?v=20261005p 676w",
    sizes: "2rem",
    alt: "Colton Wehr, lead developer at KINEXIS",
    width: 676,
    height: 819,
    name: "Colton Wehr",
    role: "Lead Web Designer & Developer",
  },
  heroCredit: "Talk to Colton. I'll call you back the same day.",
  heroDevices: {
    src: "/assets/images/lp/hero-devices.webp?v=20261007d",
    srcSet:
      "/assets/images/lp/hero-devices-640.webp?v=20261007d 640w, /assets/images/lp/hero-devices-960.webp?v=20261007d 960w, /assets/images/lp/hero-devices-1440.webp?v=20261007d 1440w, /assets/images/lp/hero-devices-2048.webp?v=20261007d 2048w",
    sizes: "(max-width: 767px) 100vw, min(52rem, 50vw)",
    alt: "A1 Property Services and Preferred Plumbing websites on laptops and phones, built by KINEXIS",
    width: 2048,
    height: 726,
  },
  directIntro: {
    title: "You'll work with me, not a call center.",
    body: "I'm Colton, the lead web designer and developer behind KINEXIS. I build every site myself, and you'll work directly with me from our first conversation through launch. When you request a call, you'll hear from me, usually the same day. We'll spend about 15 minutes talking through your business, what you need from your website, and whether we're a good fit. If we are, I'll send you a clear scope and price in writing. If we're not, I'll be upfront about it.",
    points: [
      "Custom built, no templates.",
      "You own the site.",
      "Most sites go live in 2–6 weeks.",
    ],
    name: "Colton Wehr",
    role: "Lead Web Designer & Developer",
  },
  heroStill: {
    src: A1_DESKTOP,
    mobileSrc: A1_MOBILE,
    alt: "A1 Property Services website on a laptop, built by KINEXIS",
  },

  formTitle: "Book a 15-minute project call",
  formSubtitle: `Tell us about the business and the site you have now. ${REPLY}.`,
  submitLabel: "Book my call",
  continueLabel: "Continue",
  formCtaHint: `No obligation. ${PRICE_LINE} ${REPLY}.`,
  formFootnote:
    "Your information is used to follow up on this call.",
  formAsideTitle: "What the call covers",
  formAsideSubtitle:
    "If you already have a website, we look at the pages people actually use: how it feels on a phone, whether services are clear, and if calling or requesting a quote is obvious.",
  formStep1Title: "About the business",
  formStep2Title: "About the project",
  formStep3Title: "How should we reach you?",
  noWebsiteLabel: "I don't have a website yet",
  noWebsiteStatus:
    "Website skipped. You indicated you do not have a website yet.",
  investmentLabel: "Budget",
  timelineLabel: "When do you want to start?",
  roleLabel: "Your role",
  industryLabel: "Type of work",
  websiteStatusLabel: "Current website",
  goalLabel: "What should this site do first?",
  contactMethodLabel: "Best way to reach you",
  notesLabel: "Anything else we should know?",
  notesPlaceholder:
    "Towns you cover, services that have to be on the site, or what's frustrating about the current one.",
  consentLabel:
    "I agree to be contacted about this project call. We'll use the details above to follow up.",
  privacyMicrocopy: "Your information is used to follow up on this call.",
  successTitle: "We'll call you",
  successCopy: "Your details are in. We usually call back the same day.",
  calendarTitle: "Pick a 15-minute time",
  calendarSubtitle: `Central Time, weekdays. ${REPLY} if none of these work.`,
  inlineThankYou: true,
  bookingHref: "/contact",
  bookingCtaLabel: CTA,

  planHasSiteTitle: "If you already have a website",
  planHasSiteItems: [
    "Whether it looks like the company behind it",
    "How it behaves on a phone",
    "Whether calling or requesting a quote is obvious",
    "Speed and the search basics",
    "What we would change first in a rebuild",
  ],
  planNoSiteTitle: "If you don't have a website yet",
  planNoSiteItems: [
    "The pages you actually need",
    "How to organize services",
    "The main path to a call or quote",
    "A mobile and search foundation",
    "A clear build recommendation and price",
  ],
  formSteps: [
    {
      title: "You tell us about the business",
      detail:
        "The work you do, who you serve, and what a visitor should do next.",
    },
    {
      title: "Pick a time if you're ready",
      detail:
        "Owners starting within 3 months see the calendar. Others get a note.",
    },
    {
      title: "You get a clear recommendation",
      detail: "Clear scope and price in writing before anyone starts building.",
    },
  ],
  formTrust: [
    "No obligation",
    REPLY,
    "Works with or without a current site",
    "You own the website",
  ],

  websiteRequired: false,
  hideWebsite: false,
  essentialsOnly: false,
  twoStepQualify: true,
  threeStepQualify: true,
  phoneRequired: true,
  phoneOptional: false,
  businessNameRequired: true,
  conversionKind: "audit",
  auditLayout: true,
  hideServiceLink: true,

  industryOptions: [
    { value: "general-contractor", label: "General contractor" },
    { value: "remodeling", label: "Remodeling" },
    { value: "roofing", label: "Roofing" },
    { value: "plumbing", label: "Plumbing" },
    { value: "hvac", label: "HVAC" },
    { value: "electrical", label: "Electrical" },
    { value: "landscaping", label: "Landscaping" },
    { value: "other-home-service", label: "Other home service" },
  ],
  roleOptions: [
    { value: "owner", label: "Owner" },
    { value: "partner", label: "Partner" },
    { value: "manager", label: "Manager" },
    { value: "employee", label: "Employee" },
  ],
  websiteStatusOptions: [
    { value: "none", label: "None" },
    { value: "outdated", label: "Outdated" },
    { value: "not-bringing-calls", label: "Not bringing calls" },
  ],
  goalOptions: [
    { value: "calls", label: "More calls" },
    { value: "quotes", label: "More quote requests" },
    { value: "credibility", label: "Look more established" },
    { value: "search", label: "Show up better in search" },
  ],
  budgetOptions: [
    { value: "500-1999", label: "$500–$1,999" },
    { value: "2000-4999", label: "$2,000–$4,999" },
    { value: "5000-plus", label: "$5,000+" },
  ],
  timelineOptions: [
    { value: "30-days", label: "Next 30 days" },
    { value: "1-3-months", label: "1–3 months" },
    { value: "researching", label: "Just researching" },
  ],
  contactMethodOptions: [
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone" },
    { value: "either", label: "Either is fine" },
  ],

  outcomes: [
    {
      title: "Look established",
      body: "A look that matches the company you already run.",
    },
    {
      title: "Generate inquiries",
      body: "Call and quote sit where a visitor can find them.",
    },
    {
      title: "Load quickly",
      body: "Fast on a phone, where most people look you up.",
    },
    {
      title: "Own your website",
      body: "The site stays yours. It is not locked in a builder.",
    },
  ],

  painEyebrow: "They look you up first",
  painTitle: "A weak website can make a strong business look small",
  painSubtitle:
    "Homeowners and property managers check the site before they call. If it looks generic, loads slowly, or hides the number, a capable crew can look like a side job. We rebuild that page around the work you do, the towns you cover, and a next step people can\u00A0find.",
  transformTitle: "What a rebuild changes",
  transformBefore: {
    title: "What they see now",
    items: [
      "Looks like a template",
      "Awkward on a phone",
      "Services hard to follow",
      "Call button easy to miss",
      "Slow, and easy to bounce from",
    ],
  },
  transformAfter: {
    title: "What they should see",
    items: [
      "Looks like your company",
      "Built for a phone first",
      "Services a homeowner can scan",
      "Call and quote in reach",
      "Fast enough that people stay",
    ],
  },

  samplesTitle: "Sites already working for home-service companies",
  samplesIntro:
    "These are live websites, not mockups. Open them. Both companies needed the site to look as solid as the crews already were.",
  testimonial: {
    quote:
      "The quote button used to disappear on a phone. After the rebuild, conversion went from 1.8% to 3.9%.",
    name: "A1 Property Services",
    role: "Landscaping · published case",
  },
  workCtaTitle: "See what we would build for your business",
  samples: [
    {
      image: A1_DESKTOP,
      deviceShot: "/assets/images/lp/a1-devices.webp?v=20261007d",
      deviceShotSrcSet:
        "/assets/images/lp/a1-devices-640.webp?v=20261007d 640w, /assets/images/lp/a1-devices-960.webp?v=20261007d 960w, /assets/images/lp/a1-devices-1440.webp?v=20261007d 1440w, /assets/images/lp/a1-devices-1920.webp?v=20261007d 1920w",
      deviceShotSizes: "(max-width: 767px) 100vw, 34rem",
      imageAlt:
        "A1 Property Services website on a laptop, built by KINEXIS",
      client: "A1 Property Services",
      kind: "Landscaping & property services",
      industry: "Landscaping",
      liveUrl: "https://a1pslandscape.com/",
      challenge:
        "A Cedar Falls landscaping company had outgrown a brochure site. Services were buried, and requesting a quote on a phone took too much work.",
      work: "We rebuilt it around clear service pages, local search structure, and a quote path that stays usable with one thumb.",
      result: "Qualified leads went from 10 a month to 28.",
      summary:
        "A Cedar Falls landscaping company had outgrown a brochure site. We rebuilt it around service pages, local structure, and a quote path that works on a phone.",
      metric: "10 → 28",
      label: "leads/mo",
    },
    {
      image: PLUMBING_DESKTOP,
      deviceShot: "/assets/images/lp/plumbing-devices.webp?v=20261007d",
      deviceShotSrcSet:
        "/assets/images/lp/plumbing-devices-640.webp?v=20261007d 640w, /assets/images/lp/plumbing-devices-960.webp?v=20261007d 960w, /assets/images/lp/plumbing-devices-1440.webp?v=20261007d 1440w, /assets/images/lp/plumbing-devices-1920.webp?v=20261007d 1920w",
      deviceShotSizes: "(max-width: 767px) 100vw, 34rem",
      imageAlt:
        "Preferred Plumbing Solutions website on a laptop, built by KINEXIS",
      client: "Preferred Plumbing Solutions",
      kind: "Plumbing & construction services",
      industry: "Plumbing",
      liveUrl: "https://www.callpreferredplumbing.com/",
      challenge:
        "A plumbing and construction company needed a site that made the work obvious and made calling from a phone feel like the natural next step.",
      work: "The rebuild put service clarity and trust first, then kept the call button in reach on mobile.",
      result: "Emergency calls went from 22 a month to 52.",
      summary:
        "A plumbing and construction company needed a site that made services obvious and made calling from a phone the natural next step.",
      metric: "22 → 52",
      label: "emergency calls/mo",
    },
  ],

  buildTitle: "What a contractor website has to include",
  ownershipStatement:
    "You own your website. You're not stuck in a builder, and you don't pay a monthly fee just to keep your own pages up.",
  sellPoints: [
    {
      title: "Built around your company",
      body: "We start from the jobs you do, not a theme with your logo on it.",
    },
    {
      title: "Works on a phone",
      body: "Most people look you up from a truck, a kitchen, or the job site.",
    },
    {
      title: "Makes calling easy",
      body: "Clear services, and call and quote sit right where a thumb can reach.",
    },
    {
      title: "Stays fast",
      body: "Pages stay light, so people don't leave while the site is still loading.",
    },
    {
      title: "Ready for search",
      body: "Full service pages, plus the basics Google needs to read the work.",
    },
    {
      title: "Tracked from day one",
      body: "You'll see new inquiries come in, not just visits that go nowhere.",
    },
  ],

  processTitle: "How a rebuild actually runs",
  processIntro:
    "You see the scope and the price before we write a line of code. You sign off on the structure before the site gets built.",
  process: [
    {
      title: "Project call",
      detail:
        "We look at your site and work, and what should happen next.",
    },
    {
      title: "Structure and design",
      detail:
        "You approve pages, services, and the look before we build.",
    },
    {
      title: "Development",
      detail:
        "We build the approved design in code, never a page builder.",
    },
    {
      title: "Launch and tracking",
      detail:
        "We launch, connect tracking, and check the call and quote.",
    },
  ],

  fitTitle: "Is this the right fit?",
  fitGoodTitle: "This is a good fit if",
  fitGoodItems: [
    "Contractor or home-service company",
    "The current site doesn't match the work",
    "The business has outgrown a basic website",
    "Wants a custom site the company actually owns",
    "Prepared to invest. Basic websites from $500. Custom multi-page websites from $2,000+.",
    "Can send photos, services, and feedback",
  ],
  fitNotTitle: "Probably not a fit if",
  fitNotItems: [
    "Looking for a free website",
    "Wants a template finished this weekend",
    "Shopping for the cheapest option",
    "Can't make time to review drafts",
  ],

  pricingTitle: softPricing.en.pricingTitle,
  pricingAnchor: softPricing.en.pricingAnchor,
  pricingQualify: softPricing.en.pricingQualify,
  pricingDelivery: softPricing.en.pricingDelivery,
  pricingIntro: softPricing.en.pricingIntro,
  pricingNote: softPricing.en.pricingNote,
  pricingHighlights: softPricing.en.pricingHighlights,
  pricingAddOns: [],
  pricing: [
    {
      name: softPricing.en.basicName,
      price: softPricing.en.basicPrice,
      body: "A shorter site for a crew that needs the phone to ring.",
      items: softPricing.en.basicItems,
    },
    {
      name: softPricing.en.customName,
      price: softPricing.en.customPrice,
      body: "A multi-page site built around the work and the areas you cover.",
      items: softPricing.en.customItems,
      featured: true,
    },
  ],

  monthlyTitle: softPricing.en.monthlyTitle,
  monthlyCopy: softPricing.en.monthlyCopy,
  monthlyItems: [
    "Technical maintenance",
    "SEO improvements",
    "Reasonable content updates",
  ],

  proofIntro: "Published KINEXIS client work. Individual results vary.",
  proofTitle: "",
  proof: [
    { metric: "Custom built", label: "Not a template" },
    { metric: "You own it", label: "No builder lock-in" },
    {
      metric: softPricing.en.proofStartMetric,
      label: "most sites go live",
    },
    { metric: "Optional", label: softPricing.en.proofSupportLabel },
  ],
  bulletsTitle: "What you actually get",
  bullets: [],

  closingTitle: "Book a 15-minute project call",
  closingCopy: `If the current site is underselling the crew, send the details. ${REPLY}.`,
  closingFinePrint: `No obligation. ${PRICE_LINE} ${REPLY}.`,

  faqs: [
    {
      question: "How much does a custom website cost?",
      answer: softPricing.en.costFaqAnswer,
    },
    {
      question: "How soon will I hear back?",
      answer: `${REPLY}. We'll look at the current site, or the notes you sent, and come back with what a rebuild should fix first.`,
    },
    {
      question: "Is this a WordPress template?",
      answer:
        "No. We build these in custom code, with Next.js and Tailwind. Not a theme you can buy, and not a page builder.",
    },
    {
      question: "Will I own my website?",
      answer:
        "Yes. You own the finished site. You're not stuck in a builder, and you don't pay a monthly fee just to keep your own pages up.",
    },
    {
      question: "Is hosting included?",
      answer: softPricing.en.hostingFaqAnswer,
    },
    {
      question: "Is SEO included?",
      answer:
        "The build includes the search foundation: service pages, titles, and the indexing basics. Ongoing SEO is a separate conversation.",
    },
    {
      question: "Can you redesign my existing website?",
      answer:
        "Yes. That's most of the work on this page. If the business has outgrown the current site, that's the starting point.",
    },
    {
      question: "How long does a project take?",
      answer: `${DELIVERY} That depends on how quickly photos and feedback come back.`,
    },
    {
      question: "Do I have to purchase monthly maintenance?",
      answer: softPricing.en.maintenanceFaqAnswer,
    },
  ],
  stickyCtaLabel: CTA,
};

/** English export kept for registry / tests. */
export const getAWebsite: LandingPageEntry = baseGetAWebsite;

/** Full Spanish bodies — LatAm soft numbers; Spain euros via softPricing.es-ES. */
const spanishByLocale = {
  "es-419": buildSpanishGetAWebsite(softPricing["es-419"]),
  "es-ES": buildSpanishGetAWebsite(softPricing["es-ES"]),
} as const;

/** Spanish-only WhatsApp. English keeps the phone number in the header. */
const heroWhatsAppEs = {
  heroLabel: "Escribir por WhatsApp",
  planLabel: "Escribir por WhatsApp",
  prefill: "Hola, me interesa una llamada de 15 minutos sobre el sitio de mi negocio.",
} as const;

/** Full locale entry: English base, or full Spanish body + WhatsApp. */
export function getAWebsiteForLocale(locale: Locale): LandingPageEntry {
  const next: LandingPageEntry = isSpanishLocale(locale)
    ? { ...spanishByLocale[locale] }
    : {
        ...baseGetAWebsite,
        pricingTitle: softPricing.en.pricingTitle,
        pricingAnchor: softPricing.en.pricingAnchor,
        pricingQualify: softPricing.en.pricingQualify,
        pricingDelivery: softPricing.en.pricingDelivery,
        pricingIntro: softPricing.en.pricingIntro,
        pricingNote: softPricing.en.pricingNote,
        pricingHighlights: softPricing.en.pricingHighlights,
        pricingAddOns: [],
        pricing: baseGetAWebsite.pricing,
        monthlyTitle: softPricing.en.monthlyTitle,
        monthlyCopy: softPricing.en.monthlyCopy,
        heroPrice: softPricing.en.heroPrice,
      };

  if (isSpanishLocale(locale)) {
    const href = getBusinessWhatsAppHref(heroWhatsAppEs.prefill);
    if (href) {
      next.whatsappHref = href;
      next.whatsappHeroLabel = heroWhatsAppEs.heroLabel;
      next.whatsappPlanLabel = heroWhatsAppEs.planLabel;
    }
  }

  // Spain euros / LatAm soft rewrites for any remaining money framing.
  return applyLocalePricing(next, locale);
}
