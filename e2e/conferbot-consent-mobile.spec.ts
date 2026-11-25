import { expect, test, type Page } from "@playwright/test";

/**
 * Mobile chrome around Conferbot + cookie consent.
 *
 * Public widget flag stays off in CI/`npm run dev`, so these tests inject a
 * mock `<conferbot-widget>` open-shadow host that mirrors production markup
 * (launcher + optional greeting CTA). Site CSS hides the host while
 * `html.consent-open`. Proactive mobile greeting itself is disabled in the
 * Conferbot dashboard — not via site code — so the post-dismiss mock omits
 * the greeting node and asserts it stays absent.
 */

async function mountMockConferbot(
  page: Page,
  opts: { withGreeting: boolean },
) {
  return page.evaluate((withGreeting) => {
    document.querySelectorAll("conferbot-widget").forEach((el) => el.remove());
    const host = document.createElement("conferbot-widget");
    const shadow = host.attachShadow({ mode: "open" });
    const icon = document.createElement("button");
    icon.id = "open-chatbot";
    icon.className = "chatbot__icon";
    icon.type = "button";
    icon.textContent = "Chat";
    icon.setAttribute("aria-label", "Open chat");
    icon.style.cssText =
      "position:fixed;bottom:20px;right:20px;width:56px;height:56px;z-index:50";
    shadow.appendChild(icon);
    if (withGreeting) {
      const cta = document.createElement("div");
      cta.id = "chat-cta";
      cta.className = "chatbot__icon__cta";
      cta.textContent = "Hi! Need a website that brings in calls?";
      cta.style.cssText =
        "position:fixed;bottom:84px;right:20px;z-index:50;padding:10px 12px;background:#fff";
      shadow.appendChild(cta);
    }
    // Conferbot inserts its custom element after <body>; keeping the fixture
    // outside React's hydrated subtree prevents consent rerenders from
    // reconciling away the externally mounted widget.
    document.body.insertAdjacentElement("afterend", host);
    return Boolean(host.shadowRoot?.querySelector("#open-chatbot"));
  }, opts.withGreeting);
}

function widgetVisibility(page: Page) {
  return page.evaluate(() => {
    const host = document.querySelector("conferbot-widget") as HTMLElement | null;
    if (!host?.shadowRoot) {
      return {
        hostPresent: Boolean(host),
        hostDisplayed: false,
        consentOpen: document.documentElement.classList.contains("consent-open"),
        launcherVisible: false,
        greetingPresent: false,
        greetingVisible: false,
      };
    }
    const icon = host.shadowRoot.querySelector(
      "#open-chatbot.chatbot__icon, .chatbot__icon",
    ) as HTMLElement | null;
    const greeting = host.shadowRoot.querySelector(
      ".chatbot__icon__cta, #chat-cta, #chatbot__icon__cta",
    ) as HTMLElement | null;
    const hostCs = getComputedStyle(host);
    const hostDisplayed =
      hostCs.display !== "none" &&
      hostCs.visibility !== "hidden" &&
      hostCs.opacity !== "0";
    const iconCs = icon ? getComputedStyle(icon) : null;
    const greetingCs = greeting ? getComputedStyle(greeting) : null;
    return {
      hostPresent: true,
      hostDisplayed,
      consentOpen: document.documentElement.classList.contains("consent-open"),
      launcherVisible: Boolean(
        icon &&
          hostDisplayed &&
          iconCs &&
          iconCs.display !== "none" &&
          iconCs.visibility !== "hidden",
      ),
      greetingPresent: Boolean(greeting),
      greetingVisible: Boolean(
        greeting &&
          hostDisplayed &&
          greetingCs &&
          greetingCs.display !== "none" &&
          greetingCs.visibility !== "hidden" &&
          Number.parseFloat(greetingCs.opacity || "0") > 0.05,
      ),
    };
  });
}

async function waitForConferbotClient(page: Page) {
  await expect
    .poll(
      () =>
        page.evaluate(
          () =>
            typeof (window as Window & { __kxStartLauncherPositioner?: () => void })
              .__kxStartLauncherPositioner === "function",
        ),
      { timeout: 20_000 },
    )
    .toBe(true);
}

test.describe("Conferbot + cookie consent (mobile)", () => {
  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "mobile project only");
  });

  test("no chat while banner open; after dismiss launcher only (no greeting)", async ({
    page,
    context,
  }) => {
    await context.clearCookies();
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator(".consent-banner")).toBeVisible({ timeout: 15_000 });
    await expect
      .poll(async () => page.evaluate(() => document.documentElement.classList.contains("consent-open")), {
        timeout: 10_000,
      })
      .toBe(true);

    // Wait for deferred client code/hydration before inserting an external
    // widget host, so React cannot replace the test fixture during consent.
    await waitForConferbotClient(page);
    expect(await mountMockConferbot(page, { withGreeting: true })).toBe(true);
    await expect
      .poll(async () => widgetVisibility(page), { timeout: 10_000 })
      .toMatchObject({
        hostPresent: true,
        consentOpen: true,
        hostDisplayed: false,
        launcherVisible: false,
        greetingVisible: false,
      });

    await page.locator(".consent-banner").getByRole("button", { name: /^Reject$/i }).click();
    await expect(page.locator(".consent-banner")).toHaveCount(0, { timeout: 15_000 });
    // Cookie chip and chat launcher both wait for the sticky CTA band.
    await expect(page.locator("[data-consent-fab]")).toHaveCSS("visibility", "hidden");
    await expect
      .poll(async () => page.evaluate(() => document.documentElement.classList.contains("consent-open")), {
        timeout: 10_000,
      })
      .toBe(false);

    // Dashboard turns mobile proactive greeting off — expected host has launcher only.
    expect(await mountMockConferbot(page, { withGreeting: false })).toBe(true);
    await expect
      .poll(async () => widgetVisibility(page), { timeout: 10_000 })
      .toMatchObject({
        hostPresent: true,
        consentOpen: false,
        hostDisplayed: true,
        launcherVisible: false,
        greetingPresent: false,
        greetingVisible: false,
      });

    // Mid-page: boot.js brings the sticky CTA in, and the launcher with it.
    await page.evaluate(() => window.scrollTo({ top: 2500, behavior: "instant" }));
    await expect(page.locator("html")).toHaveClass(/sticky-chrome-in/, { timeout: 15_000 });
    await expect(page.getByRole("button", { name: /Cookie preferences/i })).toBeVisible();
    await expect
      .poll(async () => widgetVisibility(page), { timeout: 10_000 })
      .toMatchObject({
        hostPresent: true,
        consentOpen: false,
        hostDisplayed: true,
        launcherVisible: true,
        greetingPresent: false,
        greetingVisible: false,
      });
  });
});
