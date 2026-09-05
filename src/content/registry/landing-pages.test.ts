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
    expect(page?.formSubtitle.toLowerCase()).toMatch(/name|email|url/);
    expect(page?.serviceArea?.some((area) => /san antonio/i.test(area))).toBe(
      true,
    );
    expect(page?.spotlight?.title).toBeTruthy();
    expect(page?.spotlight?.framed).toBe(false);
    expect(page?.spotlight?.image).toMatch(/spotlight-ads-running/);
    expect(page?.testimonial?.name).toBe("Preferred Plumbing");
    expect(page?.samples?.length).toBe(3);
    expect(page?.samples?.every((sample) => sample.framed !== false)).toBe(true);
    expect(
      page?.samples?.every((sample) =>
        sample.image.includes("/assets/images/case-studies/"),
      ),
    ).toBe(true);
    expect(page?.samples?.map((sample) => sample.client)).toEqual(
      expect.arrayContaining([
        "Preferred Plumbing",
        "A1 Property Services",
        "Manos Creativas",
      ]),
    );
    expect(page?.samples?.map((sample) => sample.client)).not.toEqual(
      googlePage?.samples?.map((sample) => sample.client),
    );
    expect(page?.samples?.every((sample) => !sample.href)).toBe(true);
    expect(page?.process?.length).toBe(3);
    expect(page?.heroMeta?.length).toBeGreaterThanOrEqual(3);
    expect(page?.scopeItems?.length).toBeGreaterThanOrEqual(4);
    expect(page?.formSteps?.length).toBe(3);
    expect(page?.headline).not.toBe(googlePage?.headline);
    expect(page?.formFootnote.toLowerCase()).toMatch(/written notes/);
    expect(page?.essentialsOnly).toBe(true);
    expect(page?.campaignLayout).toBe(true);
    expect(page?.heroStats?.length).toBe(3);
    expect(page?.formCtaHint).toBeTruthy();
    expect(page?.spotlight?.metric).toBeTruthy();
    expect(page?.faqs.some((faq) => /call instead/i.test(faq.question))).toBe(
      true,
    );
    expect(page?.faqs.some((faq) => /don't have a website/i.test(faq.question))).toBe(
      true,
    );
    expect(page?.faqs.some((faq) => /san antonio/i.test(faq.question))).toBe(
      true,
    );
  });
});

