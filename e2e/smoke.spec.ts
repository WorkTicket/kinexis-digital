import { expect, test } from "@playwright/test";

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

  test("preview form shows required business fields", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('input[name="business"]').first()).toBeVisible();
    await expect(page.locator('input[name="trade"]').first()).toBeVisible();
    await expect(page.locator('input[name="photos"][type="file"]').first()).toBeAttached();
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
    await page.locator(".consent-banner").getByRole("button", { name: /Reject non-essential/i }).click();
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
});

