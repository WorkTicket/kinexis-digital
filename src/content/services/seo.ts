import type { Locale } from "@/i18n/routing";
import type { ServicePhase } from "@/components/ui/ServicePhaseList";
import type { FAQItem } from "@/components/sections/FAQSection";

export type SeoKeywordRow = {
  keyword: string;
  type: string;
};

export type SeoEcosystemNode = {
  label: string;
  desc: string;
  viz: "crawl" | "content" | "links" | "ux";
};

export type SeoDiagramNodeLabel = {
  id: string;
  label: string;
};

export type SeoDataStory = {
  label: string;
  headline: string;
  description: string;
  metric: string;
  caseStudy?: { result: string; client: string };
};

export type SerpFeature = {
  label: string;
  desc: string;
  share: string;
};

export type SeoContent = {
  heroLabel: string;
  heroHeadlineLine1: string;
  heroHeadlineLine2: string;
  heroSubtitle: string;
  heroCtaLabel: string;
  keywordMatrixTitle: string;
  keywordMatrixSubtitle: string;
  keywordColKeyword: string;
  keywordColVolume: string;
  keywordColDiff: string;
  keywordColType: string;
  keywordMatrix: SeoKeywordRow[];
  ecosystemTitle: string;
  ecosystemSubtitle: string;
  ecosystemLayerPrefix: string;
  ecosystemNodes: SeoEcosystemNode[];
  rankingsTitle: string;
  rankingsSubtitle: string;
  dataStories: SeoDataStory[];
  phasesTitle: string;
  phasesSubtitle: string;
  phases: ServicePhase[];
  serpTitle: string;
  serpSubtitle: string;
  serpFeatures: SerpFeature[];
  ctaHeadline: string;
  ctaSubtitle: string;
  ctaLabel: string;
  diagramNodes: SeoDiagramNodeLabel[];
  faqs: FAQItem[];
};

