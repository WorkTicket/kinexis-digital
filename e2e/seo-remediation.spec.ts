import { expect, test, type Page } from "@playwright/test";
import { LEGACY_REDIRECTS } from "../src/lib/legacy-redirects";

async function enableMockLeadTracking(page: Page, baseURL?: string) {
  const origin = baseURL || "http://localhost:3000";
  await page.context().addCookies([{
    name: "kinexis_consent",
    value: "v1|a=1|d=0",
    url: origin,
  }]);
  await page.route("https://www.googletagmanager.com/**", (route) => route.abort());
}

async function readyMockLeadTracking(page: Page) {
  await page.waitForFunction(() => {
    const loaded = performance.getEntriesByType("resource")
      .some((entry) => entry.name.includes("/assets/js/boot.min.js"));
    return loaded && Boolean((window as Window & { __KINEXIS_CFG__?: unknown }).__KINEXIS_CFG__);
  });
  await page.evaluate(() => {
    const target = window as Window & {
      __KINEXIS_CFG__?: { ga?: string };
      dataLayer?: unknown[];
      gtag?: (...args: unknown[]) => void;
    };
    if (target.__KINEXIS_CFG__) target.__KINEXIS_CFG__.ga = "G-TEST123";
    window.dispatchEvent(new Event("pointerdown"));
    target.dataLayer = [];
  });
}

async function fillLeadForm(page: Page) {
  const form = page.locator("form[data-lead]").first();
  await form.locator('input[name="name"]').fill("QA Example");
  await form.locator('input[name="email"]').fill("qa@example.invalid");
  await form.locator('input[name="business"]').fill("QA Example Business");
  await form.locator('input[name="trade"]').fill("Plumbing in Denver");
  const previewInquiry = form.locator("label.sticker-check").filter({ hasText: "I’d like a free homepage preview" });
  if (await previewInquiry.count()) {
    await previewInquiry.click();
    await form.locator('input[name="service_area"]').fill("Denver");
    await form.locator('textarea[name="services"]').fill("Plumbing");
    await form.locator("[data-preview-asset-consent]").check({ force: true });
  }
  return form;
}

