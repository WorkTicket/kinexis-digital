import type { Locale } from "@/i18n/routing";

export type HomeServiceSlug =
  "web-design" | "seo" | "branding" | "paid-media" | "content-marketing";
export type HomeService = {
  slug: HomeServiceSlug;
  title: string;
  /** Compact label for the homepage stack */
  shortTitle: string;
  /** One-word job in the demand program */
  role: string;
  description: string;
  href: string;
  icon: "branding" | "web" | "seo" | "paid" | "content";
  capabilities: string[];
};

const homeServicesEn: HomeService[] = [
  {
    slug: "web-design",
    title: "Web Design",
    shortTitle: "Web Design",
    role: "Convert",
    description:
      "Sites built phone-first. Fast load, clear paths, and a CTA that does not hide when the screen shrinks.",
    href: "/services#web-design",
    icon: "web",
    capabilities: [
      "Mobile-first design",
      "Responsive systems",
      "Frontend builds",
      "Conversion paths",
      "CMS builds",
      "Performance",
    ],
  },
  {
    slug: "seo",
    title: "SEO",
    shortTitle: "SEO",
    role: "Demand",
    description:
      "Technical cleanup and pages that rank for the jobs and products people already type into Google.",
    href: "/services#seo",
    icon: "seo",
    capabilities: [
      "Technical SEO",
      "Local search",
      "Keyword strategy",
      "On-page SEO",
      "Content architecture",
      "Search analytics",
    ],
  },
  {
    slug: "branding",
    title: "Branding",
    shortTitle: "Branding",
    role: "Position",
    description:
      "Positioning, voice, and visuals that help a stranger pick you before they open the next tab.",
    href: "/services#branding",
    icon: "branding",
    capabilities: [
      "Brand strategy",
      "Verbal identity",
      "Visual system",
      "Brand guidelines",
      "Launch assets",
      "Message frameworks",
    ],
  },
  {
    slug: "paid-media",
    title: "Paid Ads",
    shortTitle: "Paid Ads",
    role: "Scale",
    description:
      "Google and Meta budgets run like a P&L. Every dollar tied to a conversion you can name.",
    href: "/services#paid-media",
    icon: "paid",
    capabilities: [
      "Google Ads",
      "Meta Ads",
      "Campaign structure",
      "Creative testing",
      "Budget pacing",
      "Attribution",
    ],
  },
  {
    slug: "content-marketing",
    title: "Content Marketing",
    shortTitle: "Content Marketing",
    role: "Trust",
    description:
      "Pages and sequences that answer buyer questions early and keep warm leads from going cold.",
    href: "/services#content-marketing",
    icon: "content",
    capabilities: [
      "Content strategy",
      "Service pages",
      "Blog & guides",
      "Email sequences",
      "Offer pages",
      "Editorial calendar",
    ],
  },
];

const homeServicesEs: HomeService[] = [
  {
    slug: "web-design",
    title: "Diseño web",
    shortTitle: "Diseño web",
    role: "Convertir",
    description:
      "Webs pensadas primero para el móvil. Carga rápida, caminos claros y un CTA que no desaparece cuando se encoge la pantalla.",
    href: "/services#web-design",
    icon: "web",
    capabilities: [
      "Diseño mobile-first",
      "Sistemas responsive",
      "Desarrollo frontend",
      "Rutas de conversión",
      "Implementación CMS",
      "Rendimiento",
    ],
  },
  {
    slug: "seo",
    title: "SEO",
    shortTitle: "SEO",
    role: "Demanda",
    description:
      "Limpieza técnica y páginas que posicionan para los trabajos y productos que la gente ya busca en Google.",
    href: "/services#seo",
    icon: "seo",
    capabilities: [
      "SEO técnico",
      "Búsqueda local",
      "Estrategia de keywords",
      "SEO on-page",
      "Arquitectura de contenido",
      "Analítica de búsqueda",
    ],
  },
  {
    slug: "branding",
    title: "Branding",
    shortTitle: "Branding",
    role: "Posición",
    description:
      "Posicionamiento, voz y visuales para que un desconocido te elija antes de abrir la siguiente pestaña.",
    href: "/services#branding",
    icon: "branding",
    capabilities: [
      "Estrategia de marca",
      "Identidad verbal",
      "Sistema visual",
      "Guía de marca",
      "Assets de lanzamiento",
      "Marcos de mensaje",
    ],
  },
  {
    slug: "paid-media",
    title: "Anuncios de pago",
    shortTitle: "Anuncios de pago",
    role: "Escala",
    description:
      "Presupuestos de Google y Meta gestionados como un P&L. Cada euro atado a una conversión que puedes nombrar.",
    href: "/services#paid-media",
    icon: "paid",
    capabilities: [
      "Google Ads",
      "Meta Ads",
      "Estructura de campañas",
      "Test de creatividades",
      "Ritmo de presupuesto",
      "Atribución",
    ],
  },
  {
    slug: "content-marketing",
    title: "Marketing de contenidos",
    shortTitle: "Contenido",
    role: "Confianza",
    description:
      "Páginas y secuencias que responden pronto a las dudas del comprador y evitan que los leads calientes se enfríen.",
    href: "/services#content-marketing",
    icon: "content",
    capabilities: [
      "Estrategia de contenido",
      "Páginas de servicio",
      "Blog y guías",
      "Secuencias de email",
      "Páginas de oferta",
      "Calendario editorial",
    ],
  },
];

const homeServicesByLocale: Record<Locale, HomeService[]> = {
  en: homeServicesEn,
  es: homeServicesEs,
};

/** English default for service page composition. */
export const homeServices = homeServicesEn;

export function getHomeServices(locale: Locale): HomeService[] {
  return homeServicesByLocale[locale] ?? homeServicesEn;
}
