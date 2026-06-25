import type { Locale } from "@/i18n/routing";
import type { FAQItem } from "@/components/sections/FAQSection";

export type ServicePhaseContent = {
  title: string;
  desc: string;
  metric: string;
};

export type PlatformRowContent = {
  id: "linkedin" | "instagram" | "twitter";
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
  phases: ServicePhaseContent[];
  cta: {
    headline: string;
    subtitle: string;
    ctaLabel: string;
  };
  faqs: FAQItem[];
};

export const socialMediaContent: Record<Locale, SocialMediaContent> = {
  en: {
    hero: {
      label: "Audience Building",
      headlineLine1: "Social that drives",
      headlineLine2: "demand, not just likes.",
      subtitle:
        "Platform-specific content, community management,|and paid social for LinkedIn, Instagram, and X.",
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
    phases: [
      {
        title: "Audit & Platform Strategy",
        desc: "Analyze current presence. Pick the right platforms, not every platform.",
        metric: "Platform strategy delivered in week 1",
      },
      {
        title: "Content Calendar & Guidelines",
        desc: "Monthly calendar tied to goals. Visual and tone guidelines keep everything consistent.",
        metric: "30-day content calendar per month",
      },
      {
        title: "Production & Scheduling",
        desc: "Custom graphics, short-form video, carousels, all scheduled in advance.",
        metric: "20+ assets produced per month",
      },
      {
        title: "Community Management",
        desc: "Daily engagement with comments, mentions, DMs. Real conversations, not bots.",
        metric: "Avg. 4.2% engagement rate",
      },
      {
        title: "Reporting & Optimization",
        desc: "Monthly reports on reach, engagement, growth, and lead attribution.",
        metric: "18% month-over-month audience growth",
      },
    ],
    cta: {
      headline: "Ready to grow your social presence?",
      subtitle:
        "We'll build a social strategy that drives real engagement and leads,|not just likes and empty followers.",
      ctaLabel: "Start Your Social Strategy",
    },
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
    phases: [
      {
        title: "Auditoría y Estrategia de Plataforma",
        desc: "Analizar presencia actual. Elegir las plataformas correctas, no todas las plataformas.",
        metric: "Estrategia de plataforma entregada en la semana 1",
      },
      {
        title: "Calendario de Contenido y Guías",
        desc: "Calendario mensual vinculado a objetivos. Guías visuales y de tono mantienen todo consistente.",
        metric: "Calendario de contenido de 30 días por mes",
      },
      {
        title: "Producción y Programación",
        desc: "Gráficos personalizados, video corto, carruseles, todo programado con anticipación.",
        metric: "20+ activos producidos por mes",
      },
      {
        title: "Gestión de Comunidad",
        desc: "Engagement diario con comentarios, menciones y DMs. Conversaciones reales, no bots.",
        metric: "Prom. 4.2% de tasa de engagement",
      },
      {
        title: "Reportes y Optimización",
        desc: "Reportes mensuales de alcance, engagement, crecimiento y atribución de leads.",
        metric: "18% de crecimiento de audiencia mes a mes",
      },
    ],
    cta: {
      headline: "¿Listo para hacer crecer tu presencia social?",
      subtitle:
        "Construiremos una estrategia social que genere engagement y leads reales,|no solo likes y seguidores vacíos.",
      ctaLabel: "Inicia Tu Estrategia Social",
    },
    faqs: [
      { question: "¿Qué plataformas sociales gestionan?", answer: "Nos centramos en LinkedIn, Instagram y X (Twitter). Recomendamos las plataformas donde tu audiencia específica es más activa y donde tu tipo de contenido rendirá mejor, no todas las plataformas por el simple hecho de tener presencia." },
      { question: "¿Cuántas publicaciones crean al mes?", answer: "Nuestros clientes reciben más de 20 activos al mes incluyendo publicaciones, stories, carruseles y video de formato corto. Cada activo se crea desde cero para tu marca, sin plantillas recicladas." },
      { question: "¿Responden a comentarios y mensajes?", answer: "Sí. La gestión de comunidad está incluida en todos nuestros planes de social media. Monitoreamos y respondemos a comentarios, menciones y DMs diariamente para mantener una presencia activa y construir relaciones reales." },
      { question: "¿Cómo miden los resultados de social media?", answer: "Tasa de crecimiento de seguidores, tasa de engagement, alcance, tráfico web desde redes sociales y leads atribuidos a canales sociales. Hacemos seguimiento mensual y ajustamos la estrategia de contenido según el rendimiento real." },
      { question: "¿Puede el social media generar leads directos para mi negocio?", answer: "Sí, especialmente LinkedIn para B2B. Combinamos contenido orgánico con promoción de lead magnets y secuencias de outreach por DM para generar pipeline calificado directamente desde social. Instagram y X también generan leads para los negocios de servicios adecuados." },
    ],
  },};
