import type { ServiceSeoSlug } from "@/content/service-seo/types";
import type { Locale } from "@/i18n/routing";
import { getServiceSeoContent } from "@/content/service-seo";
import type { ServiceSectionData, VisualVariant } from "./types";

type CapabilitySpec = {
  key: string;
  id: string;
  headline: { en: string; es: string };
  subheadline: { en: string; es: string };
  variant: VisualVariant;
  start: number;
  end: number;
};

const GENERIC_CAPABILITY_SPECS: Partial<Record<ServiceSeoSlug, CapabilitySpec[]>> = {
  "youtube-ads": [
    {
      key: "CampaignStrategy",
      id: "campaign-strategy",
      headline: { en: "Campaign & Targeting", es: "Campaña y Segmentación" },
      subheadline: {
        en: "Placement architecture and audience pools built before spend scales.",
        es: "Arquitectura de placements y pools de audiencia antes de escalar el gasto.",
      },
      variant: "content",
      start: 0,
      end: 4,
    },
    {
      key: "CreativeProduction",
      id: "creative-production",
      headline: { en: "Creative & Landing Pages", es: "Creativo y Landing Pages" },
      subheadline: {
        en: "Skip-proof hooks and post-click pages matched to the ad promise.",
        es: "Hooks a prueba de skip y páginas post-clic alineadas a la promesa del anuncio.",
      },
      variant: "content",
      start: 4,
      end: 8,
    },
    {
      key: "TrackingOptimization",
      id: "tracking-optimization",
      headline: { en: "Tracking & Optimization", es: "Tracking y Optimización" },
      subheadline: {
        en: "Attribution you can trust and weekly improvements tied to CPA.",
        es: "Atribución confiable y mejoras semanales ligadas al CPA.",
      },
      variant: "content",
      start: 8,
      end: 12,
    },
  ],
  "microsoft-ads": [
    {
      key: "AccountSetup",
      id: "account-setup",
      headline: { en: "Account & Import Strategy", es: "Cuenta y Estrategia de Importación" },
      subheadline: {
        en: "Microsoft-specific structure instead of a straight Google copy.",
        es: "Estructura específica para Microsoft, no una copia directa de Google.",
      },
      variant: "content",
      start: 0,
      end: 4,
    },
    {
      key: "AudienceTargeting",
      id: "audience-targeting",
      headline: { en: "Audience & LinkedIn Targeting", es: "Audiencias y Targeting LinkedIn" },
      subheadline: {
        en: "Segments and professional targeting most advertisers never turn on.",
        es: "Segmentos y targeting profesional que la mayoría de anunciantes no activa.",
      },
      variant: "content",
      start: 4,
      end: 8,
    },
    {
      key: "OptimizationReporting",
      id: "optimization-reporting",
      headline: { en: "Optimization & Reporting", es: "Optimización e Informes" },
      subheadline: {
        en: "Separate tracking and weekly bid work tied to qualified leads.",
        es: "Tracking propio y trabajo semanal de pujas ligado a leads calificados.",
      },
      variant: "content",
      start: 8,
      end: 12,
    },
  ],
  "landing-pages": [
    {
      key: "StrategyDesign",
      id: "strategy-design",
      headline: { en: "Strategy & Design", es: "Estrategia y Diseño" },
      subheadline: {
        en: "Wireframes and visual hierarchy mapped to one conversion goal.",
        es: "Wireframes y jerarquía visual mapeados a un solo objetivo de conversión.",
      },
      variant: "content",
      start: 0,
      end: 4,
    },
    {
      key: "BuildCopy",
      id: "build-copy",
      headline: { en: "Build & Copy", es: "Build y Copy" },
      subheadline: {
        en: "Fast development and conversion copy that qualifies before it sells.",
        es: "Desarrollo rápido y copy de conversión que califica antes de vender.",
      },
      variant: "content",
      start: 4,
      end: 8,
    },
    {
      key: "TrackingTesting",
      id: "tracking-testing",
      headline: { en: "Tracking & Testing", es: "Tracking y Pruebas" },
      subheadline: {
        en: "Every conversion captured, then tested with statistical discipline.",
        es: "Cada conversión capturada, luego probada con rigor estadístico.",
      },
      variant: "content",
      start: 8,
      end: 12,
    },
  ],
  "website-maintenance": [
    {
      key: "UpdatesBackups",
      id: "updates-backups",
      headline: { en: "Updates & Backups", es: "Actualizaciones y Respaldos" },
      subheadline: {
        en: "Staging-tested updates and restores you can actually rely on.",
        es: "Actualizaciones probadas en staging y respaldos en los que puedes confiar.",
      },
      variant: "content",
      start: 0,
      end: 4,
    },
    {
      key: "SecurityMonitoring",
      id: "security-monitoring",
      headline: { en: "Security & Uptime", es: "Seguridad y Uptime" },
      subheadline: {
        en: "Threat monitoring and alerts before customers notice downtime.",
        es: "Monitoreo de amenazas y alertas antes de que los clientes noten caídas.",
      },
      variant: "content",
      start: 4,
      end: 8,
    },
    {
      key: "SupportReporting",
      id: "support-reporting",
      headline: { en: "Support & Reporting", es: "Soporte e Informes" },
      subheadline: {
        en: "Hands-on developer time and a monthly health report you can read.",
        es: "Tiempo de desarrollador y un informe mensual de salud que puedes leer.",
      },
      variant: "content",
      start: 8,
      end: 12,
    },
  ],
  "website-speed": [
    {
      key: "PerformanceAudit",
      id: "performance-audit",
      headline: { en: "Performance Audit", es: "Auditoría de Rendimiento" },
      subheadline: {
        en: "Baseline scores and a prioritized fix list before any work starts.",
        es: "Puntuaciones base y lista priorizada de arreglos antes de empezar.",
      },
      variant: "content",
      start: 0,
      end: 4,
    },
    {
      key: "CoreOptimization",
      id: "core-optimization",
      headline: { en: "Core Optimizations", es: "Optimizaciones Core" },
      subheadline: {
        en: "Images, scripts, and caching fixes that move Lighthouse and CWV.",
        es: "Imágenes, scripts y caché que mueven Lighthouse y Core Web Vitals.",
      },
      variant: "content",
      start: 4,
      end: 8,
    },
    {
      key: "ValidationReporting",
      id: "validation-reporting",
      headline: { en: "Validation & Reporting", es: "Validación e Informes" },
      subheadline: {
        en: "Before-and-after proof so improvements are measurable, not assumed.",
        es: "Prueba antes/después para que las mejoras sean medibles, no supuestas.",
      },
      variant: "content",
      start: 8,
      end: 12,
    },
  ],
  copywriting: [
    {
      key: "VoiceMessaging",
      id: "voice-messaging",
      headline: { en: "Voice & Messaging", es: "Voz y Mensajes" },
      subheadline: {
        en: "A usable guide so every piece sounds like the same company wrote it.",
        es: "Una guía usable para que cada pieza suene escrita por la misma empresa.",
      },
      variant: "content",
      start: 0,
      end: 4,
    },
    {
      key: "ConversionCopy",
      id: "conversion-copy",
      headline: { en: "Conversion Copy", es: "Copy de Conversión" },
      subheadline: {
        en: "Pages and emails written to qualify, answer objections, and ask once.",
        es: "Páginas y emails que califican, responden objeciones y piden una acción.",
      },
      variant: "content",
      start: 4,
      end: 8,
    },
    {
      key: "ChannelCopy",
      id: "channel-copy",
      headline: { en: "Ads, Sales & Optimization", es: "Ads, Ventas y Optimización" },
      subheadline: {
        en: "Channel-native hooks plus rewrites that sharpen what already exists.",
        es: "Hooks nativos por canal más reescrituras que afilan lo que ya existe.",
      },
      variant: "content",
      start: 8,
      end: 12,
    },
  ],
  "marketing-audits": [
    {
      key: "TrackingAnalytics",
      id: "tracking-analytics",
      headline: { en: "Tracking & Analytics", es: "Tracking y Analytics" },
      subheadline: {
        en: "Confirm the numbers are trustworthy before anything else gets judged.",
        es: "Confirmar que los números son confiables antes de juzgar cualquier canal.",
      },
      variant: "content",
      start: 0,
      end: 4,
    },
    {
      key: "ChannelConversion",
      id: "channel-conversion",
      headline: { en: "Channels & Conversion", es: "Canales y Conversión" },
      subheadline: {
        en: "Where spend leaks and where interested visitors drop off.",
        es: "Dónde se filtra el gasto y dónde se caen los visitantes interesados.",
      },
      variant: "content",
      start: 4,
      end: 8,
    },
    {
      key: "FindingsRoadmap",
      id: "findings-roadmap",
      headline: { en: "Findings & Roadmap", es: "Hallazgos y Roadmap" },
      subheadline: {
        en: "Prioritized fixes and a working session, not a PDF that gathers dust.",
        es: "Arreglos priorizados y sesión de trabajo, no un PDF que acumula polvo.",
      },
      variant: "content",
      start: 8,
      end: 12,
    },
  ],
  "marketing-automation-crm": [
    {
      key: "StackIntegration",
      id: "stack-integration",
      headline: { en: "Stack & Integration", es: "Stack e Integración" },
      subheadline: {
        en: "Tools connected so leads and deals stop living in separate silos.",
        es: "Herramientas conectadas para que leads y deals dejen de vivir en silos.",
      },
      variant: "content",
      start: 0,
      end: 4,
    },
    {
      key: "WorkflowAutomation",
      id: "workflow-automation",
      headline: { en: "Workflow Automation", es: "Automatización de Workflows" },
      subheadline: {
        en: "Behavioral sequences and handoffs sales can actually trust.",
        es: "Secuencias conductuales y handoffs en los que ventas puede confiar.",
      },
      variant: "content",
      start: 4,
      end: 8,
    },
    {
      key: "AttributionReporting",
      id: "attribution-reporting",
      headline: { en: "Attribution & Reporting", es: "Atribución e Informes" },
      subheadline: {
        en: "Revenue traced to campaigns so budget decisions have data behind them.",
        es: "Ingresos rastreados a campañas para decisiones de presupuesto con datos.",
      },
      variant: "content",
      start: 8,
      end: 12,
    },
  ],
  "fractional-cmo": [
    {
      key: "StrategyPlanning",
      id: "strategy-planning",
      headline: { en: "Strategy & Planning", es: "Estrategia y Planificación" },
      subheadline: {
        en: "A quarterly plan that ties channel spend to revenue targets.",
        es: "Un plan trimestral que liga el gasto por canal a objetivos de ingresos.",
      },
      variant: "content",
      start: 0,
      end: 4,
    },
    {
      key: "VendorOversight",
      id: "vendor-oversight",
      headline: { en: "Vendor Oversight", es: "Supervisión de Proveedores" },
      subheadline: {
        en: "Agencies and freelancers held to outcomes, not activity reports.",
        es: "Agencias y freelancers responsables por resultados, no por reportes de actividad.",
      },
      variant: "content",
      start: 4,
      end: 8,
    },
    {
      key: "BudgetReporting",
      id: "budget-reporting",
      headline: { en: "Budget & Leadership Reporting", es: "Presupuesto e Informes a Liderazgo" },
      subheadline: {
        en: "Spend reallocated by performance with plain-language leadership updates.",
        es: "Gasto reasignado por rendimiento con updates claros para liderazgo.",
      },
      variant: "content",
      start: 8,
      end: 12,
    },
  ],
  "training-workshops": [
    {
      key: "SkillsAssessment",
      id: "skills-assessment",
      headline: { en: "Skills Assessment", es: "Evaluación de Habilidades" },
      subheadline: {
        en: "Baseline your team's gaps against the channels you actually run.",
        es: "Línea base de brechas del equipo contra los canales que realmente operan.",
      },
      variant: "content",
      start: 0,
      end: 4,
    },
    {
      key: "HandsOnTraining",
      id: "hands-on-training",
      headline: { en: "Hands-On Training", es: "Capacitación Práctica" },
      subheadline: {
        en: "Live working sessions on your accounts, not recorded lectures.",
        es: "Sesiones en vivo sobre tus cuentas, no clases grabadas.",
      },
      variant: "content",
      start: 4,
      end: 8,
    },
    {
      key: "PlaybooksSupport",
      id: "playbooks-support",
      headline: { en: "Playbooks & Follow-Up", es: "Playbooks y Seguimiento" },
      subheadline: {
        en: "Templates your team keeps using after the session ends.",
        es: "Plantillas que tu equipo sigue usando después de la sesión.",
      },
      variant: "content",
      start: 8,
      end: 12,
    },
  ],
};

