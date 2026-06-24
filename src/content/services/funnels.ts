import type { ServicePhase } from "@/components/ui/ServicePhaseList";
import type { Locale } from "@/i18n/routing";
import type { FAQItem } from "@/components/sections/FAQSection";

export type FlowStageContent = {
  label: string;
};

export type AutomationPathContent = {
  trigger: string;
  actions: string;
  delay: string;
};

export type FunnelComponentContent = {
  id: string;
  label: string;
  desc: string;
};

export type FunnelResultContent = {
  label: string;
  desc: string;
};

export type FunnelsContent = {
  hero: {
    label: string;
    headlineLine1: string;
    headlineLine2: string;
    subtitle: string;
    ctaLabel: string;
  };
  flowStages: FlowStageContent[];
  leadFlow: {
    title: string;
    subtitle: string;
  };
  automation: {
    title: string;
    subtitle: string;
    headerTrigger: string;
    headerPath: string;
    headerDelay: string;
    paths: AutomationPathContent[];
  };
  components: {
    title: string;
    subtitle: string;
    items: FunnelComponentContent[];
  };
  results: {
    title: string;
    subtitle: string;
    items: FunnelResultContent[];
  };
  phases: {
    title: string;
    subtitle: string;
    items: ServicePhase[];
  };
  cta: {
    headline: string;
    subtitle: string;
    ctaLabel: string;
  };
  faqs: FAQItem[];
};

