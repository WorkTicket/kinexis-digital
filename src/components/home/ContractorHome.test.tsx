import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { ContractorHome } from "./ContractorHome";
import { getContractorHome } from "@/content/contractor-home";
import { getContractorDesign } from "@/content/contractor-design";
import { getPlanContent } from "@/content/pay-plans";

vi.mock("@/i18n/navigation", () => ({ Link: ({ children, href, ...props }: { children: ReactNode; href: string }) => <a href={href} {...props}>{children}</a> }));

describe("professional contractor homepage", () => {
  it.each(["en", "es-419", "es-ES"] as const)("preserves the approved offer and excludes unsupported proof in %s", locale => {
    const html = renderToStaticMarkup(<ContractorHome locale={locale} />);
    const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");
    const content = getContractorHome(locale);
    const design = getContractorDesign(locale);
    const plans = getPlanContent(locale);
    expect(`${design.headline} ${design.priceLine}`).toBe(content.title);
    expect(text).toContain(content.copy);
    expect(text).toContain(plans.faq[1][1]);
    expect(text).toContain(content.steps[1]);
    expect(text).toContain(design.preview.note);
    for (const price of ["$97", "$197", "$297", "$1,497"]) expect(text).toContain(price);
    expect(html).toContain('href="https://m.me/1342631805590605"');
    expect(html).toContain('href="/pay"');
    expect(text).not.toMatch(/\b0[1-4]\b|TODO\(owner\)|Hablamos español|no lock-in|ecommerce|2\.8[×x]|2\.4[×x]/i);
    expect((html.match(/<h1\b/g) ?? []).length).toBe(1);
    expect(text).not.toMatch(/[\u00c3\u00c2]/);
  });
});
