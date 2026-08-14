import type { Locale } from "@/i18n/routing";
import { localeContent } from "@/i18n/locale-content";

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
          "See which searches bring people in, fix crawl errors, and track how you show up in Google.",
        badge: "Free",
        url: "https://search.google.com/search-console",
      },
      {
        name: "Google Trends",
        description:
          "Check what's rising in search, spot seasonal spikes, and test keyword ideas before you write.",
        badge: "Free",
        url: "https://trends.google.com",
      },
      {
        name: "Screaming Frog",
        description:
          "Desktop crawler that finds broken links, duplicate pages, missing tags, and messy redirects.",
        badge: "Free + Paid",
        url: "https://www.screamingfrog.co.uk/seo-spider",
      },
      {
        name: "Ahrefs",
        description:
          "Keyword research, backlinks, competitor gaps, and site audits. The paid SEO tool most teams open first.",
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
          "Run Facebook and Instagram ads, manage audiences, and review creative from one dashboard.",
        badge: "Free",
        url: "https://business.facebook.com",
      },
      {
        name: "Google Keyword Planner",
        description:
          "Free keyword research inside Google Ads. Check volume, competition, and bids before you spend.",
        badge: "Free",
        url: "https://ads.google.com/home/tools/keyword-planner",
      },
      {
        name: "Google Ads",
        description:
          "Search, shopping, display, and Performance Max. Strong when people already look for what you sell.",
        badge: "Paid",
        url: "https://ads.google.com",
      },
      {
        name: "Microsoft Advertising",
        description:
          "Search ads on Bing, Yahoo, and DuckDuckGo. Often cheaper clicks than Google, with a different audience.",
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
          "Track what people do on your site, set conversion events, and tie ad spend back to revenue.",
        badge: "Free",
        url: "https://analytics.google.com",
      },
      {
        name: "Google Tag Manager",
        description:
          "Add pixels, conversion tags, and scripts without editing site code every time something changes.",
        badge: "Free",
        url: "https://tagmanager.google.com",
      },
      {
        name: "Hotjar",
        description:
          "Heatmaps and session recordings that show how visitors scroll, click, and move through pages.",
        badge: "Free + Paid",
        url: "https://www.hotjar.com",
      },
    ],
  },
  {
    id: "performance",
    label: "Website Performance Tools",
    title: "Site Speed & Core Web Vitals",
    subtitle: "Slow pages lose rankings and conversions. These tools show what's dragging.",
    resources: [
      {
        name: "Google PageSpeed Insights",
        description:
          "Check Core Web Vitals with real Chrome data and get specific fix suggestions you can ship.",
        badge: "Free",
        url: "https://pagespeed.web.dev",
      },
      {
        name: "web.dev Measure",
        description:
          "Run a Lighthouse audit for performance, accessibility, best practices, and SEO in one pass.",
        badge: "Free",
        url: "https://web.dev/measure",
      },
      {
        name: "GTmetrix",
        description:
          "Waterfall charts, speed grades, and history. Useful when you need to find what's slowing a page.",
        badge: "Free + Paid",
        url: "https://gtmetrix.com",
      },
    ],
  },
  {
    id: "local",
    label: "Local SEO Tools",
    title: "Local Search & Maps",
    subtitle: "Show up in Google Maps and local search where your customers are looking.",
    resources: [
      {
        name: "Google Business Profile",
        description:
          "Your Maps listing. Manage the profile, collect reviews, post updates, and show up locally.",
        badge: "Free",
        url: "https://business.google.com",
      },
      {
        name: "Whitespark",
        description:
          "Find local citation gaps and manage reputation. Useful with several locations to keep consistent.",
        badge: "Free + Paid",
        url: "https://whitespark.ca",
      },
      {
        name: "BrightLocal",
        description:
          "Track local rankings, manage citations, watch reviews, and audit several locations at once.",
        badge: "Paid",
        url: "https://www.brightlocal.com",
      },
    ],
  },
];

