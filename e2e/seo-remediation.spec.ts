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

  for (const route of ["/industries/plumbing", "/contact", "/es/industries/plumbing"]) {
    test(`accepted lead on ${route} emits one sanitized generate_lead`, async ({ page, baseURL }) => {
      await enableMockLeadTracking(page, baseURL);
      let requestCount = 0;
      let releaseRequest!: () => void;
      const pendingRequest = new Promise<void>((resolve) => { releaseRequest = resolve; });
      await page.route("**/api/contact", async (request) => {
        requestCount += 1;
        await pendingRequest;
        await request.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
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
