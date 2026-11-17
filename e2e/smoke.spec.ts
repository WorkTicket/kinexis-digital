import { expect, test } from "@playwright/test";

async function installMockAnalytics(page: import("@playwright/test").Page) {
  await page.addInitScript(() => {
    type Config = Record<string, string>;
    const target = window as unknown as { __KINEXIS_CFG__?: Config };
    let config = target.__KINEXIS_CFG__;
    Object.defineProperty(target, "__KINEXIS_CFG__", {
      configurable: true,
      get: () => config,
      set: (next: Config) => {
        config = { ...next, ga: "G-TEST12345", metaPixel: "" };
      },
    });
    document.cookie = "kinexis_consent=v1%7Ca%3D1%7Cd%3D0; Path=/; SameSite=Lax";
  });
  await page.route("https://www.googletagmanager.com/**", (route) => route.abort());
  await page.route("https://www.google-analytics.com/**", (route) => route.abort());
}

async function waitForBoot(page: import("@playwright/test").Page) {
  await page.waitForFunction(() =>
    [...document.scripts].some((script) => (script.src || "").includes("boot.min.js"))
      && (window as Window & { __KINEXIS_CFG__?: { ga?: string } }).__KINEXIS_CFG__?.ga === "G-TEST12345",
  );
}

async function gaEvents(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer ?? [];
    return dataLayer
      .map((entry) => Array.from(entry as ArrayLike<unknown>))
      .filter((args) => args[0] === "event")
      .map((args) => ({ name: args[1], params: args[2] }));
  });
}

