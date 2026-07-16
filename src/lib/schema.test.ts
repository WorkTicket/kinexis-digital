import { describe, it, expect } from "vitest";
import {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
  personSchema,
  articleSchema,
  caseStudySchema,
} from "@/lib/schema";

import type { JsonLdEntity } from "@/lib/schema";

function isValidJsonLdEntity(val: unknown): val is JsonLdEntity {
  return (
    typeof val === "object" &&
    val !== null &&
    (val as JsonLdEntity)["@context"] === "https://schema.org" &&
    typeof (val as JsonLdEntity)["@type"] === "string"
  );
}

describe("organizationSchema", () => {
  it("returns a valid JSON-LD entity", () => {
    const result = organizationSchema();
    expect(isValidJsonLdEntity(result)).toBe(true);
    expect(result["@type"]).toBe("Organization");
  });
});

describe("localBusinessSchema", () => {
  it("returns a valid JSON-LD entity", () => {
    const result = localBusinessSchema();
    expect(isValidJsonLdEntity(result)).toBe(true);
    expect(result["@type"]).toBe("ProfessionalService");
  });

  it("includes parentOrganization reference", () => {
    const result = localBusinessSchema();
    expect(result.parentOrganization).toEqual({ "@id": expect.stringContaining("/#organization") });
  });
});

describe("websiteSchema", () => {
  it("returns a valid JSON-LD entity", () => {
    const result = websiteSchema();
    expect(isValidJsonLdEntity(result)).toBe(true);
    expect(result["@type"]).toBe("WebSite");
  });
});

describe("serviceSchema", () => {
  it("returns a valid JSON-LD entity with default areaServed", () => {
    const result = serviceSchema("Test Service", "A test", "https://example.com/test");
    expect(isValidJsonLdEntity(result)).toBe(true);
    expect(result["@type"]).toBe("Service");
    expect(result.name).toBe("Test Service");
  });
});

describe("faqSchema", () => {
  it("returns FAQPage with items", () => {
    const items = [
      { question: "Q1?", answer: "A1." },
      { question: "Q2?", answer: "A2." },
    ];
    const result = faqSchema(items);
    expect(isValidJsonLdEntity(result)).toBe(true);
    expect(result["@type"]).toBe("FAQPage");
  });

  it("handles empty array", () => {
    const result = faqSchema([]);
    expect(isValidJsonLdEntity(result)).toBe(true);
  });
});

describe("breadcrumbSchema", () => {
  it("returns BreadcrumbList with items", () => {
    const items = [
      { name: "Home", url: "/" },
      { name: "About" },
    ];
    const result = breadcrumbSchema(items);
    expect(isValidJsonLdEntity(result)).toBe(true);
    expect(result["@type"]).toBe("BreadcrumbList");
  });

  it("handles empty array", () => {
    const result = breadcrumbSchema([]);
    expect(isValidJsonLdEntity(result)).toBe(true);
  });
});

describe("personSchema", () => {
  it("returns a valid Person entity", () => {
    const result = personSchema({
      name: "John Doe",
      jobTitle: "CEO",
      description: "CEO at KINEXIS",
      url: "https://example.com/john",
    });
    expect(isValidJsonLdEntity(result)).toBe(true);
    expect(result["@type"]).toBe("Person");
  });

  it("includes image when provided", () => {
    const result = personSchema({
      name: "John Doe",
      jobTitle: "CEO",
      description: "CEO at KINEXIS",
      url: "https://example.com/john",
      image: "https://example.com/john.jpg",
    });
    expect(result.image).toBe("https://example.com/john.jpg");
  });
});

describe("articleSchema", () => {
  it("returns a valid Article entity", () => {
    const result = articleSchema({
      title: "Test Article",
      description: "A test article",
      url: "https://example.com/article",
      datePublished: "2026-01-15",
    });
    expect(isValidJsonLdEntity(result)).toBe(true);
    expect(result["@type"]).toBe("Article");
  });
});

describe("caseStudySchema", () => {
  it("returns a valid Article entity for case studies", () => {
    const result = caseStudySchema({
      title: "Case Study",
      description: "A case study",
      url: "https://example.com/case-study",
      industry: "Technology",
      datePublished: "2026-03-01",
    });
    expect(isValidJsonLdEntity(result)).toBe(true);
    expect(result["@type"]).toBe("Article");
  });
});

describe("toSchemaDate integration", () => {
  it("articleSchema converts display dates to ISO 8601", () => {
    const result = articleSchema({
      title: "Test",
      description: "A test",
      url: "https://example.com",
      datePublished: "June 15, 2026",
    });
    expect(result.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("serviceSchema with areaServed", () => {
  it("includes city-level areaServed", () => {
    const result = serviceSchema("Local SEO", "Local SEO service", "https://example.com/local-seo", {
      city: "Austin",
      region: "Texas",
    });
    expect(result.areaServed).toEqual({
      "@type": "City",
      name: "Austin",
      containedInPlace: { "@type": "State", name: "Texas" },
    });
  });

  it("includes country-level areaServed when not provided", () => {
    const result = serviceSchema("Worldwide Service", "Global", "https://example.com/global");
    expect(result.areaServed).toEqual({ "@type": "Country", name: "Worldwide" });
  });
});
