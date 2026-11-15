import { expect, test } from "@playwright/test";

function clientAddress(projectName: string, host: number) {
  // Each project gets its own address so a shared dev server does not rate-limit the second project.
  return projectName === "mobile" ? `203.0.113.${host + 100}` : `203.0.113.${host}`;
}

test.describe("invoice payment route guards", () => {
  test("checkout refuses a client-supplied amount", async ({ page }, testInfo) => {
    const response = await page.request.post("/api/checkout", {
      data: { amount: "1.00", invoiceId: "11111111-2222-3333-4444-555555555555", token: "0".repeat(64) },
      headers: { "x-forwarded-for": clientAddress(testInfo.project.name, 41) },
    });

    expect(response.status()).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      error: "Open your invoice payment link to pay. Amounts cannot be entered manually.",
    });
  });

  test("checkout rejects a missing invoice link", async ({ page }, testInfo) => {
    const response = await page.request.post("/api/checkout", {
      data: { name: "Test Buyer" },
      headers: { "x-forwarded-for": clientAddress(testInfo.project.name, 42) },
    });

    expect(response.status()).toBe(400);
    await expect(response.json()).resolves.toHaveProperty("error");
  });

  test("invoice admin fails closed when the admin secret is not configured", async ({ page }, testInfo) => {
    const response = await page.request.post("/api/invoices", {
      data: { amount: "10.00", description: "Site deposit" },
      headers: { "x-invoice-admin": "not-a-configured-secret", "x-forwarded-for": clientAddress(testInfo.project.name, 43) },
    });
    expect(response.status()).toBe(503);
    await expect(response.json()).resolves.toMatchObject({ error: "Invoice admin is not configured." });
  });

  test("capture rejects a malformed PayPal order token before contacting PayPal", async ({ page }) => {
    const response = await page.request.get("/api/checkout/capture?token=not-an-order", { maxRedirects: 0 });

    expect(response.status()).toBe(303);
    expect(response.headers().location).toMatch(/\/pay\?invoice=error#invoice$/);
  });
});
