import type { Locale } from "./routing";

type Pair = readonly [from: string, to: string];

/** Longer phrases first so shorter lemmas do not eat them. */
const TO_SPAIN: Pair[] = [
  ["contratistas generales", "empresas de reformas"],
  ["contratista general", "empresa de reformas"],
  ["los contratistas", "las empresas de reformas"],
  ["las contratistas", "las empresas de reformas"],
  ["un contratista", "una empresa de reformas"],
  ["una contratista", "una empresa de reformas"],
  ["del sitio web", "de la web"],
  ["al sitio web", "a la web"],
  ["el sitio web", "la web"],
  ["un sitio web", "una web"],
  ["los sitios web", "las webs"],
  ["sitios web", "webs"],
  ["sitio web", "web"],
  ["se traba", "se cuelga"],
  ["días hábiles", "días laborables"],
  ["día hábil", "día laborable"],
  ["estacionamientos", "aparcamientos"],
  ["estacionamiento", "aparcamiento"],
  ["computadoras", "ordenadores"],
  ["computadora", "ordenador"],
  ["aire acondicionado", "climatización"],
  ["techados", "cubiertas"],
  ["plomería", "fontanería"],
  ["plomeros", "fontaneros"],
  ["plomero", "fontanero"],
  ["celulares", "móviles"],
  ["celular", "móvil"],
  ["contratistas", "empresas de reformas"],
  ["contratista", "empresa de reformas"],
  ["calificadas", "cualificadas"],
  ["calificados", "cualificados"],
  ["calificada", "cualificada"],
  ["calificado", "cualificado"],
  ["agendando", "reservando"],
  ["agendamos", "reservamos"],
  ["agendada", "reservada"],
  ["agendado", "reservado"],
  ["agendar", "reservar"],
  ["costos", "costes"],
  ["costo", "coste"],
];

const TO_LATAM: Pair[] = [
  ["reservar una llamada", "agendar una llamada"],
  ["reserva una llamada", "agenda una llamada"],
  ["días laborables", "días hábiles"],
  ["día laborable", "día hábil"],
  ["aparcamientos", "estacionamientos"],
  ["aparcamiento", "estacionamiento"],
  ["ordenadores", "computadoras"],
  ["ordenador", "computadora"],
  ["climatización", "aire acondicionado"],
  ["cubiertas", "techados"],
  ["fontanería", "plomería"],
  ["fontaneros", "plomeros"],
  ["fontanero", "plomero"],
  ["móviles", "celulares"],
  ["móvil", "celular"],
  ["se cuelga", "se traba"],
  ["cualificadas", "calificadas"],
  ["cualificados", "calificados"],
  ["cualificada", "calificada"],
  ["cualificado", "calificado"],
  ["coger el teléfono", "tomar el teléfono"],
  ["costes", "costos"],
  ["coste", "costo"],
];

function replaceTerm(text: string, from: string, to: string): string {
  const pattern = from
    .split(" ")
    .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("\\s+");
  return text.replace(new RegExp(`(?<![\\p{L}\\p{N}_])${pattern}(?![\\p{L}\\p{N}_])`, "giu"), (match) => {
    const first = match.trimStart()[0];
    if (first && first === first.toUpperCase() && first !== first.toLowerCase()) {
      return to.charAt(0).toUpperCase() + to.slice(1);
    }
    return to;
  });
}

function applyPairs(text: string, pairs: Pair[]): string {
  return pairs.reduce((next, [from, to]) => replaceTerm(next, from, to), text);
}

export function toSpainCopy(text: string): string {
  return applyPairs(text, TO_SPAIN);
}

export function toLatamCopy(text: string): string {
  return applyPairs(text, TO_LATAM);
}

function mapStrings<T>(value: T, fn: (s: string) => string): T {
  if (typeof value === "string") return fn(value) as T;
  if (Array.isArray(value)) return value.map((item) => mapStrings(item, fn)) as T;
  if (value && typeof value === "object") {
    const next: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
      next[key] = mapStrings(nested, fn);
    }
    return next as T;
  }
  return value;
}

/** Normalize shared Spanish copy for the locale that will read it. English passes through. */
export function applySpanishDialect<T>(value: T, locale: Locale): T {
  if (locale === "es-ES") return mapStrings(value, toSpainCopy);
  if (locale === "es-419") return mapStrings(value, toLatamCopy);
  return value;
}
