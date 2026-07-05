import type { Locale } from "@/i18n/routing";
import type { ServicePhase } from "@/components/ui/ServicePhaseList";
import type { FAQItem } from "@/components/sections/FAQSection";

export type SeoKeywordRow = {
  keyword: string;
  type: string;
  desc: string;
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
      "We prioritize keywords by business impact, not just search volume. The focus stays on terms that signal buying intent and rank within reach. The goal is to identify what your competitors are ignoring and build authority in the spaces where winning is realistic.",
    keywordColKeyword: "Keyword",
    keywordColVolume: "Volume",
    keywordColDiff: "Diff.",
    keywordColType: "Type",
    keywordMatrix: [
      { keyword: "local seo services", type: "Commercial", desc: "Buyers actively looking for agency help. Not researching, deciding." },
      { keyword: "seo for landscapers", type: "Local", desc: "Niche vertical, low competition, clear commercial intent" },
      { keyword: "seo agency pricing", type: "Commercial", desc: "Decision-stage query from business owners comparing their options" },
      { keyword: "google business optimization", type: "Local", desc: "Direct map pack signal that drives local calls and clicks" },
      { keyword: "technical seo audit", type: "Informational", desc: "Research-stage query with downstream commercial conversion potential" },
      { keyword: "content writing seo", type: "Commercial", desc: "Service-adjacent query from businesses ready to invest in content" },
      { keyword: "ecommerce seo strategy", type: "Commercial", desc: "High-intent query from store owners looking for a growth path" },
      { keyword: "voice search optimization", type: "Informational", desc: "Emerging local search behavior with low current competition" },
    ],
    ecosystemTitle: "The Search Ecosystem",
    ecosystemSubtitle:
      "Strong rankings emerge when four systems work in sync: technical health, content authority, link equity, and user experience. Most sites underinvest in at least one of them. That gap is precisely where sustainable growth opportunities live.",
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
          "Landscaping Company case study: organic traffic grew from 420 to 5,840 visits per month over 10 months after a site rebuild and local SEO campaign.",
        metric: "+1,290%",
      },
      {
        label: "Keyword Rankings",
        headline: "Positions that stick",
        description: "Average client moves 27 positions across priority keywords within the first 6 months.",
        metric: "27 positions gained",
      },
      {
        label: "Qualified Lead Growth",
        headline: "Organic traffic that books",
        description:
          "Landscaping client: qualified leads grew from 10 to 48 per month over 10 months as commercial-intent keywords moved into page one.",
        metric: "4.8X leads",
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
      "Modern results include AI overviews, featured snippets, local packs, and video carousels. Each is a distinct entry point for your business. Winning means earning visibility across all of them, not just ranking somewhere on page one.",
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
      {
        label: "Video Carousels",
        desc: "Short-form and long-form video surfaced directly in results. YouTube and Shorts both feed it.",
        share: "62% of SERPs on mobile",
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
      "Priorizamos palabras clave por impacto en el negocio, no solo por volumen de búsqueda, enfocándonos en términos que señalan intención de compra y que pueden posicionarse de forma realista. El objetivo es identificar lo que tus competidores están ignorando y construir autoridad donde ganar sea alcanzable.",
    keywordColKeyword: "Palabra Clave",
    keywordColVolume: "Volumen",
    keywordColDiff: "Dif.",
    keywordColType: "Tipo",
    keywordMatrix: [
      { keyword: "local seo services", type: "Comercial", desc: "Compradores que buscan agencia activamente. No investigan, ya deciden." },
      { keyword: "seo for landscapers", type: "Local", desc: "Nicho vertical con poca competencia e intención comercial clara" },
      { keyword: "seo agency pricing", type: "Comercial", desc: "Consulta en fase de decisión de dueños comparando sus opciones" },
      { keyword: "google business optimization", type: "Local", desc: "Señal directa del map pack que genera llamadas y clics locales" },
      { keyword: "technical seo audit", type: "Informativo", desc: "Consulta de investigación con alto potencial de conversión posterior" },
      { keyword: "content writing seo", type: "Comercial", desc: "Consulta adyacente de negocios listos para invertir en contenido" },
      { keyword: "ecommerce seo strategy", type: "Comercial", desc: "Alta intención de tiendas buscando una ruta de crecimiento" },
      { keyword: "voice search optimization", type: "Informativo", desc: "Comportamiento de búsqueda local emergente con poca competencia actual" },
    ],
    ecosystemTitle: "El Ecosistema de Búsqueda",
    ecosystemSubtitle:
      "Los rankings sólidos surgen cuando cuatro sistemas trabajan en sincronía: salud técnica, autoridad de contenido, equidad de enlaces y experiencia de usuario. La mayoría de los sitios invierten poco en al menos uno. Esa brecha es exactamente donde viven las oportunidades de crecimiento sostenible.",
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
          "Caso Landscaping Company: el tráfico orgánico pasó de 420 a 5.840 visitas al mes en 10 meses tras rebuild y SEO local.",
        metric: "+1,290%",
      },
      {
        label: "Posiciones de Palabras Clave",
        headline: "Posiciones que se mantienen",
        description: "El cliente promedio gana 27 posiciones en palabras clave prioritarias en los primeros 6 meses.",
        metric: "27 posiciones ganadas",
      },
      {
        label: "Crecimiento de Leads Calificados",
        headline: "Tráfico orgánico que reserva",
        description:
          "Cliente Landscaping: leads calificados de 10 a 48 por mes en 10 meses a medida que keywords de intención comercial entraron a página uno.",
        metric: "4.8X leads",
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
      "Los resultados modernos incluyen resúmenes de IA, fragmentos destacados, paquetes locales y carruseles de video, cada uno un punto de entrada distinto para tu negocio. Ganar significa obtener visibilidad en todos ellos, no solo posicionarse en algún lugar de la primera página.",
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
      {
        label: "Carruseles de Video",
        desc: "Videos cortos y largos mostrados directamente en los resultados. YouTube y Shorts los alimentan.",
        share: "62% de SERPs en móvil",
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
