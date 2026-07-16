import type { Locale } from "@/i18n/routing";
import type { ServicePhase } from "@/components/ui/ServicePhaseList";
import type { FAQItem } from "@/components/sections/FAQSection";

export type LocalSeoContent = {
  phasesTitle: string;
  phasesSubtitle: string;
  processIntro: string;
  phases: ServicePhase[];
  capabilityBodies: {
    localGbp: string;
    localCitations: string;
    localReviews: string;
  };
  resultsTitle: string;
  resultsSubtitle: string;
  results: { metric: string; label: string }[];
  heroCtaLabel: string;
  ctaHeadline: string;
  ctaSubtitle: string;
  ctaLabel: string;
  inlineCtaLabel: string;
  inlineCtaSubtitle: string;
  faqs: FAQItem[];
};

export const localSeoContent: Record<Locale, LocalSeoContent> = {
  en: {
    phasesTitle: "How we grow your local visibility",
    phasesSubtitle: "Four phases from audit to map pack rankings. Each tied to calls and booked jobs.",
    processIntro:
      "Local SEO is not a citation dump and a prayer. We fix the profile, citations, and reviews that move map pack rankings first. Then build location content that ranks for the searches that book same-day jobs.",
    phases: [
      {
        title: "Local Audit and Competitor Review",
        desc: "We map your Google Business Profile, citations, reviews, and local rankings against the businesses actually winning calls in your market.",
        metric: "",
      },
      {
        title: "Google Business Profile Optimization",
        desc: "Categories, services, photos, posts, and Q&A tuned for the searches that book jobs in your area.",
        metric: "",
      },
      {
        title: "Citation and NAP Cleanup",
        desc: "We fix inconsistent name, address, and phone data across directories so Google trusts your location signals.",
        metric: "",
      },
      {
        title: "Location Content and Reviews",
        desc: "Service area pages with real market context plus a review workflow that keeps new feedback coming in without breaking platform rules.",
        metric: "",
      },
    ],
    capabilityBodies: {
      localGbp:
        "Your Google Business Profile is the front door for local search. Most businesses set it up once and forget it. We optimize categories, services, photos, and posts for the exact queries that book jobs. Then track map pack movement weekly so optimization stays tied to calls, not impressions.",
      localCitations:
        "When your address shows up three different ways across directories, Google stops trusting your location. We audit 45+ listings, fix NAP inconsistencies, and build new citations on directories that actually matter in your trade, not bulk submissions that get flagged.",
      localReviews:
        "Review velocity affects map pack rankings as much as citations. We build a steady generation process, response templates, and reporting that ties new reviews to ranking movement, so you know which locations and service lines are gaining ground.",
    },
    resultsTitle: "Local SEO results we track",
    resultsSubtitle: "Numbers from recent local client work, not industry averages.",
    results: [
      { metric: "327%", label: "emergency calls · Plumbing Co., 8 mo" },
      { metric: "+2,371%", label: "GBP interactions · same client" },
      { metric: "Top 3", label: "local pack · 48 of 60 keywords" },
    ],
    heroCtaLabel: "Get Your Local SEO Plan",
    ctaHeadline: "Ready to show up when locals search?",
    ctaSubtitle: "Get a free local visibility audit for your market.|We will show you where competitors are beating you and what to fix first.",
    ctaLabel: "See Local SEO Pricing",
    inlineCtaLabel: "Audit My Google Profile",
    inlineCtaSubtitle:
      "We will review your GBP, citations, and map pack rankings. Then outline the fixes that move the needle fastest in your market.",
    faqs: [],
  },
  es: {
    phasesTitle: "Cómo hacemos crecer tu visibilidad local",
    phasesSubtitle: "Cuatro fases desde auditoría hasta rankings en map pack, cada una ligada a llamadas y trabajos reservados.",
    processIntro:
      "El SEO local no es un volcado de citaciones y esperar. Corregimos primero el perfil, citaciones y reseñas que mueven rankings en map pack, luego construimos contenido local que posiciona para las búsquedas que reservan trabajos el mismo día.",
    phases: [
      {
        title: "Auditoría Local y Análisis de Competencia",
        desc: "Mapeamos tu Perfil de Google Business, citaciones, reseñas y rankings locales contra los negocios que realmente ganan llamadas en tu mercado.",
        metric: "",
      },
      {
        title: "Optimización del Perfil de Google Business",
        desc: "Categorías, servicios, fotos, publicaciones y preguntas frecuentes ajustadas para las búsquedas que generan trabajos en tu zona.",
        metric: "",
      },
      {
        title: "Limpieza de Citaciones y NAP",
        desc: "Corregimos inconsistencias de nombre, dirección y teléfono en directorios para que Google confíe en tus señales de ubicación.",
        metric: "",
      },
      {
        title: "Contenido Local y Reseñas",
        desc: "Páginas de área de servicio con contexto real de mercado más un flujo de reseñas que mantiene feedback nuevo sin romper reglas de plataforma.",
        metric: "",
      },
    ],
    capabilityBodies: {
      localGbp:
        "Tu Perfil de Google Business es la puerta de entrada para búsqueda local. La mayoría lo configura una vez y lo olvida. Optimizamos categorías, servicios, fotos y publicaciones para las consultas exactas que reservan trabajos, luego rastreamos movimiento en map pack semanalmente para que la optimización se ligue a llamadas, no impresiones.",
      localCitations:
        "Cuando tu dirección aparece de tres formas distintas en directorios, Google deja de confiar en tu ubicación. Auditamos más de 45 listados, corregimos inconsistencias NAP y construimos citaciones nuevas en directorios que importan en tu rubro, no envíos masivos que se marcan como spam.",
      localReviews:
        "La velocidad de reseñas afecta rankings en map pack tanto como las citaciones. Construimos un proceso constante de generación, plantillas de respuesta e informes que vinculan reseñas nuevas a movimiento de posiciones, para que sepas qué ubicaciones y líneas de servicio ganan terreno.",
    },
    resultsTitle: "Resultados de SEO local que medimos",
    resultsSubtitle: "Números de clientes locales recientes, no promedios de la industria.",
    results: [
      { metric: "327%", label: "llamadas de emergencia · Plumbing Co., 8 meses" },
      { metric: "+2,371%", label: "interacciones GBP · mismo cliente" },
      { metric: "Top 3", label: "pack local · 48 de 60 keywords" },
    ],
    heroCtaLabel: "Obtén Tu Plan de SEO Local",
    ctaHeadline: "¿Listo para aparecer cuando buscan en tu zona?",
    ctaSubtitle: "Obtén una auditoría gratuita de visibilidad local para tu mercado.|Te mostraremos dónde te ganan los competidores y qué corregir primero.",
    ctaLabel: "Ver Precios SEO Local",
    inlineCtaLabel: "Auditar Mi Perfil de Google",
    inlineCtaSubtitle:
      "Revisaremos tu GBP, citaciones y rankings en map pack, luego delinearemos las correcciones que mueven la aguja más rápido en tu mercado.",
    faqs: [],
  },
};
