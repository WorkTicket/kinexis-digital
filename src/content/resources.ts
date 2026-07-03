import type { Locale } from "@/i18n/routing";

export type ResourceBadge = "Free" | "Free + Paid" | "Paid";

export type Resource = {
  name: string;
  description: string;
  badge: ResourceBadge;
  url: string;
};

export type ResourceCategory = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  resources: Resource[];
};

// Within each category resources are ordered: Free → Free + Paid → Paid
export const resourceCategories: ResourceCategory[] = [
  {
    id: "seo",
    label: "SEO Tools",
    title: "Search Engine Optimization",
    subtitle: "See how Google views your site and where you actually rank.",
    resources: [
      {
        name: "Google Search Console",
        description:
          "See which searches bring people to your site, fix crawl errors, submit sitemaps, and track how you show up in Google.",
        badge: "Free",
        url: "https://search.google.com/search-console",
      },
      {
        name: "Google Trends",
        description:
          "Check what's trending in search, spot seasonal spikes, and test keyword ideas before you spend time on content.",
        badge: "Free",
        url: "https://trends.google.com",
      },
      {
        name: "Screaming Frog",
        description:
          "Desktop crawler that finds broken links, duplicate pages, missing tags, and messy redirect chains.",
        badge: "Free + Paid",
        url: "https://www.screamingfrog.co.uk/seo-spider",
      },
      {
        name: "Ahrefs",
        description:
          "Keyword research, backlink checks, competitor gaps, and site audits. The tool most SEO teams reach for first.",
        badge: "Paid",
        url: "https://ahrefs.com",
      },
    ],
  },
  {
    id: "ppc",
    label: "PPC Tools",
    title: "Paid Advertising",
    subtitle: "Run and track paid campaigns on the platforms that actually drive leads.",
    resources: [
      {
        name: "Meta Business Suite",
        description:
          "Run Facebook and Instagram ads, manage audiences, and review creative performance from one dashboard.",
        badge: "Free",
        url: "https://business.facebook.com",
      },
      {
        name: "Google Keyword Planner",
        description:
          "Free keyword research inside Google Ads. Check search volume, competition, and bid estimates before you spend.",
        badge: "Free",
        url: "https://ads.google.com/home/tools/keyword-planner",
      },
      {
        name: "Google Ads",
        description:
          "Search ads on Google: text, shopping, display, and Performance Max. Good when people are already looking for what you sell.",
        badge: "Paid",
        url: "https://ads.google.com",
      },
      {
        name: "Microsoft Advertising",
        description:
          "Search ads on Bing, Yahoo, and DuckDuckGo. Often cheaper clicks than Google, with a different audience mix.",
        badge: "Paid",
        url: "https://ads.microsoft.com",
      },
    ],
  },
  {
    id: "analytics",
    label: "Analytics Tools",
    title: "Data & Analytics",
    subtitle: "Track traffic, behavior, and conversions without guessing what worked.",
    resources: [
      {
        name: "Google Analytics 4",
        description:
          "Track what people do on your site, set up conversion events, and tie ad spend back to revenue.",
        badge: "Free",
        url: "https://analytics.google.com",
      },
      {
        name: "Google Tag Manager",
        description:
          "Add tracking pixels, conversion tags, and custom scripts without editing site code every time something changes.",
        badge: "Free",
        url: "https://tagmanager.google.com",
      },
      {
        name: "Hotjar",
        description:
          "Heatmaps and session recordings that show how real visitors scroll, click, and move through your pages.",
        badge: "Free + Paid",
        url: "https://www.hotjar.com",
      },
    ],
  },
  {
    id: "performance",
    label: "Website Performance Tools",
    title: "Site Speed & Core Web Vitals",
    subtitle: "Slow pages lose rankings and conversions. These tools show you what's dragging.",
    resources: [
      {
        name: "Google PageSpeed Insights",
        description:
          "Check Core Web Vitals (LCP, CLS, INP) with real Chrome data and get specific fix suggestions.",
        badge: "Free",
        url: "https://pagespeed.web.dev",
      },
      {
        name: "web.dev Measure",
        description:
          "Run a full Lighthouse audit for performance, accessibility, best practices, and SEO in one go.",
        badge: "Free",
        url: "https://web.dev/measure",
      },
      {
        name: "GTmetrix",
        description:
          "Waterfall charts, speed grades, and history over time. Helpful when you're trying to find what's slowing a page down.",
        badge: "Free + Paid",
        url: "https://gtmetrix.com",
      },
    ],
  },
  {
    id: "local",
    label: "Local SEO Tools",
    title: "Local Search & Maps",
    subtitle: "Get found in Google Maps and local search where your customers are looking.",
    resources: [
      {
        name: "Google Business Profile",
        description:
          "Your Google Maps listing. Manage your profile, collect reviews, post updates, and show up in local results.",
        badge: "Free",
        url: "https://business.google.com",
      },
      {
        name: "Whitespark",
        description:
          "Find local citation gaps and manage reputation. Useful if you have multiple locations to keep consistent.",
        badge: "Free + Paid",
        url: "https://whitespark.ca",
      },
      {
        name: "BrightLocal",
        description:
          "Track local rankings, manage citations, watch reviews, and run local audits across several locations.",
        badge: "Paid",
        url: "https://www.brightlocal.com",
      },
    ],
  },
];

