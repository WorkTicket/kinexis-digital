import type { Locale } from "@/i18n/routing";

export type ServiceCardContent = {
  id: string;
  label: string;
  description: string;
  stat: string;
};

export type PathwayContent = {
  id: string;
  label: string;
  headline: string;
  description: string;
  results: string[];
  exploreLink: string;
};

export type PathwaySeoVisual = {
  nodes: { label: string; sub: string }[];
  chartTitle: string;
};

export type PathwayWebDesignVisual = {
  devices: { label: string }[];
};

export type PathwayPaidAdsVisual = {
  channels: { ch: string }[];
  roasLabel: string;
};

export type IntegrationPhaseContent = {
  phase: string;
  description: string;
  services: string[];
};

export type IndustrySolutionContent = {
  id: string;
  label: string;
  services: string[];
  strategy: string;
  outcomes: string[];
};

export type ServicesPageContent = {
  hero: {
    label: string;
    headlineLine1: string;
    headlineLine2: string;
    subtitle: string;
    ctaLabel: string;
    secondaryCtaLabel: string;
  };
  capabilities: {
    title: string;
    subtitle: string;
    services: ServiceCardContent[];
  };
  pathways: {
    sectionLabel: string;
    title: string;
    subtitle: string;
    items: PathwayContent[];
    seoVisual: PathwaySeoVisual;
    webDesignVisual: PathwayWebDesignVisual;
    paidAdsVisual: PathwayPaidAdsVisual;
  };
  integration: {
    title: string;
    subtitle: string;
    phases: IntegrationPhaseContent[];
    footnote: string;
  };
  industries: {
    sectionLabel: string;
    title: string;
    subtitle: string;
    panelServices: string;
    panelStrategy: string;
    panelOutcomes: string;
    viewAllLabel: string;
    items: IndustrySolutionContent[];
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
};

const enServices: ServiceCardContent[] = [
  { id: "seo", label: "SEO", description: "Technical foundations, authority content, and link building that keeps paying off over time.", stat: "+1,290% traffic · Landscaping Co." },
  { id: "localSeo", label: "Local SEO", description: "Geo-targeted rankings, Google Business Profile optimization, and map pack placements for businesses that compete locally.", stat: "327% more calls · Plumbing Co." },
  { id: "paidAds", label: "Paid Ads", description: "Google and Meta campaigns built for ROAS, not vanity metrics.", stat: "65% ad spend cut · Plumbing Co." },
  { id: "googleAds", label: "Google Ads", description: "Search, Shopping, and Performance Max campaigns built to capture buyers at the exact moment they're ready to act.", stat: "120% conv. lift · landing page alignment" },
  { id: "metaAds", label: "Meta Ads", description: "Facebook and Instagram campaigns that prospect cold audiences, retarget warm visitors, and rotate creative before it goes stale.", stat: "3.8x ROAS · e-commerce client" },
  { id: "ppcManagement", label: "PPC Management", description: "Full paid media management across Google, Meta, LinkedIn, and Microsoft. One budget, one strategy, one set of revenue targets.", stat: "45% CPL reduction · paid campaigns" },
  { id: "webDesign", label: "Web Design", description: "Custom, conversion-optimized sites built to turn visitors into qualified leads.", stat: "1.8% → 8.4% conv. · Landscaping Co." },
  { id: "funnels", label: "Funnels & CRO", description: "Full conversion systems: funnel architecture, landing pages, nurture automation, and A/B testing that compounds revenue.", stat: "5.9X demos · SaaS Platform" },
  { id: "email", label: "Email Marketing", description: "Automated nurture sequences that turn one-time buyers into repeat revenue.", stat: "42% open rate · lifecycle flows" },
  { id: "branding", label: "Branding", description: "Positioning and visual identity that command trust and recognition.", stat: "3x brand recall · repositioning" },
  { id: "content", label: "Content Marketing", description: "Authority-building content that answers what your buyers are searching for.", stat: "5.9X demos · SaaS Platform" },
  { id: "social", label: "Social Media", description: "Platform-native content and paid social that builds audience and demand.", stat: "5.2x engagement · paid social" },
  { id: "video", label: "Video Marketing", description: "Short-form and long-form video that educates, converts, and retargets.", stat: "68% higher retention · ad creative" },
  { id: "analytics", label: "Analytics", description: "Full-funnel tracking and reporting so every decision is data-backed.", stat: "Full-funnel attribution setup" },
  { id: "consulting", label: "Growth Consulting", description: "Strategic roadmaps, audits, and fractional advisory aligned to revenue goals.", stat: "5.9X demos · SaaS Platform" },
];

const enPathways: PathwayContent[] = [
  {
    id: "seo",
    label: "SEO",
    headline: "Show up in search.",
    description: "We build steady growth through technical foundations, authority content, and link building. Rankings are assets that appreciate over time.",
    results: ["4.8X leads · Landscaping Co.", "42 local pack keywords · 10 mo", "1.8% → 8.4% conv. · same client"],
    exploreLink: "Explore SEO Strategy",
  },
  {
    id: "webDesign",
    label: "Web Design",
    headline: "Websites that convert.",
    description: "Custom-built, conversion-optimized websites that feel like premium SaaS platforms. Every pixel serves a revenue goal.",
    results: ["1.8% → 8.4% conv. · Landscaping rebuild", "4.8X qualified leads · 10 mo", "Lighthouse 94 · performance score"],
    exploreLink: "Explore Web Design Strategy",
  },
  {
    id: "paidAds",
    label: "Paid Ads",
    headline: "Every dollar tuned for ROAS.",
    description: "Google and Meta campaigns built to convert intent into booked calls. We optimize every dollar toward measurable revenue.",
    results: ["327% emergency calls · Plumbing Co.", "65% ad spend cut · same client", "48 of 60 keywords top-3 · local pack"],
    exploreLink: "Explore Paid Ads Strategy",
  },
];

const enIntegrationPhases: IntegrationPhaseContent[] = [
  { phase: "Acquire", description: "Drive qualified traffic from search, social, and paid channels.", services: ["SEO", "Paid Ads", "Social Media", "Content"] },
  { phase: "Convert", description: "Turn visitors into leads with pages and flows built to close.", services: ["Landing Pages", "CRO", "Funnels", "Lead Capture"] },
  { phase: "Retain", description: "Nurture relationships and maximize lifetime customer value.", services: ["CRM", "Email", "Retargeting", "Repeat Sales"] },
];

const enIndustries: IndustrySolutionContent[] = [
  {
    id: "saas",
    label: "SaaS & Technology",
    services: ["Content Marketing", "Paid Search", "Funnel Optimization", "Analytics"],
    strategy: "Authority content and targeted paid search fill the top of funnel. Optimized trial-to-paid flows and full-funnel analytics reduce CAC and scale MRR predictably.",
    outcomes: ["5.9X demo requests · 8 mo", "43% CAC reduction · organic channels", "$33K MRR · marketing-attributed"],
  },
  {
    id: "agencies",
    label: "Agencies & B2B",
    services: ["Brand Strategy", "Website Redesign", "Demand Generation", "Account-Based Marketing"],
    strategy: "Position your agency as the premium choice with a brand and site that convert. Multi-channel demand gen and ABM campaigns target ideal accounts with precision.",
    outcomes: ["475% inbound lead growth", "28% shorter sales cycle", "5.1x marketing ROI"],
  },
  {
    id: "ecommerce",
    label: "E-Commerce & Retail",
    services: ["Product SEO", "Shopping Ads", "Email Automation", "CRO"],
    strategy: "Product-level SEO and shopping campaigns drive qualified buyers. Automated email flows recover abandoned carts and increase repeat purchase rates.",
    outcomes: ["320% revenue growth", "2.8x ROAS on shopping ads", "35% cart recovery rate"],
  },
  {
    id: "professional",
    label: "Professional Services",
    services: ["Authority SEO", "LinkedIn Ads", "Lead Magnets", "CRM Integration"],
    strategy: "Thought leadership content establishes expertise while LinkedIn and search capture decision-makers. Lead magnets and nurture sequences convert prospects into high-value clients.",
    outcomes: ["$2.4M pipeline generated", "34% deal close rate", "12 qualified leads/mo"],
  },
  {
    id: "healthcare",
    label: "Healthcare & Medical",
    services: ["Medical SEO", "Patient Landing Pages", "Reputation Management", "Content Marketing"],
    strategy: "Build trust through compliant, educational content and local visibility. Patient-focused landing pages and review systems convert high-intent searchers into appointments.",
    outcomes: ["180+ new patients/mo", "4.1x organic lead growth", "92% positive review rate"],
  },
  {
    id: "skilled-trades",
    label: "Skilled Trades",
    services: ["Local SEO", "Service Landing Pages", "Google Ads", "Review Management"],
    strategy: "Capture emergency and seasonal intent through geo-targeted SEO and local service ads. High-converting landing pages with real-time pricing turn searchers into booked jobs.",
    outcomes: ["94 emergency calls/mo · Plumbing Co.", "327% call growth · 8 mo", "Top 3 local pack · 48 keywords"],
  },
];

export const servicesPageContent: Record<Locale, ServicesPageContent> = {
  en: {
    hero: {
      label: "Digital Marketing Services",
      headlineLine1: "One system.",
      headlineLine2: "Fifteen channels.",
      subtitle: "Fifteen channels. One integrated growth program. You don't have to run all of them at once, but the ones you do run should work together.",
      ctaLabel: "Book a Strategy Call",
      secondaryCtaLabel: "Explore Services",
    },
    capabilities: {
      title: "Full-service capabilities.",
      subtitle: "The full channel stack: owned, earned, and paid. Managed with one set of goals and one reporting framework.",
      services: enServices,
    },
    pathways: {
      sectionLabel: "Deep Dives",
      title: "Each service is a system.",
      subtitle: "Every service on this page is a standalone program with its own strategy, its own reporting, and its own compounding effect over time.",
      items: enPathways,
      seoVisual: {
        nodes: [
          { label: "Technical", sub: "Foundation" },
          { label: "Content", sub: "Authority" },
          { label: "Links", sub: "Trust" },
        ],
        chartTitle: "Organic Traffic Growth",
      },
      webDesignVisual: {
        devices: [{ label: "Desktop" }, { label: "Tablet" }, { label: "Mobile" }],
      },
      paidAdsVisual: {
        channels: [{ ch: "Google Search" }, { ch: "Google PMax" }, { ch: "Meta Ads" }],
        roasLabel: "ROAS",
      },
    },
    integration: {
      title: "How services work together.",
      subtitle: "When the channels work together, traffic quality improves, conversion rates go up, and cost per lead drops over time. Not because of any one channel. Because of how they reinforce each other.",
      phases: enIntegrationPhases,
      footnote: "SEO drives qualified traffic. That traffic lands on high-converting pages. Ads amplify the best performers. Leads flow into the CRM. Email turns one-time buyers into repeat revenue. Every piece feeds the next.",
    },
    industries: {
      sectionLabel: "Industry Solutions",
      title: "Built for your market.",
      subtitle: "Select your industry to see the exact service mix we'd recommend, the strategy behind it, and the results we've delivered for similar businesses.",
      panelServices: "Services",
      panelStrategy: "Strategy",
      panelOutcomes: "Outcomes",
      viewAllLabel: "View all industries",
      items: enIndustries,
    },
    cta: {
      title: "Not sure which service fits?",
      subtitle: "We'll review your marketing, find where you're losing qualified traffic and leads, and recommend a starting point based on what your business actually needs right now.",
      button: "Book a Free Strategy Call",
    },
  },
  es: {
    hero: {
      label: "Servicios de Marketing Digital",
      headlineLine1: "Un sistema.",
      headlineLine2: "Quince canales.",
      subtitle: "SEO, medios pagados, diseño web y sistemas de conversión,|diseñados para funcionar juntos como un motor de ingresos, no como una lista desconectada de tácticas.",
      ctaLabel: "Reservar una Llamada Estratégica",
      secondaryCtaLabel: "Explorar Servicios",
    },
    capabilities: {
      title: "Capacidades de servicio completo.",
      subtitle: "Todos los canales que tu negocio necesita para adquirir,|convertir y retener clientes, gestionados bajo una sola estrategia de crecimiento.",
      services: [
        { id: "seo", label: "SEO", description: "Fundamentos técnicos, contenido de autoridad y construcción de enlaces que siguen dando resultados con el tiempo.", stat: "+1,290% tráfico · Landscaping Co." },
        { id: "localSeo", label: "SEO Local", description: "Rankings geolocalizados, optimización del Perfil de Google Business y posiciones en el mapa para negocios que compiten localmente.", stat: "327% más llamadas · Plumbing Co." },
        { id: "paidAds", label: "Anuncios Pagados", description: "Campañas en Google y Meta hechas para ROAS, no para métricas de vanidad.", stat: "65% reducción de gasto · Plumbing Co." },
        { id: "googleAds", label: "Google Ads", description: "Campañas de Search, Shopping y Performance Max para capturar compradores en el momento exacto en que están listos para actuar.", stat: "120% aumento en conversión · alineación de landing pages" },
        { id: "metaAds", label: "Meta Ads", description: "Campañas en Facebook e Instagram que prospectan audiencias frías, hacen retargeting a visitantes tibios y rotan creativos antes de que se agoten.", stat: "3.8x ROAS · cliente e-commerce" },
        { id: "ppcManagement", label: "Gestión de PPC", description: "Gestión completa de medios pagados en Google, Meta, LinkedIn y Microsoft. Un presupuesto, una estrategia, un conjunto de objetivos de ingresos.", stat: "45% reducción de CPL · campañas pagadas" },
        { id: "webDesign", label: "Diseño Web", description: "Sitios personalizados y optimizados para conversión que convierten visitantes en leads calificados.", stat: "1.8% → 8.4% conv. · Landscaping Co." },
        { id: "funnels", label: "Embudos y CRO", description: "Sistemas de conversión completos: arquitectura de embudo, landing pages, automatización de nutrición y pruebas A/B que acumulan ingresos.", stat: "5.9X demos · Plataforma SaaS" },
        { id: "email", label: "Email Marketing", description: "Secuencias automatizadas de nutrición que convierten compradores únicos en ingresos recurrentes.", stat: "42% tasa de apertura promedio" },
        { id: "branding", label: "Branding", description: "Posicionamiento e identidad visual que generan confianza y reconocimiento.", stat: "3x aumento en recordación de marca" },
        { id: "content", label: "Marketing de Contenidos", description: "Contenido que construye autoridad y responde lo que tus compradores buscan.", stat: "5.9X demos · Plataforma SaaS" },
        { id: "social", label: "Redes Sociales", description: "Contenido nativo de plataforma y social pagado que construye audiencia y demanda.", stat: "5.2x tasa de engagement" },
        { id: "video", label: "Video Marketing", description: "Video corto y largo que educa, convierte y hace retargeting.", stat: "68% mayor retención" },
        { id: "analytics", label: "Analítica", description: "Seguimiento y reportes de embudo completo para que cada decisión esté respaldada por datos.", stat: "100% claridad de atribución" },
        { id: "consulting", label: "Consultoría de Crecimiento", description: "Hojas de ruta estratégicas, auditorías y asesoría fraccional alineadas a objetivos de ingresos.", stat: "5.9X demos · Plataforma SaaS" },
      ],
    },
    pathways: {
      sectionLabel: "Profundización",
      title: "Cada servicio es un sistema.",
      subtitle: "No es una táctica. No es un ítem del menú.|Cada camino tiene su propia estrategia, sus propias métricas y un efecto que perdura.",
      items: [
        {
          id: "seo",
          label: "SEO",
          headline: "Aparece en las búsquedas.",
          description: "Construimos crecimiento constante a través de fundamentos técnicos, contenido de autoridad y construcción de enlaces. Los rankings son activos que ganan valor con el tiempo.",
          results: ["4.8X leads · Landscaping Co.", "42 keywords en pack local · 10 meses", "1.8% → 8.4% conv. · mismo cliente"],
          exploreLink: "Explorar Estrategia de SEO",
        },
        {
          id: "webDesign",
          label: "Diseño Web",
          headline: "Sitios web que convierten.",
          description: "Sitios web personalizados y optimizados para conversión que se sienten como plataformas SaaS premium. Cada píxel sirve a un objetivo de ingresos.",
          results: ["1.8% → 8.4% conv. · rebuild Landscaping", "4.8X leads calificados · 10 meses", "Lighthouse 94 · puntuación de rendimiento"],
          exploreLink: "Explorar Estrategia de Diseño Web",
        },
        {
          id: "paidAds",
          label: "Anuncios Pagados",
          headline: "Cada dólar afinado para ROAS.",
          description: "Campañas en Google y Meta construidas para convertir intención en llamadas agendadas. Optimizamos cada dólar hacia ingresos medibles.",
          results: ["327% llamadas de emergencia · Plumbing Co.", "65% reducción de gasto · mismo cliente", "48 de 60 keywords top-3 · pack local"],
          exploreLink: "Explorar Estrategia de Anuncios Pagados",
        },
      ],
      seoVisual: {
        nodes: [
          { label: "Técnico", sub: "Fundamento" },
          { label: "Contenido", sub: "Autoridad" },
          { label: "Enlaces", sub: "Confianza" },
        ],
        chartTitle: "Crecimiento de Tráfico Orgánico",
      },
      webDesignVisual: {
        devices: [{ label: "Escritorio" }, { label: "Tablet" }, { label: "Móvil" }],
      },
      paidAdsVisual: {
        channels: [{ ch: "Google Search" }, { ch: "Google PMax" }, { ch: "Meta Ads" }],
        roasLabel: "ROAS",
      },
    },
    integration: {
      title: "Cómo trabajan juntos los servicios.",
      subtitle: "Las agencias premium explican sistemas. Las agencias baratas explican servicios.|Así es como las piezas se conectan para crear un motor de ingresos.",
      phases: [
        { phase: "Adquirir", description: "Genera tráfico calificado desde búsqueda, redes sociales y canales pagados.", services: ["SEO", "Anuncios Pagados", "Redes Sociales", "Contenido"] },
        { phase: "Convertir", description: "Convierte visitantes en leads con páginas y flujos diseñados para cerrar.", services: ["Landing Pages", "CRO", "Embudos", "Captura de Leads"] },
        { phase: "Retener", description: "Nutre relaciones y maximiza el valor de vida del cliente.", services: ["CRM", "Email", "Retargeting", "Ventas Recurrentes"] },
      ],
      footnote: "El SEO genera tráfico calificado. Ese tráfico llega a páginas de alta conversión. Los anuncios amplifican los mejores resultados. Los leads fluyen al CRM. El email convierte compradores únicos en ingresos recurrentes. Cada pieza alimenta la siguiente.",
    },
    industries: {
      sectionLabel: "Soluciones por Industria",
      title: "Diseñado para tu mercado.",
      subtitle: "Selecciona tu industria para ver los servicios recomendados,|la estrategia y los resultados típicos.",
      panelServices: "Servicios",
      panelStrategy: "Estrategia",
      panelOutcomes: "Resultados",
      viewAllLabel: "Ver todas las industrias",
      items: [
        {
          id: "saas",
          label: "SaaS y Tecnología",
          services: ["Marketing de Contenidos", "Búsqueda Pagada", "Optimización de Embudos", "Analítica"],
          strategy: "El contenido de autoridad y la búsqueda pagada dirigida llenan la parte superior del embudo. Flujos optimizados de prueba a pago y analítica de embudo completo reducen el CAC y escalan el MRR de forma predecible.",
          outcomes: ["65% aumento en conversión de prueba", "40% reducción de CAC", "2.5x crecimiento de pipeline"],
        },
        {
          id: "agencies",
          label: "Agencias y B2B",
          services: ["Estrategia de Marca", "Rediseño Web", "Generación de Demanda", "Marketing Basado en Cuentas"],
          strategy: "Posiciona tu agencia como la opción premium con una marca y sitio que convierten. La generación de demanda multicanal y las campañas ABM apuntan a cuentas ideales con precisión.",
          outcomes: ["475% crecimiento de leads entrantes", "28% ciclo de ventas más corto", "5.1x ROI de marketing"],
        },
        {
          id: "ecommerce",
          label: "E-Commerce y Retail",
          services: ["SEO de Productos", "Anuncios de Shopping", "Automatización de Email", "CRO"],
          strategy: "El SEO a nivel de producto y las campañas de shopping atraen compradores calificados. Los flujos automatizados de email recuperan carritos abandonados y aumentan las compras recurrentes.",
          outcomes: ["320% crecimiento de ingresos", "2.8x ROAS en anuncios de shopping", "35% tasa de recuperación de carritos"],
        },
        {
          id: "professional",
          label: "Servicios Profesionales",
          services: ["SEO de Autoridad", "Anuncios de LinkedIn", "Lead Magnets", "Integración CRM"],
          strategy: "El contenido de liderazgo de pensamiento establece experiencia mientras LinkedIn y la búsqueda capturan tomadores de decisiones. Los lead magnets y secuencias de nutrición convierten prospectos en clientes de alto valor.",
          outcomes: ["$2.4M pipeline generado", "34% tasa de cierre", "12 leads calificados/mes"],
        },
        {
          id: "healthcare",
          label: "Salud y Medicina",
          services: ["SEO Médico", "Landing Pages de Pacientes", "Gestión de Reputación", "Marketing de Contenidos"],
          strategy: "Genera confianza a través de contenido educativo y cumplimiento normativo con visibilidad local. Las landing pages enfocadas en pacientes y sistemas de reseñas convierten buscadores de alta intención en citas.",
          outcomes: ["180+ pacientes nuevos/mes", "4.1x crecimiento de leads orgánicos", "92% tasa de reseñas positivas"],
        },
        {
          id: "skilled-trades",
          label: "Oficios Especializados",
          services: ["SEO Local", "Landing Pages de Servicios", "Google Ads", "Gestión de Reseñas"],
          strategy: "Captura intención de emergencia y estacional a través de SEO geo-dirigido y anuncios de servicios locales. Landing pages de alta conversión con precios en tiempo real convierten buscadores en trabajos agendados.",
          outcomes: ["250+ llamadas de servicio/mes", "3.2x ROAS en anuncios", "Top 3 en paquete local"],
        },
      ],
    },
    cta: {
      title: "¿No estás seguro de qué servicio encaja?",
      subtitle: "Diagnosticaremos tus cuellos de botella de crecimiento y recomendaremos|el punto de partida exacto para tu negocio.",
      button: "Reservar una Llamada Estratégica Gratuita",
    },
  },};
