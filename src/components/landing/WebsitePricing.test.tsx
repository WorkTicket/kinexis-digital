import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { getLandingPage } from "@/content/registry/landing-pages";
import { WebsitePricing } from "./WebsiteSections";

vi.mock("@/components/landing/PlanCta", () => ({ PlanCta: ({ children }: { children: React.ReactNode }) => <a href="#plan">{children}</a> }));
vi.mock("@/components/landing/LazyGreenfieldExamples", () => ({ LazyGreenfieldExamples: () => null }));
vi.mock("@/components/landing/WebsitePlanForm", () => ({ WebsitePlanForm: () => null }));

describe("website pricing fine print", () => {
  it("shows three assurances with labeled terms inside a closed disclosure", () => {
    const page = getLandingPage("get-a-website", "en")!;
    expect(page.pricingSummary).toHaveLength(3);
    expect(page.pricingDetailTitles).toHaveLength(page.pricingDetails!.length);
    const html = renderToStaticMarkup(<WebsitePricing title={page.pricingTitle!} anchor={page.pricingAnchor!} qualify={page.pricingQualify} note={page.pricingNote} details={page.pricingDetails} summary={page.pricingSummary} detailTitles={page.pricingDetailTitles} ctaLabel="Call" landingSlug={page.slug} />);
    expect(html).toContain("lp-web-pricing__foot--editorial");
    for (const item of page.pricingSummary!) expect(html).toContain(renderToStaticMarkup(<h3>{item.title}</h3>));
    for (const title of page.pricingDetailTitles!) expect(html).toContain(renderToStaticMarkup(<h4>{title}</h4>));
    expect(html).not.toContain("copy-expanded");
    expect(html).not.toMatch(/<details[^>]*\bopen\b/);
    expect(html).not.toContain(page.pricingQualify!);
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