export const resourcesPageMeta = {
  heroTag: "Marketing Toolkit",
  heroTitle: "THE TOOLS WE USE.",
  heroTitleHighlight: "AND RECOMMEND.",
  heroSubtitle:
    "Platforms we run campaigns on every day, grouped by what they do.|No sponsored links. Just stuff that works.",
  heroCtaLabel: "Book a Strategy Call",
  heroSecondaryCtaLabel: "Browse our services",
  heroSecondaryCtaHref: "/services",
  introTitle: "Built for marketers who|want to measure everything.",
  introBody:
    "We use these tools daily for our own work and for clients. Each one is here because it gives you numbers you can act on, not dashboard filler.",
  stats: [
    { value: "5", label: "Categories" },
    { value: "17", label: "Tools We Use" },
    { value: "100%", label: "Free Options Included" },
  ],
  ctaTitle: "Need help getting these set up?",
  ctaSubtitle:
    "Tools only matter if they're wired into how you run campaigns.|We help you build that.",
  ctaLabel: "Book a Strategy Call",
  metaDescription:
    "Platforms we run campaigns on every day, grouped by SEO, ads, analytics, and CRO. No sponsored links — just the tools we use with clients and recommend without affiliate bias.",
};

export type ResourcesPageMeta = typeof resourcesPageMeta & {
  metaDescription: string;
};

export type KinexisGuide = {
  title: string;
  description: string;
  href: string;
};

export type ResourcesContent = {
  meta: ResourcesPageMeta;
  categories: ResourceCategory[];
  guides: KinexisGuide[];
  guidesTitle: string;
  guidesSubtitle: string;
  introLabel: string;
  keyLabel: string;
  categoryNavLabel: string;
  badgeLabels: Record<ResourceBadge, string>;
  visitToolLabel: string;
};

const kinexisGuidesEn: KinexisGuide[] = [
  { title: "Local SEO Checklist", description: "Step-by-step local SEO audit for service businesses.", href: "/blog/local-seo-checklist" },
  { title: "SEO Audit Framework", description: "How we prioritize technical fixes by revenue impact.", href: "/blog/seo-audit-framework" },
  { title: "Google Ads vs SEO", description: "When to invest in paid search vs organic.", href: "/google-ads-vs-seo" },
  { title: "Landing Page Best Practices", description: "What converts on paid traffic landing pages.", href: "/blog/landing-page-best-practices" },
  { title: "A/B Testing Framework", description: "How we run conversion tests without breaking tracking.", href: "/blog/ab-testing-framework" },
  { title: "SEO Pricing Guide", description: "What SEO actually costs and what you should get.", href: "/pricing/seo" },
];

const resourcesContentEn: ResourcesContent = {
  meta: resourcesPageMeta,
  categories: resourceCategories,
  guides: kinexisGuidesEn,
  guidesTitle: "KINEXIS guides",
  guidesSubtitle: "Original frameworks and checklists from our client work, not recycled listicles.",
  introLabel: "Our Toolkit",
  keyLabel: "Key:",
  categoryNavLabel: "Jump to category",
  badgeLabels: {
    Free: "Free",
    "Free + Paid": "Free + Paid",
    Paid: "Paid",
  },
  visitToolLabel: "Visit Tool",
};

