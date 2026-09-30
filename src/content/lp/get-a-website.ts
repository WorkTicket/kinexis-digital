/**
 * Live production content for /lp/get-a-website with soft pricing:
 * keep the $2,000 starting panel, omit the $200/$120 sticker addon board.
 */

import type { LandingPageEntry } from "@/content/registry/landing-pages";
import { buildSpanishGetAWebsite } from "@/content/lp/get-a-website-es";
import { localeContent } from "@/i18n/locale-content";
import type { Locale } from "@/i18n/routing";
import { applyLocalePricing, formatEsInteger } from "@/i18n/currency";
import { isSpanishLocale } from "@/i18n/spanish";
import { getBusinessWhatsAppHref } from "@/lib/business";

const A1_DESKTOP = "/assets/images/lp/a1-desktop.webp?v=20260916g";
const A1_MOBILE = "/assets/images/lp/a1-mobile-3x.webp?v=20260916g";
const PLUMBING_DESKTOP = "/assets/images/lp/plumbing-desktop-still.webp?v=20260916g";

const CTA = "Get My Free Website Plan";
const REPLY = "one business day";
const DELIVERY = "6 to 12";
const LOW = 500;
const HIGH = 2000;
const LOW_ES = formatEsInteger(LOW);
const HIGH_ES = formatEsInteger(HIGH);

