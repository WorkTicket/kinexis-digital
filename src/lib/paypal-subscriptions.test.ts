// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { getPayPalSDKUrl, loadPayPalSDK, sanitizeSubscriptionId } from "./paypal-subscriptions";
import { PAYPAL_SDK_URL } from "@/config/paypal-plans";
describe("subscription SDK", () => {
  it("injects one script with the exact locale URL for all cards", async () => {
    const first = loadPayPalSDK("es-419");
    expect(loadPayPalSDK("es-419")).toBe(first);
    const script = document.getElementById("kinexis-paypal-subscriptions") as HTMLScriptElement;
    expect(script.getAttribute("src")).toBe(`${PAYPAL_SDK_URL}&locale=es_US`);
    expect(document.querySelectorAll("#kinexis-paypal-subscriptions")).toHaveLength(1);
    window.paypal = { Buttons: () => ({ render: async () => {} }) };
    script.dispatchEvent(new Event("load"));
    await expect(first).resolves.toBe(window.paypal);
    expect(getPayPalSDKUrl("en")).toBe(`${PAYPAL_SDK_URL}&locale=en_US`);
  });
  it("accepts only PayPal subscription IDs", () => {
    expect(sanitizeSubscriptionId("I-TEST123456")).toBe("I-TEST123456");
    for (const sid of ["<script>", "I-abc123", "I-123", ["I-TEST123456"], undefined, "I-ABC123\n"]) expect(sanitizeSubscriptionId(sid)).toBeNull();
  });
});