export const funnelsContent: Record<Locale, FunnelsContent> = {
  en: {
    hero: {
      label: "Funnels & Conversion Systems",
      headlineLine1: "Turn traffic into",
      headlineLine2: "predictable revenue.",
      subtitle:
        "Full conversion systems: funnel architecture, landing pages, nurture automation, and A/B testing,|built and optimized as one compounding revenue engine.",
      ctaLabel: "Build My Conversion System",
    },
    flowStages: [
      { label: "Cold Traffic" },
      { label: "Landing Page" },
      { label: "Lead Captured" },
      { label: "Email Nurture" },
      { label: "Call Booked" },
      { label: "Deal Closed" },
    ],
    leadFlow: {
      title: "Lead Flow Simulator",
      subtitle:
        "Watch how traffic moves through your funnel.|Each stage has a conversion rate that determines final output.",
    },
    automation: {
      title: "Automation paths that run 24/7.",
      subtitle:
        "Every trigger, action,|and condition is mapped so your funnel runs without manual intervention.",
      headerTrigger: "Trigger",
      headerPath: "Automation Path",
      headerDelay: "Delay",
      paths: [
        {
          trigger: "New Lead Captured",
          actions: "Send welcome email → Add to segment → Notify sales → Schedule follow-up",
          delay: "Instant",
        },
        {
          trigger: "Email Opened (3x)",
          actions: "Move to warm segment → Send case study → Add retargeting pixel",
          delay: "24h after 3rd open",
        },
        {
          trigger: "Booked Call",
          actions: "Send confirmation → Send prep kit → Add to closed segment → Trigger SMS reminder",
          delay: "Instant",
        },
        {
          trigger: "No Open (7 days)",
          actions: "Change subject line → Resend → If still no open → Move to re-engagement sequence",
          delay: "Day 7",
        },
      ],
    },
    components: {
      title: "Funnel components.",
      subtitle: "Every piece of a high-converting funnel system,|designed to work together.",
      items: [
        { id: "lead-magnets", label: "Lead Magnets", desc: "Valuable assets that capture emails from cold traffic" },
        { id: "landing-pages", label: "Landing Pages", desc: "Conversion-optimized pages matched to ad traffic" },
        { id: "email-sequences", label: "Email Sequences", desc: "Multi-step automation that nurtures leads to booking" },
        { id: "crm-pathways", label: "CRM Pathways", desc: "Lead scoring, routing, and qualification logic" },
        { id: "sms-triggers", label: "SMS Triggers", desc: "Time-sensitive text messages for appointment booking funnels" },
        { id: "retargeting-flows", label: "Retargeting Flows", desc: "Re-engagement campaigns that pull unconverted leads back into the funnel" },
      ],
    },
    results: {
      title: "What a system this produces.",
      subtitle: "These numbers represent the average improvement across|all our funnel clients.",
      items: [
        { label: "Lead Capture", desc: "More leads from same traffic" },
        { label: "Email Open Rate", desc: "vs. 22% industry average" },
        { label: "Booking Rate Lift", desc: "More calls per lead" },
      ],
    },
    phases: {
      title: "Build process.",
      subtitle: "From strategy to live,|every funnel follows a proven build sequence.",
      items: [
        {
          title: "Funnel Mapping",
          desc: "Full customer journey mapped, from traffic source to booked call.",
          metric: "End-to-end journey mapped in week 1",
        },
        {
          title: "Landing Page Build",
          desc: "High-converting pages with lead magnets that capture emails.",
          metric: "Avg. 12% landing page conversion rate",
        },
        {
          title: "Email & SMS Setup",
          desc: "Multi-step sequences with segmentation and urgency triggers.",
          metric: "5+ automated nurture sequences",
        },
        {
          title: "CRM Integration",
          desc: "Lead scoring, routing rules, and sales notification workflows.",
          metric: "Leads routed in under 60 seconds",
        },
        {
          title: "Analytics & Optimize",
          desc: "Every funnel stage tracked. Conversion rate optimized continuously.",
          metric: "18% month-over-month funnel growth",
        },
      ],
    },
    cta: {
      headline: "Ready to build a funnel that runs itself?",
      subtitle:
        "We'll design a complete conversion system from first click to booked call,|fully automated.",
      ctaLabel: "Build My Funnel",
    },
    faqs: [
      { question: "What platforms do you build funnels on?", answer: "We work with your existing stack: GoHighLevel, HubSpot, ActiveCampaign, Klaviyo, ClickFunnels, and others. If you don't have a platform, we'll recommend the best fit for your business model and set it up from scratch." },
      { question: "How quickly can a funnel go live?", answer: "A standard lead capture and nurture funnel can launch in 2–4 weeks. More complex automations with CRM integration, SMS, and multi-stage sequences take 4–6 weeks. We give you a clear timeline after the strategy call." },
      { question: "Do I need a CRM to use your funnel service?", answer: "Ideally yes, but if you don't have one, we can set up a lightweight CRM as part of the build. We integrate lead routing, scoring, and notifications so your sales team knows exactly when and how to follow up with each lead." },
      { question: "What is the typical landing page conversion rate?", answer: "Our landing pages average 12% conversion from cold traffic. Warm traffic from email or retargeting typically converts at 20–35%. We optimize headline, CTA, form length, and social proof to squeeze each percentage point." },
      { question: "How do you measure funnel performance?", answer: "Cost per lead, booking rate, email open and click rates, and revenue per contact. We set up tracking at every stage of the funnel so you can see exactly where leads are progressing and where they're leaking." },
    ],
  },
  es: {
    hero: {
      label: "Sistemas de Conversión",
      headlineLine1: "Convierte el tráfico en",
      headlineLine2: "ingresos predecibles.",
      subtitle:
        "Sistemas de conversión completos: arquitectura de embudo, landing pages, automatización y pruebas A/B,|construidos y optimizados como un motor de ingresos compuesto.",
      ctaLabel: "Construir Mi Sistema de Conversión",
    },
    flowStages: [
      { label: "Tráfico Frío" },
      { label: "Landing Page" },
      { label: "Lead Capturado" },
      { label: "Nutrición por Email" },
      { label: "Llamada Reservada" },
      { label: "Trato Cerrado" },
    ],
    leadFlow: {
      title: "Simulador de Flujo de Leads",
      subtitle:
        "Observa cómo el tráfico avanza por tu embudo.|Cada etapa tiene una tasa de conversión que determina el resultado final.",
    },
    automation: {
      title: "Rutas de automatización que funcionan 24/7.",
      subtitle:
        "Cada trigger, acción y condición está mapeado para que tu embudo|funcione sin intervención manual.",
      headerTrigger: "Trigger",
      headerPath: "Ruta de Automatización",
      headerDelay: "Retraso",
      paths: [
        {
          trigger: "Nuevo Lead Capturado",
          actions: "Enviar email de bienvenida → Añadir a segmento → Notificar ventas → Programar seguimiento",
          delay: "Instantáneo",
        },
        {
          trigger: "Email Abierto (3x)",
          actions: "Mover a segmento cálido → Enviar caso de estudio → Añadir pixel de retargeting",
          delay: "24h después de la 3ª apertura",
        },
        {
          trigger: "Llamada Reservada",
          actions: "Enviar confirmación → Enviar kit de preparación → Añadir a segmento cerrado → Activar recordatorio SMS",
          delay: "Instantáneo",
        },
        {
          trigger: "Sin Apertura (7 días)",
          actions: "Cambiar asunto → Reenviar → Si sigue sin abrir → Mover a secuencia de re-engagement",
          delay: "Día 7",
        },
      ],
    },
    components: {
      title: "Componentes del embudo.",
      subtitle: "Cada pieza de un sistema de embudo de alta conversión,|diseñado para trabajar en conjunto.",
      items: [
        { id: "lead-magnets", label: "Lead Magnets", desc: "Activos valiosos que capturan emails del tráfico frío" },
        { id: "landing-pages", label: "Landing Pages", desc: "Páginas optimizadas para conversión alineadas al tráfico de anuncios" },
        { id: "email-sequences", label: "Secuencias de Email", desc: "Automatización multi-paso que nutre leads hasta la reserva" },
        { id: "crm-pathways", label: "Rutas CRM", desc: "Lead scoring, enrutamiento y lógica de calificación" },
        { id: "sms-triggers", label: "Triggers SMS", desc: "Mensajes de texto urgentes para embudos de reserva de citas" },
        { id: "retargeting-flows", label: "Flujos de Retargeting", desc: "Campañas de reactivación que devuelven al embudo a leads no convertidos" },
      ],
    },
    results: {
      title: "Lo que produce un sistema así.",
      subtitle: "Estos números representan la mejora promedio en todos|nuestros clientes de embudos.",
      items: [
        { label: "Captura de Leads", desc: "Más leads con el mismo tráfico" },
        { label: "Tasa de Apertura de Email", desc: "vs. 22% promedio del sector" },
        { label: "Aumento en Tasa de Reserva", desc: "Más llamadas por lead" },
      ],
    },
    phases: {
      title: "Proceso de construcción.",
      subtitle: "De la estrategia a en vivo,|cada embudo sigue una secuencia de construcción probada.",
      items: [
        {
          title: "Mapeo del Embudo",
          desc: "Recorrido completo del cliente mapeado, desde la fuente de tráfico hasta la llamada reservada.",
          metric: "Recorrido de extremo a extremo mapeado en la semana 1",
        },
        {
          title: "Construcción de Landing Page",
          desc: "Páginas de alta conversión con lead magnets que capturan emails.",
          metric: "Prom. 12% tasa de conversión en landing page",
        },
        {
          title: "Configuración de Email y SMS",
          desc: "Secuencias multi-paso con segmentación y triggers de urgencia.",
          metric: "5+ secuencias de nutrición automatizadas",
        },
        {
          title: "Integración CRM",
          desc: "Lead scoring, reglas de enrutamiento y flujos de notificación a ventas.",
          metric: "Leads enrutados en menos de 60 segundos",
        },
        {
          title: "Analítica y Optimización",
          desc: "Cada etapa del embudo rastreada. Tasa de conversión optimizada continuamente.",
          metric: "18% crecimiento mensual del embudo",
        },
      ],
    },
    cta: {
      headline: "¿Listo para construir un embudo que se gestiona solo?",
      subtitle:
        "Diseñaremos un sistema de conversión completo,|del primer clic a la llamada reservada, totalmente automatizado.",
      ctaLabel: "Construir Mi Embudo",
    },
    faqs: [
      { question: "¿En qué plataformas construyen funnels?", answer: "Trabajamos con tu stack existente: GoHighLevel, HubSpot, ActiveCampaign, Klaviyo, ClickFunnels y otros. Si no tienes una plataforma, recomendamos la mejor para tu modelo de negocio y la configuramos desde cero." },
      { question: "¿Cuánto tiempo tarda un funnel en estar en vivo?", answer: "Un funnel estándar de captura de leads y nurturing puede lanzarse en 2-4 semanas. Automatizaciones más complejas con integración CRM, SMS y secuencias multi-etapa toman 4-6 semanas." },
      { question: "¿Necesito un CRM para usar vuestro servicio de funnels?", answer: "Idealmente sí, pero si no tienes uno, podemos configurar un CRM ligero como parte del build. Integramos enrutamiento de leads, scoring y notificaciones para que tu equipo de ventas sepa cuándo y cómo hacer seguimiento." },
      { question: "¿Cuál es la tasa de conversión típica de una landing page?", answer: "Nuestras landing pages promedian un 12% de conversión con tráfico frío. El tráfico caliente de email o retargeting típicamente convierte al 20-35%. Optimizamos cada elemento de la página para maximizar cada punto porcentual." },
      { question: "¿Cómo miden el rendimiento del funnel?", answer: "Coste por lead, tasa de reserva, tasas de apertura y clic de email, e ingresos por contacto. Configuramos tracking en cada etapa del funnel para que veas exactamente dónde avanzan los leads y dónde se pierden." },
    ],
  },};
