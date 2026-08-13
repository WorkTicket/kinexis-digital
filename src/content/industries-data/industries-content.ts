import type { Locale } from "@/i18n/routing";
import type { IndustrySlug } from "./types";

export type IndustriesHubContent = {
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSignal: string;
  heroCopy: string;
  indexEyebrow: string;
  indexTitle: string;
  indexCopy: string;
  previewEyebrow: string;
  previewTitle: string;
  previewCopy: string;
  previewAllLabel: string;
  ctaTitle: string;
  ctaCopy: string;
};

const industriesContentEn: IndustriesHubContent = {
  metaTitle: "Industry Demand Programs We Build",
  metaDescription:
    "Digital marketing for home services, ecommerce, healthcare, legal, SaaS, and more. Demand programs built for booked jobs, signed work, and revenue.",
  heroEyebrow: "Industries",
  heroTitle: "Where we",
  heroSignal: "work.",
  heroCopy:
    "Programs for operators who live on booked jobs, signed work, and orders that protect margin.",
  indexEyebrow: "The markets",
  indexTitle: "The markets.",
  indexCopy:
    "Jump to your industry for the bottleneck, the program we run, and whether we fit.",
  previewEyebrow: "Where we work",
  previewTitle: "Where we work.",
  previewCopy:
    "Each page covers the bottleneck, the program we run, and the proof that matters there.",
  previewAllLabel: "All industries",
  ctaTitle: "Not sure if you fit?",
  ctaCopy:
    "Bring the bottleneck: quiet phones, junk leads, a site that doesn't ask for the next step. We'll tell you what we'd fix first.",
};

const industriesContentEs: IndustriesHubContent = {
  metaTitle: "Programas de demanda que construimos por sector",
  metaDescription:
    "Marketing digital para servicios del hogar, ecommerce, salud, legal, SaaS y más. Programas de demanda pensados para trabajos reservados, encargos firmados e ingresos.",
  heroEyebrow: "Sectores",
  heroTitle: "Dónde",
  heroSignal: "trabajamos.",
  heroCopy:
    "Programas para operadores que viven de trabajos reservados, encargos firmados y pedidos que protegen el margen.",
  indexEyebrow: "Los mercados",
  indexTitle: "Los mercados.",
  indexCopy:
    "Entra en tu sector para ver el cuello de botella, el programa que montamos y si encajamos.",
  previewEyebrow: "Dónde trabajamos",
  previewTitle: "Dónde trabajamos.",
  previewCopy:
    "Cada página cubre el cuello de botella, el programa que montamos y la prueba que importa ahí.",
  previewAllLabel: "Todos los sectores",
  ctaTitle: "¿No sabes si encajas?",
  ctaCopy:
    "Trae el cuello de botella: teléfonos en silencio, leads basura, una web que no pide el siguiente paso. Te diremos qué arreglaríamos primero.",
};

const industriesContentByLocale: Record<Locale, IndustriesHubContent> = {
  en: industriesContentEn,
  es: industriesContentEs,
};

export const industriesContent = industriesContentEn;

export function getIndustriesContent(locale: Locale): IndustriesHubContent {
  return industriesContentByLocale[locale] ?? industriesContentEn;
}

/** Markets surfaced outside the industries hub (nav + home priority first). */
export const marketsPreviewSlugs: IndustrySlug[] = [
  "home-services",
  "ecommerce",
  "legal",
  "saas",
  "healthcare",
  "construction",
];
