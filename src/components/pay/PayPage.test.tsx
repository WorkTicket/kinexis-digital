// @vitest-environment jsdom
import type { ReactNode } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import PayPage from "@/app/[locale]/pay/page";
import SubscriptionThanks from "@/app/[locale]/pay/thanks/page";
import { getPayContent } from "@/content/pay";
import { getPlanContent } from "@/content/pay-plans";
import { BUSINESS_PHONE_E164 } from "@/config/business-identity";

vi.mock("@/components/page/PageHero", () => ({ PageHero: () => null }));
vi.mock("next-intl/server", () => ({ setRequestLocale: vi.fn() }));
vi.mock("@/components/pay/PlanCheckout", () => ({ PlanCheckout: () => null }));
vi.mock("@/components/pay/SubscriptionConversion", () => ({ SubscriptionConversion: () => null }));
vi.mock("@/i18n/navigation", () => ({ Link: ({ href, children }: { href: string; children: ReactNode }) => <a href={href}>{children}</a> }));
afterEach(cleanup);

describe("payment page content", () => {
  it.each(["en", "es-419", "es-ES"] as const)("renders invoice fields without reveal animations and preserves defaults in %s", async locale => {
    const c = getPayContent(locale);
    render(await PayPage({ params: Promise.resolve({ locale }), searchParams: Promise.resolve({ amount: "125.50", description: "Invoice 123", name: "Example Client", email: "client@example.com", company: "Example Company" }) }));
    const amount = screen.getByLabelText(new RegExp(`^${c.amountLabel}`));
    expect(amount).toBeVisible();
    expect(amount).toHaveValue("125.50");
    expect(amount.closest(".motion-section, .motion-stagger")).toBeNull();
    expect(screen.getByLabelText(new RegExp(`^${c.descriptionLabel}`))).toHaveValue("Invoice 123");
    expect(screen.getByLabelText(new RegExp(`^${c.nameLabel}`))).toHaveValue("Example Client");
    expect(screen.getByLabelText(new RegExp(`^${c.emailLabel}`))).toHaveValue("client@example.com");
    expect(screen.getByLabelText(new RegExp(`^${c.companyLabel}`))).toHaveValue("Example Company");
    expect(screen.getByRole("button", { name: c.submit })).toBeVisible();
  });

  it.each(["en", "es-419", "es-ES"] as const)("formats the thank-you SMS link in %s", async locale => {
    render(await SubscriptionThanks({ params: Promise.resolve({ locale }), searchParams: Promise.resolve({}) }));
    expect(screen.getByRole("link", { name: /\+1 \(307\) 500-3371/ })).toHaveAttribute("href", `sms:${BUSINESS_PHONE_E164}`);
  });

  it.each([
    ["en", "Subscribe on your launch day, after you approve your site. Your first charge happens when you subscribe."],
    ["es-419", "Suscríbase el día del lanzamiento, después de aprobar su página. El primer cobro se hace cuando se suscribe."],
    ["es-ES", "Suscríbase el día del lanzamiento, después de aprobar su página. El primer cobro se hace cuando se suscribe."],
  ] as const)("keeps billing copy and FAQ consistent in %s", (locale, timing) => {
    const c = getPlanContent(locale);
    expect(c.intro).toBe(timing);
    expect(c.timing).toBe(timing);
    expect(c.faq.some(([, answer]) => answer.startsWith(timing))).toBe(true);
    if (locale !== "en") expect(c.down).toBe("$0 de entrada");
  });
});
