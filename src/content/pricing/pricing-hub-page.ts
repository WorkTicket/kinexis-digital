import type { Locale } from "@/i18n/routing";
import type { PricingSlug } from "@/content/registry/site-routes";
import type { PricingHubGroupKey } from "@/lib/pricing-related-links";

export type PricingHubPageContent = {
  meta: { title: string; description: string };
  hero: {
    label: string;
    headlineLine1: string;
    headlineLine2: string;
    subtitle: string;
    secondaryCtaLabel: string;
  };
  intro: {
    title: string;
    paragraphs: string[];
  };
  groups: Record<
    PricingHubGroupKey,
    {
      title: string;
      subtitle: string;
    }
  >;
  cardDescriptions: Record<PricingSlug, string>;
  startingFrom: string;
  viewPricing: string;
  cta: {
    headline: string;
    subtitle: string;
    ctaLabel: string;
  };
};

export const pricingHubPageContent: Record<Locale, PricingHubPageContent> = {
  en: {
    meta: {
      title: "Pricing | Transparent Plans for Every Service | KINEXIS Digital",
      description:
        "Browse pricing for SEO, paid media, web design, content, email, and more. Clear tiers, defined deliverables, and no hidden fees across every KINEXIS service.",
    },
    hero: {
      label: "Pricing",
      headlineLine1: "Transparent pricing",
      headlineLine2: "for every service.",
      subtitle:
        "Each service has its own pricing page with tier breakdowns, deliverables, and FAQs.|Pick the area you care about and see what it actually costs.",
      secondaryCtaLabel: "Book a Strategy Call",
    },
    intro: {
      title: "Know what you're paying for before you sign.",
      paragraphs: [
        "We publish pricing by service because vague retainers waste everyone's time. Every page below shows tier ranges, what's included, and how engagements typically start.",
        "Ad spend always bills directly to the platform. Management and strategy fees are separate, and quoted clearly at each tier.",
        "Not sure which service fits? Book a strategy call. We'll point you to the right page and tier for your market.",
      ],
    },
    groups: {
      searchAndOrganic: {
        title: "Search & Organic",
        subtitle: "SEO, local visibility, and content programs built around how buyers search.",
      },
      paidMedia: {
        title: "Paid Media",
        subtitle: "Google, Meta, and cross-channel management with fees separate from ad spend.",
      },
      webAndConversion: {
        title: "Web & Conversion",
        subtitle: "Sites, funnels, and brand work scoped around outcomes, not page counts alone.",
      },
      marketingChannels: {
        title: "Marketing Channels",
        subtitle: "Email, social, and video retainers with clear monthly deliverables.",
      },
      strategyAndAnalytics: {
        title: "Strategy & Analytics",
        subtitle: "Reporting infrastructure and fractional growth leadership for teams that need direction.",
      },
    },
    cardDescriptions: {
      seo: "Technical SEO, content, and link building for businesses that need organic leads, not vanity rankings.",
      "local-seo": "Map pack visibility, GBP optimization, and local citations for service-area businesses.",
      "content-marketing": "Article and landing page production for teams that handle SEO in-house but need volume.",
      "ppc-management": "Google Search, Shopping, and Performance Max with management scoped to your spend level.",
      "meta-ads": "Facebook and Instagram campaigns with creative testing and audience architecture.",
      "web-design": "Conversion-focused business sites and landing pages with Core Web Vitals built in.",
      funnels: "Lead capture, nurture, and CRO testing on the pages where revenue is won or lost.",
      branding: "Positioning, visual identity, and brand systems for companies outgrowing DIY design.",
      "email-marketing": "Lifecycle email, automation, and nurture flows tied to repeat revenue.",
      "social-media": "Organic and paid social with platform-native content and monthly reporting.",
      "video-marketing": "Short-form and testimonial video for ads, social, and landing page conversion.",
      analytics: "GA4 setup, dashboards, and attribution so every channel ties back to revenue.",
      "growth-consulting": "Fractional strategy for leadership teams that need a roadmap without a full hire.",
      cro: "Conversion rate optimization for high-traffic pages that should be converting better.",
      "google-ads": "Google Ads management scoped to your market and monthly spend.",
      "paid-ads": "Cross-channel paid media for brands running Google and Meta together.",
    },
    startingFrom: "From",
    viewPricing: "View pricing",
    cta: {
      headline: "Need help picking the right tier?",
      subtitle: "Tell us your market, goals, and current spend.|We'll recommend the service and plan that fits.",
      ctaLabel: "Book a Strategy Call",
    },
  },
  es: {
    meta: {
      title: "Precios | Planes Transparentes por Servicio | KINEXIS Digital",
      description:
        "Consulta precios de SEO, medios pagados, diseño web, contenido, email y más. Niveles claros, entregables definidos y sin cargos ocultos en cada servicio de KINEXIS.",
    },
    hero: {
      label: "Precios",
      headlineLine1: "Precios transparentes",
      headlineLine2: "para cada servicio.",
      subtitle:
        "Cada servicio tiene su propia página con niveles, entregables y preguntas frecuentes.|Elige el área que te importa y mira lo que realmente cuesta.",
      secondaryCtaLabel: "Agenda una Llamada Estratégica",
    },
    intro: {
      title: "Sabe qué pagas antes de firmar.",
      paragraphs: [
        "Publicamos precios por servicio porque las retenciones vagas hacen perder tiempo a todos. Cada página muestra rangos por nivel, qué incluye y cómo suelen empezar los proyectos.",
        "El gasto en anuncios siempre va directo a la plataforma. Las tarifas de gestión y estrategia son aparte, y se cotizan claramente en cada nivel.",
        "¿No sabes qué servicio encaja? Agenda una llamada estratégica. Te orientamos al plan y nivel correctos para tu mercado.",
      ],
    },
    groups: {
      searchAndOrganic: {
        title: "Búsqueda y Orgánico",
        subtitle: "SEO, visibilidad local y contenido alineado a cómo compran tus clientes.",
      },
      paidMedia: {
        title: "Medios Pagados",
        subtitle: "Google, Meta y gestión multicanal con tarifas separadas del gasto en ads.",
      },
      webAndConversion: {
        title: "Web y Conversión",
        subtitle: "Sitios, funnels y marca con alcance definido por resultados, no solo por páginas.",
      },
      marketingChannels: {
        title: "Canales de Marketing",
        subtitle: "Retainers de email, social y video con entregables mensuales claros.",
      },
      strategyAndAnalytics: {
        title: "Estrategia y Analytics",
        subtitle: "Infraestructura de reportes y liderazgo de crecimiento fraccional para equipos que necesitan dirección.",
      },
    },
    cardDescriptions: {
      seo: "SEO técnico, contenido y link building para negocios que necesitan leads orgánicos, no rankings vacíos.",
      "local-seo": "Visibilidad en map pack, optimización de GBP y citas locales para negocios por zona de servicio.",
      "content-marketing": "Producción de artículos y landing pages para equipos que manejan SEO internamente pero necesitan volumen.",
      "ppc-management": "Google Search, Shopping y Performance Max con gestión acorde a tu nivel de gasto.",
      "meta-ads": "Campañas en Facebook e Instagram con pruebas creativas y arquitectura de audiencias.",
      "web-design": "Sitios empresariales y landing pages enfocadas en conversión con Core Web Vitals incluidos.",
      funnels: "Captura de leads, nurture y pruebas CRO en las páginas donde se gana o pierde el ingreso.",
      branding: "Posicionamiento, identidad visual y sistemas de marca para empresas que superaron el diseño DIY.",
      "email-marketing": "Email de ciclo de vida, automatización y flujos de nurture ligados a ingresos recurrentes.",
      "social-media": "Social orgánico y pagado con contenido nativo por plataforma e informes mensuales.",
      "video-marketing": "Video corto y testimoniales para anuncios, social y conversión en landing pages.",
      analytics: "Setup GA4, dashboards y atribución para que cada canal conecte con ingresos.",
      "growth-consulting": "Estrategia fraccional para equipos directivos que necesitan hoja de ruta sin contratar a tiempo completo.",
      cro: "Optimización de conversión para páginas con tráfico que deberían convertir mejor.",
      "google-ads": "Gestión de Google Ads acorde a tu mercado y gasto mensual.",
      "paid-ads": "Medios pagados multicanal para marcas que combinan Google y Meta.",
    },
    startingFrom: "Desde",
    viewPricing: "Ver precios",
    cta: {
      headline: "¿Necesitas ayuda para elegir el nivel correcto?",
      subtitle: "Cuéntanos tu mercado, metas y gasto actual.|Recomendaremos el servicio y plan que encajan.",
      ctaLabel: "Agenda una Llamada Estratégica",
    },
  },
};
