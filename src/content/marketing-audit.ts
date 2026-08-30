import type { Locale } from "@/i18n/routing";
import { localeContent } from "@/i18n/locale-content";

export type AuditOption = {
  label: string;
  points: number;
};

export type AuditQuestion = {
  id: string;
  prompt: string;
  options: AuditOption[];
};

export type AuditBand = {
  min: number;
  max: number;
  title: string;
  summary: string;
};

export type MarketingAuditContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  signal: string;
  copy: string;
  startLabel: string;
  nextLabel: string;
  backLabel: string;
  scoreLabel: string;
  formTitle: string;
  formSubtitle: string;
  submitLabel: string;
  formFootnote: string;
  questions: AuditQuestion[];
  bands: AuditBand[];
};

const en: MarketingAuditContent = {
  metaTitle: "Free Marketing Scorecard Audit Online",
  metaDescription:
    "Score your site, search, ads, and tracking in five minutes. Get a plain-English read on what's leaking demand and what to fix first.",
  eyebrow: "Scorecard",
  title: "Find where",
  signal: "demand dies.",
  copy: "Five questions. No pitch deck. You get a score, a short read on the bottleneck, and the option to send it to a strategist.",
  startLabel: "Start the scorecard",
  nextLabel: "Next",
  backLabel: "Back",
  scoreLabel: "Your score",
  formTitle: "Want the full read?",
  formSubtitle:
    "Leave your details and a strategist will follow up with what we'd fix first. Practical notes within one business day.",
  submitLabel: "Send my scorecard",
  formFootnote: "No automated drip. A person reads what you sent.",
  questions: [
    {
      id: "tracking",
      prompt: "Can you name the phone calls, forms, and orders each channel produced last month?",
      options: [
        { label: "Yes — tracked end to end", points: 4 },
        { label: "Partially — some channels, not all", points: 2 },
        { label: "No — we mostly watch traffic and spend", points: 0 },
      ],
    },
    {
      id: "site",
      prompt: "On a phone, is the primary CTA obvious within two seconds?",
      options: [
        { label: "Yes — call or buy is hard to miss", points: 4 },
        { label: "Somewhat — it depends on the page", points: 2 },
        { label: "No — it still feels like a desktop brochure", points: 0 },
      ],
    },
    {
      id: "search",
      prompt: "Do you rank or appear in the map pack for the jobs and products people already pay for?",
      options: [
        { label: "Yes for our core offers", points: 4 },
        { label: "Only for brand or soft queries", points: 2 },
        { label: "Not really / we don't know", points: 0 },
      ],
    },
    {
      id: "ads",
      prompt: "If you run ads, is budget tied to conversions you can defend in a P&L?",
      options: [
        { label: "Yes — waste gets cut weekly", points: 4 },
        { label: "Somewhat — reports look busy", points: 2 },
        { label: "No ads, or spend without clear CPA", points: 0 },
      ],
    },
    {
      id: "followup",
      prompt: "When a lead comes in, how fast does a human follow up?",
      options: [
        { label: "Under an hour during business hours", points: 4 },
        { label: "Same day, sometimes next", points: 2 },
        { label: "It depends / leads go cold", points: 0 },
      ],
    },
  ],
  bands: [
    {
      min: 16,
      max: 20,
      title: "Solid base. Tighten the edges.",
      summary:
        "Tracking and conversion paths are mostly working. The next gains usually come from sharper offer pages, local depth, or cutting paid waste — not a full rebuild.",
    },
    {
      min: 10,
      max: 15,
      title: "Demand is leaking in a few places.",
      summary:
        "Something between the click and the booked job is soft. Most teams in this range need one primary fix — site, search, or ads — before stacking more channels.",
    },
    {
      min: 0,
      max: 9,
      title: "Foundation first.",
      summary:
        "Traffic without measurement, or a site that hides the CTA, will burn any budget you add. Start with tracking and conversion paths before you scale spend.",
    },
  ],
};