const resourceCategoriesEs: ResourceCategory[] = [
  {
    id: "seo",
    label: "Herramientas SEO",
    title: "Optimización en Motores de Búsqueda",
    subtitle: "Entiende cómo Google ve tu sitio y dónde estás posicionando realmente.",
    resources: [
      {
        name: "Google Search Console",
        description:
          "Ve qué búsquedas traen gente a tu sitio, corrige errores de rastreo, envía sitemaps y revisa cómo apareces en Google.",
        badge: "Free",
        url: "https://search.google.com/search-console",
      },
      {
        name: "Google Trends",
        description:
          "Revisa tendencias de búsqueda, detecta picos estacionales y prueba ideas de keywords antes de invertir en contenido.",
        badge: "Free",
        url: "https://trends.google.com",
      },
      {
        name: "Screaming Frog",
        description:
          "Rastreador de escritorio que encuentra enlaces rotos, páginas duplicadas, tags faltantes y cadenas de redirección desordenadas.",
        badge: "Free + Paid",
        url: "https://www.screamingfrog.co.uk/seo-spider",
      },
      {
        name: "Ahrefs",
        description:
          "Investigación de keywords, backlinks, brechas vs. competidores y auditorías. La herramienta que la mayoría de equipos SEO usa primero.",
        badge: "Paid",
        url: "https://ahrefs.com",
      },
    ],
  },
  {
    id: "ppc",
    label: "Herramientas PPC",
    title: "Publicidad Pagada",
    subtitle: "Gestiona y revisa campañas pagadas en las plataformas que realmente generan leads.",
    resources: [
      {
        name: "Meta Business Suite",
        description:
          "Anuncios en Facebook e Instagram, gestión de audiencias y revisión de creativos desde un solo panel.",
        badge: "Free",
        url: "https://business.facebook.com",
      },
      {
        name: "Google Keyword Planner",
        description:
          "Investigación de keywords gratis dentro de Google Ads. Revisa volumen, competencia y estimaciones de puja antes de gastar.",
        badge: "Free",
        url: "https://ads.google.com/home/tools/keyword-planner",
      },
      {
        name: "Google Ads",
        description:
          "Anuncios de búsqueda en Google: texto, shopping, display y Performance Max. Bueno cuando la gente ya busca lo que vendes.",
        badge: "Paid",
        url: "https://ads.google.com",
      },
      {
        name: "Microsoft Advertising",
        description:
          "Anuncios de búsqueda en Bing, Yahoo y DuckDuckGo. Clicks más baratos que Google, con una audiencia distinta.",
        badge: "Paid",
        url: "https://ads.microsoft.com",
      },
    ],
  },
  {
    id: "analytics",
    label: "Herramientas de Analítica",
    title: "Datos y Analítica",
    subtitle: "Mide tráfico, comportamiento y conversiones sin adivinar qué funcionó.",
    resources: [
      {
        name: "Google Analytics 4",
        description:
          "Rastrea lo que hace la gente en tu sitio, configura eventos de conversión y conecta gasto publicitario con ingresos.",
        badge: "Free",
        url: "https://analytics.google.com",
      },
      {
        name: "Google Tag Manager",
        description:
          "Agrega pixels, tags de conversión y scripts personalizados sin editar código del sitio cada vez que algo cambia.",
        badge: "Free",
        url: "https://tagmanager.google.com",
      },
      {
        name: "Hotjar",
        description:
          "Heatmaps y grabaciones que muestran cómo los visitantes hacen scroll, clic y se mueven por tus páginas.",
        badge: "Free + Paid",
        url: "https://www.hotjar.com",
      },
    ],
  },
  {
    id: "performance",
    label: "Herramientas de Rendimiento Web",
    title: "Velocidad del Sitio y Core Web Vitals",
    subtitle: "Las páginas lentas pierden posiciones y conversiones. Estas herramientas muestran qué las frena.",
    resources: [
      {
        name: "Google PageSpeed Insights",
        description:
          "Revisa Core Web Vitals (LCP, CLS, INP) con datos reales de Chrome y obtén sugerencias concretas de mejora.",
        badge: "Free",
        url: "https://pagespeed.web.dev",
      },
      {
        name: "web.dev Measure",
        description:
          "Auditoría Lighthouse completa de rendimiento, accesibilidad, buenas prácticas y SEO de una sola vez.",
        badge: "Free",
        url: "https://web.dev/measure",
      },
      {
        name: "GTmetrix",
        description:
          "Waterfall charts, calificaciones de velocidad e historial. Útil cuando buscas qué está haciendo lenta una página.",
        badge: "Free + Paid",
        url: "https://gtmetrix.com",
      },
    ],
  },
  {
    id: "local",
    label: "Herramientas SEO Local",
    title: "Búsqueda Local y Maps",
    subtitle: "Aparece en Google Maps y búsqueda local donde tus clientes están buscando.",
    resources: [
      {
        name: "Google Business Profile",
        description:
          "Tu ficha en Google Maps. Gestiona tu perfil, recopila reseñas, publica actualizaciones y aparece en resultados locales.",
        badge: "Free",
        url: "https://business.google.com",
      },
      {
        name: "Whitespark",
        description:
          "Encuentra brechas en citas locales y gestiona reputación. Útil si tienes varias ubicaciones que mantener consistentes.",
        badge: "Free + Paid",
        url: "https://whitespark.ca",
      },
      {
        name: "BrightLocal",
        description:
          "Rastrea rankings locales, gestiona citas, revisa reseñas y ejecuta auditorías locales en varias ubicaciones.",
        badge: "Paid",
        url: "https://www.brightlocal.com",
      },
    ],
  },
];

