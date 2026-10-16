import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { getLandingPage } from "@/content/registry/landing-pages";
import { WebsiteWork } from "./WebsiteSections";
import { GreenfieldExamples } from "./GreenfieldExamples";

vi.mock("@/components/landing/PlanCta", () => ({ PlanCta: () => null }));
vi.mock("@/components/landing/CaseStudyViewTracker", () => ({ CaseStudyViewTracker: () => null }));
vi.mock("@/components/landing/LazyGreenfieldExamples", () => ({ LazyGreenfieldExamples: () => null }));
vi.mock("@/components/landing/WebsitePlanForm", () => ({ WebsitePlanForm: () => null }));

describe("campaign small page fixes", () => {
  it("preserves the space between testimonial sentence spans", () => {
    const page = getLandingPage("get-a-website", "en")!;
    // Exercise the existing two-sentence rendering without enabling result claims.
    const quote = "A quote button on a phone. After a rebuild.";
    const html = renderToStaticMarkup(<WebsiteWork title={page.samplesTitle!} samples={page.samples!} testimonial={{ ...page.testimonial!, quote }} ctaLabel={page.submitLabel} landingSlug={page.slug} />);
    const text = html.replace(/<[^>]*>/g, "");
    expect(text).toContain("phone. After");
    expect(text).not.toContain("phone.After");
  });

  it.each(["en", "es-419", "es-ES"] as const)("labels the comparison as a demo in %s", locale => {
    const html = renderToStaticMarkup(<GreenfieldExamples locale={locale} />);
    expect(html).toContain(locale === "en" ? "Illustrative demo, not a client site" : "Demo ilustrativa, no es el sitio de un cliente");
    expect(html).toContain("Greenfield");
  });
});
