import type { Locale } from "@/i18n/routing";
import { localeContent } from "@/i18n/locale-content";

export type HomeProcessStepId = "audit" | "build" | "run";

export type HomeProcessStep = {
  id: HomeProcessStepId;
  title: string;
  description: string;
};

const homeProcessStepsEn: HomeProcessStep[] = [
  {
    id: "audit",
    title: "Audit",
    description:
      "We tear through your site, SEO, ads, and conversion. You leave knowing where demand dies and what to fix first.",
  },
  {
    id: "build",
    title: "Build",
    description:
      "Messaging, pages, campaigns, and tracking ship as one system. When someone clicks, the lead has a place to land.",
  },
  {
    id: "run",
    title: "Run",
    description:
      "Weekly reviews kill weak spend and push budget toward what brings real leads. Reports stay in plain language.",
  },
];

const homeProcessStepsEs: HomeProcessStep[] = [
  {
    id: "audit",
    title: "Auditar",
    description:
      "Revisamos a fondo tu web, SEO, anuncios y conversión. Sales sabiendo dónde muere la demanda y qué hay que arreglar primero.",
  },
  {
    id: "build",
    title: "Construir",
    description:
      "Mensaje, páginas, campañas y medición salen como un solo sistema. Cuando alguien hace clic, el lead tiene dónde aterrizar.",
  },
  {
    id: "run",
    title: "Operar",
    description:
      "Las revisiones semanales cortan el gasto flojo y empujan presupuesto hacia lo que trae leads reales. Los informes se leen en lenguaje claro.",
  },
];

const homeProcessStepsByLocale = localeContent({
  en: homeProcessStepsEn,
  "es-419": homeProcessStepsEs,
});

export const homeProcessSteps = homeProcessStepsEn;

export function getHomeProcessSteps(locale: Locale): HomeProcessStep[] {
  return homeProcessStepsByLocale[locale] ?? homeProcessStepsEn;
}
