import type { Locale } from "@/i18n/routing";
import type { ServicePhase } from "@/components/ui/ServicePhaseList";
import type { FAQItem } from "@/components/sections/FAQSection";

export type TestResultContent = {
  test: string;
  winner: string;
  lift: string;
  significance: string;
  runs: string;
};

export type MethodStepContent = {
  id: "collect" | "hypothesize" | "experiment" | "analyze" | "iterate";
  title: string;
  desc: string;
};

export type MetricCardContent = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  desc: string;
};

export type CROContent = {
  hero: {
    label: string;
    headlineLine1: string;
    headlineLine2: string;
    subtitle: string;
    ctaLabel: string;
    variantLabel: string;
  };
  testTrackerSection: {
    title: string;
    subtitle: string;
    headers: {
      test: string;
      winner: string;
      lift: string;
      significance: string;
      visitors: string;
    };
  };
  testResults: TestResultContent[];
  methodSection: {
    title: string;
    subtitle: string;
    steps: MethodStepContent[];
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

export const croContent: Record<Locale, CROContent> = {
  en: {
    hero: {
      label: "Scientific Method",
      headlineLine1: "Find the revenue",
      headlineLine2: "you're already paying for.",
      subtitle:
        "Hands-on A/B testing, heatmap analysis,|and UX audits that keep improving your conversion rates.",
      ctaLabel: "Start Optimizing",
      variantLabel: "Variant",
    },
    testTrackerSection: {
      title: "A/B Test Results Tracker",
      subtitle:
        "Every test is documented with sample size,|significance level, and real conversion impact.",
      headers: {
        test: "Test",
        winner: "Winner",
        lift: "Lift",
        significance: "Sig.",
        visitors: "Visitors",
      },
    },
    testResults: [
      { test: "Form Fields", winner: "4 fields vs. 7 fields", lift: "+42%", significance: "99%", runs: "1,800" },
      { test: "Social Proof Block", winner: "Reviews above fold vs. below form", lift: "+31%", significance: "97%", runs: "2,900" },
      { test: "CTA Button Copy", winner: "Book a free estimate vs. Contact us", lift: "+23%", significance: "99%", runs: "2,400" },
      { test: "Headline A/B", winner: "Benefit-driven vs. feature", lift: "+18%", significance: "95%", runs: "3,100" },
    ],
    methodSection: {
      title: "The scientific method applied to conversion.",
      subtitle: "Every change we make starts with a hypothesis grounded in real user data, not assumptions. We run controlled experiments, wait for statistical significance, and implement only the variations that hold up under scrutiny.",
      steps: [
        {
          id: "collect",
          title: "Collect Data",
          desc: "Heatmaps, session recordings, and analytics to establish baselines from both numbers and user behavior",
        },
        {
          id: "hypothesize",
          title: "Generate Hypotheses",
          desc: "Every test starts with a hypothesis rooted in real data, not guesses",
        },
        {
          id: "experiment",
          title: "Run Experiments",
          desc: "A/B tests and multivariate tests deployed on proven testing tools",
        },
        {
          id: "analyze",
          title: "Analyze Results",
          desc: "Statistical significance checks so we don't call a winner too early",
        },
        {
          id: "iterate",
          title: "Implement & Iterate",
          desc: "Winning variations deployed. Roadmap updated with fresh insights",
        },
      ],
    },
    metricsSection: {
      title: "Small wins add up.",
      subtitle: "Compounding improvements is how CRO creates durable revenue growth. A 15% lift applied to a refined funnel, then tested again, produces results that outpace any single redesign or campaign launch.",
      metrics: [
        { label: "Conversion Lift per Test", value: 15, prefix: "+", suffix: "%", desc: "Average across all tests" },
        { label: "Simultaneous Tests", value: 4, desc: "Running at any given time" },
        { label: "Test Win Rate", value: 72, suffix: "%", desc: "Percentage of winning tests" },
        { label: "Revenue Lift", value: 31, prefix: "+", suffix: "%", desc: "Avg. across winning test implementations" },
      ],
    },
    processSection: {
      title: "The optimization cycle.",
      subtitle:
        "A continuous loop of data collection, hypothesis testing,|and implementation that never stops improving.",
    },
    phases: [
      {
        title: "Collect Data",
        desc: "Heatmaps, session recordings, and analytics to establish baselines from both numbers and user behavior",
        metric: "Full conversion audit in week 1",
      },
      {
        title: "Generate Hypotheses",
        desc: "Every test starts with a hypothesis rooted in real data, not guesses",
        metric: "8+ test hypotheses per quarter",
      },
      {
        title: "Run Experiments",
        desc: "A/B tests and multivariate tests deployed on proven testing tools",
        metric: "Avg. 4.2 active tests per month",
      },
      {
        title: "Analyze Results",
        desc: "Statistical significance checks so we don't call a winner too early",
        metric: "95%+ statistical confidence required",
      },
      {
        title: "Implement & Iterate",
        desc: "Winning variations deployed. Roadmap updated with fresh insights",
        metric: "Avg. 23% conversion lift per winner",
      },
    ],
    cta: {
      headline: "Ready to turn more traffic into revenue?",
      subtitle:
        "We'll build a testing program that steadily improves your conversion rates,|one winning test at a time.",
      ctaLabel: "Start Optimizing",
    },
    faqs: [
      { question: "How do you decide what to test?", answer: "Every test starts with data. We review heatmaps, session recordings, analytics, and on-site behavior to find where visitors are dropping off or hesitating. Tests are hypotheses backed by real evidence, not guesses." },
      { question: "How long does a test run?", answer: "Tests run until they reach 95%+ statistical significance, which typically takes 2–4 weeks depending on traffic volume. We never call a winner early. That's how you end up implementing changes that hurt performance." },
      { question: "What kind of conversion lift can I expect?", answer: "Our clients see an average 15–23% conversion lift per winning test. Results compound over time. A 15% lift on top of another 15% lift adds up significantly across a quarter of testing." },
      { question: "Do I need a lot of traffic for CRO to work?", answer: "You need enough traffic to reach statistical significance in a reasonable time. Generally, we recommend at least 500 monthly goal completions before starting a testing program. If you're below that, we focus on qualitative research first." },
      { question: "What pages do you prioritize for testing?", answer: "High-traffic pages with clear conversion goals: your homepage, service or product pages, pricing pages, and checkout flows. We identify the pages where a conversion rate lift will have the biggest revenue impact and start there." },
    ],
  },
  es: {
    hero: {
      label: "Método Científico",
      headlineLine1: "Convierte más tráfico",
      headlineLine2: "en ingresos.",
      subtitle:
        "A/B testing práctico,|análisis de heatmaps y auditorías UX que mejoran continuamente tus tasas de conversión.",
      ctaLabel: "Empieza a Optimizar",
      variantLabel: "Variante",
    },
    testTrackerSection: {
      title: "Rastreador de Resultados A/B",
      subtitle:
        "Cada test se documenta con tamaño de muestra,|nivel de significancia e impacto real en conversión.",
      headers: {
        test: "Test",
        winner: "Ganador",
        lift: "Aumento",
        significance: "Sig.",
        visitors: "Visitantes",
      },
    },
    testResults: [
      { test: "Campos de Formulario", winner: "4 campos vs. 7 campos", lift: "+42%", significance: "99%", runs: "1,800" },
      { test: "Bloque de Prueba Social", winner: "Reseñas arriba vs. abajo del formulario", lift: "+31%", significance: "97%", runs: "2,900" },
      { test: "Texto Botón CTA", winner: "Reserva estimación gratis vs. Contáctanos", lift: "+23%", significance: "99%", runs: "2,400" },
      { test: "Titular A/B", winner: "Beneficio vs. característica", lift: "+18%", significance: "95%", runs: "3,100" },
    ],
    methodSection: {
      title: "El método científico aplicado a conversión.",
      subtitle: "Cada cambio que hacemos comienza con una hipótesis fundamentada en datos reales de usuario, no en suposiciones. Ejecutamos experimentos controlados, esperamos la significancia estadística e implementamos solo las variaciones que resisten el escrutinio.",
      steps: [
        {
          id: "collect",
          title: "Recopilar Datos",
          desc: "Heatmaps, grabaciones de sesión y analytics para establecer líneas base con números y comportamiento",
        },
        {
          id: "hypothesize",
          title: "Generar Hipótesis",
          desc: "Cada test empieza con una hipótesis basada en datos reales, no en suposiciones",
        },
        {
          id: "experiment",
          title: "Ejecutar Experimentos",
          desc: "Tests A/B y multivariados desplegados en herramientas de testing probadas",
        },
        {
          id: "analyze",
          title: "Analizar Resultados",
          desc: "Comprobaciones de significancia estadística para no declarar ganador demasiado pronto",
        },
        {
          id: "iterate",
          title: "Implementar e Iterar",
          desc: "Variaciones ganadoras desplegadas. Roadmap actualizado con nuevos insights",
        },
      ],
    },
    metricsSection: {
      title: "Las pequeñas victorias suman.",
      subtitle: "Las mejoras que se acumulan son cómo la CRO genera crecimiento de ingresos duradero. Un aumento del 15% aplicado a un embudo refinado, luego probado de nuevo, produce resultados que superan cualquier rediseño o lanzamiento de campaña único.",
      metrics: [
        { label: "Aumento de Conversión por Test", value: 15, prefix: "+", suffix: "%", desc: "Promedio en todos los tests" },
        { label: "Tests Simultáneos", value: 4, desc: "Activos en cualquier momento" },
        { label: "Tasa de Victoria", value: 72, suffix: "%", desc: "Porcentaje de tests ganadores" },
        { label: "Aumento de Ingresos", value: 31, prefix: "+", suffix: "%", desc: "Prom. en implementaciones ganadoras" },
      ],
    },
    processSection: {
      title: "El ciclo de optimización.",
      subtitle:
        "Un bucle continuo de recopilación de datos,|prueba de hipótesis e implementación que nunca deja de mejorar.",
    },
    phases: [
      {
        title: "Recopilar Datos",
        desc: "Heatmaps, grabaciones de sesión y analytics para establecer líneas base con números y comportamiento",
        metric: "Auditoría de conversión completa en semana 1",
      },
      {
        title: "Generar Hipótesis",
        desc: "Cada test empieza con una hipótesis basada en datos reales, no en suposiciones",
        metric: "8+ hipótesis de test por trimestre",
      },
      {
        title: "Ejecutar Experimentos",
        desc: "Tests A/B y multivariados desplegados en herramientas de testing probadas",
        metric: "Prom. 4.2 tests activos por mes",
      },
      {
        title: "Analizar Resultados",
        desc: "Comprobaciones de significancia estadística para no declarar ganador demasiado pronto",
        metric: "95%+ de confianza estadística requerida",
      },
      {
        title: "Implementar e Iterar",
        desc: "Variaciones ganadoras desplegadas. Roadmap actualizado con nuevos insights",
        metric: "Prom. 23% aumento de conversión por ganador",
      },
    ],
    cta: {
      headline: "¿Listo para convertir más tráfico en ingresos?",
      subtitle:
        "Construiremos un programa de testing que mejore tus tasas de conversión,|un test ganador a la vez.",
      ctaLabel: "Empieza a Optimizar",
    },
    faqs: [
      { question: "¿Cómo deciden qué probar?", answer: "Cada test empieza con datos. Revisamos heatmaps, grabaciones de sesiones, analítica y comportamiento en el sitio para encontrar dónde los visitantes abandonan o dudan. Los tests son hipótesis respaldadas por evidencia real, no suposiciones." },
      { question: "¿Cuánto tiempo dura un test?", answer: "Los tests se ejecutan hasta alcanzar el 95%+ de significancia estadística, lo que generalmente tarda 2-4 semanas según el volumen de tráfico. Nunca declaramos un ganador prematuramente." },
      { question: "¿Qué tipo de mejora en conversión puedo esperar?", answer: "Nuestros clientes ven una mejora promedio del 15-23% en conversión por test ganador. Los resultados se acumulan con el tiempo: una mejora del 15% sobre otra del 15% suma mucho en un trimestre de testing." },
      { question: "¿Necesito mucho tráfico para que funcione el CRO?", answer: "Necesitas suficiente tráfico para alcanzar significancia estadística en un tiempo razonable. Generalmente recomendamos al menos 500 completaciones de objetivo mensuales antes de iniciar un programa de testing." },
      { question: "¿Qué páginas priorizan para los tests?", answer: "Páginas de alto tráfico con objetivos de conversión claros: homepage, páginas de servicio o producto, páginas de precios y flujos de checkout. Identificamos dónde una mejora de conversión tendrá mayor impacto en ingresos." },
    ],
  },};
