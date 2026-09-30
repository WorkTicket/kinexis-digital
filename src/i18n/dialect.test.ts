import { describe, expect, it } from "vitest";
import { getBlogArticle } from "@/content/blog-articles";
import { getCaseStudiesContent } from "@/content/case-studies";
import { applySpanishDialect, toLatamCopy, toSpainCopy } from "./dialect";

describe("spanish dialect", () => {
  it("rewrites LatAm terms for Spain without touching euros", () => {
    expect(toSpainCopy("Si el sitio web se traba en el celular")).toBe(
      "Si la web se cuelga en el móvil",
    );
    expect(toSpainCopy("Un plomero y contratistas generales")).toBe(
      "Un fontanero y empresas de reformas",
    );
    expect(toSpainCopy("el costo y un día hábil")).toBe("el coste y un día laborable");
    expect(toSpainCopy("4.200 dólares")).toBe("4.200 dólares");
  });

  it("rewrites Spain terms for LatAm and keeps dollars", () => {
    expect(toLatamCopy("La fontanería va lenta en el móvil")).toBe(
      "La plomería va lenta en el celular",
    );
    expect(toLatamCopy("Reservar una llamada estratégica")).toBe(
      "Agendar una llamada estratégica",
    );
    expect(toLatamCopy("el coste por lead")).toBe("el costo por lead");
    expect(toLatamCopy("$2,000")).toBe("$2,000");
  });

  it("serves fontanería to Spain and plomería to LatAm from shared case studies", () => {
    const spain = getCaseStudiesContent("es-ES");
    const latam = getCaseStudiesContent("es-419");
    const spainPlumbing = spain.caseStudies.find((item) => item.slug === "plumbing-company-growth");
    const latamPlumbing = latam.caseStudies.find((item) => item.slug === "plumbing-company-growth");
    expect(spainPlumbing?.title).toContain("Fontanería");
    expect(latamPlumbing?.title).toContain("Plomería");
    expect(latamPlumbing?.revenueLift).toContain("$");
  });

  it("keeps Spain blog euros and LatAm dólares after the dialect pass", () => {
    const spain = getBlogArticle("seo-pricing-guide", "es-ES");
    const latam = getBlogArticle("seo-pricing-guide", "es-419");
    expect(spain?.body).toContain("€");
    expect(spain?.body).not.toContain("dólares");
    expect(spain?.body).not.toContain("plomero");
    expect(latam?.body).toContain("dólares");
    expect(latam?.body).not.toContain("fontanero");
    expect(applySpanishDialect("móvil", "en")).toBe("móvil");
  });
});