import type { Locale } from "@/lib/i18n";

export type Chrome = {
  skip: string;
  home: string;
  language: string;
  announce: string;
  navBefore: [string, string][];
  navAfter: [string, string][];
  industries: string;
  industriesTitle: string;
  allIndustries: string;
  industriesMore: string;
  industriesMoreMeta: string;
  allServices: string;
  webDesign: string;
  seo: string;
  addons: string;
  menu: string;
  close: string;
  chat: string;
  strategy: string;
  previewBarTitle: string;
  previewBarHint: string;
  footerCta: string;
  footerCtaMark: string;
  footerCtaText: string;
  footerButton: string;
  footerFast: string;
  footerBlurb: string;
  helpful: string;
  services: string;
  support: string;
  helpfulLinks: [string, string][];
  serviceLinks: [string, string][];
  supportLinks: [string, string][];
  legal: string;
  terms: string;
  privacy: string;
  region: string;
};

const EN: Chrome = {
  skip: "Skip to content",
  home: "Kinexis Digital home",
  language: "Language",
  announce: "Free homepage preview in 2 business days — no card, no obligation. Get yours →",
  navBefore: [["/about", "About"], ["/portfolio", "Portfolio"]],
  navAfter: [["/pricing", "Pricing"], ["/reviews", "Reviews"], ["/blog", "Blog"], ["/contact", "Contact"]],
  industries: "Industries",
  industriesTitle: "Websites built for the businesses you run",
  allIndustries: "All industries",
  industriesMore: "& more",
  industriesMoreMeta: "Any local business — if customers call you, we can help.",
  allServices: "All services",
  webDesign: "Web Design",
  seo: "SEO",
  addons: "Upgrades",
  menu: "Menu",
  close: "Close",
  chat: "Get My Free Preview",
  strategy: "Book a call",
  previewBarTitle: "Free homepage preview",
  previewBarHint: "No card · preview in 2 business days",
  footerCta: "Ready To See Your Homepage?",
  footerCtaMark: "Your Homepage",
  footerCtaText: "Share the basics and we’ll prepare your free homepage preview. No card required.",
  footerButton: "Show Me My Free Homepage",
  footerFast: "No card required. We reply fast. 😊",
  footerBlurb: "Website plans for local businesses across the United States, from $97/mo.",
  helpful: "Helpful Links",
  services: "Services",
  support: "Support",
  helpfulLinks: [["/about", "About Us"], ["/industries", "Industries"], ["/faqs", "FAQs"], ["/reviews", "Reviews"], ["/portfolio", "Portfolio"], ["/blog", "Blog"]],
  serviceLinks: [["/services", "Services"], ["/web-design", "Web Design"], ["/seo-services", "SEO Services"], ["/website-management", "Website Care"], ["/audit", "Free Website Audit"], ["/pricing", "Pricing"]],
  supportLinks: [["/strategy-call", "Talk Through Your Options"], ["/intake", "Send Website Content"], ["/update", "Request a Website Update"]],
  legal: "Legal",
  terms: "Terms & Conditions",
  privacy: "Privacy Policy",
  region: "",
};

const ES: Chrome = {
  skip: "Saltar al contenido",
  home: "Inicio de Kinexis Digital",
  language: "Idioma",
  announce: "Vista previa gratis en 2 días hábiles — sin tarjeta. Pídela aquí →",
  navBefore: [["/about", "Nosotros"], ["/portfolio", "Portafolio"]],
  navAfter: [["/pricing", "Precios"], ["/reviews", "Reseñas"], ["/blog", "Blog"], ["/contact", "Contacto"]],
  industries: "Industrias",
  industriesTitle: "Sitios web pensados para tu negocio",
  allIndustries: "Todas las industrias",
  industriesMore: "y más",
  industriesMoreMeta: "Cualquier negocio local: si te llaman tus clientes, podemos ayudarte.",
  allServices: "Todos los servicios",
  webDesign: "Diseño web",
  seo: "SEO",
  addons: "Extras",
  menu: "Menú",
  close: "Cerrar",
  chat: "Ver mi vista previa gratis",
  strategy: "Agendar llamada",
  previewBarTitle: "Vista previa gratis",
  previewBarHint: "Sin tarjeta · vista previa en 2 días hábiles",
  footerCta: "¿Quieres ver tu página de inicio?",
  footerCtaMark: "página de inicio",
  footerCtaText: "Cuéntanos lo básico de tu negocio y prepararemos una vista previa gratis de la página de inicio. No necesitas tarjeta.",
  footerButton: "Muéstrame mi página de inicio",
  footerFast: "Sin tarjeta. Respondemos rápido. 😊",
  footerBlurb: "Planes de sitios web para negocios locales en Estados Unidos, desde $97 al mes.",
  helpful: "Enlaces útiles",
  services: "Servicios",
  support: "Soporte",
  helpfulLinks: [["/about", "Nosotros"], ["/industries", "Industrias"], ["/faqs", "Preguntas"], ["/reviews", "Reseñas"], ["/portfolio", "Portafolio"], ["/blog", "Blog"]],
  serviceLinks: [["/services", "Servicios"], ["/web-design", "Diseño web"], ["/seo-services", "SEO"], ["/website-management", "Mantenimiento del sitio"], ["/audit", "Auditoría del sitio"], ["/pricing", "Precios"]],
  supportLinks: [["/strategy-call", "Hablar de tus opciones"], ["/intake", "Enviar contenido del sitio"], ["/update", "Solicitar un cambio en el sitio"]],
  legal: "Legal",
  terms: "Términos y condiciones",
  privacy: "Política de privacidad",
  region: "Este texto está en español de Latinoamérica. El servicio es para negocios en Estados Unidos.",
};

export function chromeFor(locale: Locale): Chrome {
  if (locale === "en") return EN;
  if (locale === "es-ES") {
    return {
      ...ES,
      footerCtaText: "Cuéntanos lo básico de tu negocio y prepararemos una vista previa gratis de la página de inicio. No necesitas tarjeta.",
      industriesTitle: "Sitios web pensados para tu negocio",
      // Spain-facing chrome stays free of USD figures (same rule as homepage meta).
      footerBlurb: "Planes de sitios web para negocios de servicios locales en Estados Unidos.",
      region: "Este texto está en español de España. El servicio es para negocios en Estados Unidos.",
    };
  }
  return ES;
}
