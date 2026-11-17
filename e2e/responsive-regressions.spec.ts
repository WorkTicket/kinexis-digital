import { expect, test } from "@playwright/test";

test.describe("narrow viewport regressions", () => {
  test("portfolio live-site cards stay within the viewport", async ({ page }) => {
    for (const width of [320, 375, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/portfolio");

      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        document: document.documentElement.scrollWidth,
        body: document.body.scrollWidth,
      }));
      expect(dimensions.body, `body overflows at ${width}px`).toBeLessThanOrEqual(width);
      expect(dimensions.document, `document overflows at ${width}px`).toBeLessThanOrEqual(width);
      const cardWidth = await page.locator(".portfolio--live .live-site").first().evaluate((card) => card.getBoundingClientRect().width);
      expect(cardWidth, `live-site card exceeds ${width}px`).toBeLessThanOrEqual(width);
    }
  });

  test("Phoenix preview header CTA stays within a 320px viewport", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto("/lp/phoenix-preview");

    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
      ctaRight: document.querySelector(".header__cta--lp")?.getBoundingClientRect().right ?? 0,
    }));
    expect(dimensions.body).toBeLessThanOrEqual(320);
    expect(dimensions.document).toBeLessThanOrEqual(320);
    expect(dimensions.ctaRight).toBeLessThanOrEqual(320);
    await expect(page.locator(".header__cta--lp")).toBeVisible();
  });

  test("cookie consent keeps keyboard focus in the dialog and Escape rejects safely", async ({ page }) => {
    await page.goto("/");
    const dialog = page.getByRole("dialog", { name: "Cookies & measurement" });
    await expect(dialog).toBeVisible();
    await expect.poll(() => page.evaluate(() => Boolean((document.querySelector("#kx-consent") as HTMLElement & { __kxConsentKeyboardReady?: boolean })?.__kxConsentKeyboardReady))).toBe(true);
    await expect.poll(() => page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]')))).toBe(true);

    await page.keyboard.press("Shift+Tab");
    await expect.poll(() => page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]')))).toBe(true);
    await page.keyboard.press("Escape");

    await expect(dialog).toBeHidden();
    await expect(page.locator(".consent-fab")).toBeFocused();
    await expect.poll(() => page.evaluate(() => document.cookie)).toContain("kinexis_consent=");
  });
});
