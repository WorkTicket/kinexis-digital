import type { Locale } from "@/i18n/routing";
const en = {
  eyebrow: "Plans & payment",
  checkoutLabel: "Choose a plan and check out",
  choosePlan: "Choose your plan",
  chooseHint: "Choose a plan to see what’s included and review your payment.",
  descriptions: ["A professional home for your business.", "Your website, built to bring in leads.", "Reach customers in English and Spanish.", "One payment. A website you own."],
  included: "Included in your plan",
  launchTitle: "Your preview first. Your launch next.",
  checkoutTitle: "Your checkout",
  billing: "Billing",
  monthlyBilling: "Monthly",
  firstCharge: "First charge",
  onLaunch: "On your launch day",
  whenPaid: "When you pay",
  commitment: "Minimum term",
  minimum: "3 months, then monthly",
  monthlyTotal: "Monthly total",
  oneTimeTotal: "One-time total",
  taxNote: "USD · Plus tax, if any",
  agreementHint: "Accept the terms above to continue.",
  readyToPay: "You’re ready to continue securely with PayPal.",
  secureLabel: "Secure checkout with",
  planTerms: "Plan terms & billing details",
  help: "Need a hand? Text us",
  faqEyebrow: "A little clarity",
  invoiceLink: "Pay an existing invoice",
  "metaTitle": "Plans & Checkout",
  "metaDescription": "Choose your Kinexis Digital website plan and check out securely with PayPal. Already have an invoice or deposit? Pay your agreed amount here.",
  "title": "Pick your plan",
  "intro": "Approved your free preview? Subscribe here. Nothing is charged before your site goes live.",
  "preview": "Haven't seen your free preview yet?",
  "previewLink": "Get your free preview",
  "first": "first.",
  "popular": "★ Most popular",
  "monthly": "/mo",
  "once": "one time",
  "down": "$0 down",
  "timing": "Subscribe once you've approved your preview. Your first charge happens on your launch day, and we'll confirm the date with you. If you subscribe early, we'll line up your billing with your launch date.",
  "agree": "I agree to the",
  "terms": "Terms of Service",
  "and": "and",
  "privacy": "Privacy Policy",
  "guard": "Please check the box to agree to the Terms first.",
  "payOwn": "Pay $1,497 with PayPal",
  "newTab": "Opens PayPal's secure page in a new tab.",
  "trust": "Secure checkout by PayPal. Pay with your PayPal account or a debit/credit card. We never see your full card number.",
  "monthlyTerms": "3-month minimum, then month to month · Price locked 24 months · Domain renewal included when we registered your domain · First charge the day your site goes live · Plus tax, if any",
  "guarantee": "60-day tracked-lead guarantee",
  "ownTerms": "One payment · Full refund if we don't launch within 30 days of your approval for reasons on our side · Plus tax, if any",
  "invoice": "Paying an invoice or deposit?",
  "faqTitle": "Before you check out",
  "loading": "Loading secure PayPal checkout…",
  "sdkError": "PayPal didn't load. Text us at +1 307 500 3371 and we'll send you a payment link.",
  "error": "Something went wrong with PayPal. Please try again or text us.",
  "names": [
    "Website",
    "Lead System",
    "Plus (Bilingual)",
    "Own It"
  ],
  "features": [
    [
      "Up to 5 pages",
      "Hosting, SSL and backups",
      "2 small edits a month",
      "Contact form leads",
      "Domain in your name",
      "No texting, reviews or guarantee"
    ],
    [
      "Up to 10 pages",
      "Unlimited small edits within 1 business day",
      "1 new page a month",
      "Missed-call text-back",
      "Google review requests to every customer",
      "Google Business Profile tune-up",
      "Call tracking and monthly report",
      "60-day tracked-lead guarantee"
    ],
    [
      "Everything in Lead System",
      "Full English + Spanish site, up to 20 pages",
      "Same-day edits if sent by noon Central",
      "2 new pages a month",
      "2 Google profile posts a month"
    ],
    [
      "Same site as Lead System, up to 10 pages",
      "Site files are yours from launch on full payment",
      "12 months of hosting and up to 30 min of edits a month",
      "Domain year 1 included",
      "Optional Site Care $39/mo after",
      "Texting and reviews add-on $97/mo",
      "No minimum, no guarantee"
    ]
  ],
  "faq": [
    [
      "How do I cancel?",
      "After the 3-month minimum, by text, email or Messenger. No call or form needed. Billing stops at the end of the month you've paid for. Cancelling inside PayPal alone doesn't end the minimum. See Terms §7."
    ],
    [
      "How does the guarantee work?",
      "Lead System and Plus: zero tracked leads in your first 60 days live means your 3rd and 4th monthly charges are waived and the minimum is dropped. Once per business. See Terms §10.2."
    ],
    [
      "Can I pay by card without a PayPal account?",
      "Yes. Choose the “Debit or Credit Card” option in the PayPal window, where PayPal offers it, and you can pay as a guest."
    ],
    [
      "When am I charged?",
      "Monthly plans: on your launch day, then the same day each month. Own It: when you pay."
    ],
    [
      "Is there a contract?",
      "3-month minimum on monthly plans, then month to month. Price locked 24 months."
    ],
    [
      "Taxes?",
      "Prices don't include sales tax, if any applies."
    ]
  ],
  "thanks": "You're subscribed. Thank you!",
  "sidLabel": "Subscription ID",
  "sidFallback": "(see your PayPal email)",
  "unknownPlan": "Your plan",
  "next": [
    "You'll get a PayPal receipt by email.",
    "We'll confirm your launch date by text or email within 1 business day.",
    "Send anything we still need (logo, photos, license number, domain): reply to our text or email hello@kinexisdigital.com."
  ],
  "questions": "Questions? Text us."
};
const es = {
  eyebrow: "Planes y pago",
  checkoutLabel: "Escoja un plan y pague",
  choosePlan: "Escoja su plan",
  chooseHint: "Escoja un plan para ver qué incluye y revisar su pago.",
  descriptions: ["Una presencia profesional para su negocio.", "Su sitio, diseñado para generar contactos.", "Llegue a clientes en inglés y español.", "Un solo pago. Un sitio que es suyo."],
  included: "Su plan incluye",
  launchTitle: "Primero su vista previa. Después, su publicación.",
  checkoutTitle: "Resumen de su pago",
  billing: "Facturación",
  monthlyBilling: "Mensual",
  firstCharge: "Primer cobro",
  onLaunch: "El día de su publicación",
  whenPaid: "Al pagar",
  commitment: "Plazo mínimo",
  minimum: "3 meses, luego mes a mes",
  monthlyTotal: "Total mensual",
  oneTimeTotal: "Total del pago único",
  taxNote: "USD · Más impuestos, si aplican",
  agreementHint: "Acepte los términos de arriba para continuar.",
  readyToPay: "Ya puede continuar de forma segura con PayPal.",
  secureLabel: "Pago seguro con",
  planTerms: "Condiciones del plan y cobros",
  help: "¿Necesita ayuda? Escríbanos",
  faqEyebrow: "Resolvemos sus dudas",
  invoiceLink: "Pagar una factura existente",
  "metaTitle": "Planes y pago",
  "metaDescription": "Escoja su plan de sitio web con Kinexis Digital y pague de forma segura con PayPal. También puede pagar aquí una factura o un depósito acordado.",
  "title": "Escoja su plan",
  "intro": "¿Ya aprobó su vista previa gratis? Inscríbase aquí. No se cobra nada antes de que su página se publique.",
  "preview": "¿Aún no ve su vista previa gratis?",
  "previewLink": "Pídala aquí",
  "first": "primero.",
  "popular": "★ El más popular",
  "monthly": "/mes",
  "once": "un solo pago",
  "down": "$0 de anticipo",
  "timing": "Inscríbase cuando haya aprobado su vista previa. El primer cobro es el día de su publicación; le confirmamos la fecha. Si se inscribe antes, ajustamos el cobro a la fecha de publicación.",
  "agree": "Acepto los",
  "terms": "Términos del Servicio",
  "and": "y la",
  "privacy": "Política de Privacidad",
  "guard": "Marque la casilla para aceptar los Términos primero.",
  "payOwn": "Pagar $1,497 con PayPal",
  "newTab": "Abre la página segura de PayPal en otra pestaña.",
  "trust": "Pago seguro con PayPal. Pague con su cuenta PayPal o con tarjeta de débito/crédito. Nunca vemos el número completo de su tarjeta.",
  "monthlyTerms": "Mínimo de 3 meses, luego mes a mes · Precio fijo por 24 meses · Renovación del dominio incluida si lo registramos por usted · Primer cobro el día que su página se publica · Más impuestos, si aplican",
  "guarantee": "Garantía de 60 días por contactos registrados",
  "ownTerms": "Un solo pago · Reembolso completo si no publicamos en 30 días desde su aprobación por causas nuestras · Más impuestos, si aplican",
  "invoice": "¿Va a pagar una factura o un depósito?",
  "faqTitle": "Antes de pagar",
  "loading": "Cargando el pago seguro de PayPal…",
  "sdkError": "PayPal no cargó. Envíenos un mensaje al +1 307 500 3371 y le mandaremos un enlace de pago.",
  "error": "Ocurrió un error con PayPal. Inténtelo de nuevo o envíenos un mensaje.",
  "names": [
    "Website",
    "Lead System",
    "Plus (Bilingüe)",
    "Own It"
  ],
  "features": [
    [
      "Hasta 5 páginas",
      "Hosting, SSL y copias de seguridad",
      "2 cambios pequeños al mes",
      "Contactos del formulario",
      "Dominio a su nombre",
      "Sin mensajes, reseñas ni garantía"
    ],
    [
      "Hasta 10 páginas",
      "Cambios pequeños ilimitados en 1 día hábil",
      "1 página nueva al mes",
      "Respuesta por texto a llamadas perdidas",
      "Solicitud de reseña de Google a cada cliente",
      "Optimización del Perfil de Empresa de Google",
      "Seguimiento de llamadas e informe mensual",
      "Garantía de 60 días por contactos registrados"
    ],
    [
      "Todo lo de Lead System",
      "Sitio completo en inglés y español, hasta 20 páginas",
      "Cambios el mismo día si llegan antes del mediodía, hora Central",
      "2 páginas nuevas al mes",
      "2 publicaciones en Google al mes"
    ],
    [
      "El mismo sitio de Lead System, hasta 10 páginas",
      "Los archivos son suyos desde la publicación, con el pago completo",
      "12 meses de hosting y hasta 30 min de cambios al mes",
      "Primer año del dominio incluido",
      "Site Care opcional a $39/mes después",
      "Mensajes y reseñas por $97/mes adicionales",
      "Sin mínimo ni garantía"
    ]
  ],
  "faq": [
    [
      "¿Cómo cancelo?",
      "Después del mínimo de 3 meses, por mensaje de texto, correo o Messenger. No necesita llamar ni llenar un formulario. El cobro termina al finalizar el mes pagado. Cancelar solo en PayPal no elimina el mínimo. Consulte los Términos §7."
    ],
    [
      "¿Cómo funciona la garantía?",
      "Lead System y Plus: si no recibe contactos registrados en los primeros 60 días publicado, se eliminan los cobros mensuales tercero y cuarto y el mínimo. Una vez por negocio. Consulte los Términos §10.2."
    ],
    [
      "¿Puedo pagar con tarjeta sin cuenta PayPal?",
      "Sí. Escoja “Tarjeta de débito o crédito” en la ventana de PayPal, cuando PayPal ofrezca esa opción, y pague como invitado."
    ],
    [
      "¿Cuándo se cobra?",
      "Planes mensuales: el día de su publicación y luego el mismo día de cada mes. Own It: al pagar."
    ],
    [
      "¿Hay contrato?",
      "Mínimo de 3 meses en planes mensuales, luego mes a mes. Precio fijo por 24 meses."
    ],
    [
      "¿Impuestos?",
      "Los precios no incluyen impuestos sobre ventas, si aplican."
    ]
  ],
  "thanks": "¡Listo, ya está inscrito! Gracias.",
  "sidLabel": "ID de suscripción",
  "sidFallback": "(consulte el correo de PayPal)",
  "unknownPlan": "Su plan",
  "next": [
    "Recibirá un recibo de PayPal por correo.",
    "Le confirmaremos su fecha de publicación por texto o correo en 1 día hábil.",
    "Envíe lo que aún necesitemos (logo, fotos, número de licencia, dominio): responda a nuestro texto o escriba a hello@kinexisdigital.com."
  ],
  "questions": "¿Preguntas? Envíenos un mensaje."
};
export type PlanContent = typeof en;
export function getPlanContent(locale: Locale): PlanContent { return locale === "en" ? en : es; }
