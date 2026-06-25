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
        "Book a strategy call with KINEXIS. Share your goals and we'll outline a practical growth plan for SEO, ads, and conversion.",
    },
    blog: {
      title: "Digital Marketing Blog | KINEXIS Digital",
      description:
        "Practical guides on SEO, paid ads, web design, and conversion from the KINEXIS team. No fluff, just what works for service businesses.",
    },
    blogPosts: {
      title: "All Blog Posts | KINEXIS Digital",
      description:
        "Browse every KINEXIS article on SEO, PPC, funnels, and growth marketing for B2B and service businesses.",
    },
    caseStudies: {
      title: "Case Studies | KINEXIS Digital",
      description:
        "Verified client results: traffic lifts, booked jobs, and pipeline growth from KINEXIS SEO, paid media, and web projects.",
    },
    leadMagnet: {
      title: "Free Growth Audit | KINEXIS Digital",
      description:
        "Get a free marketing audit from KINEXIS. We review your site, ads, and funnel, then send a prioritized action plan.",
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
        "Reserva una llamada estratégica con KINEXIS. Cuéntanos tus objetivos y trazaremos un plan de crecimiento para SEO, anuncios y conversión.",
    },
    blog: {
      title: "Blog de Marketing Digital | KINEXIS Digital",
      description:
        "Guías prácticas sobre SEO, anuncios pagados, diseño web y conversión del equipo KINEXIS para negocios de servicios.",
    },
    blogPosts: {
      title: "Todos los Artículos | KINEXIS Digital",
      description:
        "Explora todos los artículos de KINEXIS sobre SEO, PPC, embudos y marketing de crecimiento para negocios B2B y de servicios.",
    },
    caseStudies: {
      title: "Casos de Éxito | KINEXIS Digital",
      description:
        "Resultados verificados de clientes: aumentos de tráfico, trabajos agendados y crecimiento de pipeline con SEO, anuncios y web de KINEXIS.",
    },
    leadMagnet: {
      title: "Auditoría Gratis | KINEXIS Digital",
      description:
        "Recibe una auditoría de marketing gratis de KINEXIS. Revisamos tu sitio, anuncios y embudo, y enviamos un plan de acción priorizado.",
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
