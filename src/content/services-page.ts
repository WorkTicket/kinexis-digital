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
  { id: "seo", label: "SEO", description: "Technical foundations, authority content, and link building that keeps paying off over time.", stat: "+340% traffic · Landscaping Co." },
  { id: "paidAds", label: "Paid Ads", description: "Google and Meta campaigns built for ROAS, not vanity metrics.", stat: "+340% patients · Dental Practice" },
  { id: "webDesign", label: "Web Design", description: "Custom, conversion-optimized sites built to turn visitors into qualified leads.", stat: "+425% conv. · client rebuild" },
  { id: "funnels", label: "Funnels & CRO", description: "Full conversion systems: funnel architecture, landing pages, nurture automation, and A/B testing that compounds revenue.", stat: "1.8% → 6.3% conv. · E-Commerce" },
  { id: "email", label: "Email Marketing", description: "Automated nurture sequences that turn one-time buyers into repeat revenue.", stat: "42% open rate · lifecycle flows" },
  { id: "branding", label: "Branding", description: "Positioning and visual identity that command trust and recognition.", stat: "3x brand recall · repositioning" },
  { id: "content", label: "Content Marketing", description: "Authority-building content that answers what your buyers are searching for.", stat: "+420% traffic · SaaS client" },
  { id: "social", label: "Social Media", description: "Platform-native content and paid social that builds audience and demand.", stat: "5.2x engagement · paid social" },
  { id: "video", label: "Video Marketing", description: "Short-form and long-form video that educates, converts, and retargets.", stat: "68% higher retention · ad creative" },
  { id: "analytics", label: "Analytics", description: "Full-funnel tracking and reporting so every decision is data-backed.", stat: "Full-funnel attribution setup" },
  { id: "consulting", label: "Growth Consulting", description: "Strategic roadmaps, audits, and fractional advisory aligned to revenue goals.", stat: "4X MRR · SaaS Analytics client" },
];

const enPathways: PathwayContent[] = [
  {
    id: "seo",
    label: "SEO",
    headline: "Show up in search.",
    description: "We build steady growth through technical foundations, authority content, and link building. Rankings are assets that appreciate over time.",
    results: ["+340% traffic · Landscaping Co.", "27 positions gained · 6 mo", "180% lead conv. · same client"],
    exploreLink: "Explore SEO Strategy",
  },
  {
    id: "webDesign",
    label: "Web Design",
    headline: "Websites that convert.",
    description: "Custom-built, conversion-optimized websites that feel like premium SaaS platforms. Every pixel serves a revenue goal.",
    results: ["425% conversion lift · rebuild", "3.8x mobile engagement", "215% time on site increase"],
    exploreLink: "Explore Web Design Strategy",
  },
  {
    id: "paidAds",
    label: "Paid Ads",
    headline: "Every dollar tuned for ROAS.",
    description: "Google and Meta campaigns built to convert intent into booked calls. We optimize every dollar toward measurable revenue.",
    results: ["+340% patients · Dental Practice", "45% CPL reduction · campaigns", "120% conversion lift · landing pages"],
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
    outcomes: ["65% trial conversion lift", "40% CAC reduction", "2.5x pipeline growth"],
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
    outcomes: ["250+ service calls/mo", "3.2x ROAS on ads", "Top 3 local pack rankings"],
  },
];