export const seoContent: Record<Locale, SeoContent> = {
  en: {
    heroLabel: "Search That Wins",
    heroHeadlineLine1: "Own the pages",
    heroHeadlineLine2: "rivals can't reach.",
    heroSubtitle:
      "SEO built to grow with your business.|Solid technical work, strong content, and links that actually move the needle.",
    heroCtaLabel: "Get Your SEO Roadmap",
    keywordMatrixTitle: "Keyword Opportunity Matrix",
    keywordMatrixSubtitle:
      "We prioritize keywords by business impact. High volume + low competition = immediate wins.|Identify gaps your competitors are leaving open.",
    keywordColKeyword: "Keyword",
    keywordColVolume: "Volume",
    keywordColDiff: "Diff.",
    keywordColType: "Type",
    keywordMatrix: [
      { keyword: "local seo services", type: "Commercial" },
      { keyword: "seo for landscapers", type: "Local" },
      { keyword: "seo agency pricing", type: "Commercial" },
      { keyword: "google business optimization", type: "Local" },
      { keyword: "technical seo audit", type: "Informational" },
      { keyword: "content writing seo", type: "Commercial" },
      { keyword: "ecommerce seo strategy", type: "Commercial" },
      { keyword: "voice search optimization", type: "Informational" },
    ],
    ecosystemTitle: "The Search Ecosystem",
    ecosystemSubtitle:
      "Rankings are a byproduct of four interconnected systems working together.|Neglect any one and performance suffers.",
    ecosystemLayerPrefix: "Layer",
    ecosystemNodes: [
      { label: "Technical Foundation", desc: "Site speed, mobile, crawlability", viz: "crawl" },
      { label: "Content Authority", desc: "Search intent matching, topical depth", viz: "content" },
      { label: "Link Equity", desc: "Authority signals, trusted citations", viz: "links" },
      { label: "User Experience", desc: "Engagement, conversion signals", viz: "ux" },
    ],
    rankingsTitle: "Rankings are assets. We build them to last.",
    rankingsSubtitle:
      "Unlike paid ads that stop when you cut the budget, SEO keeps paying off.|Every piece of content, backlink, and technical fix keeps working months and years after it's live.",
    dataStories: [
      {
        label: "Organic Traffic",
        headline: "Steady growth, not spikes",
        description:
          "Landscaping Company case study: organic traffic grew from 320 to 4,700 visits per month over 8 months after a site rebuild and local SEO campaign.",
        metric: "+340%",
      },
      {
        label: "Keyword Rankings",
        headline: "Positions that stick",
        description: "Average client moves 27 positions across priority keywords within the first 6 months.",
        metric: "27 positions gained",
      },
      {
        label: "Lead Conversion",
        headline: "Traffic that converts",
        description:
          "Better-intent traffic converts at higher rates. Landscaping client: lead conversion went from 1.2% to 8.4% after the rebuild.",
        metric: "+180%",
      },
    ],
    phasesTitle: "How we grow search traffic",
    phasesSubtitle:
      "A clear process that combines technical fixes,|strong content, and smart link building.",
    phases: [
      {
        title: "Technical Foundation",
        desc: "Full site crawl identifying indexing gaps, speed bottlenecks, mobile issues, and schema opportunities. Every issue prioritized by revenue impact.",
        metric: "Full technical audit delivered in week 1",
      },
      {
        title: "Keyword Research",
        desc: "We map what your buyers actually search for, find content gaps your competitors miss, and prioritize terms most likely to convert.",
        metric: "Avg. 340 keywords mapped per client",
      },
      {
        title: "Content That Ranks",
        desc: "Every page tuned for relevance and authority. New content fills gaps in your topic coverage, matched to what searchers want at each stage.",
        metric: "Avg. 4.2x traffic increase per article",
      },
      {
        title: "Building Authority",
        desc: "Links earned through real relationships, digital PR, and content worth citing.",
        metric: "40+ authority domains per quarter",
      },
      {
        title: "Ongoing Optimization",
        desc: "Weekly rank tracking, monthly reports, and quarterly strategy reviews. What we learn goes right back into the work.",
        metric: "Weekly rank tracking and monthly reporting",
      },
    ],
    serpTitle: "Search results keep changing.",
    serpSubtitle:
      "AI overviews, featured snippets, local packs, video carousels.|Winning search is no longer just about position one. You need visibility across every SERP feature.",
    serpFeatures: [
      {
        label: "Featured Snippets",
        desc: "Position 0. The top answer pulled directly into search results.",
        share: "12.3% of searches",
      },
      {
        label: "Local 3-Pack",
        desc: "The map + listing block for local-intent searches. Critical for service businesses.",
        share: "30% of mobile searches",
      },
      {
        label: "AI Overviews",
        desc: "Google's AI-generated answers. Changes the game for informational queries.",
        share: "Growing rapidly",
      },
    ],
    ctaHeadline: "Ready to own search?",
    ctaSubtitle:
      "Get a full SEO opportunity analysis.|We'll identify your highest-value keywords, technical gaps, and quick wins.",
    ctaLabel: "Claim Your SEO Roadmap",
    diagramNodes: [
      { id: "technical", label: "Technical SEO" },
      { id: "ux", label: "User Experience" },
      { id: "content", label: "Content" },
      { id: "links", label: "Links" },
      { id: "rankings", label: "Rankings" },
      { id: "revenue", label: "Revenue" },
    ],
    faqs: [
      { question: "How long does SEO take to show results?", answer: "Meaningful ranking movement typically begins within 3–4 months. Revenue impact becomes clear around months 6–12. SEO compounds over time. Every fix and piece of content keeps working long after it's published." },
      { question: "What does your SEO service include?", answer: "Every engagement includes a full technical audit, keyword research, on-page optimization, link building, content strategy, and monthly reporting. The mix shifts by priority based on what will move the needle fastest for your business." },
      { question: "Do you work with local businesses?", answer: "Yes. Local SEO is one of our core strengths. We optimize Google Business Profiles, build local citations, and produce location-specific content to help service businesses dominate their market area." },
      { question: "How do you report on SEO performance?", answer: "Weekly rank tracking, monthly dashboards covering traffic, leads, and conversions, and quarterly strategy reviews. We tie every metric back to pipeline and revenue, not vanity numbers." },
      { question: "Will SEO still work as AI search evolves?", answer: "Yes. Strong technical SEO, authoritative content, and quality links remain the foundation of visibility in AI-powered search results. We stay ahead of how results are displayed (featured snippets, AI Overviews, local packs) and adapt our strategy accordingly." },
    ],
  },
  es: {
    heroLabel: "SEO que Funciona",
    heroHeadlineLine1: "Domina las páginas",
    heroHeadlineLine2: "que nadie toca.",
    heroSubtitle:
      "SEO pensado para crecer con tu negocio.|Trabajo técnico sólido, contenido de calidad y enlaces que de verdad marcan la diferencia.",
    heroCtaLabel: "Obtén Tu Hoja de Ruta SEO",
    keywordMatrixTitle: "Matriz de Oportunidad de Palabras Clave",
    keywordMatrixSubtitle:
      "Priorizamos palabras clave por impacto en el negocio. Alto volumen + baja competencia = victorias inmediatas.|Identifica brechas que tus competidores están dejando abiertas.",
    keywordColKeyword: "Palabra Clave",
    keywordColVolume: "Volumen",
    keywordColDiff: "Dif.",
    keywordColType: "Tipo",
    keywordMatrix: [
      { keyword: "local seo services", type: "Comercial" },
      { keyword: "seo for landscapers", type: "Local" },
      { keyword: "seo agency pricing", type: "Comercial" },
      { keyword: "google business optimization", type: "Local" },
      { keyword: "technical seo audit", type: "Informativo" },
      { keyword: "content writing seo", type: "Comercial" },
      { keyword: "ecommerce seo strategy", type: "Comercial" },
      { keyword: "voice search optimization", type: "Informativo" },
    ],
    ecosystemTitle: "El Ecosistema de Búsqueda",
    ecosystemSubtitle:
      "Los rankings son un subproducto de cuatro sistemas interconectados que trabajan juntos.|Descuidar cualquiera de ellos afecta el rendimiento.",
    ecosystemLayerPrefix: "Capa",
    ecosystemNodes: [
      { label: "Fundamento Técnico", desc: "Velocidad del sitio, móvil, rastreabilidad", viz: "crawl" },
      { label: "Autoridad de Contenido", desc: "Coincidencia con intención de búsqueda, profundidad temática", viz: "content" },
      { label: "Equidad de Enlaces", desc: "Señales de autoridad, citas de confianza", viz: "links" },
      { label: "Experiencia de Usuario", desc: "Compromiso, señales de conversión", viz: "ux" },
    ],
    rankingsTitle: "Los rankings son activos. Los construimos para durar.",
    rankingsSubtitle:
      "A diferencia de los anuncios pagados que paran al cortar el presupuesto, el SEO sigue dando resultados.|Cada contenido, backlink y mejora técnica sigue trabajando meses y años después de publicarse.",
    dataStories: [
      {
        label: "Tráfico Orgánico",
        headline: "Crecimiento constante, no picos",
        description:
          "Caso Landscaping Company: el tráfico orgánico pasó de 320 a 4.700 visitas al mes en 8 meses tras rebuild y SEO local.",
        metric: "+340%",
      },
      {
        label: "Posiciones de Palabras Clave",
        headline: "Posiciones que se mantienen",
        description: "El cliente promedio gana 27 posiciones en palabras clave prioritarias en los primeros 6 meses.",
        metric: "27 posiciones ganadas",
      },
      {
        label: "Conversión de Leads",
        headline: "Tráfico que convierte",
        description:
          "Tráfico con mejor intención convierte más. Cliente Landscaping: conversión de leads de 1,2% a 8,4% tras el rebuild.",
        metric: "+180%",
      },
    ],
    phasesTitle: "Cómo hacemos crecer tu tráfico orgánico",
    phasesSubtitle:
      "Un proceso claro que combina correcciones técnicas,|contenido sólido y construcción inteligente de enlaces.",
    phases: [
      {
        title: "Fundamento Técnico",
        desc: "Rastreo completo del sitio identificando brechas de indexación, cuellos de botella de velocidad, problemas móviles y oportunidades de schema. Cada problema priorizado por impacto en ingresos.",
        metric: "Auditoría técnica completa en semana 1",
      },
      {
        title: "Investigación de Palabras Clave",
        desc: "Mapeamos lo que tus compradores buscan de verdad, encontramos brechas que tus competidores dejan pasar y priorizamos los términos con más probabilidad de convertir.",
        metric: "Prom. 340 palabras clave mapeadas por cliente",
      },
      {
        title: "Contenido que Posiciona",
        desc: "Cada página afinada para relevancia y autoridad. Nuevo contenido que cubre huecos temáticos, alineado con lo que buscan tus visitantes en cada etapa.",
        metric: "Prom. 4.2x aumento de tráfico por artículo",
      },
      {
        title: "Construcción de Autoridad",
        desc: "Enlaces ganados con relaciones reales, relaciones públicas digitales y contenido que merece ser citado.",
        metric: "40+ dominios de autoridad por trimestre",
      },
      {
        title: "Optimización Continua",
        desc: "Seguimiento semanal de rankings, informes mensuales y revisiones trimestrales de estrategia. Lo que aprendemos vuelve directo al trabajo.",
        metric: "Seguimiento semanal e informes mensuales",
      },
    ],
    serpTitle: "Los resultados de búsqueda siguen cambiando.",
    serpSubtitle:
      "Resúmenes de IA, fragmentos destacados, paquetes locales, carruseles de video.|Ganar en búsqueda ya no es solo la posición uno. Necesitas visibilidad en cada función del SERP.",
    serpFeatures: [
      {
        label: "Fragmentos Destacados",
        desc: "Posición 0. La respuesta principal extraída directamente en los resultados de búsqueda.",
        share: "12.3% de búsquedas",
      },
      {
        label: "Paquete Local de 3",
        desc: "El bloque de mapa + listado para búsquedas de intención local. Crítico para negocios de servicios.",
        share: "30% de búsquedas móviles",
      },
      {
        label: "Resúmenes de IA",
        desc: "Respuestas generadas por IA de Google. Cambia las reglas para consultas informativas.",
        share: "Creciendo rápidamente",
      },
    ],
    ctaHeadline: "¿Listo para dominar la búsqueda?",
    ctaSubtitle:
      "Obtén un análisis completo de oportunidades SEO.|Identificaremos tus palabras clave de mayor valor, brechas técnicas y victorias rápidas.",
    ctaLabel: "Reclama Tu Hoja de Ruta SEO",
    diagramNodes: [
      { id: "technical", label: "SEO Técnico" },
      { id: "ux", label: "Experiencia de Usuario" },
      { id: "content", label: "Contenido" },
      { id: "links", label: "Enlaces" },
      { id: "rankings", label: "Rankings" },
      { id: "revenue", label: "Ingresos" },
    ],
    faqs: [
      { question: "¿Cuánto tiempo tarda el SEO en mostrar resultados?", answer: "El movimiento de posiciones suele comenzar en 3-4 meses. El impacto en ingresos se vuelve claro alrededor de los 6-12 meses. El SEO se acumula con el tiempo: cada mejora y contenido sigue funcionando mucho después de publicarse." },
      { question: "¿Qué incluye tu servicio de SEO?", answer: "Cada proyecto incluye una auditoría técnica completa, investigación de palabras clave, optimización on-page, construcción de enlaces, estrategia de contenido e informes mensuales. La mezcla varía según lo que más impacto tenga para tu negocio." },
      { question: "¿Trabajan con negocios locales?", answer: "Sí. El SEO local es una de nuestras fortalezas principales. Optimizamos Google Business Profile, construimos citas locales y producimos contenido específico por ubicación." },
      { question: "¿Cómo informan sobre el rendimiento SEO?", answer: "Seguimiento semanal de rankings, paneles mensuales de tráfico, leads y conversiones, y revisiones trimestrales de estrategia. Cada métrica está vinculada a resultados de negocio reales." },
      { question: "¿El SEO seguirá funcionando con la búsqueda IA?", answer: "Sí. El SEO técnico sólido, el contenido de autoridad y los enlaces de calidad siguen siendo la base de la visibilidad en los resultados de búsqueda impulsados por IA. Adaptamos nuestra estrategia a las nuevas funciones SERP continuamente." },
    ],
  },};
