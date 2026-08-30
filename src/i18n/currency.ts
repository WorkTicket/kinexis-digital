import type { Locale } from "./routing";

export type DisplayCurrency = "EUR" | "USD";

export function getDisplayCurrency(locale: Locale): DisplayCurrency {
  return locale === "es-ES" ? "EUR" : "USD";
}

export function usesEuros(locale: Locale): boolean {
  return getDisplayCurrency(locale) === "EUR";
}

/** Group thousands with a dot: 30000 → "30.000". */
export function formatEsInteger(value: number): string {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function usdAmountToEuroCopy(rawDigits: string): string {
  const amount = Number(rawDigits);
  if (!Number.isFinite(amount)) return `${rawDigits} €`;
  return `${formatEsInteger(amount)} €`;
}

function kToEuroCopy(k: string): string {
  const thousands = Number(k) * 1000;
  if (!Number.isFinite(thousands)) return `${k}000 €`;
  return `${formatEsInteger(thousands)} €`;
}

/**
 * Rewrite USD marketing copy for Spain: $1,500 / $10k / "4.200 dólares" → euros.
 * Case-study facts in USD should not go through this helper.
 */
export function toSpainEurosCopy(text: string): string {
  return text
    .replace(/\$(\d+)\s*[kK]\+/g, (_, n: string) => `${kToEuroCopy(n)}+`)
    .replace(/\$(\d+)\s*[kK]/g, (_, n: string) => kToEuroCopy(n))
    .replace(/\$(\d{1,3}(?:,\d{3})+)(?:\.\d+)?/g, (_, n: string) =>
      usdAmountToEuroCopy(n.replace(/,/g, "")),
    )
    .replace(/\$(\d+(?:\.\d+)?)/g, (_, n: string) => usdAmountToEuroCopy(n))
    .replace(
      /(\d[\d.]*)\s+a\s+(\d[\d.]*)\s+dólares/gi,
      "$1 a $2 €",
    )
    .replace(
      /(\d[\d.]*)\s+hasta\s+(\d[\d.]*)\s+dólares/gi,
      "$1 hasta $2 €",
    )
    .replace(
      /(\d[\d.]*)\s+y\s+(\d[\d.]*)\s+dólares/gi,
      "$1 y $2 €",
    )
    .replace(/(\d[\d.]*)\s+dólares/gi, "$1 €")
    .replace(/(\d[\d.]*)\s+dólar\b/gi, "$1 €")
    .replace(/\bdólares\b/gi, "euros")
    .replace(/\bdólar\b/gi, "euro");
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

/** Apply euro copy only for Spain Spanish. Other locales pass through. */
export function applySpainEuros<T>(value: T, locale: Locale): T {
  if (!usesEuros(locale)) return value;
  return mapStrings(value, toSpainEurosCopy);
}
