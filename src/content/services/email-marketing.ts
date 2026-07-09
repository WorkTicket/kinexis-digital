import type { Locale } from "@/i18n/routing";
import type { FAQItem } from "@/components/sections/FAQSection";

export type ServicePhaseContent = {
  title: string;
  desc: string;
  metric: string;
};

export type SequenceRow = {
  day: string;
  action: string;
  open: string;
  click: string;
};

export type AutomationTypeContent = {
  id: "welcome" | "nurture" | "abandoned" | "lifecycle";
  label: string;
  desc: string;
};

export type MetricCardContent = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  desc: string;
};

export type EmailMarketingContent = {
  hero: {
    label: string;
    headlineLine1: string;
    headlineLine2: string;
    subtitle: string;
    ctaLabel: string;
  };
  sequenceSection: {
    title: string;
    subtitle: string;
    tableHeaders: {
      timing: string;
      email: string;
      open: string;
      click: string;
    };
  };
  sequenceMap: SequenceRow[];
  automationSection: {
    title: string;
    subtitle: string;
  };
  automationTypes: AutomationTypeContent[];
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
    emailSequences: string;
    automation: string;
    listGrowth: string;
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

export const emailMarketingContent: Record<Locale, EmailMarketingContent> = {
  en: {
    hero: {
      label: "Lifecycle Automation",
      headlineLine1: "Turn subscribers",
      headlineLine2: "into revenue.",
      subtitle:
        "Lifecycle email campaigns, nurture sequences,|and automation flows that convert casual subscribers into booked calls and repeat buyers.",
      ctaLabel: "Start Your Email Strategy",
    },
    sequenceSection: {
      title: "Email Sequence Flow",
      subtitle:
        "Every email in the sequence serves a specific purpose, from welcome to close.|Timed and tested for maximum engagement.",
      tableHeaders: {
        timing: "Timing",
        email: "Email",
        open: "Open",
        click: "Click",
      },
    },
    sequenceMap: [
      { day: "Day 0", action: "Welcome email + lead magnet delivery", open: "68%", click: "24%" },
      { day: "Day 3", action: "Value email: educational content", open: "52%", click: "18%" },
      { day: "Day 7", action: "Case study / social proof", open: "48%", click: "21%" },
      { day: "Day 14", action: "Soft offer: book a call", open: "42%", click: "15%" },
      { day: "Day 21", action: "Urgency trigger: limited availability", open: "38%", click: "19%" },
      { day: "Day 30", action: "Breakup email: last chance", open: "45%", click: "12%" },
    ],
    automationSection: {
      title: "Automation that runs 24/7.",
      subtitle:
        "Every trigger, action,|and condition mapped so your email system works without manual intervention.",
    },
    automationTypes: [
      {
        id: "welcome",
        label: "Welcome Sequences",
        desc: "Auto-responders that fire when someone subscribes or downloads a lead magnet",
      },
      {
        id: "nurture",
        label: "Nurture Flows",
        desc: "Multi-touch sequences that educate, build trust, and create booking opportunities",
      },
      {
        id: "abandoned",
        label: "Abandoned Lead Flows",
        desc: "Recovery flows for partial form fills, unbooked calls, and nurture exits",
      },
      {
        id: "lifecycle",
        label: "Lifecycle Triggers",
        desc: "Behavior-based emails based on opens, clicks, purchases, and inactivity",
      },
    ],
    metricsSection: {
      title: "Performance metrics.",
      subtitle: "Real numbers from real email campaigns,|not industry benchmarks pulled from blog posts.",
      metrics: [
        { label: "Avg. Open Rate", value: 38, suffix: "%", desc: "vs. 22% industry average" },
        { label: "Click-Through Rate", value: 4.2, suffix: "%", decimals: 1, desc: "vs. 2.5% industry average" },
        { label: "Revenue per Email", value: 0.42, prefix: "$", decimals: 2, desc: "Across all campaigns" },
        { label: "Booking Rate", value: 11, suffix: "%", desc: "Email to scheduled call" },
      ],
    },
    processSection: {
      title: "The build process.",
      subtitle: "From strategy to live campaigns,|every phase has a clear deliverable.",
    },
    processIntro:
      "Email is not a monthly blast calendar. Our build cycle runs from list audit through segmentation, automation build, and ongoing optimization, every phase tied to a deliverable your team can see in the ESP.",
    phases: [
      {
        title: "Audit & Strategy",
        desc: "Review current email infrastructure, list health, and past performance. Map the full lifecycle from opt-in to booked call.",
        metric: "",
      },
      {
        title: "Segmentation & Cleaning",
        desc: "Slice audience by behavior and engagement. Remove inactives and set suppression rules to protect sender reputation.",
        metric: "",
      },
      {
        title: "Campaign & Automation Build",
        desc: "Welcome sequences, nurture workflows, and recovery flows, all tested in staging before anything goes live.",
        metric: "",
      },
      {
        title: "Test, Report & Optimize",
        desc: "A/B test subject lines, send times, and CTAs. Monthly reports tie opens and clicks to pipeline contribution.",
        metric: "",
      },
    ],
    capabilityBodies: {
      emailSequences:
        "Email sequences only work when each send matches where the subscriber is in the buying process. We map welcome, nurture, objection-handling, and re-engagement flows to specific offers and pipeline stages, not a one-size-fits-all drip. Every email has one job: move the reader closer to a booked call or purchase. The cadence below shows a typical B2B nurture sequence we build and test before scaling.",
      automation:
        "Automation should run without you babysitting it, but only if triggers, conditions, and branches are mapped before anything goes live. We build welcome fires, behavioral nurture paths, abandoned lead recovery, and lifecycle triggers based on opens, clicks, and inactivity. Each workflow connects to a conversion event your sales team closes, not a vanity metric like open rate.",
      listGrowth:
        "List growth is meaningless if new subscribers hurt deliverability or never convert. We combine lead magnets, opt-in forms, landing pages, and paid traffic integration to add qualified contacts. Then segment and clean aggressively to protect sender reputation. Performance gets measured on pipeline contribution and booking rate, not list size or industry-average benchmarks.",
    },
    cta: {
      headline: "Ready to turn subscribers into revenue?",
      subtitle:
        "Let's build email campaigns that actually drive measurable results,|not just opens and clicks.",
      ctaLabel: "See Email Pricing",
    },
    inlineCtaLabel: "Audit My Email Program",
    inlineCtaSubtitle:
      "We will review your list health, automation gaps, and deliverability setup. Then outline the highest-impact sequence fixes.",
    faqs: [
      { question: "What email platforms do you work with?", answer: "We work with Klaviyo, ActiveCampaign, Mailchimp, HubSpot, Drip, ConvertKit, and most major ESPs. If you have a platform you're already invested in, we'll optimize it. If you're starting fresh, we'll recommend the best fit for your business model." },
      { question: "How do you grow my email list?", answer: "List growth is a strategy, not an accident. We combine lead magnets, optimized opt-in forms, landing pages, and paid traffic integration to add qualified subscribers, not just raw volume that hurts your deliverability." },
      { question: "What open rates can I expect?", answer: "Our average client sees 38% open rates against a 22% industry average. Results depend on list health, subject line strategy, and segmentation. We audit all of these before making any projections." },
      { question: "Do you handle copywriting and email design?", answer: "Yes. Our team handles strategy, copy, and design for every campaign and sequence we build. You review and approve before anything sends. Most clients don't need to write a single word." },
      { question: "How often should I email my list?", answer: "It depends on your audience and what you're selling. Most of our clients start at 2–4 emails per month and scale to weekly cadences once open rates confirm the list is engaged. We don't recommend frequency for frequency's sake. Every send has to earn its place." },
    ],
  },
  es: {
    hero: {
      label: "Automatización del Ciclo de Vida",
      headlineLine1: "Convierte suscriptores",
      headlineLine2: "en ingresos.",
      subtitle:
        "Campañas de email de ciclo de vida,|secuencias de nutrición y flujos de automatización que convierten suscriptores casuales en llamadas agendadas y compradores recurrentes.",
      ctaLabel: "Inicia Tu Estrategia de Email",
    },
    sequenceSection: {
      title: "Flujo de Secuencia de Email",
      subtitle:
        "Cada email de la secuencia cumple un propósito específico, desde la bienvenida hasta el cierre.|Programado y probado para máximo engagement.",
      tableHeaders: {
        timing: "Momento",
        email: "Email",
        open: "Apertura",
        click: "Clic",
      },
    },
    sequenceMap: [
      { day: "Día 0", action: "Email de bienvenida + entrega de lead magnet", open: "68%", click: "24%" },
      { day: "Día 3", action: "Email de valor: contenido educativo", open: "52%", click: "18%" },
      { day: "Día 7", action: "Caso de estudio / prueba social", open: "48%", click: "21%" },
      { day: "Día 14", action: "Oferta suave: agendar una llamada", open: "42%", click: "15%" },
      { day: "Día 21", action: "Disparador de urgencia: disponibilidad limitada", open: "38%", click: "19%" },
      { day: "Día 30", action: "Email de despedida: última oportunidad", open: "45%", click: "12%" },
    ],
    automationSection: {
      title: "Automatización que funciona 24/7.",
      subtitle:
        "Cada disparador, acción y condición mapeados para que tu sistema de|email funcione sin intervención manual.",
    },
    automationTypes: [
      {
        id: "welcome",
        label: "Secuencias de Bienvenida",
        desc: "Auto-respuestas que se activan cuando alguien se suscribe o descarga un lead magnet",
      },
      {
        id: "nurture",
        label: "Flujos de Nutrición",
        desc: "Secuencias multitoque que educan, generan confianza y crean oportunidades de reserva",
      },
      {
        id: "abandoned",
        label: "Carrito Abandonado",
        desc: "Flujos de recuperación que traen de vuelta a visitantes que se fueron antes de convertir",
      },
      {
        id: "lifecycle",
        label: "Disparadores de Ciclo de Vida",
        desc: "Emails basados en comportamiento según aperturas, clics, compras e inactividad",
      },
    ],
    metricsSection: {
      title: "Métricas de rendimiento.",
      subtitle: "Números reales de campañas reales,|no benchmarks de la industria sacados de blogs.",
      metrics: [
        { label: "Tasa de Apertura Prom.", value: 38, suffix: "%", desc: "vs. 22% promedio de la industria" },
        { label: "Tasa de Clic", value: 4.2, suffix: "%", decimals: 1, desc: "vs. 2.5% promedio de la industria" },
        { label: "Ingresos por Email", value: 0.42, prefix: "$", decimals: 2, desc: "En todas las campañas" },
        { label: "Tasa de Reserva", value: 11, suffix: "%", desc: "De email a llamada agendada" },
      ],
    },
    processSection: {
      title: "El proceso de construcción.",
      subtitle: "De la estrategia a campañas en vivo,|cada fase tiene un entregable claro.",
    },
    processIntro:
      "El email no es un calendario de envíos mensuales. Nuestro ciclo va de la auditoría de lista a segmentación, construcción de automatización y optimización continua, cada fase ligada a un entregable que tu equipo puede ver en el ESP.",
    phases: [
      {
        title: "Auditoría y Estrategia",
        desc: "Revisar infraestructura de email actual, salud de la lista y rendimiento pasado. Mapear el ciclo de vida completo desde opt-in hasta llamada agendada.",
        metric: "",
      },
      {
        title: "Segmentación y Limpieza",
        desc: "Segmentar audiencia por comportamiento y engagement. Eliminar inactivos y definir reglas de supresión para proteger la reputación del remitente.",
        metric: "",
      },
      {
        title: "Construcción de Campañas y Automatización",
        desc: "Secuencias de bienvenida, flujos de nutrición y recuperación, todo probado en staging antes de publicar.",
        metric: "",
      },
      {
        title: "Probar, Reportar y Optimizar",
        desc: "Pruebas A/B de asuntos, horarios de envío y CTAs. Reportes mensuales vinculan aperturas y clics a contribución al pipeline.",
        metric: "",
      },
    ],
    capabilityBodies: {
      emailSequences:
        "Las secuencias de email solo funcionan cuando cada envío coincide con dónde está el suscriptor en el proceso de compra. Mapeamos flujos de bienvenida, nutrición, manejo de objeciones y re-engagement a ofertas específicas y etapas del pipeline, no un drip genérico. Cada email tiene un trabajo: acercar al lector a una llamada agendada o una compra. La cadencia siguiente muestra una secuencia típica de nurture B2B que construimos y probamos antes de escalar.",
      automation:
        "La automatización debe funcionar sin que la vigiles, pero solo si los disparadores, condiciones y ramas están mapeados antes de publicar. Construimos bienvenidas automáticas, rutas de nurture conductual, recuperación de leads abandonados y disparadores de ciclo de vida según aperturas, clics e inactividad. Cada flujo se conecta a un evento de conversión que tu equipo de ventas cierra, no a una métrica vanidad como la tasa de apertura.",
      listGrowth:
        "Hacer crecer la lista no sirve si los nuevos suscriptores dañan la entregabilidad o nunca convierten. Combinamos lead magnets, formularios de opt-in, landing pages e integración con tráfico de pago para agregar contactos calificados, luego segmentamos y limpiamos de forma agresiva para proteger la reputación del remitente. El rendimiento se mide por contribución al pipeline y tasa de reserva, no por tamaño de lista ni benchmarks del sector.",
    },
    cta: {
      headline: "¿Listo para convertir suscriptores en ingresos?",
      subtitle:
        "Construyamos campañas de email que realmente generen resultados medibles,|no solo aperturas y clics.",
      ctaLabel: "Ver Precios de Email",
    },
    inlineCtaLabel: "Auditar Mi Programa de Email",
    inlineCtaSubtitle:
      "Revisaremos la salud de tu lista, brechas de automatización y configuración de entregabilidad, y delinearemos las correcciones de secuencia de mayor impacto.",
    faqs: [
      { question: "¿Con qué plataformas de email trabajan?", answer: "Trabajamos con Klaviyo, ActiveCampaign, Mailchimp, HubSpot, Drip, ConvertKit y la mayoría de los ESPs principales. Si ya tienes una plataforma, la optimizamos. Si empiezas desde cero, recomendamos la mejor para tu modelo de negocio." },
      { question: "¿Cómo hacen crecer mi lista de email?", answer: "El crecimiento de la lista es una estrategia, no un accidente. Combinamos lead magnets, formularios de opt-in optimizados, landing pages e integración con tráfico de pago para agregar suscriptores calificados que no dañen tu entregabilidad." },
      { question: "¿Qué tasas de apertura puedo esperar?", answer: "Nuestros clientes promedio ven tasas de apertura del 38% frente al 22% del promedio del sector. Los resultados dependen de la salud de la lista, la estrategia de asunto y la segmentación. Auditamos todo esto antes de hacer cualquier proyección." },
      { question: "¿Manejan el copywriting y el diseño de emails?", answer: "Sí. Nuestro equipo gestiona la estrategia, el copy y el diseño para cada campaña y secuencia que construimos. Tú revisas y apruebas antes de que se envíe nada. La mayoría de los clientes no necesitan escribir una sola palabra." },
      { question: "¿Con qué frecuencia debería enviar emails a mi lista?", answer: "Depende de tu audiencia y de lo que vendes. La mayoría de nuestros clientes comienzan con 2-4 emails al mes y aumentan cuando las tasas de apertura confirman que la lista está comprometida. No recomendamos frecuencia por el simple hecho de hacerlo." },
    ],
  },};
