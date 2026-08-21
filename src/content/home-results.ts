import type { Locale } from "@/i18n/routing";
import { localeContent } from "@/i18n/locale-content";

export type HomeResult = {
  slug: string;
  client: string;
  industry: string;
  headline: string;
  primaryLift: string;
  timeline: string;
  mechanism: string;
  summary: string;
  /** Viewport homepage still inside the device frame */
  image: string;
  imageAlt: string;
};

const homeResultsEn: HomeResult[] = [
  {
    slug: "landscaping-company-growth",
    client: "A1 Property Services",
    industry: "Home Services",
    headline: "qualified lead growth",
    primaryLift: "2.8×",
    timeline: "10 months",
    mechanism: "Local SEO plus tighter landing pages",
    summary:
      "Local SEO and tighter landing pages replaced feast-or-famine referrals with steady inbound through the season.",
    image: "/assets/images/case-studies/landscaping-company-growth.webp",
    imageAlt:
      "A1 Property Services site preview showing local lead-gen pages",
  },
  {
    slug: "plumbing-company-growth",
    client: "Preferred Plumbing",
    industry: "Home Services",
    headline: "emergency call volume",
    primaryLift: "2.4×",
    timeline: "8 months",
    mechanism: "Stronger local rankings, less wasted ad spend",
    summary:
      "Stronger local rankings cut wasted ad spend and more than doubled emergency calls when homeowners needed help now.",
    image: "/assets/images/case-studies/plumbing-company-growth.webp",
    imageAlt:
      "Preferred Plumbing site preview focused on emergency call capture",
  },
  {
    slug: "ecommerce-store-growth",
    client: "Manos Creativas",
    industry: "E-commerce",
    headline: "monthly order volume",
    primaryLift: "2.4×",
    timeline: "8 months",
    mechanism: "Conversion rebuild and product SEO",
    summary:
      "A conversion-led rebuild and product SEO lifted orders from 32 to 78 a month, without endless promo discounts.",
    image: "/assets/images/case-studies/saas-platform-growth.webp?v=20260820a",
    imageAlt: "Manos Creativas storefront preview after conversion-led rebuild",
  },
];

const homeResultsEs: HomeResult[] = [
  {
    slug: "landscaping-company-growth",
    client: "A1 Property Services",
    industry: "Servicios del hogar",
    headline: "crecimiento de leads cualificados",
    primaryLift: "2.8×",
    timeline: "10 meses",
    mechanism: "SEO local y landings más precisas",
    summary:
      "El SEO local y landings más precisas sustituyeron los referidos a trompicones por demanda estable durante toda la temporada.",
    image: "/assets/images/case-studies/landscaping-company-growth.webp",
    imageAlt:
      "Vista previa del sitio de A1 Property Services con páginas locales de captación",
  },
  {
    slug: "plumbing-company-growth",
    client: "Preferred Plumbing",
    industry: "Servicios del hogar",
    headline: "volumen de llamadas de emergencia",
    primaryLift: "2.4×",
    timeline: "8 meses",
    mechanism: "Mejor ranking local, menos gasto publicitario tirado",
    summary:
      "Un ranking local más sólido recortó gasto inútil y más que duplicó las llamadas de emergencia cuando el cliente necesitaba ayuda ya.",
    image: "/assets/images/case-studies/plumbing-company-growth.webp",
    imageAlt:
      "Vista previa del sitio de Preferred Plumbing centrada en captar llamadas de emergencia",
  },
  {
    slug: "ecommerce-store-growth",
    client: "Manos Creativas",
    industry: "E-commerce",
    headline: "volumen de pedidos mensuales",
    primaryLift: "2.4×",
    timeline: "8 meses",
    mechanism: "Reconstrucción de conversión y SEO de producto",
    summary:
      "Una reconstrucción orientada a conversión y SEO de producto subió los pedidos de 32 a 78 al mes, sin descuentos promocionales eternos.",
    image: "/assets/images/case-studies/saas-platform-growth.webp?v=20260820a",
    imageAlt: "Vista previa de la tienda de Manos Creativas tras la reconstrucción de conversión",
  },
];

const homeResultsByLocale = localeContent({
  en: homeResultsEn,
  "es-419": homeResultsEs,
});

export const homeResults = homeResultsEn;

export function getHomeResults(locale: Locale): HomeResult[] {
  return homeResultsByLocale[locale] ?? homeResultsEn;
}

export function caseStudyHref(slug: string) {
  return `/case-studies/${slug}`;
}
