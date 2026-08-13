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

export type PartnershipSignal = {
  title: string;
  description: string;
};

export type FutureMilestone = {
  year: string;
  title: string;
  status: "done" | "now" | "soon";
  items: string[];
};

export type ArchitectureNode = {
  id: string;
  label: string;
  role: string;
  summary: string;
};

export type AboutContent = {
  heroTag: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroSubtitleLine1: string;
  heroSubtitleLine2: string;
  whyWeExistTag: string;
  whyWeExistAside: string;
  whyProblemLabel: string;
  whySolutionLabel: string;
  whyParagraph1: string;
  whyQuote: string;
  whyParagraph2: string;
  whyParagraph2b: string;
  whyParagraph3: string;
  partnershipTag: string;
  partnershipTitle: string;
  partnershipSubtitle: string;
  partnershipSignals: PartnershipSignal[];
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

export const aboutContentI18n: Record<Locale, AboutContent> = {
  en: {
    heroTag: "About KINEXIS",
    heroTitle: "Growth isn't random.",
    heroTitleHighlight: "It's engineered.",
    heroSubtitleLine1:
      "There's a difference between having marketing and having a marketing system. We build the latter.",
    heroSubtitleLine2:
      "Every channel connects. Every decision traces back to revenue. That's how the work is structured from day one.",
    whyWeExistTag: "Why we exist",
    whyWeExistAside: "The agency model is broken. We built the alternative.",
    whyProblemLabel: "The old model",
    whySolutionLabel: "The KINEXIS model",
    whyParagraph1:
      "Most digital agencies sell tactics: a website here, some ads there, a handful of blog posts. Then they call it a strategy.",
    whyQuote: "We sell a system: a repeatable, measured approach to growth.",
    whyParagraph2:
      "Every piece connects. SEO feeds the ads. Ads feed the landing pages. Landing pages feed your pipeline.",
    whyParagraph2b:
      "Too many firms overpromise, hand over generic templates, and vanish when results stall.",
    whyParagraph3:
      "We keep a smaller roster, longer engagements, and one filter for the work: does this grow revenue? If not, we don't do it.",
    partnershipTag: "How we work",
    partnershipTitle: "You work with people who own the outcome.",
    partnershipSubtitle:
      "No account manager reading from a script. Direct access to the strategists building your system, and reviews that talk about revenue, not vanity charts.",
    partnershipSignals: [
      {
        title: "A small roster on purpose",
        description:
          "We keep 8–10 active clients. That cap exists so your account gets senior attention, not a junior handoff after the sales call.",
      },
      {
        title: "Direct strategist access",
        description:
          "You talk to the people running SEO, paid, and conversion work. Questions get answered in hours, not next quarter's QBR.",
      },
      {
        title: "Revenue-first reviews",
        description:
          "Weekly and monthly check-ins start with pipeline and cost per lead. If a channel isn't paying for itself, we change it.",
      },
    ],
    methodTag: "Methodology",
    methodTitleLine1: "The KINEXIS",
    methodTitleLine2: "Method",
    methodPhases: [
      {
        title: "Analyze",
        desc: "Full funnel audit. Data infrastructure review. Baseline metrics locked before any strategy is written.",
      },
      {
        title: "Strategize",
        desc: "Channel selection based on highest ROI potential. Roadmap with milestones, timelines, and clear KPIs.",
      },
      {
        title: "Build",
        desc: "Execution across selected channels. Content, ads, landing pages, and automation, all built to spec.",
      },
      {
        title: "Optimize",
        desc: "Weekly performance reviews. A/B testing. Budget reallocation. Data feeds back into the system.",
      },
      {
        title: "Scale",
        desc: "Winning channels get more budget. Systems get automated. Growth compounds without adding chaos.",
      },
    ],
    architectureTag: "Architecture",
    architectureTitle: "Inside the system.",
    architectureSubtitle:
      "Nothing here runs on its own. Every channel has a job, and each one makes the others more effective.",
    architectureNodes: [
      {
        id: "seo",
        label: "SEO",
        role: "Organic discovery",
        summary:
          "Rankings build the audiences Paid Ads retargets. Content shapes landing page copy. Every visit reports into Analytics.",
      },
      {
        id: "paid-ads",
        label: "Paid Ads",
        role: "Paid acquisition",
        summary:
          "Ad traffic lands on designed pages. CRO removes the friction that kills conversions. Email catches the leads who didn't buy yet.",
      },
      {
        id: "web-design",
        label: "Web Design",
        role: "Conversion surface",
        summary:
          "Every design decision gets pressure-tested by CRO. Behavior on the page flows back to Analytics and informs the next iteration.",
      },
      {
        id: "analytics",
        label: "Analytics",
        role: "Intelligence layer",
        summary:
          "Every channel reports in. Budgets, creative, and roadmap decisions all trace back to what the data shows.",
      },
      {
        id: "cro",
        label: "CRO",
        role: "Friction removal",
        summary:
          "Higher conversion rates cut Paid Ads cost-per-lead directly. Winning variants get rolled into the Web Design baseline.",
      },
      {
        id: "email",
        label: "Email",
        role: "Retention engine",
        summary:
          "Open and click data completes full-funnel attribution in Analytics. Engaged segments become Paid Ads lookalike audiences.",
      },
    ],
    architectureCaption:
      "Six channels, one loop. Add another and the rest get sharper, not busier.",
    principlesTag: "Principles",
    principlesTitle: "Four principles. No exceptions.",
    principles: [
      {
        statement: "Data over assumptions.",
        explanation:
          "Every recommendation is backed by something you can see and measure. If the numbers aren't there, we don't run the play.",
        accent: "Evidence",
      },
      {
        statement: "Systems over tactics.",
        explanation:
          "A single blog post is a tactic. A content engine that produces, distributes, and improves on a schedule is a system. We build the system.",
        accent: "Systems",
      },
      {
        statement: "Long-term over quick wins.",
        explanation:
          "A six-month SEO investment keeps paying off for years. Quick wins fade the moment you stop spending. We structure engagements around growth that lasts.",
        accent: "Long-term",
      },
      {
        statement: "Depth over scale.",
        explanation:
          "We keep 8–10 active clients. When you're one of ten instead of one of fifty, your business gets the attention the work actually needs.",
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
        status: "done",
        items: [
          "Launched as a full-service digital marketing agency",
          "First 10 client growth engagements delivered",
          "Built reporting workflows for every account",
        ],
      },
      {
        year: "2026",
        title: "Expand",
        status: "now",
        items: [
          "Deepen SEO, paid media, and web design capabilities",
          "Grow content and email marketing teams",
          "25+ businesses with measurable revenue growth",
        ],
      },
      {
        year: "2027",
        title: "Depth",
        status: "soon",
        items: [
          "Playbooks built across multiple industries and verticals",
          "Dedicated CRO and funnel optimization practice",
          "Long-term retainer partnerships with results that keep growing",
        ],
      },
      {
        year: "2028+",
        title: "Partnership",
        status: "soon",
        items: [
          "Embedded marketing teams for select clients",
          "Strategic agency and referral partnerships",
          "Comparison data across the verticals we serve",
        ],
      },
    ],
    ctaTitle: "Ready when you are.",
    ctaSubtitle:
      "We cap our client roster at 8 to 10 at any given time. Real results take real attention. Book a strategy call and we'll tell you straight if we're the right fit.",
    ctaButton: "Book a strategy call",
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
    whyProblemLabel: "El modelo anterior",
    whySolutionLabel: "El modelo KINEXIS",
    whyParagraph1:
      "La mayoría de las agencias digitales venden tácticas: un sitio web aquí, algunos anuncios allá, un puñado de entradas de blog. Luego lo llaman estrategia.",
    whyQuote: "Nosotros vendemos un sistema:|un enfoque repetible y basado en datos para el crecimiento.",
    whyParagraph2:
      "Cada pieza se conecta. El SEO alimenta los anuncios. Los anuncios alimentan las landing pages. Las landing pages alimentan tu pipeline.",
    whyParagraph2b:
      "KINEXIS existe porque el modelo tradicional de agencia está roto. Demasiadas firmas prometen la luna, entregan plantillas genéricas y desaparecen cuando los resultados no llegan.",
    whyParagraph3:
      "Construimos algo diferente. Carteras de clientes más pequeñas. Compromisos más largos. Una pregunta guía todo: ¿esto mueve la aguja de los ingresos? Si la respuesta es no, no lo hacemos.",
    partnershipTag: "Cómo Trabajamos",
    partnershipTitle: "Trabajas con personas que son dueñas del resultado.",
    partnershipSubtitle:
      "Sin account managers leyendo un guion. Acceso directo a los estrategas que construyen tu sistema, y revisiones que hablan de ingresos, no de gráficos vanidosos.",
    partnershipSignals: [
      {
        title: "Una cartera pequeña a propósito",
        description:
          "Mantenemos 8–10 clientes activos. Ese límite existe para que tu cuenta reciba atención senior, no un traspaso a junior después de la venta.",
      },
      {
        title: "Acceso directo al estratega",
        description:
          "Hablas con quienes ejecutan SEO, paid y conversión. Las preguntas se responden en horas, no en el QBR del próximo trimestre.",
      },
      {
        title: "Revisiones orientadas a ingresos",
        description:
          "Los check-ins semanales y mensuales empiezan por pipeline y coste por lead. Si un canal no se paga solo, lo cambiamos.",
      },
    ],
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
      "Aquí nada funciona por su cuenta. Cada canal tiene un trabajo, y cada uno hace que los demás sean más efectivos.",
    architectureNodes: [
      {
        id: "seo",
        label: "SEO",
        role: "Descubrimiento orgánico",
        summary:
          "Los rankings construyen las audiencias que retargetean los Anuncios. El contenido da forma a las landing pages. Cada visita reporta a Analítica.",
      },
      {
        id: "paid-ads",
        label: "Anuncios Pagados",
        role: "Adquisición pagada",
        summary:
          "El tráfico de anuncios aterriza en páginas diseñadas. El CRO elimina la fricción que mata conversiones. El Email captura a quienes aún no compraron.",
      },
      {
        id: "web-design",
        label: "Diseño Web",
        role: "Superficie de conversión",
        summary:
          "Cada decisión de diseño se pone a prueba con CRO. El comportamiento en la página vuelve a Analítica e informa la siguiente iteración.",
      },
      {
        id: "analytics",
        label: "Analítica",
        role: "Capa de inteligencia",
        summary:
          "El sistema nervioso. Cada canal reporta. Presupuestos, creatividades y hoja de ruta se basan en lo que muestran los datos.",
      },
      {
        id: "cro",
        label: "CRO",
        role: "Eliminación de fricción",
        summary:
          "Mejores tasas de conversión bajan el coste por lead de Anuncios. Las variantes ganadoras se integran a la base de Diseño Web.",
      },
      {
        id: "email",
        label: "Email",
        role: "Motor de retención",
        summary:
          "Aperturas y clics completan la atribución de embudo en Analítica. Los segmentos comprometidos se convierten en audiencias lookalike de Anuncios.",
      },
    ],
    architectureCaption:
      "Seis canales, un circuito. Añade otro y el resto gana precisión, no ruido.",
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
        status: "done",
        items: [
          "Lanzamiento como agencia de marketing digital de servicio completo",
          "Primeros 10 compromisos de crecimiento con clientes entregados",
          "Flujos de trabajo de reporting construidos para cada cuenta",
        ],
      },
      {
        year: "2026",
        title: "Expansión",
        status: "now",
        items: [
          "Profundizar capacidades en SEO, medios pagados y diseño web",
          "Ampliar equipos de contenido y email marketing",
          "Más de 25 empresas con crecimiento de ingresos medible",
        ],
      },
      {
        year: "2027",
        title: "Profundidad",
        status: "soon",
        items: [
          "Playbooks desarrollados para múltiples industrias y sectores",
          "Práctica dedicada de CRO y optimización de embudos",
          "Asociaciones de retainer a largo plazo con resultados que siguen creciendo",
        ],
      },
      {
        year: "2028+",
        title: "Asociación",
        status: "soon",
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
  }


};

export type FaqItem = {
  question: string;
  answer: string;
};

const faqItemsByLocale: Record<Locale, FaqItem[]> = {
  en: [
    {
      question: "How is Kinexis different from other agencies?",
      answer:
        "We run one program across brand, site, search, paid, and content. Most agencies sell channels in isolation. We measure on leads and revenue, not impressions or rankings alone.",
    },
    {
      question: "What markets do you work in?",
      answer:
        "Home services and e-commerce are our deepest verticals. We also take on healthcare, legal, SaaS, and adjacent markets when the fit is right.",
    },
    {
      question: "How long does an engagement last?",
      answer:
        "Month to month. No lock-in contracts. Most clients stay because the numbers move, not because a clause says they have to.",
    },
    {
      question: "What does a first phase look like?",
      answer:
        "We audit where demand dies, fix the highest-leak point first, then layer in the channels that compound. Work usually starts with site and search, then paid and content.",
    },
    {
      question: "How do you measure success?",
      answer:
        "Leads, calls, orders, and revenue. Not vanity metrics. Every report starts with pipeline and cost per lead.",
    },
  ],
  es: [
    {
      question: "¿En qué se diferencia Kinexis de otras agencias?",
      answer:
        "Llevamos un solo programa de marca, web, búsqueda, anuncios y contenido. La mayoría vende canales sueltos. Nosotros medimos en leads e ingresos, no en impresiones o rankings por sí solos.",
    },
    {
      question: "¿En qué mercados trabajas?",
      answer:
        "Servicios del hogar y e-commerce son los verticales que más profundizamos. También entramos en salud, legal, SaaS y mercados cercanos cuando el encaje es real.",
    },
    {
      question: "¿Cuánto dura un proyecto?",
      answer:
        "Mes a mes. Sin contratos de permanencia. La mayoría se queda porque se mueven los números, no porque una cláusula se lo imponga.",
    },
    {
      question: "¿Cómo es la primera fase?",
      answer:
        "Auditamos dónde muere la demanda, arreglamos primero el punto que más pierde y luego sumamos los canales que se refuerzan. El trabajo suele empezar por la web y la búsqueda; después, anuncios y contenido.",
    },
    {
      question: "¿Cómo medimos el éxito?",
      answer:
        "Leads, llamadas, pedidos e ingresos. No métricas vanidosas. Cada informe empieza por el pipeline y el coste por lead.",
    },
  ],
};

/** English default for callers that have not switched to getFaqItems(locale). */
export const faqItems: FaqItem[] = faqItemsByLocale.en;

export function getFaqItems(locale: Locale): FaqItem[] {
  return faqItemsByLocale[locale] ?? faqItemsByLocale.en;
}

function flattenAbout(locale: Locale) {
  const c = aboutContentI18n[locale] ?? aboutContentI18n.en;
  const meta =
    locale === "es"
      ? {
          metaTitle: "Sobre nuestra agencia de growth marketing",
          metaDescription:
            "La agencia de growth que lleva SEO, anuncios, diseño web y contenido como un solo sistema. Cartera pequeña. Informes que empiezan por leads e ingresos.",
        }
      : {
          metaTitle: "About Our Growth Marketing Agency",
          metaDescription:
            "Meet the growth marketing agency that runs SEO, ads, web design, and content as one system. Small roster. Reviews that start with leads and revenue.",
        };

  return {
    ...meta,
    heroEyebrow: c.heroTag,
    heroTitle: c.heroTitle,
    heroSignal: c.heroTitleHighlight,
    heroCopy: `${c.heroSubtitleLine1} ${c.heroSubtitleLine2}`,
    why: {
      eyebrow: c.whyWeExistTag,
      title: c.whyWeExistAside,
      problemLabel: c.whyProblemLabel,
      solutionLabel: c.whySolutionLabel,
      problem: [c.whyParagraph1, c.whyParagraph2b],
      solutionQuote: c.whyQuote,
      solution: [c.whyParagraph2, c.whyParagraph3],
    },
    partnership: {
      eyebrow: c.partnershipTag,
      title: c.partnershipTitle,
      copy: c.partnershipSubtitle,
      signals: c.partnershipSignals,
    },
    method: {
      eyebrow: c.methodTag,
      title: `${c.methodTitleLine1} ${c.methodTitleLine2}.`,
      phases: c.methodPhases,
    },
    architecture: {
      eyebrow: c.architectureTag,
      title: c.architectureTitle,
      copy: c.architectureSubtitle,
      nodes: c.architectureNodes,
      caption: c.architectureCaption,
    },
    principles: {
      eyebrow: c.principlesTag,
      title: c.principlesTitle,
      items: c.principles,
    },
    roadmap: {
      eyebrow: c.roadmapTag,
      title: c.roadmapTitle,
      copy: c.roadmapSubtitle,
      milestones: c.futureMilestones,
    },
    ctaTitle: c.ctaTitle,
    ctaCopy: c.ctaSubtitle,
  };
}

/** Flat shape consumed by the About page. English default. */
export const aboutContent = flattenAbout("en");

export function getAboutContent(locale: Locale) {
  return flattenAbout(locale);
}