const resourcesPageMetaEs: ResourcesPageMeta = {
  heroTag: "Kit de Marketing",
  heroTitle: "LAS HERRAMIENTAS QUE USAMOS.",
  heroTitleHighlight: "Y RECOMENDAMOS.",
  heroSubtitle:
    "Plataformas con las que trabajamos cada día, agrupadas por función.|Sin enlaces patrocinados. Solo cosas que funcionan.",
  heroCtaLabel: "Reservar una Llamada Estratégica",
  heroSecondaryCtaLabel: "Ver Nuestros Servicios",
  heroSecondaryCtaHref: "/services",
  introTitle: "Hecho para marketers que|quieren medir todo.",
  introBody:
    "Usamos estas herramientas a diario en nuestro trabajo y con clientes. Cada una está aquí porque te da números con los que puedes actuar, no relleno en el dashboard.",
  stats: [
    { value: "5", label: "Categorías" },
    { value: "17", label: "Herramientas que Usamos" },
    { value: "100%", label: "Opciones Gratis Incluidas" },
  ],
  ctaTitle: "¿Necesitas ayuda para configurarlas?",
  ctaSubtitle:
    "Las herramientas solo importan si están conectadas a cómo gestionas campañas.|Te ayudamos a construir eso.",
  ctaLabel: "Reservar una Llamada Estratégica",
  metaDescription:
    "Plataformas con las que trabajamos cada día en SEO, anuncios, analítica y CRO. Sin enlaces patrocinados — solo herramientas que usamos con clientes y recomendamos sin afiliados.",
};

const resourcesContentEs: ResourcesContent = {
  meta: resourcesPageMetaEs,
  categories: resourceCategoriesEs,
  guides: [
    { title: "Checklist SEO Local", description: "Auditoría paso a paso para negocios locales.", href: "/blog/local-seo-checklist" },
    { title: "Marco de Auditoría SEO", description: "Cómo priorizamos correcciones técnicas.", href: "/blog/seo-audit-framework" },
    { title: "Google Ads vs SEO", description: "Cuándo invertir en pagado vs orgánico.", href: "/google-ads-vs-seo" },
  ],
  guidesTitle: "Guías KINEXIS",
  guidesSubtitle: "Marcos y checklists originales de nuestro trabajo con clientes.",
  introLabel: "Nuestro Kit",
  keyLabel: "Clave:",
  categoryNavLabel: "Ir a categoría",
  badgeLabels: {
    Free: "Gratis",
    "Free + Paid": "Gratis + Pago",
    Paid: "Pago",
  },
  visitToolLabel: "Visitar Herramienta",
};

export const resourcesContent: Record<Locale, ResourcesContent> = {
  en: resourcesContentEn,
  es: resourcesContentEs,
};