export function genericCapabilityKeys(slug: ServiceSeoSlug): string[] {
  return (GENERIC_CAPABILITY_SPECS[slug]?.map((s) => s.key) ?? []).slice(0, 3);
}

function sectionKeyToBodyKey(key: string): string {
  return key.charAt(0).toLowerCase() + key.slice(1);
}

/** Prose-first sections for content-rich generic service pages (Phase 3). */
export function buildGenericRichSections(
  slug: ServiceSeoSlug,
  locale: Locale,
  capabilityBodies: Record<string, string>,
): Record<string, ServiceSectionData> {
  const specs = GENERIC_CAPABILITY_SPECS[slug];
  if (!specs) return {};

  const seo = getServiceSeoContent(slug, locale);
  const isEn = locale === "en";
  const variants: VisualVariant[] = ["dashboard", "comparison", "chart", "split", "content"];

  return Object.fromEntries(
    specs.map((spec, index) => {
      const slice = seo.deliverables.items.slice(spec.start, spec.end);
      const visualVariant = spec.variant === "content" ? variants[index % variants.length] : spec.variant;
      const bodyKey = sectionKeyToBodyKey(spec.key);
      return [
        spec.key,
        {
          id: spec.id,
          headline: isEn ? spec.headline.en : spec.headline.es,
          subheadline: isEn ? spec.subheadline.en : spec.subheadline.es,
          visualVariant,
          points: slice.map((item) => ({ title: item.title, description: item.description })),
          body: capabilityBodies[bodyKey],
          maxCards: 4,
        } satisfies ServiceSectionData,
      ];
    }),
  );
}
