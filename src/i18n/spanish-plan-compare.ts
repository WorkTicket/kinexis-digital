/**
 * Spanish (LATAM /es) copies of plan comparison + ownership matrices.
 * Prices and numeric terms must match English / docs/CONTENT.md — do not invent figures.
 */
import type { CheckoutPlan } from "@/lib/pay";
import { CHECKOUT_PLANS } from "@/lib/pay";
import {
  OWNERSHIP_COMPARE,
  PLAN_COMPARISON,
  type CatalogPlan,
} from "@/lib/plans-catalog";
import { spanishPlans } from "@/i18n/spanish-plans";

export type ComparisonSection = {
  group: string;
  rows: [string, string, string, string, string][];
};

export type OwnershipCompareData = {
  headline: string;
  intro: string;
  rows: { path: string; cost24: string; ownership: string; afterCancel: string }[];
  footnote: string;
  labels: {
    cost24: string;
    ownership: string;
    afterCancel: string;
    path: string;
    aria: string;
  };
};

/** Identity for English defaults — keeps PlanCompare typed without importing twice. */
export const EN_PLAN_COMPARISON = PLAN_COMPARISON as ComparisonSection[];
export const EN_OWNERSHIP = {
  ...OWNERSHIP_COMPARE,
  labels: {
    cost24: "24-month illustration",
    ownership: "Ownership",
    afterCancel: "If you leave",
    path: "Path",
    aria: "Ownership comparison",
  },
} satisfies OwnershipCompareData;

export const ES_PLAN_COMPARISON: ComparisonSection[] = [
  {
    group: "El sitio",
    rows: [
      ["Sitio web profesional a medida", "Sí", "Sí", "Sí", "Sí"],
      ["Hosting, SSL y respaldos", "Sí", "Sí", "Sí", "12 meses"],
      ["Dominio (año 1)", "Incluido", "Incluido", "Incluido", "Incluido"],
      ["Formularios de contacto", "Sí", "Sí", "Sí", "Sí"],
      ["Diseño para celular", "Sí", "Sí", "Sí", "Sí"],
      ["Páginas incluidas", "Hasta 5", "Hasta 10", "Hasta 20", "Hasta 10"],
      ["Cambios chicos del sitio", "2 / mes", "Sin tope", "Sin tope", "30 min / mes"],
      ["Páginas nuevas", "$99 cada una", "1 / mes", "2 / mes", "Cotizado"],
      ["Archivos del sitio incluidos", "—", "—", "—", "Sí"],
    ],
  },
  {
    group: "Seguimiento de leads",
    rows: [
      ["Texto si no contestas", "Extra $97/mes", "Opcional · $1/mes 2.º número + operador", "Opcional · EN/ES · $1/mes 2.º número + operador", "Extra $97/mes"],
      ["Pedidos de reseña en Google", "—", "Sí", "Sí", "—"],
      ["Ajuste del Perfil de Negocio de Google", "—", "Sí", "Sí", "—"],
      ["Llamadas y reporte mensual", "—", "Sí", "Sí", "—"],
      ["Sitio en inglés y español", "—", "—", "Sí", "—"],
    ],
  },
  {
    group: "El acuerdo",
    rows: [
      ["Garantía de leads de 60 días", "—", "Sí", "Sí", "—"],
      ["Devolución en 30 días", "Sí", "Sí", "Sí", "Sí"],
      ["Compromiso mensual", "Mes a mes", "Mes a mes", "Mes a mes", "Un pago"],
      ["Cancela cuando quieras", "Sí", "Sí", "Sí", "—"],
      ["Precio fijo", "24 meses", "24 meses", "24 meses", "Un pago"],
      ["Precio", "$97 / mes", "$197 / mes", "$297 / mes", "$1,497 una vez"],
    ],
  },
];

