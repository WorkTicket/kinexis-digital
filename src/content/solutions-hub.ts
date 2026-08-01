import type { Locale } from "@/i18n/routing";

export type SolutionsHubContent = {
  meta: { title: string; description: string };
  hero: {
    label: string;
    headlineLine1: string;
    headlineLine2: string;
    subtitle: string;
  };
  browse: {
    badge: string;
    title: string;
    description: string;
  };
  cta: {
    headline: string;
    subtitle: string;
  };
};

export const solutionsHubContent: Record<Locale, SolutionsHubContent> = {
  en: {
    meta: {
      title: "Marketing Solutions | KINEXIS Digital",
      description:
        "Tailored marketing solutions by industry and service: SEO for HVAC, Google Ads for roofers, SaaS marketing, and more. Find the right channel mix for your vertical.",
    },
    hero: {
      label: "Solutions",
      headlineLine1: "Service + industry",
      headlineLine2: "expertise combined.",
      subtitle:
        "Each page is written for a specific service and industry combination, not a template with the vertical name swapped in.",
    },
    browse: {
      badge: "Browse",
      title: "Find your combination",
      description:
        "Pick the channel and industry pairing that matches how your buyers search, compare, and buy.",
    },
    cta: {
      headline: "Not sure which solution fits?",
      subtitle:
        "Tell us what you sell and where leads stall. We'll recommend the channel mix with the clearest path to revenue.",
    },
  },
  es: {
    meta: {
      title: "Soluciones de Marketing | KINEXIS Digital",
      description:
        "Soluciones de marketing adaptadas por industria y servicio: SEO para HVAC, Google Ads para contratistas, marketing SaaS y más. Encuentra la combinación correcta para tu vertical.",
    },
    hero: {
      label: "Soluciones",
      headlineLine1: "Servicio + industria",
      headlineLine2: "experiencia combinada.",
      subtitle:
        "Cada página está escrita para una combinación específica de servicio e industria, no una plantilla con el nombre del vertical cambiado.",
    },
    browse: {
      badge: "Explorar",
      title: "Encuentra tu combinación",
      description:
        "Elige el canal y la industria que coincidan con cómo buscan, comparan y compran tus clientes.",
    },
    cta: {
      headline: "¿No sabes qué solución encaja?",
      subtitle:
        "Cuéntanos qué vendes y dónde se estancan los leads. Te recomendaremos la mezcla de canales con el camino más claro a ingresos.",
    },
  },
};
