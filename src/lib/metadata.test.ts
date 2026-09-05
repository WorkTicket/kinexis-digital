import { describe, expect, it } from "vitest";
import {
  META_DESCRIPTION_MAX,
  META_TITLE_MAX,
  META_TITLE_PAGE_MAX,
  TITLE_BRAND_SUFFIX,
  buildPageMetadata,
  getSiteUrl,
  normalizeMetaDescription,
  normalizeMetaTitle,
  stripBrandSuffix,
} from "./metadata";

describe("normalizeMetaTitle", () => {
  it("keeps titles at the visible 60-character SERP limit", () => {
    const title = "Kinexis Digital | Marketing for Home Services & Ecommerce";
    expect(title.length).toBeLessThanOrEqual(META_TITLE_MAX);
    expect(normalizeMetaTitle(title)).toBe(title);
  });

  it("does not truncate because of HTML entity encoding", () => {
    const title = "Home Services & Ecommerce Marketing Agency";
    expect(normalizeMetaTitle(title, 42)).toBe(title);
  });

  it("truncates over-limit titles at a word boundary", () => {
    const long = "This Title Is Definitely Longer Than Sixty Characters For Search";
    const result = normalizeMetaTitle(long);
    expect(result.length).toBeLessThanOrEqual(META_TITLE_MAX);
    expect(result.endsWith("…")).toBe(true);
  });

  it("preserves the brand suffix when truncating a full title", () => {
    const result = normalizeMetaTitle(
      `A Very Long Case Study Headline That Will Overflow${TITLE_BRAND_SUFFIX}`,
    );
    expect(result.endsWith(TITLE_BRAND_SUFFIX)).toBe(true);
    expect(result.length).toBeLessThanOrEqual(META_TITLE_MAX);
  });
});

describe("normalizeMetaDescription", () => {
  it("keeps descriptions at 155 visible characters", () => {
    const desc = "A".repeat(155);
    expect(normalizeMetaDescription(desc).length).toBe(155);
  });

  it("strips hero pipe separators", () => {
    expect(normalizeMetaDescription("First line.|Second line.")).toBe("First line. Second line.");
  });

  it("truncates over-limit copy at a word", () => {
    const desc =
      "Digital marketing for home services and ecommerce brands. SEO, paid ads, web design, and branding scored on leads and revenue, not vanity metrics. Book a strategy call today for a clear plan.";
    const result = normalizeMetaDescription(desc);
    expect(result.length).toBeLessThanOrEqual(META_DESCRIPTION_MAX);
    expect(result.endsWith("…")).toBe(true);
  });
});

describe("buildPageMetadata", () => {
  it("returns a page title that fits the layout brand template", () => {
    const meta = buildPageMetadata({
      locale: "en",
      path: "/services",
      title: "SEO, Ads, and Web Design Services",
      description:
        "Web design, SEO, branding, paid ads, and content as one demand program. Built for home services and ecommerce brands that need booked work and orders.",
    });
    expect(typeof meta.title).toBe("string");
    expect(String(meta.title).length).toBeLessThanOrEqual(META_TITLE_PAGE_MAX);
    expect(meta.description?.length).toBeLessThanOrEqual(META_DESCRIPTION_MAX);
    expect(String(meta.alternates?.canonical)).toMatch(/\/services$/);
    expect(String(meta.alternates?.canonical)).not.toMatch(/\/(en|es)\//);
    expect(meta.alternates?.languages).toBeUndefined();
  });

  it("strips a duplicated brand suffix before the template", () => {
    const meta = buildPageMetadata({
      locale: "en",
      path: "/blog",
      title: "Marketing Insights and Playbooks | Kinexis Digital",
      description:
        "Practical SEO, paid ads, CRO, and email notes from the KINEXIS team. Field-tested tactics for home services and ecommerce growth programs.",
    });
    expect(meta.title).toBe("Marketing Insights and Playbooks");
    expect(stripBrandSuffix(String(meta.title))).toBe(String(meta.title));
  });

  it("uses an absolute title on the homepage", () => {
    const title = "Kinexis Digital | Marketing for Home Services & Ecommerce";
    const meta = buildPageMetadata({
      locale: "en",
      path: "/",
      absolute: true,
      title,
      description:
        "Digital marketing for home services and ecommerce. SEO, paid ads, web design, and branding scored on leads and revenue, not vanity metrics. Book a call.",
    });
    expect(meta.title).toEqual({ absolute: title });
    expect(String(meta.openGraph?.url ?? "")).toBe(getSiteUrl());
    expect(String(meta.alternates?.canonical)).toBe(getSiteUrl());
  });

  it("does not reuse the homepage URL for a landing page", () => {
    const meta = buildPageMetadata({
      locale: "en",
      path: "/lp/dallas-website-audit",
      title: "Get a Website Built to Win More Customers | Dallas",
      description:
        "Custom websites for Dallas businesses. New sites and redesigns that look credible, work on mobile, and turn more visitors into customers. Free consultation.",
      noIndex: true,
      noFollow: true,
    });
    expect(String(meta.openGraph?.url ?? "")).toBe(
      `${getSiteUrl()}/lp/dallas-website-audit`,
    );
  });
});
