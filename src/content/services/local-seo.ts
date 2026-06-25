import type { Locale } from "@/i18n/routing";
import type { ServicePhase } from "@/components/ui/ServicePhaseList";
import type { FAQItem } from "@/components/sections/FAQSection";

export type LocalSeoContent = {
  phasesTitle: string;
  phasesSubtitle: string;
  phases: ServicePhase[];
  resultsTitle: string;
  resultsSubtitle: string;
  results: { metric: string; label: string }[];
  ctaHeadline: string;
  ctaSubtitle: string;
  ctaLabel: string;
  faqs: FAQItem[];
};

export const localSeoContent: Record<Locale, LocalSeoContent> = {
  en: {
    phasesTitle: "How we grow your local visibility",
    phasesSubtitle: "A clear process from audit to rankings in the map pack and local search.",
    phases: [
      {
        title: "Local Audit and Competitor Review",
        desc: "We map your Google Business Profile, citations, reviews, and local rankings against the businesses actually winning calls in your market.",
        metric: "Full local audit delivered in week 1",
      },
      {
        title: "Google Business Profile Optimization",
        desc: "Categories, services, photos, posts, and Q&A tuned for the searches that book jobs in your area.",
        metric: "Average 3.2x increase in GBP impressions in 90 days",
      },
      {
        title: "Citation and NAP Cleanup",
        desc: "We fix inconsistent name, address, and phone data across directories so Google trusts your location signals.",
        metric: "45+ directories audited per client",
      },
      {
        title: "Location Content and On-Page SEO",
        desc: "Service area pages and local landing pages with real market context, not city-name swaps.",
        metric: "Pages built to pass Google's local quality checks",
      },
      {
        title: "Review Strategy and Reporting",
        desc: "A steady review generation process plus monthly reporting on map pack rankings, calls, and direction requests.",
        metric: "Weekly rank tracking for priority local keywords",
      },
    ],
    resultsTitle: "Local SEO results we track",
    resultsSubtitle: "Numbers from recent local client work, not industry averages.",
    results: [
      { metric: "+340%", label: "new patient bookings · dental group, 6 mo" },
      { metric: "+280%", label: "GBP direction requests · home services" },
      { metric: "Top 3", label: "map pack placements · avg. by month 4" },
    ],
    ctaHeadline: "Ready to show up when locals search?",
    ctaSubtitle: "Get a free local visibility audit for your market.|We will show you where competitors are beating you and what to fix first.",
    ctaLabel: "Get Your Local SEO Audit",
    faqs: [],
  },
  es: {
    phasesTitle: "Cómo hacemos crecer tu visibilidad local",
    phasesSubtitle: "Un proceso claro desde la auditoría hasta posiciones en el mapa y búsqueda local.",
    phases: [
      {
        title: "Auditoría Local y Análisis de Competencia",
        desc: "Mapeamos tu Perfil de Google Business, citas, reseñas y rankings locales contra los negocios que realmente ganan llamadas en tu mercado.",
        metric: "Auditoría local completa en la semana 1",
      },
      {
        title: "Optimización del Perfil de Google Business",
        desc: "Categorías, servicios, fotos, publicaciones y preguntas frecuentes ajustadas para las búsquedas que generan trabajos en tu zona.",
        metric: "Promedio 3.2x más impresiones en GBP en 90 días",
      },
      {
        title: "Limpieza de Citas y NAP",
        desc: "Corregimos inconsistencias de nombre, dirección y teléfono en directorios para que Google confíe en tus señales de ubicación.",
        metric: "45+ directorios auditados por cliente",
      },
      {
        title: "Contenido Local y SEO On-Page",
        desc: "Páginas de área de servicio con contexto real del mercado, no intercambios de nombre de ciudad.",
        metric: "Páginas construidas para pasar los controles de calidad local de Google",
      },
      {
        title: "Estrategia de Reseñas e Informes",
        desc: "Proceso constante de generación de reseñas más informes mensuales de rankings en mapa, llamadas y solicitudes de direcciones.",
        metric: "Seguimiento semanal de rankings para palabras clave locales prioritarias",
      },
    ],
    resultsTitle: "Resultados de SEO local que medimos",
    resultsSubtitle: "Números de clientes locales recientes, no promedios de la industria.",
    results: [
      { metric: "+340%", label: "reservas de pacientes · grupo dental, 6 meses" },
      { metric: "+280%", label: "solicitudes de direcciones GBP · servicios del hogar" },
      { metric: "Top 3", label: "posiciones en mapa · promedio al mes 4" },
    ],
    ctaHeadline: "¿Listo para aparecer cuando buscan en tu zona?",
    ctaSubtitle: "Obtén una auditoría gratuita de visibilidad local para tu mercado.|Te mostraremos dónde te ganan los competidores y qué corregir primero.",
    ctaLabel: "Obtén Tu Auditoría de SEO Local",
    faqs: [],
  },
};
