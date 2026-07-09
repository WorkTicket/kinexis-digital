import type { Locale } from "@/i18n/routing";
import type { FAQItem } from "@/components/sections/FAQSection";

export type ServicePhaseContent = {
  title: string;
  desc: string;
  metric: string;
};

export type PlatformRowContent = {
  id: "linkedin" | "instagram" | "facebook" | "twitter";
  platform: string;
  audience: string;
  freq: string;
  format: string;
  eng: string;
  shortLabel: string;
};

export type PillarContent = {
  pillar: string;
  examples: string;
  roi: string;
};

export type MetricCardContent = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  desc: string;
};

export type SocialMediaContent = {
  hero: {
    label: string;
    headlineLine1: string;
    headlineLine2: string;
    subtitle: string;
    ctaLabel: string;
  };
  platformSection: {
    title: string;
    subtitle: string;
    labels: {
      audience: string;
      cadence: string;
      format: string;
      engagement: string;
    };
  };
  platformData: PlatformRowContent[];
  pillarSection: {
    title: string;
    subtitle: string;
  };
  pillarContent: PillarContent[];
  metricsSection: {
    title: string;
    subtitle: string;
    metrics: MetricCardContent[];
  };
  processSection: {
    title: string;
    subtitle: string;
  };
  processIntro: string;
  phases: ServicePhaseContent[];
  capabilityBodies: {
    platformStrategy: string;
    contentPillars: string;
    community: string;
  };
  cta: {
    headline: string;
    subtitle: string;
    ctaLabel: string;
  };
  inlineCtaLabel: string;
  inlineCtaSubtitle: string;
  faqs: FAQItem[];
};

