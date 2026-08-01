import type { Locale } from "@/i18n/routing";

export type LeadMagnetContent = {
  badge: string;
  heroTitlePrefix: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  chooseAuditTitle: string;
  audits: {
    seo: { title: string; desc: string };
    ads: { title: string; desc: string };
    website: { title: string; desc: string };
  };
  successTitle: string;
  successMessage: string;
  successCtaBefore: string;
  successCtaLink: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  submitButton: string;
  noSpam: string;
  whatYouGetTitle: string;
  benefits: { title: string; desc: string }[];
  depthUpsellTitle: string;
  depthUpsellBody: string;
  depthUpsellCta: string;
};

export const leadMagnetContent: Record<Locale, LeadMagnetContent> = {
  en: {
    badge: "Complimentary Diagnostic",
    heroTitlePrefix: "Request a Free",
    heroTitleAccent: "Growth Audit",
    heroSubtitle:
      "Pick one focus area. We review your live site or ad accounts against the same checklist we use on paid engagements: evidence, severity, and what to fix first.|You'll get a short findings brief within 48 hours. No pitch deck. No obligation.",
    chooseAuditTitle: "Select your audit scope",
    audits: {
      seo: {
        title: "SEO Technical Audit",
        desc: "Indexation, crawl errors, Core Web Vitals by template, cannibalization, and the 5 highest-impact fixes ranked by revenue relevance.",
      },
      ads: {
        title: "Paid Media Account Audit",
        desc: "Search terms waste, conversion tracking integrity, Quality Score / auction insights, and a cut-vs-scale list for Google and Meta.",
      },
      website: {
        title: "Conversion Path Audit",
        desc: "Above-the-fold clarity, form friction, mobile UX, message match from ads, and page-level issues ordered by likely lift.",
      },
    },
    successTitle: "Check Your Inbox",
    successMessage: "We're preparing your {audit}. You'll receive it within 48 hours.",
    successCtaBefore: "In the meantime, ",
    successCtaLink: "book a strategy call",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@company.com",
    submitButton: "Send My Free Audit",
    noSpam: "No spam. Unsubscribe anytime.",
    whatYouGetTitle: "What you'll receive",
    benefits: [
      {
        title: "Findings from your properties",
        desc: "We pull from your URL, Search Console signals, or ad account access, not a generic PDF template.",
      },
      {
        title: "Severity-ranked action list",
        desc: "Each issue tagged Critical / High / Medium with the why, the evidence, and what to fix first.",
      },
      {
        title: "No obligation to hire us",
        desc: "The brief is yours to keep. If execution help makes sense, we'll say so. If not, you still leave with a plan.",
      },
    ],
    depthUpsellTitle: "Need the full multi-channel review?",
    depthUpsellBody:
      "This free diagnostic covers one focus area. Our paid Marketing Audit validates tracking end to end, reviews every active channel on cost per qualified lead, maps funnel leaks, and delivers a severity-ranked roadmap with a live walkthrough.",
    depthUpsellCta: "See Marketing Audit details",
  },
  es: {
    badge: "Diagnóstico Complementario",
    heroTitlePrefix: "Solicita Tu",
    heroTitleAccent: "Auditoría Gratis",
    heroSubtitle:
      "Elige un área de enfoque. Revisamos tu sitio o cuentas de anuncios con el mismo checklist de nuestros proyectos pagos: evidencia, severidad y qué arreglar primero.|Recibes un brief de hallazgos en 48 horas. Sin pitch. Sin obligación.",
    chooseAuditTitle: "Selecciona el alcance de tu auditoría",
    audits: {
      seo: {
        title: "Auditoría Técnica SEO",
        desc: "Indexación, errores de crawl, Core Web Vitals por plantilla, canibalización y las 5 correcciones de mayor impacto ordenadas por relevancia de ingresos.",
      },
      ads: {
        title: "Auditoría de Medios Pagados",
        desc: "Desperdicio en términos de búsqueda, integridad del tracking de conversión, Quality Score / auction insights y lista de cortar vs escalar para Google y Meta.",
      },
      website: {
        title: "Auditoría de Ruta de Conversión",
        desc: "Claridad above the fold, fricción de formularios, UX móvil, message match desde anuncios y problemas por página ordenados por lift probable.",
      },
    },
    successTitle: "Revisa Tu Bandeja de Entrada",
    successMessage: "Estamos preparando tu {audit}. Lo recibirás en 48 horas.",
    successCtaBefore: "Mientras tanto, ",
    successCtaLink: "reserva una llamada estratégica",
    namePlaceholder: "Tu nombre",
    emailPlaceholder: "tu@empresa.com",
    submitButton: "Enviar Mi Auditoría Gratuita",
    noSpam: "Sin spam. Cancela la suscripción en cualquier momento.",
    whatYouGetTitle: "Lo que recibirás",
    benefits: [
      {
        title: "Hallazgos de tus propiedades",
        desc: "Trabajamos con tu URL, señales de Search Console o acceso a cuentas de anuncios, no un PDF genérico.",
      },
      {
        title: "Lista de acciones por severidad",
        desc: "Cada issue etiquetado Critical / High / Medium con el porqué, la evidencia y qué arreglar primero.",
      },
      {
        title: "Sin obligación de contratarnos",
        desc: "El brief es tuyo. Si tiene sentido ayudarte a ejecutar, lo diremos. Si no, igual te vas con un plan.",
      },
    ],
    depthUpsellTitle: "¿Necesitas la revisión multicanal completa?",
    depthUpsellBody:
      "Este diagnóstico gratuito cubre un área. Nuestra Auditoría de Marketing paga valida el tracking de punta a punta, revisa cada canal activo por costo por lead calificado, mapea fugas del embudo y entrega un roadmap por severidad con walkthrough en vivo.",
    depthUpsellCta: "Ver detalles de la Auditoría de Marketing",
  },
};