const es: MarketingAuditContent = {
  metaTitle: "Auditoría scorecard de marketing gratis",
  metaDescription:
    "Puntúa tu web, búsqueda, anuncios y medición en cinco minutos. Una lectura clara de dónde se pierde la demanda y qué arreglar primero.",
  eyebrow: "Scorecard",
  title: "Encuentra dónde",
  signal: "muere la demanda.",
  copy: "Cinco preguntas. Sin pitch. Obtienes una puntuación, una lectura corta del cuello de botella y la opción de enviársela a un estratega.",
  startLabel: "Empezar el scorecard",
  nextLabel: "Siguiente",
  backLabel: "Atrás",
  scoreLabel: "Tu puntuación",
  formTitle: "¿Quieres la lectura completa?",
  formSubtitle:
    "Déjanos tus datos y un estratega te dirá qué arreglaríamos primero. Notas prácticas en un día hábil.",
  submitLabel: "Enviar mi scorecard",
  formFootnote: "Sin drip automático. Una persona lee lo que enviaste.",
  questions: [
    {
      id: "tracking",
      prompt:
        "¿Puedes nombrar las llamadas, formularios y pedidos que produjo cada canal el mes pasado?",
      options: [
        { label: "Sí — medido de punta a punta", points: 4 },
        { label: "Parcial — algunos canales, no todos", points: 2 },
        { label: "No — miramos sobre todo tráfico y gasto", points: 0 },
      ],
    },
    {
      id: "site",
      prompt: "En el móvil, ¿el CTA principal es obvio en dos segundos?",
      options: [
        { label: "Sí — llamar o comprar es difícil de pasar por alto", points: 4 },
        { label: "Más o menos — depende de la página", points: 2 },
        { label: "No — sigue pareciendo un folleto de escritorio", points: 0 },
      ],
    },
    {
      id: "search",
      prompt:
        "¿Apareces en rankings o en el pack de mapas para los trabajos y productos que la gente ya paga?",
      options: [
        { label: "Sí para nuestras ofertas principales", points: 4 },
        { label: "Solo marca o consultas blandas", points: 2 },
        { label: "No realmente / no lo sabemos", points: 0 },
      ],
    },
    {
      id: "ads",
      prompt:
        "Si corres anuncios, ¿el presupuesto está atado a conversiones que puedes defender en un P&L?",
      options: [
        { label: "Sí — el desperdicio se corta cada semana", points: 4 },
        { label: "Más o menos — los reportes se ven ocupados", points: 2 },
        { label: "Sin anuncios, o gasto sin CPA claro", points: 0 },
      ],
    },
    {
      id: "followup",
      prompt: "Cuando entra un lead, ¿qué tan rápido responde un humano?",
      options: [
        { label: "Menos de una hora en horario laboral", points: 4 },
        { label: "El mismo día, a veces al siguiente", points: 2 },
        { label: "Depende / los leads se enfrían", points: 0 },
      ],
    },
  ],
  bands: [
    {
      min: 16,
      max: 20,
      title: "Base sólida. Ajusta los bordes.",
      summary:
        "La medición y las rutas de conversión funcionan en buena parte. Las siguientes ganancias suelen venir de páginas de oferta más afiladas, profundidad local o recortar desperdicio en paid.",
    },
    {
      min: 10,
      max: 15,
      title: "La demanda se filtra en algunos puntos.",
      summary:
        "Algo entre el clic y el trabajo cerrado está flojo. La mayoría en este rango necesita un arreglo principal — web, búsqueda o ads — antes de apilar más canales.",
    },
    {
      min: 0,
      max: 9,
      title: "Primero la base.",
      summary:
        "Tráfico sin medición, o una web que esconde el CTA, quemará cualquier presupuesto que añadas. Empieza por tracking y conversión antes de escalar spend.",
    },
  ],
};

const byLocale = localeContent({
  en,
  "es-419": es,
});

export function getMarketingAuditContent(locale: Locale): MarketingAuditContent {
  return byLocale[locale] ?? en;
}

export function scoreAuditBand(score: number, bands: AuditBand[]): AuditBand {
  return (
    bands.find((band) => score >= band.min && score <= band.max) ??
    bands[bands.length - 1]!
  );
}

export const AUDIT_MAX_SCORE = 20;
