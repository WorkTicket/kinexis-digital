import type { Locale } from "@/i18n/routing";
import type { GenericRichServiceContent } from "./generic-rich-service-types";

export const marketingAuditsContent: Record<Locale, GenericRichServiceContent> = {
  en: {
    hero: { ctaLabel: "Request an Audit" },
    processSection: {
      title: "Engagement timeline",
      subtitle: "From data validation to a prioritized action plan.",
    },
    processIntro:
      "An audit only helps if the numbers can be trusted first. Our cycle runs from tracking validation through channel performance review, funnel mapping, budget analysis, and a ranked action plan. Each finding tied to revenue impact, not opinion.",
    phases: [
      { title: "Validate Tracking", desc: "GA4, conversion events, and call tracking checked end to end before anything else gets judged.", metric: "" },
      { title: "Channel & Funnel Review", desc: "Every active channel scored on cost per qualified lead, with drop-off mapped stage by stage.", metric: "" },
      { title: "Budget & Competitive Context", desc: "Spend allocation reviewed against return, with visibility compared to key competitors.", metric: "" },
      { title: "Deliver Action Plan", desc: "Ranked roadmap of fixes and opportunities, walked through live with your team.", metric: "" },
    ],
    capabilityBodies: {
      trackingAnalytics:
        "If the tracking is wrong, every conclusion after it is a guess dressed up as data. We audit GA4 configuration, conversion event definitions, form and call tracking, and CRM integration before reviewing a single channel. Page views counted as leads, missing phone call attribution, and double-counted conversions get flagged first. You cannot fix wasted spend until you know which numbers to trust.",
      channelConversion:
        "Channels get judged on cost per qualified lead and pipeline contribution, not clicks, impressions, or vanity traffic. We pull data from ad platforms, analytics, and your CRM to compare Google, Meta, organic, email, and whatever else is active. Funnel drop-off gets mapped from first touch to closed deal so the leak shows up even when top-of-funnel metrics look fine. The output names what to cut, what to fix, and what to scale.",
      findingsRoadmap:
        "The audit ends with a ranked action plan, not a 40-page PDF nobody reads. Every finding gets ordered by estimated revenue impact and effort required, tracking fixes before new channel spend, funnel leaks before more traffic. We walk through the plan live so your team leaves knowing what to do Monday morning. Execution is optional; the diagnosis stands on its own.",
    },
    cta: {
      headline: "Ready to find what's actually holding growth back?",
      subtitle: "Let's validate your data, trace the full funnel,|and deliver a prioritized plan tied to revenue, not gut feel.",
      ctaLabel: "See Audit Pricing",
    },
    inlineCtaLabel: "Scope My Audit",
    inlineCtaSubtitle:
      "We will review your current tracking setup and active channels, data trust, biggest unknowns, and audit scope. Then recommend the right depth for your situation.",
  },
  es: {
    hero: { ctaLabel: "Solicitar una Auditoría" },
    processSection: {
      title: "Cronograma del proyecto",
      subtitle: "De validación de datos a un plan de acción priorizado.",
    },
    processIntro:
      "Una auditoría solo ayuda si los números se pueden confiar primero. Nuestro ciclo va de validación de tracking a revisión de rendimiento por canal, mapeo de embudo, análisis de presupuesto y plan de acción ordenado, cada hallazgo ligado a impacto en ingresos, no a opinión.",
    phases: [
      { title: "Validar Tracking", desc: "GA4, eventos de conversión y tracking de llamadas revisados de punta a punta antes de juzgar cualquier canal.", metric: "" },
      { title: "Revisión de Canales y Embudo", desc: "Cada canal activo puntuado por costo por lead calificado, con caída mapeada etapa por etapa.", metric: "" },
      { title: "Presupuesto y Contexto Competitivo", desc: "Asignación de gasto revisada contra retorno, con visibilidad comparada a competidores clave.", metric: "" },
      { title: "Entregar Plan de Acción", desc: "Roadmap ordenado de arreglos y oportunidades, repasado en vivo con tu equipo.", metric: "" },
    ],
    capabilityBodies: {
      trackingAnalytics:
        "Si el tracking está mal, cada conclusión posterior es una suposición disfrazada de dato. Auditamos la configuración de GA4, definiciones de eventos de conversión, tracking de formularios y llamadas, e integración CRM antes de revisar un solo canal. Vistas de página contadas como leads, atribución de llamadas faltante y conversiones duplicadas se marcan primero. No puedes arreglar gasto desperdiciado hasta saber en qué números confiar.",
      channelConversion:
        "Los canales se juzgan por costo por lead calificado y contribución al pipeline, no por clics, impresiones o tráfico vanidad. Extraemos datos de plataformas de anuncios, analítica y tu CRM para comparar Google, Meta, orgánico, email y lo que esté activo. La caída del embudo se mapea del primer contacto al deal cerrado para que la fuga aparezca aunque las métricas de topo se vean bien. El resultado nombra qué cortar, qué arreglar y qué escalar.",
      findingsRoadmap:
        "La auditoría termina con un plan de acción ordenado, no un PDF de 40 páginas que nadie lee. Cada hallazgo se ordena por impacto estimado en ingresos y esfuerzo requerido, arreglos de tracking antes de gasto en canales nuevos, fugas del embudo antes de más tráfico. Repasamos el plan en vivo para que tu equipo salga sabiendo qué hacer el lunes. La ejecución es opcional; el diagnóstico se sostiene solo.",
    },
    cta: {
      headline: "¿Listo para encontrar qué realmente frena el crecimiento?",
      subtitle: "Validemos tus datos, tracemos el embudo completo|y entreguemos un plan priorizado ligado a ingresos, no a intuición.",
      ctaLabel: "Ver Precios de Auditoría",
    },
    inlineCtaLabel: "Definir Mi Auditoría",
    inlineCtaSubtitle:
      "Revisaremos tu setup actual de tracking y canales activos, confianza en datos, mayores incógnitas y alcance de auditoría, y recomendaremos la profundidad adecuada para tu situación.",
  },
};
