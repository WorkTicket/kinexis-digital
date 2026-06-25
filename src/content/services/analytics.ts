import type { Locale } from "@/i18n/routing";
import type { ServicePhase } from "@/components/ui/ServicePhaseList";
import type { FAQItem } from "@/components/sections/FAQSection";

export type MetricCardContent = {
  label: string;
  shortLabel: string;
  value: number;
  suffix: string;
  desc: string;
};

export type DataLayerContent = {
  id: "traffic" | "behavior" | "conversions" | "attribution";
  label: string;
  metric: string;
};

export type StackItemContent = {
  id: "ga4" | "dashboards" | "attribution";
  title: string;
  desc: string;
};

export type AnalyticsContent = {
  hero: {
    label: string;
    headlineLine1: string;
    headlineLine2: string;
    subtitle: string;
    ctaLabel: string;
  };
  dataWallSection: {
    title: string;
    subtitle: string;
  };
  dataLayers: DataLayerContent[];
  stackSection: {
    title: string;
    subtitle: string;
    items: StackItemContent[];
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
  phases: ServicePhase[];
  cta: {
    headline: string;
    subtitle: string;
    ctaLabel: string;
  };
  faqs: FAQItem[];
};

export const analyticsContent: Record<Locale, AnalyticsContent> = {
  en: {
    hero: {
      label: "Data Clarity",
      headlineLine1: "Measure it.",
      headlineLine2: "Improve it.",
      subtitle:
        "Custom analytics dashboards with proper GA4 implementation, event tracking, and multi-channel attribution.|Real visibility into what's driving revenue.",
      ctaLabel: "Audit Your Analytics Setup",
    },
    dataWallSection: {
      title: "Live Data Wall",
      subtitle:
        "All the metrics that drive decisions: traffic sources, conversion events, attribution, and revenue. Organized into a single, always-current view so your team can act without wading through disconnected reports.",
    },
    dataLayers: [
      { id: "traffic", label: "Traffic Sources", metric: "All channels tracked" },
      { id: "behavior", label: "User Behavior", metric: "Session recordings + heatmaps" },
      { id: "conversions", label: "Conversions", metric: "Goal completions tracked" },
      { id: "attribution", label: "Attribution", metric: "Multi-touch models active" },
    ],
    stackSection: {
      title: "The analytics stack.",
      subtitle:
        "A complete implementation covering tracking, dashboards, and attribution. Every meaningful interaction is captured, reported clearly, and tied back to revenue rather than activity.",
      items: [
        {
          id: "ga4",
          title: "GA4 + GTM Setup",
          desc: "Proper property configuration, event tracking, conversion goals, and e-commerce tracking from scratch.",
        },
        {
          id: "dashboards",
          title: "Custom Dashboards",
          desc: "Looker Studio dashboards showing KPIs in a clean format. No more digging through endless reports.",
        },
        {
          id: "attribution",
          title: "Attribution Models",
          desc: "Multi-touch attribution showing the full customer journey, not just last-click before a sale.",
        },
      ],
    },
    metricsSection: {
      title: "What gets measured gets managed.",
      subtitle:
        "These numbers represent the improvement our analytics clients|see within 90 days of implementation.",
      metrics: [
        { label: "Tracking Accuracy", shortLabel: "Tracking", value: 95, suffix: "%", desc: "Events captured correctly" },
        { label: "Insights Delivered", shortLabel: "Insights", value: 12, suffix: "/mo", desc: "Practical recommendations" },
        { label: "ROI Clarity Gain", shortLabel: "ROI", value: 85, suffix: "%", desc: "vs. baseline measurement" },
        { label: "Channel Coverage", shortLabel: "Channels", value: 100, suffix: "%", desc: "Paid, organic, and CRM synced" },
      ],
    },
    processSection: {
      title: "The implementation process.",
      subtitle: "From audit to live dashboards,|with a clear deliverable at every step.",
    },
    phases: [
      {
        title: "Audit & Requirements",
        desc: "Review current tracking, find gaps, identify key business questions analytics needs to answer.",
        metric: "Full tracking audit in week 1",
      },
      {
        title: "GA4 & GTM Build",
        desc: "Property setup, container config, event tracking, conversion goals, e-commerce tracking.",
        metric: "Full tracking live within 2 weeks",
      },
      {
        title: "Dashboard & Reports",
        desc: "Custom dashboards showing KPIs in a clean, easy-to-read format.",
        metric: "12 useful insights per month",
      },
      {
        title: "Attribution Setup",
        desc: "Multi-touch models so you see the full customer journey across every channel.",
        metric: "95% tracking accuracy",
      },
      {
        title: "Monitor & Optimize",
        desc: "Weekly data quality checks, alerts for tracking breaks, monthly report reviews.",
        metric: "18% month-over-month visibility improvement",
      },
    ],
    cta: {
      headline: "Ready to see your real numbers?",
      subtitle:
        "We'll audit your current analytics setup and build a measurement system|that gives you clear visibility you can act on.",
      ctaLabel: "Audit My Analytics",
    },
    faqs: [
      { question: "What analytics tools do you set up?", answer: "We implement GA4, Google Tag Manager, and Looker Studio dashboards as a baseline. We also set up multi-touch attribution and integrate with your CRM or ad platforms for full-funnel revenue visibility." },
      { question: "How do I know if my current tracking is accurate?", answer: "We start with a full audit of your existing setup: missing events, broken conversions, duplicated tags. We fix all of it before building anything new." },
      { question: "Do you build custom dashboards?", answer: "Yes. Every client gets Looker Studio dashboards built around their specific KPIs, not templated reports with irrelevant metrics. You get a clean view of what's driving revenue and what isn't." },
      { question: "How long does the implementation take?", answer: "A standard GA4 + GTM setup takes 2–4 weeks. More complex setups with CRM integration, e-commerce tracking, or multi-location attribution take 4–6 weeks. We give you a clear timeline after the audit." },
      { question: "Can you connect analytics to my CRM?", answer: "Yes. We integrate GA4 and ad platforms with most major CRMs for offline conversion import and revenue attribution. This means you can see which campaigns and channels are actually generating closed revenue, not just leads." },
    ],
  },
  es: {
    hero: {
      label: "Claridad de Datos",
      headlineLine1: "Mídelo.",
      headlineLine2: "Mejóralo.",
      subtitle:
        "Dashboards de analytics personalizados con GA4, event tracking y atribución multicanal.|Visibilidad real de lo que impulsa ingresos.",
      ctaLabel: "Audita Tu Configuración de Analytics",
    },
    dataWallSection: {
      title: "Muro de Datos en Vivo",
      subtitle:
        "Todas las métricas que impulsan decisiones: fuentes de tráfico, eventos de conversión, atribución e ingresos. Organizadas en una vista siempre actualizada para que tu equipo pueda actuar sin navegar por reportes desconectados.",
    },
    dataLayers: [
      { id: "traffic", label: "Fuentes de Tráfico", metric: "Todos los canales rastreados" },
      { id: "behavior", label: "Comportamiento de Usuario", metric: "Grabaciones de sesión + heatmaps" },
      { id: "conversions", label: "Conversiones", metric: "Completaciones de objetivos rastreadas" },
      { id: "attribution", label: "Atribución", metric: "Modelos multitoque activos" },
    ],
    stackSection: {
      title: "El stack de analytics.",
      subtitle:
        "Una implementación completa que cubre tracking, dashboards y atribución. Cada interacción significativa se captura, se reporta con claridad y se vincula a ingresos en lugar de actividad.",
      items: [
        {
          id: "ga4",
          title: "Configuración GA4 + GTM",
          desc: "Configuración de propiedad, event tracking, objetivos de conversión y e-commerce desde cero.",
        },
        {
          id: "dashboards",
          title: "Dashboards Personalizados",
          desc: "Dashboards en Looker Studio con KPIs en formato claro. Sin más reportes interminables.",
        },
        {
          id: "attribution",
          title: "Modelos de Atribución",
          desc: "Atribución multitoque que muestra el recorrido completo del cliente, no solo el último clic.",
        },
      ],
    },
    metricsSection: {
      title: "Lo que se mide, se gestiona.",
      subtitle:
        "Estos números representan la mejora que ven nuestros clientes de|analytics en 90 días de implementación.",
      metrics: [
        { label: "Precisión de Tracking", shortLabel: "Tracking", value: 95, suffix: "%", desc: "Eventos capturados correctamente" },
        { label: "Insights Entregados", shortLabel: "Insights", value: 12, suffix: "/mes", desc: "Recomendaciones prácticas" },
        { label: "Ganancia en Claridad ROI", shortLabel: "ROI", value: 85, suffix: "%", desc: "vs. medición base" },
        { label: "Cobertura de Canales", shortLabel: "Canales", value: 100, suffix: "%", desc: "Paid, orgánico y CRM sincronizados" },
      ],
    },
    processSection: {
      title: "El proceso de implementación.",
      subtitle: "De la auditoría a dashboards en vivo,|con un entregable claro en cada paso.",
    },
    phases: [
      {
        title: "Auditoría y Requisitos",
        desc: "Revisar tracking actual, encontrar brechas e identificar preguntas clave de negocio.",
        metric: "Auditoría de tracking completa en semana 1",
      },
      {
        title: "Construcción GA4 y GTM",
        desc: "Configuración de propiedad, contenedor, event tracking, objetivos de conversión y e-commerce.",
        metric: "Tracking completo en vivo en 2 semanas",
      },
      {
        title: "Dashboard y Reportes",
        desc: "Dashboards personalizados con KPIs en formato claro y fácil de leer.",
        metric: "12 insights útiles por mes",
      },
      {
        title: "Configuración de Atribución",
        desc: "Modelos multitoque para ver el recorrido completo del cliente en cada canal.",
        metric: "95% de precisión de tracking",
      },
      {
        title: "Monitoreo y Optimización",
        desc: "Revisiones semanales de calidad de datos, alertas por fallos y revisiones mensuales.",
        metric: "18% mejora mes a mes en visibilidad",
      },
    ],
    cta: {
      headline: "¿Listo para ver tus números reales?",
      subtitle:
        "Auditaremos tu configuración actual y construiremos un sistema de|medición con visibilidad clara y accionable.",
      ctaLabel: "Auditar Mi Analytics",
    },
    faqs: [
      { question: "¿Qué herramientas de analítica configuran?", answer: "Implementamos GA4, Google Tag Manager y dashboards en Looker Studio como base. También configuramos atribución multitáctil e integramos con tu CRM o plataformas publicitarias para visibilidad completa del funnel." },
      { question: "¿Cómo sé si mi tracking actual es preciso?", answer: "Comenzamos con una auditoría completa de tu configuración: eventos perdidos, conversiones rotas, etiquetas duplicadas. Lo corregimos todo antes de construir nada nuevo." },
      { question: "¿Construís dashboards personalizados?", answer: "Sí. Cada cliente recibe dashboards en Looker Studio construidos alrededor de sus KPIs específicos, no informes genéricos. Obtienes una vista clara de lo que genera ingresos y lo que no." },
      { question: "¿Cuánto tiempo tarda la implementación?", answer: "Una configuración estándar de GA4 + GTM tarda 2-4 semanas. Configuraciones más complejas con integración CRM o tracking de e-commerce toman 4-6 semanas. Te damos un calendario claro tras la auditoría." },
      { question: "¿Pueden conectar la analítica con mi CRM?", answer: "Sí. Integramos GA4 y plataformas publicitarias con la mayoría de los CRMs para importación de conversiones offline y atribución de ingresos. Puedes ver qué campañas generan ingresos reales, no solo leads." },
    ],
  },};
