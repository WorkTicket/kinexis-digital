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

describe("get-a-website landing page", () => {
  const page = getLandingPage("get-a-website");
  const metaPage = getLandingPage("facebook-web-design");

  it("matches live contractor lander content with soft pricing (no addon sticker board)", () => {
    expect(page).toBeDefined();
    expect(page?.slug).toBe("get-a-website");
    expect(page?.auditLayout).toBe(true);
    expect(page?.siteNav).toBeFalsy();
    expect(page?.campaignLayout).toBeFalsy();
    expect(page?.websiteRequired).toBeFalsy();
    expect(page?.hideWebsite).toBeFalsy();
    expect(page?.essentialsOnly).toBeFalsy();
    expect(page?.twoStepQualify).toBe(true);
    expect(page?.threeStepQualify).toBe(true);
    expect(page?.successHref).toBeUndefined();
    expect(page?.phoneRequired).toBe(true);
    expect(page?.phoneOptional).toBeFalsy();
    expect(page?.businessNameRequired).toBe(true);
    expect(page?.consentLabel).toMatch(/agree to be contacted/i);
    expect(page?.privacyMicrocopy?.toLowerCase()).toMatch(
      /respond to your website plan request/,
    );
    expect(page?.budgetOptions?.map((option) => option.label)).toEqual([
      "$2,000–$3,000",
      "$3,000–$5,000",
      "$5,000+",
      "Not sure yet",
    ]);
    expect(page?.timelineOptions?.map((option) => option.label)).toEqual([
      "Within 30 days",
      "One to three months",
      "More than three months",
    ]);

    // Soft pricing: live panel without Essential/Growth/Custom or $200/$120 addons
    expect(page?.pricing?.map((tier) => tier.name) ?? []).toEqual([]);
    expect(page?.pricing?.length ?? 0).toBe(0);
    expect(page?.pricingAddOns?.length ?? 0).toBe(0);
    expect(page?.pricingAnchor).toBe("$2,000");
    expect(page?.pricingTitle?.toLowerCase()).toMatch(
      /custom website projects start at \$2,000/,
    );
    expect(page?.pricingDelivery?.toLowerCase()).toMatch(/6 to 12 weeks/);
    expect(page?.pricingQualify?.toLowerCase()).toMatch(
      /final pricing depends on pages/,
    );
    expect(page?.pricingQualify?.toLowerCase()).not.toMatch(/\$200/);
    expect(page?.pricingNote?.toLowerCase()).toMatch(/website plan is free/);
    expect(page?.pricingNote?.toLowerCase()).toMatch(
      /optional hosting|optional.*support|maintenance.*support/,
    );
    expect(page?.pricingHighlights?.length).toBeGreaterThanOrEqual(2);
    expect(page?.pricingPaths).toBeUndefined();

    expect(page?.conversionKind).toBe("audit");
    expect(page?.hideServiceLink).toBe(true);
    expect(page?.badge.toLowerCase()).toMatch(/custom websites for contractors/);
    expect(page?.badge.toLowerCase()).not.toMatch(/dallas|boise/);
    expect(page?.headlineLines).toEqual([
      "Your business has grown.",
      "Your website should show it.",
    ]);
    expect(page?.subheadline.toLowerCase()).toMatch(
      /customers look you up before they call/,
    );
    expect(page?.subheadline.toLowerCase()).not.toMatch(
      /dallas|dfw|north texas|boise/,
    );
    expect(page?.heroCtaLabel?.toLowerCase()).toMatch(
      /get my free website plan/,
    );
    expect(page?.heroPrice?.toLowerCase()).toMatch(/projects start at \$2,000/);
    expect(page?.heroSecondaryLabel).toBeUndefined();
    expect(page?.heroFinePrint?.toLowerCase()).toMatch(/no obligation/);
    expect(page?.heroMeta).toEqual([
      "Custom-built, not a generic template",
      "Designed for the phone in their hand",
      "You own your website",
    ]);
    expect(page?.heroStill?.src).toMatch(/lp\/a1-desktop/);
    expect(page?.heroStill?.mobileSrc).toMatch(/lp\/a1-mobile/);
    expect(page?.paths).toBeUndefined();
    expect(page?.painItems).toBeUndefined();
    expect(page?.painStills).toBeUndefined();
    expect(page?.painTitle?.toLowerCase()).toMatch(
      /weak website can make a strong business look small/,
    );
    expect(page?.transformTitle?.toLowerCase()).toMatch(/what a rebuild changes/);
    expect(page?.transformBefore?.items.length).toBeGreaterThanOrEqual(4);
    expect(page?.transformAfter?.items.length).toBeGreaterThanOrEqual(4);
    expect(page?.outcomes?.length).toBe(4);
    expect(page?.fitGoodItems?.length).toBeGreaterThanOrEqual(4);
    expect(page?.fitNotItems?.length).toBeGreaterThanOrEqual(3);
    expect(page?.imagineItems).toBeUndefined();
    expect(page?.whyItems).toBeUndefined();
    expect(page?.samples?.length).toBe(2);
    expect(page?.samples?.every((sample) => !sample.href)).toBe(true);
    expect(page?.samples?.every((sample) => Boolean(sample.kind))).toBe(true);
    expect(page?.samples?.every((sample) => Boolean(sample.liveUrl))).toBe(true);
    expect(page?.samplesIntro?.toLowerCase()).toMatch(/live websites/);
    expect(page?.workCtaTitle?.toLowerCase()).toMatch(/what we would build/);
    expect(
      page?.samples?.every((sample) =>
        sample.image.includes("/assets/images/lp/"),
      ),
    ).toBe(true);
    expect(page?.samples?.map((sample) => sample.client)).toEqual([
      "A1 Property Services",
      "Preferred Plumbing Solutions",
    ]);
    expect(page?.samples?.map((sample) => sample.client)).not.toContain(
      "Manos Creativas",
    );
    expect(page?.process?.length).toBe(4);
    expect(page?.process?.map((step) => step.title)).toEqual([
      "Website plan",
      "Structure and design",
      "Development",
      "Launch and tracking",
    ]);
    expect(page?.fitVisuals).toBeUndefined();
    expect(page?.fitTitle?.toLowerCase()).toMatch(/right fit/);
    expect(page?.fitTitle?.toLowerCase()).not.toMatch(/dallas|boise/);
    expect(page?.fitClose).toBeUndefined();
    expect(page?.serviceArea).toBeUndefined();
    expect(page?.logos).toBeUndefined();
    expect(page?.testimonial?.name).toMatch(/A1 Property Services/);
    expect(page?.sellPoints?.length).toBe(6);
    expect(page?.sellPoints?.map((point) => point.title)).toEqual([
      "Built around your company",
      "Works on a phone",
      "Makes calling easy",
      "Stays fast",
      "Ready for search",
      "Tracked from day one",
    ]);
    expect(page?.ownershipStatement?.toLowerCase()).toMatch(/you own your website/);

    expect(getLandingPage("get-a-website", "es-419")?.pricingAnchor).toMatch(
      /\$2,000/,
    );
    expect(getLandingPage("get-a-website", "es-ES")?.pricingAnchor).toMatch(
      /2\.000 €/,
    );
    expect(getLandingPage("get-a-website", "es-419")?.pricing).toEqual([]);
    expect(getLandingPage("get-a-website", "es-ES")?.pricing).toEqual([]);
    expect(
      getLandingPage("get-a-website", "es-419")?.pricingAddOns?.length ?? 0,
    ).toBe(0);
    expect(
      getLandingPage("get-a-website", "es-ES")?.pricingAddOns?.length ?? 0,
    ).toBe(0);

    expect(getLandingPage("get-a-website", "en")?.whatsappHref).toBeUndefined();
    expect(getLandingPage("get-a-website", "es-419")?.whatsappHref).toMatch(
      /^https:\/\/wa\.me\/13075003371/,
    );
    expect(getLandingPage("get-a-website", "es-ES")?.whatsappHref).toMatch(
      /^https:\/\/wa\.me\/13075003371/,
    );
    expect(getLandingPage("get-a-website", "es-419")?.whatsappHeroLabel).toBe(
      "Escribir por WhatsApp",
    );
    expect(getLandingPage("get-a-website", "es-ES")?.whatsappPlanLabel).toBe(
      "Escribir por WhatsApp",
    );

    expect(page?.proofIntro.toLowerCase()).toMatch(/individual results vary/);
    expect(page?.proof.map((item) => item.metric)).toEqual([
      "Custom built",
      "You own it",
      "$2,000",
      "Optional",
    ]);
    expect(page?.proof.map((item) => item.label).join(" ").toLowerCase()).not.toMatch(
      /\$200/,
    );
    expect(page?.proof.map((item) => item.label).join(" ")).not.toMatch(/orders/);
    expect(page?.formTrust?.length).toBeGreaterThanOrEqual(3);
    expect(page?.heroMeta?.join(" ").toLowerCase()).not.toMatch(
      /dallas|dfw|north texas|boise/,
    );
    expect(page?.formTrust?.join(" ").toLowerCase()).not.toMatch(
      /dallas|dfw|north texas|boise/,
    );
    expect(`${page?.metaTitle} ${page?.metaDescription}`.toLowerCase()).not.toMatch(
      /dallas|dfw|north texas|boise/,
    );
    expect(page?.faqs.length).toBe(9);
    expect(page?.faqs.every((faq) => faq.answer.trim().length > 20)).toBe(true);
    expect(
      page?.faqs.some(
        (faq) =>
          /how much does a custom website cost/i.test(faq.question) &&
          /\$2,000/.test(faq.answer),
      ),
    ).toBe(true);
    expect(
      page?.faqs.some(
        (faq) =>
          /is hosting included/i.test(faq.question) &&
          !/\$120/.test(faq.answer),
      ),
    ).toBe(true);
    expect(
      page?.faqs.some(
        (faq) =>
          /monthly maintenance/i.test(faq.question) &&
          !/\$200/.test(faq.answer),
      ),
    ).toBe(true);
    expect(
      page?.faqs.some(
        (faq) => /own my website/i.test(faq.question) && /own/i.test(faq.answer),
      ),
    ).toBe(true);
    expect(page?.headline).not.toBe(metaPage?.headline);
    expect(page?.stickyCtaLabel.toLowerCase()).toMatch(/website plan/);
    expect(page?.submitLabel).toBe("Send My Website Plan Request");
    expect(page?.formTitle.toLowerCase()).toMatch(/free website plan/);
    expect(page?.formSubtitle.toLowerCase()).toMatch(
      /tell us about the business/,
    );
    expect(page?.formCtaDetail).toBeUndefined();
    expect(page?.formCtaHint?.toLowerCase()).toMatch(/no obligation/);
    expect(page?.formSteps?.length).toBe(3);
    expect(page?.formStep1Title?.toLowerCase()).toMatch(/about the business/);
    expect(page?.formStep2Title?.toLowerCase()).toMatch(/about the project/);
    expect(page?.closingTitle?.toLowerCase()).toMatch(/free website plan/);
    expect(page?.closingFinePrint?.toLowerCase()).toMatch(/no obligation/);
    expect(page?.marketLine?.toLowerCase()).toMatch(
      /contractors & home-service businesses/,
    );
    expect(page?.planHasSiteItems?.length).toBeGreaterThanOrEqual(4);
    expect(page?.planNoSiteItems?.length).toBeGreaterThanOrEqual(4);
  });
});