test.describe("KX-SEO-002 Release 1", () => {
  test("English homepage-preview plan links land on their matching pricing cards", async ({ page, baseURL }) => {
    test.setTimeout(120_000);
    await enableMockLeadTracking(page, baseURL);
    const slugs = ["website", "lead-system", "plus", "own-it"];
    const headings: Record<string, RegExp> = {
      website: /^Website$/,
      "lead-system": /^Lead System$/,
      plus: /^Plus/,
      "own-it": /^Own It$/,
    };
    const viewports = [
      { width: 390, height: 844 },
      { width: 1280, height: 900 },
    ];

    async function expectPlanClearOfHeader(slug: string) {
      const plan = page.locator(`.plans > article#${slug}`);
      await expect(plan).toHaveCount(1);
      await expect(plan.locator(".plan-title")).toHaveText(headings[slug]);
      await expect(plan.locator(".plan-title")).toBeVisible();
      await expect.poll(() => plan.evaluate((element) => element.getBoundingClientRect().top))
        .toBeLessThan(await page.evaluate(() => window.innerHeight));
      await expect.poll(() => page.evaluate((id) => {
        const target = document.getElementById(id);
        const header = document.querySelector(".header");
        if (!target || !header) return Number.NEGATIVE_INFINITY;
        return target.getBoundingClientRect().top - header.getBoundingClientRect().bottom;
      }, slug)).toBeGreaterThanOrEqual(8);
      await expect(plan.locator(".plan__cta")).toHaveAttribute("href", `/contact?plan=${slug}`);
    }

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      for (const slug of slugs) {
        await page.goto("/lp/get-a-website");
        const link = page.locator(`.lp-plans a[href="/pricing#${slug}"]`);
        await expect(link).toHaveCount(1);
        if (slug === "website" && viewport.width === 390) {
          await page.evaluate(() => {
            if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
          });
          for (let tab = 0; tab < 60; tab += 1) {
            await page.keyboard.press("Tab");
            if (await link.evaluate((element) => element === document.activeElement)) break;
          }
          await expect(link).toBeFocused();
          expect(await link.evaluate((element) => element.matches(":focus-visible"))).toBe(true);
          expect(await link.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe("none");
          await page.keyboard.press("Enter");
        } else {
          await link.click();
        }
        await expect(page).toHaveURL(new RegExp(`/pricing#${slug}$`));
        await expectPlanClearOfHeader(slug);

        if (slug === "website" && viewport.width === 390) {
          await page.goBack();
          await expect(page).toHaveURL(/\/lp\/get-a-website$/);
          await page.goForward();
          await expect(page).toHaveURL(/\/pricing#website$/);
          await expectPlanClearOfHeader(slug);
        }

        await page.goto("/lp/get-a-website");
        await page.goto(`/pricing#${slug}`);
        await expect(page).toHaveURL(new RegExp(`/pricing#${slug}$`));
        await expectPlanClearOfHeader(slug);
      }
    }
  });

  test("Spanish pricing plan links preserve locale and resolve to one visible target", async ({ page }) => {
    for (const route of ["/es", "/es/industries/plumbing", "/es/industries/landscaping"]) {
      await page.goto(route);
      await expect(page.locator('a[href="/es/pricing#lead-system"]').first()).toBeAttached();
    }

    await page.goto("/es/pricing#lead-system");
    const plan = page.locator("#lead-system");
    await expect(plan).toHaveCount(1);
    await expect(plan.locator(".plan-title")).toContainText(/Sistema de clientes|Lead System/i);
    await expect.poll(() => page.evaluate(() => {
      const target = document.getElementById("lead-system");
      return target ? target.getBoundingClientRect().top : Number.POSITIVE_INFINITY;
    })).toBeLessThan(260);
  });

  test("Spanish legacy case studies and portfolio template links resolve without losing portfolio navigation", async ({ page }) => {
    test.setTimeout(120_000);
    for (const slug of ["preferred-plumbing", "a1-property-services", "retired-example"]) {
      const response = await page.request.get(`/es/case-studies/${slug}`);
      expect(response.status()).toBe(200);
      expect(new URL(response.url()).pathname).toBe("/es/portfolio");
    }

    await page.goto("/es/portfolio");
    const templateLinks = page.locator('.portfolio--main a[href^="/portfolio/"]');
    expect(await templateLinks.count()).toBeGreaterThan(0);
    for (const href of await templateLinks.evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).pathname))) {
      const response = await page.request.get(href);
      expect(response.status(), `${href} should resolve to an existing English template`).toBe(200);
    }
  });

  test("payment timing and third-party disclosures are explicit in English and Spanish", async ({ page }) => {
    await page.goto("/pay");
    await expect(page.locator(".pay-hero")).toContainText(
      /Monthly plans start on your launch day.*Own It is a one-time payment due when you approve the free preview/i,
    );
    await expect(page.locator(".pay-after")).toContainText(
      /Own It is a one-time payment due when you approve the free preview/i,
    );

    await page.goto("/es/pay");
    await expect(page.locator(".pay-hero")).toContainText(
      /Los planes mensuales empiezan el día del lanzamiento.*Own It es un pago único que vence al aprobar la vista previa gratis/i,
    );
    await expect(page.locator(".pay-after")).toContainText(
      /Own It es un pago único que vence al aprobar la vista previa gratis/i,
    );

    for (const route of ["/privacy", "/es/privacy"]) {
      await page.goto(route);
      await expect(page.locator(".prose")).toContainText("PayPal");
      const chatDisclosure = page.locator(".prose p").filter({ hasText: "Conferbot" });
      await expect(chatDisclosure).toBeVisible();
      await expect(chatDisclosure).not.toContainText(/database|inbox|base de datos|correo/i);
    }
  });

  test("the four priority case-study links are present in rendered page HTML", async ({ page, baseURL }) => {
    await page.context().addCookies([{
      name: "kinexis_consent",
      value: "v1|a=0|d=0",
      url: baseURL || "http://localhost:3100",
    }]);
    const checks = [
      ["/industries/plumbing", "/case-studies/preferred-plumbing", "See the Preferred Plumbing website project"],
      ["/case-studies/preferred-plumbing", "/industries/plumbing", "Website design for plumbers"],
      ["/industries/landscaping", "/case-studies/a1-property-services", "See the A1 Property Services website project"],
      ["/case-studies/a1-property-services", "/industries/landscaping", "Website design for landscaping companies"],
    ] as const;

    for (const [route, href, label] of checks) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      const link = page.locator(`a[href="${href}"]`, { hasText: label });
      await expect(link).toBeVisible();
      await link.focus();
      await expect(link).toBeFocused();
      expect((await page.request.get(href)).status()).toBe(200);
    }
  });

  test("retired Spanish plumbing article has a one-hop permanent rule to its matching guide", async ({ page }) => {
    const matches = LEGACY_REDIRECTS.filter((rule) => rule.source === "/blog/pagina-web-para-plomeros");
    expect(matches).toHaveLength(1);
    expect(matches[0]).toMatchObject({
      destination: "/es/blog/pagina-web-para-plomeros",
      statusCode: 301,
    });
    const destination = await page.request.get("/es/blog/pagina-web-para-plomeros");
    expect(destination.status()).toBe(200);
    expect(new URL(destination.url()).pathname).toBe("/es/blog/pagina-web-para-plomeros");
  });

  test("legacy Spain process URL redirects to the Spanish about page", async ({ page }) => {
    const response = await page.request.get("/es-es/process", { maxRedirects: 0 });
    expect(response.status()).toBe(301);
    expect(response.headers().location).toBe("/es/about");
  });

  test("retired video-review URLs redirect directly to the live reviews pages in each locale", async ({ page }) => {
    const checks = [
      ["/video-reviews", "/reviews"],
      ["/video-reviews.html", "/reviews"],
      ["/es/video-reviews", "/es/reviews"],
      ["/es-es/video-reviews", "/es/reviews"],
    ] as const;

    for (const [source, destinationPath] of checks) {
      const rule = LEGACY_REDIRECTS.find((item) => item.source === source);
      expect(rule).toMatchObject({ destination: destinationPath, statusCode: 301 });

      const redirect = await page.request.get(source, { maxRedirects: 0 });
      expect(redirect.status(), `${source} should redirect once`).toBe(301);
      expect(new URL(redirect.headers().location, "http://localhost:3100").pathname).toBe(destinationPath);

      const destination = await page.request.get(destinationPath);
      expect(destination.status(), `${destinationPath} should be live`).toBe(200);
      expect(new URL(destination.url()).pathname).toBe(destinationPath);
    }
  });

  for (const route of ["/industries/plumbing", "/contact", "/es/industries/plumbing"]) {
    test(`accepted lead on ${route} emits one sanitized generate_lead`, async ({ page, baseURL }) => {
      await enableMockLeadTracking(page, baseURL);
      let requestCount = 0;
      let releaseRequest!: () => void;
      const pendingRequest = new Promise<void>((resolve) => { releaseRequest = resolve; });
      await page.route("**/api/contact", async (request) => {
        requestCount += 1;
        await pendingRequest;
        await request.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true,"accepted":true}' });
      });

      await page.goto(route);
      await readyMockLeadTracking(page);
      const form = await fillLeadForm(page);
      const submission = form.evaluate((element) => (element as HTMLFormElement).requestSubmit());
      await expect.poll(() => requestCount).toBe(1);
      await form.evaluate((element) => element.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));
      expect(requestCount).toBe(1);
      releaseRequest();
      await submission;
      await expect(form.locator(".form__msg")).toContainText(/Thanks|Gracias/);

      const events = await page.evaluate(() => {
        const target = window as Window & { dataLayer?: ArrayLike<ArrayLike<unknown>> };
        return Array.from(target.dataLayer ?? [], (event) => Array.from(event));
      });
      const leads = events.filter((event) => event[0] === "event" && event[1] === "generate_lead");
      expect(leads).toHaveLength(1);
      expect(JSON.stringify(leads)).not.toContain("QA Example");
      expect(JSON.stringify(leads)).not.toContain("qa@example.invalid");
      expect(JSON.stringify(leads)).not.toContain("QA Example Business");
    });
  }

  test("invalid and backend-rejected submissions emit no generate_lead", async ({ page, baseURL }) => {
    await enableMockLeadTracking(page, baseURL);
    let requestCount = 0;
    await page.route("**/api/contact", async (request) => {
      requestCount += 1;
      await request.fulfill({ status: 400, contentType: "application/json", body: '{"error":"Rejected for QA"}' });
    });

    await page.goto("/contact");
    await readyMockLeadTracking(page);
    const form = page.locator("form[data-lead]").first();
    await form.evaluate((element) => (element as HTMLFormElement).requestSubmit());
    expect(requestCount).toBe(0);
    await fillLeadForm(page);
    const rejectedForm = page.locator("form[data-lead]").first();
    await rejectedForm.evaluate((element) => (element as HTMLFormElement).requestSubmit());
    await expect(rejectedForm.locator(".form__msg")).toContainText("Rejected for QA");

    const leads = await page.evaluate(() => {
      const target = window as Window & { dataLayer?: ArrayLike<ArrayLike<unknown>> };
      return Array.from(target.dataLayer ?? [], (event) => Array.from(event))
        .filter((event) => event[0] === "event" && event[1] === "generate_lead");
    });
    expect(leads).toHaveLength(0);
  });
});
