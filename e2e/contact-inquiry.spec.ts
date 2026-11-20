import { expect, test } from "@playwright/test";

async function useNecessaryOnlyConsent(page: import("@playwright/test").Page) {
  await page.context().addCookies([{
    name: "kinexis_consent",
    value: "v1|a=0|d=0",
    url: "http://localhost:3100",
  }]);
  await page.route("https://cdn.conferbot.com/**", (route) => route.abort());
  await page.route("https://connect.facebook.net/**", (route) => route.abort());
  await page.route("https://www.googletagmanager.com/**", (route) => route.abort());
}

async function fillBaseContact(form: import("@playwright/test").Locator) {
  await form.locator('input[name="name"]').fill("Preview Test");
  await form.locator('input[name="email"]').fill("preview-test@example.invalid");
  await form.locator('input[name="business"]').fill("Test Business");
  await form.locator('input[name="trade"]').fill("Plumbing in Boise");
}

async function waitForBoot(page: import("@playwright/test").Page) {
  await page.waitForFunction(() =>
    performance.getEntriesByType("resource").some((entry) => entry.name.includes("/assets/js/boot.min.js")),
  );
}

/**
 * boot.min.js loads with next/script `lazyOnload`, so on a busy dev server the
 * contact form can be visible before boot's delegated change/submit listeners
 * exist. A synthetic (untrusted) submit event never submits the form natively;
 * once boot's listener is attached it calls preventDefault(), which is a
 * precise "form is interactive" signal. Call before any option is checked.
 */
async function waitForContactFormReady(page: import("@playwright/test").Page) {
  await waitForBoot(page);
  await page.waitForFunction(() => {
    const form = document.querySelector("form[data-contact-inquiry]");
    if (!(form instanceof HTMLFormElement)) return false;
    if (form.querySelector('input[name="inquiry"]:checked')) {
      throw new Error("waitForContactFormReady must run before an inquiry option is checked");
    }
    const probe = new Event("submit", { bubbles: true, cancelable: true });
    form.dispatchEvent(probe);
    const error = form.querySelector("[data-inquiry-error]");
    if (error) error.textContent = "";
    return probe.defaultPrevented;
  }, null, { timeout: 30_000 });
}

test("preview choice expands the form and confirmation links to intake", async ({ page }) => {
  await useNecessaryOnlyConsent(page);
  let submitted = "";
  await page.route("**/api/contact", async (route) => {
    submitted = route.request().postDataBuffer()?.toString("latin1") || "";
    await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
  });
  await page.goto("/contact");
  await waitForContactFormReady(page);

  const form = page.locator("form[data-contact-inquiry]");
  const details = form.locator("[data-preview-details]");
  await expect(details).toBeHidden();
  await fillBaseContact(form);
  await form.locator("label.sticker-check")
    .filter({ hasText: "I’d like a free homepage preview" })
    .click();
  await expect(details).toBeVisible();
  await expect(form.locator('input[name="service_area"]')).toHaveAttribute("required", "");
  await expect(form.locator('textarea[name="services"]')).toHaveAttribute("required", "");
  await expect(form.locator('button[type="submit"]')).toContainText("Request My Free Homepage Preview");
  await expect(form.locator('input[name="logo"]')).toBeVisible();
  await expect(form.locator('input[name="photos"]')).toHaveAttribute("multiple", "");
  await expect(form).toHaveAttribute("data-max-files", "5");
  await expect(form).toHaveAttribute("data-max-file-mb", "4");
  await form.locator('input[name="logo"]').setInputFiles({
    name: "brand-logo.png",
    mimeType: "image/png",
    buffer: Buffer.from("logo"),
  });
  await form.locator('input[name="photos"]').setInputFiles([
    { name: "before.jpg", mimeType: "image/jpeg", buffer: Buffer.from("before") },
    { name: "after.jpg", mimeType: "image/jpeg", buffer: Buffer.from("after") },
  ]);

  await form.locator('input[name="service_area"]').fill("Boise and nearby towns");
  await form.locator('textarea[name="services"]').fill("Drain cleaning, leak repair, water heaters");
  await form.locator('button[type="submit"]').click();

  await expect(form).toHaveClass(/is-done/);
  await expect(form.locator(".form__msg")).toContainText("received your homepage preview request");
  await expect(form.locator(".form__msg").getByRole("link", { name: "Add business details and photos" }))
    .toHaveAttribute("href", "/intake");
  expect(submitted).toContain('name="inquiry"');
  expect(submitted).toContain("free-preview");
  expect(submitted).toContain("Boise and nearby towns");
  expect(submitted).toContain("Drain cleaning, leak repair, water heaters");
  expect(submitted).toContain('name="logo"; filename="brand-logo.png"');
  expect(submitted).toContain('name="photos"; filename="before.jpg"');
  expect(submitted).toContain('name="photos"; filename="after.jpg"');
  expect(submitted).toContain('name="kx_conversion"');
});

test("preview uploads stay hidden and clear if the preview option is removed", async ({ page }) => {
  await useNecessaryOnlyConsent(page);
  await page.goto("/contact");
  await waitForBoot(page);
  const form = page.locator("form[data-contact-inquiry]");
  const previewOption = form.locator("label.sticker-check").filter({ hasText: "I’d like a free homepage preview" });
  const details = form.locator("[data-preview-details]");
  const logo = form.locator('input[name="logo"]');

  await expect(details).toBeHidden();
  await previewOption.click();
  await expect(details).toBeVisible();
  await logo.setInputFiles({
    name: "brand-logo.png",
    mimeType: "image/png",
    buffer: Buffer.from("logo"),
  });
  expect(await logo.evaluate((input) => (input as HTMLInputElement).files?.length)).toBe(1);
  await previewOption.click();
  await expect(details).toBeHidden();
  expect(await logo.evaluate((input) => (input as HTMLInputElement).files?.length)).toBe(0);
});

