import { describe, expect, it } from "vitest";
import {
  applyLatAmSoftPricing,
  applyLocalePricing,
  applySpainEuros,
  formatEsInteger,
  getDisplayCurrency,
  toLatAmSoftCopy,
  toSpainEurosCopy,
  usesEuros,
} from "./currency";

describe("display currency", () => {
  it("uses euros for Spain and soft numeric for LatAm", () => {
    expect(getDisplayCurrency("es-ES")).toBe("EUR");
    expect(usesEuros("es-ES")).toBe(true);
    expect(getDisplayCurrency("es-419")).toBe("SOFT");
    expect(getDisplayCurrency("en")).toBe("USD");
  });
});

describe("toSpainEurosCopy", () => {
  it("rewrites $ amounts and k-shorthand", () => {
    expect(toSpainEurosCopy("from $500 to $30,000 per month")).toBe(
      "from 500 € to 30.000 € per month",
    );
    expect(toSpainEurosCopy("Menos de $10k/mes")).toBe("Menos de 10.000 €/mes");
    expect(toSpainEurosCopy("$10k-$50k/mes")).toBe("10.000 €-50.000 €/mes");
    expect(toSpainEurosCopy("$100k+/mes")).toBe("100.000 €+/mes");
  });

  it("rewrites Spanish dólar wording", () => {
    expect(toSpainEurosCopy("Gastaban 4.200 dólares al mes")).toBe(
      "Gastaban 4.200 € al mes",
    );
    expect(toSpainEurosCopy("1.500 a 4.000 dólares al mes")).toBe(
      "1.500 a 4.000 € al mes",
    );
    expect(toSpainEurosCopy("entre 40 y 80 dólares por clic")).toBe(
      "entre 40 y 80 € por clic",
    );
    expect(toSpainEurosCopy("sin gastar un dólar en publicidad")).toBe(
      "sin gastar un euro en publicidad",
    );
  });

  it("only rewrites when the locale is es-ES", () => {
    const copy = { excerpt: "Los precios oscilan entre $500 y $30,000 al mes." };
    expect(applySpainEuros(copy, "es-419").excerpt).toContain("$500");
    expect(applySpainEuros(copy, "es-ES").excerpt).toBe(
      "Los precios oscilan entre 500 € y 30.000 € al mes.",
    );
  });
});

describe("toLatAmSoftCopy", () => {
  it("strips $ framing and uses Spanish thousands grouping", () => {
    expect(toLatAmSoftCopy("Projects start at $2,000")).toBe(
      "Projects start at 2.000",
    );
    expect(toLatAmSoftCopy("$2,000–$3,000")).toBe("2.000–3.000");
    expect(toLatAmSoftCopy("entre $2,000 y $5,000+")).toBe(
      "entre 2.000 y 5.000+",
    );
    expect(toLatAmSoftCopy("Gastaban 4.200 dólares al mes")).toBe(
      "Gastaban 4.200 al mes",
    );
  });

  it("only soft-rewrites for es-419", () => {
    const copy = { excerpt: "Desde $2,000" };
    expect(applyLatAmSoftPricing(copy, "en").excerpt).toContain("$2,000");
    expect(applyLatAmSoftPricing(copy, "es-ES").excerpt).toContain("$2,000");
    expect(applyLatAmSoftPricing(copy, "es-419").excerpt).toBe("Desde 2.000");
  });
});

describe("applyLocalePricing", () => {
  it("routes Spain to euros and LatAm to soft numbers", () => {
    expect(applyLocalePricing("Start at $2,000", "es-ES")).toBe(
      "Start at 2.000 €",
    );
    expect(applyLocalePricing("Start at $2,000", "es-419")).toBe(
      "Start at 2.000",
    );
    expect(applyLocalePricing("Start at $2,000", "en")).toBe("Start at $2,000");
  });
});

describe("formatEsInteger", () => {
  it("groups thousands with a dot", () => {
    expect(formatEsInteger(500)).toBe("500");
    expect(formatEsInteger(1500)).toBe("1.500");
    expect(formatEsInteger(30000)).toBe("30.000");
  });
});
