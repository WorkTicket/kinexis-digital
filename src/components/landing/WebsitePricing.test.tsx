import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { getLandingPage } from "@/content/registry/landing-pages";
import { WebsitePricing } from "./WebsiteSections";

vi.mock("@/components/landing/PlanCta", () => ({ PlanCta: ({ children }: { children: React.ReactNode }) => <a href="#plan">{children}</a> }));
vi.mock("@/components/landing/LazyGreenfieldExamples", () => ({ LazyGreenfieldExamples: () => null }));
vi.mock("@/components/landing/WebsitePlanForm", () => ({ WebsitePlanForm: () => null }));

describe("website pricing fine print", () => {
  it("pairs the full desktop explanations with concise phone copy", () => {
    const page = getLandingPage("get-a-website", "en")!;
    const expanded = page.pricingExpanded!;
    expect(expanded.details).toHaveLength(page.pricingDetails!.length);
    expect(expanded.note.split(/\n\s*\n/)).toHaveLength(page.pricingNote!.split(/\n\s*\n/).length);
    const html = renderToStaticMarkup(<WebsitePricing title={page.pricingTitle!} anchor={page.pricingAnchor!} qualify={page.pricingQualify} note={page.pricingNote} details={page.pricingDetails} expanded={expanded} ctaLabel="Call" landingSlug={page.slug} />);
    expect(html.match(/class="lp-web-pricing__copy-expanded"/g)).toHaveLength(10);
    expect(html.match(/class="lp-web-pricing__copy-compact"/g)).toHaveLength(10);
    expect(html).toContain(expanded.qualify);
    for (const detail of expanded.details) expect(html).toContain(detail);
  });

  it.each(["en", "es-419"] as const)("renders short copy and a closed native disclosure in %s", (locale) => {
    const page = getLandingPage("get-a-website", locale)!;
    const html = renderToStaticMarkup(<WebsitePricing title={page.pricingTitle!} anchor={page.pricingAnchor!} qualify={page.pricingQualify} note={page.pricingNote} highlights={page.pricingHighlights} details={page.pricingDetails} detailsLabel={page.pricingDetailsLabel} closer={page.pricingCloser} tiers={page.pricing} compare={page.pricingCompare} ctaLabel="Call" landingSlug={page.slug} />);
    expect(html).toContain('<details class="lp-web-pricing__disclosure">');
    expect(html).not.toMatch(/<details[^>]*\bopen\b/);
    expect(html).toContain(`<summary>${page.pricingDetailsLabel}<svg`);
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain(page.pricingQualify!);
    for (const paragraph of page.pricingNote!.split(/\n\s*\n/)) {
      expect(html).toContain(renderToStaticMarkup(<p>{paragraph}</p>));
    }
    expect(html).toContain(page.pricingHighlights![0]);
    expect(html).not.toContain(page.pricingCloser!);
    expect(page.pricingDetails).toHaveLength(7);
    const details = html.slice(html.indexOf('<details'), html.indexOf('</details>'));
    expect(details.match(/<li>/g)).toHaveLength(7);
    expect(html).toContain('role="table"');
    expect(html).toContain(page.pricing![0].price);
    expect(html).toContain(page.pricing![1].price);
  });
});
