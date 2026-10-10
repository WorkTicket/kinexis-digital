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
import { getBusinessTelHref, getBusinessWhatsAppHref } from "@/lib/business";

const A1_DESKTOP = "/assets/images/lp/a1-desktop.webp?v=20261006d";
const A1_MOBILE = "/assets/images/lp/a1-mobile-3x.webp?v=20261006d";
const PLUMBING_DESKTOP = "/assets/images/lp/plumbing-desktop-still.webp?v=20261006d";

/** Sticky and header keep the call. The hero button names the free plan. */
const CTA = "Book a 15-Minute Project Call";
const DELIVERY = "Most sites go live in 2 to 6 weeks.";
const PRICE_LINE =
  "Basic websites from $500. Custom websites from $2,000+.";
const LOW_ES = formatEsInteger(500);
const HIGH_ES = formatEsInteger(2000);

/** Two starting prices. No $200/$120 addons. */
const softPricing = localeContent({
  en: {
    pricingTitle: "Pick the option that fits",
    pricingAnchor: "From $500",
    pricingQualify:
      "Basic stops at four pages, from $500: Home, About, Services, and Contact. It uses your logo, colors, and the notes you send, with a call button, titles, descriptions, and indexing.\n\nCustom starts at $2,000. The page count is set in the proposal. A six-page site can be Custom. So can a larger site. A 15-page site with writing on each page costs more. The exact price comes after the call, from the pages, the writing, and what the site has to do.\n\nCustom adds a contact form and writing for each page. Search setup can include a page for each service, titles and descriptions, local structure, a sitemap, and indexing. Booking, payments, a login for your clients, and photos are priced only if you need them. You approve the pages and the look before we build. You own the site, the content, and the code once the last payment clears. Most sites go live in 2 to 6 weeks, once photos and feedback come back.",
    pricingDelivery: DELIVERY,
    pricingIntro:
      "Basic starts from a proven layout, with your logo, colors, and services. Custom is designed and coded around your business. The proposal sets how many pages that takes.",
    pricingCloser:
      "Choose Basic if you need a short site people can call. Choose Custom for written pages, a contact form, and a fuller search setup. The proposal sets the page count.",
    pricingCompareTitle: "Side by side",
    pricingCompare: [
      { label: "Price", basic: "From $500", custom: "From $2,000+" },
      { label: "Pages", basic: "Up to 4", custom: "Set in the proposal" },
      { label: "Build", basic: "Proven layout", custom: "Designed and coded" },
      { label: "Page copy", basic: "From your notes", custom: "Written per page" },
      { label: "Design", basic: "Logo and colors", custom: "Custom design" },
      { label: "Contact", basic: "Call only", custom: "Call and form" },
      { label: "Search", basic: "Titles and indexing", custom: "Full SEO foundation" },
      { label: "Booking or shop", basic: "Not included", custom: "Quoted if needed" },
      { label: "Hosting and domain", basic: "Cloudflare Pages.\nDomain in your name", custom: "Cloudflare Pages.\nDomain in your name" },
      { label: "After launch", basic: "Optional care", custom: "Optional care" },
    ],
    pricingNote:
      "The call is free. You only pay if you decide to build.\n\nYour site runs on Cloudflare Pages. Managed care is optional. The monthly rate is in the proposal, and it covers watching the site and fixing problems. If you want the account in your name, we'll move the site to your own Cloudflare account when you ask. The domain is registered in your name.\n\nThe domain name, stock photos, and paid fonts or tools are charged at what they cost us. Ongoing search work, Google Business Profile, and ads stay optional. None of that is required to launch, or to keep the site.",
    pricingHighlights: [
      "Milestone-based payment option",
    ] as string[],
    basicName: "Basic",
    basicPrice: "From $500",
    basicFit: "Best for getting online",
    basicItems: [] as string[],
    customName: "Custom",
    customPrice: "From $2,000+",
    customFit: "Best for bringing in work",
    customItems: [] as string[],
    monthlyTitle: "Keep us on after launch if you want to",
    monthlyCopy:
      "After launch, the site stays on Cloudflare Pages. Managed care is optional. The proposal quotes a monthly rate for monitoring, fixes, and help with changes.",
    heroPrice: PRICE_LINE,
    proofSupportLabel: "ongoing support",
    costFaqAnswer:
      "Basic websites start at $500 and stop at four pages: Home, About, Services, and Contact. Custom websites start at $2,000. The page count is set on the call. A six-page site can start at that price. A 15-page site with writing on each page costs more. Booking, payments, and client portals are quoted only if the project needs them.",
    hostingFaqAnswer:
      "The site runs on Cloudflare Pages. Managed care is optional, and the monthly rate is in the proposal. It covers monitoring and fixes. The domain stays in your name. If you want to run it yourself, we'll move the site to your own Cloudflare account.",
    maintenanceFaqAnswer:
      "A monthly plan is optional. It can cover monitoring, fixes, and help with changes after launch. You still own the site without it. The proposal spells out the fee if you want that help.",
  },
  "es-419": {
    pricingTitle: "Elige la opción que encaja",
    pricingAnchor: `Desde ${LOW_ES}`,
    pricingQualify:
      `El básico se queda en cuatro páginas, desde ${LOW_ES}: Inicio, Nosotros, Servicios y Contacto. Usa tu logo, tus colores y el texto que envías, con un botón de llamada, títulos, descripciones e indexación.\n\nEl a medida empieza en ${HIGH_ES}. El número de páginas va en la propuesta. Un sitio de seis páginas puede ser a medida. Uno más grande también. Un sitio de 15 páginas, con texto en cada una, cuesta más. El precio exacto sale después de la llamada, según las páginas, el texto y lo que el sitio tiene que hacer.\n\nEl a medida suma un formulario y el texto escrito para cada página. La base de SEO puede incluir una página por servicio, títulos y descripciones, estructura local, un sitemap e indexación. Reservas, pagos, un acceso para tus clientes y fotos se cotizan solo si los necesitas. Apruebas las páginas y el aspecto antes de que construyamos. El sitio, el contenido y el código son tuyos cuando se liquida el último pago. La mayoría sale en vivo en 2 a 6 semanas, cuando vuelven las fotos y los comentarios.`,
    pricingDelivery: "La mayoría de los sitios sale en vivo en 2 a 6 semanas.",
    pricingIntro:
      "El básico parte de un diseño ya probado, con tu logo, tus colores y tus servicios. El a medida se diseña y se codifica alrededor de tu negocio. La propuesta fija cuántas páginas hacen falta.",
    pricingCloser:
      "Elige el básico si necesitas un sitio corto al que se pueda llamar. Elige el a medida para páginas escritas, un formulario y una base de SEO más completa. La propuesta fija las páginas.",
    pricingCompareTitle: "Lado a lado",
    pricingCompare: [
      { label: "Precio", basic: `Desde ${LOW_ES}`, custom: `Desde ${HIGH_ES}+` },
      { label: "Páginas", basic: "Hasta 4", custom: "En la propuesta" },
      { label: "Base", basic: "Diseño probado", custom: "Diseño y código" },
      { label: "Texto", basic: "Desde tus notas", custom: "Cada página" },
      { label: "Diseño", basic: "Logo y colores", custom: "Diseño a medida" },
      { label: "Contacto", basic: "Solo llamada", custom: "Llamada y formulario" },
      { label: "Búsqueda", basic: "Títulos e indexación", custom: "SEO completo" },
      { label: "Reservas o tienda", basic: "No incluido", custom: "Si lo necesitas" },
      { label: "Hosting y dominio", basic: "Cloudflare Pages.\nDominio a tu nombre", custom: "Cloudflare Pages.\nDominio a tu nombre" },
      { label: "Después", basic: "Cuidado opcional", custom: "Cuidado opcional" },
    ],
    pricingNote:
      "La llamada es gratis. Solo pagas si decides construir.\n\nTu sitio corre en Cloudflare Pages. El cuidado mensual es opcional. La tarifa va en la propuesta, y cubre vigilar el sitio y arreglar lo que falle. Si quieres la cuenta a tu nombre, movemos el sitio a tu propia cuenta de Cloudflare cuando lo pidas. El dominio queda registrado a tu nombre.\n\nEl dominio, las fotos de stock y las fuentes o herramientas de pago se cobran a lo que nos cuestan. El SEO continuo, el Perfil de Empresa en Google y los anuncios siguen siendo opcionales. No hacen falta para lanzar, ni para conservar el sitio.",
    pricingHighlights: [
      "Opción de pago por hitos",
    ],
    basicName: "Básico",
    basicPrice: `Desde ${LOW_ES}`,
    basicFit: "Para salir en línea",
    basicItems: [],
    customName: "A medida",
    customPrice: `Desde ${HIGH_ES}+`,
    customFit: "Para traer trabajo",
    customItems: [],
    monthlyTitle: "Puedes seguir con nosotros después del lanzamiento",
    monthlyCopy:
      "Después del lanzamiento, el sitio se queda en Cloudflare Pages. El cuidado mensual es opcional. La propuesta cotiza una tarifa por monitoreo, correcciones y ayuda con cambios.",
    heroPrice: `Sitios básicos desde ${LOW_ES}. Sitios a medida desde ${HIGH_ES}+.`,
    proofSupportLabel: "soporte continuo",
    costFaqAnswer: `Sitios básicos desde ${LOW_ES}. Se quedan en cuatro páginas: Inicio, Nosotros, Servicios y Contacto. Los sitios a medida empiezan en ${HIGH_ES}. Las páginas se fijan en la llamada. Un sitio de seis páginas puede empezar en ese precio. Un sitio de 15 páginas, con texto en cada una, cuesta más. Reservas, pagos y portales se cotizan solo si el proyecto los necesita.`,
    hostingFaqAnswer:
      "El sitio corre en Cloudflare Pages. El cuidado mensual es opcional, y la tarifa va en la propuesta. Cubre monitoreo y correcciones. El dominio queda a tu nombre. Si quieres operarlo tú, lo movemos a tu propia cuenta de Cloudflare.",
    maintenanceFaqAnswer:
      "Un plan mensual es opcional. Puede cubrir monitoreo, correcciones y ayuda con cambios después del lanzamiento. El sitio sigue siendo tuyo sin ese plan. Si quieres esa ayuda, el costo va en la propuesta.",
  },
  "es-ES": {
    pricingTitle: "Elige la opción que encaja",
    pricingAnchor: `Desde ${LOW_ES} €`,
    pricingQualify:
      `El básico se queda en cuatro páginas, desde ${LOW_ES} €: Inicio, Nosotros, Servicios y Contacto. Usa tu logo, tus colores y el texto que envías, con un botón de llamada, títulos, descripciones e indexación.\n\nEl a medida empieza en ${HIGH_ES} €. El número de páginas va en la propuesta. Un sitio de seis páginas puede ser a medida. Uno más grande también. Un sitio de 15 páginas, con texto en cada una, cuesta más. El precio exacto sale después de la llamada, según las páginas, el texto y lo que el sitio tiene que hacer.\n\nEl a medida suma un formulario y el texto escrito para cada página. La base de SEO puede incluir una página por servicio, títulos y descripciones, estructura local, un sitemap e indexación. Reservas, pagos, un acceso para tus clientes y fotos se presupuestan solo si los necesitas. Apruebas las páginas y el aspecto antes de que construyamos. El sitio, el contenido y el código son tuyos cuando se liquida el último pago. La mayoría sale en vivo en 2 a 6 semanas, cuando vuelven las fotos y los comentarios.`,
    pricingDelivery: "La mayoría de los sitios sale en vivo en 2 a 6 semanas.",
    pricingIntro:
      "El básico parte de un diseño ya probado, con tu logo, tus colores y tus servicios. El a medida se diseña y se codifica alrededor de tu negocio. La propuesta fija cuántas páginas hacen falta.",
    pricingCloser:
      "Elige el básico si necesitas un sitio corto al que se pueda llamar. Elige el a medida para páginas escritas, un formulario y una base de SEO más completa. La propuesta fija las páginas.",
    pricingCompareTitle: "Lado a lado",
    pricingCompare: [
      { label: "Precio", basic: `Desde ${LOW_ES} €`, custom: `Desde ${HIGH_ES} €+` },
      { label: "Páginas", basic: "Hasta 4", custom: "En la propuesta" },
      { label: "Base", basic: "Diseño probado", custom: "Diseño y código" },
      { label: "Texto", basic: "Desde tus notas", custom: "Cada página" },
      { label: "Diseño", basic: "Logo y colores", custom: "Diseño a medida" },
      { label: "Contacto", basic: "Solo llamada", custom: "Llamada y formulario" },
      { label: "Búsqueda", basic: "Títulos e indexación", custom: "SEO completo" },
      { label: "Reservas o tienda", basic: "No incluido", custom: "Si lo necesitas" },
      { label: "Hosting y dominio", basic: "Cloudflare Pages.\nDominio a tu nombre", custom: "Cloudflare Pages.\nDominio a tu nombre" },
      { label: "Después", basic: "Cuidado opcional", custom: "Cuidado opcional" },
    ],
    pricingNote:
      "La llamada es gratis. Solo pagas si decides construir.\n\nTu sitio corre en Cloudflare Pages. El cuidado mensual es opcional. La tarifa va en la propuesta, y cubre vigilar el sitio y arreglar lo que falle. Si quieres la cuenta a tu nombre, movemos el sitio a tu propia cuenta de Cloudflare cuando lo pidas. El dominio queda registrado a tu nombre.\n\nEl dominio, las fotos de stock y las fuentes o herramientas de pago se cobran a lo que nos cuestan. El SEO continuo, el Perfil de Empresa en Google y los anuncios siguen siendo opcionales. No hacen falta para lanzar, ni para conservar el sitio.",
    pricingHighlights: [
      "Opción de pago por hitos",
    ],
    basicName: "Básico",
    basicPrice: `Desde ${LOW_ES} €`,
    basicFit: "Para salir en línea",
    basicItems: [],
    customName: "A medida",
    customPrice: `Desde ${HIGH_ES} €+`,
    customFit: "Para traer trabajo",
    customItems: [],
    monthlyTitle: "Puedes seguir con nosotros después del lanzamiento",
    monthlyCopy:
      "Después del lanzamiento, el sitio se queda en Cloudflare Pages. El cuidado mensual es opcional. La propuesta presupuesta una tarifa por monitorización, correcciones y ayuda con cambios.",
    heroPrice: `Sitios básicos desde ${LOW_ES} €. Sitios a medida desde ${HIGH_ES} €+.`,
    proofSupportLabel: "soporte continuo",
    costFaqAnswer: `Sitios básicos desde ${LOW_ES} €. Se quedan en cuatro páginas: Inicio, Nosotros, Servicios y Contacto. Los sitios a medida empiezan en ${HIGH_ES} €. Las páginas se fijan en la llamada. Un sitio de seis páginas puede empezar en ese precio. Un sitio de 15 páginas, con texto en cada una, cuesta más. Reservas, pagos y portales se presupuestan solo si el proyecto los necesita.`,
    hostingFaqAnswer:
      "El sitio corre en Cloudflare Pages. El cuidado mensual es opcional, y la tarifa va en la propuesta. Cubre la monitorización y las correcciones. El dominio queda a tu nombre. Si quieres gestionarlo tú, lo movemos a tu propia cuenta de Cloudflare.",
    maintenanceFaqAnswer:
      "Un plan mensual es opcional. Puede cubrir la monitorización, las correcciones y la ayuda con cambios después del lanzamiento. El sitio sigue siendo tuyo sin ese plan. Si quieres esa ayuda, el coste va en la propuesta.",
  },
});

