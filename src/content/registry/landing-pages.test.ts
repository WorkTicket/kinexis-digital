import { describe, expect, it } from "vitest";
import { getLandingPage } from "@/content/registry/landing-pages";

describe("web-design landing page", () => {
  const page = getLandingPage("web-design");

  it("is configured as a Search lander for design and development", () => {
    expect(page).toBeDefined();
    expect(page?.websiteRequired).toBeFalsy();
    expect(page?.hideServiceLink).toBe(true);
    expect(page?.conversionKind).toBe("audit");
    expect(page?.heroIntake).toBe(true);
    expect(page?.stagedHeroForm).toBeFalsy();
    expect(page?.headline.toLowerCase()).toContain("design");
    expect(page?.headlineAccent.toLowerCase()).toContain("build");
    expect(page?.subheadline.toLowerCase()).toContain("mobile load");
    expect(page?.subheadline.toLowerCase()).toMatch(/new|first site|don't/);
    expect(page?.formSubtitle.toLowerCase()).toContain("cta");
    expect(page?.faqs.some((faq) => /don't have a website/i.test(faq.question))).toBe(
      true,
    );
    expect(page?.samples?.length).toBeGreaterThanOrEqual(2);
    expect(page?.samples?.every((sample) => sample.href)).toBe(true);
    expect(page?.samples?.map((sample) => sample.client)).toEqual(
      expect.arrayContaining([
        "A1 Property Services",
        "Preferred Plumbing",
        "Manos Creativas",
      ]),
    );
    expect(page?.process?.length).toBe(3);
    expect(page?.heroMeta?.length).toBeGreaterThanOrEqual(3);
    expect(page?.scopeItems?.length).toBeGreaterThanOrEqual(4);
    expect(page?.formSteps?.length).toBe(3);
    expect(page?.closingTitle).toBeTruthy();
    expect(page?.logos?.length).toBeGreaterThanOrEqual(3);
    expect(page?.testimonial?.name).toBe("A1 Property Services");
    expect(page?.spotlight).toBeUndefined();
  });
});

describe("facebook-web-design landing page", () => {
  const page = getLandingPage("facebook-web-design");
  const googlePage = getLandingPage("web-design");

  it("matches the San Antonio Meta ad and puts the consult in the hero", () => {
    expect(page).toBeDefined();
    expect(page?.heroIntake).toBe(true);
    expect(page?.stagedHeroForm).toBeFalsy();
    expect(page?.websiteRequired).toBeFalsy();
    expect(page?.hideServiceLink).toBe(true);
    expect(page?.conversionKind).toBe("audit");
    expect(page?.headline.toLowerCase()).toContain("website");
    expect(page?.headlineAccent.toLowerCase()).toContain("customers");
    expect(page?.badge.toLowerCase()).toContain("san antonio");
    expect(page?.subheadline.toLowerCase()).toContain("san antonio");
    expect(page?.formTitle.toLowerCase()).toContain("consult");
    expect(page?.formSubtitle.toLowerCase()).toMatch(/site.*ads|ads.*site/);
    expect(page?.serviceArea?.some((area) => /san antonio/i.test(area))).toBe(
      true,
    );
    expect(page?.spotlight?.title).toBeTruthy();
    expect(page?.testimonial?.name).toBe("Preferred Plumbing");
    expect(page?.samples?.length).toBeGreaterThanOrEqual(2);
    expect(page?.samples?.map((sample) => sample.client)).toEqual(
      expect.arrayContaining(["Preferred Plumbing"]),
    );
    expect(page?.samples?.map((sample) => sample.client)).not.toEqual(
      googlePage?.samples?.map((sample) => sample.client),
    );
    expect(page?.process?.length).toBe(3);
    expect(page?.heroMeta?.length).toBeGreaterThanOrEqual(3);
    expect(page?.scopeItems?.length).toBeGreaterThanOrEqual(4);
    expect(page?.formSteps?.length).toBe(3);
    expect(page?.headline).not.toBe(googlePage?.headline);
    expect(page?.faqs.some((faq) => /don't have a website/i.test(faq.question))).toBe(
      true,
    );
    expect(page?.faqs.some((faq) => /san antonio/i.test(faq.question))).toBe(
      true,
    );
  });
});
