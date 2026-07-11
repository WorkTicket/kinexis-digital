import type { Locale } from "@/i18n/routing";
import type { ServicePhase } from "@/components/ui/ServicePhaseList";

export type CopywritingContent = {
  hero: {
    ctaLabel: string;
  };
  processSection: {
    title: string;
    subtitle: string;
  };
  processIntro: string;
  phases: ServicePhase[];
  capabilityBodies: {
    voiceMessaging: string;
    conversionCopy: string;
    channelCopy: string;
  };
  cta: {
    headline: string;
    subtitle: string;
    ctaLabel: string;
  };
  inlineCtaLabel: string;
  inlineCtaSubtitle: string;
};

export const copywritingContent: Record<Locale, CopywritingContent> = {
  en: {
    hero: {
      ctaLabel: "Start Your Copy Project",
    },
    processSection: {
      title: "Engagement timeline",
      subtitle: "From voice discovery to a steady flow of finished copy.",
    },
    processIntro:
      "Copy that converts starts with how your buyers talk, not a blank page. Our cycle runs from customer research and a messaging guide through first drafts, a shared content calendar, and ongoing optimization. Each phase with a deliverable your team can use before the next piece ships.",
    phases: [
      {
        title: "Voice & Discovery",
        desc: "Customer interviews, existing content review, and a messaging guide that captures tone, key phrases, and how you position against alternatives.",
        metric: "",
      },
      {
        title: "First Deliverables",
        desc: "Priority pages or sequences drafted against the voice guide, reviewed with your team, and refined until they read like your company wrote them.",
        metric: "",
      },
      {
        title: "Cadence & Calendar",
        desc: "A shared content calendar with predictable weekly or monthly output across the channels you need, web, email, ads, or sales collateral.",
        metric: "",
      },
      {
        title: "Refine & Scale",
        desc: "Performance reviewed on conversion metrics, top pieces sharpened, and output scaled to match what's actually driving booked calls or demos.",
        metric: "",
      },
    ],
    capabilityBodies: {
      voiceMessaging:
        "We start with customer language, not a style guide template. Interviews with recent buyers and lost deals surface how people describe the problem, what they compare you against, and what makes them hesitate. That becomes a short messaging framework, tone, key phrases, positioning. Your whole team can apply. Most freelancers write about your features. We document the words your buyers already use so every page, email, and ad sounds like the same company without sounding like everyone else in your category.",
      conversionCopy:
        "Website and landing page copy qualifies visitors in the first line, answers objections in the order they show up, and asks for one clear action. Email sequences earn the next open by delivering value before the pitch. Each asset maps to a funnel stage and a conversion goal, demo booked, call scheduled, form submitted, not word count. We structure pages for scanability and search intent, but the measure is whether the reader moves, not whether the paragraph fills space.",
      channelCopy:
        "Ad headlines, social hooks, and sales one-pagers need different rhythms for the same message. We write channel-native variations, shorter hooks for paid, longer proof for nurture, tighter language for proposals, all held to the same voice guide. Existing copy gets an editorial pass to sharpen claims, cut filler, and align CTAs. When a page underperforms, we rewrite the headline and proof block before recommending more traffic.",
    },
    cta: {
      headline: "Ready for copy that sounds like you and moves readers to act?",
      subtitle:
        "Let's define your voice once, then build a calendar of web, email, and ad copy|that stays consistent and asks for one clear next step.",
      ctaLabel: "See Copywriting Pricing",
    },
    inlineCtaLabel: "Review My Copy",
    inlineCtaSubtitle:
      "We will review your homepage or highest-traffic page against your buyer's language, voice consistency, objection handling, and CTA clarity. Then outline the highest-impact rewrites.",
  },
  es: {
    hero: {
      ctaLabel: "Inicia Tu Proyecto de Copy",
    },
    processSection: {
      title: "Cronograma del proyecto",
      subtitle: "Del descubrimiento de voz a un flujo constante de copy terminado.",
    },
    processIntro:
      "El copy que convierte empieza con cómo hablan tus compradores, no con una página en blanco. Nuestro ciclo va de la investigación con clientes y una guía de mensajería a primeros borradores, un calendario compartido y optimización continua, cada fase con un entregable que tu equipo puede usar antes de publicar la siguiente pieza.",
    phases: [
      {
        title: "Voz y Descubrimiento",
        desc: "Entrevistas con clientes, revisión de contenido existente y una guía de mensajería que captura tono, frases clave y cómo te posicionas frente a alternativas.",
        metric: "",
      },
      {
        title: "Primeros Entregables",
        desc: "Páginas o secuencias prioritarias redactadas según la guía de voz, revisadas con tu equipo y refinadas hasta sonar como si tu empresa las hubiera escrito.",
        metric: "",
      },
      {
        title: "Cadencia y Calendario",
        desc: "Un calendario compartido con producción predecible semanal o mensual en los canales que necesitas, web, email, anuncios o material de ventas.",
        metric: "",
      },
      {
        title: "Refinar y Escalar",
        desc: "Rendimiento revisado en métricas de conversión, piezas top afiladas y producción escalada a lo que realmente genera llamadas o demos reservadas.",
        metric: "",
      },
    ],
    capabilityBodies: {
      voiceMessaging:
        "Empezamos con el lenguaje del cliente, no con una plantilla de guía de estilo. Entrevistas con compradores recientes y deals perdidos revelan cómo describen el problema, con qué te comparan y qué les hace dudar. Eso se convierte en un marco de mensajería breve, tono, frases clave, posicionamiento, que todo tu equipo puede aplicar. La mayoría de freelancers escribe sobre tus características. Nosotros documentamos las palabras que tus compradores ya usan para que cada página, email y anuncio suene a la misma empresa sin sonar como todos en tu categoría.",
      conversionCopy:
        "El copy de sitio y landing pages califica al visitante en la primera línea, responde objeciones en el orden en que aparecen y pide una sola acción clara. Las secuencias de email ganan la siguiente apertura entregando valor antes del pitch. Cada pieza se mapea a una etapa del embudo y un objetivo de conversión, demo reservada, llamada agendada, formulario enviado, no a contar palabras. Estructuramos páginas para escaneo e intención de búsqueda, pero la medida es si el lector avanza, no si el párrafo llena espacio.",
      channelCopy:
        "Titulares de anuncios, hooks sociales y one-pagers de ventas necesitan ritmos distintos para el mismo mensaje. Escribimos variaciones nativas por canal, hooks más cortos para paid, prueba social más larga para nurture, lenguaje más ajustado para propuestas, todas sujetas a la misma guía de voz. El copy existente recibe una pasada editorial para afilar afirmaciones, cortar relleno y alinear CTAs. Cuando una página rinde bajo, reescribimos titular y bloque de prueba antes de recomendar más tráfico.",
    },
    cta: {
      headline: "¿Listo para copy que suene como tú y mueva al lector a actuar?",
      subtitle:
        "Definamos tu voz una vez y construyamos un calendario de copy web, email y anuncios|que se mantenga consistente y pida un solo siguiente paso claro.",
      ctaLabel: "Ver Precios de Copywriting",
    },
    inlineCtaLabel: "Revisar Mi Copy",
    inlineCtaSubtitle:
      "Revisaremos tu homepage o página de mayor tráfico frente al lenguaje de tu comprador, consistencia de voz, manejo de objeciones y claridad del CTA, y delinearemos las reescrituras de mayor impacto.",
  },
};