describe("dallas-website-audit landing page", () => {
  const page = getLandingPage("dallas-website-audit");
  const metaPage = getLandingPage("facebook-web-design");

  it("is a Dallas Meta sales lander for website consultations", () => {
    expect(page).toBeDefined();
    expect(page?.auditLayout).toBe(true);
    expect(page?.siteNav).toBeFalsy();
    expect(page?.campaignLayout).toBeFalsy();
    expect(page?.websiteRequired).toBeFalsy();
    expect(page?.essentialsOnly).toBe(true);
    expect(page?.phoneRequired).toBe(true);
    expect(page?.businessNameRequired).toBe(true);
    expect(page?.consentLabel?.toLowerCase()).toMatch(/contacted/);
    expect(page?.needOptions).toBeUndefined();
    expect(page?.budgetOptions).toBeUndefined();
    expect(page?.pricing).toBeUndefined();
    expect(page?.pricingQualify?.toLowerCase()).toMatch(
      /scope|functionality|integrations/,
    );
    expect(page?.pricingQualify?.toLowerCase()).not.toMatch(/\$200/);
    expect(page?.pricingPaths?.length).toBe(2);
    expect(page?.conversionKind).toBe("audit");
    expect(page?.hideServiceLink).toBe(true);
    expect(page?.badge.toLowerCase()).toContain("dallas");
    expect(page?.badge.toLowerCase()).toMatch(/more customers/);
    expect(page?.headlineLines?.join(" ").toLowerCase()).toMatch(
      /win more customers/,
    );
    expect(page?.subheadline.toLowerCase()).toMatch(
      /first website|replace|redesign/,
    );
    expect(page?.subheadline.toLowerCase()).toMatch(/dallas-area/);
    expect(page?.subheadline.toLowerCase()).toMatch(
      /calls, quote requests, bookings, and sales/,
    );
    expect(page?.heroCtaLabel?.toLowerCase()).toMatch(
      /get my free website consultation/,
    );
    expect(page?.heroStill).toBeUndefined();
    expect(page?.paths?.length).toBe(2);
    expect(page?.paths?.map((item) => item.title)).toEqual([
      "I Need a New Website",
      "I Need a Better Website",
    ]);
    expect(page?.painItems?.length).toBe(4);
    expect(page?.painTitle?.toLowerCase()).toMatch(/work as hard/);
    expect(page?.painCtaLabel?.toLowerCase()).toMatch(/consultation/);
    expect(page?.transformTitle?.toLowerCase()).toMatch(/get a quote/);
    expect(page?.transformBefore?.items).toEqual([
      "Generic headline",
      "Buried quote path",
      "Dated design",
      "Weak mobile experience",
    ]);
    expect(page?.transformAfter?.items).toEqual([
      "Clear offer",
      "One-tap quote",
      "Mobile-first layout",
      "Reviews near the decision point",
    ]);
    expect(page?.transformNote?.toLowerCase()).toMatch(/from scratch/);
    expect(page?.imagineItems?.length).toBe(3);
    expect(page?.imagineItems?.map((item) => item.title)).toEqual([
      "Modern",
      "Editorial",
      "Retro",
    ]);
    expect(page?.imagineItems?.map((item) => item.variant)).toEqual([
      "ridge",
      "haven",
      "marigold",
    ]);
    expect(page?.imagineIntro?.toLowerCase()).toMatch(/sample designs/);
    expect(page?.imagineNote?.toLowerCase()).toMatch(/custom-coded/);
    expect(page?.whyNote?.toLowerCase()).toMatch(
      /call, request a quote, book, or buy/,
    );
    expect(page?.samples?.length).toBe(3);
    expect(page?.samples?.every((sample) => !sample.href)).toBe(true);
    expect(page?.samples?.every((sample) => Boolean(sample.kind))).toBe(true);
    expect(page?.samplesIntro?.toLowerCase()).toMatch(/real projects/);
    expect(page?.workCtaTitle?.toLowerCase()).toMatch(/like what you see/);
    expect(
      page?.samples?.every((sample) =>
        sample.image.includes("/assets/images/case-studies/"),
      ),
    ).toBe(true);
    expect(page?.samples?.map((sample) => sample.client)).toEqual(
      expect.arrayContaining([
        "A1 Property Services",
        "Preferred Plumbing",
        "Manos Creativas",
      ]),
    );
    expect(page?.process?.length).toBe(4);
    expect(page?.process?.[0].title.toLowerCase()).toMatch(/new website/);
    expect(page?.process?.[1].title.toLowerCase()).toMatch(/already have/);
    expect(page?.fitVisuals?.length).toBe(6);
    expect(page?.fitTitle?.toLowerCase()).toMatch(/dallas businesses/);
    expect(page?.logos).toBeUndefined();
    expect(page?.testimonial?.name).toBe("A1 Property Services");
    expect(page?.sellPoints?.length).toBe(6);
    expect(page?.sellPoints?.filter((point) => point.quiet).map((point) => point.title)).toEqual(
      ["SEO foundation"],
    );
    expect(page?.whyItems?.length).toBe(4);
    expect(page?.whyItems?.[0].title.toLowerCase()).toMatch(/outcomes/);
    expect(page?.pricingTitle?.toLowerCase()).toMatch(/professional websites/);
    expect(page?.pricingTitle?.toLowerCase()).toMatch(/around your business/);
    expect(page?.pricingAnchor?.toLowerCase()).toMatch(/typically start around \$1,000/);
    expect(page?.proofCta?.toLowerCase()).toMatch(/see the work/);
    expect(page?.proofIntro.toLowerCase()).toMatch(
      /turn more visitors into business/,
    );
    expect(page?.proof.map((item) => item.metric)).toEqual([
      "1.8% → 3.9%",
      "22 → 52",
      "32 → 78",
    ]);
    expect(page?.formTrust?.length).toBeGreaterThanOrEqual(3);
    expect(
      page?.faqs.some((faq) => /don't have a website yet/i.test(faq.question)),
    ).toBe(true);
    expect(page?.faqs.some((faq) => /already have a website/i.test(faq.question))).toBe(
      true,
    );
    expect(page?.faqs.some((faq) => /really free/i.test(faq.question))).toBe(
      true,
    );
    expect(
      page?.faqs.every((faq) => faq.answer.trim().length > 20),
    ).toBe(true);
    expect(
      page?.faqs.some(
        (faq) =>
          /how much does a website cost/i.test(faq.question) &&
          /typically start around \$1,000/.test(faq.answer),
      ),
    ).toBe(true);
    expect(
      page?.faqs.some(
        (faq) => /templates/i.test(faq.question) && /custom/i.test(faq.answer),
      ),
    ).toBe(true);
    expect(page?.headline).not.toBe(metaPage?.headline);
    expect(page?.stickyCtaLabel.toLowerCase()).toMatch(/book free consultation/);
    expect(page?.submitLabel).toBe("Get My Free Website Consultation");
    expect(page?.formTitle).toBe("Get My Free Website Consultation");
    expect(page?.formSubtitle.toLowerCase()).toMatch(
      /recommend what to build/,
    );
    expect(page?.formCtaDetail?.toLowerCase()).toMatch(
      /not sure what your business actually needs/,
    );
    expect(page?.formCtaHint?.toLowerCase()).toMatch(/no obligation/);
    expect(page?.closingTitle?.toLowerCase()).toMatch(/build a better website/);
    expect(page?.closingCopy?.toLowerCase()).toMatch(/recommendation/);
    expect(page?.closingFinePrint?.toLowerCase()).toMatch(/no obligation/);
  });
});
