import { expect, test } from "@playwright/test";

/**
 * Production / live-base verification for measurement + checkout wiring.
 * Run against production:
 *   PLAYWRIGHT_BASE_URL=https://www.kinexisdigital.com npx playwright test e2e/production-audit.spec.ts --project=chromium
 */
const isProd = (process.env.PLAYWRIGHT_BASE_URL || "").includes("kinexisdigital.com");

test.describe("measurement delivery", () => {
  test("after accept, GA4 collect and Meta /tr fire when IDs are present", async ({ page, context, baseURL }) => {
    await context.clearCookies();
    const gaCollect: string[] = [];
    const metaHits: string[] = [];
    const scriptHits: string[] = [];

    page.on("request", (req) => {
      const url = req.url();
      if (url.includes("googletagmanager.com/gtag/js")) scriptHits.push(url);
      if (url.includes("fbevents.js")) scriptHits.push(url);
      if (url.includes("/g/collect") || url.includes("analytics.google.com/g/collect")) gaCollect.push(url);
      // Meta Pixel may hit /tr, /tr/, or signals/config after fbevents.js loads.
      if (
        url.includes("facebook.com/tr") ||
        url.includes("facebook.net/tr") ||
        (url.includes("connect.facebook.net") && url.includes("signals/config"))
      ) {
        metaHits.push(url);
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
    // boot.min.js is lazyOnload — wait until it is present and cfg is live.
    await page.waitForFunction(() => {
      const scripts = [...document.scripts].some((s) => (s.src || "").includes("boot.min.js"));
      return scripts && Boolean(window.__KINEXIS_CFG__);
    }, null, { timeout: 60_000 });
    await page.waitForTimeout(500);

    const ids = await page.evaluate(() => {
      const cfg = (window as Window & { __KINEXIS_CFG__?: { ga?: string; metaPixel?: string } }).__KINEXIS_CFG__;
      return {
        ga: Boolean(cfg?.ga && /^G-[A-Z0-9]+$/.test(cfg.ga)),
        meta: Boolean(cfg?.metaPixel && /^\d{5,20}$/.test(cfg.metaPixel)),
        gaId: cfg?.ga || "",
        metaId: cfg?.metaPixel || "",
      };
    });

    test.info().annotations.push({ type: "ga", description: ids.gaId || "(empty)" });
    test.info().annotations.push({ type: "meta", description: ids.metaId || "(empty)" });

    if (!ids.ga && !ids.meta) {
      test.skip(!isProd, "measurement IDs not configured in this environment");
      expect(ids.ga || ids.meta, "production must ship GA and/or Meta IDs").toBeTruthy();
    }

    await expect(async () => {
      await page.evaluate(() => window.dispatchEvent(new Event("kinexis:consent")));
      await page.locator("main").click({ position: { x: 24, y: 24 }, force: true }).catch(() => {});
      await page.dispatchEvent("body", "pointerdown");
      await page.dispatchEvent("body", "touchstart");
      expect(
        (!ids.ga || scriptHits.some((url) => url.includes("googletagmanager.com"))) &&
        (!ids.meta || scriptHits.some((url) => url.includes("fbevents.js"))),
      ).toBe(true);
    }).toPass({ timeout: 15_000, intervals: [250, 500, 1000] });

    if (ids.ga) {
      await expect.poll(() => scriptHits.some((u) => u.includes("googletagmanager.com")), { timeout: 25_000 }).toBe(true);
      await expect.poll(() => gaCollect.length, { timeout: 25_000 }).toBeGreaterThan(0);
    }
    if (ids.meta) {
      await expect.poll(() => scriptHits.some((u) => u.includes("fbevents.js")), { timeout: 25_000 }).toBe(true);
      await expect.poll(() => metaHits.length, { timeout: 25_000 }).toBeGreaterThan(0);
    }
  });

  test("reject consent never hits collect or Meta tr", async ({ page, context, baseURL }) => {
    await context.clearCookies();
    const bad: string[] = [];
    page.on("request", (req) => {
      const url = req.url();
      if (
        url.includes("/g/collect") ||
        url.includes("facebook.com/tr") ||
        url.includes("googletagmanager.com") ||
        url.includes("fbevents.js")
      ) {
        bad.push(url);
      }
    });
    const host = new URL(baseURL || "http://localhost:3000").hostname;
    await context.addCookies([{
      name: "kinexis_consent",
      value: "v1|a=0|d=0",
      domain: host,
      path: "/",
    }]);
    await page.goto("/", { waitUntil: "load" });
    await page.waitForTimeout(3500);
    await page.mouse.click(40, 40);
    await page.waitForTimeout(2000);
    expect(bad).toEqual([]);
  });
});

test.describe("PayPal checkout wiring", () => {
  test("Lead System agreement reveals PayPal SDK buttons (no payment)", async ({ page }) => {
    await page.goto("/pay?plan=lead-system", { waitUntil: "load" });
    await expect(page.getByText(/Lead System|\$197/i).first()).toBeVisible();

    const agree = page.locator("#plan-terms");
    await expect(agree).toBeVisible();
    await agree.check();

    const readState = () => page.evaluate(() => {
      const script = document.querySelector("#kinexis-paypal-subscriptions") as HTMLScriptElement | null;
      let clientId = "";
      if (script?.src) {
        try {
          clientId = new URL(script.src).searchParams.get("client-id") ?? "";
        } catch {
          clientId = "";
        }
      }
      if (document.querySelector(".pay-alert")) return { state: "failed", clientId };
      const host = document.querySelector(".pay-paypal");
      const iframe = host?.querySelector("iframe");
      if (iframe || (host && host.childElementCount > 0)) return { state: "ready", clientId };
      if (script) return { state: "loading", clientId };
      return { state: "pending", clientId };
    });

    let settled = await readState();
    try {
      await expect.poll(async () => {
        settled = await readState();
        return settled.state === "failed" || settled.state === "ready" ? settled.state : "pending";
      }, { timeout: 35_000 }).toMatch(/failed|ready/);
      settled = await readState();
    } catch (error) {
      settled = await readState();
      if (settled.state !== "loading") throw error;
    }

    // No public client id: fail closed. A configured client id must reach loading or ready.
    // This does not approve or capture a payment.
    if (settled.state === "failed") {
      expect(settled.clientId, "a configured PayPal client id must not stop at the fail-closed alert").toBe("");
      await expect(page.locator(".pay-alert")).toBeVisible();
    } else {
      expect(settled.clientId, "SDK load requires the public PayPal client id").not.toBe("");
      expect(settled.state).toMatch(/ready|loading/);
    }
  });
});
