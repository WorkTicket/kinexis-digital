import { localeContent } from "@/i18n/locale-content";
import type { Locale } from "@/i18n/routing";

/** Hardcoded LP chrome (kickers, captions) — not part of LandingPageEntry. */
export const websiteLpChrome = localeContent({
  en: {
    outcomesAria: "What the website is built to do",
    datedCaption: "A dated WordPress template",
    customCaption: "A custom Next.js rebuild",
    liveSitesKicker: "Live sites",
    viewLive: "View live website",
    includedKicker: "What's included",
    howItWorksKicker: "How it works",
    pricingKicker: "Pricing",
    startingLabel: "plans from",
    fitKicker: "Fit check",
    nextStepKicker: "Next step",
    planFigcaption:
      "A short written brief. Five points, then a clear recommendation.",
    faqEyebrow: "Before you send the form",
    faqTitle: "Straight answers",
    heroCaption: "A1 Property Services — live site",
    heroBenefits: [
      { label: "Fast loading", note: "Better user experience" },
      { label: "Mobile-first", note: "Looks great on every device" },
      { label: "SEO included", note: "Get found on Google" },
      { label: "100% custom", note: "Just your brand" },
    ],
  },
  "es-419": {
    outcomesAria: "Para qué está hecho el sitio web",
    datedCaption: "Una plantilla WordPress anticuada",
    customCaption: "Una reconstrucción a medida en Next.js",
    liveSitesKicker: "Sitios en vivo",
    viewLive: "Ver sitio en vivo",
    includedKicker: "Qué incluye",
    howItWorksKicker: "Cómo funciona",
    pricingKicker: "Precios",
    startingLabel: "planes desde",
    fitKicker: "Encaje",
    nextStepKicker: "Siguiente paso",
    planFigcaption:
      "Un breve escrito. Cinco puntos y una recomendación clara.",
    faqEyebrow: "Antes de enviar el formulario",
    faqTitle: "Respuestas directas",
    heroCaption: "A1 Property Services — sitio en vivo",
    heroBenefits: [
      { label: "Carga rápida", note: "Mejor experiencia" },
      { label: "Mobile-first", note: "Se ve bien en cada dispositivo" },
      { label: "SEO incluido", note: "Te encuentran en Google" },
      { label: "100% a medida", note: "Solo tu marca" },
    ],
  },
});

export type WebsiteLpChrome = (typeof websiteLpChrome)["en"];

export function getWebsiteLpChrome(locale: Locale): WebsiteLpChrome {
  return websiteLpChrome[locale] ?? websiteLpChrome.en;
}
