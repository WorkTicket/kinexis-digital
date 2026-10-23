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
  pay: string;
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
  chat: "Chat With Us",
  strategy: "Schedule A Strategy Call",
  footerCta: "Let’s Get Started with Your New Site!",
  footerCtaMark: "Your New Site",
  footerCtaText: "Questions? Let’s talk about whether a new site makes sense for your business.",
  footerButton: "Let’s Chat!",
  footerFast: "Expect a fast response from us xD",
  footerBlurb: "Digital marketing, SEO, and websites for businesses across the United States.",
  helpful: "Helpful Links",
  services: "Services",
  support: "Support",
  helpfulLinks: [["/about", "About Us"], ["/faqs", "FAQs"], ["/reviews", "Reviews"], ["/upgrades", "Upgrades"]],
  serviceLinks: [["/services", "Services"], ["/web-design", "Web Design"], ["/seo-services", "SEO Services"], ["/website-management", "Web Management"], ["/audit", "Web Audits"], ["/pricing", "Pricing"]],
  supportLinks: [["/update", "Request Site Updates"], ["/strategy-call", "Schedule A Strategy Call"], ["/pay", "Plans & Payment"]],
  legal: "Legal",
  pay: "Pay",
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
  strategy: "Agendar una llamada",
  footerCta: "Empecemos con tu sitio nuevo",
  footerCtaMark: "tu sitio nuevo",
  footerCtaText: "¿Dudas? Hablemos de si un sitio nuevo le conviene a tu negocio. Puedes escribir desde el celular o la computadora.",
  footerButton: "Hablemos",
  footerFast: "Te respondemos pronto xD",
  footerBlurb: "Marketing, SEO y sitios web para negocios de servicios en Estados Unidos.",
  helpful: "Enlaces útiles",
  services: "Servicios",
  support: "Soporte",
  helpfulLinks: [["/about", "Nosotros"], ["/faqs", "Preguntas"], ["/reviews", "Reseñas"], ["/upgrades", "Extras"]],
  serviceLinks: [["/services", "Servicios"], ["/web-design", "Diseño web"], ["/seo-services", "SEO"], ["/website-management", "Mantenimiento"], ["/audit", "Auditorías"], ["/pricing", "Precios"]],
  supportLinks: [["/update", "Pedir un cambio"], ["/strategy-call", "Agendar una llamada"], ["/pay", "Planes y pago"]],
  legal: "Legal",
  pay: "Pagar",
  terms: "Términos y condiciones",
  privacy: "Política de privacidad",
  region: "Este texto está en español de Latinoamérica. El servicio es para negocios en Estados Unidos.",
};

export function chromeFor(locale: Locale): Chrome {
  if (locale === "en") return EN;
  if (locale === "es-ES") {
    return {
      ...ES,
      footerCtaText: "¿Dudas? Hablemos de si un sitio nuevo le conviene a tu negocio. Puedes escribir desde el móvil o el ordenador.",
      industriesTitle: "Sitios para el oficio que sí llevas",
      region: "Este texto está en español de España. El servicio es para negocios en Estados Unidos.",
    };
  }
  return ES;
}