export const socialMediaContent: Record<Locale, SocialMediaContent> = {
  en: {
    hero: {
      label: "Audience Building",
      headlineLine1: "Social that drives",
      headlineLine2: "demand, not just likes.",
      subtitle:
        "Platform-specific content, community management,|and organic strategy for LinkedIn, Instagram, Facebook, and X.",
      ctaLabel: "Start Your Social Strategy",
    },
    platformSection: {
      title: "Platform Performance Matrix",
      subtitle: "Each platform requires a different content approach,|cadence, and engagement strategy.",
      labels: {
        audience: "Audience",
        cadence: "Cadence",
        format: "Format",
        engagement: "Engagement",
      },
    },
    platformData: [
      {
        id: "linkedin",
        platform: "LinkedIn",
        audience: "B2B decision-makers",
        freq: "5x/week",
        format: "Long-form posts, carousels, articles",
        eng: "4.2%",
        shortLabel: "LinkedIn",
      },
      {
        id: "instagram",
        platform: "Instagram",
        audience: "Visual-first consumers",
        freq: "5x/week",
        format: "Reels, stories, carousels",
        eng: "3.8%",
        shortLabel: "Instagram",
      },
      {
        id: "facebook",
        platform: "Facebook",
        audience: "Local service buyers",
        freq: "3x/week",
        format: "Posts, reels, community updates",
        eng: "2.4%",
        shortLabel: "Facebook",
      },
      {
        id: "twitter",
        platform: "X (Twitter)",
        audience: "Industry conversations",
        freq: "3x/day",
        format: "Threads, hot takes, engagement",
        eng: "2.1%",
        shortLabel: "X",
      },
    ],
    pillarSection: {
      title: "Content pillar system.",
      subtitle:
        "Every post fits into one of four content pillars,|ensuring variety without losing brand consistency.",
    },
    pillarContent: [
      {
        pillar: "Thought Leadership",
        examples: "Industry insights, predictions, original research",
        roi: "Builds authority",
      },
      {
        pillar: "Social Proof",
        examples: "Client results, testimonials, case studies",
        roi: "Drives trust",
      },
      {
        pillar: "Educational",
        examples: "How-tos, tips, frameworks, templates",
        roi: "Generates leads",
      },
      {
        pillar: "Cultural",
        examples: "Behind-the-scenes, team, values",
        roi: "Humanizes brand",
      },
    ],
    metricsSection: {
      title: "Performance metrics.",
      subtitle: "Real results from organic social strategies,|measured, reported, and optimized.",
      metrics: [
        { label: "Monthly Follower Growth", value: 15, prefix: "+", suffix: "%", desc: "Organic, no paid promotion" },
        { label: "Engagement Rate", value: 3.8, suffix: "%", decimals: 1, desc: "Across all platforms" },
        { label: "Leads Attributed", value: 25, prefix: "+", suffix: "%", desc: "From social channels" },
        { label: "Reach Growth", value: 18, prefix: "+", suffix: "%", desc: "Month-over-month audience" },
      ],
    },
    processSection: {
      title: "The social process.",
      subtitle: "From audit to ongoing management:|a step-by-step approach to building audience and engagement.",
    },
    processIntro:
      "Social is not a posting checklist. Our cycle runs from platform audit through content pillars, production, and community management, every phase tied to website clicks and leads attributed, not follower count.",
    phases: [
      { title: "Audit & Platform Strategy", desc: "Analyze current presence. Pick the right platforms, not every platform.", metric: "" },
      { title: "Content Calendar & Guidelines", desc: "Monthly calendar tied to goals. Visual and tone guidelines keep everything consistent.", metric: "" },
      { title: "Production & Scheduling", desc: "Custom graphics, short-form video, and carousels scheduled in advance.", metric: "" },
      { title: "Community & Reporting", desc: "Daily engagement on comments and DMs. Monthly reports on reach, leads, and what to adjust.", metric: "" },
    ],
    capabilityBodies: {
      platformStrategy:
        "Platform fit matters more than presence everywhere. We audit where your buyers actually engage, then build cadence, format, and messaging rules per network, LinkedIn for B2B depth, Instagram for visual proof, X for conversation. The matrix below shows how we match platform to audience and outcome, not a six-network checklist.",
      contentPillars:
        "Random posts feel like a different company every week. We organize content into four pillars, thought leadership, social proof, education, culture. Each mapped to a funnel stage and a number we can report on. Every post category has a purpose: authority, trust, leads, or human connection.",
      community:
        "Likes alone do not pay rent. We monitor comments, mentions, and DMs daily, route buying signals to sales follow-up, and track leads attributed to social traffic, not vanity engagement. Organic posts also feed retargeting pools and ad creative tests so social is wired into pipeline, not a standalone island.",
    },
    cta: {
      headline: "Ready to grow your social presence?",
      subtitle:
        "We'll build a social strategy that drives real engagement and leads,|not just likes and empty followers.",
      ctaLabel: "See Social Pricing",
    },
    inlineCtaLabel: "Audit My Social Presence",
    inlineCtaSubtitle:
      "We will review your platform fit, content gaps, and lead paths. Then outline the highest-impact social fixes.",
    faqs: [
      { question: "Which social platforms do you manage?", answer: "We focus on LinkedIn, Instagram, and X (Twitter). We recommend the platforms where your specific audience is most active and where your content type will perform best, not every platform for the sake of presence." },
      { question: "How many posts do you create per month?", answer: "Our clients receive 20+ assets per month including posts, stories, carousels, and short-form video. Every asset is created from scratch for your brand, with no recycled templates or generic stock photo captions." },
      { question: "Do you respond to comments and messages?", answer: "Yes. Community management is included in every social media plan. We monitor and respond to comments, mentions, and DMs daily to maintain an active presence and build real relationships with your audience." },
      { question: "How do you measure social media results?", answer: "Follower growth rate, engagement rate, reach, website traffic from social, and leads attributed to social channels. We track these monthly and adjust content strategy based on what's actually driving performance." },
      { question: "Can social media generate direct leads for my business?", answer: "Yes, especially LinkedIn for B2B. We combine organic content with lead magnet promotion and DM outreach sequences to generate qualified pipeline directly from social. Instagram and X also drive leads for the right service businesses." },
    ],
  },
  es: {
    hero: {
      label: "Construcción de Audiencia",
      headlineLine1: "Estrategias que",
      headlineLine2: "crean audiencias.",
      subtitle:
        "Estrategias de contenido específicas por plataforma,|gestión de comunidad y sistemas de crecimiento orgánico para LinkedIn, Instagram y X.",
      ctaLabel: "Inicia Tu Estrategia Social",
    },
    platformSection: {
      title: "Matriz de Rendimiento por Plataforma",
      subtitle: "Cada plataforma requiere un enfoque de contenido,|cadencia y estrategia de engagement diferente.",
      labels: {
        audience: "Audiencia",
        cadence: "Cadencia",
        format: "Formato",
        engagement: "Engagement",
      },
    },
    platformData: [
      {
        id: "linkedin",
        platform: "LinkedIn",
        audience: "Tomadores de decisiones B2B",
        freq: "5x/semana",
        format: "Publicaciones largas, carruseles, artículos",
        eng: "4.2%",
        shortLabel: "LinkedIn",
      },
      {
        id: "instagram",
        platform: "Instagram",
        audience: "Consumidores visuales",
        freq: "5x/semana",
        format: "Reels, historias, carruseles",
        eng: "3.8%",
        shortLabel: "Instagram",
      },
      {
        id: "twitter",
        platform: "X (Twitter)",
        audience: "Conversaciones de la industria",
        freq: "3x/día",
        format: "Hilos, opiniones, engagement",
        eng: "2.1%",
        shortLabel: "X",
      },
    ],
    pillarSection: {
      title: "Sistema de pilares de contenido.",
      subtitle:
        "Cada publicación encaja en uno de cuatro pilares de contenido,|asegurando variedad sin perder consistencia de marca.",
    },
    pillarContent: [
      {
        pillar: "Liderazgo de Pensamiento",
        examples: "Insights de la industria, predicciones, investigación original",
        roi: "Construye autoridad",
      },
      {
        pillar: "Prueba Social",
        examples: "Resultados de clientes, testimonios, casos de estudio",
        roi: "Genera confianza",
      },
      {
        pillar: "Educativo",
        examples: "Tutoriales, consejos, frameworks, plantillas",
        roi: "Genera leads",
      },
      {
        pillar: "Cultural",
        examples: "Detrás de cámaras, equipo, valores",
        roi: "Humaniza la marca",
      },
    ],
    metricsSection: {
      title: "Métricas de rendimiento.",
      subtitle: "Resultados reales de estrategias sociales orgánicas,|medidos, reportados y optimizados.",
      metrics: [
        { label: "Crecimiento Mensual de Seguidores", value: 15, prefix: "+", suffix: "%", desc: "Orgánico, sin promoción pagada" },
        { label: "Tasa de Engagement", value: 3.8, suffix: "%", decimals: 1, desc: "En todas las plataformas" },
        { label: "Leads Atribuidos", value: 25, prefix: "+", suffix: "%", desc: "Desde canales sociales" },
        { label: "Crecimiento de Alcance", value: 18, prefix: "+", suffix: "%", desc: "Audiencia mes a mes" },
      ],
    },
    processSection: {
      title: "El proceso social.",
      subtitle: "De la auditoría a la gestión continua:|un enfoque paso a paso para construir audiencia y engagement.",
    },
    processIntro:
      "Social no es una lista de publicaciones. Nuestro ciclo va de auditoría de plataforma a pilares de contenido, producción y gestión de comunidad, cada fase ligada a clics al sitio y leads atribuidos, no al conteo de seguidores.",
    phases: [
      { title: "Auditoría y Estrategia de Plataforma", desc: "Analizar presencia actual. Elegir las plataformas correctas, no todas.", metric: "" },
      { title: "Calendario de Contenido y Guías", desc: "Calendario mensual vinculado a objetivos. Guías visuales y de tono mantienen todo consistente.", metric: "" },
      { title: "Producción y Programación", desc: "Gráficos personalizados, video corto y carruseles programados con anticipación.", metric: "" },
      { title: "Comunidad y Reportes", desc: "Engagement diario en comentarios y DMs. Reportes mensuales de alcance, leads y ajustes.", metric: "" },
    ],
    capabilityBodies: {
      platformStrategy:
        "El ajuste de plataforma importa más que estar en todas. Auditamos dónde tus compradores realmente interactúan, luego construimos cadencia, formato y reglas de mensaje por red, LinkedIn para profundidad B2B, Instagram para prueba visual, X para conversación. La matriz siguiente muestra cómo alineamos plataforma a audiencia y resultado, no un checklist de seis redes.",
      contentPillars:
        "Publicaciones aleatorias parecen una empresa distinta cada semana. Organizamos el contenido en cuatro pilares, liderazgo de pensamiento, prueba social, educación, cultura, cada uno mapeado a una etapa de embudo y un número que podemos reportar. Cada categoría de post tiene un propósito: autoridad, confianza, leads o conexión humana.",
      community:
        "Los likes solos no pagan la renta. Monitoreamos comentarios, menciones y DMs diariamente, enrutamos señales de compra a seguimiento de ventas y rastreamos leads atribuidos al tráfico social, no engagement vanidad. Los posts orgánicos también alimentan pools de retargeting y pruebas creativas para que social esté conectado al pipeline.",
    },
    cta: {
      headline: "¿Listo para hacer crecer tu presencia social?",
      subtitle:
        "Construiremos una estrategia social que genere engagement y leads reales,|no solo likes y seguidores vacíos.",
      ctaLabel: "Ver Precios de Social",
    },
    inlineCtaLabel: "Auditar Mi Presencia Social",
    inlineCtaSubtitle:
      "Revisaremos tu ajuste de plataforma, brechas de contenido y rutas de leads, y delinearemos las correcciones sociales de mayor impacto.",
    faqs: [
      { question: "¿Qué plataformas sociales gestionan?", answer: "Nos centramos en LinkedIn, Instagram y X (Twitter). Recomendamos las plataformas donde tu audiencia específica es más activa y donde tu tipo de contenido rendirá mejor, no todas las plataformas por el simple hecho de tener presencia." },
      { question: "¿Cuántas publicaciones crean al mes?", answer: "Nuestros clientes reciben más de 20 activos al mes incluyendo publicaciones, stories, carruseles y video de formato corto. Cada activo se crea desde cero para tu marca, sin plantillas recicladas." },
      { question: "¿Responden a comentarios y mensajes?", answer: "Sí. La gestión de comunidad está incluida en todos nuestros planes de social media. Monitoreamos y respondemos a comentarios, menciones y DMs diariamente para mantener una presencia activa y construir relaciones reales." },
      { question: "¿Cómo miden los resultados de social media?", answer: "Tasa de crecimiento de seguidores, tasa de engagement, alcance, tráfico web desde redes sociales y leads atribuidos a canales sociales. Hacemos seguimiento mensual y ajustamos la estrategia de contenido según el rendimiento real." },
      { question: "¿Puede el social media generar leads directos para mi negocio?", answer: "Sí, especialmente LinkedIn para B2B. Combinamos contenido orgánico con promoción de lead magnets y secuencias de outreach por DM para generar pipeline calificado directamente desde social. Instagram y X también generan leads para los negocios de servicios adecuados." },
    ],
  },};
