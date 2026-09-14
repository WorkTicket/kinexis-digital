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

  it("is a contractor Meta lander for a free website plan, not a city office claim", () => {
    expect(page).toBeDefined();
    expect(page?.slug).toBe("get-a-website");
    expect(page?.auditLayout).toBe(true);
    expect(page?.siteNav).toBeFalsy();
    expect(page?.campaignLayout).toBeFalsy();
    expect(page?.websiteRequired).toBeFalsy();
    expect(page?.hideWebsite).toBeFalsy();
    expect(page?.essentialsOnly).toBeFalsy();
    expect(page?.twoStepQualify).toBe(true);
    expect(page?.successHref).toBeUndefined();
    expect(page?.phoneRequired).toBe(true);
    expect(page?.phoneOptional).toBeFalsy();
    expect(page?.businessNameRequired).toBe(true);
    expect(page?.consentLabel).toBeUndefined();
    expect(page?.privacyMicrocopy?.toLowerCase()).toMatch(
      /respond to your website request/,
    );
    expect(page?.budgetOptions?.map((option) => option.label)).toEqual([
      "$1,500–$3,000",
      "$3,000–$5,000",
      "$5,000+",
      "Not sure yet",
    ]);
    expect(page?.timelineOptions?.map((option) => option.label)).toEqual([
      "ASAP",
      "Within 30 days",
      "1–3 months",
      "Just researching",
    ]);
    expect(page?.pricing?.map((tier) => tier.name)).toEqual([
      "Essential",
      "Growth",
      "Custom",
    ]);
    expect(page?.pricing?.every((tier) => !tier.featured)).toBe(true);
    expect(page?.pricingQualify?.toLowerCase()).toMatch(
      /most kinexis builds fall into one of these ranges/,
    );
    expect(page?.pricingQualify?.toLowerCase()).not.toMatch(/\$200/);
    expect(page?.conversionKind).toBe("audit");
    expect(page?.hideServiceLink).toBe(true);
    expect(page?.badge.toLowerCase()).toMatch(/contractors & home services/);
    expect(page?.badge.toLowerCase()).not.toMatch(/dallas|boise/);
    expect(page?.headlineLines?.join(" ").toLowerCase()).toMatch(
      /build your business/,
    );
    expect(page?.headlineLines?.join(" ").toLowerCase()).toMatch(
      /we'll build the website/,
    );
    expect(page?.subheadline.toLowerCase()).toMatch(
      /calls, quote requests, and booked work/,
    );
    expect(page?.subheadline.toLowerCase()).not.toMatch(
      /dallas|dfw|north texas|boise/,
    );
    expect(page?.heroCtaLabel?.toLowerCase()).toMatch(
      /get my free website plan/,
    );
    expect(page?.heroSecondaryLabel).toBeUndefined();
    expect(page?.heroFinePrint?.toLowerCase()).toMatch(/no obligation/);
    expect(page?.heroFinePrint?.toLowerCase()).not.toMatch(/\$2,000/);
    expect(page?.heroMeta).toEqual([
      "Custom built",
      "Mobile first",
      "SEO ready",
      "You own it",
    ]);
    expect(page?.heroStill?.src).toMatch(/lp\/a1-desktop/);
    expect(page?.heroStill?.mobileSrc).toMatch(/lp\/a1-mobile/);
    expect(page?.paths).toBeUndefined();
    expect(page?.painItems?.length).toBe(4);
    expect(page?.painItems?.map((item) => item.title)).toEqual([
      "Mobile",
      "Calls",
      "Speed",
      "Search",
    ]);
    expect(page?.painStills).toBeUndefined();
    expect(page?.painTitle?.toLowerCase()).toMatch(/lose the job/);
    expect(page?.transformTitle).toBeUndefined();
    expect(page?.transformBefore).toBeUndefined();
    expect(page?.transformAfter).toBeUndefined();
    expect(page?.imagineItems).toBeUndefined();
    expect(page?.whyItems).toBeUndefined();
    expect(page?.samples?.length).toBe(2);
    expect(page?.samples?.every((sample) => !sample.href)).toBe(true);
    expect(page?.samples?.every((sample) => Boolean(sample.kind))).toBe(true);
    expect(page?.samplesIntro?.toLowerCase()).toMatch(/live kinexis sites/);
    expect(page?.workCtaTitle).toBeUndefined();
    expect(
      page?.samples?.every((sample) =>
        sample.image.includes("/assets/images/case-studies/"),
      ),
    ).toBe(true);
    expect(page?.samples?.map((sample) => sample.client)).toEqual([
      "A1 Property Services",
      "Preferred Plumbing",
    ]);
    expect(page?.samples?.map((sample) => sample.client)).not.toContain(
      "Manos Creativas",
    );
    expect(page?.process?.length).toBe(3);
    expect(page?.process?.map((step) => step.title)).toEqual([
      "Plan",
      "Build",
      "Launch",
    ]);
    expect(page?.fitVisuals).toBeUndefined();
    expect(page?.fitItems).toEqual([
      "Construction",
      "Roofing",
      "Plumbing",
      "HVAC",
      "Landscaping",
      "Electrical",
      "Remodeling",
      "Home Services",
    ]);
    expect(page?.fitTitle?.toLowerCase()).toMatch(/contractors & home services/);
    expect(page?.fitTitle?.toLowerCase()).not.toMatch(/dallas|boise/);
    expect(page?.fitClose).toBeUndefined();
    expect(page?.serviceArea).toBeUndefined();
    expect(page?.logos).toBeUndefined();
    expect(page?.testimonial).toBeUndefined();
    expect(page?.sellPoints?.length).toBe(7);
    expect(
      page?.sellPoints?.filter((point) => !point.quiet).map((point) => point.title),
    ).toEqual([
      "Custom Design",
      "Mobile First",
      "Conversion Path",
      "Performance",
      "SEO Foundation",
      "You Own It",
    ]);
    expect(page?.sellPoints?.some((point) => point.quiet)).toBe(true);
    expect(page?.pricingTitle?.toLowerCase()).toMatch(
      /what does a custom website cost/,
    );
    expect(page?.pricing?.map((tier) => tier.price)).toEqual([
      "$2,000–$3,000",
      "$3,000–$5,000",
      "$5,000+",
    ]);
    expect(page?.proofIntro.toLowerCase()).toMatch(/individual results vary/);
    expect(page?.proof.map((item) => item.metric)).toEqual([
      "1.8% → 3.9%",
      "22 → 52",
      "Custom built",
      "You own it",
    ]);
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
    expect(
      page?.faqs.some((faq) => /do i need an existing website/i.test(faq.question)),
    ).toBe(true);
    expect(page?.faqs.some((faq) => /raleigh/i.test(faq.question))).toBe(true);
    expect(
      page?.faqs.every(
        (faq) => /raleigh-based|local raleigh/i.test(faq.answer) === false,
      ),
    ).toBe(true);
    expect(page?.faqs.length).toBe(6);
    expect(page?.faqs.every((faq) => faq.answer.trim().length > 20)).toBe(true);
    expect(
      page?.faqs.some(
        (faq) =>
          /how much does a website cost/i.test(faq.question) &&
          /\$2,000/.test(faq.answer) &&
          /\$5,000/.test(faq.answer),
      ),
    ).toBe(true);
    expect(
      page?.faqs.some(
        (faq) =>
          /is seo included/i.test(faq.question) &&
          /not a promise of search rankings/i.test(faq.answer),
      ),
    ).toBe(true);
    expect(
      page?.faqs.some(
        (faq) => /own my website/i.test(faq.question) && /own/i.test(faq.answer),
      ),
    ).toBe(true);
    expect(page?.headline).not.toBe(metaPage?.headline);
    expect(page?.stickyCtaLabel.toLowerCase()).toMatch(/website plan/);
    expect(page?.submitLabel).toBe("Get My Free Website Plan");
    expect(page?.formTitle.toLowerCase()).toMatch(/plan the website/);
    expect(page?.formSubtitle.toLowerCase()).toMatch(
      /tell us a little about your business/,
    );
    expect(page?.formCtaDetail).toBeUndefined();
    expect(page?.formCtaHint?.toLowerCase()).toMatch(/no obligation/);
    expect(page?.formSteps?.length).toBe(3);
    expect(page?.formStep1Title?.toLowerCase()).toMatch(
      /tell us about the business/,
    );
    expect(page?.formStep2Title?.toLowerCase()).toMatch(
      /where should we send your plan/,
    );
    expect(page?.closingTitle?.toLowerCase()).toMatch(/looks the part/);
    expect(page?.closingCopy?.toLowerCase()).not.toMatch(/whether you're/);
    expect(page?.closingFinePrint?.toLowerCase()).toMatch(/no obligation/);
    expect(page?.marketLine?.toLowerCase()).toMatch(
      /contractors & home-service businesses/,
    );
    expect(page?.planHasSiteItems?.length).toBeGreaterThanOrEqual(4);
    expect(page?.planNoSiteItems?.length).toBeGreaterThanOrEqual(4);
  });
});