test("preview requires uploaded assets or explicit permission for stock fallback", async ({ page }) => {
  await useNecessaryOnlyConsent(page);
  let submitted = "";
  let submissionCount = 0;
  await page.route("**/api/contact", async (route) => {
    submissionCount += 1;
    submitted = route.request().postDataBuffer()?.toString("latin1") || "";
    await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
  });
  await page.goto("/contact");
  await waitForBoot(page);

  const form = page.locator("form[data-contact-inquiry]");
  await fillBaseContact(form);
  await form.locator("label.sticker-check").filter({ hasText: "I’d like a free homepage preview" }).click();
  await form.locator('input[name="service_area"]').fill("Boise and nearby towns");
  await form.locator('textarea[name="services"]').fill("Drain cleaning and leak repair");
  await form.locator('button[type="submit"]').click();
  await expect(form.locator("[data-preview-asset-error]")).toContainText("Add your logo and at least one job photo");
  expect(submissionCount).toBe(0);

  const fallbackConsent = form.locator("label.contact-preview-asset-consent");
  await expect(fallbackConsent).toContainText("Please use sample images");
  await fallbackConsent.click();
  await expect(form.locator("[data-preview-asset-error]")).toBeEmpty();
  await form.locator('button[type="submit"]').click();
  await expect(form).toHaveClass(/is-done/);
  expect(submissionCount).toBe(1);
  expect(submitted).toContain('name="preview_asset_fallback"');
  expect(submitted).toContain("Please use sample images");
});

test("other contact reasons do not require preview details or show the intake follow-up", async ({ page }) => {
  await useNecessaryOnlyConsent(page);
  let submitted = "";
  let submissionCount = 0;
  await page.route("**/api/contact", async (route) => {
    submissionCount += 1;
    submitted = route.request().postData() || "";
    await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
  });
  await page.goto("/contact");
  await waitForContactFormReady(page);

  const form = page.locator("form[data-contact-inquiry]");
  await fillBaseContact(form);
  await form.locator('button[type="submit"]').click();
  await expect(form.locator("[data-inquiry-error]")).toContainText("Choose at least one option");
  expect(submissionCount).toBe(0);
  await form.locator("label.sticker-check").filter({ hasText: "Website plans or pricing" }).click();
  await expect(form.locator("[data-preview-details]")).toBeHidden();
  await form.locator('button[type="submit"]').click();
  await expect(form).toHaveClass(/is-done/);
  await expect(form.locator(".form__msg")).toContainText("We’ve received your message.");
  await expect(form.locator(".form__msg a")).toHaveCount(0);
  expect(submitted).not.toContain('name="kx_conversion"');
});

test("Spanish preview confirmation points to the localized intake page", async ({ page }) => {
  await useNecessaryOnlyConsent(page);
  await page.route("**/api/contact", (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }),
  );
  await page.goto("/es/contact");
  await waitForBoot(page);

  const form = page.locator("form[data-contact-inquiry]");
  await form.locator('input[name="name"]').fill("Prueba");
  await form.locator('input[name="email"]').fill("preview-test@example.invalid");
  await form.locator('input[name="business"]').fill("Negocio de prueba");
  await form.locator('input[name="trade"]').fill("Plomería en Boise");
  await form.locator("label.sticker-check").filter({ hasText: "Quiero una vista previa gratis de mi página" }).click();
  await form.locator('input[name="service_area"]').fill("Boise y alrededores");
  await form.locator('textarea[name="services"]').fill("Destapar drenajes y reparar fugas");
  await form.locator("label.contact-preview-asset-consent").click();
  await form.locator('button[type="submit"]').click();

  await expect(form).toHaveClass(/is-done/);
  await expect(form.locator(".form__msg").getByRole("link", { name: "Agregar datos y fotos" }))
    .toHaveAttribute("href", "/es/intake");
});

test("cookie preferences button uses the cobalt cookie icon without translucency", async ({ page }) => {
  await page.route("https://cdn.conferbot.com/**", (route) => route.abort());
  await page.context().addCookies([{
    name: "kinexis_consent",
    value: "v1|a=0|d=0",
    url: "http://localhost:3100",
  }]);
  await page.goto("/");

  const fab = page.locator("[data-consent-fab]");
  await expect(fab).toHaveCSS("visibility", "hidden");
  await expect(fab).toHaveCSS("opacity", "0");
  await page.evaluate(() => document.documentElement.classList.add("sticky-chrome-in"));
  await expect(fab).toBeVisible();
  const sizes = await fab.evaluate((button) => {
    const buttonRect = button.getBoundingClientRect();
    const svgRect = button.querySelector("svg")!.getBoundingClientRect();
    return {
      buttonWidth: buttonRect.width,
      iconWidth: svgRect.width,
      fill: getComputedStyle(button.querySelector("svg circle")!).fill,
      backdrop: getComputedStyle(button).backdropFilter,
    };
  });
  expect(sizes.iconWidth).toBeGreaterThanOrEqual(sizes.buttonWidth * 0.9);
  expect(sizes.fill).toBe("rgb(11, 61, 255)");
  expect(sizes.backdrop).toBe("none");
});
