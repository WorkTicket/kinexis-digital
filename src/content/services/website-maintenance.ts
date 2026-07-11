import type { Locale } from "@/i18n/routing";
import type { GenericRichServiceContent } from "./generic-rich-service-types";

export const websiteMaintenanceContent: Record<Locale, GenericRichServiceContent> = {
  en: {
    hero: { ctaLabel: "Start a Care Plan" },
    processSection: {
      title: "Engagement timeline",
      subtitle: "From onboarding to a site you stop worrying about.",
    },
    processIntro:
      "Website care works when problems get caught before customers notice. Our cycle runs from stack audit and staging setup through tested updates, backup verification, security hardening, and monthly health reporting. Each phase with a clear deliverable your team can rely on.",
    phases: [
      { title: "Onboard & Audit", desc: "Stack review, staging environment, backup baseline, and monitoring configured.", metric: "" },
      { title: "Secure & Stabilize", desc: "Security hardening, malware scan, firewall rules, and uptime alerts live.", metric: "" },
      { title: "Update & Test", desc: "Core, theme, and plugin updates applied on staging first, then pushed to production.", metric: "" },
      { title: "Report & Support", desc: "Monthly health report plus developer time for edits and fixes on your plan.", metric: "" },
    ],
    capabilityBodies: {
      updatesBackups:
        "Auto-updates break sites during peak season more often than anyone admits. We apply core, theme, and plugin updates on a staging copy first, forms, checkout, and key pages get checked before anything touches production. Backups run daily to off-site storage, and we test restores quarterly so a bad update is a quick rollback, not a crisis call. You get a changelog of what changed and when, not a surprise broken contact form.",
      securityMonitoring:
        "Outdated plugins are the front door for malware, and an infected site gets blocklisted fast. We run malware scans, manage firewall rules, and monitor uptime around the clock with alerts before customers notice downtime. SSL, login hardening, and file integrity checks stay on a schedule instead of when someone remembers. If something looks wrong, we investigate and fix it, not hand you a ticket number.",
      supportReporting:
        "A care plan only works if someone answers when you need a change. Each tier includes a monthly block of developer time for content edits, small fixes, and troubleshooting, handled by the same team that knows your stack. The monthly health report covers updates applied, threats blocked, uptime percentage, and performance trends in plain language. No jargon dashboard you never open.",
    },
    cta: {
      headline: "Ready to stop worrying about updates, backups, and downtime?",
      subtitle: "Let's put your site on a care plan with staging-tested updates,|monitored backups, and a developer on call when you need one.",
      ctaLabel: "See Maintenance Pricing",
    },
    inlineCtaLabel: "Review My Site Health",
    inlineCtaSubtitle:
      "We will review your current setup, update practices, backup status, security gaps, and uptime history. Then outline what a care plan would cover.",
  },
  es: {
    hero: { ctaLabel: "Inicia un Plan de Cuidado" },
    processSection: {
      title: "Cronograma del proyecto",
      subtitle: "Del onboarding a un sitio del que dejas de preocuparte.",
    },
    processIntro:
      "El cuidado del sitio funciona cuando los problemas se detectan antes de que los clientes los noten. Nuestro ciclo va de auditoría del stack y setup de staging a updates probados, verificación de respaldos, endurecimiento de seguridad e informes mensuales de salud, cada fase con un entregable claro en el que tu equipo puede confiar.",
    phases: [
      { title: "Onboarding y Auditoría", desc: "Revisión del stack, entorno staging, línea base de respaldos y monitoreo configurado.", metric: "" },
      { title: "Asegurar y Estabilizar", desc: "Endurecimiento de seguridad, escaneo de malware, reglas de firewall y alertas de uptime en vivo.", metric: "" },
      { title: "Actualizar y Probar", desc: "Updates de core, tema y plugins en staging primero, luego a producción.", metric: "" },
      { title: "Reportar y Soporte", desc: "Informe mensual de salud más tiempo de desarrollador para ediciones y arreglos en tu plan.", metric: "" },
    ],
    capabilityBodies: {
      updatesBackups:
        "Las auto-actualizaciones rompen sitios en temporada alta más de lo que admiten. Aplicamos updates de core, tema y plugins primero en una copia staging, formularios, checkout y páginas clave se revisan antes de tocar producción. Los respaldos corren diariamente a almacenamiento externo y probamos restauraciones trimestralmente para que un mal update sea un rollback rápido, no una crisis. Recibes un changelog de qué cambió y cuándo, no un formulario de contacto roto por sorpresa.",
      securityMonitoring:
        "Los plugins desactualizados son la puerta al malware, y un sitio infectado entra en listas negras rápido. Ejecutamos escaneos de malware, gestionamos reglas de firewall y monitoreamos uptime con alertas antes de que los clientes noten caídas. SSL, endurecimiento de login y chequeos de integridad de archivos siguen un calendario, no cuando alguien recuerda. Si algo se ve mal, investigamos y lo arreglamos, no te damos un número de ticket.",
      supportReporting:
        "Un plan de cuidado solo funciona si alguien responde cuando necesitas un cambio. Cada nivel incluye un bloque mensual de tiempo de desarrollador para ediciones de contenido, arreglos pequeños y troubleshooting. A cargo del mismo equipo que conoce tu stack. El informe mensual de salud cubre updates aplicados, amenazas bloqueadas, porcentaje de uptime y tendencias de rendimiento en lenguaje claro. Sin dashboard de jerga que nunca abres.",
    },
    cta: {
      headline: "¿Listo para dejar de preocuparte por updates, respaldos y caídas?",
      subtitle: "Pongamos tu sitio en un plan de cuidado con updates probados en staging,|respaldos monitoreados y un desarrollador disponible cuando lo necesites.",
      ctaLabel: "Ver Precios de Mantenimiento",
    },
    inlineCtaLabel: "Revisar Salud de Mi Sitio",
    inlineCtaSubtitle:
      "Revisaremos tu setup actual, prácticas de actualización, estado de respaldos, brechas de seguridad e historial de uptime, y delinearemos qué cubriría un plan de cuidado.",
  },
};
