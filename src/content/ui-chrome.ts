import type { Locale } from "@/i18n/routing";

export type UiChromeCopy = {
  contractNote: string;
  inlineCta: {
    title: string;
    subtitle: string;
  };
  proof: {
    title: string;
    subtitle: string;
    caseStudy: string;
    challenge: string;
    approach: string;
    results: string;
    readFull: string;
  };
  pricingTeaser: {
    badge: string;
    title: string;
    body: string;
    noHiddenFees: string;
    monthToMonth: string;
    cta: string;
  };
  pricingCta: {
    badge: string;
  };
  caseStudy: {
    overviewBadge: string;
    overviewTitle: string;
    kickoffTitle: string;
    strategyTitle: string;
    growthTitle: (label: string) => string;
    deliverablesBadge: string;
    deliverablesTitle: string;
    toolsBadge: string;
    takeawaysBadge: string;
    takeawaysTitle: string;
    faqLabel: string;
    faqTitle: string;
    meta: {
      industry: string;
      client: string;
      engagement: string;
      primaryGoal: string;
      services: string;
      results: string;
      phases: (n: number) => string;
      fullStack: string;
      kpisTracked: (n: number) => string;
      growthFallback: string;
    };
  };
  solution: {
    challenge: string;
    approach: string;
    approachDesc: string;
    deliverables: string;
    results: string;
    viewCaseStudies: string;
    industryMarketing: (label: string) => string;
    ctaHeadline: (title: string) => string;
    ctaSubtitle: string;
    ctaLabel: string;
  };
};

export const uiChrome: Record<Locale, UiChromeCopy> = {
  en: {
    contractNote: "No long-term contracts. Month to month.",
    inlineCta: {
      title: "Ready to see what this looks like for your business?",
      subtitle:
        "Book a strategy call. We will review your current setup and outline the highest-impact next steps.",
    },
    proof: {
      title: "Proof it works",
      subtitle: "Real client work with measurable outcomes, not vanity metrics.",
      caseStudy: "Case study",
      challenge: "The challenge",
      approach: "Our approach",
      results: "The results",
      readFull: "Read the full case study",
    },
    pricingTeaser: {
      badge: "Transparent Pricing",
      title: "Fixed scope. No surprise fees.",
      body: "See exactly what's included at each tier before you commit. Our pricing is built on defined deliverables, not vague retainers.",
      noHiddenFees: "No hidden fees",
      monthToMonth: "Month to month",
      cta: "See Pricing Plans",
    },
    pricingCta: {
      badge: "Ready to scope your plan?",
    },
    caseStudy: {
      overviewBadge: "Overview",
      overviewTitle: "What happened, in three sentences",
      kickoffTitle: "Where things stood at kickoff",
      strategyTitle: "Five moves, run in sequence",
      growthTitle: (label) => `${label} growth, month by month`,
      deliverablesBadge: "Deliverables",
      deliverablesTitle: "What was built",
      toolsBadge: "Tools & Platforms",
      takeawaysBadge: "Key Takeaways",
      takeawaysTitle: "Why it compounded",
      faqLabel: "FAQ",
      faqTitle: "Common questions",
      meta: {
        industry: "Industry",
        client: "Client",
        engagement: "Engagement",
        primaryGoal: "Primary Goal",
        services: "Services",
        results: "Results",
        phases: (n) => `${n} phases`,
        fullStack: "Full-stack",
        kpisTracked: (n) => `${n} KPIs tracked`,
        growthFallback: "Growth",
      },
    },
    solution: {
      challenge: "The challenge",
      approach: "Our approach",
      approachDesc: "A tailored strategy, not a template with your industry name swapped in.",
      deliverables: "Deliverables",
      results: "Results framework",
      viewCaseStudies: "View All Case Studies",
      industryMarketing: (label) => `${label} Marketing`,
      ctaHeadline: (title) => `Ready to get started with ${title.toLowerCase()}?`,
      ctaSubtitle:
        "Book a strategy call and we'll outline a plan tailored to your market, competition, and revenue goals.",
      ctaLabel: "Book a Strategy Call",
    },
  },
  es: {
    contractNote: "Sin contratos a largo plazo. Mes a mes.",
    inlineCta: {
      title: "¿Listo para ver cómo se ve esto en tu negocio?",
      subtitle:
        "Agenda una llamada estratégica. Revisaremos tu setup actual y delinearemos los siguientes pasos de mayor impacto.",
    },
    proof: {
      title: "Prueba de que funciona",
      subtitle: "Trabajo real con clientes y resultados medibles, no métricas de vanidad.",
      caseStudy: "Caso de estudio",
      challenge: "El desafío",
      approach: "Nuestro enfoque",
      results: "Los resultados",
      readFull: "Leer el caso completo",
    },
    pricingTeaser: {
      badge: "Precios Transparentes",
      title: "Alcance fijo. Sin sorpresas.",
      body: "Ve exactamente qué incluye cada nivel antes de comprometerte. Nuestros precios se basan en entregables definidos, no en retainers vagos.",
      noHiddenFees: "Sin cargos ocultos",
      monthToMonth: "Mes a mes",
      cta: "Ver Planes de Precios",
    },
    pricingCta: {
      badge: "¿Listo para definir tu plan?",
    },
    caseStudy: {
      overviewBadge: "Resumen",
      overviewTitle: "Qué pasó, en tres oraciones",
      kickoffTitle: "Cómo estaba todo al inicio",
      strategyTitle: "Cinco movimientos, en secuencia",
      growthTitle: (label) => `Crecimiento de ${label}, mes a mes`,
      deliverablesBadge: "Entregables",
      deliverablesTitle: "Qué se construyó",
      toolsBadge: "Herramientas y Plataformas",
      takeawaysBadge: "Aprendizajes Clave",
      takeawaysTitle: "Por qué se acumuló",
      faqLabel: "FAQ",
      faqTitle: "Preguntas frecuentes",
      meta: {
        industry: "Sector",
        client: "Cliente",
        engagement: "Engagement",
        primaryGoal: "Objetivo Principal",
        services: "Servicios",
        results: "Resultados",
        phases: (n) => `${n} fases`,
        fullStack: "Full-stack",
        kpisTracked: (n) => `${n} KPIs rastreados`,
        growthFallback: "Crecimiento",
      },
    },
    solution: {
      challenge: "El desafío",
      approach: "Nuestro enfoque",
      approachDesc: "Una estrategia a medida, no una plantilla con el nombre de tu industria cambiado.",
      deliverables: "Entregables",
      results: "Marco de resultados",
      viewCaseStudies: "Ver Todos los Casos de Éxito",
      industryMarketing: (label) => `Marketing para ${label}`,
      ctaHeadline: (title) => `¿Listo para empezar con ${title.toLowerCase()}?`,
      ctaSubtitle:
        "Agenda una llamada estratégica y delinearemos un plan adaptado a tu mercado, competencia y objetivos de ingresos.",
      ctaLabel: "Reservar una Llamada Estratégica",
    },
  },
};