export const ES_OWNERSHIP: OwnershipCompareData = {
  headline: "Own It frente a planes mensuales administrados",
  intro:
    "Los planes mensuales se administran y se hospedan mientras están activos. Own It te entrega los archivos del sitio desde el lanzamiento. El precio fijo a 24 meses no es un contrato a 24 meses: puedes cancelar cuando quieras.",
  rows: [
    {
      path: "Website mensual",
      cost24: "$2,328",
      ownership: "Los archivos quedan con Kinexis mientras el plan esté activo",
      afterCancel: "El sitio sale de línea al terminar el período pagado, salvo que compres los archivos o pases a Own It",
    },
    {
      path: "Lead System mensual",
      cost24: "$4,728",
      ownership: "Los archivos quedan con Kinexis mientras el plan esté activo",
      afterCancel: "Igual que Website; la compra es un pago escrito de $1,497 por los archivos del sitio",
    },
    {
      path: "Plus mensual",
      cost24: "$7,128",
      ownership: "Los archivos quedan con Kinexis mientras el plan esté activo",
      afterCancel: "Mismas reglas de cancelación y compra que los otros planes mensuales",
    },
    {
      path: "Own It",
      cost24: "$1,497 una vez",
      ownership: "Los archivos son tuyos desde el día del lanzamiento",
      afterCancel: "Sin plan mensual; hosting y cambios 12 meses, luego Cuidado del sitio opcional",
    },
  ],
  footnote:
    "Los totales a 24 meses usan los precios publicados actuales solo como ejemplo. Puedes cancelar antes. Una compra de archivos de $1,497 después de un plan mensual es una compra escrita aparte y no incluye hosting continuo salvo que lo arregles.",
  labels: {
    cost24: "Ejemplo a 24 meses",
    ownership: "Propiedad",
    afterCancel: "Si te vas",
    path: "Camino",
    aria: "Comparación de propiedad",
  },
};

export const ES_PLAN_CHOOSER_BLURB =
  "¿No sabes cuál te conviene? Empieza con Website si necesitas presencia profesional en línea. Elige Lead System si quieres herramientas para captar y dar seguimiento a más oportunidades. Elige Plus si atiendes clientes en inglés y en español. Elige Own It si prefieres un pago único por el sitio.";

export const ES_TEXTBACK_FOOTNOTE_ITEMS = [
  "El texto si no contestas es opcional y necesita una línea dedicada de la empresa.",
  "Un segundo número de seguimiento cuesta $1 al mes si lo usas.",
  "Pueden aplicar tarifas del operador.",
  "La aprobación del operador suele tardar 10 a 15 días y no está garantizada.",
] as const;

export function spanishCatalogPlansForCompare(tx: (s: string) => string = (s) => s): Pick<CatalogPlan, "slug" | "name" | "priceLabel" | "suffix" | "popular">[] {
  return spanishPlans(tx, { currency: "usd" }).map((plan) => ({
    slug: plan.slug as CatalogPlan["slug"],
    name: plan.name,
    priceLabel: plan.price,
    suffix: plan.slug === "own-it" ? "" : " / mes",
    popular: plan.popular,
  }));
}

