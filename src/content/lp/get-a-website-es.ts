/**
 * Full Spanish (LatAm base) body for /lp/get-a-website.
 * Pricing strings come from softPricing overlays in get-a-website.ts.
 */

import type { LandingPageEntry } from "@/content/registry/landing-pages";

const A1_DESKTOP = "/assets/images/lp/a1-desktop.webp?v=20261006d";
const A1_MOBILE = "/assets/images/lp/a1-mobile-3x.webp?v=20261006d";
const PLUMBING_DESKTOP = "/assets/images/lp/plumbing-desktop-still.webp?v=20261006d";
const MANOS_DESKTOP = "/assets/images/lp/manos-desktop.webp?v=20260930c";

/** Short hero/sticky label. Header uses a shorter label. */
const CTA = "Reservar llamada de 15 min";

export type SoftPricingCopy = {
  pricingTitle: string;
  pricingAnchor: string;
  pricingQualify: string;
  pricingDelivery: string;
  pricingIntro: string;
  pricingCloser: string;
  pricingCompareTitle: string;
  pricingCompare: { label: string; basic: string; custom: string }[];
  pricingNote: string;
  pricingHighlights: string[];
  basicName: string;
  basicPrice: string;
  basicFit: string;
  basicItems: string[];
  customName: string;
  customPrice: string;
  customFit: string;
  customItems: string[];
  monthlyTitle: string;
  monthlyCopy: string;
  heroPrice: string;
  proofSupportLabel: string;
  costFaqAnswer: string;
  hostingFaqAnswer: string;
  maintenanceFaqAnswer: string;
};

