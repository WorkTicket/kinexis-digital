import { describe, expect, it } from "vitest";
import {
  getLegacyRedirects,
  matchIndustryPath,
  matchUnprefixedLegacyRedirect,
  resolveLegacyRedirect,
  serviceHubPath,
} from "./legacy-redirects.mjs";

describe("resolveLegacyRedirect", () => {
  it("strips locale in one hop onto the unprefixed path", () => {
    expect(resolveLegacyRedirect("/en")).toEqual({ path: "/", hash: "" });
    expect(resolveLegacyRedirect("/es/about")).toEqual({ path: "/about", hash: "" });
    expect(resolveLegacyRedirect("/en/lp/seo")).toEqual({ path: "/lp/seo", hash: "" });
    expect(resolveLegacyRedirect("/en/thank-you/audit")).toEqual({
      path: "/thank-you/audit",
      hash: "",
    });
  });

  it("does not redirect canonical rebuild URLs", () => {
    expect(resolveLegacyRedirect("/")).toBeNull();
    expect(resolveLegacyRedirect("/about")).toBeNull();
    expect(resolveLegacyRedirect("/contact")).toBeNull();
    expect(resolveLegacyRedirect("/services")).toBeNull();
    expect(resolveLegacyRedirect("/industries")).toBeNull();
    expect(resolveLegacyRedirect("/industries/home-services")).toBeNull();
    expect(resolveLegacyRedirect("/industries/ecommerce")).toBeNull();
    expect(resolveLegacyRedirect("/lp/seo")).toBeNull();
    expect(resolveLegacyRedirect("/thank-you")).toBeNull();
    expect(resolveLegacyRedirect("/thank-you/audit")).toBeNull();
  });

  it("maps locale-prefixed service URLs straight to the hub anchor", () => {
    expect(resolveLegacyRedirect("/en/services/seo")).toEqual({
      path: "/services",
      hash: "seo",
    });
    expect(resolveLegacyRedirect("/es/services/ppc-management")).toEqual({
      path: "/services",
      hash: "paid-media",
    });
    expect(resolveLegacyRedirect("/en/services/fractional-cmo")).toEqual({
      path: "/services",
      hash: "",
    });
  });

  it("maps nested industry URLs in one hop", () => {
    expect(resolveLegacyRedirect("/en/industries/technology/startups")).toEqual({
      path: "/industries",
      hash: "saas",
    });
    expect(resolveLegacyRedirect("/en/industries/home-services/hvac")).toEqual({
      path: "/industries/home-services",
      hash: "",
    });
    expect(resolveLegacyRedirect("/en/industries/healthcare/dental")).toEqual({
      path: "/industries",
      hash: "dental",
    });
    expect(resolveLegacyRedirect("/en/industries/manufacturing/aerospace")).toEqual({
      path: "/industries",
      hash: "",
    });
  });
});

describe("matchUnprefixedLegacyRedirect", () => {
  it("retires pricing, solutions, team, and comparisons", () => {
    expect(matchUnprefixedLegacyRedirect("/pricing/seo")).toBe("/contact");
    expect(matchUnprefixedLegacyRedirect("/solutions/seo-for-hvac-companies")).toBe(
      "/services",
    );
    expect(matchUnprefixedLegacyRedirect("/team/sarah-mitchell")).toBe("/about");
    expect(matchUnprefixedLegacyRedirect("/google-ads-vs-seo")).toBe("/resources");
    expect(matchUnprefixedLegacyRedirect("/lead-magnet")).toBe("/contact");
    expect(matchUnprefixedLegacyRedirect("/lp")).toBe("/contact");
  });

  it("keeps paid landing page slugs", () => {
    expect(matchUnprefixedLegacyRedirect("/lp/seo")).toBeNull();
    expect(matchUnprefixedLegacyRedirect("/lp/google-ads-management")).toBeNull();
    expect(matchUnprefixedLegacyRedirect("/lp/local-seo")).toBeNull();
    expect(matchUnprefixedLegacyRedirect("/lp/web-design")).toBeNull();
  });
});

describe("matchIndustryPath", () => {
  it("keeps standalone market pages", () => {
    expect(matchIndustryPath("/industries/home-services")).toBeNull();
    expect(matchIndustryPath("/industries/ecommerce")).toBeNull();
  });

  it("collapses nested standalone paths onto the parent page", () => {
    expect(matchIndustryPath("/industries/ecommerce/shopify-brands")).toBe(
      "/industries/ecommerce",
    );
  });

  it("maps retired live categories", () => {
    expect(matchIndustryPath("/industries/technology")).toBe("/industries#saas");
    expect(matchIndustryPath("/industries/hospitality")).toBe(
      "/industries#restaurants",
    );
    expect(matchIndustryPath("/industries/manufacturing")).toBe("/industries");
  });
});

describe("getLegacyRedirects", () => {
  it("sends nested dental to #dental before the healthcare catch-all", () => {
    const redirects = getLegacyRedirects();
    const dental = redirects.find(
      (rule) => rule.source === "/en/industries/healthcare/dental",
    );
    const healthcareCatchAll = redirects.find(
      (rule) => rule.source === "/en/industries/healthcare/:path*",
    );
    expect(dental).toBeDefined();
    expect(healthcareCatchAll).toBeDefined();
    expect(dental!.destination).toBe("/industries#dental");
    expect(healthcareCatchAll!.destination).toBe("/industries#healthcare");
    expect(redirects.indexOf(dental!)).toBeLessThan(
      redirects.indexOf(healthcareCatchAll!),
    );
  });
});

describe("serviceHubPath", () => {
  it("anchors known slugs onto the five pillars", () => {
    expect(serviceHubPath("seo")).toBe("/services#seo");
    expect(serviceHubPath("meta-ads")).toBe("/services#paid-media");
    expect(serviceHubPath("copywriting")).toBe("/services#content-marketing");
    expect(serviceHubPath("growth-consulting")).toBe("/services");
  });
});
