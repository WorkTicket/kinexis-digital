import type { Locale } from "@/i18n/routing";

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  publishedAt: string;
  featured: boolean;
  metric: { label: string; value: string } | null;
  layout: string;
};

export type TrendingItem = {
  label: string;
  value: string;
  slug: string;
  reads?: string;
  shares?: string;
  note?: string;
  date?: string;
};

export type BlogContent = {
  heroTitleLine1: string;
  heroTitleGradient: string;
  heroSubtitle: string;
  featuredResearchLabel: string;
  readArticle: string;
  contentExplorerLabel: string;
  contentExplorerTitle: string;
  recentPostsLabel: string;
  recentPostsTitle: string;
  noArticlesMessage: string;
  read: string;
  viewAllLabel: string;
  postsHeroTitleLine1: string;
  postsHeroTitleGradient: string;
  postsHeroSubtitle: string;
  trendingLabel: string;
  trendingTitle: string;
  readsSuffix: string;
  sharesSuffix: string;
  archiveLabel: string;
  archiveTitle: string;
  archiveDescription: string;
  articlesPublishedLabel: string;
  knowledgeGraphTitle: string;
  knowledgeGraphDescription: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  postDetailCtaHeadline: string;
  postDetailCtaSubtitle: string;
  postDetailCtaButton: string;
  categories: string[];
  posts: BlogPost[];
  trendingItems: TrendingItem[];
  archiveYears: { year: string; count: number }[];
};

