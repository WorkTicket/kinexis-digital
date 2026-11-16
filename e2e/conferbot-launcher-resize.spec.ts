import { expect, test, type Page } from "@playwright/test";

/**
 * Conferbot launcher sticky-bar lift must recalculate across breakpoint
 * changes. CI keeps NEXT_PUBLIC_CONFERBOT_ENABLED off, so tests inject a mock
 * open-shadow host and arm the real page positioner via
 * `window.__kxStartLauncherPositioner` (exposed by ConferbotWidget).
 */

const MOBILE = { width: 390, height: 844 };
const DESKTOP = { width: 1280, height: 800 };

async function seedConsentRejected(context: import("@playwright/test").BrowserContext) {
  await context.addCookies([
    {
      name: "kinexis_consent",
      value: "v1|a=0|d=0",
      domain: "localhost",
      path: "/",
    },
  ]);
}

async function ensureConsentClosed(page: Page) {
  await page.evaluate(() => {
    document.documentElement.classList.remove("consent-open");
    window.dispatchEvent(new Event("kinexis:consent"));
  });
  await expect
    .poll(
      async () =>
        page.evaluate(() =>
          document.documentElement.classList.contains("consent-open"),
        ),
      { timeout: 15_000 },
    )
    .toBe(false);
}

async function mountMockConferbot(page: Page) {
  // ConferbotWidget assigns the arm hook in useEffect (chat flag is off in CI).
  await expect
    .poll(
      async () =>
        page.evaluate(() =>
          typeof (window as Window & { __kxStartLauncherPositioner?: () => void })
            .__kxStartLauncherPositioner === "function",
        ),
      { timeout: 15_000 },
    )
    .toBe(true);

  return page.evaluate(() => {
    document.querySelectorAll("conferbot-widget").forEach((el) => el.remove());
    const host = document.createElement("conferbot-widget");
    const shadow = host.attachShadow({ mode: "open" });
    const icon = document.createElement("button");
    icon.id = "open-chatbot";
    icon.className = "chatbot__icon";
    icon.type = "button";
    icon.textContent = "Chat";
    icon.setAttribute("aria-label", "Open chat");
    // Simulate Conferbot's leftover raised inline (the bug class) so clear must
    // strip it — default resting bottom if lift never runs.
    icon.style.cssText =
      "position:fixed;bottom:20px;right:20px;width:56px;height:56px;z-index:50";
    shadow.appendChild(icon);
    document.body.appendChild(host);
    const w = window as Window & { __kxStartLauncherPositioner?: () => void };
    w.__kxStartLauncherPositioner?.();
    window.dispatchEvent(new Event("resize"));
    return Boolean(host.shadowRoot?.querySelector("#open-chatbot"));
  });
}

async function showStickyBar(page: Page) {
  await page.evaluate(() => {
    const float = document.querySelector(".float-cta");
    if (float) {
      float.classList.add("is-in");
      float.removeAttribute("inert");
    }
    window.scrollTo(0, document.body.scrollHeight);
  });
  await expect
    .poll(
      async () =>
        page.evaluate(() => {
          const float = document.querySelector(".float-cta") as HTMLElement | null;
          if (!float?.classList.contains("is-in")) return false;
          const fr = float.getBoundingClientRect();
          const cs = getComputedStyle(float);
          return (
            fr.height > 1 &&
            fr.top < window.innerHeight &&
            cs.display !== "none" &&
            Number.parseFloat(cs.opacity || "0") > 0.5
          );
        }),
      { timeout: 15_000 },
    )
    .toBe(true);
}

type LiftSnapshot = {
  width: number;
  mobileMq: boolean;
  lifted: boolean;
  hasLiftStyle: boolean;
  cssBottom: string;
  iconInlineBottom: string;
  iconComputedBottom: string;
  floatTop: number | null;
  gap: number | null;
  consentOpen: boolean;
  hostDisplayed: boolean;
};

