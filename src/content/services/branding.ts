import type { Locale } from "@/i18n/routing";
import type { ServicePhase } from "@/components/ui/ServicePhaseList";
import type { FAQItem } from "@/components/sections/FAQSection";

export type BrandingEvolutionPhase = {
  phase: string;
  label: string;
  desc: string;
  duration: string;
};

export type BrandingIdentityLayer = {
  id: string;
  label: string;
  desc: string;
};

export type BrandingContent = {
  hero: {
    label: string;
    headlineLine1: string;
    headlineLine2: string;
    subtitle: string;
    ctaLabel: string;
  };
  evolution: {
    title: string;
    subtitle: string;
    durationLabel: string;
    phases: BrandingEvolutionPhase[];
  };
  identitySystem: {
    title: string;
    subtitle: string;
    layers: BrandingIdentityLayer[];
  };
  process: {
    title: string;
    subtitle: string;
    phases: ServicePhase[];
  };
  cta: {
    headline: string;
    subtitle: string;
    ctaLabel: string;
  };
  faqs: FAQItem[];
};

const enBrandPhases: ServicePhase[] = [
  { title: "Discovery & Positioning", desc: "Market research, competitor analysis, stakeholder interviews, audience definition.", metric: "Positioning framework in 2 weeks" },
  { title: "Visual Identity", desc: "Logo system, color palette, typography, photographic style, visual language.", metric: "Complete visual system delivered" },
  { title: "Messaging Architecture", desc: "Voice guidelines, key messaging hierarchy, tagline, value proposition language.", metric: "Full messaging hierarchy documented" },
  { title: "Guidelines & Assets", desc: "Full brand guide plus production-ready assets for every format.", metric: "40+ production-ready assets" },
  { title: "Launch & Alignment", desc: "Brand launch session ensuring the entire team knows how to apply the identity.", metric: "Team alignment session included" },
];

const enEvolutionPhases: BrandingEvolutionPhase[] = [
  { phase: "Discovery", label: "Market Research", desc: "Competitor analysis, audience interviews, brand perception audit.", duration: "2 weeks" },
  { phase: "Positioning", label: "Strategic Foundation", desc: "Brand architecture, messaging hierarchy, visual territory mapping.", duration: "1 week" },
  { phase: "Identity", label: "Visual System", desc: "Logo, color, typography, photography, motion. A cohesive language.", duration: "3 weeks" },
  { phase: "Activation", label: "Brand Launch", desc: "Guidelines, asset production, internal training, launch coordination.", duration: "2 weeks" },
];

const enIdentityLayers: BrandingIdentityLayer[] = [
  { id: "typography", label: "Typography", desc: "Type system with hierarchy, scale, and readability across all media" },
  { id: "colorSystem", label: "Color System", desc: "Primary, secondary, accent, and neutral palette with accessibility compliance" },
  { id: "imagery", label: "Imagery", desc: "Photographic style, illustration approach, and iconography system" },
  { id: "layoutSystem", label: "Layout System", desc: "Grid systems, spacing rules, and compositional principles" },
  { id: "digitalApplication", label: "Digital Application", desc: "Website, email, social media templates that extend the brand" },
  { id: "brandGuidelines", label: "Brand Guidelines", desc: "A complete guide for consistent use across every channel" },
];

