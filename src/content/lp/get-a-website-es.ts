/**
 * Full Spanish (LatAm base) body for /lp/get-a-website.
 * Pricing strings come from softPricing overlays in get-a-website.ts.
 */

import type { LandingPageEntry } from "@/content/registry/landing-pages";

const A1_DESKTOP = "/assets/images/lp/a1-desktop.webp?v=20260916g";
const A1_MOBILE = "/assets/images/lp/a1-mobile-3x.webp?v=20260916g";
const PLUMBING_DESKTOP = "/assets/images/lp/plumbing-desktop-still.webp?v=20260916g";

/** Short hero/sticky label — long form title stays on the plan section. */
const CTA = "Obtener mi plan gratis";
const REPLY = "un día hábil";

export type SoftPricingCopy = {
  pricingTitle: string;
  pricingAnchor: string;
  pricingQualify: string;
  pricingDelivery: string;
  pricingIntro: string;
  pricingNote: string;
  pricingHighlights: string[];
  monthlyTitle: string;
  monthlyCopy: string;
  heroPrice: string;
  proofSupportLabel: string;
  proofStartMetric: string;
  costFaqAnswer: string;
  hostingFaqAnswer: string;
  maintenanceFaqAnswer: string;
};

export function buildSpanishGetAWebsite(
  pricing: SoftPricingCopy,
): LandingPageEntry {
  const euros = pricing.proofStartMetric.includes("€");
  const money = (amount: string, plus = false) =>
    `${amount}${euros ? " €" : ""}${plus ? "+" : ""}`;
  const lowLabel = money("500");
  const highLabel = money("2.000");

  return {
    slug: "get-a-website",
    serviceHref: "/services/web-design",
    serviceLabel: "Diseño y desarrollo web",
    metaTitle: "Sitios web a medida para contratistas",
    metaDescription: `Sitios web a medida para contratistas y negocios de servicios del hogar. Hechos para que el cliente sepa quién eres y pueda llamar o pedir una cotización. Planes desde ${lowLabel} a ${highLabel}.`,
    badge: "Sitios web a medida para contratistas",
    headline: "Tu negocio ha crecido. Tu sitio web debería mostrarlo.",
    headlineAccent: "",
    headlineLines: [
      "Tu negocio ha crecido.",
      "Tu sitio web debería mostrarlo.",
    ],
    marketLine:
      "Sitios web a medida para contratistas y negocios de servicios del hogar.",
    subheadline:
      "Los clientes te buscan antes de llamar. Si el sitio es lento, anticuado o incómodo en el teléfono, no se quedan. Construimos sitios a medida para contratistas y servicios del hogar para que la primera impresión coincida con el trabajo que ya haces, y pedir una cotización sea obvio.",
    heroCtaLabel: CTA,
    headerCtaLabel: "Obtener mi plan de sitio web",
    heroFinePrint: `Sin compromiso. Respondemos en ${REPLY} con lo que una reconstrucción debería arreglar primero.`,
    heroPrice: pricing.heroPrice,
    heroMeta: [
      "Hecho a medida, no una plantilla genérica",
      "Diseñado para el teléfono en su mano",
      "El sitio es tuyo",
    ],
    heroStill: {
      src: A1_DESKTOP,
      mobileSrc: A1_MOBILE,
      alt: "Sitio de A1 Property Services en una laptop, construido por KINEXIS",
    },

    formTitle: "Obtén tu plan gratis de sitio web",
    formSubtitle: `Cuéntanos del negocio y del sitio que tienes ahora. En ${REPLY} te respondemos con lo que te está costando llamadas, y qué implicaría una reconstrucción a medida.`,
    submitLabel: "Enviar mi solicitud de plan",
    continueLabel: "Continuar",
    formCtaHint: `Sin compromiso. Respondemos en ${REPLY}.`,
    formFootnote:
      "Usamos tu información para responder a tu solicitud de plan de sitio web.",
    formAsideTitle: "Qué cubre el plan",
    formAsideSubtitle:
      "Si ya tienes un sitio, revisamos las páginas que la gente realmente usa: cómo se siente en el teléfono, si los servicios están claros, y si llamar o pedir cotización es obvio.",
    formStep1Title: "Sobre el negocio",
    formStep2Title: "Sobre el proyecto",
    formStep3Title: "¿Cómo te contactamos?",
    noWebsiteLabel: "Todavía no tengo un sitio web",
    noWebsiteStatus:
      "Sitio omitido. Indicaste que todavía no tienes un sitio web.",
    investmentLabel: "¿Cuánto puedes invertir?",
    timelineLabel: "¿Cuándo quieres empezar?",
    industryLabel: "¿Qué tipo de trabajo haces?",
    websiteStatusLabel: "¿Qué es cierto del sitio actual?",
    goalLabel: "¿Qué debería lograr este sitio primero?",
    contactMethodLabel: "Mejor forma de contactarte",
    notesLabel: "¿Algo más que debamos saber?",
    notesPlaceholder:
      "Pueblos que cubres, servicios que tienen que estar en el sitio, o qué te frustra del actual.",
    consentLabel:
      "Acepto que me contacten sobre esta solicitud de plan de sitio web. Usaremos los datos de arriba para dar seguimiento.",
    privacyMicrocopy:
      "Usamos tu información para responder a tu solicitud de plan de sitio web.",
    successTitle: "Recibimos tu solicitud",
    successCopy: `Gracias. Revisaremos el sitio actual, o las notas que enviaste, y responderemos en ${REPLY} con lo que una reconstrucción debería arreglar primero. Si prefieres hablarlo, puedes agendar una llamada abajo.`,
    inlineThankYou: true,
    bookingHref: "/contact",
    bookingCtaLabel: "Agendar una llamada de estrategia web",

    planHasSiteTitle: "Si ya tienes un sitio web",
    planHasSiteItems: [
      "Si se parece a la empresa detrás",
      "Cómo se comporta en un teléfono",
      "Si llamar o pedir cotización es obvio",
      "Velocidad y lo básico de búsqueda",
      "Qué cambiaríamos primero en una reconstrucción",
    ],
    planNoSiteTitle: "Si todavía no tienes un sitio web",
    planNoSiteItems: [
      "Las páginas que realmente necesitas",
      "Cómo organizar los servicios",
      "El camino principal a una llamada o cotización",
      "Una base móvil y de búsqueda",
      "Una recomendación clara de construcción y precio",
    ],
    formSteps: [
      {
        title: "Nos cuentas del negocio",
        detail:
          "El trabajo que haces, a quién sirves, y qué debería hacer el visitante después.",
      },
      {
        title: "Te enviamos un plan de sitio web",
        detail: `En ${REPLY}: qué está débil ahora, qué cambiar primero, y cómo debería estructurarse el sitio.`,
      },
      {
        title: "Recibes una recomendación clara",
        detail: "Alcance y precio por escrito antes de que alguien empiece a construir.",
      },
    ],
    formTrust: [
      "Sin compromiso",
      `Respuesta en ${REPLY}`,
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
    websiteStatusOptions: [
      { value: "none", label: "No tenemos uno" },
      { value: "outdated", label: "Se ve anticuado" },
      { value: "mobile", label: "Es difícil de usar en el teléfono" },
      { value: "inquiries", label: "No está trayendo suficientes llamadas" },
      { value: "redesign", label: "Necesitamos un rediseño completo" },
    ],
    goalOptions: [
      { value: "calls", label: "Más llamadas" },
      { value: "quotes", label: "Más solicitudes de cotización" },
      { value: "credibility", label: "Verse más establecido" },
      { value: "search", label: "Aparecer mejor en búsqueda" },
    ],
    budgetOptions: [
      { value: "500-2000", label: `${money("500")}–${money("2.000")}` },
      { value: "2000-3000", label: `${money("2.000")}–${money("3.000")}` },
      { value: "3000-5000", label: `${money("3.000")}–${money("5.000")}` },
      { value: "not-sure", label: "Aún no estoy seguro" },
    ],
    timelineOptions: [
      { value: "30-days", label: "En los próximos 30 días" },
      { value: "1-3-months", label: "De uno a tres meses" },
      { value: "3-plus-months", label: "Más de tres meses" },
    ],
    contactMethodOptions: [
      { value: "email", label: "Correo" },
      { value: "phone", label: "Teléfono" },
      { value: "either", label: "Cualquiera está bien" },
    ],

    outcomes: [
      {
        title: "Verse establecido",
        body: "Se ve como la empresa que ya diriges",
      },
      {
        title: "Generar consultas",
        body: "Botones de llamada y cotización difíciles de pasar por alto",
      },
      {
        title: "Cargar rápido",
        body: "Rápido en el teléfono, no solo en el Wi‑Fi de la oficina",
      },
      {
        title: "Ser dueño de tu sitio",
        body: "El sitio sigue siendo tuyo. Sin atarte a un constructor",
      },
    ],

    painEyebrow: "Primero te buscan",
    painTitle: "Un sitio débil puede hacer que un negocio fuerte se vea pequeño",
    painSubtitle:
      "Dueños de casa y administradores de propiedades revisan el sitio antes de marcar. Si se ve genérico, carga lento u oculta el número, una empresa capaz puede parecer un trabajo secundario. Reconstruimos esa primera impresión alrededor del trabajo que realmente haces, los pueblos que cubres, y un siguiente paso que la gente pueda tomar sin buscarlo.",
    transformTitle: "Qué cambia una reconstrucción",
    transformBefore: {
      title: "Lo que ven ahora",
      items: [
        "Parece una plantilla",
        "Incómodo en el teléfono",
        "Servicios difíciles de seguir",
        "Botón de llamada fácil de pasar por alto",
        "Lento, y fácil de abandonar",
      ],
    },
    transformAfter: {
      title: "Lo que deberían ver",
      items: [
        "Se ve como tu empresa",
        "Hecho primero para el teléfono",
        "Servicios que un dueño de casa puede escanear",
        "Llamada y cotización a mano",
        "Lo bastante rápido para que la gente se quede",
      ],
    },

    samplesTitle: "Sitios que ya funcionan para empresas de servicios del hogar",
    samplesIntro:
      "Estos son sitios en vivo, no maquetas. Ábrelos. Ambas empresas necesitaban que el sitio se viera tan establecido como ya lo eran sus equipos.",
    testimonial: {
      quote:
        "El botón de cotización desaparecía en el teléfono. Después de la reconstrucción, la conversión pasó de 1,8% a 3,9%.",
      name: "A1 Property Services",
      role: "Paisajismo · caso publicado",
    },
    workCtaTitle: "Mira lo que construiríamos para tu negocio",
    samples: [
      {
        image: A1_DESKTOP,
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
        label: "leads calificados / mes",
      },
      {
        image: PLUMBING_DESKTOP,
        imageAlt:
          "Sitio de Preferred Plumbing Solutions en una laptop, construido por KINEXIS",
        client: "Preferred Plumbing Solutions",
        kind: "Plomería y servicios de construcción",
        industry: "Plomería",
        liveUrl: "https://www.callpreferredplumbing.com/",
        challenge:
          "Una empresa de plomería y construcción necesitaba un sitio que dejara el trabajo claro y hiciera que llamar desde el teléfono se sintiera como el siguiente paso natural.",
        work: "La reconstrucción priorizó claridad de servicios y confianza, y mantuvo el botón de llamada a mano en móvil.",
        result: "Las llamadas de emergencia pasaron de 22 al mes a 52.",
        summary:
          "Una empresa de plomería y construcción necesitaba un sitio que dejara los servicios claros y hiciera de llamar desde el teléfono el siguiente paso natural.",
        metric: "22 → 52",
        label: "llamadas de emergencia / mes",
      },
    ],

    buildTitle: "Qué tiene que incluir el sitio de un contratista",
    ownershipStatement:
      "El sitio es tuyo. Sin constructor propietario, y sin un rescate mensual para mantener tus propias páginas en línea.",
    sellPoints: [
      {
        title: "Hecho alrededor de tu empresa",
        body: "Diseñado para el trabajo que haces, no un tema con tu logo puesto encima.",
      },
      {
        title: "Funciona en el teléfono",
        body: "La mayoría de clientes te buscan desde una camioneta, la cocina o una obra.",
      },
      {
        title: "Facilita llamar",
        body: "Los servicios están claros. Llamada y cotización donde el pulgar los encuentra.",
      },
      {
        title: "Se mantiene rápido",
        body: "Páginas ligeras para que la gente no se vaya mientras el sitio sigue cargando.",
      },
      {
        title: "Listo para búsqueda",
        body: "Páginas de servicio, metadatos y lo técnico básico que Google realmente necesita.",
      },
      {
        title: "Medido desde el día uno",
        body: "Podrás ver si el sitio produce consultas, no solo visitas.",
      },
    ],

    processTitle: "Cómo corre realmente una reconstrucción",
    processIntro:
      "Ves el plan antes de que escribamos una línea de código. Apruebas la estructura antes de que se construya el sitio.",
    process: [
      {
        title: "Plan de sitio web",
        detail:
          "Revisamos el sitio actual, el trabajo que haces, y qué debería hacer el visitante después.",
      },
      {
        title: "Estructura y diseño",
        detail:
          "Páginas, servicios y el aspecto del sitio, aprobados antes de construirlo.",
      },
      {
        title: "Desarrollo",
        detail:
          "Construimos el diseño aprobado en código a medida. No un page builder.",
      },
      {
        title: "Lanzamiento y medición",
        detail:
          "El sitio sale en vivo, se conecta la analítica, y se revisan los caminos de llamada y cotización.",
      },
    ],

    fitTitle: "¿Es el encaje correcto?",
    fitGoodTitle: "Es un buen encaje si",
    fitGoodItems: [
      "Eres contratista o empresa de servicios del hogar",
      "El sitio actual no refleja el trabajo",
      "El negocio ha superado un sitio básico",
      "Quieres un sitio a medida del que la empresa sea dueña",
      `Estás preparado para invertir en un sitio a medida (planes desde ${lowLabel})`,
      "Puedes enviar fotos, servicios y feedback",
    ],
    fitNotTitle: "Probablemente no es encaje si",
    fitNotItems: [
      "Buscas un sitio gratis",
      "Quieres una plantilla terminada este fin de semana",
      "Estás comprando la opción más barata",
      "No puedes dedicar tiempo a revisar borradores",
    ],

    pricingTitle: pricing.pricingTitle,
    pricingAnchor: pricing.pricingAnchor,
    pricingQualify: pricing.pricingQualify,
    pricingDelivery: pricing.pricingDelivery,
    pricingIntro: pricing.pricingIntro,
    pricingNote: pricing.pricingNote,
    pricingHighlights: pricing.pricingHighlights,
    pricingAddOns: [],
    pricing: [],

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
      { metric: "A medida", label: "No es plantilla" },
      { metric: "Es tuyo", label: "Sin atarte a un builder" },
      { metric: pricing.proofStartMetric, label: "rango de planes" },
      { metric: "Opcional", label: pricing.proofSupportLabel },
    ],
    bulletsTitle: "Lo que realmente obtienes",
    bullets: [],

    closingTitle: "Obtén tu plan gratis de sitio web",
    closingCopy: `Si el sitio actual está vendiendo de menos al negocio, envía los detalles. Respondemos en ${REPLY} con lo que una reconstrucción debería arreglar primero.`,
    closingFinePrint: `Sin compromiso. Planes desde ${lowLabel} a ${highLabel}. Respuesta en ${REPLY}.`,

    faqs: [
      {
        question: "¿Cuánto cuesta un sitio web a medida?",
        answer: pricing.costFaqAnswer,
      },
      {
        question: "¿Qué tan pronto me responden?",
        answer: `En ${REPLY}. Revisamos el sitio actual, o las notas que enviaste, y volvemos con lo que una reconstrucción debería arreglar primero.`,
      },
      {
        question: "¿Es una plantilla de WordPress?",
        answer:
          "No. Son sitios a medida, construidos con Next.js y Tailwind CSS. No un tema que podrías comprar, ni un page builder.",
      },
      {
        question: "¿Seré dueño de mi sitio web?",
        answer:
          "Sí. Eres dueño del sitio terminado. No quedas atado a un constructor propietario, y no pagas un rescate mensual para mantener tus propias páginas en línea.",
      },
      {
        question: "¿El hosting está incluido?",
        answer: pricing.hostingFaqAnswer,
      },
      {
        question: "¿El SEO está incluido?",
        answer:
          "El proyecto incluye una base técnica y on-page de SEO: estructura de servicios, metadatos y lo básico de indexación. SEO continuo y contenido son una conversación aparte.",
      },
      {
        question: "¿Pueden rediseñar mi sitio actual?",
        answer:
          "Sí. Eso es la mayor parte del trabajo en esta página. Si el negocio ha superado el sitio actual, ese es el punto de partida.",
      },
      {
        question: "¿Cuánto dura un proyecto?",
        answer:
          "La mayoría de sitios para contratistas quedan en unas 6 a 12 semanas. Depende de qué tan rápido vuelvan el contenido y el feedback. No cotizamos un número más corto solo para ganar el clic.",
      },
      {
        question: "¿Tengo que comprar mantenimiento mensual?",
        answer: pricing.maintenanceFaqAnswer,
      },
    ],
    stickyCtaLabel: CTA,
  };
}
