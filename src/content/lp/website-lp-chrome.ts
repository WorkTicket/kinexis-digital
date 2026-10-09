import { localeContent } from "@/i18n/locale-content";
import type { Locale } from "@/i18n/routing";

/** Hardcoded LP chrome (kickers, captions) — not part of LandingPageEntry. */
export const websiteLpChrome = localeContent({
  en: {
    outcomesAria: "What the website is built to do",
    datedCaption: "Illustrative example. “Click Here” is the button we replace.",
    customCaption: "Illustrative example. A custom rebuild, not a client result.",
    liveSitesKicker: "Live sites",
    viewLive: "View live site",
    includedKicker: "What's included",
    howItWorksKicker: "How it works",
    pricingKicker: "Pricing",
    startingLabel: "plans from",
    fitKicker: "Fit check",
    nextStepKicker: "Next step",
    planFigcaption: "A 15-minute call. Then scope and price in writing.",
    stickyNote: "No obligation. We call back the same day.",
    faqEyebrow: "Before you send the form",
    faqTitle: "Straight answers",
    heroCaption: "A1 Property Services — live site",
    heroBenefits: [
      { label: "Fast loading", note: "People stay long enough to call" },
      { label: "Mobile-first", note: "Easy to call from a phone" },
      { label: "SEO included", note: "Service pages Google can read" },
      { label: "100% custom", note: "Your company, not a template" },
    ],
  },
  "es-419": {
    outcomesAria: "Para qué está hecho el sitio web",
    datedCaption: "Ejemplo ilustrativo. “Click Here” es el botón que reemplazamos.",
    customCaption: "Ejemplo ilustrativo. Una reconstrucción a medida, no un resultado de cliente.",
    liveSitesKicker: "Sitios en vivo",
    viewLive: "Ver sitio en vivo",
    includedKicker: "Qué incluye",
    howItWorksKicker: "Cómo funciona",
    pricingKicker: "Precios",
    startingLabel: "planes desde",
    fitKicker: "Encaje",
    nextStepKicker: "Siguiente paso",
    planFigcaption:
      "Una llamada de 15 minutos. Luego alcance y precio por escrito.",
    stickyNote: "Sin compromiso. Te llamamos el mismo día.",
    faqEyebrow: "Antes de enviar el formulario",
    faqTitle: "Respuestas directas",
    heroCaption: "A1 Property Services — sitio en vivo",
    heroBenefits: [
      { label: "Carga rápida", note: "La gente se queda para llamar" },
      { label: "En el teléfono", note: "Fácil de llamar desde el celular" },
      { label: "SEO incluido", note: "Páginas que Google puede leer" },
      { label: "100% a medida", note: "Tu empresa, no una plantilla" },
    ],
  },
});

export type WebsiteLpChrome = (typeof websiteLpChrome)["en"];

export function getWebsiteLpChrome(locale: Locale): WebsiteLpChrome {
  return websiteLpChrome[locale] ?? websiteLpChrome.en;
}