test.describe("marketing journeys", () => {
  test("homepage loads and shows plan comparison", async ({ page }, testInfo) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Website Plans and Pricing|A Website That Brings In More Calls/i }).first()).toBeVisible();
    if (testInfo.project.name === "mobile") {
      await expect(page.locator(".mobile-plan-compare").getByRole("img", { name: /Lead System/i })).toBeVisible();
    } else {
      await expect(page.getByRole("columnheader", { name: "Lead System" })).toBeVisible();
    }
  });

  test("pricing page shows ownership comparison and text-back add-on", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.getByText("Own It vs monthly managed plans")).toBeVisible();
    await expect(page.locator(".pricing-comparison-table, .plan-compare__table").getByText("Add-on $97/mo").first()).toBeAttached();
    await expect(page.locator(".pricing-footnote--bullets li").first()).toBeVisible();
  });

  test("English blog hub does not link to retired Spanish-slug redirects", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.locator('a[href="/blog/pagina-web-para-plomeros"]')).toHaveCount(0);
    await expect(page.locator('a[href="/blog/como-pedir-resenas-en-google"]')).toHaveCount(0);
    await expect(page.locator('a[href="/industries/plumbing"]')).not.toHaveCount(0);
    await expect(page.locator('a[href="/blog/how-to-ask-for-google-reviews-contractor"]')).not.toHaveCount(0);
  });

  test("Spanish-only legacy articles switch directly to their current English equivalent", async ({ page }) => {
    const equivalents = [
      ["/es/blog/pagina-web-para-plomeros", "/industries/plumbing"],
      ["/es/blog/como-pedir-resenas-en-google", "/blog/how-to-ask-for-google-reviews-contractor"],
    ] as const;
    for (const [spanishPath, englishPath] of equivalents) {
      await page.goto(spanishPath);
      const englishLink = page.locator('[data-lang-locale="en"]');
      await expect(englishLink).toHaveAttribute("href", englishPath);
      const response = await page.request.get(englishPath, { maxRedirects: 0 });
      expect(response.status()).toBe(200);
    }
  });

  test("translated checkout utility switches between Spanish and English routes", async ({ page }) => {
    for (const [spanishPath, englishPath] of [["/es/pay", "/pay"], ["/es/pay/thanks", "/pay/thanks"]] as const) {
      await page.goto(spanishPath);
      await expect(page.locator('[data-lang-locale="en"]')).toHaveAttribute("href", englishPath);
      await expect(page.locator("html")).toHaveAttribute("lang", "es");
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    }
  });

  test("representative Spanish pages render in Spanish without horizontal overflow", async ({ page }) => {
    for (const path of ["/es", "/es/pricing", "/es/contact", "/es/industries/plumbing", "/es/blog"]) {
      await page.goto(path);
      await expect(page.locator("html")).toHaveAttribute("lang", "es");
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
      }));
      expect(dimensions.content, `${path} overflows at ${dimensions.viewport}px`).toBeLessThanOrEqual(dimensions.viewport + 1);
    }
  });

  test("preview form shows required business fields", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('input[name="business"]').first()).toBeVisible();
    await expect(page.locator('input[name="trade"]').first()).toBeVisible();
    await expect(page.locator('input[name="photos"][type="file"]').first()).toBeAttached();
  });

  test("free-preview conversion fires once and only after confirmed success", async ({ page }) => {
    await installMockAnalytics(page);
    let submissions = 0;
    await page.route("**/api/contact", (route) => {
      submissions += 1;
      return route.fulfill({
        status: submissions === 1 ? 502 : 200,
        contentType: "application/json",
        body: JSON.stringify(submissions === 1 ? { error: "Mock delivery failure" } : { ok: true }),
      });
    });
    await page.goto("/");
    await waitForBoot(page);
    const form = page.locator('form[data-conversion="preview"]').first();
    await form.locator('input[name="name"]').fill("Test Visitor");
    await form.locator('input[name="email"]').fill("visitor@example.test");
    await form.locator('input[name="business"]').fill("Test Business");
    await form.locator('input[name="trade"]').fill("Plumbing in Boise");
    await form.locator('button[type="submit"]').click();
    await expect(form.locator(".form__msg")).toContainText("Mock delivery failure");
    expect((await gaEvents(page)).map((event) => event.name)).not.toContain("generate_lead");

    await form.locator('button[type="submit"]').click();
    await expect(form).toHaveClass(/is-done/);
    const events = await gaEvents(page);
    expect(events.filter((event) => event.name === "generate_lead")).toHaveLength(1);
    expect(events.filter((event) => event.name === "preview_form_submit")).toHaveLength(1);
    expect(JSON.stringify(events)).not.toContain("visitor@example.test");
  });

  test("website audit has a distinct confirmed conversion, not a preview conversion", async ({ page }) => {
    await installMockAnalytics(page);
    await page.route("**/api/contact", (route) => route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    }));
    await page.goto("/audit");
    await waitForBoot(page);
    const form = page.locator('form[data-conversion="audit"]');
    await form.locator('input[name="name"]').fill("Test Visitor");
    await form.locator('input[name="email"]').fill("visitor@example.test");
    await form.locator('input[name="url"]').fill("https://example.test");
    await form.locator('button[type="submit"]').click();
    await expect(form).toHaveClass(/is-done/);
    const names = (await gaEvents(page)).map((event) => event.name);
    expect(names.filter((name) => name === "audit_request")).toHaveLength(1);
    expect(names).not.toContain("generate_lead");
    expect(names).not.toContain("preview_form_submit");
  });

  test("client intake and update submissions do not count as new leads", async ({ page }) => {
    await installMockAnalytics(page);
    await page.route("**/api/contact", (route) => route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    }));
    await page.goto("/update");
    await waitForBoot(page);
    const update = page.locator('form:has(textarea[name="request"])');
    await update.locator('input[name="name"]').fill("Existing Client");
    await update.locator('input[name="email"]').fill("client@example.test");
    await update.locator('textarea[name="request"]').fill("Update the service page.");
    await update.locator('button[type="submit"]').click();
    await expect(update).toHaveClass(/is-done/);

    await page.goto("/intake");
    await waitForBoot(page);
    const intake = page.locator("#website-intake");
    await intake.locator('input[name="name"]').fill("Existing Client");
    await intake.locator('input[name="phone"]').fill("3075551234");
    await intake.locator('input[name="business"]').fill("Test Business");
    await intake.locator('input[name="trade"]').fill("Plumbing in Boise");
    await intake.locator('input[name="service_area"]').fill("Boise");
    await intake.locator('textarea[name="services"]').fill("Drain repair");
    await intake.locator('button[type="submit"]').click();
    await expect(intake).toHaveClass(/is-done/);

    const names = (await gaEvents(page)).map((event) => event.name);
    expect(names).not.toContain("generate_lead");
    expect(names).not.toContain("preview_form_submit");
    expect(names).not.toContain("preview_form_view");
    expect(names).not.toContain("preview_form_start");
  });

  test("mobile nav opens", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "mobile project only");
    await page.goto("/");
    await page.waitForLoadState("load");
    // boot.min.js is lazyOnload — wait until its document click handler is live.
    await page.waitForFunction(() => {
      const scripts = [...document.scripts].some((s) => (s.src || "").includes("boot.min.js"));
      return scripts && Boolean(window.__KINEXIS_CFG__);
    }, null, { timeout: 30_000 });
    await page.waitForTimeout(400);
    // Clear consent overlay so it cannot steal the tap target.
    await page.evaluate(() => {
      document.cookie = `kinexis_consent=${encodeURIComponent("v1|a=0|d=0")}; Path=/; Max-Age=86400; SameSite=Lax`;
      window.dispatchEvent(new Event("kinexis:consent"));
    });
    await page.waitForTimeout(200);
    await page.locator("button.burger[aria-controls='nav']").click();
    await expect.poll(async () => page.evaluate(() => (
      document.documentElement.classList.contains("nav-open") || Boolean(document.querySelector("#nav.is-open"))
    )), { timeout: 10_000 }).toBe(true);
  });

  test("cookie consent: undecided and reject block trackers", async ({ page, context, baseURL }) => {
    await context.clearCookies();
    const trackerHits: string[] = [];
    page.on("request", (req) => {
      const url = req.url();
      if (
        url.includes("googletagmanager.com") ||
        url.includes("google-analytics.com") ||
        url.includes("connect.facebook.net") ||
        url.includes("fbevents.js")
      ) {
        trackerHits.push(url);
      }
    });

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator(".consent-banner")).toBeVisible({ timeout: 15_000 });
    await page.waitForTimeout(1500);
    expect(trackerHits, "undecided must not load GA/Meta").toEqual([]);

    // UI reject must persist the cookie contract.
    await page.locator(".consent-banner").getByRole("button", { name: /^Reject$/i }).click();
    await expect.poll(async () => page.evaluate(() => {
      const m = document.cookie.match(/(?:^|; )kinexis_consent=([^;]*)/);
      return m ? decodeURIComponent(m[1]) : "";
    }), { timeout: 10_000 }).toMatch(/v1\|a=0\|d=0/);
    await expect(page.getByRole("button", { name: /Cookie preferences/i })).toBeVisible();

    trackerHits.length = 0;
    const host = new URL(baseURL || "http://127.0.0.1:3000").hostname;
    await context.addCookies([{
      name: "kinexis_consent",
      value: "v1|a=0|d=0",
      domain: host,
      path: "/",
    }]);
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.mouse.click(20, 20);
    await page.waitForTimeout(2000);
    expect(trackerHits, "reject cookie must not load GA/Meta").toEqual([]);
    await expect(page.getByRole("button", { name: /Cookie preferences/i })).toBeVisible();
  });

  test("cookie consent: accept arms trackers when IDs configured", async ({ page, context, baseURL }) => {
    await context.clearCookies();
    const trackerHits: string[] = [];
    const gaCollect: string[] = [];
    const metaTr: string[] = [];
    page.on("request", (req) => {
      const url = req.url();
      if (url.includes("googletagmanager.com") || url.includes("connect.facebook.net") || url.includes("google-analytics.com")) {
        trackerHits.push(url);
      }
      if (url.includes("/g/collect") || url.includes("analytics.google.com/g/collect")) gaCollect.push(url);
      if (
        url.includes("facebook.com/tr") ||
        (url.includes("facebook.net") && url.includes("/tr")) ||
        (url.includes("connect.facebook.net") && url.includes("signals/config"))
      ) {
        metaTr.push(url);
      }
    });

    const host = new URL(baseURL || "http://localhost:3000").hostname;
    await context.addCookies([{
      name: "kinexis_consent",
      value: "v1|a=1|d=1",
      domain: host,
      path: "/",
    }]);
    await page.goto("/", { waitUntil: "load" });
    await page.waitForFunction(() => {
      const scripts = [...document.scripts].some((s) => (s.src || "").includes("boot.min.js"));
      return scripts && Boolean(window.__KINEXIS_CFG__);
    }, null, { timeout: 30_000 });
    await page.waitForTimeout(400);
    await page.evaluate(() => window.dispatchEvent(new Event("kinexis:consent")));
    await page.locator("main").click({ position: { x: 20, y: 20 }, force: true }).catch(() => {});
    await page.dispatchEvent("body", "pointerdown");

    const ids = await page.evaluate(() => {
      const cfg = (window as Window & { __KINEXIS_CFG__?: { ga?: string; metaPixel?: string } }).__KINEXIS_CFG__;
      return {
        ga: Boolean(cfg?.ga && /^G-[A-Z0-9]+$/.test(cfg.ga)),
        meta: Boolean(cfg?.metaPixel && /^\d{5,20}$/.test(cfg.metaPixel)),
      };
    });
    if (ids.ga || ids.meta) {
      await expect.poll(() => trackerHits.length, { timeout: 20_000 }).toBeGreaterThan(0);
    }
    if (ids.ga) await expect.poll(() => gaCollect.length, { timeout: 20_000 }).toBeGreaterThan(0);
    if (ids.meta) {
      await expect.poll(
        () => metaTr.length || trackerHits.some((u) => u.includes("fbevents") || u.includes("signals/config")),
        { timeout: 20_000 },
      ).toBeTruthy();
    }
  });

  test("cookie consent: analytics-only does not load Meta", async ({ page, context, baseURL }) => {
    await context.clearCookies();
    const gaHits: string[] = [];
    const metaHits: string[] = [];
    page.on("request", (req) => {
      const url = req.url();
      if (url.includes("googletagmanager.com") || url.includes("google-analytics.com")) gaHits.push(url);
      if (url.includes("connect.facebook.net") || url.includes("fbevents.js")) metaHits.push(url);
    });

    const host = new URL(baseURL || "http://localhost:3000").hostname;
    await context.addCookies([{
      name: "kinexis_consent",
      value: "v1|a=1|d=0",
      domain: host,
      path: "/",
    }]);
    await page.goto("/", { waitUntil: "load" });
    await page.waitForFunction(() => {
      const scripts = [...document.scripts].some((s) => (s.src || "").includes("boot.min.js"));
      return scripts && Boolean(window.__KINEXIS_CFG__);
    }, null, { timeout: 30_000 });
    await page.waitForTimeout(400);
    await page.evaluate(() => window.dispatchEvent(new Event("kinexis:consent")));
    await page.locator("main").click({ position: { x: 20, y: 20 }, force: true }).catch(() => {});
    await page.dispatchEvent("body", "pointerdown");
    await page.waitForTimeout(3000);

    const ids = await page.evaluate(() => {
      const cfg = (window as Window & { __KINEXIS_CFG__?: { ga?: string; metaPixel?: string } }).__KINEXIS_CFG__;
      return {
        ga: Boolean(cfg?.ga && /^G-[A-Z0-9]+$/.test(cfg.ga)),
        meta: Boolean(cfg?.metaPixel && /^\d{5,20}$/.test(cfg.metaPixel)),
      };
    });
    expect(metaHits, "ads rejected → Meta must not load").toEqual([]);
    if (ids.ga) await expect.poll(() => gaHits.length, { timeout: 15_000 }).toBeGreaterThan(0);
  });

  test("checkout page loads without taking payment", async ({ page }) => {
    await page.goto("/pay");
    await expect(page.getByText(/Your new website starts here/i).first()).toBeVisible();
    await expect(page.locator("#invoice")).toBeVisible();
    await expect(page.getByText(/invoice link|payment link/i).first()).toBeVisible();
  });

  test("invoice amount cannot be posted from client", async ({ page }) => {
    const res = await page.request.post("/api/checkout", {
      data: {
        amount: "1.00",
        description: "Tamper test",
        name: "Test User",
        email: "test@example.com",
        idempotencyKey: crypto.randomUUID(),
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Avoid colliding with rate-limit bucket from earlier suite calls.
        "x-forwarded-for": `203.0.113.${Math.floor(Math.random() * 200) + 1}`,
      },
    });
    expect([400, 429]).toContain(res.status());
    if (res.status() === 400) {
      const body = await res.json();
      expect(String(body.error || "")).toMatch(/invoice payment link|cannot be entered manually/i);
    }
  });

  test("invoice admin rejects missing secret", async ({ page }) => {
    const res = await page.request.post("/api/invoices", {
      data: { amount: "100", description: "Admin probe" },
      headers: { "Content-Type": "application/json", Accept: "application/json" },
    });
    expect([401, 503]).toContain(res.status());
  });

  test("case study uses live screenshot only", async ({ page }) => {
    const res = await page.goto("/case-studies/preferred-plumbing");
    expect(res?.ok()).toBeTruthy();
    await expect(page.getByText(/Preferred Plumbing Solutions/i).first()).toBeVisible();
    await expect(page.locator(".case-study__shot, figure").first()).toBeVisible();
    await expect(page.getByText(/verified project details|Live site|callpreferredplumbing/i).first()).toBeVisible();
  });

  test("portfolio template screenshot uses its real dimensions and responsive source", async ({ page }) => {
    const res = await page.goto("/portfolio/tileline-bath-tile");
    expect(res?.ok()).toBeTruthy();
    const screenshot = page.locator(".project-shot-section img").first();
    await expect(screenshot).toHaveAttribute("width", "1600");
    await expect(screenshot).toHaveAttribute("height", "8754");
    await expect(screenshot).toHaveAttribute("srcset", /800w.*960w.*1600w/);

    await screenshot.scrollIntoViewIfNeeded();
    await screenshot.evaluate((image: HTMLImageElement) => image.decode());
    const current = await screenshot.evaluate((image: HTMLImageElement) => ({
      source: image.currentSrc,
      pixelRatio: window.devicePixelRatio,
      width: image.naturalWidth,
      height: image.naturalHeight,
    }));
    expect(current.width).toBeGreaterThan(0);
    expect(current.height).toBeGreaterThan(0);
    expect(current.source).toContain(current.pixelRatio > 2 ? "-960.webp" : "-800.webp");
  });

  test("Conferbot widget stays unloaded while public flag is off", async ({ page }) => {
    // Playwright webServer is `npm run dev`, which does not load `.env.production`.
    // Production builds may enable the widget via that file; this suite asserts the
    // default/dev/CI path stays off. Chat is not analytics-gated; flag-off alone
    // must keep the script out even after interaction / idle window.
    test.skip(
      process.env.NEXT_PUBLIC_CONFERBOT_ENABLED === "1",
      "Public widget flag is on in this environment; off-by-default contract N/A",
    );
    await page.goto("/");
    await page.mouse.click(40, 40);
    await page.keyboard.press("Tab");
    await page.waitForTimeout(3_000);
    const loaded = await page.evaluate(() => ({
      script: Boolean(document.getElementById("conferbot-js")),
      srcHits: [...document.scripts].some((s) => (s.src || "").includes("cdn.conferbot.com")),
    }));
    expect(loaded.script).toBe(false);
    expect(loaded.srcHits).toBe(false);
  });
});
