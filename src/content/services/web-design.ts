import type { Locale } from "@/i18n/routing";
import type { ServicePhase } from "@/components/ui/ServicePhaseList";
import type { FAQItem } from "@/components/sections/FAQSection";

export type BeforeAfterContent = {
  headline: string;
  beforeLabel: string;
  afterLabel: string;
  beforeSub: string;
  afterSub: string;
  beforeDetails: string[];
  afterDetails: string[];
};

export type DeviceContent = {
  name: string;
};

export type PerfMetricContent = {
  label: string;
  sub: string;
};

export type WebDesignContent = {
  heroLabel: string;
  heroHeadlineLine1: string;
  heroHeadlineLine2: string;
  heroSubtitle: string;
  heroCtaLabel: string;
  beforeAfterTitle: string;
  beforeAfterSubtitle: string;
  beforeAfters: BeforeAfterContent[];
  beforeAfterHint: string;
  surfacesTitle: string;
  surfacesSubtitle: string;
  devices: DeviceContent[];
  performanceTitle: string;
  performanceSubtitle: string;
  perfMetrics: PerfMetricContent[];
  buildProcessTitle: string;
  buildProcessSubtitle: string;
  phases: ServicePhase[];
  ctaHeadline: string;
  ctaSubtitle: string;
  ctaLabel: string;
  faqs: FAQItem[];
};

