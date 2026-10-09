import { describe, expect, it } from "vitest";
import { buildPayPalCheckoutUrl, parsePayPalIpn } from "@/lib/paypal-checkout";

describe("buildPayPalCheckoutUrl", () => {
  it("sends the buyer to PayPal with the invoice amount", () => {
    const url = new URL(
      buildPayPalCheckoutUrl(
        { email: "pay@kinexisdigital.com", sandbox: false },
        {
          amountCents: 250000,
          description: "March website deposit",
          name: "Jordan Lee",
          email: "jordan@example.com",
          returnUrl: "https://www.kinexisdigital.com/pay/success",
          cancelUrl: "https://www.kinexisdigital.com/pay/cancelled",
          notifyUrl: "https://www.kinexisdigital.com/api/checkout/webhook",
          invoiceId: "11111111-1111-4111-8111-111111111111",
        },
      ),
    );

    expect(url.origin + url.pathname).toBe("https://www.paypal.com/cgi-bin/webscr");
    expect(url.searchParams.get("cmd")).toBe("_xclick");
    expect(url.searchParams.get("business")).toBe("pay@kinexisdigital.com");
    expect(url.searchParams.get("amount")).toBe("2500.00");
    expect(url.searchParams.get("currency_code")).toBe("USD");
    expect(url.searchParams.get("item_name")).toBe("March website deposit");
    expect(url.searchParams.get("custom")).toBe("Jordan Lee|jordan@example.com|");
  });
});

describe("parsePayPalIpn", () => {
  it("reads the confirmed payment PayPal posts back", () => {
    const notice = parsePayPalIpn(
      new URLSearchParams({
        payment_status: "Completed",
        mc_gross: "2500.00",
        mc_currency: "USD",
        item_name: "March website deposit",
        payer_email: "jordan@example.com",
        custom: "Jordan Lee|jordan@example.com|KINEXIS",
        receiver_email: "pay@kinexisdigital.com",
        txn_id: "ABC123",
      }).toString(),
    );

    expect(notice.status).toBe("Completed");
    expect(notice.amount).toBe("2500.00");
    expect(notice.payerName).toBe("Jordan Lee");
    expect(notice.company).toBe("KINEXIS");
    expect(notice.txnId).toBe("ABC123");
  });
});
