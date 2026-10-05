/**
 * Full Spanish (LatAm base) body for /lp/get-a-website.
 * Pricing strings come from softPricing overlays in get-a-website.ts.
 */

import type { LandingPageEntry } from "@/content/registry/landing-pages";

const A1_DESKTOP = "/assets/images/lp/a1-desktop.webp?v=20260930a";
const A1_MOBILE = "/assets/images/lp/a1-mobile-3x.webp?v=20260916g";
const PLUMBING_DESKTOP = "/assets/images/lp/plumbing-desktop-still.webp?v=20260916g";
const MANOS_DESKTOP = "/assets/images/lp/manos-desktop.webp?v=20260930c";

/** Short hero/sticky label. Header uses a shorter label. */
const CTA = "Reservar llamada de 15 min";
const REPLY = "Normalmente devolvemos la llamada el mismo día";

export type SoftPricingCopy = {
  pricingTitle: string;
  pricingAnchor: string;
  pricingQualify: string;
  pricingDelivery: string;
  pricingIntro: string;
  pricingNote: string;
  pricingHighlights: string[];
  basicName: string;
  basicPrice: string;
  basicItems: string[];
  customName: string;
  customPrice: string;
  customItems: string[];
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
  const euros = pricing.customPrice.includes("€");
  const money = (amount: string, plus = false) =>
    `${amount}${euros ? " €" : ""}${plus ? "+" : ""}`;

  return {
    slug: "get-a-website",
    serviceHref: "/services/web-design",
    serviceLabel: "Diseño y desarrollo web",
    metaTitle: "Sitios web a medida para contratistas",
    metaDescription: `Sitios web a medida para contratistas y negocios de servicios del hogar. Rápidos en el teléfono, hechos para conseguir llamadas, y el sitio es tuyo. ${pricing.pricingTitle}`,
    badge: "Sitios web a medida para contratistas",
    headline: "Un sitio web hecho para traerte más negocio",
    headlineAccent: "",
    headlineLines: [
      "Un sitio web hecho para",
      "traerte más negocio",
    ],
    marketLine: "Trabajamos con contratistas en todo Estados Unidos.",
    subheadline:
      "Sitios web a medida para contratistas y negocios de servicios del hogar. Rápidos, pensados para el teléfono, listos para búsqueda, y hechos para convertir visitas en llamadas y cotizaciones.",
    heroCtaLabel: CTA,
    headerCtaLabel: "Llamada de 15 min",
    heroFinePrint: `${pricing.pricingDelivery} Sin compromiso. ${REPLY}.`,
    heroPrice: pricing.heroPrice,
    heroMeta: ["A medida", "Sin plantillas", "El sitio es tuyo"],
    heroPortrait: {
      src: "/assets/images/lp/colton-wehr-819.webp?v=20261005p",
      srcSet:
        "/assets/images/lp/colton-wehr-480.webp?v=20261005p 480w, /assets/images/lp/colton-wehr-640.webp?v=20261005p 640w, /assets/images/lp/colton-wehr-819.webp?v=20261005p 676w",
      sizes: "2rem",
      alt: "Colton Wehr, desarrollador principal en KINEXIS",
      width: 676,
      height: 819,
      name: "Colton Wehr",
      role: "Diseñador y desarrollador web principal",
    },
    heroCredit: "Habla con Colton. Te llamo el mismo día.",
    heroDevices: {
      src: "/assets/images/lp/hero-devices-float.webp?v=20261005v",
      alt: "Sitios de A1 Property Services y Preferred Plumbing en laptops y teléfonos, hechos por KINEXIS",
      width: 1024,
      height: 512,
    },
    directIntro: {
      title: "Trabajas conmigo, no con un centro de llamadas.",
      body: "Soy Colton, el diseñador y desarrollador web principal detrás de KINEXIS. Construyo cada sitio yo mismo, y trabajas directo conmigo desde la primera conversación hasta el lanzamiento. Cuando pides una llamada, te respondo yo, normalmente el mismo día. Hablamos unos 15 minutos de tu negocio, de lo que necesitas del sitio, y de si encajamos. Si encajamos, te mando un alcance y un precio claros por escrito. Si no, te lo digo de frente.",
      points: [
        "A medida, sin plantillas.",
        "El sitio es tuyo.",
        "La mayoría sale en vivo en 2 a 6 semanas.",
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
    formSubtitle: `Cuéntanos del negocio y del sitio que tienes ahora. ${REPLY}.`,
    submitLabel: "Reservar mi llamada",
    continueLabel: "Continuar",
    formCtaHint: `Sin compromiso. ${pricing.pricingTitle} ${REPLY}.`,
    formFootnote:
      "Usamos tu información para dar seguimiento a esta llamada.",
    formAsideTitle: "Qué cubre la llamada",
    formAsideSubtitle:
      "Si ya tienes un sitio, revisamos las páginas que la gente realmente usa: cómo se siente en el teléfono, si los servicios están claros, y si llamar o pedir cotización es obvio.",
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
    successTitle: "Te llamamos",
    successCopy: "Tus datos ya están. Normalmente devolvemos la llamada el mismo día.",
    calendarTitle: "Elige un horario de 15 minutos",
    calendarSubtitle: `Hora del Centro, días de semana. ${REPLY} si ninguno de estos te sirve.`,
    inlineThankYou: true,
    bookingHref: "/contact",
    bookingCtaLabel: CTA,

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
          "El trabajo que haces, a quién sirves, y qué debe hacer el visitante.",
      },
      {
        title: "Elige un horario si estás listo",
        detail:
          "Dueños que empiezan en 3 meses ven el calendario. Los demás, una nota.",
      },
      {
        title: "Recibes una recomendación clara",
        detail:
          "Alcance y precio por escrito antes de que alguien empiece a construir.",
      },
    ],
    formTrust: [
      "Sin compromiso",
      REPLY,
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
        title: "Verse establecido",
        body: "Una imagen que coincide con la empresa que ya tienes.",
      },
      {
        title: "Generar consultas",
        body: "Llamar y cotizar queda donde el visitante lo encuentra.",
      },
      {
        title: "Cargar rápido",
        body: "Rápido en el teléfono, que es donde te buscan.",
      },
      {
        title: "Ser dueño de tu sitio",
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

    samplesTitle: "Sitios que ya funcionan para negocios reales",
    samplesIntro:
      "Estos son sitios en vivo, no maquetas. Ábrelos. Cada negocio necesitaba que el sitio se viera tan sólido como el trabajo que ya hacía.",
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
        deviceShot: "/assets/images/lp/a1-devices-float.webp?v=20261005v",
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
        deviceShot: "/assets/images/lp/plumbing-devices-float.webp?v=20261005v",
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
      "El sitio terminado es tuyo. No quedas atado a un constructor, y no pagas una cuota mensual solo para mantener tus páginas en línea.",
    sellPoints: [
      {
        title: "Hecho alrededor de tu empresa",
        body: "Partimos del trabajo que haces, no de un tema con tu logo encima.",
      },
      {
        title: "Funciona en el teléfono",
        body: "La mayoría te busca desde una camioneta, la cocina o la obra.",
      },
      {
        title: "Facilita llamar",
        body: "Los servicios están claros, y llamar o cotizar queda al alcance del pulgar.",
      },
      {
        title: "Se mantiene rápido",
        body: "Las páginas pesan poco, así la gente no se va mientras el sitio carga.",
      },
      {
        title: "Listo para búsqueda",
        body: "Páginas de servicio, y lo básico que Google necesita para entender el trabajo.",
      },
      {
        title: "Medido desde el día uno",
        body: "Puedes ver si el sitio trae consultas, no solo visitas.",
      },
    ],

    processTitle: "Cómo corre realmente una reconstrucción",
    processIntro:
      "Ves el alcance y el precio antes de que escribamos una línea de código. Apruebas la estructura antes de que se construya el sitio.",
    process: [
      {
        title: "Llamada de proyecto",
        detail:
          "Revisamos tu sitio, el trabajo que haces, y qué debería pasar después.",
      },
      {
        title: "Estructura y diseño",
        detail:
          "Apruebas las páginas, los servicios y el aspecto antes de construirlo.",
      },
      {
        title: "Desarrollo",
        detail:
          "Construimos ese diseño aprobado en código a medida. No un page builder.",
      },
      {
        title: "Lanzamiento y medición",
        detail:
          "Lanzamos el sitio, conectamos la medición y revisamos llamada y cotización.",
      },
    ],

    fitTitle: "¿Es el encaje correcto?",
    fitGoodTitle: "Es un buen encaje si",
    fitGoodItems: [
      "Eres contratista o empresa de servicios del hogar",
      "El sitio actual no refleja el trabajo",
      "El negocio ha superado un sitio básico",
      "Quieres un sitio a medida del que la empresa sea dueña",
      `Listo para invertir. ${pricing.pricingTitle}`,
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
    pricing: [
      {
        name: pricing.basicName,
        price: pricing.basicPrice,
        body: "Un sitio más corto para un equipo que necesita que suene el teléfono.",
        items: pricing.basicItems,
      },
      {
        name: pricing.customName,
        price: pricing.customPrice,
        body: "Un sitio de varias páginas, hecho alrededor del trabajo y las zonas que cubres.",
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
      { metric: "A medida", label: "No es plantilla" },
      { metric: "Es tuyo", label: "Sin atarte a un builder" },
      { metric: pricing.proofStartMetric, label: "la mayoría sale en vivo" },
      { metric: "Opcional", label: pricing.proofSupportLabel },
    ],
    bulletsTitle: "Lo que realmente obtienes",
    bullets: [],

    closingTitle: "Reserva una llamada de proyecto de 15 minutos",
    closingCopy: `Si el sitio actual está vendiendo de menos al equipo, envía los detalles. ${REPLY}.`,
    closingFinePrint: `Sin compromiso. ${pricing.pricingTitle} ${REPLY}.`,

    faqs: [
      {
        question: "¿Cuánto cuesta un sitio web a medida?",
        answer: pricing.costFaqAnswer,
      },
      {
        question: "¿Qué tan pronto me responden?",
        answer: `${REPLY}. Revisamos el sitio actual, o las notas que enviaste, y volvemos con lo que una reconstrucción debería arreglar primero.`,
      },
      {
        question: "¿Es una plantilla de WordPress?",
        answer:
          "No. Los construimos en código a medida, con Next.js y Tailwind. No un tema que se compra, ni un page builder.",
      },
      {
        question: "¿Seré dueño de mi sitio web?",
        answer:
          "Sí. El sitio terminado es tuyo. No quedas atado a un constructor, y no pagas una cuota mensual solo para mantener tus páginas en línea.",
      },
      {
        question: "¿El hosting está incluido?",
        answer: pricing.hostingFaqAnswer,
      },
      {
        question: "¿El SEO está incluido?",
        answer:
          "La construcción incluye la base de búsqueda: páginas de servicio, títulos y lo básico de indexación. El SEO continuo es una conversación aparte.",
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
        question: "¿Tengo que comprar mantenimiento mensual?",
        answer: pricing.maintenanceFaqAnswer,
      },
    ],
    stickyCtaLabel: CTA,
  };
}
