import type { Locale } from "@/i18n/routing";

export type MethodPhase = {
  title: string;
  desc: string;
};

export type Principle = {
  statement: string;
  explanation: string;
  accent: string;
};

export type FutureMilestone = {
  year: string;
  title: string;
  items: string[];
};

export type ArchitectureNode = {
  label: string;
};

export type AboutContent = {
  heroTag: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroSubtitleLine1: string;
  heroSubtitleLine2: string;
  whyWeExistTag: string;
  whyWeExistAside: string;
  whyParagraph1: string;
  whyQuote: string;
  whyParagraph2: string;
  whyParagraph2b: string;
  whyParagraph3: string;
  methodTag: string;
  methodTitleLine1: string;
  methodTitleLine2: string;
  methodPhases: MethodPhase[];
  architectureTag: string;
  architectureTitle: string;
  architectureSubtitle: string;
  architectureNodes: ArchitectureNode[];
  architectureCaption: string;
  principlesTag: string;
  principlesTitle: string;
  principles: Principle[];
  roadmapTag: string;
  roadmapTitle: string;
  roadmapSubtitle: string;
  futureMilestones: FutureMilestone[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
};

export const aboutContent: Record<Locale, AboutContent> = {
  en: {
    heroTag: "About KINEXIS",
    heroTitle: "Growth isn't random.",
    heroTitleHighlight: "It's engineered.",
    heroSubtitleLine1: "There's a difference between having marketing and having a marketing system. We build the latter.",
    heroSubtitleLine2: "Every channel connects. Every decision traces back to revenue. That's not a philosophy. It's how the work is structured from day one.",
    whyWeExistTag: "Why We Exist",
    whyWeExistAside: "The agency model is broken.|We built the alternative.",
    whyParagraph1:
      "Most digital agencies sell tactics: a website here, some ads there, a handful of blog posts. Then they call it a strategy.",
    whyQuote: "We sell a system:|a repeatable, data-driven approach to growth.",
    whyParagraph2:
      "Every piece connects. SEO feeds the ads. Ads feed the landing pages. Landing pages feed your pipeline.",
    whyParagraph2b:
      "KINEXIS exists because the traditional agency model is broken. Too many firms promise the moon, hand over cookie-cutter templates, and disappear when results don't show up.",
    whyParagraph3:
      "We built something different. Smaller client rosters. Longer engagements. One question that guides everything: does this move the revenue needle? If the answer's no, we don't do it.",
    methodTag: "Methodology",
    methodTitleLine1: "The KINEXIS",
    methodTitleLine2: "Method",
    methodPhases: [
      {
        title: "ANALYZE",
        desc: "Full funnel audit. Data infrastructure review. Baseline metrics established before any strategy is formed.",
      },
      {
        title: "STRATEGIZE",
        desc: "Channel selection based on highest ROI potential. Roadmap with milestones, timelines, and clear KPIs.",
      },
      {
        title: "BUILD",
        desc: "Execution across selected channels. Content, ads, landing pages, and automation, all built to spec.",
      },
      {
        title: "OPTIMIZE",
        desc: "Weekly performance reviews. A/B testing. Budget reallocation. Data feeds back into the system.",
      },
      {
        title: "SCALE",
        desc: "Winning channels get more fuel. Systems get automated. The engine runs on its own momentum.",
      },
    ],
    architectureTag: "Architecture",
    architectureTitle: "Inside the system.",
    architectureSubtitle: "When you see the diagram, you understand why it works. Nothing is standalone. Every channel you add makes the others more effective.",
    architectureNodes: [
      { label: "SEO" },
      { label: "Paid Ads" },
      { label: "Web Design" },
      { label: "Analytics" },
      { label: "CRO" },
      { label: "Email" },
    ],
    architectureCaption: "Analytics is the nervous system. Every channel reports in. Every decision is data-informed.",
    principlesTag: "Principles",
    principlesTitle: "Four principles. No exceptions.",
    principles: [
      {
        statement: "Data over assumptions.",
        explanation:
          "Every recommendation we make is backed by something you can see and measure. If we can't find the numbers to support a strategy, we don't run with it. Gut feelings don't scale. Evidence does.",
        accent: "Evidence",
      },
      {
        statement: "Systems over tactics.",
        explanation:
          "A single blog post is a tactic. A content engine that produces, distributes, and optimizes posts automatically is a system. We build the latter. Tactics win battles. Systems win wars.",
        accent: "Systems",
      },
      {
        statement: "Long-term over quick wins.",
        explanation:
          "A six-month SEO investment keeps paying off for years. Quick wins fade the moment you stop spending. We structure every engagement around growth that lasts, not spikes that disappear.",
        accent: "Long-term",
      },
      {
        statement: "Depth over scale.",
        explanation:
          "We keep 8-10 active clients at any given time. Real results need real focus. When you're one of ten instead of one of fifty, we can actually give a damn about your business. Your success is our success.",
        accent: "Focus",
      },
    ],
    roadmapTag: "Roadmap",
    roadmapTitle: "Where we're headed.",
    roadmapSubtitle:
      "A smaller roster, deeper engagements, and playbooks that compound across industries.",
    futureMilestones: [
      {
        year: "2025",
        title: "Foundation",
        items: [
          "Launched as a full-service digital marketing agency",
          "First 10 client growth engagements delivered",
          "Built reporting workflows for every account",
        ],
      },
      {
        year: "2026",
        title: "Expand",
        items: [
          "Deepen SEO, paid media, and web design capabilities",
          "Grow content and email marketing teams",
          "25+ businesses with measurable revenue growth",
        ],
      },
      {
        year: "2027",
        title: "Depth",
        items: [
          "Playbooks built across multiple industries and verticals",
          "Dedicated CRO and funnel optimization practice",
          "Long-term retainer partnerships with results that keep growing",
        ],
      },
      {
        year: "2028+",
        title: "Partnership",
        items: [
          "Embedded marketing teams for select clients",
          "Strategic agency and referral partnerships",
          "Comparison data across the verticals we serve",
        ],
      },
    ],
    ctaTitle: "Let's build something that lasts.",
    ctaSubtitle: "We cap our client roster at 8 to 10 at any given time. Real results take real attention. That's how we protect both.",
    ctaButton: "Start the Conversation",
  },
  es: {
    heroTag: "Sobre KINEXIS",
    heroTitle: "El crecimiento no es casual.",
    heroTitleHighlight: "Está diseñado.",
    heroSubtitleLine1:
      "Convertimos el tráfico inconsistente en sistemas de ingresos predecibles. No mediante suposiciones.",
    heroSubtitleLine2:
      "Mediante una metodología repetible y basada en datos que trata tu negocio como una inversión, no como una campaña.",
    whyWeExistTag: "Por Qué Existimos",
    whyWeExistAside: "El modelo de agencia está roto.|Construimos la alternativa.",
    whyParagraph1:
      "La mayoría de las agencias digitales venden tácticas: un sitio web aquí, algunos anuncios allá, un puñado de entradas de blog. Luego lo llaman estrategia.",
    whyQuote: "Nosotros vendemos un sistema:|un enfoque repetible y basado en datos para el crecimiento.",
    whyParagraph2:
      "Cada pieza se conecta. El SEO alimenta los anuncios. Los anuncios alimentan las landing pages. Las landing pages alimentan tu pipeline.",
    whyParagraph2b:
      "KINEXIS existe porque el modelo tradicional de agencia está roto. Demasiadas firmas prometen la luna, entregan plantillas genéricas y desaparecen cuando los resultados no llegan.",
    whyParagraph3:
      "Construimos algo diferente. Carteras de clientes más pequeñas. Compromisos más largos. Una pregunta guía todo: ¿esto mueve la aguja de los ingresos? Si la respuesta es no, no lo hacemos.",
    methodTag: "Metodología",
    methodTitleLine1: "El Método",
    methodTitleLine2: "KINEXIS",
    methodPhases: [
      {
        title: "ANALIZAR",
        desc: "Auditoría completa del embudo. Revisión de la infraestructura de datos. Métricas base establecidas antes de formular cualquier estrategia.",
      },
      {
        title: "ESTRATEGIA",
        desc: "Selección de canales según el mayor potencial de ROI. Hoja de ruta con hitos, plazos y KPIs claros.",
      },
      {
        title: "CONSTRUIR",
        desc: "Ejecución en los canales seleccionados. Contenido, anuncios, landing pages y automatización, todo construido según especificaciones.",
      },
      {
        title: "OPTIMIZAR",
        desc: "Revisiones semanales de rendimiento. Pruebas A/B. Reasignación de presupuesto. Los datos retroalimentan el sistema.",
      },
      {
        title: "ESCALAR",
        desc: "Los canales ganadores reciben más impulso. Los sistemas se automatizan. El motor funciona con su propio impulso.",
      },
    ],
    architectureTag: "Arquitectura",
    architectureTitle: "Dentro del sistema.",
    architectureSubtitle:
      "Cada servicio se conecta. Cada canal alimenta a otro.|Así es como encajan las piezas.",
    architectureNodes: [
      { label: "SEO" },
      { label: "Anuncios Pagados" },
      { label: "Diseño Web" },
      { label: "Analítica" },
      { label: "CRO" },
      { label: "Email" },
    ],
    architectureCaption:
      "La analítica es el sistema nervioso. Cada canal reporta. Cada decisión está informada por datos.",
    principlesTag: "Principios",
    principlesTitle: "Cuatro principios. Sin excepciones.",
    principles: [
      {
        statement: "Datos sobre suposiciones.",
        explanation:
          "Cada recomendación que hacemos está respaldada por algo que puede ver y medir. Si no encontramos los números que respaldan una estrategia, no la ejecutamos. Las corazonadas no escalan. La evidencia sí.",
        accent: "Evidencia",
      },
      {
        statement: "Sistemas sobre tácticas.",
        explanation:
          "Una sola entrada de blog es una táctica. Un motor de contenido que produce, distribuye y optimiza publicaciones automáticamente es un sistema. Construimos lo segundo. Las tácticas ganan batallas. Los sistemas ganan guerras.",
        accent: "Sistemas",
      },
      {
        statement: "Largo plazo sobre victorias rápidas.",
        explanation:
          "Una inversión en SEO de seis meses sigue dando resultados durante años. Las victorias rápidas se desvanecen en cuanto dejas de invertir. Estructuramos cada compromiso en torno al crecimiento que perdura, no a picos que desaparecen.",
        accent: "Largo plazo",
      },
      {
        statement: "Profundidad sobre escala.",
        explanation:
          "Mantenemos entre 8 y 10 clientes activos en todo momento. Los resultados reales requieren enfoque real. Cuando es uno de diez en lugar de uno de cincuenta, podemos preocuparnos de verdad por tu negocio. Tu éxito es nuestro éxito.",
        accent: "Enfoque",
      },
    ],
    roadmapTag: "Hoja de Ruta",
    roadmapTitle: "Hacia dónde vamos.",
    roadmapSubtitle:
      "Una cartera más pequeña, compromisos más profundos y playbooks que se acumulan entre industrias.",
    futureMilestones: [
      {
        year: "2025",
        title: "Fundación",
        items: [
          "Lanzamiento como agencia de marketing digital de servicio completo",
          "Primeros 10 compromisos de crecimiento con clientes entregados",
          "Flujos de trabajo de reporting construidos para cada cuenta",
        ],
      },
      {
        year: "2026",
        title: "Expansión",
        items: [
          "Profundizar capacidades en SEO, medios pagados y diseño web",
          "Ampliar equipos de contenido y email marketing",
          "Más de 25 empresas con crecimiento de ingresos medible",
        ],
      },
      {
        year: "2027",
        title: "Profundidad",
        items: [
          "Playbooks desarrollados para múltiples industrias y sectores",
          "Práctica dedicada de CRO y optimización de embudos",
          "Asociaciones de retainer a largo plazo con resultados que siguen creciendo",
        ],
      },
      {
        year: "2028+",
        title: "Asociación",
        items: [
          "Equipos de marketing integrados para clientes selectos",
          "Asociaciones estratégicas con agencias y referidos",
          "Datos comparativos en los sectores que atendemos",
        ],
      },
    ],
    ctaTitle: "Construyamos algo que perdure.",
    ctaSubtitle: "Solo aceptamos un puñado de clientes nuevos cada trimestre.|Los cupos se agotan rápido.",
    ctaButton: "Iniciar la Conversación",
  },};