export const brandingContent: Record<Locale, BrandingContent> = {
  en: {
    hero: {
      label: "Perception",
      headlineLine1: "A brand is",
      headlineLine2: "a set of expectations.",
      subtitle: "We build brand systems that command trust, signal quality,|and make your ideal clients choose you before you say a word.",
      ctaLabel: "Start Your Brand Project",
    },
    evolution: {
      title: "Identity Evolution Timeline",
      subtitle: "A brand is built in phases.|Each layer informs the next, creating a system that works across every medium.",
      durationLabel: "Duration:",
      phases: enEvolutionPhases,
    },
    identitySystem: {
      title: "A brand is a system. Not a logo.",
      subtitle: "Every visual element has to work together everywhere your brand shows up.|We build full identity systems, not one-off assets.",
      layers: enIdentityLayers,
    },
    process: {
      title: "The brand build process.",
      subtitle: "From positioning to launch:|a repeatable process that builds brands built to last.",
      phases: enBrandPhases,
    },
    cta: {
      headline: "Your brand is already communicating something.",
      subtitle: "Let's make sure it's the right message.|We'll build a brand system that positions you for the next decade.",
      ctaLabel: "Start Your Brand Project",
    },
    faqs: [
      { question: "How long does a branding project take?", answer: "Our standard brand build runs 8 weeks: 2 weeks discovery, 1 week positioning, 3 weeks visual identity, and 2 weeks for guidelines and launch. Larger projects with multi-brand or enterprise scope may extend the timeline." },
      { question: "What is included in a brand identity package?", answer: "You receive a complete visual system: logo suite, color palette, typography, imagery style guide, digital application templates, and a brand guidelines document. Most clients receive 40+ production-ready assets at delivery." },
      { question: "Do you work on rebrands or only new brands?", answer: "Both. We do full rebrands, brand refreshes, and new brand builds. If you have an existing brand that's underperforming or misaligned with where your business is heading, we can evolve it without starting from zero." },
      { question: "Will I own all the brand assets?", answer: "Yes. You receive full ownership of all files, including working source files in all formats. There are no ongoing licensing fees. Everything we deliver is yours to use across any channel, in perpetuity." },
      { question: "How does branding affect marketing results?", answer: "A clear, consistent brand increases trust at every touchpoint. Clients who rebrand with us see higher ad click-through rates, improved conversion rates, and stronger word-of-mouth because buyers know exactly who you are and why to choose you." },
    ],
  },
  es: {
    hero: {
      label: "Percepción",
      headlineLine1: "Una marca es",
      headlineLine2: "un conjunto de expectativas.",
      subtitle: "Construimos sistemas de marca que generan confianza,|señalan calidad y hacen que tus clientes ideales te elijan antes de que digas una palabra.",
      ctaLabel: "Inicia Tu Proyecto de Marca",
    },
    evolution: {
      title: "Línea de Tiempo de Evolución de Identidad",
      subtitle: "Una marca se construye en fases.|Cada capa informa la siguiente, creando un sistema que funciona en todos los medios.",
      durationLabel: "Duración:",
      phases: [
        { phase: "Descubrimiento", label: "Investigación de Mercado", desc: "Análisis de competidores, entrevistas con audiencia, auditoría de percepción de marca.", duration: "2 semanas" },
        { phase: "Posicionamiento", label: "Fundamento Estratégico", desc: "Arquitectura de marca, jerarquía de mensajes, mapeo de territorio visual.", duration: "1 semana" },
        { phase: "Identidad", label: "Sistema Visual", desc: "Logo, color, tipografía, fotografía, movimiento. Un lenguaje cohesivo.", duration: "3 semanas" },
        { phase: "Activación", label: "Lanzamiento de Marca", desc: "Guías, producción de activos, capacitación interna, coordinación de lanzamiento.", duration: "2 semanas" },
      ],
    },
    identitySystem: {
      title: "Una marca es un sistema. No un logo.",
      subtitle: "Cada elemento visual tiene que funcionar en conjunto dondequiera que aparezca tu marca.|Construimos sistemas de identidad completos, no piezas sueltas.",
      layers: [
        { id: "typography", label: "Tipografía", desc: "Sistema tipográfico con jerarquía, escala y legibilidad en todos los medios" },
        { id: "colorSystem", label: "Sistema de Color", desc: "Paleta primaria, secundaria, de acento y neutra con cumplimiento de accesibilidad" },
        { id: "imagery", label: "Imágenes", desc: "Estilo fotográfico, enfoque de ilustración y sistema de iconografía" },
        { id: "layoutSystem", label: "Sistema de Diseño", desc: "Sistemas de cuadrícula, reglas de espaciado y principios compositivos" },
        { id: "digitalApplication", label: "Aplicación Digital", desc: "Plantillas de sitio web, email y redes sociales que extienden la marca" },
        { id: "brandGuidelines", label: "Guías de Marca", desc: "Guía completa para un uso coherente en cada canal" },
      ],
    },
    process: {
      title: "El proceso de construcción de marca.",
      subtitle: "Del posicionamiento al lanzamiento:|un proceso repetible que construye marcas hechas para durar.",
      phases: [
        { title: "Descubrimiento y Posicionamiento", desc: "Investigación de mercado, análisis de competidores, entrevistas con stakeholders, definición de audiencia.", metric: "Marco de posicionamiento en 2 semanas" },
        { title: "Identidad Visual", desc: "Sistema de logo, paleta de colores, tipografía, estilo fotográfico, lenguaje visual.", metric: "Sistema visual completo entregado" },
        { title: "Arquitectura de Mensajes", desc: "Guías de voz, jerarquía de mensajes clave, tagline, lenguaje de propuesta de valor.", metric: "Jerarquía de mensajes completa documentada" },
        { title: "Guías y Activos", desc: "Guía de marca completa + activos listos para producción en cada formato.", metric: "40+ activos listos para producción" },
        { title: "Lanzamiento y Alineación", desc: "Sesión de lanzamiento de marca asegurando que todo el equipo sepa cómo aplicar la identidad.", metric: "Sesión de alineación de equipo incluida" },
      ],
    },
    cta: {
      headline: "Tu marca ya está comunicando algo.",
      subtitle: "Asegurémonos de que sea el mensaje correcto.|Construiremos un sistema de marca que te posicione para la próxima década.",
      ctaLabel: "Inicia Tu Proyecto de Marca",
    },
    faqs: [
      { question: "¿Cuánto tiempo tarda un proyecto de branding?", answer: "Nuestro proceso estándar dura 8 semanas: 2 de descubrimiento, 1 de posicionamiento, 3 de identidad visual y 2 para guías y lanzamiento. Proyectos más complejos pueden extender el plazo." },
      { question: "¿Qué incluye un paquete de identidad de marca?", answer: "Recibes un sistema visual completo: suite de logo, paleta de colores, tipografía, guía de estilo de imágenes, plantillas digitales y un documento de guías de marca. La mayoría de clientes reciben más de 40 activos listos para producción." },
      { question: "¿Trabajan con rebrands o solo con marcas nuevas?", answer: "Con ambos. Realizamos rebrands completos, refrescamientos de marca y nuevas construcciones de marca. Si tienes una marca existente desalineada con la dirección de tu negocio, podemos evolucionarla sin empezar desde cero." },
      { question: "¿Seré propietario de todos los activos de marca?", answer: "Sí. Recibes la propiedad total de todos los archivos, incluidos los archivos fuente de trabajo en todos los formatos. Sin tarifas de licencia. Todo lo que entregamos es tuyo para usar en cualquier canal." },
      { question: "¿Cómo afecta el branding a los resultados de marketing?", answer: "Una marca clara y consistente aumenta la confianza en cada punto de contacto. Los clientes que hacen rebranding con nosotros ven tasas de clics más altas en anuncios, mejores tasas de conversión y mayor recomendación boca a boca." },
    ],
  },};
