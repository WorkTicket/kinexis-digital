import type { FeatureKey } from "@/data/industries";

export type IndustryFeatureCopy = { title: string; text: string; icon: string };

export const INDUSTRY_FEATURES_EN: Record<FeatureKey, IndustryFeatureCopy> = {
  calls: {
    title: "Make It Easy to Call",
    text: "Click-to-call and a phone number that stays visible while someone is deciding.",
    icon: "calls",
  },
  "quote-requests": {
    title: "Capture Quote Requests",
    text: "An enquiry form that asks for the job details you need, and nothing you do not.",
    icon: "quote-requests",
  },
  reviews: {
    title: "Build Customer Confidence",
    text: "On Lead System and Plus, review requests go out after the job with a Google link.",
    icon: "reviews",
  },
  bookings: {
    title: "Support Bookings",
    text: "A straight way to ask for a recurring visit, a route slot, or the next opening.",
    icon: "bookings",
  },
  "service-area": {
    title: "Show Where You Work",
    text: "",
    icon: "service-area",
  },
};

/** Spanish (LATAM) feature titles/copy; pass through `spainize` for es-ES. */
export const INDUSTRY_FEATURES_ES: Record<FeatureKey, IndustryFeatureCopy> = {
  calls: {
    title: "Fácil de llamar",
    text: "Toque para llamar y un número visible mientras la persona decide, también en el celular.",
    icon: "calls",
  },
  "quote-requests": {
    title: "Cotizaciones",
    text: "Un formulario que pide los datos del trabajo, y nada que no necesitas.",
    icon: "quote-requests",
  },
  reviews: {
    title: "Confianza",
    text: "En Lead System y Plus, después del trabajo sale un texto con el enlace a Google.",
    icon: "reviews",
  },
  bookings: {
    title: "Reservas",
    text: "Una forma directa de pedir una visita recurrente, un lugar en la ruta o el siguiente hueco.",
    icon: "bookings",
  },
  "service-area": {
    title: "Dónde trabajas",
    text: "",
    icon: "service-area",
  },
};

/** Apply a locale transform (identity or spainize) to Spanish feature copy. */
export function localizedIndustryFeatures(tx: (text: string) => string): Record<FeatureKey, IndustryFeatureCopy> {
  return {
    calls: { ...INDUSTRY_FEATURES_ES.calls, title: tx(INDUSTRY_FEATURES_ES.calls.title), text: tx(INDUSTRY_FEATURES_ES.calls.text) },
    "quote-requests": {
      ...INDUSTRY_FEATURES_ES["quote-requests"],
      title: tx(INDUSTRY_FEATURES_ES["quote-requests"].title),
      text: tx(INDUSTRY_FEATURES_ES["quote-requests"].text),
    },
    reviews: { ...INDUSTRY_FEATURES_ES.reviews, title: tx(INDUSTRY_FEATURES_ES.reviews.title), text: tx(INDUSTRY_FEATURES_ES.reviews.text) },
    bookings: { ...INDUSTRY_FEATURES_ES.bookings, title: tx(INDUSTRY_FEATURES_ES.bookings.title), text: tx(INDUSTRY_FEATURES_ES.bookings.text) },
    "service-area": {
      ...INDUSTRY_FEATURES_ES["service-area"],
      title: tx(INDUSTRY_FEATURES_ES["service-area"].title),
      text: tx(INDUSTRY_FEATURES_ES["service-area"].text),
    },
  };
}
