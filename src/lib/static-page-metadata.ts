import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/metadata";

const staticPageMeta: Record<
  Locale,
  {
    about: { title: string; description: string };
    contact: { title: string; description: string };
    blog: { title: string; description: string };
    blogPosts: { title: string; description: string };
    caseStudies: { title: string; description: string };
    leadMagnet: { title: string; description: string };
    servicesHub: { title: string; description: string };
  }
> = {
  en: {
    about: {
      title: "About KINEXIS Digital | Growth Marketing Agency",
      description:
        "Meet the KINEXIS team. We build revenue systems through SEO, paid media, web design, and conversion optimization for growth-minded businesses.",
    },
    contact: {
      title: "Contact KINEXIS Digital | Book a Strategy Call",
      description:
        "Book a strategy call with KINEXIS, a digital marketing agency that builds real revenue systems. Share your goals and we'll outline a practical growth plan for SEO, ads, web design, and conversion optimization.",
    },
    blog: {
      title: "Digital Marketing Blog | KINEXIS Digital",
      description:
        "Practical guides on SEO, paid ads, web design, and conversion from the KINEXIS team. No fluff — just strategies that work for service businesses and B2B brands.",
    },
    blogPosts: {
      title: "All Blog Posts | KINEXIS Digital",
      description:
        "Browse every KINEXIS article on SEO, PPC, funnels, and growth marketing. Filter by topic or read the full archive for B2B and service business playbooks.",
    },
    caseStudies: {
      title: "Case Studies | KINEXIS Digital",
      description:
        "Verified client results: traffic lifts, booked jobs, and pipeline growth from KINEXIS SEO, paid media, and web projects.",
    },
    leadMagnet: {
      title: "Free Growth Audit | KINEXIS Digital",
      description:
        "Get a free marketing audit from KINEXIS Digital. We review your website, ads, and conversion funnel, then deliver a prioritized action plan to grow leads and revenue.",
    },
    servicesHub: {
      title: "Digital Marketing Services | KINEXIS Digital",
      description:
        "SEO, Google Ads, Meta Ads, web design, CRO, and analytics from one team. Full-service growth marketing for businesses that need revenue, not vanity metrics.",
    },
  },
  es: {
    about: {
      title: "Sobre KINEXIS Digital | Agencia de Marketing",
      description:
        "Conoce al equipo de KINEXIS. Construimos sistemas de ingresos con SEO, medios pagados, diseño web y optimización de conversión.",
    },
    contact: {
      title: "Contacto KINEXIS Digital | Reserva una Llamada",
      description:
        "Reserva una llamada estratégica con KINEXIS, una agencia de marketing digital que construye sistemas de ingresos reales. Comparte tus objetivos y crearemos un plan de crecimiento para SEO, anuncios y optimización de conversión.",
    },
    blog: {
      title: "Blog de Marketing Digital | KINEXIS Digital",
      description:
        "Guías prácticas sobre SEO, anuncios pagados, diseño web y conversión del equipo KINEXIS. Estrategias probadas para negocios de servicios y marcas B2B, sin relleno.",
    },
    blogPosts: {
      title: "Todos los Artículos | KINEXIS Digital",
      description:
        "Explora todos los artículos de KINEXIS sobre SEO, PPC, embudos y marketing de crecimiento. Filtra por tema o lee el archivo completo de playbooks B2B.",
    },
    caseStudies: {
      title: "Casos de Éxito | KINEXIS Digital",
      description:
        "Resultados verificados de clientes: aumentos de tráfico, trabajos agendados y crecimiento de pipeline con SEO, anuncios y web de KINEXIS.",
    },
    leadMagnet: {
      title: "Auditoría Gratis | KINEXIS Digital",
      description:
        "Recibe una auditoría de marketing digital gratuita de KINEXIS. Revisamos tu sitio web, anuncios y embudo de conversión, y te enviamos un plan de acción priorizado para generar más leads e ingresos.",
    },
    servicesHub: {
      title: "Servicios de Marketing Digital | KINEXIS Digital",
      description:
        "SEO, Google Ads, Meta Ads, diseño web, CRO y analítica en un solo equipo. Marketing de crecimiento para negocios que necesitan ingresos.",
    },
  },
};

export function getAboutMetadata(locale: Locale): Metadata {
  const meta = staticPageMeta[locale].about;
  return buildPageMetadata({ locale, path: "/about", ...meta });
}

export function getContactMetadata(locale: Locale): Metadata {
  const meta = staticPageMeta[locale].contact;
  return buildPageMetadata({ locale, path: "/contact", ...meta });
}

export function getBlogMetadata(locale: Locale): Metadata {
  const meta = staticPageMeta[locale].blog;
  return buildPageMetadata({ locale, path: "/blog", ...meta });
}

export function getBlogPostsMetadata(locale: Locale): Metadata {
  const meta = staticPageMeta[locale].blogPosts;
  return buildPageMetadata({ locale, path: "/blog/posts", ...meta });
}

export function getCaseStudiesMetadata(locale: Locale): Metadata {
  const meta = staticPageMeta[locale].caseStudies;
  return buildPageMetadata({ locale, path: "/case-studies", ...meta });
}

export function getLeadMagnetMetadata(locale: Locale): Metadata {
  const meta = staticPageMeta[locale].leadMagnet;
  return buildPageMetadata({ locale, path: "/lead-magnet", ...meta, noIndex: true });
}

export function getServicesHubMetadata(locale: Locale): Metadata {
  const meta = staticPageMeta[locale].servicesHub;
  return buildPageMetadata({ locale, path: "/services", ...meta });
}
