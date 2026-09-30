import { describe, expect, it } from "vitest";
import { STANDALONE_INDUSTRY_SLUGS as contentStandalone } from "@/content/industries";
import {
  getLegacyRedirects,
  matchIndustryPath,
  matchUnprefixedLegacyRedirect,
  resolveLegacyRedirect,
  serviceHubPath,
  STANDALONE_INDUSTRY_SLUGS as redirectStandalone,
} from "./legacy-redirects.mjs";

describe("resolveLegacyRedirect", () => {
  it("strips locale in one hop onto the unprefixed path", () => {
    expect(resolveLegacyRedirect("/en")).toEqual({ path: "/", hash: "" });
    expect(resolveLegacyRedirect("/es/about")).toEqual({ path: "/about", hash: "" });
    expect(resolveLegacyRedirect("/en/lp/seo")).toEqual({
      path: "/lp/get-a-website",
      hash: "",
    });
    expect(resolveLegacyRedirect("/en/thank-you/audit")).toEqual({
      path: "/thank-you/audit",
      hash: "",
    });
    expect(resolveLegacyRedirect("/es-ES/about")).toEqual({ path: "/about", hash: "" });
    expect(resolveLegacyRedirect("/es-419/services/seo")).toEqual({
      path: "/services/seo",
      hash: "",
    });
  });

  it("collapses trailing slashes in the same hop as locale and legacy dests", () => {
    expect(resolveLegacyRedirect("/en/")).toEqual({ path: "/", hash: "" });
    expect(resolveLegacyRedirect("/about/")).toEqual({ path: "/about", hash: "" });
    expect(resolveLegacyRedirect("/en/about/")).toEqual({ path: "/about", hash: "" });
    expect(resolveLegacyRedirect("/es/pricing/seo/")).toEqual({
      path: "/contact",
      hash: "",
    });
    expect(resolveLegacyRedirect("/en/services/google-ads/")).toEqual({
      path: "/services/paid-media",
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
    expect(resolveLegacyRedirect("/industries/saas")).toBeNull();
    expect(resolveLegacyRedirect("/industries/fintech")).toBeNull();
    expect(resolveLegacyRedirect("/industries/ecommerce")).toBeNull();
    expect(resolveLegacyRedirect("/industries/plumbing")).toBeNull();
    expect(resolveLegacyRedirect("/industries/landscaping")).toBeNull();
    expect(resolveLegacyRedirect("/industries/hvac")).toBeNull();
    expect(resolveLegacyRedirect("/industries/roofing")).toBeNull();
    expect(resolveLegacyRedirect("/lp/seo")).toEqual({
      path: "/lp/get-a-website",
      hash: "",
    });
    expect(resolveLegacyRedirect("/lp/get-a-website")).toBeNull();
    expect(resolveLegacyRedirect("/thank-you")).toBeNull();
    expect(resolveLegacyRedirect("/thank-you/audit")).toBeNull();
  });

  it("does not invent a /dallas retirement — that URL never shipped", () => {
    expect(resolveLegacyRedirect("/dallas")).toBeNull();
    expect(matchUnprefixedLegacyRedirect("/dallas")).toBeNull();
  });

  it("sends the retired Dallas lander onto /lp/get-a-website", () => {
    expect(resolveLegacyRedirect("/lp/dallas-website-audit")).toEqual({
      path: "/lp/get-a-website",
      hash: "",
    });
    expect(resolveLegacyRedirect("/en/lp/dallas-website-audit")).toEqual({
      path: "/lp/get-a-website",
      hash: "",
    });
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
      path: "/industries/saas",
      hash: "",
    });
    expect(resolveLegacyRedirect("/en/industries/technology/fintech")).toEqual({
      path: "/industries/fintech",
      hash: "",
    });
    expect(resolveLegacyRedirect("/en/industries/home-services/hvac")).toEqual({
      path: "/industries/hvac",
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
    expect(matchUnprefixedLegacyRedirect("/solutions/saas-marketing-agency")).toBe(
      "/industries/saas",
    );
    expect(matchUnprefixedLegacyRedirect("/solutions/seo-for-hvac-companies")).toBe(
      "/services",
    );
    expect(matchUnprefixedLegacyRedirect("/team/sarah-mitchell")).toBe("/about");
    expect(matchUnprefixedLegacyRedirect("/google-ads-vs-seo")).toBe("/resources");
    expect(matchUnprefixedLegacyRedirect("/lead-magnet")).toBe("/contact");
    expect(matchUnprefixedLegacyRedirect("/lp")).toBe("/contact");
  });

  it("sends retired landing pages to /lp/get-a-website", () => {
    for (const slug of [
      "seo",
      "google-ads-management",
      "local-seo",
      "web-design",
      "facebook-web-design",
      "dallas-website-audit",
    ]) {
      expect(matchUnprefixedLegacyRedirect(`/lp/${slug}`)).toBe(
        "/lp/get-a-website",
      );
    }
    expect(matchUnprefixedLegacyRedirect("/lp/get-a-website")).toBeNull();
  });
});

describe("matchIndustryPath", () => {
  it("keeps standalone market pages", () => {
    expect(matchIndustryPath("/industries/home-services")).toBeNull();
    expect(matchIndustryPath("/industries/ecommerce")).toBeNull();
    expect(matchIndustryPath("/industries/plumbing")).toBeNull();
    expect(matchIndustryPath("/industries/saas")).toBeNull();
    expect(matchIndustryPath("/industries/fintech")).toBeNull();
    expect(matchIndustryPath("/industries/hvac")).toBeNull();
  });

  it("collapses nested standalone paths onto the parent page", () => {
    expect(matchIndustryPath("/industries/ecommerce/shopify-brands")).toBe(
      "/industries/ecommerce",
    );
  });

  it("sends nested trade URLs to the trade page", () => {
    expect(matchIndustryPath("/industries/home-services/roofing")).toBe(
      "/industries/roofing",
    );
    expect(matchIndustryPath("/industries/home-services/plumbing")).toBe(
      "/industries/plumbing",
    );
    expect(resolveLegacyRedirect("/es/industries/home-services/roofing")).toEqual({
      path: "/industries/roofing",
      hash: "",
    });
    expect(resolveLegacyRedirect("/locations/cedar-falls")).toEqual({
      path: "/case-studies/landscaping-company-growth",
      hash: "",
    });
    expect(resolveLegacyRedirect("/en/locations/dallas/ppc-management")).toEqual({
      path: "/services/paid-media",
      hash: "",
    });
    expect(resolveLegacyRedirect("/en/locations/cedar-rapids/seo")).toEqual({
      path: "/services/seo",
      hash: "",
    });
    expect(resolveLegacyRedirect("/en/locations/cedar-rapids/google-ads")).toEqual({
      path: "/services/paid-media",
      hash: "",
    });
    expect(resolveLegacyRedirect("/digital-marketing-agency")).toEqual({
      path: "/",
      hash: "",
    });
  });

  it("maps retired live categories", () => {
    expect(matchIndustryPath("/industries/technology")).toBe("/industries/saas");
    expect(matchIndustryPath("/industries/technology/fintech")).toBe(
      "/industries/fintech",
    );
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

  it("strips es-ES and es-419 prefixes onto unprefixed dests", () => {
    const redirects = getLegacyRedirects();
    expect(redirects).toEqual(
      expect.arrayContaining([
        { source: "/es-ES", destination: "/", permanent: true },
        { source: "/es-419/:path*", destination: "/:path*", permanent: true },
      ]),
    );
  });
});

describe("standalone industry allowlists", () => {
  it("keeps redirect map and content registry in sync", () => {
    expect([...redirectStandalone].sort()).toEqual([...contentStandalone].sort());
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