export function buildSpanishGetAWebsite(
  pricing: SoftPricingCopy,
): LandingPageEntry {
  const euros = pricing.customPrice.includes("€");
  const money = (amount: string, plus = false) =>
    `${amount}${euros ? " €" : ""}${plus ? "+" : ""}`;

  return {
    slug: "get-a-website",
    serviceHref: "/services/web-design",
    serviceLabel: "Diseño y desarrollo web",
    metaTitle: "Sitios web para contratistas",
    metaDescription: `Sitios para contratistas desde ${pricing.basicPrice}. El básico parte de un diseño ya probado. El a medida se diseña y se codifica alrededor del negocio, desde ${pricing.customPrice}.`,
    badge: "Sitios web para contratistas",
    headline: "Un sitio web hecho para traerte más negocio",
    headlineAccent: "",
    headlineLines: [
      "Un sitio web hecho para",
      "traerte más negocio",
    ],
    marketLine: "Trabajamos con contratistas y equipos de servicios del hogar.",
    subheadline:
      "Sitios para contratistas y negocios de servicios del hogar. Rápidos, pensados para el teléfono, listos para búsqueda, y hechos para convertir visitas en llamadas. Las solicitudes van en un sitio a medida.",
    heroCtaLabel: CTA,
    headerCtaLabel: "Llamada de 15 min",
    heroPrice: pricing.heroPrice,
    heroPortrait: {
      src: "/assets/images/lp/colton-wehr-819.webp?v=20261010c",
      srcSet:
        "/assets/images/lp/colton-wehr-480.webp?v=20261010c 480w, /assets/images/lp/colton-wehr-640.webp?v=20261010c 640w, /assets/images/lp/colton-wehr-819.webp?v=20261010c 676w",
      sizes: "2rem",
      alt: "Colton Wehr, desarrollador principal en KINEXIS",
      width: 676,
      height: 819,
      name: "Colton Wehr",
      role: "Diseñador y desarrollador web principal",
    },
    heroCredit: "Habla con Colton.",
    heroDevices: {
      src: "/assets/images/lp/hero-devices.webp?v=20261007d",
      srcSet:
        "/assets/images/lp/hero-devices-640.webp?v=20261007d 640w, /assets/images/lp/hero-devices-960.webp?v=20261007d 960w, /assets/images/lp/hero-devices-1440.webp?v=20261007d 1440w, /assets/images/lp/hero-devices-2048.webp?v=20261007d 2048w",
      sizes: "(max-width: 767px) 100vw, min(52rem, 50vw)",
      alt: "Sitios de A1 Property Services y Preferred Plumbing en laptops y teléfonos, hechos por KINEXIS",
      width: 2048,
      height: 726,
    },
    directIntro: {
      title: "Trabajas conmigo, no con un centro de llamadas.",
      body: "Soy Colton, diseñador y desarrollador web principal en Kinexis Digital. Construyo cada sitio yo mismo, así que trabajas conmigo desde la primera llamada hasta el lanzamiento. La llamada dura unos 15 minutos. Hablamos del negocio, lo que el sitio tiene que hacer y si encajamos. Si no encajamos, te lo digo.",
      points: [
        "El sitio terminado es tuyo.",
        "El dominio queda a tu nombre.",
      ],
      name: "Colton Wehr",
      role: "Diseñador y desarrollador web principal",
    },
    heroStill: {
      src: A1_DESKTOP,
      mobileSrc: A1_MOBILE,
      alt: "Sitio de A1 Property Services en una laptop, construido por KINEXIS",
    },

    formTitle: "Reserva una llamada de proyecto de 15 minutos",
    formSubtitle:
      "Cuéntanos del negocio y del sitio que tienes ahora. Si eres el dueño y empiezas en 3 meses, te llamamos el mismo día. Si no, te escribimos.",
    submitLabel: "Reservar mi llamada",
    continueLabel: "Continuar",
    formCtaHint: `Sin compromiso. ${pricing.heroPrice}`,
    formFootnote:
      "Usamos tu información para dar seguimiento a esta llamada.",
    formAsideTitle: "Qué cubre la llamada",
    formAsideSubtitle:
      "Si ya tienes un sitio, revisamos las páginas que la gente realmente usa: cómo se siente en el teléfono, si los servicios están claros, y si el número se toca fácil.",
    formStep1Title: "Sobre el negocio",
    formStep2Title: "Sobre el proyecto",
    formStep3Title: "¿Cómo te contactamos?",
    noWebsiteLabel: "Todavía no tengo un sitio web",
    noWebsiteStatus:
      "Sitio omitido. Indicaste que todavía no tienes un sitio web.",
    investmentLabel: "Presupuesto",
    timelineLabel: "¿Cuándo quieres empezar?",
    roleLabel: "Tu rol",
    industryLabel: "Tipo de trabajo",
    websiteStatusLabel: "Sitio actual",
    goalLabel: "¿Qué debería lograr este sitio primero?",
    contactMethodLabel: "Mejor forma de contactarte",
    notesLabel: "¿Algo más que debamos saber?",
    notesPlaceholder:
      "Pueblos que cubres, servicios que tienen que estar en el sitio, o qué te frustra del actual.",
    consentLabel:
      "Acepto que me contacten sobre esta llamada de proyecto. Usaremos los datos de arriba para dar seguimiento.",
    privacyMicrocopy: "Usamos tu información para dar seguimiento a esta llamada.",
    successTitle: "Listo",
    successCopy:
      "Tus datos ya están. Si eres el dueño y quieres empezar en 3 meses, te llamamos el mismo día. Si no, te escribimos.",
    calendarTitle: "Elige un horario de 15 minutos",
    calendarSubtitle:
      "Hora del Centro, días de semana. Si ninguno te sirve, te llamamos el mismo día.",
    inlineThankYou: true,
    bookingHref: "/contact",
    bookingCtaLabel: CTA,

    planHasSiteTitle: "Si ya tienes un sitio web",
    planHasSiteItems: [
      "Si la empresa se nota",
      "Cómo se ve en el teléfono",
      "Si el número se toca fácil",
      "Velocidad y búsqueda básica",
      "Qué cambiaríamos primero",
    ],
    planNoSiteTitle: "Si no tienes un sitio web",
    planNoSiteItems: [
      "Qué páginas necesitas",
      "Cómo agrupar los servicios",
      "Camino a una llamada",
      "Base móvil y de búsqueda",
      "Recomendación y precio",
    ],
    formSteps: [
      {
        title: "Cuéntanos del negocio",
        detail:
          "El trabajo que haces, quiénes son tus clientes y qué deben hacer en el sitio.",
      },
      {
        title: "Elige un horario si estás listo",
        detail: "Toma un espacio del calendario si alguno te sirve.",
      },
      {
        title: "Recibes el alcance y el precio",
        detail:
          "Escribimos el alcance y el precio antes de empezar cualquier trabajo.",
      },
    ],
    formTrust: [
      "Sin compromiso",
      "Una nota o una llamada",
      "Sirve con o sin sitio actual",
      "El sitio es tuyo",
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
      { value: "general-contractor", label: "Contratista general" },
      { value: "remodeling", label: "Remodelación" },
      { value: "roofing", label: "Techos" },
      { value: "plumbing", label: "Plomería" },
      { value: "hvac", label: "Climatización (HVAC)" },
      { value: "electrical", label: "Electricidad" },
      { value: "landscaping", label: "Paisajismo" },
      { value: "other-home-service", label: "Otro servicio del hogar" },
    ],
    roleOptions: [
      { value: "owner", label: "Dueño" },
      { value: "partner", label: "Socio" },
      { value: "manager", label: "Gerente" },
      { value: "employee", label: "Empleado" },
    ],
    websiteStatusOptions: [
      { value: "none", label: "Ninguno" },
      { value: "outdated", label: "Desactualizado" },
      { value: "not-bringing-calls", label: "No está trayendo llamadas" },
    ],
    goalOptions: [
      { value: "calls", label: "Más llamadas" },
      { value: "quotes", label: "Más solicitudes de cotización" },
      { value: "credibility", label: "Verse más establecido" },
      { value: "search", label: "Aparecer mejor en búsqueda" },
    ],
    budgetOptions: [
      { value: "500-1999", label: `${money("500")}–${money("1.999")}` },
      { value: "2000-4999", label: `${money("2.000")}–${money("4.999")}` },
      { value: "5000-plus", label: `${money("5.000", true)}` },
    ],
    timelineOptions: [
      { value: "30-days", label: "Próximos 30 días" },
      { value: "1-3-months", label: "1 a 3 meses" },
      { value: "researching", label: "Solo estoy investigando" },
    ],
    contactMethodOptions: [
      { value: "email", label: "Correo" },
      { value: "phone", label: "Teléfono" },
      { value: "either", label: "Cualquiera está bien" },
    ],

    outcomes: [
      {
        title: "Código propio",
        body: "Código a mano, sin page builder.",
      },
      {
        title: "Nombre y servicios",
        body: "El logo, los colores y el trabajo que haces están en la página. Un sitio a medida se diseña alrededor de la empresa.",
      },
      {
        title: "Número a un toque",
        body: "El teléfono queda donde un pulgar lo encuentra.",
      },
      {
        title: "Carga al instante",
        body: "Las páginas pesan poco, así la gente no se va mientras el sitio carga.",
      },
      {
        title: "El sitio es tuyo",
        body: "El sitio sigue siendo tuyo. No queda en un constructor.",
      },
    ],

    painEyebrow: "Primero te buscan",
    painTitle: "Un sitio débil puede hacer que un negocio fuerte se vea pequeño",
    painSubtitle:
      "Los dueños de casa y los administradores revisan el sitio antes de llamar. Si se ve genérico, carga lento u oculta el número, un equipo capaz puede parecer un trabajo de lado. Reconstruimos esa página alrededor del trabajo que haces, los pueblos que cubres, y un siguiente paso que se encuentre.",
    transformTitle: "Qué cambia una reconstrucción",
    transformBefore: {
      title: "Lo que ven ahora",
      items: [
        "Se ve como un tema genérico",
        "Se siente incómodo en el teléfono",
        "Los servicios cuestan seguirlos",
        "El botón de llamada se pierde",
        "Lento, y fácil de abandonar",
      ],
    },
    transformAfter: {
      title: "Lo que deberían ver",
      items: [
        "El nombre y los servicios se leen",
        "Hecho para usarse en el teléfono",
        "Servicios fáciles de revisar",
        "El botón de llamada queda a mano",
        "Lo bastante rápido para quedarse",
      ],
    },

    samplesTitle: "Sitios que ya funcionan para negocios reales",
    samplesIntro:
      "Estos son sitios en vivo, no maquetas. Ábrelos. Cada negocio necesitaba que el sitio se viera tan sólido como el trabajo que ya hacía.",
    testimonial: {
      quote:
        "El botón de cotización desaparecía en el teléfono. Después de la reconstrucción, la conversión pasó de 1,8% a 3,9%.",
      name: "Mac Christensen",
      role: "Dueño, A1 Property Services",
    },
    workCtaTitle: "Mira lo que podemos construir para tu negocio",
    samples: [
      {
        image: A1_DESKTOP,
        deviceShot: "/assets/images/lp/a1-devices.webp?v=20261007d",
        deviceShotSrcSet:
          "/assets/images/lp/a1-devices-640.webp?v=20261007d 640w, /assets/images/lp/a1-devices-960.webp?v=20261007d 960w, /assets/images/lp/a1-devices-1440.webp?v=20261007d 1440w, /assets/images/lp/a1-devices-1920.webp?v=20261007d 1920w",
        deviceShotSizes: "(max-width: 767px) 100vw, 34rem",
        imageAlt:
          "Sitio de A1 Property Services en una laptop, construido por KINEXIS",
        client: "A1 Property Services",
        kind: "Paisajismo y servicios de propiedad",
        industry: "Paisajismo",
        liveUrl: "https://a1pslandscape.com/",
        challenge:
          "Una empresa de paisajismo en Cedar Falls había superado un sitio de folleto. Los servicios estaban enterrados, y pedir una cotización en el teléfono costaba demasiado.",
        work: "Lo reconstruimos alrededor de páginas de servicio claras, estructura de búsqueda local, y un camino de cotización usable con un solo pulgar.",
        result: "Los leads calificados pasaron de 10 al mes a 28.",
        summary:
          "Una empresa de paisajismo en Cedar Falls había superado un sitio de folleto. Lo reconstruimos alrededor de páginas de servicio, estructura local, y un camino de cotización que funciona en el teléfono.",
        metric: "10 → 28",
        label: "leads/mes",
      },
      {
        image: PLUMBING_DESKTOP,
        deviceShot: "/assets/images/lp/plumbing-devices.webp?v=20261007d",
        deviceShotSrcSet:
          "/assets/images/lp/plumbing-devices-640.webp?v=20261007d 640w, /assets/images/lp/plumbing-devices-960.webp?v=20261007d 960w, /assets/images/lp/plumbing-devices-1440.webp?v=20261007d 1440w, /assets/images/lp/plumbing-devices-1920.webp?v=20261007d 1920w",
        deviceShotSizes: "(max-width: 767px) 100vw, 34rem",
        imageAlt:
          "Sitio de Preferred Plumbing Solutions en una laptop, construido por KINEXIS",
        client: "Preferred Plumbing Solutions",
        kind: "Servicios de plomería",
        industry: "Plomería",
        liveUrl: "https://www.callpreferredplumbing.com/",
        challenge:
          "Una empresa de plomería necesitaba un sitio que dejara el trabajo claro y hiciera que llamar desde el teléfono se sintiera como el siguiente paso natural.",
        work: "La reconstrucción priorizó claridad de servicios y confianza, y mantuvo el botón de llamada a mano en móvil.",
        result: "Las llamadas de emergencia pasaron de 22 al mes a 52.",
        summary:
          "Una empresa de plomería necesitaba un sitio que dejara los servicios claros y hiciera de llamar desde el teléfono el siguiente paso natural.",
        metric: "22 → 52",
        label: "llamadas de emergencia/mes",
      },
      {
        image: MANOS_DESKTOP,
        deviceShot: "/assets/images/lp/manos-devices.webp?v=20260930e",
        imageAlt:
          "Tienda de Manos Creativas en una laptop, construida por KINEXIS",
        client: "Manos Creativas",
        kind: "E-commerce de productos digitales",
        industry: "E-commerce",
        liveUrl: "https://bynmwcreative.com/",
        challenge:
          "Una marca de patrones de crochet digitales vendía entre marketplaces y un sitio flojo. Las fichas hablaban del archivo, no del resultado, y el checkout vivía fuera del sitio.",
        work: "Reconstruimos la tienda alrededor de colecciones claras, fichas orientadas a conversión y un camino de compra usable en el teléfono.",
        result: "Los pedidos mensuales pasaron de 32 a 78.",
        summary:
          "Una marca de patrones digitales necesitaba una tienda propia. La reconstruimos alrededor de colecciones, fichas de producto y un checkout que funciona en el teléfono.",
        metric: "32 → 78",
        label: "pedidos / mes",
      },
    ],

    buildTitle: "Qué tiene que incluir el sitio de un contratista",
    ownershipStatement:
      "El sitio es tuyo, y también el contenido y el código. No quedas atado a un constructor. El sitio corre en Cloudflare, y puedes pasarlo a tu propia cuenta de Cloudflare.",
    sellPoints: [
      {
        title: "Tus servicios están en la página",
        body: "Logo, colores y servicios en diseño probado. El a medida sigue tus pueblos.",
      },
      {
        title: "Funciona en el teléfono",
        body: "La mayoría te busca desde una camioneta, la cocina o la obra.",
      },
      {
        title: "Facilita llamar",
        body: "Servicios claros, y el número queda al alcance del pulgar.",
      },
      {
        title: "Se mantiene rápido",
        body: "Las páginas pesan poco, así nadie se va mientras el sitio carga.",
      },
      {
        title: "Listo para búsqueda",
        body: "Títulos y lo que Google necesita. El a medida puede sumar una página por servicio.",
      },
      {
        title: "Medido desde el día uno",
        body: "Ves las consultas que entran, no solo visitas que no llevan a nada.",
      },
    ],

    processTitle: "Cómo corre realmente una reconstrucción",
    processIntro: pricing.pricingDelivery,
    process: [
      {
        title: "Llamada de proyecto",
        detail:
          "Quince minutos sobre el sitio que tienes, el trabajo que buscas y dónde se están perdiendo las llamadas.",
      },
      {
        title: "Estructura y diseño",
        detail:
          "Ves las páginas, los servicios y el aspecto. No se construye nada hasta que apruebas ese plan.",
      },
      {
        title: "Desarrollo",
        detail:
          "Esas páginas se escriben en código. Sin tema que mantener, y sin un page builder en el medio.",
      },
      {
        title: "Lanzamiento y medición",
        detail:
          "Lo publicamos con la medición activa, y probamos el botón de llamada y el formulario en un teléfono antes de entregártelo.",
      },
    ],

    fitTitle: "¿Es el encaje correcto?",
    fitGoodTitle: "Es un buen encaje si",
    fitGoodItems: [
      "Tienes un negocio de contratista o servicio del hogar",
      "El sitio que tienes no muestra el trabajo",
      "Se ve genérico, o solo tiene unas páginas",
      "Quieres un sitio que sea tuyo",
      `Estás listo para invertir, ${pricing.basicPrice.charAt(0).toLowerCase()}${pricing.basicPrice.slice(1)}`,
      "Puedes enviar fotos y revisar los borradores",
    ],
    fitNotTitle: "Probablemente no es encaje si",
    fitNotItems: [
      "Quieres un sitio web gratis",
      "Lo necesitas en línea este fin de semana",
      "Estás buscando el precio más bajo",
      "No tienes tiempo para revisar borradores",
      "No vas a enviar fotos ni notas",
      "Quieres quedarte en un constructor",
    ],

    pricingTitle: pricing.pricingTitle,
    pricingAnchor: pricing.pricingAnchor,
    pricingQualify: pricing.pricingQualify,
    pricingIntro: pricing.pricingIntro,
    pricingCloser: pricing.pricingCloser,
    pricingCompareTitle: pricing.pricingCompareTitle,
    pricingCompare: pricing.pricingCompare,
    pricingNote: pricing.pricingNote,
    pricingHighlights: pricing.pricingHighlights,
    pricingAddOns: [],
    pricing: [
      {
        name: pricing.basicName,
        price: pricing.basicPrice,
        tag: pricing.basicFit,
        body: "Un sitio corto, fácil de llamar.",
        items: pricing.basicItems,
      },
      {
        name: pricing.customName,
        price: pricing.customPrice,
        tag: pricing.customFit,
        body: "Páginas escritas, un formulario y mejor SEO.",
        items: pricing.customItems,
        featured: true,
      },
    ],

    monthlyTitle: pricing.monthlyTitle,
    monthlyCopy: pricing.monthlyCopy,
    monthlyItems: [
      "Mantenimiento técnico",
      "Mejoras de SEO",
      "Actualizaciones de contenido razonables",
    ],

    proofIntro: "Trabajo publicado de clientes KINEXIS. Los resultados individuales varían.",
    proofTitle: "",
    proof: [
      { metric: "Código nuestro", label: "No un tema comprado" },
      { metric: "Es tuyo", label: "Sin atarte a un builder" },
      { metric: "Lista corta", label: "clientes activos" },
      { metric: "Opcional", label: pricing.proofSupportLabel },
    ],
    bulletsTitle: "Lo que realmente obtienes",
    bullets: [],

    closingTitle: "Reserva una llamada de proyecto de 15 minutos",
    closingCopy:
      "Si el sitio actual está vendiendo de menos al equipo, envía los detalles. Te respondemos el mismo día.",
    closingFinePrint: `Sin compromiso. ${pricing.heroPrice}`,

    faqs: [
      {
        question: "¿Cuánto cuesta un sitio web?",
        answer: pricing.costFaqAnswer,
      },
      {
        question: "¿Qué tan pronto me responden?",
        answer:
          "Si eres el dueño y quieres empezar en 3 meses, te llamamos el mismo día. Si no, te escribimos. Revisamos el sitio actual, o las notas que enviaste, y te decimos qué debería arreglar primero una reconstrucción.",
      },
      {
        question: "¿Es una plantilla de WordPress?",
        answer:
          "No. El básico parte de un diseño ya probado que ya codificamos, y luego ponemos tu logo, tus colores y tus servicios. Es código propio: no es un tema de WordPress, ni un page builder. El a medida se diseña y se codifica alrededor de tu negocio.",
      },
      {
        question: "¿Seré dueño de mi sitio web?",
        answer:
          "Sí. El sitio terminado, su contenido y su código son tuyos cuando se liquida el pago final. Está en Cloudflare, y lo movemos a tu propia cuenta de Cloudflare cuando lo pidas. El dominio queda a tu nombre.",
      },
      {
        question: "¿El hosting está incluido?",
        answer: pricing.hostingFaqAnswer,
      },
      {
        question: "¿El SEO está incluido?",
        answer:
          "El básico cubre títulos, descripciones e indexación en un sitio de hasta 4 páginas. El a medida suma una base más completa cuando el proyecto lo pide: una página por servicio, títulos y descripciones, estructura local, un sitemap e indexación. El posicionamiento, el Perfil de Empresa en Google y el SEO mensual siguen siendo opcionales después del lanzamiento.",
      },
      {
        question: "¿Pueden rediseñar mi sitio actual?",
        answer:
          "Sí. Eso es la mayor parte del trabajo en esta página. Si el negocio ha superado el sitio actual, ese es el punto de partida.",
      },
      {
        question: "¿Cuánto dura un proyecto?",
        answer:
          `${pricing.pricingDelivery} Depende de qué tan rápido vuelvan las fotos y el feedback.`,
      },
      {
        question: "¿Necesito mantenimiento mensual?",
        answer: pricing.maintenanceFaqAnswer,
      },
    ],
    stickyCtaLabel: CTA,
  };
}