export const blogContent: Record<Locale, BlogContent> = {
  en: {
    heroTitleLine1: "Growth",
    heroTitleGradient: "notes.",
    heroSubtitle:
      "Research, experiments, strategies, and lessons from the KINEXIS team.|Here's what we're learning and what we're proving in the field.",
    featuredResearchLabel: "Featured Research",
    readArticle: "Read Article",
    contentExplorerLabel: "Content Explorer",
    contentExplorerTitle: "Browse by topic.",
    recentPostsLabel: "Latest",
    recentPostsTitle: "Most recent.",
    noArticlesMessage: "No articles in this category yet. Check back soon.",
    read: "Read",
    viewAllLabel: "View all posts",
    postsHeroTitleLine1: "All",
    postsHeroTitleGradient: "posts.",
    postsHeroSubtitle:
      "Browse the full archive by topic.|Filter by category or scroll through every article.",
    trendingLabel: "Trending",
    trendingTitle: "What's resonating right now.",
    readsSuffix: "reads",
    sharesSuffix: "shares",
    archiveLabel: "Archive",
    archiveTitle: "Research library.",
    archiveDescription:
      "Browse our complete collection of research, case studies,|and strategic guides.",
    articlesPublishedLabel: "articles published",
    knowledgeGraphTitle: "Knowledge graph coming soon.",
    knowledgeGraphDescription:
      "We're building an interactive knowledge graph that maps every article, case study, and insight, connected by topic, tactic, and strategy. Stay tuned.",
    ctaTitle: "Want growth tips in your inbox?",
    ctaSubtitle:
      "Our best research, strategies, and experiments, delivered monthly.|No fluff, just useful stuff.",
    ctaButton: "Subscribe to Our Newsletter",
    postDetailCtaHeadline: "Want More Insights Like This?",
    postDetailCtaSubtitle: "Get our best content delivered to your inbox.",
    postDetailCtaButton: "Subscribe",
    categories: ["All", "SEO", "Web Design", "Paid Ads", "CRO", "Email", "Analytics", "Case Studies"],
    posts: [
      {
        slug: "local-seo-strategy-2026",
        title: "Local SEO Strategy for 2026:|What's Changed and What Still Works",
        category: "SEO",
        excerpt:
          "Google keeps tweaking its local search algorithm, and a lot of what used to work just doesn't cut it anymore. We've been testing what actually drives rankings in 2026. Here's what we've found.",
        publishedAt: "June 15, 2026",
        featured: true,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "email-nurture-sequences-that-book-calls",
        title: "Email Nurture Sequences That Actually Book Calls",
        category: "Email",
        excerpt:
          "Most nurture flows die in the inbox. We broke down the exact sequence structure, timing, and messaging that turns cold subscribers into booked discovery calls, without burning your list.",
        publishedAt: "June 20, 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "website-conversion-optimization",
        title: "7 Website Changes That Increased Conversions by 340%",
        category: "Web Design",
        excerpt:
          "We took a client's site from a 1.2% conversion rate to over 5% in 60 days with seven specific changes. A complete breakdown of exactly what we did, why it worked, and how much each change contributed.",
        publishedAt: "June 8, 2026",
        featured: false,
        metric: { label: "Conversion Lift", value: "+340%" },
        layout: "metric-card",
      },
      {
        slug: "google-business-profile-tips",
        title: "Google Business Profile:|The Complete Optimization Checklist",
        category: "CRO",
        excerpt:
          "Your Google Business Profile is the most powerful free marketing tool you've got. Here's our complete optimization checklist ranked by actual impact on local search rankings.",
        publishedAt: "May 25, 2026",
        featured: false,
        metric: null,
        layout: "editorial-split",
      },
      {
        slug: "seo-vs-google-ads",
        title: "SEO vs. Google Ads: Where Should You Invest First?",
        category: "Paid Ads",
        excerpt:
          "Organic versus paid is the oldest debate in digital marketing. We built a practical framework to help you decide where to invest first based on your timeline, budget, and business model.",
        publishedAt: "May 12, 2026",
        featured: false,
        metric: null,
        layout: "image-left",
      },
      {
        slug: "technical-seo-fundamentals",
        title: "Technical SEO Fundamentals Every Site Owner Should Know",
        category: "SEO",
        excerpt:
          "Core Web Vitals, crawl budget, structured data. These technical foundations determine whether Google trusts your site enough to rank it. Here's what every site owner actually needs to know.",
        publishedAt: "April 28, 2026",
        featured: false,
        metric: null,
        layout: "image-right",
      },
      {
        slug: "local-business-growth-playbook",
        title: "The Local Business Growth Playbook:|5 Channels That Actually Work",
        category: "Case Studies",
        excerpt:
          "After working with dozens of local service businesses, we've found five marketing channels that consistently deliver real ROI. Here's exactly how to make each one work for your business.",
        publishedAt: "April 15, 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "technical-seo-guide",
        title: "The Complete Technical SEO Guide",
        category: "SEO",
        excerpt:
          "Crawl budget, indexation, Core Web Vitals, and site architecture. A practical technical SEO guide with the fixes we run first on client sites.",
        publishedAt: "March 10, 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "heatmap-analysis",
        title: "Heatmap Analysis for Conversion Optimization",
        category: "CRO",
        excerpt:
          "Click maps and scroll maps show where visitors engage and where they bail. Here's how we use heatmap data to fix pages that look fine but don't convert.",
        publishedAt: "March 12, 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "lifecycle-marketing",
        title: "Lifecycle Marketing: Mapping the Full Customer Journey",
        category: "Email",
        excerpt:
          "Acquisition, activation, retention, expansion. How to map customer stages and trigger the right email at the right moment.",
        publishedAt: "March 14, 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "attribution-models",
        title: "Marketing Attribution Models Explained",
        category: "Analytics",
        excerpt:
          "First-touch, last-touch, linear, and data-driven attribution. Which model fits your sales cycle and how to stop over-crediting one channel.",
        publishedAt: "March 11, 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "conversion-psychology",
        title: "Conversion Psychology: Why Buyers Say Yes",
        category: "CRO",
        excerpt:
          "Social proof, loss aversion, and risk reduction. The psychology behind conversion lifts that A/B tests alone won't explain.",
        publishedAt: "March 6, 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "automated-nurture-sequences",
        title: "Automated Nurture Sequences That Convert",
        category: "Email",
        excerpt:
          "Welcome, value, proof, offer, break-up. The sequence structure we use to move subscribers from opt-in to purchase without burning the list.",
        publishedAt: "March 7, 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "quality-score-guide",
        title: "Google Ads Quality Score Guide",
        category: "Paid Ads",
        excerpt:
          "Expected CTR, ad relevance, and landing page experience. How Quality Score affects CPC and what to fix first when scores are stuck at 5.",
        publishedAt: "March 8, 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "internal-linking-guide",
        title: "Internal Linking Guide for SEO Authority",
        category: "SEO",
        excerpt:
          "Hub-and-spoke models, anchor text variety, and orphan pages. Internal linking is one of the highest-ROI SEO moves most sites ignore.",
        publishedAt: "March 5, 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "ga4-reporting",
        title: "GA4 Reporting for Marketing Teams",
        category: "Analytics",
        excerpt:
          "Explorations, funnels, and path analysis in GA4. The reports we actually use now that Universal Analytics is gone, plus how to tie events to leads and revenue.",
        publishedAt: "March 4, 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "negative-keywords-guide",
        title: "Negative Keywords Guide for PPC",
        category: "Paid Ads",
        excerpt:
          "Campaign-level and ad group negatives, search term audits, and the match types that quietly drain budget if you never review them.",
        publishedAt: "March 1, 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "seo-audit-framework",
        title: "SEO Audit Framework: A Step-by-Step Process",
        category: "SEO",
        excerpt:
          "Technical, content, and authority layers. Our step-by-step SEO audit process prioritized by impact, effort, and business relevance.",
        publishedAt: "February 28, 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "email-segmentation",
        title: "Email Segmentation Strategies",
        category: "Email",
        excerpt:
          "Behavioral segments beat batch-and-blast every time. How purchase history, engagement, and intent signals drive email revenue.",
        publishedAt: "February 28, 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "marketing-dashboards",
        title: "Marketing Dashboards That Drive Decisions",
        category: "Analytics",
        excerpt:
          "Executive and channel views that answer one question: is marketing producing profitable revenue? What to chart and what to drop.",
        publishedAt: "February 26, 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "landing-page-best-practices",
        title: "Landing Page Best Practices for Paid Traffic",
        category: "Paid Ads",
        excerpt:
          "Message match, single CTA, and speed. Why dedicated landing pages convert paid traffic at 2-3x the rate of a generic homepage.",
        publishedAt: "February 25, 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "ab-testing-framework",
        title: "A/B Testing Framework for Marketers",
        category: "CRO",
        excerpt:
          "ICE scoring, documented hypotheses, and sample size rules. A structured testing framework so you're not guessing which button color wins.",
        publishedAt: "February 22, 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "link-building-strategies",
        title: "Link Building Strategies That Still Work",
        category: "SEO",
        excerpt:
          "Digital PR, original research, and resource pages. Link building tactics that earn editorial links in 2026 without spammy directories.",
        publishedAt: "February 20, 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "roas-calculations",
        title: "ROAS Calculations: Measuring True Ad Profitability",
        category: "Analytics",
        excerpt:
          "Break-even ROAS, margin math, and why blended ROAS hides unprofitable cold traffic. How to measure ad profitability honestly.",
        publishedAt: "February 18, 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "local-seo-checklist",
        title: "Local SEO Checklist for Service Businesses",
        category: "SEO",
        excerpt:
          "GBP, citations, reviews, location pages, and rank tracking. The five-part local SEO checklist we run on every service business client.",
        publishedAt: "February 15, 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "landing-page-optimization",
        title: "Landing Page Optimization Playbook",
        category: "CRO",
        excerpt:
          "Above-the-fold clarity, form friction, and mobile layout. A systematic playbook for improving landing page conversion over time.",
        publishedAt: "February 10, 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
    ],
    trendingItems: [
      { label: "Most Read", value: "Local SEO Strategy 2026", slug: "local-seo-strategy-2026", reads: "2.4K" },
      { label: "Most Shared", value: "7 Website Changes 340%", slug: "website-conversion-optimization", shares: "847" },
      { label: "Editor's Pick", value: "Technical SEO Fundamentals", slug: "technical-seo-fundamentals", note: "Staff favorite" },
      { label: "Newest", value: "Local SEO Strategy 2026", slug: "local-seo-strategy-2026", date: "June 15" },
    ],
    archiveYears: [
      { year: "2026", count: 26 },
      { year: "2025", count: 12 },
      { year: "2024", count: 8 },
    ],
  },
  es: {
    heroTitleLine1: "Notas de",
    heroTitleGradient: "crecimiento.",
    heroSubtitle:
      "Investigación, experimentos, estrategias e ideas del equipo KINEXIS.|Esto es lo que estamos aprendiendo y lo que estamos comprobando en el campo.",
    featuredResearchLabel: "Investigación Destacada",
    readArticle: "Leer Artículo",
    contentExplorerLabel: "Explorador de Contenido",
    contentExplorerTitle: "Explora por tema.",
    recentPostsLabel: "Recientes",
    recentPostsTitle: "Lo más reciente.",
    noArticlesMessage: "Aún no hay artículos en esta categoría. Vuelve pronto.",
    read: "Leer",
    viewAllLabel: "Ver todos los artículos",
    postsHeroTitleLine1: "Todos los",
    postsHeroTitleGradient: "artículos.",
    postsHeroSubtitle:
      "Explora el archivo completo por tema.|Filtra por categoría o revisa cada artículo.",
    trendingLabel: "Tendencias",
    trendingTitle: "Lo que está resonando ahora.",
    readsSuffix: "lecturas",
    sharesSuffix: "compartidos",
    archiveLabel: "Archivo",
    archiveTitle: "Biblioteca de investigación.",
    archiveDescription:
      "Explora nuestra colección completa de investigación, casos de estudio|y guías estratégicas.",
    articlesPublishedLabel: "artículos publicados",
    knowledgeGraphTitle: "Grafo de conocimiento próximamente.",
    knowledgeGraphDescription:
      "Estamos construyendo un grafo de conocimiento interactivo que mapea cada artículo, caso de estudio e idea, conectados por tema, táctica y estrategia. Mantente atento.",
    ctaTitle: "¿Quieres ideas de crecimiento en tu bandeja de entrada?",
    ctaSubtitle:
      "Nuestra mejor investigación, estrategias y experimentos, entregados mensualmente.|Sin relleno, solo contenido útil.",
    ctaButton: "Suscribirse al Boletín",
    postDetailCtaHeadline: "¿Quieres Más Contenido Como Este?",
    postDetailCtaSubtitle: "Recibe nuestro mejor contenido directo en tu bandeja de entrada.",
    postDetailCtaButton: "Suscribirse",
    categories: ["Todos", "SEO", "Diseño Web", "Anuncios Pagados", "CRO", "Email", "Analítica", "Casos de Estudio"],
    posts: [
      {
        slug: "local-seo-strategy-2026",
        title: "Estrategia de SEO Local para 2026:|Qué Ha Cambiado y Qué Sigue Funcionando",
        category: "SEO",
        excerpt:
          "Google sigue ajustando su algoritmo de búsqueda local, y mucho de lo que antes funcionaba ya no es suficiente. Hemos estado probando lo que realmente impulsa los rankings en 2026. Esto es lo que encontramos.",
        publishedAt: "15 de junio de 2026",
        featured: true,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "email-nurture-sequences-that-book-calls",
        title: "Secuencias de Email que Realmente Agendan Llamadas",
        category: "Email",
        excerpt:
          "La mayoría de los flujos de nutrición mueren en la bandeja de entrada. Desglosamos la estructura exacta de la secuencia, el timing y los mensajes que convierten suscriptores fríos en llamadas de descubrimiento agendadas, sin quemar tu lista.",
        publishedAt: "20 de junio de 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "website-conversion-optimization",
        title: "7 Cambios en el Sitio Web que Aumentaron las Conversiones un 340%",
        category: "Diseño Web",
        excerpt:
          "Llevamos el sitio de un cliente de una tasa de conversión del 1,2% a más del 5% en 60 días con siete cambios específicos. Un desglose completo de exactamente qué hicimos, por qué funcionó y cuánto aportó cada cambio.",
        publishedAt: "8 de junio de 2026",
        featured: false,
        metric: { label: "Aumento de Conversión", value: "+340%" },
        layout: "metric-card",
      },
      {
        slug: "google-business-profile-tips",
        title: "Google Business Profile:|La Lista Completa de Optimización",
        category: "CRO",
        excerpt:
          "Tu Google Business Profile es la herramienta de marketing gratuita más poderosa que tienes. Aquí está nuestra lista completa de optimización clasificada por impacto real en los rankings de búsqueda local.",
        publishedAt: "25 de mayo de 2026",
        featured: false,
        metric: null,
        layout: "editorial-split",
      },
      {
        slug: "seo-vs-google-ads",
        title: "SEO vs. Google Ads: ¿Dónde Deberías Invertir Primero?",
        category: "Anuncios Pagados",
        excerpt:
          "Orgánico versus pagado es el debate más antiguo del marketing digital. Construimos un marco práctico para ayudarte a decidir dónde invertir primero según tu cronograma, presupuesto y modelo de negocio.",
        publishedAt: "12 de mayo de 2026",
        featured: false,
        metric: null,
        layout: "image-left",
      },
      {
        slug: "technical-seo-fundamentals",
        title: "Fundamentos de SEO Técnico que Todo Propietario de Sitio Debe Conocer",
        category: "SEO",
        excerpt:
          "Core Web Vitals, presupuesto de rastreo, datos estructurados. Estos fundamentos técnicos determinan si Google confía lo suficiente en tu sitio para posicionarlo. Esto es lo que todo propietario de sitio realmente necesita saber.",
        publishedAt: "28 de abril de 2026",
        featured: false,
        metric: null,
        layout: "image-right",
      },
      {
        slug: "local-business-growth-playbook",
        title: "El Playbook de Crecimiento para Negocios Locales:|5 Canales que Realmente Funcionan",
        category: "Casos de Estudio",
        excerpt:
          "Después de trabajar con docenas de negocios de servicios locales, encontramos cinco canales de marketing que consistentemente generan ROI real. Así es exactamente cómo hacer que cada uno funcione para tu negocio.",
        publishedAt: "15 de abril de 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "technical-seo-guide",
        title: "La Guía Completa de SEO Técnico",
        category: "SEO",
        excerpt:
          "Presupuesto de rastreo, indexación, Core Web Vitals y arquitectura del sitio. Una guía práctica de SEO técnico con las correcciones que aplicamos primero en proyectos de clientes.",
        publishedAt: "10 de marzo de 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "heatmap-analysis",
        title: "Análisis de Heatmaps para Optimización de Conversión",
        category: "CRO",
        excerpt:
          "Mapas de clics y de scroll muestran dónde interactúan los visitantes y dónde abandonan. Cómo usamos heatmaps para arreglar páginas que se ven bien pero no convierten.",
        publishedAt: "12 de marzo de 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "lifecycle-marketing",
        title: "Marketing de Ciclo de Vida: Mapeando el Customer Journey Completo",
        category: "Email",
        excerpt:
          "Adquisición, activación, retención y expansión. Cómo mapear etapas del cliente y activar el email correcto en el momento correcto.",
        publishedAt: "14 de marzo de 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "attribution-models",
        title: "Modelos de Atribución de Marketing Explicados",
        category: "Analítica",
        excerpt:
          "First-touch, last-touch, lineal y atribución basada en datos. Qué modelo encaja con tu ciclo de venta y cómo dejar de sobrevalorar un solo canal.",
        publishedAt: "11 de marzo de 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "conversion-psychology",
        title: "Psicología de Conversión: Por Qué los Compradores Dicen Sí",
        category: "CRO",
        excerpt:
          "Prueba social, aversión a la pérdida y reducción de riesgo. La psicología detrás de mejoras de conversión que los A/B tests solos no explican.",
        publishedAt: "6 de marzo de 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "automated-nurture-sequences",
        title: "Secuencias de Nutrición Automatizadas que Convierten",
        category: "Email",
        excerpt:
          "Bienvenida, valor, prueba, oferta y cierre. La estructura de secuencia que usamos para llevar suscriptores del opt-in a la compra sin quemar la lista.",
        publishedAt: "7 de marzo de 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "quality-score-guide",
        title: "Guía de Quality Score en Google Ads",
        category: "Anuncios Pagados",
        excerpt:
          "CTR esperado, relevancia del anuncio y experiencia de landing page. Cómo el Quality Score afecta el CPC y qué corregir primero cuando el score se queda en 5.",
        publishedAt: "8 de marzo de 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "internal-linking-guide",
        title: "Guía de Enlazado Interno para Autoridad SEO",
        category: "SEO",
        excerpt:
          "Modelo hub-and-spoke, variedad de anchor text y páginas huérfanas. El enlazado interno es una de las palancas SEO con mayor ROI que la mayoría de sitios ignora.",
        publishedAt: "5 de marzo de 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "ga4-reporting",
        title: "Reportes GA4 para Equipos de Marketing",
        category: "Analítica",
        excerpt:
          "Exploraciones, embudos y análisis de rutas en GA4. Los reportes que usamos ahora que Universal Analytics desapareció, y cómo vincular eventos con leads e ingresos.",
        publishedAt: "4 de marzo de 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "negative-keywords-guide",
        title: "Guía de Palabras Clave Negativas para PPC",
        category: "Anuncios Pagados",
        excerpt:
          "Negativas a nivel de campaña y ad group, auditorías de términos de búsqueda y los tipos de concordancia que drenan presupuesto si nunca los revisas.",
        publishedAt: "1 de marzo de 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "seo-audit-framework",
        title: "Framework de Auditoría SEO: Proceso Paso a Paso",
        category: "SEO",
        excerpt:
          "Capas técnica, de contenido y de autoridad. Nuestro proceso de auditoría SEO paso a paso, priorizado por impacto, esfuerzo y relevancia de negocio.",
        publishedAt: "28 de febrero de 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "email-segmentation",
        title: "Estrategias de Segmentación de Email",
        category: "Email",
        excerpt:
          "Los segmentos comportamentales superan al envío masivo siempre. Cómo el historial de compra, el engagement y las señales de intención impulsan ingresos por email.",
        publishedAt: "28 de febrero de 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "marketing-dashboards",
        title: "Dashboards de Marketing que Impulsan Decisiones",
        category: "Analítica",
        excerpt:
          "Vistas ejecutiva y por canal que responden una pregunta: ¿el marketing está generando ingresos rentables? Qué graficar y qué eliminar.",
        publishedAt: "26 de febrero de 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "landing-page-best-practices",
        title: "Mejores Prácticas de Landing Pages para Tráfico Pagado",
        category: "Anuncios Pagados",
        excerpt:
          "Coherencia con el anuncio, CTA único y velocidad. Por qué las landing pages dedicadas convierten tráfico pagado 2-3 veces más que una homepage genérica.",
        publishedAt: "25 de febrero de 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "ab-testing-framework",
        title: "Framework de A/B Testing para Marketers",
        category: "CRO",
        excerpt:
          "Scoring ICE, hipótesis documentadas y reglas de tamaño de muestra. Un framework de pruebas estructurado para no adivinar qué color de botón gana.",
        publishedAt: "22 de febrero de 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "link-building-strategies",
        title: "Estrategias de Link Building que Siguen Funcionando",
        category: "SEO",
        excerpt:
          "PR digital, investigación original y páginas de recursos. Tácticas de link building que ganan enlaces editoriales en 2026 sin directorios spam.",
        publishedAt: "20 de febrero de 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "roas-calculations",
        title: "Cálculos de ROAS: Midiendo la Rentabilidad Real de Anuncios",
        category: "Analítica",
        excerpt:
          "ROAS de equilibrio, matemática de márgenes y por qué el ROAS blended oculta tráfico frío no rentable. Cómo medir la rentabilidad de anuncios con honestidad.",
        publishedAt: "18 de febrero de 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "local-seo-checklist",
        title: "Checklist de SEO Local para Negocios de Servicios",
        category: "SEO",
        excerpt:
          "GBP, citas, reseñas, páginas por ubicación y seguimiento de rankings. El checklist de SEO local en cinco partes que aplicamos en cada cliente de servicios.",
        publishedAt: "15 de febrero de 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
      {
        slug: "landing-page-optimization",
        title: "Playbook de Optimización de Landing Pages",
        category: "CRO",
        excerpt:
          "Claridad arriba del fold, fricción en formularios y diseño móvil. Un playbook sistemático para mejorar la conversión de landing pages con el tiempo.",
        publishedAt: "10 de febrero de 2026",
        featured: false,
        metric: null,
        layout: "horizontal",
      },
    ],
    trendingItems: [
      { label: "Más Leído", value: "Estrategia de SEO Local 2026", slug: "local-seo-strategy-2026", reads: "2,4K" },
      { label: "Más Compartido", value: "7 Cambios en el Sitio 340%", slug: "website-conversion-optimization", shares: "847" },
      { label: "Selección del Editor", value: "Fundamentos de SEO Técnico", slug: "technical-seo-fundamentals", note: "Favorito del equipo" },
      { label: "Más Reciente", value: "Estrategia de SEO Local 2026", slug: "local-seo-strategy-2026", date: "15 de junio" },
    ],
    archiveYears: [
      { year: "2026", count: 26 },
      { year: "2025", count: 12 },
      { year: "2024", count: 8 },
    ],
  },};
