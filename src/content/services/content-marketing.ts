import type { Locale } from "@/i18n/routing";
import type { ServicePhase } from "@/components/ui/ServicePhaseList";
import type { FAQItem } from "@/components/sections/FAQSection";

export type ContentTypeItem = {
  id: string;
  label: string;
  vizLabel: string;
  output: string;
  impact: string;
};

export type FunnelStage = {
  id: string;
  stage: string;
  format: string;
  goal: string;
  conversion: string;
};

export type ContentMarketingContent = {
  hero: {
    label: string;
    headlineLine1: string;
    headlineLine2: string;
    subtitle: string;
    ctaLabel: string;
  };
  funnel: {
    title: string;
    subtitle: string;
    formatLabel: string;
    goalLabel: string;
    stages: FunnelStage[];
  };
  production: {
    title: string;
    subtitle: string;
    contentTypes: ContentTypeItem[];
  };
  process: {
    title: string;
    subtitle: string;
    phases: ServicePhase[];
  };
  processIntro: string;
  capabilityBodies: {
    contentFunnel: string;
    production: string;
    distribution: string;
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

const _enContentPhases: ServicePhase[] = [
  { title: "Strategy & Audience Map", desc: "Identify buyer questions, pain points, and triggers at each funnel stage.", metric: "Full audience map in week 1" },
  { title: "Authority Asset Production", desc: "Blog posts, whitepapers, case studies, lead magnets with conversion intent built in.", metric: "Avg. 4.2x traffic increase per article" },
  { title: "Lead Magnet Creation", desc: "Gated assets designed to capture emails and feed your nurture pipeline.", metric: "Avg. 18% email capture rate" },
  { title: "Email Nurture Setup", desc: "Multi-touch sequences that deliver value, build trust, and create booking opportunities.", metric: "5+ nurture sequences per client" },
  { title: "Repurposing & Distribution", desc: "Every asset repurposed into social posts, video, newsletters for maximum reach.", metric: "8-12 repurposed assets per month" },
];

const enContentTypes: ContentTypeItem[] = [
  { id: "blogPosts", label: "Blog Posts", vizLabel: "Blog", output: "4-6/mo", impact: "SEO authority + organic traffic" },
  { id: "leadMagnets", label: "Lead Magnets", vizLabel: "Lead", output: "1-2/mo", impact: "Email capture + nurture pipeline" },
  { id: "emailSequences", label: "Email Sequences", vizLabel: "Email", output: "Ongoing", impact: "Lead nurturing + conversion" },
  { id: "repurposedAssets", label: "Repurposed Assets", vizLabel: "Repurposed", output: "8-12/mo", impact: "Social reach + distribution" },
];

const enFunnelStages: FunnelStage[] = [
  { id: "awareness", stage: "Awareness", format: "Blog posts, social content, video", goal: "Attract cold traffic via search + social", conversion: "35% → reader" },
  { id: "consideration", stage: "Consideration", format: "Lead magnets, case studies, guides", goal: "Capture email + build authority", conversion: "12% → subscriber" },
  { id: "decision", stage: "Decision", format: "Nurture sequences, testimonials, demos", goal: "Book a call or direct sale", conversion: "4% → customer" },
  { id: "retention", stage: "Retention", format: "Newsletters, updates, exclusive content", goal: "Reduce churn + increase LTV", conversion: "65% → retained" },
];

export const contentMarketingContent: Record<Locale, ContentMarketingContent> = {
  en: {
    hero: {
      label: "Content That Works",
      headlineLine1: "Content that earns trust",
      headlineLine2: "and drives revenue.",
      subtitle: "We create and distribute content that moves buyers through every stage of the funnel, from first search to booked call. Blogs, lead magnets, email sequences, and repurposed assets, all built around what your audience actually needs to hear.",
      ctaLabel: "Build Your Content Engine",
    },
    funnel: {
      title: "Content Funnel Map",
      subtitle: "Every piece of content serves a specific stage in the buyer's journey.|Nothing is created without a purpose.",
      formatLabel: "Format",
      goalLabel: "Goal",
      stages: enFunnelStages,
    },
    production: {
      title: "Content production system.",
      subtitle: "A repeatable engine that produces high-quality content|on a consistent cadence.",
      contentTypes: enContentTypes,
    },
    process: {
      title: "The content process.",
      subtitle: "From strategy to publication,|every piece goes through a proven production process.",
      phases: [
        { title: "Strategy & Audience Map", desc: "Identify buyer questions, pain points, and triggers at each funnel stage. Map topics to keywords and conversion pages.", metric: "" },
        { title: "Authority Asset Production", desc: "Blog posts, guides, and case studies with conversion intent built in. Each piece tied to a funnel stage.", metric: "" },
        { title: "Lead Magnets & Nurture", desc: "Gated assets that capture emails plus nurture sequences that move subscribers toward a booked call.", metric: "" },
        { title: "Repurposing & Distribution", desc: "Every asset repurposed across social, email, and syndication. Winners refreshed, underperformers retired.", metric: "" },
      ],
    },
    processIntro:
      "Content is not a publishing calendar. Our production cycle runs from intent mapping through creation, distribution, and refresh, every phase tied to a metric your sales team can see in the CRM.",
    capabilityBodies: {
      contentFunnel:
        "Content only pays off when each piece knows which funnel stage it serves. We map awareness, consideration, decision, and retention content to specific formats and conversion goals, not a blog schedule picked in meetings. The stages below show how we align topics to buyer intent before a single word gets written.",
      production:
        "Production runs on a repeatable cadence: SEO-informed articles, gated lead magnets, nurture emails, and repurposed assets, all built from one editorial brief per piece. Every deliverable has a business purpose: traffic, lead capture, or pipeline influence. We do not publish filler that ranks for nothing and converts less.",
      distribution:
        "Publishing without distribution is half the job. We promote every piece across email, social, and syndication partners, then repurpose it into 8–12 derivative assets so reach compounds without producing entirely new content each week. Performance gets measured on leads attributed and pipeline influenced, not pageviews alone.",
    },
    cta: {
      headline: "Ready to build your content engine?",
      subtitle: "We'll build a content system that attracts, nurtures,|and converts while you focus on running the business.",
      ctaLabel: "See Content Pricing",
    },
    inlineCtaLabel: "Audit My Content Strategy",
    inlineCtaSubtitle:
      "We will review your topic gaps, keyword opportunities, and funnel alignment. Then outline the highest-impact content fixes.",
    faqs: [
      { question: "How much content do you produce per month?", answer: "Our standard production includes 4–6 blog posts, 1–2 lead magnets, 5+ nurture email sequences, and 8–12 repurposed social and distribution assets per month. The mix adjusts based on your funnel gaps and where the highest-impact opportunities are." },
      { question: "How do you choose content topics?", answer: "Topic selection is data-driven: keyword research for SEO opportunity, competitor gap analysis, and your sales team's most common prospect questions. Every piece of content has a business purpose: traffic, lead capture, or nurture." },
      { question: "How long before content starts driving traffic?", answer: "New content typically gains SEO traction within 3–6 months. Some pieces rank quickly on low-competition terms; others compound over 12+ months. We prioritize a mix of quick wins and long-term authority assets." },
      { question: "Do you distribute the content or just produce it?", answer: "We produce and distribute. Every article gets distributed across email, social channels, and syndication partners. We also repurpose each piece into 8–12 derivative assets to maximize reach without producing entirely new content each time." },
      { question: "How do you measure content ROI?", answer: "Traffic per article, email subscribers generated, leads attributed, and pipeline influenced by content. We connect content analytics to your CRM so you can see which blog posts and lead magnets are actually generating revenue." },
    ],
  },
  es: {
    hero: {
      label: "Contenido que Funciona",
      headlineLine1: "Contenido que convierte",
      headlineLine2: "con confianza e ingresos.",
      subtitle: "Creamos y distribuimos contenido que mueve a los compradores por cada etapa del embudo, desde la primera búsqueda hasta la llamada agendada. Blogs, lead magnets, secuencias de email y activos reutilizados, todo construido alrededor de lo que tu audiencia realmente necesita escuchar.",
      ctaLabel: "Construye Tu Motor de Contenido",
    },
    funnel: {
      title: "Mapa del Embudo de Contenido",
      subtitle: "Cada pieza de contenido sirve a una etapa específica del recorrido del comprador.|Nada se crea sin un propósito.",
      formatLabel: "Formato",
      goalLabel: "Objetivo",
      stages: [
        { id: "awareness", stage: "Conciencia", format: "Artículos de blog, contenido social, video", goal: "Atraer tráfico frío vía búsqueda + redes sociales", conversion: "35% → lector" },
        { id: "consideration", stage: "Consideración", format: "Lead magnets, casos de estudio, guías", goal: "Capturar email + construir autoridad", conversion: "12% → suscriptor" },
        { id: "decision", stage: "Decisión", format: "Secuencias de nurture, testimonios, demos", goal: "Agendar una llamada o venta directa", conversion: "4% → cliente" },
        { id: "retention", stage: "Retención", format: "Newsletters, actualizaciones, contenido exclusivo", goal: "Reducir churn + aumentar LTV", conversion: "65% → retenido" },
      ],
    },
    production: {
      title: "Sistema de producción de contenido.",
      subtitle: "Un motor repetible que produce contenido de alta calidad|con una cadencia consistente.",
      contentTypes: [
        { id: "blogPosts", label: "Artículos de Blog", vizLabel: "Blog", output: "4-6/mes", impact: "Autoridad SEO + tráfico orgánico" },
        { id: "leadMagnets", label: "Lead Magnets", vizLabel: "Lead", output: "1-2/mes", impact: "Captura de email + pipeline de nurture" },
        { id: "emailSequences", label: "Secuencias de Email", vizLabel: "Email", output: "Continuo", impact: "Nutrición de leads + conversión" },
        { id: "repurposedAssets", label: "Activos Reutilizados", vizLabel: "Activos", output: "8-12/mes", impact: "Alcance social + distribución" },
      ],
    },
    process: {
      title: "El proceso de contenido.",
      subtitle: "De la estrategia a la publicación,|cada pieza pasa por un proceso de producción probado.",
      phases: [
        { title: "Estrategia y Mapa de Audiencia", desc: "Identificar preguntas del comprador, puntos de dolor y disparadores en cada etapa. Mapear temas a keywords y páginas de conversión.", metric: "" },
        { title: "Producción de Activos de Autoridad", desc: "Artículos, guías y casos de estudio con intención de conversión integrada, cada pieza ligada a una etapa de embudo.", metric: "" },
        { title: "Lead Magnets y Nurture", desc: "Activos gated que capturan emails más secuencias de nurture que mueven suscriptores hacia una llamada agendada.", metric: "" },
        { title: "Reutilización y Distribución", desc: "Cada activo reutilizado en social, email y sindicación. Ganadores actualizados, bajo rendimiento retirado.", metric: "" },
      ],
    },
    processIntro:
      "El contenido no es un calendario de publicación. Nuestro ciclo va del mapeo de intención a creación, distribución y refresco, cada fase ligada a una métrica que tu equipo de ventas puede ver en el CRM.",
    capabilityBodies: {
      contentFunnel:
        "El contenido solo rinde cuando cada pieza sabe qué etapa de embudo sirve. Mapeamos contenido de conciencia, consideración, decisión y retención a formatos y objetivos de conversión específicos, no un calendario de blog elegido en reuniones. Las etapas siguientes muestran cómo alineamos temas a intención del comprador antes de escribir una sola palabra.",
      production:
        "La producción corre en una cadencia repetible: artículos con SEO, lead magnets gated, emails de nurture y activos reutilizados, todo construido desde un brief editorial por pieza. Cada entregable tiene un propósito de negocio: tráfico, captura de leads o influencia en pipeline. No publicamos relleno que posiciona para nada y convierte menos.",
      distribution:
        "Publicar sin distribuir es la mitad del trabajo. Promovemos cada pieza en email, social y socios de sindicación, luego la reutilizamos en 8–12 activos derivados para que el alcance se acumule sin producir contenido nuevo cada semana. El rendimiento se mide por leads atribuidos e influencia en pipeline, no solo pageviews.",
    },
    cta: {
      headline: "¿Listo para construir tu motor de contenido?",
      subtitle: "Crearemos un sistema de contenido que atrae,|nutre y convierte mientras tú te enfocas en tu negocio.",
      ctaLabel: "Ver Precios de Contenido",
    },
    inlineCtaLabel: "Auditar Mi Estrategia de Contenido",
    inlineCtaSubtitle:
      "Revisaremos tus brechas de temas, oportunidades de keywords y alineación de embudo, y delinearemos las correcciones de contenido de mayor impacto.",
    faqs: [
      { question: "¿Cuánto contenido producen al mes?", answer: "Nuestra producción estándar incluye 4-6 artículos de blog, 1-2 lead magnets, 5+ secuencias de email nurture y 8-12 activos reutilizados para distribución social. La mezcla se ajusta según los huecos de tu funnel y las oportunidades de mayor impacto." },
      { question: "¿Cómo eligen los temas de contenido?", answer: "La selección de temas es basada en datos: investigación de palabras clave, análisis de brechas de la competencia y las preguntas más comunes de tus prospectos. Cada pieza de contenido tiene un propósito de negocio: tráfico, captura de leads o nurture." },
      { question: "¿Cuánto tiempo antes de que el contenido genere tráfico?", answer: "El contenido nuevo suele ganar tracción SEO en 3-6 meses. Algunas piezas posicionan rápidamente en términos de baja competencia; otras se acumulan a lo largo de 12+ meses. Priorizamos una mezcla de victorias rápidas y activos de autoridad a largo plazo." },
      { question: "¿Distribuyen el contenido además de producirlo?", answer: "Sí. Producimos y distribuimos. Cada artículo se distribuye a través de email, canales sociales y socios de sindicación. También reutilizamos cada pieza en 8-12 activos derivados para maximizar el alcance." },
      { question: "¿Cómo miden el ROI del contenido?", answer: "Tráfico por artículo, suscriptores de email generados, leads atribuidos e influencia en el pipeline. Conectamos la analítica de contenido con tu CRM para que puedas ver qué artículos y lead magnets están generando ingresos reales." },
    ],
  },};
