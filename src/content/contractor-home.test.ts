import { describe, expect, it } from "vitest";
import { getContractorHome } from "./contractor-home";
import { getPlanContent } from "./pay-plans";
import { getTermsContent } from "./legal/terms";

describe("Houston contractor offer", () => {
  it.each(["en", "es-419", "es-ES"] as const)("uses the checkout guarantee and minimum in %s", locale => {
    const home = getContractorHome(locale);
    const plans = getPlanContent(locale);
    expect(home.faq.some(faq => faq.answer === plans.faq[1][1])).toBe(true);
    expect(home.faq[0].answer).toContain("3");
    expect(home.steps[1]).toContain("10");
    expect(home.steps[1]).toContain("2");
    expect(home.title).toContain("$197");
    expect(JSON.stringify(home)).not.toMatch(/Hablamos español|no lock-in|no contract|ecommerce/i);
    expect(getTermsContent(locale).html).toContain(locale === "en" ? "October 19, 2026" : "19 de octubre de 2026");
  });
});