/** Soft live-panel overlays — range from 500–2000; no $200/$120 addons. */
const softPricing = localeContent({
  en: {
    pricingTitle: "Plans from $500 to $2,000",
    pricingAnchor: `$${LOW.toLocaleString("en-US")}–$${HIGH.toLocaleString("en-US")}`,
    pricingQualify:
      "Final pricing depends on pages, content, and how much has to be custom. Most contractor and home-service projects fall between $500 and $2,000. Exact quote after the free plan.",
    pricingDelivery: `Most builds take ${DELIVERY} weeks.`,
    pricingIntro:
      "You'll know the recommended scope before you commit to a project.",
    pricingNote:
      "The website plan is free. You only pay if you decide to build. Optional hosting, maintenance, and support are available after launch.",
    pricingHighlights: [
      "Custom scope and a written proposal before work begins",
      "Milestone-based payment option",
    ] as string[],
    monthlyTitle: "Keep us on after launch if you want to",
    monthlyCopy:
      "After launch, optional hosting, maintenance, and ongoing support are available if you want help keeping the site current. The proposal spells out what is included.",
    heroPrice: `Plans from $${LOW.toLocaleString("en-US")} to $${HIGH.toLocaleString("en-US")}. Most take ${DELIVERY} weeks.`,
    proofSupportLabel: "ongoing support",
    proofStartMetric: `$${LOW.toLocaleString("en-US")}–$${HIGH.toLocaleString("en-US")}`,
    costFaqAnswer:
      "Plans run from $500 to $2,000 depending on pages, photos, and extras. You'll get a written number before anything is built — the free plan is how we size it.",
    hostingFaqAnswer:
      "We can host the site after launch, or you can take it to your own provider. You own the website either way. The proposal states whose account the hosting sits in.",
    maintenanceFaqAnswer:
      "No. Ongoing maintenance and support are optional unless a specific proposal says otherwise. A lot of clients launch, settle in, and add help later. Hosting is separate — with us, or on your own provider.",
  },
  "es-419": {
    pricingTitle: `Planes desde ${LOW_ES} a ${HIGH_ES}`,
    pricingAnchor: `${LOW_ES}–${HIGH_ES}`,
    pricingQualify: `El precio final depende de las páginas, el contenido y cuánto hay que personalizar. La mayoría de proyectos para contratistas y servicios del hogar queda entre ${LOW_ES} y ${HIGH_ES}. La cotización exacta llega después del plan gratis.`,
    pricingDelivery: `La mayoría de proyectos toma de 6 a 12 semanas.`,
    pricingIntro:
      "Conocerás el alcance recomendado antes de comprometerte con un proyecto.",
    pricingNote:
      "El plan del sitio web es gratis. Solo pagas si decides construir. Hosting, mantenimiento y soporte opcionales están disponibles después del lanzamiento.",
    pricingHighlights: [
      "Alcance a medida y propuesta escrita antes de empezar",
      "Opción de pago por hitos",
    ],
    monthlyTitle: "Puedes seguir con nosotros después del lanzamiento",
    monthlyCopy:
      "Después del lanzamiento, hosting, mantenimiento y soporte continuo opcionales están disponibles si quieres ayuda para mantener el sitio al día. La propuesta detalla qué incluye.",
    heroPrice: `Planes desde ${LOW_ES} a ${HIGH_ES}. La mayoría toma de 6 a 12 semanas.`,
    proofSupportLabel: "soporte continuo",
    proofStartMetric: `${LOW_ES}–${HIGH_ES}`,
    costFaqAnswer: `Los planes van desde ${LOW_ES} a ${HIGH_ES}, según páginas, fotos y extras. Recibes un número por escrito antes de construir nada: el plan gratis es como lo dimensionamos.`,
    hostingFaqAnswer:
      "Podemos alojar el sitio después del lanzamiento, o puedes llevarlo a tu propio proveedor. El sitio es tuyo de cualquier forma. La propuesta indica en qué cuenta queda el hosting.",
    maintenanceFaqAnswer:
      "No. El mantenimiento y el soporte continuo son opcionales salvo que una propuesta diga lo contrario. Muchos clientes lanzan, se asientan y lo suman después. El hosting es aparte: con nosotros o en tu propio proveedor.",
  },
  "es-ES": {
    pricingTitle: `Planes desde ${LOW_ES} € a ${HIGH_ES} €`,
    pricingAnchor: `${LOW_ES} €–${HIGH_ES} €`,
    pricingQualify: `El precio final depende de las páginas, el contenido y cuánto hay que personalizar. La mayoría de proyectos para contratistas y servicios del hogar queda entre ${LOW_ES} € y ${HIGH_ES} €. La cotización exacta llega después del plan gratis.`,
    pricingDelivery: `La mayoría de proyectos toma de 6 a 12 semanas.`,
    pricingIntro:
      "Conocerás el alcance recomendado antes de comprometerte con un proyecto.",
    pricingNote:
      "El plan del sitio web es gratis. Solo pagas si decides construir. Hosting, mantenimiento y soporte opcionales están disponibles después del lanzamiento.",
    pricingHighlights: [
      "Alcance a medida y propuesta escrita antes de empezar",
      "Opción de pago por hitos",
    ],
    monthlyTitle: "Puedes seguir con nosotros después del lanzamiento",
    monthlyCopy:
      "Después del lanzamiento, hosting, mantenimiento y soporte continuo opcionales están disponibles si quieres ayuda para mantener el sitio al día. La propuesta detalla qué incluye.",
    heroPrice: `Planes desde ${LOW_ES} € a ${HIGH_ES} €. La mayoría toma de 6 a 12 semanas.`,
    proofSupportLabel: "soporte continuo",
    proofStartMetric: `${LOW_ES} €–${HIGH_ES} €`,
    costFaqAnswer: `Los planes van desde ${LOW_ES} € a ${HIGH_ES} €, según páginas, fotos y extras. Recibes un número por escrito antes de construir nada: el plan gratis es como lo dimensionamos.`,
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
    "Custom websites for contractors and home-service businesses. Built so customers can tell who you are, then call or request a quote. Plans from $500 to $2,000.",
  badge: "Custom websites for contractors",
  headline: "Your business has grown. Your website should show it.",
  headlineAccent: "",
  headlineLines: [
    "Your business has grown.",
    "Your website should show it.",
  ],
  marketLine:
    "Custom websites for contractors & home-service businesses.",
  subheadline:
    "Customers look you up before they call. If the site is slow, dated, or awkward on a phone, they don't wait around. We build custom websites for contractors and home-service businesses so the first impression matches the work you already do, and requesting a quote is obvious.",
  heroCtaLabel: CTA,
  headerCtaLabel: "Get My Website Plan",
  heroFinePrint: `No obligation. We'll reply within ${REPLY} with what a rebuild should fix first.`,
  heroPrice: softPricing.en.heroPrice,
  heroMeta: [
    "Custom-built, not a generic template",
    "Designed for the phone in their hand",
    "You own your website",
  ],
  heroStill: {
    src: A1_DESKTOP,
    mobileSrc: A1_MOBILE,
    alt: "A1 Property Services website on a laptop, built by KINEXIS",
  },

  formTitle: "Get your free website plan",
  formSubtitle: `Tell us about the business and the site you have now. Within ${REPLY}, we'll come back with what's costing you calls, and what a custom rebuild would actually take.`,
  submitLabel: "Send My Website Plan Request",
  continueLabel: "Continue",
  formCtaHint: `No obligation. We'll reply within ${REPLY}.`,
  formFootnote:
    "Your information is used to respond to your website plan request.",
  formAsideTitle: "What the plan covers",
  formAsideSubtitle:
    "If you already have a website, we look at the pages people actually use: how it feels on a phone, whether services are clear, and if calling or requesting a quote is obvious.",
  formStep1Title: "About the business",
  formStep2Title: "About the project",
  formStep3Title: "How should we reach you?",
  noWebsiteLabel: "I don't have a website yet",
  noWebsiteStatus:
    "Website skipped. You indicated you do not have a website yet.",
  investmentLabel: "What can you invest?",
  timelineLabel: "When do you want to start?",
  industryLabel: "What kind of work do you do?",
  websiteStatusLabel: "What's true of the current website?",
  goalLabel: "What should this site do first?",
  contactMethodLabel: "Best way to reach you",
  notesLabel: "Anything else we should know?",
  notesPlaceholder:
    "Towns you cover, services that have to be on the site, or what's frustrating about the current one.",
  consentLabel:
    "I agree to be contacted about this website plan request. We'll use the details above to follow up.",
  privacyMicrocopy:
    "Your information is used to respond to your website plan request.",
  successTitle: "We got your request",
  successCopy: `Thanks. We'll look at the current site, or the notes you sent, and reply within ${REPLY} with what a rebuild should fix first. If you'd rather talk it through, you can book a call below.`,
  inlineThankYou: true,
  bookingHref: "/contact",
  bookingCtaLabel: "Book a Website Strategy Call",

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
      title: "We send a website plan",
      detail: `Within ${REPLY}: what's weak now, what to change first, and how the site should be structured.`,
    },
    {
      title: "You get a clear recommendation",
      detail: "Scope and price in writing before anyone starts building.",
    },
  ],
  formTrust: [
    "No obligation",
    `Reply within ${REPLY}`,
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
  websiteStatusOptions: [
    { value: "none", label: "We do not have one" },
    { value: "outdated", label: "It looks outdated" },
    { value: "mobile", label: "It's hard to use on a phone" },
    { value: "inquiries", label: "It's not bringing in enough calls" },
    { value: "redesign", label: "We need a complete redesign" },
  ],
  goalOptions: [
    { value: "calls", label: "More calls" },
    { value: "quotes", label: "More quote requests" },
    { value: "credibility", label: "Look more established" },
    { value: "search", label: "Show up better in search" },
  ],
  budgetOptions: [
    { value: "500-2000", label: "$500–$2,000" },
    { value: "2000-3000", label: "$2,000–$3,000" },
    { value: "3000-5000", label: "$3,000–$5,000" },
    { value: "not-sure", label: "Not sure yet" },
  ],
  timelineOptions: [
    { value: "30-days", label: "Within 30 days" },
    { value: "1-3-months", label: "One to three months" },
    { value: "3-plus-months", label: "More than three months" },
  ],
  contactMethodOptions: [
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone" },
    { value: "either", label: "Either is fine" },
  ],

  outcomes: [
    {
      title: "Look established",
      body: "Looks like the company you already run",
    },
    {
      title: "Generate inquiries",
      body: "Call and quote buttons that are hard to miss",
    },
    {
      title: "Load quickly",
      body: "Fast on a phone, not just on office Wi‑Fi",
    },
    {
      title: "Own your website",
      body: "The site stays yours. No builder lock-in",
    },
  ],

  painEyebrow: "They look you up first",
  painTitle: "A weak website can make a strong business look small",
  painSubtitle:
    "Homeowners and property managers check the website before they pick up the phone. If it looks generic, loads slowly, or hides the number, a capable company can look like a side hustle. We rebuild that first impression around the work you actually do, the towns you cover, and a next step people can take without hunting for it.",
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
    "These are live websites, not mockups. Open them. Both companies needed the site to look as established as the crews already were.",
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
      label: "qualified leads / month",
    },
    {
      image: PLUMBING_DESKTOP,
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
      label: "emergency calls / month",
    },
  ],

  buildTitle: "What a contractor website has to include",
  ownershipStatement:
    "You own your website. No proprietary builder, and no monthly ransom to keep your own pages online.",
  sellPoints: [
    {
      title: "Built around your company",
      body: "Designed for the work you do, not a theme with your logo dropped in.",
    },
    {
      title: "Works on a phone",
      body: "Most customers look you up from a truck, a kitchen, or a job site.",
    },
    {
      title: "Makes calling easy",
      body: "Services are clear. Call and quote paths sit where a thumb can find them.",
    },
    {
      title: "Stays fast",
      body: "Lightweight pages so people don't bounce while the site is still loading.",
    },
    {
      title: "Ready for search",
      body: "Service pages, metadata, and the technical basics Google actually needs.",
    },
    {
      title: "Tracked from day one",
      body: "You'll be able to see whether the site is producing inquiries, not just visits.",
    },
  ],

  processTitle: "How a rebuild actually runs",
  processIntro:
    "You see the plan before we write a line of code. You approve the structure before the site gets built.",
  process: [
    {
      title: "Website plan",
      detail:
        "We look at the current site, the work you do, and what a visitor should do next.",
    },
    {
      title: "Structure and design",
      detail:
        "Pages, services, and the look of the site, approved before we build it.",
    },
    {
      title: "Development",
      detail:
        "We build the approved design in custom code. Not a page builder.",
    },
    {
      title: "Launch and tracking",
      detail:
        "The site goes live, analytics get connected, and the call and quote paths get checked.",
    },
  ],

  fitTitle: "Is this the right fit?",
  fitGoodTitle: "This is a good fit if",
  fitGoodItems: [
    "Contractor or home-service company",
    "The current site doesn't match the work",
    "The business has outgrown a basic website",
    "Wants a custom site the company actually owns",
    "Prepared to invest in a custom site (plans from $500)",
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
  pricing: [],

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
      label: "soft plan range",
    },
    { metric: "Optional", label: softPricing.en.proofSupportLabel },
  ],
  bulletsTitle: "What you actually get",
  bullets: [],

  closingTitle: "Get your free website plan",
  closingCopy: `If the current site is underselling the business, send the details. We'll reply within ${REPLY} with what a rebuild should fix first.`,
  closingFinePrint: `No obligation. Plans from $500 to $2,000. Reply within ${REPLY}.`,

  faqs: [
    {
      question: "How much does a custom website cost?",
      answer: softPricing.en.costFaqAnswer,
    },
    {
      question: "How soon will I hear back?",
      answer: `Within ${REPLY}. We'll look at the current site, or the notes you sent, and come back with what a rebuild should fix first.`,
    },
    {
      question: "Is this a WordPress template?",
      answer:
        "No. These are custom websites, built with Next.js and Tailwind CSS. Not a theme you could buy, and not a page builder.",
    },
    {
      question: "Will I own my website?",
      answer:
        "Yes. You own the finished website. You are not locked into a proprietary builder, and you don't pay a monthly ransom to keep your own pages online.",
    },
    {
      question: "Is hosting included?",
      answer: softPricing.en.hostingFaqAnswer,
    },
    {
      question: "Is SEO included?",
      answer:
        "The project includes a technical and on-page SEO foundation: service structure, metadata, and the indexing basics. Ongoing SEO and content work are a separate conversation.",
    },
    {
      question: "Can you redesign my existing website?",
      answer:
        "Yes. That's most of the work on this page. If the business has outgrown the current site, that's the starting point.",
    },
    {
      question: "How long does a project take?",
      answer: `Most contractor websites land in about ${DELIVERY} weeks. That depends on how quickly content and feedback come back. We won't quote a faster number just to win the click.`,
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

/** Spanish page WhatsApp CTAs — hero pill + plan text (nav is separate). */
const spanishWhatsApp = {
  heroLabel: "Escribir por WhatsApp",
  planLabel: "Escribir por WhatsApp",
  prefill:
    "Hola, me interesa el plan gratuito de sitio web para mi negocio.",
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
        pricing: [],
        monthlyTitle: softPricing.en.monthlyTitle,
        monthlyCopy: softPricing.en.monthlyCopy,
        heroPrice: softPricing.en.heroPrice,
      };

  if (isSpanishLocale(locale)) {
    const href = getBusinessWhatsAppHref(spanishWhatsApp.prefill);
    if (href) {
      next.whatsappHref = href;
      next.whatsappHeroLabel = spanishWhatsApp.heroLabel;
      next.whatsappPlanLabel = spanishWhatsApp.planLabel;
    }
  }

  // Spain euros / LatAm soft rewrites for any remaining money framing.
  return applyLocalePricing(next, locale);
}
