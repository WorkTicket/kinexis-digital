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
      searchAndAds: {
        title: "Search & Paid Media",
        subtitle: "SEO, local visibility, and paid campaigns that bring in traffic ready to buy.",
      },
      webAndConversion: {
        title: "Website & Conversion",
        subtitle: "Sites, landing pages, and the optimization that turns visitors into leads.",
      },
      brandAndContent: {
        title: "Brand & Content",
        subtitle: "Identity, messaging, and content programs that build an audience and hold attention.",
      },
      growthAndStrategy: {
        title: "Growth Strategy & Consulting",
        subtitle: "Planning, audits, automation, and leadership for the whole marketing function.",
      },
    },
    cardDescriptions: {
      seo: "Technical SEO, content, and link building for businesses that need organic leads, not vanity rankings.",
      "local-seo": "Map pack visibility, GBP optimization, and local citations for service-area businesses.",
      "content-marketing": "Article and landing page production for teams that handle SEO in-house but need volume.",
      "ppc-management": "Google Ads and cross-channel PPC: Search, Shopping, Performance Max, and unified reporting when you run multiple platforms.",
      "meta-ads": "Facebook and Instagram campaigns with creative testing and audience architecture.",
      "microsoft-ads": "Managed Bing and Microsoft network ads that reach a cheaper, often-overlooked audience with its own tracking.",
      "web-design": "Conversion-focused business sites and landing pages with Core Web Vitals built in.",
      funnels: "Customer journey mapping, lead capture, and nurture on the path where revenue is won or lost.",
      branding: "Positioning, visual identity, and brand systems for companies outgrowing DIY design.",
      "email-marketing": "Lifecycle email, automation, and nurture flows tied to repeat revenue.",
      copywriting: "Conversion copy and a defined brand voice for websites, landing pages, emails, and ads.",
      "social-media": "Organic and paid social with platform-native content and monthly reporting.",
      "video-marketing": "Short-form and testimonial video for ads, social, and landing page conversion.",
      analytics: "GA4 setup, dashboards, and attribution so every channel ties back to revenue.",
      "growth-consulting": "A documented marketing strategy tied to your numbers, ready for your team or ours to run.",
      "marketing-audits": "A data-backed review of tracking, channels, funnel, and spend, with a prioritized fix list.",
      "marketing-automation-crm": "CRM setup, workflows, and lead routing so nothing falls through the cracks between tools.",
      "fractional-cmo": "Senior marketing leadership part-time: strategy, budget, and vendor accountability without a full hire.",
      "training-workshops": "Hands-on training on your own accounts so your team can run the work in-house.",
      cro: "Conversion rate optimization for high-traffic pages that should be converting better.",
      "google-ads": "Google Ads management scoped to your market and monthly spend.",
      "paid-ads": "Cross-channel paid media for brands running Google and Meta together.",
      "youtube-ads": "YouTube and video ad campaigns built to reach buyers before competitors do, with creative and targeting managed together.",
      "landing-pages": "Standalone landing page design and testing for campaigns that deserve a page built to convert, not a homepage.",
      "website-maintenance": "Ongoing updates, security, backups, and support so your site stays fast, current, and online.",
      "website-speed": "Core Web Vitals and load-time work for sites losing visitors and rankings to slow pages.",
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
      searchAndAds: {
        title: "Búsqueda y Medios Pagados",
        subtitle: "SEO, visibilidad local y campañas pagadas que traen tráfico listo para comprar.",
      },
      webAndConversion: {
        title: "Web y Conversión",
        subtitle: "Sitios, landing pages y la optimización que convierte visitantes en leads.",
      },
      brandAndContent: {
        title: "Marca y Contenido",
        subtitle: "Identidad, mensaje y contenido que construyen audiencia y mantienen la atención.",
      },
      growthAndStrategy: {
        title: "Estrategia y Consultoría de Crecimiento",
        subtitle: "Planeación, auditorías, automatización y liderazgo para toda la función de marketing.",
      },
    },
    cardDescriptions: {
      seo: "SEO técnico, contenido y link building para negocios que necesitan leads orgánicos, no rankings vacíos.",
      "local-seo": "Visibilidad en map pack, optimización de GBP y citaciones locales para negocios por zona de servicio.",
      "content-marketing": "Producción de artículos y landing pages para equipos que manejan SEO internamente pero necesitan volumen.",
      "ppc-management": "Google Ads y PPC multicanal: Search, Shopping, Performance Max e informes unificados cuando operas varias plataformas.",
      "meta-ads": "Campañas en Facebook e Instagram con pruebas creativas y arquitectura de audiencias.",
      "microsoft-ads": "Ads gestionados en Bing y la red de Microsoft para llegar a una audiencia más barata y a menudo ignorada, con su propio seguimiento.",
      "web-design": "Sitios empresariales y landing pages enfocadas en conversión con Core Web Vitals incluidos.",
      funnels: "Mapeo del customer journey, captura de leads y nurture en la ruta donde se gana o pierde el ingreso.",
      branding: "Posicionamiento, identidad visual y sistemas de marca para empresas que superaron el diseño DIY.",
      "email-marketing": "Email de ciclo de vida, automatización y flujos de nurture ligados a ingresos recurrentes.",
      copywriting: "Copy de conversión y una voz de marca definida para sitios, landing pages, emails y anuncios.",
      "social-media": "Social orgánico y pagado con contenido nativo por plataforma e informes mensuales.",
      "video-marketing": "Video corto y testimoniales para anuncios, social y conversión en landing pages.",
      analytics: "Setup GA4, dashboards y atribución para que cada canal conecte con ingresos.",
      "growth-consulting": "Una estrategia de marketing documentada y ligada a tus números, lista para que la ejecute tu equipo o el nuestro.",
      "marketing-audits": "Una revisión con datos de seguimiento, canales, embudo y gasto, con una lista priorizada de arreglos.",
      "marketing-automation-crm": "Configuración de CRM, workflows y enrutamiento de leads para que nada se pierda entre herramientas.",
      "fractional-cmo": "Liderazgo de marketing senior a tiempo parcial: estrategia, presupuesto y control de proveedores sin una contratación completa.",
      "training-workshops": "Capacitación práctica sobre tus propias cuentas para que tu equipo lleve el trabajo internamente.",
      cro: "Optimización de conversión para páginas con tráfico que deberían convertir mejor.",
      "google-ads": "Gestión de Google Ads acorde a tu mercado y gasto mensual.",
      "paid-ads": "Medios pagados multicanal para marcas que combinan Google y Meta.",
      "youtube-ads": "Campañas de YouTube y video para alcanzar compradores antes que la competencia, con creativo y segmentación gestionados juntos.",
      "landing-pages": "Diseño y testing de landing pages independientes para campañas que merecen una página hecha para convertir, no una homepage.",
      "website-maintenance": "Actualizaciones, seguridad, respaldos y soporte continuos para mantener tu sitio rápido, al día y en línea.",
      "website-speed": "Trabajo de Core Web Vitals y tiempos de carga para sitios que pierden visitantes y rankings por páginas lentas.",
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
