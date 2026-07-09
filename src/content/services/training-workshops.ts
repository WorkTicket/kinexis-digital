import type { Locale } from "@/i18n/routing";
import type { GenericRichServiceContent } from "./generic-rich-service-types";

export const trainingWorkshopsContent: Record<Locale, GenericRichServiceContent> = {
  en: {
    hero: { ctaLabel: "Book a Workshop" },
    processSection: {
      title: "Engagement timeline",
      subtitle: "From skills assessment to a team that can run the work.",
    },
    processIntro:
      "Training sticks when your team practices on real accounts, not hypothetical slides. Our cycle runs from skills assessment and custom curriculum through hands-on sessions on your tools, template delivery, and follow-up support so the skills survive the first week back at the desk.",
    phases: [
      { title: "Assess & Scope", desc: "Team skill baseline, tool audit, and curriculum built around the channels you actually run.", metric: "" },
      { title: "Hands-On Sessions", desc: "Live working sessions on your accounts, campaigns, analytics, or content as scoped.", metric: "" },
      { title: "Templates & Playbooks", desc: "Checklists, SOPs, and templates your team keeps using after the session ends.", metric: "" },
      { title: "Follow-Up Support", desc: "Post-session window for questions so new skills do not fade when real work hits.", metric: "" },
    ],
    capabilityBodies: {
      skillsAssessment:
        "Generic courses teach theory on someone else's account. We start by mapping your team's actual gaps against the channels and tools you run, SEO, Google Ads, analytics, email, or whatever matters most right now. The curriculum gets built around those gaps, at the right depth for your team's experience level. No hour wasted on basics your senior person already knows or advanced tactics your junior team cannot use yet.",
      handsOnTraining:
        "Watching a recording builds a false sense of competence that evaporates when a real campaign needs fixing. Sessions run live on your accounts and data, building a search campaign, reading a GA4 report, writing a nurture sequence, whatever was scoped. Participants do the work during the session, not after. Questions get answered in context, on your actual setup, not a demo environment that looks nothing like yours.",
      playbooksSupport:
        "Knowledge walks out when only one person attended and nothing was documented. Every engagement leaves behind templates, checklists, and SOPs the whole team can reuse, campaign launch checklists, reporting templates, content calendars. Recordings go to new hires later. A follow-up support window catches questions that surface once the real work starts, so the training investment actually holds.",
    },
    cta: {
      headline: "Ready to build marketing skills your team keeps using?",
      subtitle: "Let's assess the gaps, train on your own accounts,|and leave behind templates and playbooks that outlast the session.",
      ctaLabel: "See Training Pricing",
    },
    inlineCtaLabel: "Scope a Workshop",
    inlineCtaSubtitle:
      "We will review your team's current skills and tools, biggest gaps, channels you run, and training goals. Then recommend the right session format and depth.",
  },
  es: {
    hero: { ctaLabel: "Reservar un Taller" },
    processSection: {
      title: "Cronograma del proyecto",
      subtitle: "De evaluación de habilidades a un equipo que puede operar el trabajo.",
    },
    processIntro:
      "La capacitación se fija cuando tu equipo practica en cuentas reales, no en diapositivas hipotéticas. Nuestro ciclo va de evaluación de habilidades y currículo personalizado a sesiones prácticas en tus herramientas, entrega de plantillas y soporte de seguimiento para que las habilidades sobrevivan la primera semana de vuelta al escritorio.",
    phases: [
      { title: "Evaluar y Dimensionar", desc: "Línea base de habilidades del equipo, auditoría de herramientas y currículo construido alrededor de los canales que realmente operan.", metric: "" },
      { title: "Sesiones Prácticas", desc: "Sesiones de trabajo en vivo en tus cuentas, campañas, analítica o contenido según el alcance.", metric: "" },
      { title: "Plantillas y Playbooks", desc: "Checklists, SOPs y plantillas que tu equipo sigue usando después de la sesión.", metric: "" },
      { title: "Soporte de Seguimiento", desc: "Ventana post-sesión para dudas para que las nuevas habilidades no se apaguen cuando llegue el trabajo real.", metric: "" },
    ],
    capabilityBodies: {
      skillsAssessment:
        "Los cursos genéricos enseñan teoría en la cuenta de otro. Empezamos mapeando las brechas reales de tu equipo contra los canales y herramientas que operan, SEO, Google Ads, analítica, email o lo que más importe ahora. El currículo se construye alrededor de esas brechas, a la profundidad adecuada para la experiencia de tu equipo. Sin horas perdidas en básicos que tu persona senior ya domina ni tácticas avanzadas que tu equipo junior aún no puede usar.",
      handsOnTraining:
        "Mirar una grabación crea una falsa sensación de dominio que se evapora cuando una campaña real necesita arreglo. Las sesiones corren en vivo en tus cuentas y datos, construir una campaña de búsqueda, leer un informe GA4, escribir una secuencia de nurture, lo que se haya definido. Los participantes hacen el trabajo durante la sesión, no después. Las preguntas se responden en contexto, en tu setup real, no en un entorno demo que no se parece al tuyo.",
      playbooksSupport:
        "El conocimiento se va cuando solo una persona asistió y nada quedó documentado. Cada proyecto deja plantillas, checklists y SOPs que todo el equipo puede reutilizar, checklists de lanzamiento de campañas, plantillas de informes, calendarios de contenido. Las grabaciones sirven a nuevas contrataciones después. Una ventana de soporte de seguimiento atrapa las dudas que surgen cuando empieza el trabajo real, para que la inversión en capacitación realmente se sostenga.",
    },
    cta: {
      headline: "¿Listo para construir habilidades de marketing que tu equipo siga usando?",
      subtitle: "Evaluemos las brechas, capacitemos en tus propias cuentas|y dejemos plantillas y playbooks que sobrevivan a la sesión.",
      ctaLabel: "Ver Precios de Capacitación",
    },
    inlineCtaLabel: "Dimensionar un Taller",
    inlineCtaSubtitle:
      "Revisaremos las habilidades y herramientas actuales de tu equipo, mayores brechas, canales que operan y objetivos de capacitación, y recomendaremos el formato y profundidad de sesión adecuados.",
  },
};