/** Checkout UI copy — prices stay numeric from CHECKOUT_PLANS. */
export const ES_CHECKOUT_UI = {
  chooseLegend: "Elige tu plan",
  chooseHint: "Selecciona un plan para ver qué incluye y actualizar el total.",
  mostPopular: "El más elegido",
  includedIn: (name: string) => `Incluido en ${name}`,
  checkoutKicker: "Pago",
  zeroDown: "$0 de entrada",
  billing: "Cobro",
  billingMonthly: "Mensual · cancela cuando quieras",
  billingOnce: "Un solo pago",
  firstCharge: "Primer cargo",
  firstChargeSub: "Cuando te suscribes",
  firstChargePay: "Cuando pagas",
  monthlyTotal: "Total mensual",
  oneTimeTotal: "Total de un solo pago",
  taxNote: "USD · Más impuestos, si aplican",
  agreePrefix: "Acepto los",
  terms: "Términos del servicio",
  and: "y la",
  privacy: "Política de privacidad",
  loadingPaypal: "Cargando el pago seguro de PayPal…",
  paypalFailed: "PayPal no cargó. Escríbenos al",
  paypalFailedSuffix: "y te mandamos un enlace de pago.",
  tryAgain: "Intentar de nuevo",
  agreeContinue: "Acepta para continuar con PayPal",
  payWithPaypal: (amount: string) => `Pagar $${amount} con PayPal`,
  opensTab: "Abre la página segura de PayPal en una pestaña nueva.",
  agreeToPay: (amount: string) => `Acepta para pagar $${amount}`,
  ready: "Listo para continuar de forma segura con PayPal.",
  acceptTerms: "Acepta los términos de arriba para continuar.",
  requireTerms: "Marca la casilla para aceptar los Términos primero.",
  secure: "Pago seguro con PayPal. Paga con tu cuenta de PayPal o con tarjeta de débito o crédito. Nunca vemos el número completo de tu tarjeta.",
  detailsSummary: "Términos del plan y detalles de cobro",
  needHelp: (phone: string) => `¿Necesitas ayuda? Llama o escribe al ${phone}`,
  previewTitle: "Primero la vista previa. Luego el lanzamiento.",
  previewBody: "Suscríbete el día del lanzamiento, después de aprobar tu sitio. El primer cargo ocurre cuando te suscribes.",
  notConfigured: "Este plan aún no está configurado para pagar en línea. Escríbenos o envíanos un texto y terminamos el pago contigo.",
  badSubscription: "PayPal confirmó algo, pero el id de la suscripción no se ve bien. Revisa tu correo de PayPal o escríbenos.",
  paypalError: "Algo falló con PayPal. Inténtalo de nuevo o escríbenos.",
  cancelled: "Cancelaste el pago. No se te cobró nada.",
  termsMonthly: (guarantee: boolean) =>
    `Mes a mes · Cancela cuando quieras · Precio fijo 24 meses · Dominio año 1 incluido · Renovaciones posteriores al costo · Devolución en 30 días · Primer cargo al suscribirte · Más impuestos, si aplican${guarantee ? " · Garantía de leads rastreados de 60 días" : ""}`,
  termsOwnIt: "Un pago al aprobar la vista previa · Sin plan mensual · Devolución en 30 días · Los archivos son tuyos desde el lanzamiento · Más impuestos, si aplican",
  heroEyebrow: "Planes y pago",
  heroH1: "Tu sitio nuevo empieza aquí.",
  heroMark: "empieza aquí",
  heroSub: "Suscríbete el día del lanzamiento, después de aprobar tu sitio. El primer cargo ocurre cuando te suscribes.",
  heroPreview: "¿Aún no viste tu vista previa gratis?",
  heroPreviewCta: "Pide tu vista previa gratis",
  heroInvoice: "Pagar una factura existente",
  routePlan: "Elige tu plan",
  routeTotal: "Revisa el total",
  routePaypal: "Continúa con PayPal",
  beforePayEyebrow: "Cobro",
  beforePayH1: "Antes de pagar",
  beforePaySub: "La versión corta de cancelar, ambas garantías, el texto si no contestas y cuándo cae el primer cargo.",
  jumpInvoice: "Pagar una factura existente →",
  perMonth: "/mes",
  once: " una vez",
} as const;

