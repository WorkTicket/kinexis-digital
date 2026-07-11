import type { Locale } from "@/i18n/routing";
import type { GenericRichServiceContent } from "./generic-rich-service-types";

export const fractionalCmoContent: Record<Locale, GenericRichServiceContent> = {
  en: {
    hero: { ctaLabel: "Talk to a Fractional CMO" },
    processSection: {
      title: "Engagement timeline",
      subtitle: "From diagnosis to owned strategy and accountable execution.",
    },
    processIntro:
      "Fractional leadership works when someone owns the plan, the budget, and the vendors, not just attends meetings. Our cycle runs from marketing audit and strategy build through quarterly planning, vendor oversight, budget reallocation, and leadership reporting tied to pipeline and revenue.",
    phases: [
      { title: "Audit & Diagnose", desc: "Full marketing system review, channels, tracking, team, vendors, and spend against results.", metric: "" },
      { title: "Strategy & Plan", desc: "Documented quarterly plan tying every channel and dollar to a revenue target.", metric: "" },
      { title: "Execute & Oversee", desc: "Vendors and internal team directed, with spend shifted toward what performs.", metric: "" },
      { title: "Report & Adjust", desc: "Regular leadership reporting on pipeline, CPL, and return with plan updates each quarter.", metric: "" },
    ],
    capabilityBodies: {
      strategyPlanning:
        "Without a leader, marketing becomes a to-do list of tactics with no thread tying spend to revenue. We build a documented strategy and quarterly plan grounded in your unit economics, CAC, LTV, payback period, and pipeline targets. Every channel decision maps to a number the board or founder can track. The plan is living: we adjust when the data says shift, not when a vendor pitches something new.",
      vendorOversight:
        "Agencies and freelancers run unchecked when no one senior holds them to outcomes. We manage your existing vendors, or help you hire better ones, with clear KPIs, weekly accountability, and budget authority to cut what underperforms. Internal marketing staff get direction and priorities instead of competing requests from every department. One owner, one scoreboard.",
      budgetReporting:
        "Budget that follows habit instead of performance is the most common leak we find. We own allocation and reallocation, moving spend toward channels and campaigns that produce qualified leads at the lowest cost. Leadership gets regular reporting on pipeline contribution, cost per lead, and return in plain language. When it is time to hire a full-time CMO, we help scope the role and transition the plan.",
    },
    cta: {
      headline: "Ready for marketing leadership without the full-time hire?",
      subtitle: "Let's audit what you have, build a quarterly plan tied to revenue,|and own the budget and vendors until growth needs a full-time seat.",
      ctaLabel: "See Fractional CMO Pricing",
    },
    inlineCtaLabel: "Discuss Leadership Gap",
    inlineCtaSubtitle:
      "We will review your current marketing structure, strategy gaps, vendor accountability, and budget allocation. Then outline what fractional leadership would cover.",
  },
  es: {
    hero: { ctaLabel: "Hablar con un CMO Fraccional" },
    processSection: {
      title: "Cronograma del proyecto",
      subtitle: "Del diagnóstico a estrategia propia y ejecución responsable.",
    },
    processIntro:
      "El liderazgo fraccional funciona cuando alguien es dueño del plan, el presupuesto y los proveedores, no solo asiste a reuniones. Nuestro ciclo va de auditoría de marketing y construcción de estrategia a planificación trimestral, supervisión de proveedores, reasignación de presupuesto e informes a liderazgo ligados a pipeline e ingresos.",
    phases: [
      { title: "Auditar y Diagnosticar", desc: "Revisión completa del sistema de marketing, canales, tracking, equipo, proveedores y gasto contra resultados.", metric: "" },
      { title: "Estrategia y Plan", desc: "Plan trimestral documentado que liga cada canal y dólar a un objetivo de ingresos.", metric: "" },
      { title: "Ejecutar y Supervisar", desc: "Proveedores y equipo interno dirigidos, con gasto movido hacia lo que rinde.", metric: "" },
      { title: "Reportar y Ajustar", desc: "Informes regulares a liderazgo sobre pipeline, CPL y retorno con actualizaciones del plan cada trimestre.", metric: "" },
    ],
    capabilityBodies: {
      strategyPlanning:
        "Sin un líder, el marketing se vuelve una lista de tácticas sin hilo que ligue gasto e ingresos. Construimos una estrategia documentada y plan trimestral basado en tu economía unitaria, CAC, LTV, payback y objetivos de pipeline. Cada decisión de canal se mapea a un número que la junta o el fundador puede rastrear. El plan es vivo: ajustamos cuando los datos dicen cambiar, no cuando un proveedor vende algo nuevo.",
      vendorOversight:
        "Agencias y freelancers operan sin control cuando nadie senior los responsabiliza por resultados. Gestionamos tus proveedores actuales, o te ayudamos a contratar mejores, con KPIs claros, responsabilidad semanal y autoridad de presupuesto para cortar lo que rinde bajo. El personal interno de marketing recibe dirección y prioridades en vez de solicitudes competidoras de cada departamento. Un dueño, un marcador.",
      budgetReporting:
        "Presupuesto que sigue la costumbre en vez del rendimiento es la fuga más común que encontramos. Somos dueños de asignación y reasignación, moviendo gasto hacia canales y campañas que producen leads calificados al menor costo. Liderazgo recibe informes regulares sobre contribución al pipeline, costo por lead y retorno en lenguaje claro. Cuando llegue el momento de contratar un CMO full-time, ayudamos a dimensionar el rol y transferir el plan.",
    },
    cta: {
      headline: "¿Listo para liderazgo de marketing sin la contratación full-time?",
      subtitle: "Auditemos lo que tienes, construyamos un plan trimestral ligado a ingresos|y seamos dueños del presupuesto y proveedores hasta que el crecimiento necesite un puesto full-time.",
      ctaLabel: "Ver Precios de CMO Fraccional",
    },
    inlineCtaLabel: "Discutir Brecha de Liderazgo",
    inlineCtaSubtitle:
      "Revisaremos tu estructura actual de marketing, brechas de estrategia, responsabilidad de proveedores y asignación de presupuesto, y delinearemos qué cubriría un liderazgo fraccional.",
  },
};
