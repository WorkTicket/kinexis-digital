import type { Locale } from "@/i18n/routing";
import type { GenericRichServiceContent } from "./generic-rich-service-types";

export const websiteSpeedContent: Record<Locale, GenericRichServiceContent> = {
  en: {
    hero: { ctaLabel: "Start Speed Optimization" },
    processSection: {
      title: "Engagement timeline",
      subtitle: "From baseline audit to a measurably faster site.",
    },
    processIntro:
      "Speed work needs measurement before and after, not a caching plugin and hope. Our cycle runs from lab and field data audit through image and script optimization, caching and CDN setup, Core Web Vitals tuning, and documented re-measurement. Each phase prioritized by actual impact on load time.",
    phases: [
      { title: "Audit & Baseline", desc: "Lighthouse, Core Web Vitals field data, and a prioritized fix list ranked by impact.", metric: "" },
      { title: "Assets & Delivery", desc: "Image compression, lazy loading, CDN, and caching configured for the heaviest wins first.", metric: "" },
      { title: "Code & Server", desc: "Render-blocking scripts deferred, unused code removed, server response tuned.", metric: "" },
      { title: "Validate & Report", desc: "Before-and-after Lighthouse and CWV scores documented so the gain is provable.", metric: "" },
    ],
    capabilityBodies: {
      performanceAudit:
        "We start with your real Core Web Vitals field data, not a generic checklist. Lab scores from Lighthouse and PageSpeed get compared to what actual visitors experience on mobile, often worse than the lab suggests. The audit ranks fixes by impact: a 2MB hero image matters more than micro-optimizing a footer script. You get a prioritized list with estimated gain per item, so budget goes to what moves the needle.",
      coreOptimization:
        "Images are usually the heaviest fix. We compress, resize, convert to next-gen formats, and lazy-load below the fold before touching deeper code. Render-blocking CSS and JavaScript get deferred or removed, third-party scripts get audited for what actually earns their weight, and caching plus a CDN handle repeat visits. Each change gets tested so nothing breaks checkout, forms, or tracking.",
      validationReporting:
        "A caching plugin installed without measurement proves nothing. We document Lighthouse and Core Web Vitals scores before work starts and again after each major phase, LCP, CLS, and INP on mobile and desktop. The final report shows median load time change, not just a green badge. If a fix does not move the number, we do not call it done.",
    },
    cta: {
      headline: "Ready to recover the traffic a slow site is costing you?",
      subtitle: "Let's audit against real Core Web Vitals data, fix the actual bottlenecks,|and prove the improvement with before-and-after scores.",
      ctaLabel: "See Speed Optimization Pricing",
    },
    inlineCtaLabel: "Run a Speed Review",
    inlineCtaSubtitle:
      "We will review your current Lighthouse and Core Web Vitals scores, biggest bottlenecks, image weight, render-blocking scripts, and outline the highest-impact fixes.",
  },
  es: {
    hero: { ctaLabel: "Inicia Optimización de Velocidad" },
    processSection: {
      title: "Cronograma del proyecto",
      subtitle: "De auditoría base a un sitio mediblemente más rápido.",
    },
    processIntro:
      "El trabajo de velocidad necesita medición antes y después, no un plugin de caché y esperanza. Nuestro ciclo va de auditoría con datos de laboratorio y campo a optimización de imágenes y scripts, setup de caché y CDN, ajuste de Core Web Vitals y re-medición documentada, cada fase priorizada por impacto real en tiempo de carga.",
    phases: [
      { title: "Auditoría y Línea Base", desc: "Lighthouse, datos de campo de Core Web Vitals y lista priorizada de arreglos por impacto.", metric: "" },
      { title: "Activos y Entrega", desc: "Compresión de imágenes, lazy loading, CDN y caché configurados para las mayores ganancias primero.", metric: "" },
      { title: "Código y Servidor", desc: "Scripts que bloquean render diferidos, código sin uso eliminado, respuesta del servidor ajustada.", metric: "" },
      { title: "Validar y Reportar", desc: "Puntuaciones Lighthouse y CWV antes/después documentadas para que la mejora sea demostrable.", metric: "" },
    ],
    capabilityBodies: {
      performanceAudit:
        "Empezamos con tus datos reales de Core Web Vitals en campo, no con una checklist genérica. Las puntuaciones de laboratorio de Lighthouse y PageSpeed se comparan con lo que los visitantes reales experimentan en móvil. A menudo peor de lo que sugiere el laboratorio. La auditoría prioriza arreglos por impacto: una imagen hero de 2MB importa más que micro-optimizar un script del footer. Recibes una lista priorizada con ganancia estimada por ítem, para que el presupuesto vaya a lo que mueve la aguja.",
      coreOptimization:
        "Las imágenes suelen ser el arreglo más pesado. Comprimimos, redimensionamos, convertimos a formatos next-gen y aplicamos lazy loading bajo el fold antes de tocar código más profundo. CSS y JavaScript que bloquean render se difieren o eliminan, scripts de terceros se auditan por lo que realmente valen su peso, y caché más CDN manejan visitas repetidas. Cada cambio se prueba para no romper checkout, formularios o tracking.",
      validationReporting:
        "Un plugin de caché instalado sin medición no prueba nada. Documentamos puntuaciones Lighthouse y Core Web Vitals antes de empezar y tras cada fase mayor, LCP, CLS e INP en móvil y escritorio. El informe final muestra el cambio en tiempo de carga mediano, no solo una insignia verde. Si un arreglo no mueve el número, no lo damos por hecho.",
    },
    cta: {
      headline: "¿Listo para recuperar el tráfico que un sitio lento te está costando?",
      subtitle: "Auditemos contra datos reales de Core Web Vitals, arreglemos los cuellos de botella reales|y demostremos la mejora con puntuaciones antes y después.",
      ctaLabel: "Ver Precios de Optimización de Velocidad",
    },
    inlineCtaLabel: "Revisar Mi Velocidad",
    inlineCtaSubtitle:
      "Revisaremos tus puntuaciones actuales de Lighthouse y Core Web Vitals, mayores cuellos de botella, peso de imágenes, scripts que bloquean render, y delinearemos los arreglos de mayor impacto.",
  },
};
