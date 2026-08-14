import type { Locale } from "@/i18n/routing";
import { localeContent } from "@/i18n/locale-content";

export type HomeExploreLane = "markets" | "program";
export type ExploreIconId =
  | "industries"
  | "home-services"
  | "ecommerce"
  | "services"
  | "work"
  | "contact";
export type HomeExploreLink = {
  href: string;
  label: string;
  dek: string;
  lane: HomeExploreLane;
  icon: ExploreIconId;
};

const homeExploreLanesEn: Record<HomeExploreLane, { label: string; hint: string }> = {
  markets: {
    label: "Markets",
    hint: "Where the work lives across the markets we serve every week.",
  },
  program: {
    label: "Program",
    hint: "How we build, score, and cut the spend that does not earn.",
  },
};

const homeExploreLanesEs: Record<HomeExploreLane, { label: string; hint: string }> = {
  markets: {
    label: "Mercados",
    hint: "Dónde vive el trabajo en los mercados que cubrimos cada semana.",
  },
  program: {
    label: "Programa",
    hint: "Cómo construimos, medimos y recortamos el gasto que no produce.",
  },
};

const homeExploreLanesByLocale = localeContent({
  en: homeExploreLanesEn,
  "es-419": homeExploreLanesEs,
});

export const homeExploreLanes = homeExploreLanesEn;

export function getHomeExploreLanes(
  locale: Locale,
): Record<HomeExploreLane, { label: string; hint: string }> {
  return homeExploreLanesByLocale[locale] ?? homeExploreLanesEn;
}

const homeExploreLinksEn: HomeExploreLink[] = [
  {
    href: "/industries",
    label: "Industries",
    dek: "Home services, ecommerce, legal, SaaS, and the markets next door.",
    lane: "markets",
    icon: "industries",
  },
  {
    href: "/industries/home-services",
    label: "Home services",
    dek: "Local search, booking paths, and ads built for crews on the job.",
    lane: "markets",
    icon: "home-services",
  },
  {
    href: "/industries/ecommerce",
    label: "E-commerce",
    dek: "Fix conversion first. Then send traffic worth landing there.",
    lane: "markets",
    icon: "ecommerce",
  },
  {
    href: "/services",
    label: "Services",
    dek: "Web design, SEO, branding, paid ads, and content under one demand plan.",
    lane: "program",
    icon: "services",
  },
  {
    href: "/case-studies",
    label: "Work",
    dek: "Rebuilt around a bottleneck. Scored on leads and orders.",
    lane: "program",
    icon: "work",
  },
  {
    href: "/contact",
    label: "Contact",
    dek: "Bring the leak. We will tell you what we would fix first.",
    lane: "program",
    icon: "contact",
  },
];

const homeExploreLinksEs: HomeExploreLink[] = [
  {
    href: "/industries",
    label: "Sectores",
    dek: "Servicios del hogar, ecommerce, legal, SaaS y los mercados de al lado.",
    lane: "markets",
    icon: "industries",
  },
  {
    href: "/industries/home-services",
    label: "Servicios del hogar",
    dek: "Búsqueda local, rutas de reserva y anuncios pensados para equipos en obra.",
    lane: "markets",
    icon: "home-services",
  },
  {
    href: "/industries/ecommerce",
    label: "E-commerce",
    dek: "Primero la conversión. Después, tráfico que merezca aterrizar ahí.",
    lane: "markets",
    icon: "ecommerce",
  },
  {
    href: "/services",
    label: "Servicios",
    dek: "Diseño web, SEO, branding, anuncios y contenido bajo un solo plan de demanda.",
    lane: "program",
    icon: "services",
  },
  {
    href: "/case-studies",
    label: "Trabajo",
    dek: "Reconstruido alrededor de un cuello de botella. Medido en leads y pedidos.",
    lane: "program",
    icon: "work",
  },
  {
    href: "/contact",
    label: "Contacto",
    dek: "Trae la fuga. Te diremos qué arreglaríamos primero.",
    lane: "program",
    icon: "contact",
  },
];

const homeExploreLinksByLocale = localeContent({
  en: homeExploreLinksEn,
  "es-419": homeExploreLinksEs,
});

/** Internal destinations the homepage should surface beyond Services / Work. */
export const homeExploreLinks = homeExploreLinksEn;

export function getHomeExploreLinks(locale: Locale): HomeExploreLink[] {
  return homeExploreLinksByLocale[locale] ?? homeExploreLinksEn;
}
