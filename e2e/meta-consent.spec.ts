import { expect, test, type Page, type Route } from "@playwright/test";

declare global {
  interface Window {
    __metaCalls?: unknown[][];
    __metaInstalled?: boolean;
    __metaFbq?: Window["fbq"];
  }
}

async function enableAdsOnly(page: Page) {
  await page.locator("[data-consent-manage]").click();
  await page.locator("[data-consent-ads]").check({ force: true });
  await page.locator("[data-consent-save]").click();
}

async function waitForBoot(page: Page) {
  await page.waitForFunction(() =>
    typeof window.__KINEXIS_TRACK_META_LEAD__ === "function"
      && Boolean(window.__KINEXIS_CFG__?.metaContentNameByForm?.home),
  );
}

async function enterLead(page: Page) {
  const form = page.locator('form[data-conversion="preview"]');
  await form.locator('input[name="name"]').fill("Meta consent test");
  await form.locator('input[name="email"]').fill("pixel-test@example.invalid");
  await form.locator('input[name="business"]').fill("Test business");
  await form.locator('input[name="trade"]').fill("Test service");
  return form;
}

async function leadCalls(page: Page) {
  return page.evaluate(() =>
    (window.__metaCalls || []).filter((args) => args[0] === "track" && args[1] === "Lead"),
  );
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const w = window as Window & {
      __metaCalls: unknown[][];
      __metaFbq?: Window["fbq"];
      __KINEXIS_CFG__?: Record<string, unknown>;
    };
    let config = w.__KINEXIS_CFG__;
    Object.defineProperty(w, "__KINEXIS_CFG__", {
      configurable: true,
      get: () => config,
      set: (next: Record<string, unknown>) => {
        config = { ...next, metaPixel: "123456789012345" } as Window["__KINEXIS_CFG__"];
      },
    });
    w.__metaCalls = [];
    Object.defineProperty(w, "fbq", {
      configurable: true,
      get: () => w.__metaFbq,
      set: (original: NonNullable<Window["fbq"]>) => {
        const wrapped = ((...args: unknown[]) => {
          w.__metaCalls.push(args);
          return original(...args);
        }) as NonNullable<Window["fbq"]>;
        Object.assign(wrapped, original);
        w.__metaFbq = wrapped;
      },
    });
  });
  // Prevent the test pixel from contacting Meta or sending any external event.
  await page.route("https://connect.facebook.net/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" }),
  );
  await page.route("https://www.facebook.com/**", (route) => route.abort());
  await page.route("https://*.facebook.com/**", (route) => route.abort());
});

test("does not create or call fbq until advertising consent is granted", async ({ page }) => {
  await page.goto("/");
  await expect.poll(() => page.evaluate(() => typeof window.fbq)).toBe("undefined");
  await expect(page.locator('script[src*="connect.facebook.net"]')).toHaveCount(0);

  await page.locator("[data-consent-reject]").click();
  await page.evaluate(() => history.pushState({}, "", "/about"));
  await expect.poll(() => page.evaluate(() => typeof window.fbq)).toBe("undefined");
  await expect(page.locator('script[src*="connect.facebook.net"]')).toHaveCount(0);
});

test("fires one Lead only after server success and matches the submitted event ID", async ({ page }) => {
  const submissions: string[] = [];
  let releaseResponse!: () => void;
  const responseGate = new Promise<void>((resolve) => { releaseResponse = resolve; });
  await page.route("**/api/contact", async (route: Route) => {
    submissions.push(route.request().postDataBuffer()?.toString() || "");
    await responseGate;
    await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
  });

  await page.goto("/");
  await waitForBoot(page);
  await enableAdsOnly(page);
  const form = await enterLead(page);
  await form.locator('input[name="name"]').click();
  await page.evaluate(() => {
    const target = document.querySelector('form[data-conversion="preview"]');
    target?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    target?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  });

  await expect.poll(() => submissions.length).toBe(1);
  expect(await leadCalls(page)).toHaveLength(0);
  const eventId = submissions[0].match(/name="kx_event_id"\r\n\r\n([0-9a-f-]+)/i)?.[1];
  expect(eventId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);

  releaseResponse();
  await expect.poll(async () => (await leadCalls(page)).length).toBe(1);
  const call = (await leadCalls(page))[0];
  expect(call[2]).toEqual({
    content_name: "homepage_preview",
    form_path: "/",
    lang: "en",
  });
  expect(call[3]).toEqual({ eventID: eventId });
});

test("does not send Lead when the server rejects the form", async ({ page }) => {
  await page.route("**/api/contact", (route) =>
    route.fulfill({ status: 502, contentType: "application/json", body: '{"error":"temporarily unavailable"}' }),
  );
  await page.goto("/");
  await waitForBoot(page);
  await enableAdsOnly(page);
  const form = await enterLead(page);
  await form.locator('button[type="submit"]').click();
  await expect(form.locator(".form__msg")).toContainText("temporarily unavailable");
  expect(await leadCalls(page)).toHaveLength(0);
});

test("revokes Meta consent and stops later Lead events after ads consent is withdrawn", async ({ page }) => {
  await page.route("**/api/contact", (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }),
  );
  await page.goto("/");
  await waitForBoot(page);
  await enableAdsOnly(page);
  const form = await enterLead(page);
  await form.locator('input[name="name"]').click();
  await expect.poll(() => page.evaluate(() =>
    (window.__metaCalls || []).some((args) => args[0] === "init"),
  )).toBe(true);

  await page.evaluate(() => {
    document.cookie = "kinexis_consent=v1%7Ca%3D0%7Cd%3D0; Path=/; SameSite=Lax";
    window.dispatchEvent(new Event("kinexis:consent"));
  });

  await form.locator('button[type="submit"]').click();
  await expect(form).toHaveClass(/is-done/);
  expect(await leadCalls(page)).toHaveLength(0);
  expect((await page.evaluate(() => window.__metaCalls || [])).some((args) =>
    args[0] === "consent" && args[1] === "revoke",
  )).toBe(true);
});
