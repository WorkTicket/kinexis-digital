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
  menu: string;
  close: string;
  chat: string;
  strategy: string;
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
  announce: "Free homepage preview first — no card, no obligation. See the four plans →",
  navBefore: [["/about", "About"], ["/seo-services", "SEO"], ["/portfolio", "Portfolio"], ["/reviews", "Reviews"]],
  navAfter: [["/pricing", "Pricing"], ["/upgrades", "Add-ons"], ["/blog", "Blog"], ["/contact", "Contact"]],
  industries: "Industries",
  industriesTitle: "Websites built for the trades you run",
  allIndustries: "All industries",
  menu: "Menu",
  close: "Close",
  chat: "Talk With Us",
  strategy: "Talk Through Your Options",
  footerCta: "Ready To See Your Homepage?",
  footerCtaMark: "Your Homepage",
  footerCtaText: "Share the basics and we’ll reply with a useful next step, even if none of our plans is the right fit.",
  footerButton: "Let’s Chat!",
  footerFast: "Send it over and we'll get back to you soon.",
  footerBlurb: "Digital marketing, SEO, and websites for businesses across the United States.",
  helpful: "Helpful Links",
  services: "Services",
  support: "Support",
  helpfulLinks: [["/about", "About Us"], ["/faqs", "FAQs"], ["/reviews", "Reviews"], ["/upgrades", "Upgrades"]],
  serviceLinks: [["/services", "Services"], ["/web-design", "Web Design"], ["/seo-services", "SEO Services"], ["/website-management", "Website Care"], ["/audit", "Site Reviews"], ["/pricing", "Pricing"]],
  supportLinks: [["/strategy-call", "Talk Through Your Options"], ["/update", "Send A Site Change"]],
  legal: "Legal",
  terms: "Terms & Conditions",
  privacy: "Privacy Policy",
  region: "",
};

const ES: Chrome = {
  skip: "Saltar al contenido",
  home: "Inicio de Kinexis Digital",
  language: "Idioma",
  announce: "Primero ves la página de inicio, gratis y sin tarjeta. Mira los cuatro planes →",
  navBefore: [["/about", "Nosotros"], ["/seo-services", "SEO"], ["/portfolio", "Portafolio"], ["/reviews", "Reseñas"]],
  navAfter: [["/pricing", "Precios"], ["/upgrades", "Extras"], ["/blog", "Blog"], ["/contact", "Contacto"]],
  industries: "Industrias",
  industriesTitle: "Sitios para el oficio que sí manejas",
  allIndustries: "Todas las industrias",
  menu: "Menú",
  close: "Cerrar",
  chat: "Escríbenos",
  strategy: "Hablar de tus opciones",
  footerCta: "¿Quieres ver tu página de inicio?",
  footerCtaMark: "página de inicio",
  footerCtaText: "Comparte lo básico y te respondemos con un siguiente paso útil, aunque ninguno de los planes te convenga.",
  footerButton: "Hablemos",
  footerFast: "Envíalo y te responderemos pronto.",
  footerBlurb: "Marketing, SEO y sitios web para negocios de servicios en Estados Unidos.",
  helpful: "Enlaces útiles",
  services: "Servicios",
  support: "Soporte",
  helpfulLinks: [["/about", "Nosotros"], ["/faqs", "Preguntas"], ["/reviews", "Reseñas"], ["/upgrades", "Extras"]],
  serviceLinks: [["/services", "Servicios"], ["/web-design", "Diseño web"], ["/seo-services", "SEO"], ["/website-management", "Cuidado del sitio"], ["/audit", "Revisión del sitio"], ["/pricing", "Precios"]],
  supportLinks: [["/strategy-call", "Hablar de tus opciones"], ["/update", "Enviar un cambio"]],
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
      footerCtaText: "Comparte lo básico y te respondemos con un siguiente paso útil, aunque ninguno de los planes te convenga.",
      industriesTitle: "Sitios para el oficio que sí llevas",
      region: "Este texto está en español de España. El servicio es para negocios en Estados Unidos.",
    };
  }
  return ES;
}
