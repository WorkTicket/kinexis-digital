import { expect, test } from "@playwright/test";

test("M1: long blog content stays within a narrow viewport", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/blog/pool-service-website-cost");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
});

test("M2: industry proof does not request missing 480px crops", async ({ page }) => {
  await page.goto("/industries/plumbing");
  const srcsets = await page.locator(".industry-proof img").evaluateAll((imgs) => imgs.map((img) => img.getAttribute("srcset") ?? ""));
  expect(srcsets.length).toBeGreaterThan(0);
  expect(srcsets.join(" ")).not.toMatch(/live-preferred-plumbing-480|a1-landscaping-480/);
});

test("M3: Spanish audit module selects Spanish art", async ({ page }) => {
  await page.goto("/es/industries/plumbing");
  const source = page.locator(".industry-audit picture source[type='image/avif']");
  await expect(source).toHaveAttribute("srcset", /website-audit-desktop-es\.avif/);
});

test("M4: Spanish industry proof uses Spanish copy", async ({ page }) => {
  await page.goto("/es/industries/plumbing");
  await expect(page.getByRole("link", { name: "Visitar sitio publicado" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Ver portafolio" })).toBeVisible();
  await expect(page.getByText("Encabezado local y teléfono")).toBeVisible();
  await expect(page.getByText("Visit Live Site")).toHaveCount(0);
});

test("M5/M9: Spanish depth is localized and English industry checklist grammar is correct", async ({ page }) => {
  await page.goto("/es/industries/hvac");
  await expect(page.getByRole("cell", { name: "Plus (Bilingüe)" })).toBeVisible();
  await expect(page.getByText("$197/mes", { exact: true })).toBeVisible();
  await expect(page.getByText("Full checklist", { exact: false })).toHaveCount(0);
  await page.goto("/industries/electrical");
  await expect(page.getByText("Full checklist: pages every electrician website needs")).toBeVisible();
  await page.goto("/industries/hvac");
  await expect(page.getByText("Full checklist: pages every HVAC website needs")).toBeVisible();
});

test("M6/NEW-4: Spanish pages avoid English plan art and text-heavy legacy campaign art", async ({ page }) => {
  for (const path of ["/es", "/es/pricing", "/es/web-design", "/es/website-management", "/es/faqs", "/es/industries/plumbing"]) {
    await page.goto(path);
    const sources = await page.locator(".offer__sticker,.plan-sticker,.campaign-page-art img,.home-section-art img").evaluateAll((items) =>
      items.flatMap((item) => [
        item.getAttribute("src") ?? "",
        item.getAttribute("srcset") ?? "",
        item.getAttribute("data-src") ?? "",
      ]).join(" "),
    );
    expect(sources, path).not.toMatch(/stickers\/(?:plan-name-|planes-|sin-anticipo-hazlo-tuyo)/);
    expect(sources, path).not.toMatch(/google-reviews-handled/);
  }
});

test("M7: Spanish pricing and service grids fit narrow screens", async ({ page }) => {
  for (const width of [320, 360, 390]) {
    await page.setViewportSize({ width, height: 800 });
    for (const path of ["/es/pricing", "/es/industries/hvac"]) {
      await page.goto(path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth), `${path} at ${width}px`).toBeLessThanOrEqual(width);
    }
  }
});

test("M8: known Spanish article sentence starts remain capitalized", async ({ page }) => {
  await page.goto("/es/blog/local-seo-get-found-get-called");
  const bodyText = await page.locator(".blog-post__content").innerText();
  expect(bodyText).not.toMatch(/\. una solicitud|(?:^|\n)la solicitud de reseña/);
});

test("NEW-1/NEW-2/NEW-3/NEW-5: Spanish pricing labels, localized payment, and current privacy notice", async ({ page }) => {
  await page.goto("/es/pricing");
  await expect(page.getByRole("heading", { name: "Own It", exact: true }).first()).toBeVisible();
  await expect(page.locator("p.pay-bridge a.trust-mark")).toHaveAttribute("href", "/es/pay");
  await expect(page.locator("img[alt*='Hazlo tuyo' i], img[alt*='Sistema de clientes' i], img[alt*='Sitio web,' i]")).toHaveCount(0);
  await page.goto("/es/privacy");
  await expect(page.getByText("Actualizada el 20 de noviembre de 2026", { exact: false })).toBeVisible();
  await expect(page.getByText(/no crea ni lee cookies[\s\S]*limitar el abuso de este endpoint/)).toBeVisible();
});

test("S15: hidden trade links do not return in their Spanish and English article bodies", async ({ page }) => {
  for (const path of [
    "/blog/pool-service-website-cost", "/blog/pool-service-website-pages",
    "/blog/window-cleaning-website-cost", "/blog/window-cleaning-website-pages",
    "/blog/lawn-care-website-cost", "/blog/lawn-care-website-pages",
    "/es/blog/pool-service-website-cost", "/es/blog/pool-service-website-pages",
    "/es/blog/window-cleaning-website-cost", "/es/blog/window-cleaning-website-pages",
    "/es/blog/lawn-care-website-cost", "/es/blog/lawn-care-website-pages",
  ]) {
    await page.goto(path);
    await expect(page.locator('a[href*="/industries/pool-care"],a[href*="/industries/window-cleaning"],a[href*="/industries/yard-care"]'), path).toHaveCount(0);
  }
});
