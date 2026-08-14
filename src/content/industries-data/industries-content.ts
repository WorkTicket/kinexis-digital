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
  metaTitle: "Programas de demanda por sector",
  metaDescription:
    "Marketing digital para servicios del hogar, ecommerce, salud, legal, SaaS y más. Programas pensados para conseguir trabajos, contratos e ingresos.",
  heroEyebrow: "Sectores",
  heroTitle: "Dónde",
  heroSignal: "trabajamos.",
  heroCopy:
    "Programas para empresas que viven de trabajos agendados, contratos firmados y ventas que protegen el margen.",
  indexEyebrow: "Los mercados",
  indexTitle: "Los mercados.",
  indexCopy:
    "Entra a tu sector para ver el problema principal, el programa que armamos y si encajamos contigo.",
  previewEyebrow: "Dónde trabajamos",
  previewTitle: "Dónde trabajamos.",
  previewCopy:
    "Cada página explica el problema principal, el programa que ejecutamos y las pruebas que importan en ese sector.",
  previewAllLabel: "Todos los sectores",
  ctaTitle: "¿No sabes si encajas?",
  ctaCopy:
    "Cuéntanos el problema: teléfonos en silencio, leads de mala calidad o una web que no invita a dar el siguiente paso. Te diremos qué arreglaríamos primero.",
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
