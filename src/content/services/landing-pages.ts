import type { Locale } from "@/i18n/routing";
import type { ServicePhase } from "@/components/ui/ServicePhaseList";

export type LandingPagesContent = {
  hero: {
    ctaLabel: string;
  };
  processSection: {
    title: string;
    subtitle: string;
  };
  processIntro: string;
  phases: ServicePhase[];
  capabilityBodies: {
    strategyDesign: string;
    buildCopy: string;
    trackingTesting: string;
  };
  cta: {
    headline: string;
    subtitle: string;
    ctaLabel: string;
  };
  inlineCtaLabel: string;
  inlineCtaSubtitle: string;
};

export const landingPagesContent: Record<Locale, LandingPagesContent> = {
  en: {
    hero: {
      ctaLabel: "Start Your Landing Page",
    },
    processSection: {
      title: "Engagement timeline",
      subtitle: "From wireframe to a live, converting page.",
    },
    processIntro:
      "A landing page ships in weeks, not months. Our cycle runs from campaign brief and wireframe through design, build, launch baseline, and structured A/B testing. Each phase with a deliverable your team can sign off on before the next starts.",
    phases: [
      {
        title: "Strategy & Wireframe",
        desc: "Campaign review, offer positioning, message match audit, and an approved wireframe mapped to one conversion goal.",
        metric: "",
      },
      {
        title: "Design & Copy",
        desc: "High-fidelity mobile-first design and conversion copy reviewed before a single line of code gets written.",
        metric: "",
      },
      {
        title: "Build & Launch",
        desc: "Development, GA4 and form tracking, cross-device QA, and launch with a conversion baseline captured.",
        metric: "",
      },
      {
        title: "Test & Optimize",
        desc: "A/B tests on headlines, layout, and form length, winners deployed only after statistical significance.",
        metric: "",
      },
    ],
    capabilityBodies: {
      strategyDesign:
        "We start every landing page with the campaign brief, not a mood board. Wireframes map message match between the ad and the page headline, proof placement where doubt shows up, and a single primary action visible on mobile without scrolling. Most agencies sketch a pretty layout and hope it converts. We sketch the conversion path first, who clicked, what they expected to see, and what has to happen before they submit or call.",
      buildCopy:
        "Development and copy run in parallel because the headline and form fields are conversion levers, not decoration. Copy qualifies visitors in the first line, answers the objection they walked in with, and keeps the form to the minimum fields your sales team actually needs. Pages ship mobile-first with Core Web Vitals in mind. A slow load kills conversion before anyone reads your headline.",
      trackingTesting:
        "Launch is the starting line, not the finish. Every page ships with GA4 events, form and call tracking, and a thank-you flow that confirms attribution. Then we run structured A/B tests on headlines, layout, and form length, waiting for statistical significance before calling a winner. The dashboard shows conversion rate and cost per lead, not pageviews.",
    },
    cta: {
      headline: "Ready to give your ad traffic a page built to convert?",
      subtitle:
        "Let's build a landing page with message match, a fast mobile load,|and a testing plan that keeps improving the number after launch.",
      ctaLabel: "See Landing Page Pricing",
    },
    inlineCtaLabel: "Get a Page Review",
    inlineCtaSubtitle:
      "We will review your current page against the ad it serves, message match, mobile UX, form friction, and tracking gaps. Then outline the highest-impact fixes.",
  },
  es: {
    hero: {
      ctaLabel: "Inicia Tu Landing Page",
    },
    processSection: {
      title: "Cronograma del proyecto",
      subtitle: "Del wireframe a una página en vivo que convierte.",
    },
    processIntro:
      "Una landing page se publica en semanas, no meses. Nuestro ciclo va del brief de campaña y wireframe a diseño, build, línea base de lanzamiento y A/B testing estructurado, cada fase con un entregable que tu equipo aprueba antes de la siguiente.",
    phases: [
      {
        title: "Estrategia y Wireframe",
        desc: "Revisión de campaña, posicionamiento de oferta, auditoría de coherencia de mensaje y wireframe aprobado mapeado a un solo objetivo de conversión.",
        metric: "",
      },
      {
        title: "Diseño y Copy",
        desc: "Diseño mobile-first de alta fidelidad y copy de conversión revisados antes de escribir una línea de código.",
        metric: "",
      },
      {
        title: "Build y Lanzamiento",
        desc: "Desarrollo, tracking GA4 y de formularios, QA multi-dispositivo y lanzamiento con línea base de conversión capturada.",
        metric: "",
      },
      {
        title: "Probar y Optimizar",
        desc: "Tests A/B en titulares, layout y longitud de formulario, variaciones ganadoras solo tras significancia estadística.",
        metric: "",
      },
    ],
    capabilityBodies: {
      strategyDesign:
        "Cada landing page empieza con el brief de campaña, no con un mood board. Los wireframes mapean la coherencia de mensaje entre el anuncio y el titular de la página, la ubicación de prueba social donde aparece la duda, y una sola acción principal visible en móvil sin hacer scroll. La mayoría de agencias dibuja un layout bonito y espera que convierta. Nosotros dibujamos primero la ruta de conversión: quién hizo clic, qué esperaba ver y qué tiene que pasar antes de enviar o llamar.",
      buildCopy:
        "Desarrollo y copy corren en paralelo porque el titular y los campos del formulario son palancas de conversión, no decoración. El copy califica al visitante en la primera línea, responde la objeción con la que llegó y reduce el formulario a los campos mínimos que tu equipo de ventas realmente necesita. Las páginas salen mobile-first con Core Web Vitals en mente, una carga lenta mata la conversión antes de que lean tu titular.",
      trackingTesting:
        "El lanzamiento es la línea de salida, no la meta. Cada página sale con eventos GA4, tracking de formularios y llamadas, y un flujo de agradecimiento que confirma la atribución. Luego ejecutamos tests A/B estructurados en titulares, layout y longitud de formulario, esperando significancia estadística antes de declarar un ganador. El dashboard muestra tasa de conversión y costo por lead, no pageviews.",
    },
    cta: {
      headline: "¿Listo para darle a tu tráfico pagado una página hecha para convertir?",
      subtitle:
        "Construyamos una landing page con coherencia de mensaje, carga móvil rápida|y un plan de testing que siga mejorando el número después del lanzamiento.",
      ctaLabel: "Ver Precios de Landing Pages",
    },
    inlineCtaLabel: "Revisar Mi Página",
    inlineCtaSubtitle:
      "Revisaremos tu página actual frente al anuncio que sirve, coherencia de mensaje, UX móvil, fricción del formulario y brechas de tracking, y delinearemos las correcciones de mayor impacto.",
  },
};