export const webDesignContent: Record<Locale, WebDesignContent> = {
  en: {
    heroLabel: "Craftsmanship",
    heroHeadlineLine1: "Websites that feel",
    heroHeadlineLine2: "like products.",
    heroSubtitle:
      "We don't build template sites.|Every layout, interaction, and pixel is designed to turn visitors into qualified leads.",
    heroCtaLabel: "Start Your Project",
    beforeAfterTitle: "Before & After",
    beforeAfterSubtitle:
      "Real before-and-after results from real projects.|Every number represents a measurable business outcome.",
    beforeAfters: [
      {
        headline: "+425% conversion lift",
        beforeLabel: "Before",
        afterLabel: "After",
        beforeSub: "Conversion Rate",
        afterSub: "Conversion Rate",
        beforeDetails: [
          "Generic template-based layout",
          "45% bounce rate. Visitors left immediately",
          "4.2s load time. 53% mobile abandonment",
          "No clear above-fold CTA",
        ],
        afterDetails: [
          "Custom brand experience from scratch",
          "22% bounce rate. Visitors explore deeper",
          "1.4s load time. 94 Lighthouse score",
          "Primary CTA in first viewport",
        ],
      },
      {
        headline: "3.8x mobile engagement",
        beforeLabel: "Before",
        afterLabel: "After",
        beforeSub: "Mobile Drop-off Rate",
        afterSub: "Mobile Drop-off Rate",
        beforeDetails: [
          "Desktop-only design mentality",
          "Cluttered navigation on small screens",
          "No touch-friendly interactions",
          "Text too small to read without zoom",
        ],
        afterDetails: [
          "Mobile-first architecture from wireframes",
          "Streamlined navigation with gesture support",
          "Touch-optimized buttons and forms",
          "Responsive typography that scales naturally",
        ],
      },
      {
        headline: "+215% time on site",
        beforeLabel: "Before",
        afterLabel: "After",
        beforeSub: "Avg. Session Duration",
        afterSub: "Avg. Session Duration",
        beforeDetails: [
          "Generic stock photography throughout",
          "No trust signals or social proof above fold",
          "Thin content with no clear hierarchy",
          "Outdated brand perception on first glance",
        ],
        afterDetails: [
          "Custom photography and brand illustrations",
          "Client logos, testimonials above fold",
          "Rich content with visual hierarchy",
          "Premium aesthetic builds instant trust",
        ],
      },
    ],
    beforeAfterHint: "Click the tabs above to explore more before-and-after examples",
    surfacesTitle: "Every surface matters.",
    surfacesSubtitle:
      "Your website lives across devices, viewports, and contexts.|We design and test every experience to ensure consistency at every size.",
    devices: [{ name: "Desktop" }, { name: "Tablet" }, { name: "Mobile" }],
    performanceTitle: "Built for performance.",
    performanceSubtitle:
      "A beautiful site that loads slowly is a broken site.|We obsess over every byte, every request, and every render.",
    perfMetrics: [
      { label: "Load Time", sub: "P75 across all projects" },
      { label: "Lighthouse Score", sub: "Mobile + Desktop average" },
      { label: "Core Web Vitals", sub: "LCP, FID, CLS all green" },
      { label: "Accessibility", sub: "WCAG 2.1 compliant" },
    ],
    buildProcessTitle: "The build process.",
    buildProcessSubtitle:
      "From discovery to launch,|every phase has a clear deliverable and a defined success metric.",
    phases: [
      {
        title: "Discovery & Strategy",
        desc: "User behavior analysis, competitor audit, stakeholder interviews. Output: strategic brief and sitemap.",
        metric: "Strategic brief delivered in week 1",
      },
      {
        title: "UX & Wireframing",
        desc: "High-fidelity wireframes mapping every user journey. Navigation flows tested before a single pixel is designed.",
        metric: "Every user journey mapped before design",
      },
      {
        title: "Visual Design",
        desc: "Full-color mockups rooted in conversion psychology. Each block has a clear hierarchy and purpose.",
        metric: "Conversion-focused mockups in 2 weeks",
      },
      {
        title: "Development & QA",
        desc: "Clean code, Lighthouse 90+, WCAG accessible. Cross-browser tested on every device.",
        metric: "Lighthouse 90+ on every build",
      },
      {
        title: "Launch & Handoff",
        desc: "Zero-downtime deployment, DNS migration, CMS training. Your team can hit the ground running.",
        metric: "Zero-downtime deployment guaranteed",
      },
    ],
    ctaHeadline: "Ready for a website that works as hard as you do?",
    ctaSubtitle: "Let's build a site that turns visitors into qualified leads,|starting today.",
    ctaLabel: "Start Your Project",
    faqs: [
      { question: "How long does a website project take?", answer: "Most projects run 6–10 weeks: 1 week discovery, 1–2 weeks UX and wireframing, 2–3 weeks visual design, 2–3 weeks development and QA, then launch. Complex sites with e-commerce or custom functionality may take longer." },
      { question: "Do you build on specific platforms or CMS?", answer: "We build custom sites and work with WordPress and Webflow depending on your team's needs and the complexity of the project. We recommend the right stack for your goals, not the one that's easiest for us." },
      { question: "Will my site be fast and mobile-optimized?", answer: "Yes. Every site we build hits Lighthouse 90+ on mobile and desktop, passes Core Web Vitals, and meets WCAG 2.1 accessibility standards. Performance is baked into the build process, not bolted on at the end." },
      { question: "Do you handle content migration from my existing site?", answer: "Yes. If you have existing content worth keeping, we migrate and restructure it as part of the build. We'll audit your current content and recommend what to keep, update, or retire." },
      { question: "Can you redesign an existing website?", answer: "Yes. Redesigns are a common engagement. We audit your current site, identify what's working and what isn't, and rebuild it with a clear conversion strategy and modern performance standards." },
    ],
  },
  es: {
    heroLabel: "Artesanía",
    heroHeadlineLine1: "Sitios que se sienten",
    heroHeadlineLine2: "como productos.",
    heroSubtitle:
      "No construimos sitios con plantillas.|Cada diseño, interacción y píxel está diseñado para convertir visitantes en leads calificados.",
    heroCtaLabel: "Inicia Tu Proyecto",
    beforeAfterTitle: "Antes y Después",
    beforeAfterSubtitle:
      "Resultados reales de antes y después en proyectos reales.|Cada número representa un resultado de negocio medible.",
    beforeAfters: [
      {
        headline: "+425% aumento en conversión",
        beforeLabel: "Antes",
        afterLabel: "Después",
        beforeSub: "Tasa de Conversión",
        afterSub: "Tasa de Conversión",
        beforeDetails: [
          "Diseño genérico basado en plantillas",
          "45% tasa de rebote. Los visitantes se iban de inmediato",
          "4.2s tiempo de carga. 53% abandono móvil",
          "Sin CTA claro en la parte superior",
        ],
        afterDetails: [
          "Experiencia de marca personalizada desde cero",
          "22% tasa de rebote. Los visitantes exploran más",
          "1.4s tiempo de carga. Puntuación Lighthouse 94",
          "CTA principal en el primer viewport",
        ],
      },
      {
        headline: "3.8x engagement móvil",
        beforeLabel: "Antes",
        afterLabel: "Después",
        beforeSub: "Tasa de Abandono Móvil",
        afterSub: "Tasa de Abandono Móvil",
        beforeDetails: [
          "Mentalidad de diseño solo para escritorio",
          "Navegación desordenada en pantallas pequeñas",
          "Sin interacciones táctiles amigables",
          "Texto demasiado pequeño para leer sin zoom",
        ],
        afterDetails: [
          "Arquitectura mobile-first desde wireframes",
          "Navegación optimizada con soporte de gestos",
          "Botones y formularios optimizados para táctil",
          "Tipografía responsiva que escala naturalmente",
        ],
      },
      {
        headline: "+215% tiempo en el sitio",
        beforeLabel: "Antes",
        afterLabel: "Después",
        beforeSub: "Duración Promedio de Sesión",
        afterSub: "Duración Promedio de Sesión",
        beforeDetails: [
          "Fotografía de stock genérica en todo el sitio",
          "Sin señales de confianza o prueba social arriba",
          "Contenido escaso sin jerarquía clara",
          "Percepción de marca desactualizada al primer vistazo",
        ],
        afterDetails: [
          "Fotografía personalizada e ilustraciones de marca",
          "Logos de clientes y testimonios arriba",
          "Contenido rico con jerarquía visual",
          "Estética premium que genera confianza instantánea",
        ],
      },
    ],
    beforeAfterHint: "Haz clic en las pestañas de arriba para ver más ejemplos de antes y después",
    surfacesTitle: "Cada superficie importa.",
    surfacesSubtitle:
      "Tu sitio web vive en dispositivos, viewports y contextos.|Diseñamos y probamos cada experiencia para garantizar consistencia en cada tamaño.",
    devices: [{ name: "Escritorio" }, { name: "Tablet" }, { name: "Móvil" }],
    performanceTitle: "Construido para el rendimiento.",
    performanceSubtitle:
      "Un sitio hermoso que carga lento es un sitio roto.|Nos obsesionamos con cada byte, cada solicitud y cada renderizado.",
    perfMetrics: [
      { label: "Tiempo de Carga", sub: "P75 en todos los proyectos" },
      { label: "Puntuación Lighthouse", sub: "Promedio móvil + escritorio" },
      { label: "Core Web Vitals", sub: "LCP, FID, CLS todos en verde" },
      { label: "Accesibilidad", sub: "Cumple WCAG 2.1" },
    ],
    buildProcessTitle: "El proceso de construcción.",
    buildProcessSubtitle:
      "Del descubrimiento al lanzamiento,|cada fase tiene un entregable claro y una métrica de éxito definida.",
    phases: [
      {
        title: "Descubrimiento y Estrategia",
        desc: "Análisis de comportamiento de usuario, auditoría de competidores, entrevistas con stakeholders. Entregable: brief estratégico y mapa del sitio.",
        metric: "Brief estratégico entregado en la semana 1",
      },
      {
        title: "UX y Wireframing",
        desc: "Wireframes de alta fidelidad mapeando cada recorrido de usuario. Flujos de navegación probados antes de diseñar un solo píxel.",
        metric: "Cada recorrido de usuario mapeado antes del diseño",
      },
      {
        title: "Diseño Visual",
        desc: "Mockups a todo color basados en psicología de conversión. Cada elemento tiene una jerarquía y una función.",
        metric: "Mockups enfocados en conversión en 2 semanas",
      },
      {
        title: "Desarrollo y QA",
        desc: "Código limpio, Lighthouse 90+, accesible WCAG. Probado en todos los navegadores y dispositivos.",
        metric: "Lighthouse 90+ en cada build",
      },
      {
        title: "Lanzamiento y Entrega",
        desc: "Despliegue sin tiempo de inactividad, migración DNS, capacitación CMS. Tu equipo puede empezar de inmediato.",
        metric: "Despliegue sin tiempo de inactividad garantizado",
      },
    ],
    ctaHeadline: "¿Listo para un sitio web que trabaje tan duro como tú?",
    ctaSubtitle: "Construyamos un sitio que convierta visitantes en leads calificados,|empezando hoy.",
    ctaLabel: "Inicia Tu Proyecto",
    faqs: [
      { question: "¿Cuánto tiempo tarda un proyecto de diseño web?", answer: "La mayoría de los proyectos duran 6-10 semanas: 1 de discovery, 1-2 de UX y wireframing, 2-3 de diseño visual, 2-3 de desarrollo y QA y luego el lanzamiento. Sitios complejos con e-commerce pueden tardar más." },
      { question: "¿En qué plataformas o CMS construyen?", answer: "Construimos sitios personalizados y trabajamos con WordPress y Webflow según las necesidades de tu equipo y la complejidad del proyecto. Recomendamos la mejor opción para tus objetivos, no la más fácil para nosotros." },
      { question: "¿Mi sitio será rápido y optimizado para móvil?", answer: "Sí. Cada sitio que construimos alcanza Lighthouse 90+ en móvil y escritorio, pasa los Core Web Vitals y cumple con los estándares de accesibilidad WCAG 2.1. El rendimiento está integrado en el proceso de construcción." },
      { question: "¿Pueden hacer el rediseño de un sitio existente?", answer: "Sí. Los rediseños son un proyecto común. Auditamos tu sitio actual, identificamos qué funciona y qué no, y lo reconstruimos con una estrategia de conversión clara y estándares de rendimiento modernos." },
      { question: "¿Manejan la migración de contenido de mi sitio actual?", answer: "Sí. Si tienes contenido existente que vale la pena conservar, lo migramos y reestructuramos como parte del build. Auditamos tu contenido actual y recomendamos qué conservar, actualizar o retirar." },
    ],
  },};
