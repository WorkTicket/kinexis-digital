import type { Locale } from "@/i18n/routing";
import type { ServicePhase } from "@/components/ui/ServicePhaseList";
import type { FAQItem } from "@/components/sections/FAQSection";

export type FrameworkLayerContent = {
  id: "traffic" | "conversion" | "revenue" | "retention";
  layer: string;
  channels: string;
  status: string;
};

export type RoadmapQuarterContent = {
  quarter: string;
  focus: string;
  actions: string;
  impact: string;
};

export type MetricCardContent = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  desc: string;
};

export type GrowthConsultingContent = {
  hero: {
    label: string;
    headlineLine1: string;
    headlineLine2: string;
    subtitle: string;
    ctaLabel: string;
  };
  frameworkSection: {
    title: string;
    subtitle: string;
    layers: FrameworkLayerContent[];
  };
  roadmapSection: {
    title: string;
    subtitle: string;
    quarters: RoadmapQuarterContent[];
  };
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
  phases: ServicePhase[];
  capabilityBodies: {
    growthAudit: string;
    channelMix: string;
    roadmap: string;
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

export const growthConsultingContent: Record<Locale, GrowthConsultingContent> = {
  en: {
    hero: {
      label: "Strategic Roadmap",
      headlineLine1: "Growth systems built",
      headlineLine2: "around your business.",
      subtitle:
        "Full-funnel audits, channel strategy, growth roadmaps,|and fractional advisory, all tied to your revenue goals.",
      ctaLabel: "Build Your Growth Strategy",
    },
    frameworkSection: {
      title: "Revenue Growth Framework",
      subtitle: "Sustainable growth is built in layers: traffic that converts, conversion systems that retain, and retention strategies that multiply revenue. Each layer reinforces the others, which is why improvements compound instead of fading after the first quarter.",
      layers: [
        { id: "traffic", layer: "Traffic", channels: "SEO, Paid Ads, Social, Referral", status: "Audited" },
        { id: "conversion", layer: "Conversion", channels: "Funnels, CRO, Landing Pages", status: "Optimized" },
        { id: "revenue", layer: "Revenue", channels: "Pricing, Offers, Upsells", status: "Scaled" },
        { id: "retention", layer: "Retention", channels: "Email, Community, Support", status: "Automated" },
      ],
    },
    roadmapSection: {
      title: "The 4-quarter growth roadmap.",
      subtitle:
        "A phased approach that builds momentum quarter by quarter.|Each phase has clear objectives and measurable outcomes.",
      quarters: [
        {
          quarter: "Q1",
          focus: "Foundation & Quick Wins",
          actions: "Analytics setup, funnel audit, fix leaks, launch first campaigns",
          impact: "Audit + 90-day roadmap delivered",
        },
        {
          quarter: "Q2",
          focus: "Scale What Works",
          actions: "Doubledown on top channels, expand content, build automation",
          impact: "Winning channels get more budget",
        },
        {
          quarter: "Q3",
          focus: "Automate & Streamline",
          actions: "Full funnel automation, team hiring, CRM optimization",
          impact: "Leads flow without manual handoffs",
        },
        {
          quarter: "Q4",
          focus: "Expand & Grow",
          actions: "New channel expansion, deeper market reach, LTV optimization",
          impact: "New markets and channels tested",
        },
      ],
    },
    metricsSection: {
      title: "Proven outcomes.",
      subtitle: "Outcomes from recent consulting engagements,|reported against baselines set at kickoff.",
      metrics: [
        { label: "Blended CPL Reduction", value: 45, prefix: "-", suffix: "%", desc: "SaaS Platform: channel reallocation after growth audit" },
        { label: "Engagement Length", value: 9, suffix: " months", desc: "Typical partnership length" },
        { label: "Retention Rate", value: 94, suffix: "%", desc: "Clients who renew year-over-year" },
      ],
    },
    processSection: {
      title: "The consulting process.",
      subtitle: "From discovery to scaling:|a clear process you can run again and again.",
    },
    processIntro:
      "Growth consulting is not a strategy deck. Our engagement runs from full revenue-system audit through roadmap delivery, implementation oversight, and quarterly reviews, with the option to execute what we recommend.",
    phases: [
      { title: "Discovery & Growth Audit", desc: "We dig into your marketing ops, tech stack, funnel performance, and what competitors are doing.", metric: "" },
      { title: "Strategy & Roadmap", desc: "A prioritized growth roadmap with timelines, channel recommendations, and projected impact.", metric: "" },
      { title: "Implementation Oversight", desc: "We coordinate execution across your team and partners so strategy stays tied to reality.", metric: "" },
      { title: "Review & Scale", desc: "Monthly performance reviews. Underperformers get cut. Winners get more fuel.", metric: "" },
    ],
    capabilityBodies: {
      growthAudit:
        "You cannot fix what you have not diagnosed. We audit your full revenue system, website conversion, ad accounts, SEO, email, analytics, and score each channel on tracking accuracy, creative quality, and pipeline contribution. The framework below shows how we map traffic, conversion, revenue, and retention as one engine.",
      channelMix:
        "Budget split evenly across channels is not a strategy. We compare true cost per qualified lead from CRM data across SEO, paid, email, and social, then recommend where to invest, pause, or restructure. Recommendations account for CAC, LTV, and payback, growth that destroys margin is not growth.",
      roadmap:
        "A roadmap without milestones is a wish list. We deliver a quarterly plan with channel priorities, budget splits, KPI targets, and decision points for scaling or pivoting. You get live working sessions to review performance and adjust, not a PDF that collects dust after week four.",
    },
    cta: {
      headline: "Ready to build your growth roadmap?",
      subtitle:
        "We'll build a growth strategy fit for your business and revenue goals,|not a one-size-fits-all playbook.",
      ctaLabel: "See Growth Consulting Pricing",
    },
    inlineCtaLabel: "Get a Growth Audit",
    inlineCtaSubtitle:
      "We will audit your channel mix, tracking gaps, and competitive landscape. Then outline a prioritized 90-day growth plan.",
    faqs: [
      { question: "What is fractional growth consulting?", answer: "We act as your embedded growth team without the full-time overhead. You get senior-level strategy, implementation oversight, and weekly accountability, all tied to your revenue goals, without hiring a VP of Marketing." },
      { question: "How long is a typical engagement?", answer: "Our average engagement runs 9 months. Most clients see meaningful ROI by month 3 and choose to continue because the compounding results keep accelerating. We work month-to-month so retention is earned, not locked in by contract." },
      { question: "What does the first 90 days look like?", answer: "Week 1–2: full growth audit covering marketing ops, funnel performance, and competitive landscape. Week 3–4: we deliver your 90-day growth roadmap with priorities, channels, and projected impact. Month 2–3: we oversee implementation and track results." },
      { question: "Do you implement strategy or just advise?", answer: "We advise and oversee implementation. We coordinate with your internal team and external vendors to make sure strategy stays connected to execution. If you need us to bring in specialists, we can source and manage them as well." },
      { question: "How do you measure consulting success?", answer: "Pipeline growth, cost per acquisition, new revenue from channels we've built, and retention rate. We establish baseline metrics in week one and report against them monthly. You always know exactly what our work is producing." },
    ],
  },
  es: {
    hero: {
      label: "Hoja de Ruta Estratégica",
      headlineLine1: "Sistemas de crecimiento",
      headlineLine2: "para tu negocio.",
      subtitle:
        "Auditorías full-funnel, estrategia de canales,|roadmaps de crecimiento y asesoría fractional, todo ligado a tus objetivos de ingresos.",
      ctaLabel: "Construye Tu Estrategia de Crecimiento",
    },
    frameworkSection: {
      title: "Framework de Crecimiento de Ingresos",
      subtitle: "El crecimiento sostenible se construye en capas: tráfico que convierte, sistemas de conversión que retienen y estrategias de retención que multiplican ingresos. Cada capa refuerza a las demás, por eso las mejoras se acumulan en lugar de desvanecerse tras el primer trimestre.",
      layers: [
        { id: "traffic", layer: "Tráfico", channels: "SEO, Paid Ads, Social, Referidos", status: "Auditado" },
        { id: "conversion", layer: "Conversión", channels: "Funnels, CRO, Landing Pages", status: "Optimizado" },
        { id: "revenue", layer: "Ingresos", channels: "Precios, Ofertas, Upsells", status: "Escalado" },
        { id: "retention", layer: "Retención", channels: "Email, Comunidad, Soporte", status: "Automatizado" },
      ],
    },
    roadmapSection: {
      title: "El roadmap de crecimiento de 4 trimestres.",
      subtitle:
        "Un enfoque por fases que genera impulso trimestre a trimestre.|Cada fase tiene objetivos claros y resultados medibles.",
      quarters: [
        {
          quarter: "Q1",
          focus: "Fundación y Victorias Rápidas",
          actions: "Setup de analytics, auditoría de funnel, corregir fugas, lanzar primeras campañas",
          impact: "Foundation and quick wins live",
        },
        {
          quarter: "Q2",
          focus: "Escalar lo que Funciona",
          actions: "Duplicar esfuerzo en mejores canales, expandir contenido, construir automatización",
          impact: "Winning channels get more budget",
        },
        {
          quarter: "Q3",
          focus: "Automatizar y Optimizar",
          actions: "Automatización full-funnel, contratación de equipo, optimización CRM",
          impact: "Leads flow without manual handoffs",
        },
        {
          quarter: "Q4",
          focus: "Expandir y Crecer",
          actions: "Expansión a nuevos canales, mayor alcance de mercado, optimización LTV",
          impact: "New markets and channels tested",
        },
      ],
    },
    metricsSection: {
      title: "Resultados comprobados.",
      subtitle: "Estos números representan la mejora promedio en nuestros|proyectos de consultoría de crecimiento.",
      metrics: [
        { label: "Reducción CPL Combinado", value: 45, prefix: "-", suffix: "%", desc: "Plataforma SaaS: reasignación de canales tras auditoría" },
        { label: "Duración del Engagement", value: 9, suffix: " meses", desc: "Promedio de asociación con clientes" },
        { label: "Tasa de Retención", value: 94, suffix: "%", desc: "Retención de clientes año a año" },
      ],
    },
    processSection: {
      title: "El proceso de consultoría.",
      subtitle: "Del descubrimiento al escalado:|un proceso claro que puedes repetir una y otra vez.",
    },
    processIntro:
      "La consultoría de crecimiento no es un deck de estrategia. Nuestro engagement va de auditoría completa del sistema de ingresos a entrega de roadmap, supervisión de implementación y revisiones trimestrales, con opción de ejecutar lo que recomendamos.",
    phases: [
      { title: "Descubrimiento y Auditoría de Crecimiento", desc: "Analizamos operaciones de marketing, tech stack, rendimiento del funnel y competidores.", metric: "" },
      { title: "Estrategia y Roadmap", desc: "Roadmap de crecimiento priorizado con plazos, recomendaciones de canales e impacto proyectado.", metric: "" },
      { title: "Supervisión de Implementación", desc: "Coordinamos ejecución con tu equipo y partners para que la estrategia se mantenga alineada.", metric: "" },
      { title: "Revisión y Escala", desc: "Revisiones mensuales de rendimiento. Lo que no funciona se corta. Los ganadores reciben más impulso.", metric: "" },
    ],
    capabilityBodies: {
      growthAudit:
        "No puedes arreglar lo que no has diagnosticado. Auditamos tu sistema de ingresos completo, conversión web, cuentas de anuncios, SEO, email, analytics, y puntuamos cada canal en precisión de tracking, calidad creativa y contribución al pipeline. El marco siguiente muestra cómo mapeamos tráfico, conversión, ingresos y retención como un motor.",
      channelMix:
        "Repartir presupuesto a partes iguales entre canales no es estrategia. Comparamos el costo real por lead calificado desde datos del CRM en SEO, paid, email y social, luego recomendamos dónde invertir, pausar o reestructurar. Las recomendaciones consideran CAC, LTV y payback.",
      roadmap:
        "Un roadmap sin hitos es una lista de deseos. Entregamos un plan trimestral con prioridades de canal, reparto de presupuesto, KPIs y puntos de decisión para escalar o pivotar. Sesiones de trabajo en vivo para revisar rendimiento y ajustar, no un PDF que acumula polvo tras la semana cuatro.",
    },
    cta: {
      headline: "¿Listo para construir tu roadmap de crecimiento?",
      subtitle:
        "Construiremos una estrategia de crecimiento adaptada a tu negocio y objetivos de ingresos,|no un playbook genérico.",
      ctaLabel: "Ver Precios de Consultoría",
    },
    inlineCtaLabel: "Obtener una Auditoría de Crecimiento",
    inlineCtaSubtitle:
      "Auditaremos tu mix de canales, brechas de tracking y panorama competitivo, y delinearemos un plan de crecimiento priorizado de 90 días.",
    faqs: [
      { question: "¿Qué es la consultoría de crecimiento fraccionada?", answer: "Actuamos como tu equipo de crecimiento integrado sin el costo de contratar a tiempo completo. Obtienes estrategia de nivel senior, supervisión de implementación y responsabilidad semanal, todo vinculado a tus objetivos de ingresos." },
      { question: "¿Cuánto dura un engagement típico?", answer: "Nuestro engagement promedio dura 9 meses. La mayoría de los clientes ven un ROI significativo en el mes 3 y optan por continuar porque los resultados se acumulan. Trabajamos mes a mes para que la retención se gane con resultados." },
      { question: "¿Cómo son los primeros 90 días?", answer: "Semanas 1-2: auditoría completa de crecimiento. Semanas 3-4: entregamos tu hoja de ruta de 90 días con prioridades y proyecciones de impacto. Meses 2-3: supervisamos la implementación y medimos los resultados." },
      { question: "¿Implementan la estrategia o solo asesoran?", answer: "Asesoramos y supervisamos la implementación. Coordinamos con tu equipo interno y proveedores externos para que la estrategia esté conectada con la ejecución. Si necesitas especialistas, también podemos captarlos y gestionarlos." },
      { question: "¿Cómo miden el éxito de la consultoría?", answer: "Crecimiento del pipeline, costo por adquisición, nuevos ingresos de los canales que hemos construido y tasa de retención. Establecemos métricas base en la semana uno y reportamos mensualmente. Siempre sabrás exactamente qué está produciendo nuestro trabajo." },
    ],
  },};
