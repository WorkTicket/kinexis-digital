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
};

export const leadMagnetContent: Record<Locale, LeadMagnetContent> = {
  en: {
    badge: "Free Growth Tool",
    heroTitlePrefix: "Get Your Free",
    heroTitleAccent: "Growth Audit",
    heroSubtitle:
      "Choose your audit type. Enter your email.|We'll send a personalized growth report within 48 hours. No strings attached.",
    chooseAuditTitle: "Choose Your Audit",
    audits: {
      seo: {
        title: "SEO Audit",
        desc: "We analyze your rankings, backlinks, technical SEO, and content gaps, delivered as a prioritized action plan.",
      },
      ads: {
        title: "Ads Performance Audit",
        desc: "We review your Google & Meta ad accounts, identify budget waste, and outline exactly where to optimize for better ROAS.",
      },
      website: {
        title: "Website Quality Audit",
        desc: "Page speed, mobile usability, conversion paths, UX issues, and SEO structure, scored and ranked by business impact.",
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
    whatYouGetTitle: "What You'll Get",
    benefits: [
      {
        title: "Based on Your Numbers",
        desc: "Real metrics from your actual digital presence, not generic advice.",
      },
      {
        title: "Prioritized Action Plan",
        desc: "Every recommendation ranked by business impact.",
      },
      {
        title: "Zero Obligation",
        desc: "No sales pitch. If there's a fit, we'll suggest a call.",
      },
    ],
  },
  es: {
    badge: "Herramienta de Crecimiento Gratuita",
    heroTitlePrefix: "Obtén Tu",
    heroTitleAccent: "Auditoría Gratis",
    heroSubtitle:
      "Elige tu tipo de auditoría. Ingresa tu correo.|Te enviaremos un informe de crecimiento personalizado en 48 horas. Sin compromiso.",
    chooseAuditTitle: "Elige Tu Auditoría",
    audits: {
      seo: {
        title: "Auditoría SEO",
        desc: "Analizamos tus rankings, backlinks, SEO técnico y brechas de contenido, entregado como un plan de acción priorizado.",
      },
      ads: {
        title: "Auditoría de Rendimiento de Anuncios",
        desc: "Revisamos tus cuentas de Google y Meta Ads, identificamos desperdicio de presupuesto y delineamos exactamente dónde optimizar para un mejor ROAS.",
      },
      website: {
        title: "Auditoría de Calidad del Sitio Web",
        desc: "Velocidad de página, usabilidad móvil, rutas de conversión, problemas de UX y estructura SEO, puntuados y clasificados por impacto empresarial.",
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
    whatYouGetTitle: "Lo Que Recibirás",
    benefits: [
      {
        title: "Basado en Tus Números",
        desc: "Métricas reales de tu presencia digital, no consejos genéricos.",
      },
      {
        title: "Plan de Acción Priorizado",
        desc: "Cada recomendación clasificada por impacto empresarial.",
      },
      {
        title: "Cero Obligación",
        desc: "Sin discurso de ventas. Si hay encaje, sugeriremos una llamada.",
      },
    ],
  },};
