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

  it("maps locale-prefixed long-tail services onto flagship pages", () => {
    expect(resolveLegacyRedirect("/en/services/local-seo")).toEqual({
      path: "/services/seo",
      hash: "",
    });
    expect(resolveLegacyRedirect("/es/services/ppc-management")).toEqual({
      path: "/services/paid-media",
      hash: "",
    });
    expect(resolveLegacyRedirect("/en/services/fractional-cmo")).toEqual({
      path: "/services",
      hash: "",
    });
  });

  it("keeps flagship service pages live", () => {
    expect(resolveLegacyRedirect("/services/seo")).toBeNull();
    expect(resolveLegacyRedirect("/services/web-design")).toBeNull();
    expect(resolveLegacyRedirect("/services/paid-media")).toBeNull();
    expect(resolveLegacyRedirect("/services/branding")).toBeNull();
    expect(resolveLegacyRedirect("/services/content-marketing")).toBeNull();
    expect(resolveLegacyRedirect("/en/services/seo")).toEqual({
      path: "/services/seo",
      hash: "",
    });
  });

  it("retires the clients roster onto case studies", () => {
    expect(resolveLegacyRedirect("/clients")).toEqual({
      path: "/case-studies",
      hash: "",
    });
    expect(resolveLegacyRedirect("/en/clients")).toEqual({
      path: "/case-studies",
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
    expect(matchUnprefixedLegacyRedirect("/lp/facebook-web-design")).toBeNull();
    expect(matchUnprefixedLegacyRedirect("/lp/dallas-website-audit")).toBeNull();
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
  it("keeps flagships on dedicated paths and sends related slugs to the parent page", () => {
    expect(serviceHubPath("seo")).toBe("/services/seo");
    expect(serviceHubPath("web-design")).toBe("/services/web-design");
    expect(serviceHubPath("paid-media")).toBe("/services/paid-media");
    expect(serviceHubPath("branding")).toBe("/services/branding");
    expect(serviceHubPath("content-marketing")).toBe("/services/content-marketing");
    expect(serviceHubPath("meta-ads")).toBe("/services/paid-media");
    expect(serviceHubPath("copywriting")).toBe("/services/content-marketing");
    expect(serviceHubPath("growth-consulting")).toBe("/services");
  });
});