const baseGetAWebsite: LandingPageEntry = {
  slug: "get-a-website",
  serviceHref: "/services/web-design",
  serviceLabel: "Web design & development",
  metaTitle: "Contractor Websites",
  metaDescription:
    "Contractor websites from $500. Basic starts from a proven layout. Custom is designed and coded around the business, from $2,000+.",
  badge: "Websites for contractors",
  headline: "Get a Website Built to Bring You More Business",
  headlineAccent: "",
  headlineLines: [
    "Get a Website Built to",
    "Bring You More Business",
  ],
  marketLine: "Working with contractors and home-service crews",
  subheadline:
    "Websites for contractors and home-service businesses. Fast, mobile-first, SEO-ready, and built to turn visitors into calls. Quote requests are part of a Custom site.",
  heroCtaLabel: CTA,
  headerCtaLabel: "Book a 15-Min Call",
  heroPrice: softPricing.en.heroPrice,
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
  heroCredit: "Talk to Colton.",
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
    body: "I'm Colton, lead web designer and developer at Kinexis Digital. I build every site myself, so you work with me from the first call through launch. The call is about 15 minutes. We talk through the business, what the site needs to do, and whether we're a fit. If we're not, I'll say so.",
    points: [
      "You own the finished site.",
      "The domain stays in your name.",
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
  formSubtitle:
    "Tell us about the business and the site you have now. Owners starting within 3 months get a same-day call. Otherwise we send a note.",
  submitLabel: "Book my call",
  continueLabel: "Continue",
  formCtaHint: `No obligation. ${PRICE_LINE}`,
  formFootnote:
    "Your information is used to follow up on this call.",
  formAsideTitle: "What the call covers",
  formAsideSubtitle:
    "If you already have a website, we look at the pages people actually use: how it feels on a phone, whether services are clear, and whether the number is easy to tap.",
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
    "I agree to be contacted about this project call. These details are only used to follow up.",
  privacyMicrocopy: "Your information is used to follow up on this call.",
  successTitle: "You're in",
  successCopy:
    "Your details are in. If you own the company and want to start within 3 months, we call the same day. Otherwise we send a note.",
  calendarTitle: "Pick a 15-minute time",
  calendarSubtitle: "Central Time, weekdays. If none of these work, we call the same day.",
  inlineThankYou: true,
  bookingHref: "/contact",
  bookingCtaLabel: CTA,

  planHasSiteTitle: "If you already have a website",
  planHasSiteItems: [
    "Whether the company is obvious",
    "How it works on a phone",
    "Whether the number is easy",
    "Speed and search basics",
    "What we'd change first",
  ],
  planNoSiteTitle: "If you don't have a website",
  planNoSiteItems: [
    "Which pages you need",
    "How to group the services",
    "Path to a call",
    "Mobile and search setup",
    "Recommendation and price",
  ],
  formSteps: [
    {
      title: "Tell us about the business",
      detail:
        "The work you do, your customers, and what they should do on the site.",
    },
    {
      title: "Pick a time if you're ready",
      detail: "Grab a slot on the calendar if one of them works.",
    },
    {
      title: "You'll get the scope and price",
      detail:
        "We write the scope and the price down before any work on the site starts.",
    },
  ],
  formTrust: [
    "No obligation",
    "A note or a call",
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
      title: "Custom coded",
      body: "Hand-coded, not a page builder.",
    },
    {
      title: "Services are clear",
      body: "Your logo, colors, and the work you do are on the page. A Custom site is designed around the company.",
    },
    {
      title: "Number easy to tap",
      body: "The phone number sits where a thumb can find it.",
    },
    {
      title: "Fast on the phone",
      body: "Pages stay light, so people don't leave while the site is still loading.",
    },
    {
      title: "You own it",
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
      "Looks like a stock theme",
      "Awkward on a phone",
      "Services hard to follow",
      "Call button easy to miss",
      "Slow, and easy to bounce from",
    ],
  },
  transformAfter: {
    title: "What they should see",
    items: [
      "Your name and services are clear",
      "Built for a phone first",
      "Services a homeowner can scan",
      "Call button easy to tap",
      "Fast enough that people stay",
    ],
  },

  samplesTitle: "Sites already working for home-service companies",
  samplesIntro:
    "These are live websites, not mockups. Open them. Both companies needed the site to look as solid as the crews already were.",
  testimonial: {
    quote:
      "The quote button used to disappear on a phone. After the rebuild, conversion went from 1.8% to 3.9%.",
    name: "Mac Christensen",
    role: "Owner, A1 Property Services",
  },
  workCtaTitle: "See what we can build for your business",
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
      kind: "Plumbing services",
      industry: "Plumbing",
      liveUrl: "https://www.callpreferredplumbing.com/",
      challenge:
        "A plumbing company needed a site that made the work obvious and made calling from a phone feel like the natural next step.",
      work: "The rebuild put service clarity and trust first, then kept the call button in reach on mobile.",
      result: "Emergency calls went from 22 a month to 52.",
      summary:
        "A plumbing company needed a site that made services obvious and made calling from a phone the natural next step.",
      metric: "22 → 52",
      label: "emergency calls/mo",
    },
  ],

  buildTitle: "What a contractor website has to include",
  ownershipStatement:
    "You own your website, the content, and its code. You're not stuck in a builder. The site runs on Cloudflare, and you can move it to your own Cloudflare account.",
  sellPoints: [
    {
      title: "Your services are on the page",
      body: "Logo, colors, and services on a proven layout. Custom fits your towns.",
    },
    {
      title: "Works on a phone",
      body: "Most people look you up from a truck, a kitchen, or the job site.",
    },
    {
      title: "Makes calling easy",
      body: "Services stay clear, and the number sits where a thumb can reach.",
    },
    {
      title: "Stays fast",
      body: "Pages stay light, so people don't leave while the site is still loading.",
    },
    {
      title: "Ready for search",
      body: "Titles and what Google needs to read it. Custom can add a page per service.",
    },
    {
      title: "Tracked from day one",
      body: "You'll see new inquiries come in, not just visits that go nowhere.",
    },
  ],

  processTitle: "How a rebuild actually runs",
  processIntro: DELIVERY,
  process: [
    {
      title: "Project call",
      detail: "We look at your site, the work, and what should happen next.",
    },
    {
      title: "Structure and design",
      detail: "You approve pages, services, and the look before we build.",
    },
    {
      title: "Development",
      detail: "We build the approved design in code, not a page builder.",
    },
    {
      title: "Launch and tracking",
      detail: "We launch, connect tracking, and check the call button and form.",
    },
  ],

  fitTitle: "Is this the right fit?",
  fitGoodTitle: "This is a good fit if",
  fitGoodItems: [
    "You run a contractor or home-service company",
    "The site you have doesn't show the work",
    "It looks generic, or it only has a few pages",
    "You want a site you actually own",
    "You're ready to invest, starting at $500",
    "You can send photos and review the drafts",
  ],
  fitNotTitle: "Probably not a fit if",
  fitNotItems: [
    "You want a website for free",
    "You need it live this weekend",
    "You're shopping for the cheapest price",
    "You can't make time to review drafts",
    "You won't send photos or notes",
    "You want to stay in a page builder",
  ],

  pricingTitle: softPricing.en.pricingTitle,
  pricingAnchor: softPricing.en.pricingAnchor,
  pricingQualify: softPricing.en.pricingQualify,
  pricingIntro: softPricing.en.pricingIntro,
  pricingCloser: softPricing.en.pricingCloser,
  pricingCompareTitle: softPricing.en.pricingCompareTitle,
  pricingCompare: softPricing.en.pricingCompare,
  pricingNote: softPricing.en.pricingNote,
  pricingHighlights: softPricing.en.pricingHighlights,
  pricingAddOns: [],
  pricing: [
    {
      name: softPricing.en.basicName,
      price: softPricing.en.basicPrice,
      tag: softPricing.en.basicFit,
      body: "Look established. Easy to call.",
      items: softPricing.en.basicItems,
    },
    {
      name: softPricing.en.customName,
      price: softPricing.en.customPrice,
      tag: softPricing.en.customFit,
      body: "Written pages, a form, and a stronger search setup.",
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
    { metric: "Our code", label: "Not a bought theme" },
    { metric: "You own it", label: "No builder lock-in" },
    { metric: "Short roster", label: "active clients" },
    { metric: "Optional", label: softPricing.en.proofSupportLabel },
  ],
  bulletsTitle: "What you actually get",
  bullets: [],

  closingTitle: "Book a 15-minute project call",
  closingCopy:
    "If the current site is underselling the crew, send the details. We follow up the same day.",
  closingFinePrint: `No obligation. ${PRICE_LINE}`,

  faqs: [
    {
      question: "How much does a website cost?",
      answer: softPricing.en.costFaqAnswer,
    },
    {
      question: "How soon will I hear back?",
      answer:
        "If you own the company and want to start within 3 months, we call the same day. Otherwise we send a note. We'll look at the current site, or the notes you sent, and say what a rebuild should fix first.",
    },
    {
      question: "Is this a WordPress template?",
      answer:
        "No. Basic starts from a proven layout we already coded, then we fit your logo, colors, and services onto it. It is custom coded, not a WordPress theme, and not a page builder. Custom is designed and coded around your business.",
    },
    {
      question: "Will I own my website?",
      answer:
        "Yes. You own the finished site, its content, and its code once the final payment clears. It's deployed on Cloudflare, and we'll move it to your own Cloudflare account whenever you ask. The domain stays in your name.",
    },
    {
      question: "Is hosting included?",
      answer: softPricing.en.hostingFaqAnswer,
    },
    {
      question: "Is SEO included?",
      answer:
        "Basic covers titles, descriptions, and indexing on a site of up to 4 pages. Custom adds a fuller setup where the project needs it: a page for each service, titles and descriptions, local structure, a sitemap, and indexing. Rankings, Google Business Profile, and monthly SEO stay optional after launch.",
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
      question: "Do I need monthly maintenance?",
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

/** English gets the corner call button. Spanish gets WhatsApp only. */
const pageContact = {
  en: {
    callHeroLabel: "Call",
  },
  es: {
    whatsappHeroLabel: "Escribir por WhatsApp",
    whatsappPlanLabel: "Escribir por WhatsApp",
    prefill:
      "Hola, me interesa una llamada de 15 minutos sobre el sitio de mi negocio.",
  },
} as const;

/** Full locale entry: English base, or full Spanish body, plus call and WhatsApp. */
export function getAWebsiteForLocale(locale: Locale): LandingPageEntry {
  const next: LandingPageEntry = isSpanishLocale(locale)
    ? { ...spanishByLocale[locale] }
    : {
        ...baseGetAWebsite,
        pricingTitle: softPricing.en.pricingTitle,
        pricingAnchor: softPricing.en.pricingAnchor,
        pricingQualify: softPricing.en.pricingQualify,
        pricingIntro: softPricing.en.pricingIntro,
        pricingCloser: softPricing.en.pricingCloser,
        pricingCompareTitle: softPricing.en.pricingCompareTitle,
        pricingCompare: softPricing.en.pricingCompare,
        pricingNote: softPricing.en.pricingNote,
        pricingHighlights: softPricing.en.pricingHighlights,
        pricingAddOns: [],
        pricing: baseGetAWebsite.pricing,
        monthlyTitle: softPricing.en.monthlyTitle,
        monthlyCopy: softPricing.en.monthlyCopy,
        heroPrice: softPricing.en.heroPrice,
      };

  if (!isSpanishLocale(locale) && getBusinessTelHref()) {
    next.callHeroLabel = pageContact.en.callHeroLabel;
  }
  if (isSpanishLocale(locale)) {
    const href = getBusinessWhatsAppHref(pageContact.es.prefill);
    if (href) {
      next.whatsappHref = href;
      next.whatsappHeroLabel = pageContact.es.whatsappHeroLabel;
      next.whatsappPlanLabel = pageContact.es.whatsappPlanLabel;
    }
  }

  // Spain euros / LatAm soft rewrites for any remaining money framing.
  return applyLocalePricing(next, locale);
}