export const servicesPageContent: Record<Locale, ServicesPageContent> = {
  en: {
    hero: {
      label: "Digital Marketing Services",
      headlineLine1: "One system.",
      headlineLine2: "Twelve channels.",
      subtitle: "SEO, paid media, web design, and conversion systems,|built to work together as one connected program, not a disconnected list of tactics.",
      ctaLabel: "Book a Strategy Call",
      secondaryCtaLabel: "Explore Services",
    },
    capabilities: {
      title: "Full-service capabilities.",
      subtitle: "Every channel your business needs to acquire, convert,|and retain customers, managed under one growth strategy.",
      services: enServices,
    },
    pathways: {
      sectionLabel: "Deep Dives",
      title: "Each service is a system.",
      subtitle: "Not a tactic. Not a menu item.|Each pathway has its own strategy, its own metrics, and its own lasting effect.",
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
      subtitle: "Premium agencies explain systems. Cheap agencies explain services.|This is how the pieces connect to drive revenue together.",
      phases: enIntegrationPhases,
      footnote: "SEO drives qualified traffic. That traffic lands on high-converting pages. Ads amplify the best performers. Leads flow into the CRM. Email turns one-time buyers into repeat revenue. Every piece feeds the next.",
    },
    industries: {
      sectionLabel: "Industry Solutions",
      title: "Built for your market.",
      subtitle: "Select your industry to see the recommended services,|strategy, and typical outcomes.",
      panelServices: "Services",
      panelStrategy: "Strategy",
      panelOutcomes: "Outcomes",
      viewAllLabel: "View all industries",
      items: enIndustries,
    },
    cta: {
      title: "Not sure which service fits?",
      subtitle: "We'll diagnose your growth bottlenecks and recommend the exact|starting point for your business.",
      button: "Book a Free Strategy Call",
    },
  },
  es: {
    hero: {
      label: "Servicios de Marketing Digital",
      headlineLine1: "Un sistema.",
      headlineLine2: "Doce canales.",
      subtitle: "SEO, medios pagados, diseño web y sistemas de conversión,|diseñados para funcionar juntos como un motor de ingresos, no como una lista desconectada de tácticas.",
      ctaLabel: "Reservar una Llamada Estratégica",
      secondaryCtaLabel: "Explorar Servicios",
    },
    capabilities: {
      title: "Capacidades de servicio completo.",
      subtitle: "Todos los canales que tu negocio necesita para adquirir,|convertir y retener clientes, gestionados bajo una sola estrategia de crecimiento.",
      services: [
        { id: "seo", label: "SEO", description: "Fundamentos técnicos, contenido de autoridad y construcción de enlaces que siguen dando resultados con el tiempo.", stat: "340% aumento promedio de tráfico" },
        { id: "paidAds", label: "Anuncios Pagados", description: "Campañas en Google y Meta hechas para ROAS, no para métricas de vanidad.", stat: "4.5x ROAS promedio" },
        { id: "webDesign", label: "Diseño Web", description: "Sitios personalizados y optimizados para conversión que convierten visitantes en leads calificados.", stat: "425% aumento en conversión" },
        { id: "funnels", label: "Embudos y CRO", description: "Sistemas de conversión completos: arquitectura de embudo, landing pages, automatización de nutrición y pruebas A/B que acumulan ingresos.", stat: "1.8% → 6.3% conv. · E-Commerce" },
        { id: "email", label: "Email Marketing", description: "Secuencias automatizadas de nutrición que convierten compradores únicos en ingresos recurrentes.", stat: "42% tasa de apertura promedio" },
        { id: "branding", label: "Branding", description: "Posicionamiento e identidad visual que generan confianza y reconocimiento.", stat: "3x aumento en recordación de marca" },
        { id: "content", label: "Marketing de Contenidos", description: "Contenido que construye autoridad y responde lo que tus compradores buscan.", stat: "275% crecimiento de tráfico orgánico" },
        { id: "social", label: "Redes Sociales", description: "Contenido nativo de plataforma y social pagado que construye audiencia y demanda.", stat: "5.2x tasa de engagement" },
        { id: "video", label: "Video Marketing", description: "Video corto y largo que educa, convierte y hace retargeting.", stat: "68% mayor retención" },
        { id: "analytics", label: "Analítica", description: "Seguimiento y reportes de embudo completo para que cada decisión esté respaldada por datos.", stat: "100% claridad de atribución" },
        { id: "consulting", label: "Consultoría de Crecimiento", description: "Hojas de ruta estratégicas, auditorías y asesoría fraccional alineadas a objetivos de ingresos.", stat: "3x crecimiento de pipeline" },
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
          results: ["340% aumento promedio de tráfico", "27 posiciones de mejora promedio", "180% aumento en conversión de leads"],
          exploreLink: "Explorar Estrategia de SEO",
        },
        {
          id: "webDesign",
          label: "Diseño Web",
          headline: "Sitios web que convierten.",
          description: "Sitios web personalizados y optimizados para conversión que se sienten como plataformas SaaS premium. Cada píxel sirve a un objetivo de ingresos.",
          results: ["425% aumento en conversión", "3.8x engagement móvil", "215% aumento en tiempo en sitio"],
          exploreLink: "Explorar Estrategia de Diseño Web",
        },
        {
          id: "paidAds",
          label: "Anuncios Pagados",
          headline: "Cada dólar afinado para ROAS.",
          description: "Campañas en Google y Meta construidas para convertir intención en llamadas agendadas. Optimizamos cada dólar hacia ingresos medibles.",
          results: ["4.5x ROAS promedio", "45% reducción de CPL", "120% aumento en conversión"],
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