export const resourcesPageMeta = {
  heroTag: "Marketing Toolkit",
  heroTitle: "Resources",
  heroTitleHighlight: "worth keeping.",
  heroSubtitle:
    "Platforms we run campaigns on every day, grouped by what they do.|No sponsored links. Just tools that earn their keep.",
  heroCtaLabel: "Book a Strategy Call",
  heroSecondaryCtaLabel: "Browse our services",
  heroSecondaryCtaHref: "/services",
  introTitle: "Tools we trust when the numbers matter.",
  introBody:
    "We use these on client work every day. They're here for numbers you can act on, not dashboard filler.",
  stats: [
    { value: "5", label: "Categories" },
    { value: "17", label: "Tools We Use" },
    { value: "100%", label: "Free Options Included" },
  ],
  ctaTitle: "Need help getting these set up?",
  ctaSubtitle:
    "Tools only matter if they're wired into the work. Book a call and we'll help you set that up.",
  ctaLabel: "Book a Strategy Call",
  metaDescription:
    "Official platform docs plus the SEO, ads, analytics, and performance tools we use with clients. Bookmark this list. No sponsored filler or affiliate junk.",
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
  { title: "SEO Pricing Guide", description: "What SEO actually costs and what you should get.", href: "/blog/seo-pricing-guide" },
];

const resourcesContentEn: ResourcesContent = {
  meta: resourcesPageMeta,
  categories: resourceCategories,
  guides: kinexisGuidesEn,
  guidesTitle: "KINEXIS guides",
  guidesSubtitle: "Frameworks and checklists from real client work, not recycled listicles.",
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
          "Ve qué búsquedas traen gente, corrige errores de rastreo y revisa cómo apareces en Google.",
        badge: "Free",
        url: "https://search.google.com/search-console",
      },
      {
        name: "Google Trends",
        description:
          "Revisa tendencias de búsqueda, detecta picos estacionales y prueba keywords antes de escribir.",
        badge: "Free",
        url: "https://trends.google.com",
      },
      {
        name: "Screaming Frog",
        description:
          "Rastreador de escritorio que encuentra enlaces rotos, páginas duplicadas, tags faltantes y redirects.",
        badge: "Free + Paid",
        url: "https://www.screamingfrog.co.uk/seo-spider",
      },
      {
        name: "Ahrefs",
        description:
          "Keywords, backlinks, brechas vs. competidores y auditorías. La herramienta SEO que la mayoría abre primero.",
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
          "Anuncios en Facebook e Instagram, audiencias y revisión de creativos desde un solo panel.",
        badge: "Free",
        url: "https://business.facebook.com",
      },
      {
        name: "Google Keyword Planner",
        description:
          "Investigación de keywords gratis en Google Ads. Revisa volumen, competencia y pujas antes de gastar.",
        badge: "Free",
        url: "https://ads.google.com/home/tools/keyword-planner",
      },
      {
        name: "Google Ads",
        description:
          "Búsqueda, shopping, display y Performance Max. Útil cuando la gente ya busca lo que vendes.",
        badge: "Paid",
        url: "https://ads.google.com",
      },
      {
        name: "Microsoft Advertising",
        description:
          "Anuncios en Bing, Yahoo y DuckDuckGo. Clicks más baratos que Google, con otra audiencia.",
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
          "Rastrea lo que hace la gente en tu sitio, configura conversiones y conecta el gasto con ingresos.",
        badge: "Free",
        url: "https://analytics.google.com",
      },
      {
        name: "Google Tag Manager",
        description:
          "Agrega pixels, tags de conversión y scripts sin editar código del sitio cada vez que algo cambia.",
        badge: "Free",
        url: "https://tagmanager.google.com",
      },
      {
        name: "Hotjar",
        description:
          "Heatmaps y grabaciones que muestran cómo los visitantes hacen scroll, clic y se mueven.",
        badge: "Free + Paid",
        url: "https://www.hotjar.com",
      },
    ],
  },
  {
    id: "performance",
    label: "Herramientas de Rendimiento Web",
    title: "Velocidad del Sitio y Core Web Vitals",
    subtitle: "Las páginas lentas pierden posiciones y conversiones. Estas herramientas muestran qué frena.",
    resources: [
      {
        name: "Google PageSpeed Insights",
        description:
          "Revisa Core Web Vitals con datos reales de Chrome y obtén sugerencias concretas de mejora.",
        badge: "Free",
        url: "https://pagespeed.web.dev",
      },
      {
        name: "web.dev Measure",
        description:
          "Auditoría Lighthouse de rendimiento, accesibilidad, buenas prácticas y SEO de una sola vez.",
        badge: "Free",
        url: "https://web.dev/measure",
      },
      {
        name: "GTmetrix",
        description:
          "Waterfall charts, calificaciones de velocidad e historial. Útil para ver qué frena una página.",
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
          "Tu ficha en Maps. Gestiona el perfil, recopila reseñas, publica updates y aparece en local.",
        badge: "Free",
        url: "https://business.google.com",
      },
      {
        name: "Whitespark",
        description:
          "Encuentra brechas en citaciones locales y gestiona reputación. Útil con varias ubicaciones.",
        badge: "Free + Paid",
        url: "https://whitespark.ca",
      },
      {
        name: "BrightLocal",
        description:
          "Rastrea rankings locales, gestiona citaciones, revisa reseñas y audita varias ubicaciones.",
        badge: "Paid",
        url: "https://www.brightlocal.com",
      },
    ],
  },
];