function liftSnapshot(page: Page): Promise<LiftSnapshot> {
  return page.evaluate(() => {
    const host = document.querySelector("conferbot-widget") as HTMLElement | null;
    const icon = host?.shadowRoot?.querySelector(
      "#open-chatbot.chatbot__icon, .chatbot__icon",
    ) as HTMLElement | null;
    const float = document.querySelector(".float-cta") as HTMLElement | null;
    const ir = icon?.getBoundingClientRect();
    const fr = float?.getBoundingClientRect();
    const hostCs = host ? getComputedStyle(host) : null;
    return {
      width: window.innerWidth,
      mobileMq: window.matchMedia("(max-width: 860px)").matches,
      lifted: Boolean(host?.classList.contains("kx-chat-lift")),
      hasLiftStyle: Boolean(host?.shadowRoot?.getElementById("kx-chat-lift")),
      cssBottom: host?.style.getPropertyValue("--kx-chat-bottom").trim() || "",
      iconInlineBottom: icon?.style.getPropertyValue("bottom") || "",
      iconComputedBottom: icon ? getComputedStyle(icon).bottom : "",
      floatTop: fr ? Math.round(fr.top) : null,
      gap: ir && fr ? Math.round(fr.top - ir.bottom) : null,
      consentOpen: document.documentElement.classList.contains("consent-open"),
      hostDisplayed: Boolean(
        hostCs &&
          hostCs.display !== "none" &&
          hostCs.visibility !== "hidden",
      ),
    };
  });
}

test.describe("Conferbot launcher sticky lift across resize", () => {
  test.beforeEach(async ({}, testInfo) => {
    // Chromium project can freely resize past the 860px float-cta breakpoint.
    test.skip(testInfo.project.name !== "chromium", "chromium project only");
  });

  test("mobile→desktop→mobile: lift resets and re-applies with sticky bar", async ({
    page,
    context,
  }) => {
    await context.clearCookies();
    await seedConsentRejected(context);
    await page.setViewportSize(MOBILE);
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await ensureConsentClosed(page);

    expect(await mountMockConferbot(page)).toBe(true);
    await showStickyBar(page);

    await expect
      .poll(async () => liftSnapshot(page), { timeout: 15_000 })
      .toMatchObject({
        mobileMq: true,
        lifted: true,
        consentOpen: false,
        hostDisplayed: true,
      });

    const mobileRaised = await liftSnapshot(page);
    expect(mobileRaised.cssBottom).toMatch(/^\d+px$/);
    const raisedPx = Number.parseFloat(mobileRaised.cssBottom);
    expect(raisedPx).toBeGreaterThan(80);
    // No leftover sticky inline bottom — CSS var drives position.
    expect(mobileRaised.iconInlineBottom).toBe("");
    if (mobileRaised.gap != null) {
      expect(mobileRaised.gap).toBeGreaterThanOrEqual(8);
    }

    await page.setViewportSize(DESKTOP);
    await page.evaluate(() => window.dispatchEvent(new Event("resize")));

    await expect
      .poll(async () => liftSnapshot(page), { timeout: 15_000 })
      .toMatchObject({
        mobileMq: false,
        lifted: false,
        hasLiftStyle: false,
        cssBottom: "",
        iconInlineBottom: "",
      });

    const desktop = await liftSnapshot(page);
    // Must not keep the mobile raised bottom (the stuck-launcher bug).
    const desktopBottomPx = Number.parseFloat(desktop.iconComputedBottom);
    if (Number.isFinite(desktopBottomPx)) {
      expect(desktopBottomPx).toBeLessThan(raisedPx - 20);
    }

    // Reverse: desktop → mobile while scrolled so sticky shows — lift returns.
    await page.setViewportSize(MOBILE);
    await page.evaluate(() => window.dispatchEvent(new Event("resize")));
    await showStickyBar(page);

    await expect
      .poll(async () => liftSnapshot(page), { timeout: 15_000 })
      .toMatchObject({
        mobileMq: true,
        lifted: true,
      });

    const mobileAgain = await liftSnapshot(page);
    expect(Number.parseFloat(mobileAgain.cssBottom)).toBeGreaterThan(80);
    expect(mobileAgain.iconInlineBottom).toBe("");
  });

  test("consent-open still hides host on desktop and mobile widths", async ({
    page,
    context,
  }) => {
    await context.clearCookies();
    await page.setViewportSize(DESKTOP);
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator(".consent-banner")).toBeVisible({ timeout: 15_000 });
    await expect
      .poll(
        async () =>
          page.evaluate(() =>
            document.documentElement.classList.contains("consent-open"),
          ),
        { timeout: 10_000 },
      )
      .toBe(true);

    expect(await mountMockConferbot(page)).toBe(true);

    await expect
      .poll(async () => liftSnapshot(page), { timeout: 10_000 })
      .toMatchObject({
        consentOpen: true,
        hostDisplayed: false,
      });

    await page.setViewportSize(MOBILE);
    await page.evaluate(() => window.dispatchEvent(new Event("resize")));

    await expect
      .poll(async () => liftSnapshot(page), { timeout: 10_000 })
      .toMatchObject({
        consentOpen: true,
        hostDisplayed: false,
      });
  });
});
