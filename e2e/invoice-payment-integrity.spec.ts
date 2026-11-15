import { expect, test } from "@playwright/test";

test.describe("invoice payment route guards", () => {
  test("checkout refuses a client-supplied amount", async ({ page }) => {
    const response = await page.request.post("/api/checkout", {
      data: { amount: "1.00", invoiceId: "11111111-2222-3333-4444-555555555555", token: "0".repeat(64) },
      headers: { "x-forwarded-for": "203.0.113.41" },
    });

    expect(response.status()).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      error: "Open your invoice payment link to pay. Amounts cannot be entered manually.",
    });
  });

  test("checkout rejects a missing invoice link", async ({ page }) => {
    const response = await page.request.post("/api/checkout", {
      data: { name: "Test Buyer" },
      headers: { "x-forwarded-for": "203.0.113.42" },
    });

    expect(response.status()).toBe(400);
    await expect(response.json()).resolves.toHaveProperty("error");
  });

  test("capture rejects a malformed PayPal order token before contacting PayPal", async ({ page }) => {
    const response = await page.request.get("/api/checkout/capture?token=not-an-order", { maxRedirects: 0 });

    expect(response.status()).toBe(303);
    expect(response.headers().location).toMatch(/\/pay\?invoice=error#invoice$/);
  });
});
