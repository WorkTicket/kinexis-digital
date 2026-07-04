import type { Locale } from "@/i18n/routing";
import type { FAQItem } from "@/components/sections/FAQSection";

export type AgencyHubContent = {
  meta: { title: string; description: string };
  hero: {
    label: string;
    headlineLine1: string;
    headlineLine2: string;
    subtitle: string;
    ctaLabel: string;
  };
  positioning: {
    title: string;
    subtitle: string;
    pillars: { title: string; description: string }[];
  };
  capabilities: {
    title: string;
    subtitle: string;
    items: { label: string; description: string; href: string }[];
    viewAllLabel: string;
  };
  audiences: {
    title: string;
    subtitle: string;
    viewAllLabel: string;
    segments: { label: string; description: string; examples: string[] }[];
  };
  process: {
    title: string;
    subtitle: string;
    viewAllLabel: string;
    steps: {
      phase: string;
      title: string;
      description: string;
      deliverables?: string[];
      outcome?: string;
    }[];
  };
  proof: {
    title: string;
    subtitle: string;
    viewAllLabel: string;
    metrics: { value: string; label: string }[];
  };
  faqs: FAQItem[];
  outro: { title: string; paragraphs: string[] };
  cta: { headline: string; subtitle: string; ctaLabel: string };
};

const enCapabilities = [
  { label: "SEO Services", description: "Technical foundations, authority content, and sustainable organic growth.", href: "/services/seo" },
  { label: "PPC Management", description: "Cross-channel paid media optimized for ROAS and pipeline velocity.", href: "/services/ppc-management" },
  { label: "Google Ads", description: "Search, Shopping, and Performance Max campaigns built for intent.", href: "/services/google-ads" },
  { label: "Meta Ads", description: "Facebook and Instagram campaigns for demand creation and retargeting.", href: "/services/meta-ads" },
  { label: "Web Design", description: "Conversion-optimized websites that look premium and perform.", href: "/services/web-design" },
  { label: "Funnels & CRO", description: "Conversion systems, funnel builds, and experimentation that compounds revenue.", href: "/services/funnels" },
  { label: "Email Marketing", description: "Lifecycle automation that nurtures, converts, and retains.", href: "/services/email-marketing" },
  { label: "Content Marketing", description: "Authority content that captures demand across the buyer journey.", href: "/services/content-marketing" },
  { label: "Social Media", description: "Platform-native content and paid social that builds audience.", href: "/services/social-media" },
  { label: "Video Marketing", description: "Short and long-form video for education, conversion, and retargeting.", href: "/services/video-marketing" },
  { label: "Branding", description: "Positioning and identity systems that command trust.", href: "/services/branding" },
  { label: "Analytics", description: "Attribution, reporting, and dashboards for data-backed decisions.", href: "/services/analytics" },
  { label: "Growth Consulting", description: "Strategic roadmaps and fractional advisory for scaling teams.", href: "/services/growth-consulting" },
];

