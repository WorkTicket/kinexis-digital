import type { Locale } from "@/i18n/routing";
import type { ServicePhase } from "@/components/ui/ServicePhaseList";
import type { FAQItem } from "@/components/sections/FAQSection";

export type ProductionPhaseContent = {
  id: "pre" | "prod" | "post" | "dist";
  phase: string;
  tasks: string;
  duration: string;
};

export type VideoTypeContent = {
  type: string;
  length: string;
  platform: string;
  goal: string;
};

export type MetricCardContent = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  desc: string;
};

export type VideoMarketingContent = {
  hero: {
    label: string;
    headlineLine1: string;
    headlineLine2: string;
    subtitle: string;
    ctaLabel: string;
  };
  heroVizLabels: string[];
  productionSection: {
    title: string;
    subtitle: string;
    durationLabel: string;
  };
  productionPhases: ProductionPhaseContent[];
  formatsSection: {
    title: string;
    subtitle: string;
    lengthLabel: string;
    platformLabel: string;
  };
  videoTypes: VideoTypeContent[];
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

export const videoMarketingContent: Record<Locale, VideoMarketingContent> = {
  en: {
    hero: {
      label: "Visual Storytelling",
      headlineLine1: "Video that stops",
      headlineLine2: "the scroll.",
      subtitle:
        "Short-form social, testimonials, ad creative,|and product demos built to hold attention.",
      ctaLabel: "Start Your Video Strategy",
    },
    heroVizLabels: ["Reel", "Story", "Ad"],
    productionSection: {
      title: "Production Process",
      subtitle: "Every video follows the same production process,|from concept to delivery.",
      durationLabel: "Duration",
    },
    productionPhases: [
      {
        id: "pre",
        phase: "Pre-Production",
        tasks: "Strategy, scripting, storyboarding, casting, location scouting",
        duration: "1 week",
      },
      {
        id: "prod",
        phase: "Production",
        tasks: "On-location or remote filming, professional equipment, client coordination",
        duration: "1-2 days",
      },
      {
        id: "post",
        phase: "Post-Production",
        tasks: "Editing, color grading, sound design, motion graphics, captions",
        duration: "1 week",
      },
      {
        id: "dist",
        phase: "Distribution",
        tasks: "Platform-specific formatting, delivery, performance tracking",
        duration: "Ongoing",
      },
    ],
    formatsSection: {
      title: "Video formats that perform.",
      subtitle:
        "Different goals require different formats.|We match the video type to the platform and the outcome.",
      lengthLabel: "Length",
      platformLabel: "Platform",
    },
    videoTypes: [
      {
        type: "Short-Form Social",
        length: "15-30s",
        platform: "Instagram, TikTok, YT Shorts",
        goal: "Hook + brand awareness",
      },
      {
        type: "Testimonials",
        length: "60-90s",
        platform: "Website, YouTube, LinkedIn",
        goal: "Trust + social proof",
      },
      {
        type: "Product Demos",
        length: "60-120s",
        platform: "Website, YouTube, Sales",
        goal: "Education + conversion",
      },
      {
        type: "Ad Creative",
        length: "15-30s",
        platform: "Meta, Google, YouTube",
        goal: "Stop scroll + drive clicks",
      },
    ],
    metricsSection: {
      title: "Performance metrics.",
      subtitle: "Video consistently outperforms static content across|every metric that matters.",
      metrics: [
        { label: "View-Through Rate", value: 35, suffix: "%", desc: "Across all formats" },
        { label: "Engagement vs. Static", value: 120, prefix: "+", suffix: "%", desc: "Higher engagement than images" },
        { label: "Conversion Lift", value: 45, prefix: "+", suffix: "%", desc: "Video vs. static ad creative" },
      ],
    },
    processSection: {
      title: "The production process.",
      subtitle: "From concept to final delivery,|with a workflow we've refined over time.",
    },
    phases: [
      {
        title: "Strategy & Concept",
        desc: "Define goal, audience, platform, and key message before a single frame is shot.",
        metric: "Creative brief delivered in 3 days",
      },
      {
        title: "Scripting & Storyboard",
        desc: "Every video starts with a script and storyboard. Iterate until the narrative arc feels right.",
        metric: "Script approved before production",
      },
      {
        title: "Production & Filming",
        desc: "On-location or remote with professional equipment. We handle all coordination.",
        metric: "Avg. 2-day shoot turnaround",
      },
      {
        title: "Post-Production",
        desc: "Editing, color grading, sound design, motion graphics, captions, platform formatting.",
        metric: "Delivered in all platform formats",
      },
      {
        title: "Distribution & Analysis",
        desc: "Assets delivered in all formats. Track view-through, engagement, and conversion attribution.",
        metric: "65% avg. video completion rate",
      },
    ],
    cta: {
      headline: "Ready to make video work for you?",
      subtitle: "Let's produce video content that grabs attention,|builds trust, and drives results.",
      ctaLabel: "Start Your Video Strategy",
    },
    faqs: [
      { question: "Do you handle the full production process?", answer: "Yes: scripting, filming, editing, and distribution. We manage the entire workflow from concept to final delivery. You review and approve at key stages, but you don't need to manage any production logistics yourself." },
      { question: "What video formats do you produce?", answer: "Short-form social content (15–30s for Reels, Shorts, and TikTok), testimonials (60–90s), product demos (60–120s), and ad creative (15–30s). We produce in all formats needed for your chosen distribution channels." },
      { question: "How long does video production take?", answer: "From strategy to delivery, most projects take 3–4 weeks: 1 week for pre-production and scripting, 1–2 days for filming, and 1 week for editing and post-production. Rush timelines are possible for ad creative." },
      { question: "Do you need to film on location?", answer: "For testimonials and product/service demos, on-location filming produces the best results. For social content and ad creative, we can work with footage you provide, screen recordings, or motion graphics depending on what the concept calls for." },
      { question: "How do you measure video performance?", answer: "View-through rate, engagement rate (likes, shares, comments), website traffic from video, and conversion lift compared to non-video content. For ad creative, we track ROAS and CPL directly against static creative to prove video's ROI." },
    ],
  },
  es: {
    hero: {
      label: "Narrativa Visual",
      headlineLine1: "Video que detiene",
      headlineLine2: "el scroll.",
      subtitle:
        "Social corto, testimonios,|creativos publicitarios y demos de producto diseñados para captar atención.",
      ctaLabel: "Inicia Tu Estrategia de Video",
    },
    heroVizLabels: ["Reel", "Historia", "Anuncio"],
    productionSection: {
      title: "Proceso de Producción",
      subtitle: "Cada video sigue el mismo proceso de producción,|del concepto a la entrega.",
      durationLabel: "Duración",
    },
    productionPhases: [
      {
        id: "pre",
        phase: "Preproducción",
        tasks: "Estrategia, guion, storyboard, casting, búsqueda de locaciones",
        duration: "1 semana",
      },
      {
        id: "prod",
        phase: "Producción",
        tasks: "Filmación en locación o remota, equipo profesional, coordinación con cliente",
        duration: "1-2 días",
      },
      {
        id: "post",
        phase: "Postproducción",
        tasks: "Edición, color grading, diseño de sonido, motion graphics, subtítulos",
        duration: "1 semana",
      },
      {
        id: "dist",
        phase: "Distribución",
        tasks: "Formato por plataforma, entrega, seguimiento de rendimiento",
        duration: "Continuo",
      },
    ],
    formatsSection: {
      title: "Formatos de video que funcionan.",
      subtitle:
        "Cada objetivo requiere un formato distinto.|Alineamos el tipo de video con la plataforma y el resultado.",
      lengthLabel: "Duración",
      platformLabel: "Plataforma",
    },
    videoTypes: [
      {
        type: "Social Corto",
        length: "15-30s",
        platform: "Instagram, TikTok, YT Shorts",
        goal: "Gancho + awareness de marca",
      },
      {
        type: "Testimonios",
        length: "60-90s",
        platform: "Sitio web, YouTube, LinkedIn",
        goal: "Confianza + prueba social",
      },
      {
        type: "Demos de Producto",
        length: "60-120s",
        platform: "Sitio web, YouTube, Ventas",
        goal: "Educación + conversión",
      },
      {
        type: "Creativos Publicitarios",
        length: "15-30s",
        platform: "Meta, Google, YouTube",
        goal: "Detener scroll + generar clics",
      },
    ],
    metricsSection: {
      title: "Métricas de rendimiento.",
      subtitle: "El video supera consistentemente al contenido estático|en cada métrica que importa.",
      metrics: [
        { label: "Tasa de Visualización Completa", value: 35, suffix: "%", desc: "En todos los formatos" },
        { label: "Engagement vs. Estático", value: 120, prefix: "+", suffix: "%", desc: "Mayor engagement que imágenes" },
        { label: "Aumento en Conversión", value: 45, prefix: "+", suffix: "%", desc: "Video vs. creativo estático" },
      ],
    },
    processSection: {
      title: "El proceso de producción.",
      subtitle: "Del concepto a la entrega final,|con un flujo de trabajo refinado con el tiempo.",
    },
    phases: [
      {
        title: "Estrategia y Concepto",
        desc: "Definir objetivo, audiencia, plataforma y mensaje clave antes de grabar un solo frame.",
        metric: "Brief creativo entregado en 3 días",
      },
      {
        title: "Guion y Storyboard",
        desc: "Cada video empieza con guion y storyboard. Iteramos hasta que el arco narrativo se sienta correcto.",
        metric: "Guion aprobado antes de producción",
      },
      {
        title: "Producción y Filmación",
        desc: "En locación o remoto con equipo profesional. Nos encargamos de toda la coordinación.",
        metric: "Prom. 2 días de turnaround de rodaje",
      },
      {
        title: "Postproducción",
        desc: "Edición, color grading, diseño de sonido, motion graphics, subtítulos, formato por plataforma.",
        metric: "Entregado en todos los formatos",
      },
      {
        title: "Distribución y Análisis",
        desc: "Assets en todos los formatos. Seguimiento de view-through, engagement y atribución de conversión.",
        metric: "4.2x tasa promedio de view-through",
      },
    ],
    cta: {
      headline: "¿Listo para que el video trabaje para ti?",
      subtitle: "Produzcamos contenido en video que capte atención,|genere confianza y impulse resultados.",
      ctaLabel: "Inicia Tu Estrategia de Video",
    },
    faqs: [
      { question: "¿Gestionan todo el proceso de producción?", answer: "Sí: guión, grabación, edición y distribución. Gestionamos todo el flujo de trabajo desde el concepto hasta la entrega final. Revisas y apruebas en etapas clave, pero no necesitas gestionar ninguna logística de producción." },
      { question: "¿Qué formatos de video producen?", answer: "Contenido de formato corto para redes sociales (15-30s para Reels, Shorts y TikTok), testimonios (60-90s), demostraciones de producto (60-120s) y creatividad publicitaria (15-30s). Producimos en todos los formatos necesarios para tus canales de distribución." },
      { question: "¿Cuánto tiempo tarda la producción de video?", answer: "De la estrategia a la entrega, la mayoría de proyectos tardan 3-4 semanas: 1 semana de preproducción y guión, 1-2 días de grabación y 1 semana de edición y postproducción." },
      { question: "¿Necesitan grabar en la ubicación del cliente?", answer: "Para testimonios y demos de producto o servicio, la grabación en ubicación produce los mejores resultados. Para contenido social y creatividad publicitaria, podemos trabajar con material que proporciones, grabaciones de pantalla o motion graphics." },
      { question: "¿Cómo miden el rendimiento del video?", answer: "Tasa de view-through, tasa de engagement, tráfico web desde video y mejora de conversión comparado con contenido estático. Para creatividad publicitaria, seguimos el ROAS y CPL directamente frente a creatividad estática para demostrar el ROI del video." },
    ],
  },};
