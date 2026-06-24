import type { Locale } from "@/i18n/routing";
import type { ComparisonSlug } from "@/content/registry/site-routes";
import type { FAQItem } from "@/components/sections/FAQSection";
import type { ComparisonColumn, ComparisonRow } from "@/content/service-seo/types";

export type ComparisonPageContent = {
  metaTitle: string;
  metaDescription: string;
  hero: { label: string; line1: string; line2: string; subtitle: string };
  answerBlock: string;
  sections: { title: string; body: string }[];
  table: { title: string; subtitle: string; columns: ComparisonColumn[]; rows: ComparisonRow[] };
  faqs: FAQItem[];
  relatedLinks: { href: string; label: string }[];
  ctaHeadline: string;
  ctaSubtitle: string;
  ctaLabel: string;
};

export const comparisonContent: Record<ComparisonSlug, Record<Locale, ComparisonPageContent>> = {
  "google-ads-vs-seo": {
    en: {
      metaTitle: "Google Ads vs SEO | Which Channel Wins for Your Business?",
      metaDescription: "Compare Google Ads and SEO for lead generation. Timeline, cost, and when to use each channel based on real client data.",
      hero: { label: "Google Ads vs SEO", line1: "Google Ads vs SEO:", line2: "Which Fits Your Business?", subtitle: "Both channels work. The right mix depends on your timeline, budget, and how competitive your market is." },
      answerBlock: "Google Ads delivers traffic within days but stops when you stop paying. SEO takes 3 to 6 months to build momentum but compounds over time. Most service businesses run both: Ads for immediate leads while SEO builds long-term visibility. Average Google Ads CPL for home services clients we manage runs $35 to $85. SEO cost per lead often drops below $20 by month 8 once rankings hold.",
      sections: [
        { title: "When Google Ads makes more sense", body: "You need leads this month. You are launching a new service or entering a new market. Your organic visibility is zero and you cannot wait 6 months. You have a proven offer and landing page ready to convert paid traffic." },
        { title: "When SEO makes more sense", body: "You want leads that do not disappear when ad spend pauses. Your market has steady search volume for your services. You are building a brand that prospects research before buying. You can invest 4 to 6 months before expecting consistent returns." },
        { title: "The combination most clients use", body: "We often start with Google Ads to generate data on which keywords convert, then build SEO content around those same terms. Retargeting captures visitors who found you organically but did not convert. Over 12 months, SEO typically takes a larger share of total leads while Ads handle seasonal spikes." },
      ],
      table: {
        title: "Google Ads vs SEO at a glance",
        subtitle: "Typical patterns for service businesses in competitive markets.",
        columns: [{ header: "Google Ads" }, { header: "SEO", highlight: true }],
        rows: [
          { label: "Time to first leads", values: ["Days", "3 to 6 months"] },
          { label: "Cost when you pause", values: ["Leads stop immediately", "Traffic continues"] },
          { label: "Typical monthly investment", values: ["$3K to $15K ad spend + mgmt", "$2.5K to $8K retainer"] },
          { label: "Best for", values: ["Immediate demand capture", "Long-term asset building"] },
          { label: "Tracking clarity", values: ["Very direct", "Requires attribution setup"] },
        ],
      },
      faqs: [
        { question: "Can I do SEO and Google Ads at the same time?", answer: "Yes, and most of our clients do. Ads fill the pipeline while SEO builds. Data from Ads also tells us which keywords deserve SEO investment." },
        { question: "Which is cheaper long term?", answer: "SEO usually wins on cost per lead after 8 to 12 months if you stay consistent. Ads win on speed and predictability in the short term." },
      ],
      relatedLinks: [
        { href: "/services/google-ads", label: "Google Ads Management" },
        { href: "/services/seo", label: "SEO Services" },
        { href: "/pricing/google-ads", label: "Google Ads Pricing" },
      ],
      ctaHeadline: "Not sure which channel to start with?",
      ctaSubtitle: "We will look at your market and recommend a realistic mix.|No pitch deck. Just a clear plan.",
      ctaLabel: "Book a Strategy Call",
    },
    es: {
      metaTitle: "Google Ads vs SEO | ¿Qué Canal Conviene?",
      metaDescription: "Compara Google Ads y SEO para generación de leads.",
      hero: { label: "Google Ads vs SEO", line1: "Google Ads vs SEO:", line2: "¿Cuál Encaja Contigo?", subtitle: "Ambos funcionan. La mezcla correcta depende de tu timeline y presupuesto." },
      answerBlock: "Google Ads entrega tráfico en días pero se detiene cuando dejas de pagar. SEO toma 3 a 6 meses pero se acumula con el tiempo.",
      sections: [{ title: "Cuándo conviene Google Ads", body: "Necesitas leads este mes o estás lanzando un servicio nuevo." }],
      table: { title: "Comparación rápida", subtitle: "Patrones típicos.", columns: [{ header: "Google Ads" }, { header: "SEO", highlight: true }], rows: [{ label: "Tiempo a primeros leads", values: ["Días", "3 a 6 meses"] }] },
      faqs: [{ question: "¿Puedo hacer ambos?", answer: "Sí. La mayoría de nuestros clientes lo hace." }],
      relatedLinks: [{ href: "/services/google-ads", label: "Google Ads" }, { href: "/services/seo", label: "SEO" }],
      ctaHeadline: "¿No sabes por dónde empezar?", ctaSubtitle: "Revisamos tu mercado y recomendamos.", ctaLabel: "Agenda una Llamada",
    },
  },
  "seo-vs-ppc": {
    en: {
      metaTitle: "SEO vs PPC | Paid vs Organic for B2B Lead Generation",
      metaDescription: "SEO vs PPC compared for B2B and service businesses. Cost, timeline, and channel mix recommendations.",
      hero: { label: "SEO vs PPC", line1: "SEO vs PPC:", line2: "Paid or Organic?", subtitle: "The question is not either/or. It is how much of each, and in what order." },
      answerBlock: "PPC (pay-per-click) covers Google Ads, Meta Ads, and other paid channels. SEO builds organic rankings. PPC gives instant visibility at a per-click cost. SEO requires upfront work but lowers acquisition cost over time. For B2B services with 30 to 90 day sales cycles, we typically weight SEO toward bottom-funnel terms and use PPC for high-intent branded and competitor terms.",
      sections: [
        { title: "PPC strengths", body: "Instant testing of offers and landing pages. Precise budget control. Easy to scale up or down by season." },
        { title: "SEO strengths", body: "Trust from organic rankings. Lower marginal cost per lead over time. Visibility in AI summaries and featured snippets when content is structured well." },
      ],
      table: {
        title: "SEO vs PPC comparison",
        subtitle: "How the channels differ in practice.",
        columns: [{ header: "PPC" }, { header: "SEO", highlight: true }],
        rows: [
          { label: "Budget flexibility", values: ["Daily adjustments", "Monthly retainer"] },
          { label: "Competitive moat", values: ["Low (anyone can bid)", "High (hard to displace)"] },
          { label: "Content required", values: ["Landing pages", "Full site + blog"] },
        ],
      },
      faqs: [{ question: "Should a new business start with PPC or SEO?", answer: "If cash flow depends on leads now, start PPC. If you have 6 months of runway, prioritize SEO foundation while running a small test budget on Ads." }],
      relatedLinks: [{ href: "/services/ppc-management", label: "PPC Management" }, { href: "/services/seo", label: "SEO Services" }],
      ctaHeadline: "Want a channel mix recommendation?", ctaSubtitle: "We will map PPC and SEO against your goals.", ctaLabel: "Talk to Our Team",
    },
    es: {
      metaTitle: "SEO vs PPC | Orgánico vs Pagado",
      metaDescription: "Comparación SEO vs PPC para negocios B2B.",
      hero: { label: "SEO vs PPC", line1: "SEO vs PPC:", line2: "¿Pagado u Orgánico?", subtitle: "La pregunta es cuánto de cada uno y en qué orden." },
      answerBlock: "PPC cubre Google Ads, Meta Ads y otros canales pagados. SEO construye rankings orgánicos.",
      sections: [{ title: "Fortalezas PPC", body: "Pruebas instantáneas y control de presupuesto." }],
      table: { title: "Comparación", subtitle: "Diferencias en la práctica.", columns: [{ header: "PPC" }, { header: "SEO", highlight: true }], rows: [{ label: "Flexibilidad", values: ["Ajustes diarios", "Retainer mensual"] }] },
      faqs: [{ question: "¿Por dónde empieza un negocio nuevo?", answer: "Si necesitas leads ya, empieza con PPC." }],
      relatedLinks: [{ href: "/services/ppc-management", label: "PPC" }],
      ctaHeadline: "¿Quieres una recomendación?", ctaSubtitle: "Mapeamos PPC y SEO.", ctaLabel: "Habla con Nosotros",
    },
  },
  "wordpress-vs-webflow": {
    en: {
      metaTitle: "WordPress vs Webflow | Which Platform for Your Business Site?",
      metaDescription: "WordPress vs Webflow compared for business websites. Speed, maintenance, SEO, and when we recommend each.",
      hero: { label: "WordPress vs Webflow", line1: "WordPress vs Webflow:", line2: "Pick the Right Stack.", subtitle: "Both can work. The wrong choice costs you speed, security headaches, or editing flexibility." },
      answerBlock: "WordPress powers about 43% of the web and fits teams that need plugins, custom PHP, or complex content workflows. Webflow suits marketing-led teams that want visual control, fast hosting, and clean code without plugin bloat. We build in both, plus Next.js for apps and high-performance marketing sites. Typical Webflow business sites launch in 6 to 8 weeks. WordPress rebuilds often take 8 to 12 weeks when migrating legacy plugin stacks.",
      sections: [
        { title: "Choose WordPress when", body: "You need specific plugins (membership, LMS, complex e-commerce). Your team already knows WordPress admin. You have custom backend integrations that rely on the WP ecosystem." },
        { title: "Choose Webflow when", body: "Marketing owns the site and wants to edit without developers. Page speed and Core Web Vitals are priorities. You want hosting and CMS in one place with less maintenance." },
      ],
      table: {
        title: "WordPress vs Webflow",
        subtitle: "Practical differences for business websites.",
        columns: [{ header: "WordPress" }, { header: "Webflow", highlight: true }],
        rows: [
          { label: "Maintenance burden", values: ["Plugin updates, security patches", "Lower ongoing maintenance"] },
          { label: "Page speed out of box", values: ["Varies widely", "Generally strong"] },
          { label: "Editor experience", values: ["Block editor or page builders", "Visual designer"] },
          { label: "Best for", values: ["Complex functionality", "Marketing sites"] },
        ],
      },
      faqs: [{ question: "Which is better for SEO?", answer: "Either works if built correctly. Webflow often wins on speed out of the box. WordPress wins when you need SEO plugins and content workflows at scale." }],
      relatedLinks: [{ href: "/services/web-design", label: "Web Design Services" }, { href: "/pricing/web-design", label: "Web Design Pricing" }],
      ctaHeadline: "Not sure which platform fits?", ctaSubtitle: "We will recommend based on your team and goals.", ctaLabel: "Get Platform Advice",
    },
    es: {
      metaTitle: "WordPress vs Webflow | ¿Qué Plataforma Elegir?",
      metaDescription: "Comparación WordPress vs Webflow para sitios empresariales.",
      hero: { label: "WordPress vs Webflow", line1: "WordPress vs Webflow:", line2: "El Stack Correcto.", subtitle: "Ambos funcionan. La elección equivocada cuesta velocidad o flexibilidad." },
      answerBlock: "WordPress encaja con equipos que necesitan plugins y flujos complejos. Webflow encaja con equipos de marketing que quieren control visual y código limpio.",
      sections: [{ title: "Elige WordPress cuando", body: "Necesitas plugins específicos o tu equipo ya conoce WordPress." }],
      table: { title: "Comparación", subtitle: "Diferencias prácticas.", columns: [{ header: "WordPress" }, { header: "Webflow", highlight: true }], rows: [{ label: "Mantenimiento", values: ["Actualizaciones de plugins", "Menor mantenimiento"] }] },
      faqs: [{ question: "¿Cuál es mejor para SEO?", answer: "Ambos funcionan si se construyen bien." }],
      relatedLinks: [{ href: "/services/web-design", label: "Diseño Web" }],
      ctaHeadline: "¿No sabes qué plataforma?", ctaSubtitle: "Recomendamos según tu equipo.", ctaLabel: "Consulta Plataforma",
    },
  },
  "local-seo-vs-google-ads": {
    en: {
      metaTitle: "Local SEO vs Google Ads | Map Pack or Paid Search?",
      metaDescription: "Local SEO vs Google Ads for service businesses. When to invest in map pack rankings vs paid local search.",
      hero: { label: "Local SEO vs Google Ads", line1: "Local SEO vs Google Ads:", line2: "Maps or Search Ads?", subtitle: "Local businesses often win by showing up in both places. Here is how to split budget." },
      answerBlock: "Local SEO targets Google Business Profile, map pack rankings, and local organic results. Google Ads puts you at the top of search with pay-per-click. Map pack clicks are free once you rank. Local service ads cost $25 to $75 per click in competitive trades markets. Most contractors we work with run Local Services Ads or Search Ads while building GBP and citations for long-term map pack presence.",
      sections: [
        { title: "Invest in local SEO when", body: "You serve a defined area and want free clicks from map pack and local organic. Reviews and reputation are strong or improvable. You can wait 60 to 90 days for map pack movement." },
        { title: "Invest in Google Ads when", body: "You need calls this week. Seasonal demand requires instant visibility. You are new and have no map pack presence yet." },
      ],
      table: {
        title: "Local SEO vs Google Ads",
        subtitle: "For home services and local professionals.",
        columns: [{ header: "Local SEO" }, { header: "Google Ads", highlight: true }],
        rows: [
          { label: "Primary visibility", values: ["Map pack + organic local", "Top of search ads"] },
          { label: "Cost per lead trend", values: ["Decreases over time", "Stable while spending"] },
          { label: "Setup time", values: ["4 to 8 weeks", "1 to 2 weeks"] },
        ],
      },
      faqs: [{ question: "Do I need both for a local business?", answer: "Most successful local clients use both. Ads for immediate calls, local SEO for sustainable map pack rankings and lower cost per lead over time." }],
      relatedLinks: [{ href: "/services/local-seo", label: "Local SEO Services" }, { href: "/services/google-ads", label: "Google Ads Management" }],
      ctaHeadline: "Want a local marketing plan?", ctaSubtitle: "We will recommend the right split for your city and trade.", ctaLabel: "Get Local Strategy",
    },
    es: {
      metaTitle: "SEO Local vs Google Ads | ¿Mapa o Anuncios?",
      metaDescription: "SEO local vs Google Ads para negocios de servicios.",
      hero: { label: "SEO Local vs Google Ads", line1: "SEO Local vs Google Ads:", line2: "¿Mapa o Anuncios?", subtitle: "Los negocios locales ganan apareciendo en ambos lugares." },
      answerBlock: "SEO local apunta al Perfil de Google Business y resultados orgánicos locales. Google Ads te pone arriba pagando por clic.",
      sections: [{ title: "Invierte en SEO local cuando", body: "Tienes área definida y quieres clics gratis del mapa." }],
      table: { title: "Comparación", subtitle: "Para servicios locales.", columns: [{ header: "SEO Local" }, { header: "Google Ads", highlight: true }], rows: [{ label: "Visibilidad", values: ["Mapa + orgánico", "Arriba en anuncios"] }] },
      faqs: [{ question: "¿Necesito ambos?", answer: "La mayoría de clientes locales exitosos usan ambos." }],
      relatedLinks: [{ href: "/services/local-seo", label: "SEO Local" }],
      ctaHeadline: "¿Quieres plan local?", ctaSubtitle: "Recomendamos la mezcla para tu ciudad.", ctaLabel: "Estrategia Local",
    },
  },
};