export const agencyHubContent: Record<Locale, AgencyHubContent> = {
  en: {
    meta: {
      title: "Digital Marketing Agency | KINEXIS Digital",
      description:
        "Full-service digital marketing for local businesses, SaaS, and startups. SEO, paid media, web design, CRO, and analytics as one revenue system.",
    },
    hero: {
      label: "Full-Service Digital Marketing Agency",
      headlineLine1: "Growth marketing",
      headlineLine2: "for every stage of scale.",
      subtitle:
        "One team that runs the whole program: search, paid, web, and conversion. Your channels work as a system instead of a stack of separate vendors.",
      ctaLabel: "Book a Strategy Call",
    },
    positioning: {
      title: "Not a local agency.|Not a Silicon Valley playbook. Both.",
      subtitle:
        "The agencies that specialize narrowly tend to apply their one playbook regardless of fit. We don't have a default playbook. We design around how your business actually sells.",
      pillars: [
        {
          title: "Local Business Growth",
          description:
            "Home services, healthcare, professional services, and hospitality brands that need predictable leads from search, ads, and conversion-optimized websites. We build local dominance through geo-targeted SEO, Google Ads, and landing pages that book jobs.",
        },
        {
          title: "National Lead Generation",
          description:
            "Multi-location and national brands that need consistent pipeline across markets. Unified analytics, scalable content, and paid media architecture that performs in every region.",
        },
        {
          title: "E-Commerce & DTC Growth",
          description:
            "Online and omnichannel brands that need ROAS-positive paid media, retention email, conversion-optimized storefronts, and creative testing across search, social, and lifecycle channels.",
        },
        {
          title: "B2B Demand Generation",
          description:
            "Complex sales cycles, multiple stakeholders, and long nurture paths. ABM, authority content, and pipeline reporting built for revenue teams.",
        },
        {
          title: "Enterprise Marketing Systems",
          description:
            "Attribution models, marketing dashboards, cross-channel orchestration, and governance for organizations that need scale without chaos.",
        },
        {
          title: "SaaS & Startup Growth",
          description:
            "Product-led and sales-assisted software companies that need trial conversion, content-led acquisition, and CRO experiments tied to MRR, not vanity traffic metrics.",
        },
      ],
    },
    capabilities: {
      title: "Every channel. One growth engine.",
      subtitle: "Run them separately and they perform like separate services. Build them as one program and each one amplifies the rest. Analytics ties every channel back to revenue.",
      items: enCapabilities,
      viewAllLabel: "View all services",
    },
    audiences: {
      title: "Markets we know inside out",
      subtitle: "We work with business owners who need reliable local leads, operators who need multi-location consistency, and founders who need an acquisition engine that keeps up with product growth.",
      viewAllLabel: "Explore all industries",
      segments: [
        {
          label: "Home Services & Trades",
          description: "HVAC, roofing, plumbing, landscaping, and electrical companies that need calls, not clicks.",
          examples: ["HVAC contractors", "Roofing companies", "Landscaping businesses"],
        },
        {
          label: "Professional & Healthcare",
          description: "Law firms, dentists, medical practices, and consultants who sell trust before they sell services.",
          examples: ["Dental practices", "Law firms", "Medical groups"],
        },
        {
          label: "Technology & SaaS",
          description: "Software companies that need acquisition systems aligned to product metrics and investor expectations.",
          examples: ["B2B SaaS", "AI startups", "Fintech platforms"],
        },
        {
          label: "E-Commerce & DTC",
          description: "Online brands that need ROAS-positive paid media, retention email, and conversion optimization.",
          examples: ["Shopify brands", "DTC companies", "Online retailers"],
        },
      ],
    },
    process: {
      title: "How we work",
      subtitle: "Revenue targets first, then channel selection. We never start with tactics.",
      viewAllLabel: "Learn About Us",
      steps: [
        {
          phase: "Phase 01",
          title: "Discovery & Audit",
          description: "We map your current marketing, competitors, revenue goals, and conversion paths. Data first, no assumptions.",
          deliverables: ["Competitive landscape analysis", "Conversion path mapping", "Analytics & tracking audit", "Revenue goal alignment"],
          outcome: "Full audit across channels and conversion paths",
        },
        {
          phase: "Phase 02",
          title: "Strategy & Architecture",
          description: "Channel mix, content clusters, paid media structure, and measurement framework designed as one integrated system.",
          deliverables: ["Channel mix blueprint", "Content cluster architecture", "Paid media structure", "Measurement framework"],
          outcome: "One integrated growth program",
        },
        {
          phase: "Phase 03",
          title: "Build & Launch",
          description: "We execute across SEO, paid, web, email, and analytics simultaneously. Speed matters, but never at the cost of foundation.",
          deliverables: ["SEO implementation", "Paid campaign launch", "Web & landing pages", "Email automation setup"],
          outcome: "Multi-channel go-live in weeks",
        },
        {
          phase: "Phase 04",
          title: "Optimize & Scale",
          description: "Weekly optimization, monthly reporting, and continuous experimentation. We scale what works and cut what doesn't.",
          deliverables: ["Weekly optimization sprints", "Monthly performance reporting", "A/B experimentation", "Budget reallocation"],
          outcome: "Weekly optimization and monthly reporting",
        },
      ],
    },
    proof: {
      title: "What we've actually delivered.",
      subtitle: "Everything here is documented. Ask for the strategy, the execution timeline, and the revenue outcome behind any number on this page.",
      viewAllLabel: "View all case studies",
      metrics: [
        { value: "4.8X", label: "qualified leads · Landscaping Co., 10 mo" },
        { value: "327%", label: "emergency calls · Plumbing Co., 8 mo" },
        { value: "5.9X", label: "demo requests · SaaS Platform, 8 mo" },
        { value: "8.4%", label: "lead conversion · Landscaping rebuild" },
      ],
    },
    faqs: [
      { question: "Are you a local marketing agency or a growth agency?", answer: "Both. We serve local service businesses with geo-targeted SEO and ads, and we serve SaaS, startup, and enterprise clients with full-funnel programs. Our team is structured to handle both without applying the wrong playbook." },
      { question: "What makes KINEXIS different from other digital marketing agencies?", answer: "We sell integrated revenue systems, not disconnected tactics. Every channel connects to the next, every recommendation ties to a business outcome, and we keep our client roster intentionally small." },
      { question: "Do you require long-term contracts?", answer: "We prefer month-to-month engagements. Results earn retention, not contract lock-in." },
      { question: "How do you measure success?", answer: "Revenue, cost per lead, conversion rates, pipeline value, ROAS, and MRR depending on your business model. We report vanity metrics but never optimize for them." },
      { question: "Can you manage our entire marketing stack?", answer: "Yes. Most clients engage us for multiple services (SEO, paid media, web, email, and analytics) managed as one coordinated growth program." },
    ],
    outro: {
      title: "One team. Every growth model.",
      paragraphs: [
        "You might be launching a SaaS product, scaling across national markets, or filling your local appointment book. The approach is the same: we build around how your business actually sells. We do not force you into a local agency playbook or a Silicon Valley template. We design the program your revenue model needs, then execute it as one coordinated effort.",
      ],
    },
    cta: {
      headline: "Ready to build a program|that scales?",
      subtitle: "No slide deck. Just tell us where your growth has stalled and we'll tell you honestly if we can fix it.",
      ctaLabel: "Book a Strategy Call",
    },
  },
  es: {
    meta: {
      title: "Agencia de Marketing Digital | KINEXIS Digital",
      description:
        "Agencia de marketing digital de servicio completo para negocios locales, SaaS y startups. SEO, medios pagados, diseño web, CRO y analítica integrados.",
    },
    hero: {
      label: "Agencia de Marketing Digital de Servicio Completo",
      headlineLine1: "Marketing de crecimiento",
      headlineLine2: "para cada etapa de escala.",
      subtitle:
        "Somos una agencia de marketing de rendimiento equipada para dominar la búsqueda local y construir adquisición escalable para SaaS.",
      ctaLabel: "Reservar Llamada Estratégica",
    },
    positioning: {
      title: "No una agencia local.|No un playbook de Silicon Valley. Ambos.",
      subtitle: "La mayoría te encasillan: leads locales o demand gen enterprise.|KINEXIS opera en todo el espectro con profundidad y alcance.",
      pillars: [
        { title: "Crecimiento de Negocios Locales", description: "Servicios del hogar, salud, servicios profesionales y hospitalidad que necesitan leads predecibles. Dominio local con SEO geo, Google Ads y landing pages que generan trabajos." },
        { title: "Generación Nacional de Leads", description: "Marcas multi-ubicación y nacionales con pipeline consistente en todos los mercados. Analytics unificados, contenido escalable y arquitectura de medios pagados." },
        { title: "E-Commerce y DTC", description: "Marcas online y omnicanal con medios pagados ROAS-positivos, email de retención, tiendas optimizadas y pruebas creativas en búsqueda, social y lifecycle." },
        { title: "Generación de Demanda B2B", description: "Ciclos de venta complejos, múltiples stakeholders y nutrición prolongada. ABM, contenido de autoridad e informes de pipeline para equipos de ingresos." },
        { title: "Sistemas de Marketing Enterprise", description: "Modelos de atribución, dashboards, orquestación multicanal y gobernanza para organizaciones que necesitan escala sin caos." },
        { title: "Crecimiento SaaS y Startups", description: "Software que necesita conversión de pruebas, adquisición basada en contenido y experimentos de CRO ligados al MRR, no métricas de vanidad." },
      ],
    },
    capabilities: {
      title: "Cada canal. Un motor de crecimiento.",
      subtitle: "Nuestros servicios se diseñan para multiplicarse.",
      items: enCapabilities.map((c) => ({ ...c, label: c.label, description: c.description })),
      viewAllLabel: "Ver todos los servicios",
    },
    audiences: {
      title: "A quién servimos",
      subtitle: "Desde el techador local hasta la empresa SaaS respaldada por capital de riesgo.",
      viewAllLabel: "Explorar todos los sectores",
      segments: [
        { label: "Servicios del Hogar", description: "Empresas que necesitan llamadas, no clics.", examples: ["HVAC", "Techado", "Jardinería"] },
        { label: "Profesional y Salud", description: "Marcas que venden confianza antes que servicios.", examples: ["Dentistas", "Bufetes", "Grupos médicos"] },
        { label: "Tecnología y SaaS", description: "Empresas de software con métricas de producto.", examples: ["SaaS B2B", "Startups IA", "Fintech"] },
        { label: "E-Commerce y DTC", description: "Marcas online con ROAS positivo y retención.", examples: ["Shopify", "DTC", "Retail online"] },
      ],
    },
    process: {
      title: "Cómo trabajamos",
      subtitle: "Un proceso deliberado que comienza con objetivos de ingresos.",
      viewAllLabel: "Conócenos",
      steps: [
        {
          phase: "Fase 01",
          title: "Descubrimiento y Auditoría",
          description: "Mapeamos tu marketing actual, panorama competitivo y objetivos.",
          deliverables: ["Análisis del panorama competitivo", "Mapeo de rutas de conversión", "Auditoría de analytics", "Alineación de objetivos de ingresos"],
          outcome: "Auditoría completa de canales y rutas de conversión",
        },
        {
          phase: "Fase 02",
          title: "Estrategia y Arquitectura",
          description: "Mezcla de canales diseñada como un sistema integrado.",
          deliverables: ["Blueprint de mix de canales", "Arquitectura de clusters de contenido", "Estructura de medios pagados", "Framework de medición"],
          outcome: "Un sistema de crecimiento integrado",
        },
        {
          phase: "Fase 03",
          title: "Construcción y Lanzamiento",
          description: "Ejecutamos SEO, paid, web, email y analytics simultáneamente.",
          deliverables: ["Implementación SEO", "Lanzamiento de campañas paid", "Web y landing pages", "Setup de email automation"],
          outcome: "Go-live multicanal en semanas",
        },
        {
          phase: "Fase 04",
          title: "Optimización y Escala",
          description: "Optimización semanal y experimentación continua.",
          deliverables: ["Sprints de optimización semanal", "Reportes mensuales", "Experimentación A/B", "Reasignación de presupuesto"],
          outcome: "Optimización semanal e informes mensuales",
        },
      ],
    },
    proof: {
      title: "Lo que realmente hemos entregado.",
      subtitle: "Misma metodología. Distintas industrias. Cada métrica ligada a un caso verificado.",
      viewAllLabel: "Ver todos los casos de éxito",
      metrics: [
        { value: "4.8X", label: "leads calificados · Landscaping Co., 10 meses" },
        { value: "327%", label: "llamadas de emergencia · Plumbing Co., 8 meses" },
        { value: "5.9X", label: "solicitudes de demo · Plataforma SaaS, 8 meses" },
        { value: "8.4%", label: "conversión de leads · rebuild Landscaping" },
      ],
    },
    faqs: [
      { question: "¿Son una agencia local o de crecimiento?", answer: "Ambos. Servimos negocios locales y empresas SaaS, startup y enterprise." },
      { question: "¿Qué los diferencia?", answer: "Vendemos sistemas de ingresos integrados, no tácticas desconectadas." },
      { question: "¿Requieren contratos a largo plazo?", answer: "Preferimos compromisos mes a mes." },
      { question: "¿Cómo miden el éxito?", answer: "Ingresos, costo por lead, conversiones, pipeline, ROAS y MRR." },
      { question: "¿Pueden gestionar todo nuestro stack?", answer: "Sí. La mayoría de clientes nos contratan para múltiples servicios coordinados." },
    ],
    outro: {
      title: "Un equipo. Cada modelo de crecimiento.",
      paragraphs: [
        "Ya sea que lances un producto SaaS, escales en mercados nacionales o llenes tu agenda local, construimos en torno a cómo vende realmente tu negocio. No te forzamos a un playbook de agencia local ni a una plantilla de Silicon Valley. Diseñamos el sistema de crecimiento que tu modelo de ingresos necesita y lo ejecutamos como un programa integrado.",
      ],
    },
    cta: {
      headline: "¿Listo para construir un sistema de crecimiento?",
      subtitle: "Reserva una llamada estratégica. Sin pitch deck, sin presión.|Solo una conversación honesta sobre lo que necesitas.",
      ctaLabel: "Reservar Llamada Estratégica",
    },
  },};