const resourcesPageMetaEs: ResourcesPageMeta = {
  heroTag: "Kit de marketing",
  heroTitle: "Recursos",
  heroTitleHighlight: "útiles.",
  heroSubtitle:
    "Plataformas con las que gestionamos campañas cada día, agrupadas por lo que hacen.|Sin enlaces patrocinados. Solo herramientas que se ganan el sitio.",
  heroCtaLabel: "Reservar una llamada estratégica",
  heroSecondaryCtaLabel: "Ver nuestros servicios",
  heroSecondaryCtaHref: "/services",
  introTitle: "Herramientas en las que confiamos cuando los números importan.",
  introBody:
    "Las usamos a diario con clientes. Cada una está aquí por cifras con las que puedes actuar, no relleno.",
  stats: [
    { value: "5", label: "Categorías" },
    { value: "17", label: "Herramientas que usamos" },
    { value: "100%", label: "Opciones gratis incluidas" },
  ],
  ctaTitle: "¿Necesitas ayuda para montarlas?",
  ctaSubtitle:
    "Las herramientas solo importan si están conectadas al trabajo. Reserva una llamada y te ayudamos a montarlo.",
  ctaLabel: "Reservar una llamada estratégica",
  metaDescription:
    "Documentación oficial más las herramientas de SEO, anuncios, analítica y rendimiento que usamos con clientes. Guarda esta lista. Sin relleno patrocinado ni afiliados.",
};

const kinexisGuidesEs: KinexisGuide[] = [
  { title: "Checklist de SEO local", description: "Auditoría local paso a paso para negocios de servicios.", href: "/blog/local-seo-checklist" },
  { title: "Marco de auditoría SEO", description: "Cómo priorizamos correcciones técnicas según el impacto en ingresos.", href: "/blog/seo-audit-framework" },
  { title: "Google Ads vs SEO", description: "Cuándo invertir en búsqueda de pago frente a orgánica.", href: "/google-ads-vs-seo" },
  { title: "Buenas prácticas de landing", description: "Qué convierte en landings de tráfico de pago.", href: "/blog/landing-page-best-practices" },
  { title: "Marco de pruebas A/B", description: "Cómo hacemos tests de conversión sin romper el tracking.", href: "/blog/ab-testing-framework" },
  { title: "Guía de precios de SEO", description: "Cuánto cuesta el SEO de verdad y qué deberías recibir.", href: "/blog/seo-pricing-guide" },
];

const resourcesContentEs: ResourcesContent = {
  meta: resourcesPageMetaEs,
  categories: resourceCategoriesEs,
  guides: kinexisGuidesEs,
  guidesTitle: "Guías KINEXIS",
  guidesSubtitle: "Marcos y checklists del trabajo real con clientes, no listicles reciclados.",
  introLabel: "Nuestro kit",
  keyLabel: "Clave:",
  categoryNavLabel: "Ir a categoría",
  badgeLabels: {
    Free: "Gratis",
    "Free + Paid": "Gratis + Pago",
    Paid: "Pago",
  },
  visitToolLabel: "Visitar herramienta",
};

export const resourcesContent = localeContent({
  en: resourcesContentEn,
  "es-419": resourcesContentEs,
});

export function getResourcesContent(locale: Locale): ResourcesContent {
  return resourcesContent[locale] ?? resourcesContent.en;
}
