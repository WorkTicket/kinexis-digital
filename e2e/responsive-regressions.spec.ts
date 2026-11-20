import { expect, test } from "@playwright/test";

test.describe("narrow viewport regressions", () => {
  test("mobile header shows the preview CTA and visible Menu label instead of the phone number", async ({ page }) => {
    for (const width of [320, 375, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");

      await expect(page.locator(".header__cta--site")).toBeVisible();
      await expect(page.locator(".header__cta--site")).toContainText("Get My Free Preview");
      await expect(page.locator(".header__phone--mobile")).toBeHidden();
      await expect(page.locator(".burger__word--open")).toBeVisible();

      const dimensions = await page.evaluate(() => ({
        width: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        ctaRight: document.querySelector(".header__cta--site")?.getBoundingClientRect().right ?? 0,
      }));
      expect(dimensions.scrollWidth, `header overflows at ${width}px`).toBeLessThanOrEqual(width);
      expect(dimensions.ctaRight, `preview CTA exceeds ${width}px`).toBeLessThanOrEqual(width);
    }
  });

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

  test("portfolio project previews do not scroll on mobile touch or hover", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/portfolio");

    const shot = page.locator(".portfolio--main .shot").first();
    await expect(shot).toHaveClass(/shot--static/);
    const track = shot.locator(".shot__track");
    const before = await track.evaluate((el) => getComputedStyle(el).transform);
    const box = await shot.boundingBox();
    expect(box).not.toBeNull();
    await shot.dispatchEvent("pointerdown", {
      pointerId: 7,
      pointerType: "touch",
      isPrimary: true,
      button: 0,
      clientX: box!.x + box!.width / 2,
      clientY: box!.y + box!.height / 2,
    });
    await page.waitForTimeout(220);
    await shot.dispatchEvent("pointerup", {
      pointerId: 7,
      pointerType: "touch",
      isPrimary: true,
      button: 0,
      clientX: box!.x + box!.width / 2,
      clientY: box!.y + box!.height / 2,
    });

    await expect(shot).not.toHaveClass(/is-holding/);
    expect(await track.evaluate((el) => getComputedStyle(el).transform)).toBe(before);
  });

  test("portfolio project cards do not keep a hover pose after a mobile tap", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "requires a real coarse-pointer touch context");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/portfolio");

    const shot = page.locator(".portfolio--main .shot").first();
    await shot.scrollIntoViewIfNeeded();
    await expect(shot).toHaveClass(/shot--static/);
    const box = await shot.boundingBox();
    expect(box).not.toBeNull();
    await shot.evaluate((element) => {
      element.addEventListener("click", (event) => event.preventDefault(), { capture: true, once: true });
    });
    await page.touchscreen.tap(box!.x + box!.width / 2, box!.y + box!.height / 2);

    await expect(shot).toHaveCSS("transform", "none");
    await expect(shot).toHaveCSS("box-shadow", "rgba(10, 18, 48, 0.08) 0px 6px 24px 0px");
    await expect(shot.locator(".shot__cta-overlay")).toHaveCSS("opacity", "0");
  });

  test("Lead System step illustrations are centered, larger than their circles, and keep VS emphasis", async ({ page }) => {
    for (const viewport of [{ width: 1280, height: 900 }, { width: 390, height: 844 }]) {
      await page.setViewportSize(viewport);
      await page.goto("/");

      const geometry = await page
        .locator(".review-rail:not(.review-rail--numbers) .review-rail__mark")
        .evaluateAll(
          (marks, viewportWidth) =>
            marks.map((mark) => {
              const circle = mark.querySelector(".review-rail__icon")!.getBoundingClientRect();
              const image = mark.querySelector("img.icon")!.getBoundingClientRect();
              const title = mark.parentElement!.querySelector("h3")!.getBoundingClientRect();
              return {
                scale: image.width / circle.width,
                centerX: Math.abs((image.left + image.width / 2) - (circle.left + circle.width / 2)),
                centerY: Math.abs((image.top + image.height / 2) - (circle.top + circle.height / 2)),
                noTitleOverlap: viewportWidth > 860 || image.right <= title.left,
              };
            }),
          viewport.width,
        );

      expect(geometry).toHaveLength(3);
      for (const icon of geometry) {
        expect(icon.scale).toBeGreaterThanOrEqual(1.39);
        expect(icon.centerX).toBeLessThan(1);
        expect(icon.centerY).toBeLessThan(1);
        expect(icon.noTitleOverlap).toBe(true);
      }
    }

    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/pricing");
    await expect(page.locator(".plan-compare__ownership h2 .hl-emphasis")).toHaveText("vs");
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
    await expect(page.locator("#content")).toBeFocused();
    await expect.poll(() => page.evaluate(() => document.cookie)).toContain("kinexis_consent=");
  });
});
