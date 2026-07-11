import type { Locale } from "@/i18n/routing";
import type { GenericRichServiceContent } from "./generic-rich-service-types";

export const marketingAutomationCrmContent: Record<Locale, GenericRichServiceContent> = {
  en: {
    hero: { ctaLabel: "Start CRM Consulting" },
    processSection: {
      title: "Engagement timeline",
      subtitle: "From stack audit to a system your team can trust.",
    },
    processIntro:
      "Automation only works when the tools talk to each other and the workflows actually fire. Our cycle runs from platform audit through integration setup, behavioral workflow build, lead scoring and handoff rules, and reporting tied to closed revenue. Each piece tested before your team depends on it.",
    phases: [
      { title: "Audit & Map Flow", desc: "Current stack reviewed, data gaps identified, and the lead-to-deal flow documented.", metric: "" },
      { title: "Connect & Integrate", desc: "Forms, ads, and tools wired so leads move automatically with source tags intact.", metric: "" },
      { title: "Build Workflows", desc: "Nurture sequences, scoring rules, and sales routing built on real behavioral triggers.", metric: "" },
      { title: "Train & Document", desc: "Dashboards live, team walkthrough complete, and documentation your staff can reference.", metric: "" },
    ],
    capabilityBodies: {
      stackIntegration:
        "Leads living in one platform and deals in another means another manual export every Friday. We audit what you have, keep what works, and connect the gaps, forms to CRM, ad platforms to contact records, CRM to sales pipeline. Source tags stay attached so you always know which campaign produced the lead. If a migration makes sense, we scope it honestly; often the right call is fixing what is already paid for.",
      workflowAutomation:
        "Half-built workflows are worse than none, nobody trusts what fires. We build behavioral sequences on real triggers: page visits, form submissions, email engagement, and deal stage changes. Welcome flows, nurture paths, and re-engagement campaigns get tested end to end before launch. Each workflow maps to a conversion goal, demo booked, call scheduled, deal advanced, not just an automation for its own sake.",
      attributionReporting:
        "Nobody can optimize budget when nobody knows which campaign closed the last ten deals. We set up pipeline stages, deal properties, and dashboards that tie marketing activity to closed revenue. Offline conversion import from ads, UTM discipline on forms, and CRM reports your leadership can read without a translator. The system answers one question: where should the next dollar go?",
    },
    cta: {
      headline: "Ready to stop losing leads between your tools?",
      subtitle: "Let's connect your stack, build workflows that fire reliably,|and trace revenue back to the campaigns that produced it.",
      ctaLabel: "See Automation & CRM Pricing",
    },
    inlineCtaLabel: "Review My Stack",
    inlineCtaSubtitle:
      "We will review your current CRM and automation setup, integration gaps, broken workflows, and handoff rules. Then outline the highest-impact fixes.",
  },
  es: {
    hero: { ctaLabel: "Inicia Consultoría CRM" },
    processSection: {
      title: "Cronograma del proyecto",
      subtitle: "De auditoría del stack a un sistema en el que tu equipo puede confiar.",
    },
    processIntro:
      "La automatización solo funciona cuando las herramientas se hablan y los workflows realmente se disparan. Nuestro ciclo va de auditoría de plataforma a setup de integraciones, construcción de workflows conductuales, reglas de scoring y handoff, e informes ligados a ingresos cerrados, cada pieza probada antes de que tu equipo dependa de ella.",
    phases: [
      { title: "Auditar y Mapear Flujo", desc: "Stack actual revisado, brechas de datos identificadas y flujo lead-a-deal documentado.", metric: "" },
      { title: "Conectar e Integrar", desc: "Formularios, anuncios y herramientas conectados para que los leads se muevan automáticamente con tags de fuente intactos.", metric: "" },
      { title: "Construir Workflows", desc: "Secuencias de nurture, reglas de scoring y enrutamiento a ventas en disparadores conductuales reales.", metric: "" },
      { title: "Capacitar y Documentar", desc: "Dashboards en vivo, walkthrough del equipo completo y documentación que tu personal puede consultar.", metric: "" },
    ],
    capabilityBodies: {
      stackIntegration:
        "Leads en una plataforma y deals en otra significa otra exportación manual cada viernes. Auditamos lo que tienes, conservamos lo que funciona y conectamos las brechas, formularios al CRM, plataformas de anuncios a registros de contacto, CRM al pipeline de ventas. Los tags de fuente se mantienen para que siempre sepas qué campaña produjo el lead. Si una migración tiene sentido, la dimensionamos con honestidad; a menudo lo correcto es arreglar lo que ya pagaste.",
      workflowAutomation:
        "Workflows a medio hacer son peores que ninguno, nadie confía en qué se dispara. Construimos secuencias conductuales en disparadores reales: visitas a páginas, envíos de formularios, engagement con email y cambios de etapa de deal. Flujos de bienvenida, rutas de nurture y campañas de re-engagement se prueban de punta a punta antes del lanzamiento. Cada workflow se mapea a un objetivo de conversión, demo reservada, llamada agendada, deal avanzado, no solo una automatización por automatizar.",
      attributionReporting:
        "Nadie puede optimizar presupuesto cuando nadie sabe qué campaña cerró los últimos diez deals. Configuramos etapas de pipeline, propiedades de deal y dashboards que ligan actividad de marketing a ingresos cerrados. Importación offline de conversiones desde anuncios, disciplina UTM en formularios e informes CRM que tu liderazgo puede leer sin traductor. El sistema responde una pregunta: ¿dónde debe ir el próximo dólar?",
    },
    cta: {
      headline: "¿Listo para dejar de perder leads entre tus herramientas?",
      subtitle: "Conectemos tu stack, construyamos workflows que se disparen con confianza|y traceemos ingresos a las campañas que los produjeron.",
      ctaLabel: "Ver Precios de Automatización y CRM",
    },
    inlineCtaLabel: "Revisar Mi Stack",
    inlineCtaSubtitle:
      "Revisaremos tu setup actual de CRM y automatización, brechas de integración, workflows rotos y reglas de handoff, y delinearemos las correcciones de mayor impacto.",
  },
};
