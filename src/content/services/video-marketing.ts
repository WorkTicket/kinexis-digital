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
  processIntro: string;
  phases: ServicePhase[];
  capabilityBodies: {
    videoProduction: string;
    videoDistribution: string;
    videoStrategy: string;
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
    processIntro:
      "Video production is not a one-off deliverable. Our workflow runs from script and storyboard through shoot, edit, and multi-format distribution, every phase sized for the channels where the creative actually runs.",
    phases: [
      { title: "Strategy & Concept", desc: "Define goal, audience, platform, and key message before a single frame is shot.", metric: "" },
      { title: "Scripting & Storyboard", desc: "Every video starts with a script and storyboard. Iterate until the narrative arc feels right.", metric: "" },
      { title: "Production & Post", desc: "On-location or remote filming, then editing, captions, motion graphics, and platform formatting.", metric: "" },
      { title: "Distribution & Analysis", desc: "Assets delivered in all formats. Track view-through, engagement, and conversion attribution.", metric: "" },
    ],
    capabilityBodies: {
      videoProduction:
        "One hero video does not feed a modern ad account. We map scripts to funnel stages first, hook, proof, offer. Then shoot with repurposing built in: ad cuts, social clips, testimonial edits, and landing page embeds from a single production day. Quality stays consistent because the same team handles concept through delivery.",
      videoDistribution:
        "The same message needs different dimensions per channel. We deliver vertical for Reels, square for feed, long-form for YouTube, and 15-second hooks for paid, all from one shoot, all tracked to view-through and pipeline contribution. Distribution is planned before production, not bolted on after.",
      videoStrategy:
        "Video wins when it has a refresh cadence, not a one-time launch. We build monthly production workflows so Meta and YouTube always have new creative to test, CPM stays manageable, and fatigue gets caught before campaigns stall. Performance tracking ties each asset to booked calls, not just completion rates.",
    },
    cta: {
      headline: "Ready to make video work for you?",
      subtitle: "Let's produce video content that grabs attention,|builds trust, and drives results.",
      ctaLabel: "See Video Pricing",
    },
    inlineCtaLabel: "Review My Video Strategy",
    inlineCtaSubtitle:
      "We will audit your current video assets, distribution gaps, and ad creative refresh cycle. Then outline the highest-impact production fixes.",
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
    processIntro:
      "La producción de video no es un entregable único. Nuestro flujo va de guion y storyboard a rodaje, edición y distribución multi-formato, cada fase dimensionada para los canales donde el creativo realmente corre.",
    phases: [
      { title: "Estrategia y Concepto", desc: "Definir objetivo, audiencia, plataforma y mensaje clave antes de grabar un solo frame.", metric: "" },
      { title: "Guion y Storyboard", desc: "Cada video empieza con guion y storyboard. Iteramos hasta que el arco narrativo se sienta correcto.", metric: "" },
      { title: "Producción y Post", desc: "Filmación en locación o remota, luego edición, subtítulos, motion graphics y formato por plataforma.", metric: "" },
      { title: "Distribución y Análisis", desc: "Assets en todos los formatos. Seguimiento de view-through, engagement y atribución de conversión.", metric: "" },
    ],
    capabilityBodies: {
      videoProduction:
        "Un video hero no alimenta una cuenta de anuncios moderna. Mapeamos guiones a etapas de embudo primero, hook, prueba, oferta, luego rodamos con repurposing integrado: cortes para ads, clips sociales, ediciones de testimonios y embeds en landing pages desde un solo día de producción.",
      videoDistribution:
        "El mismo mensaje necesita dimensiones distintas por canal. Entregamos vertical para Reels, cuadrado para feed, largo para YouTube y hooks de 15 segundos para paid, todo desde un rodaje, todo rastreado a view-through y contribución al pipeline. La distribución se planifica antes de producir, no se añade después.",
      videoStrategy:
        "El video gana cuando tiene cadencia de refresco, no un lanzamiento único. Construimos flujos de producción mensuales para que Meta y YouTube siempre tengan creativo nuevo para probar, el CPM se mantenga manejable y la fatiga se detecte antes de que las campañas se estanquen.",
    },
    cta: {
      headline: "¿Listo para que el video trabaje para ti?",
      subtitle: "Produzcamos contenido en video que capte atención,|genere confianza y impulse resultados.",
      ctaLabel: "Ver Precios de Video",
    },
    inlineCtaLabel: "Revisar Mi Estrategia de Video",
    inlineCtaSubtitle:
      "Auditaremos tus activos de video actuales, brechas de distribución y ciclo de refresco de creativos, y delinearemos las correcciones de producción de mayor impacto.",
    faqs: [
      { question: "¿Gestionan todo el proceso de producción?", answer: "Sí: guión, grabación, edición y distribución. Gestionamos todo el flujo de trabajo desde el concepto hasta la entrega final. Revisas y apruebas en etapas clave, pero no necesitas gestionar ninguna logística de producción." },
      { question: "¿Qué formatos de video producen?", answer: "Contenido de formato corto para redes sociales (15-30s para Reels, Shorts y TikTok), testimonios (60-90s), demostraciones de producto (60-120s) y creatividad publicitaria (15-30s). Producimos en todos los formatos necesarios para tus canales de distribución." },
      { question: "¿Cuánto tiempo tarda la producción de video?", answer: "De la estrategia a la entrega, la mayoría de proyectos tardan 3-4 semanas: 1 semana de preproducción y guión, 1-2 días de grabación y 1 semana de edición y postproducción." },
      { question: "¿Necesitan grabar en la ubicación del cliente?", answer: "Para testimonios y demos de producto o servicio, la grabación en ubicación produce los mejores resultados. Para contenido social y creatividad publicitaria, podemos trabajar con material que proporciones, grabaciones de pantalla o motion graphics." },
      { question: "¿Cómo miden el rendimiento del video?", answer: "Tasa de view-through, tasa de engagement, tráfico web desde video y mejora de conversión comparado con contenido estático. Para creatividad publicitaria, seguimos el ROAS y CPL directamente frente a creatividad estática para demostrar el ROI del video." },
    ],
  },};