const ES_CHECKOUT_FEATURES: Record<CheckoutPlan["key"], string[]> = {
  website: [
    "Hasta 5 páginas",
    "Hosting, SSL y respaldos",
    "2 cambios chicos al mes, en 2 días hábiles",
    "Leads de formulario de contacto",
    "Dominio año 1 incluido, a tu nombre",
    "Garantía de devolución en 30 días",
    "Sin texto ni garantía de leads",
  ],
  leadSystem: [
    "Hasta 10 páginas",
    "Cambios chicos sin tope en 1 día hábil",
    "1 página nueva al mes",
    "Dominio año 1 incluido, a tu nombre",
    "Texto si no contestas opcional",
    "Pedidos de reseña en Google a cada cliente",
    "Ajuste del Perfil de Negocio de Google",
    "Llamadas y reporte mensual",
    "Garantía de leads rastreados de 60 días",
    "Garantía de devolución en 30 días",
  ],
  plus: [
    "Hasta 20 páginas, inglés y español",
    "Cambios chicos sin tope el mismo día hábil",
    "2 páginas nuevas al mes",
    "Dominio año 1 incluido, a tu nombre",
    "Texto si no contestas opcional (EN/ES)",
    "Reseñas en inglés y español",
    "Ajuste del perfil + 2 publicaciones",
    "Llamadas y reporte mensual",
    "Garantía de leads rastreados de 60 días",
    "Garantía de devolución en 30 días",
  ],
  ownIt: [
    "Hasta 10 páginas",
    "Archivos tuyos desde el lanzamiento",
    "Hosting y SSL 12 meses",
    "Hasta 30 min de cambios al mes por 12 meses",
    "Dominio año 1 incluido",
    "Un solo pago · sin plan mensual",
    "Garantía de devolución en 30 días",
  ],
};

const ES_CHECKOUT_DESCRIPTIONS: Record<CheckoutPlan["key"], string> = {
  website: "Una casa profesional para tu negocio.",
  leadSystem: "Tu sitio y las herramientas que traen llamadas.",
  plus: "Llega a clientes en inglés y en español.",
  ownIt: "Un pago. Un sitio que es tuyo.",
};

export function spanishCheckoutPlans(): CheckoutPlan[] {
  return CHECKOUT_PLANS.map((plan) => ({
    ...plan,
    description: ES_CHECKOUT_DESCRIPTIONS[plan.key],
    features: ES_CHECKOUT_FEATURES[plan.key],
  }));
}

export const ES_PAY_FAQS = [
  {
    q: "¿Cómo cancelo?",
    a: "Cuando quieras por texto, correo o Messenger. Sin cargo por cancelar. Tu sitio sigue en línea hasta el final del período que ya pagaste. Después, el hosting se detiene y el sitio sale de línea salvo que arregles una compra u Own It. Cancelar solo en PayPal puede no detener el plan: avísanos directo. Ver sección 7 de los Términos.",
  },
  {
    q: "¿Cómo funciona la garantía de leads de 60 días?",
    a: "Lead System y Plus: cero leads rastreados en tus primeros 60 días en vivo significa que se condonan el 3.º y 4.º cargo mensual. Una vez por negocio. Ver sección 5 de los Términos.",
  },
  {
    q: "¿Cómo funciona la devolución en 30 días?",
    a: "Todos los planes la incluyen. Si no quedas satisfecho en los 30 días desde el lanzamiento, te devolvemos tu pago más reciente completo si lo pides por escrito. Los costos de terceros ya pagados no se reembolsan. Ver sección 10 de los Términos.",
  },
  {
    q: "¿Qué necesito para el texto si no contestas?",
    a: "Es un extra opcional. Se necesita una línea dedicada de la empresa. Un segundo número de seguimiento cuesta $1/mes y pueden aplicar tarifas del operador. La activación depende de la aprobación del operador, normalmente en 10–15 días. Ver sección 4 de los Términos.",
  },
  {
    q: "¿Puedo pagar con tarjeta sin cuenta de PayPal?",
    a: "Sí. En la ventana de PayPal elige “Debit or Credit Card” cuando esté disponible y paga como invitado.",
  },
  {
    q: "¿Cuándo me cobran?",
    a: "Suscríbete el día del lanzamiento, después de aprobar tu sitio. El primer cargo ocurre cuando te suscribes. Los cargos siguientes siguen el calendario de PayPal. Own It se cobra cuando pagas.",
  },
  {
    q: "¿Hay contrato?",
    a: "Los planes mensuales son mes a mes, sin contrato largo. El precio queda fijo 24 meses. Own It es un solo pago.",
  },
  {
    q: "¿Impuestos?",
    a: "Los precios no incluyen impuestos sobre las ventas, si aplican.",
  },
] as const;
