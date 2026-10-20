// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PlanCheckout } from "./PlanCheckout";
import { getPlanContent } from "@/content/pay-plans";
import { PayPalSubscribeButtons } from "./PayPalSubscribeButtons";
import { loadPayPalSDK, type PayPalOptions } from "@/lib/paypal-subscriptions";
vi.mock("next/navigation", () => ({ useRouter: () => router }));
vi.mock("@/lib/paypal-subscriptions", async importOriginal => ({ ...await importOriginal<object>(), loadPayPalSDK: vi.fn() }));
const router = { push: vi.fn() };
afterEach(() => { cleanup(); vi.clearAllMocks(); });
describe("plan agreement", () => {
  it("gates every subscription button and Own It link, including after unchecking", () => {
    vi.mocked(loadPayPalSDK).mockReturnValue(new Promise(() => {}));
    render(<PlanCheckout locale="en" />);
    const own = screen.getByText("Pay $1,497 with PayPal");
    expect(own).not.toHaveAttribute("href");
    expect(document.querySelectorAll('.pay-button-wrap[aria-disabled="true"]')).toHaveLength(3);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(own).toHaveAttribute("href", "https://www.paypal.com/ncp/payment/24TVQPFTKBCGW");
    expect(document.querySelectorAll('.pay-button-wrap[aria-disabled="false"]')).toHaveLength(3);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(own).not.toHaveAttribute("href");
  });
  it("uses PayPal controls and rejects attempts without agreement", async () => {
    let options!: PayPalOptions;
    const disable = vi.fn(), enable = vi.fn(), reject = vi.fn();
    const close = vi.fn().mockResolvedValue(undefined);
    vi.mocked(loadPayPalSDK).mockResolvedValue({ Buttons: config => { options = config; config.onInit({}, { disable, enable }); return { render: vi.fn().mockResolvedValue(undefined), close }; } });
    const c = getPlanContent("en");
    const view = render(<PayPalSubscribeButtons planKey="website" locale="en" agreed={false} content={c} />);
    await waitFor(() => expect(disable).toHaveBeenCalled());
    options.onClick({}, { reject });
    expect(reject).toHaveBeenCalled();
    view.rerender(<PayPalSubscribeButtons planKey="website" locale="en" agreed content={c} />);
    expect(enable).toHaveBeenCalled();
    options.onApprove({ subscriptionID: "I-ABC123456" });
    expect(router.push).toHaveBeenCalledWith(expect.stringContaining("agreedTermsVersion=2.0&agreedAt="));
    view.unmount(); expect(close).toHaveBeenCalled();
  });
});
