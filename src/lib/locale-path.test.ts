import { describe, expect, it } from "vitest";
import { localizeHref, localizeInternalLinks } from "@/lib/locale-path";

describe("localizeHref", () => {
  it("strips legacy locale prefixes", () => {
    expect(localizeHref("/en/about", "en")).toBe("/about");
    expect(localizeHref("/es-ES/contact", "es-ES")).toBe("/contact");
  });

  it("rewrites retired service paths onto flagship pages", () => {
    expect(localizeHref("/services/seo", "en")).toBe("/services/seo");
    expect(localizeHref("/services/ppc-management", "en")).toBe("/services/paid-media");
    expect(localizeHref("/services/funnels", "en")).toBe("/services/web-design");
    expect(localizeHref("/services/copywriting", "en")).toBe("/services/content-marketing");
    expect(localizeHref("/services/growth-consulting", "en")).toBe("/services");
  });

  it("rewrites locale-prefixed service paths after stripping locale", () => {
    expect(localizeHref("/en/services/local-seo", "en")).toBe("/services/seo");
  });
});

describe("localizeInternalLinks", () => {
  it("rewrites legacy service links in HTML fragments", () => {
    const html =
      '<p><a href="/services/seo">SEO</a> and <a href="/en/services/funnels">Funnels</a></p>';
    expect(localizeInternalLinks(html, "en")).toBe(
      '<p><a href="/services/seo">SEO</a> and <a href="/services/web-design">Funnels</a></p>',
    );
  });
});
