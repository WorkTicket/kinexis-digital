import { expect, test, type Page } from "@playwright/test";

/**
 * Conferbot launcher sticky-bar lift must recalculate across breakpoint
 * changes. CI keeps NEXT_PUBLIC_CONFERBOT_ENABLED off, so tests inject a mock
 * open-shadow host and arm the real page positioner via
 * `window.__kxStartLauncherPositioner` (exposed by public/assets/js/conferbot.js).
 */

const MOBILE = { width: 390, height: 844 };
const DESKTOP = { width: 1280, height: 800 };

async function seedConsentRejected(
  context: import("@playwright/test").BrowserContext,
  page: Page,
) {
  await context.addCookies([
    {
      name: "kinexis_consent",
      value: "v1|a=0|d=0",
      url: new URL(page.url()).origin,
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
  // conferbot.js (lazyOnload) assigns the arm hook even when chat flag is off in CI.
  await expect
    .poll(
      async () =>
        page.evaluate(() =>
          typeof (window as Window & { __kxStartLauncherPositioner?: () => void })
            .__kxStartLauncherPositioner === "function",
        ),
      { timeout: 20_000 },
    )
    .toBe(true);

  const mounted = await page.evaluate(() => {
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
  await expect
    .poll(
      () =>
        page.evaluate(() =>
          Boolean(
            document
              .querySelector("conferbot-widget")
              ?.shadowRoot?.getElementById("kx-chat-visibility") &&
              document
                .querySelector("conferbot-widget")
                ?.classList.contains("kx-chat-visibility-ready"),
          ),
        ),
      { timeout: 10_000 },
    )
    .toBe(true);
  return mounted;
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
  stickyChromeIn: boolean;
  cookieOpacity: number;
  cookieVisibility: string;
  cookiePointerEvents: string;
  launcherOpacity: number | null;
  launcherVisible: boolean;
};

function liftSnapshot(page: Page): Promise<LiftSnapshot> {
  return page.evaluate(() => {
    const host = document.querySelector("conferbot-widget") as HTMLElement | null;
    const icon = host?.shadowRoot?.querySelector(
      "#open-chatbot.chatbot__icon, .chatbot__icon",
    ) as HTMLElement | null;
    const float = document.querySelector(".float-cta") as HTMLElement | null;
    const cookie = document.querySelector(".consent-fab") as HTMLElement | null;
    const ir = icon?.getBoundingClientRect();
    const fr = float?.getBoundingClientRect();
    const hostCs = host ? getComputedStyle(host) : null;
    const iconCs = icon ? getComputedStyle(icon) : null;
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
      stickyChromeIn: document.documentElement.classList.contains("sticky-chrome-in"),
      cookieOpacity: cookie ? Number.parseFloat(getComputedStyle(cookie).opacity) : 0,
      cookieVisibility: cookie ? getComputedStyle(cookie).visibility : "missing",
      cookiePointerEvents: cookie ? getComputedStyle(cookie).pointerEvents : "missing",
      launcherOpacity: iconCs ? Number.parseFloat(iconCs.opacity) : null,
      launcherVisible: Boolean(
        iconCs &&
          iconCs.visibility !== "hidden" &&
          Number.parseFloat(iconCs.opacity) > 0.5,
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
    await page.setViewportSize(MOBILE);
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await seedConsentRejected(context, page);
    await page.reload({ waitUntil: "domcontentloaded" });
    await ensureConsentClosed(page);

    expect(await mountMockConferbot(page)).toBe(true);
    const chromeBeforeSticky = await liftSnapshot(page);
    expect(chromeBeforeSticky.stickyChromeIn).toBe(false);
    expect(chromeBeforeSticky.cookieOpacity).toBe(0);
    expect(chromeBeforeSticky.cookieVisibility).toBe("hidden");
    expect(chromeBeforeSticky.cookiePointerEvents).toBe("none");
    expect(chromeBeforeSticky.launcherVisible).toBe(false);
    await showStickyBar(page);

    await expect
      .poll(async () => liftSnapshot(page), { timeout: 15_000 })
      .toMatchObject({
        mobileMq: true,
        lifted: true,
        consentOpen: false,
        hostDisplayed: true,
        stickyChromeIn: true,
        cookieOpacity: 0.82,
        cookieVisibility: "visible",
        cookiePointerEvents: "auto",
        launcherOpacity: 1,
        launcherVisible: true,
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

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect
      .poll(async () => liftSnapshot(page), { timeout: 10_000 })
      .toMatchObject({
        stickyChromeIn: false,
        cookieOpacity: 0,
        cookieVisibility: "hidden",
        cookiePointerEvents: "none",
        launcherVisible: false,
      });
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

/**
 * Real Conferbot timing (observed against cdn.conferbot.com/dist/v1/widget.min.js):
 * <conferbot-widget> is inserted *after* <body> with no shadow root, the open
 * shadow root is attached ~1s later, and its first render paints the launcher
 * at opacity 1 before page JS can style it. This mock mirrors that sequence.
 */
async function mountLateConferbot(page: Page, shadowDelayMs = 250) {
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
  const firstPaint = await page.evaluate(async (delay) => {
    document.querySelectorAll("conferbot-widget").forEach((el) => el.remove());
    const host = document.createElement("conferbot-widget");
    document.body.insertAdjacentElement("afterend", host);
    await new Promise((r) => setTimeout(r, delay));
    const shadow = host.attachShadow({ mode: "open" });
    // Conferbot's own launcher sheet (transition on transform only).
    const sheet = document.createElement("style");
    sheet.textContent = ".chatbot__icon{transition:transform .2s ease-out}";
    shadow.appendChild(sheet);
    const icon = document.createElement("div");
    icon.id = "open-chatbot";
    icon.className = "chatbot__icon cb-shape--bubble";
    icon.setAttribute("role", "button");
    icon.setAttribute("aria-label", "Open chat");
    icon.style.cssText =
      "position:fixed;bottom:20px;right:26px;width:50px;height:50px;z-index:9999;background:#0B3DFF;border-radius:30px";
    shadow.appendChild(icon);
    // Same task as Conferbot's first render: nothing from conferbot.js has run.
    // Conferbot measures its launcher here, so its style resolves at opacity 1.
    return {
      iconOpacity: getComputedStyle(icon).opacity,
      hostOpacity: getComputedStyle(host).opacity,
      hostPointerEvents: getComputedStyle(host).pointerEvents,
      ready: host.classList.contains("kx-chat-visibility-ready"),
    };
  }, shadowDelayMs);
  await expect
    .poll(
      () =>
        page.evaluate(() => {
          const host = document.querySelector("conferbot-widget");
          return Boolean(
            host?.shadowRoot?.getElementById("kx-chat-visibility") &&
              host.classList.contains("kx-chat-visibility-ready"),
          );
        }),
      { timeout: 10_000 },
    )
    .toBe(true);
  return firstPaint;
}

type LauncherFrame = {
  t: number;
  cta: number;
  op: number;
  vis: string;
  host: number;
  bottom: string;
};
type LauncherRecording = {
  frames: LauncherFrame[];
  transitions: string[];
};

/** Per-frame recorder of the launcher vs the sticky CTA, plus transition events. */
async function startRecording(page: Page) {
  await page.evaluate(() => {
    const w = window as Window & {
      __kxRec?: { frames: unknown[]; transitions: string[]; stop: boolean };
    };
    const rec = { frames: [] as unknown[], transitions: [] as string[], stop: false };
    w.__kxRec = rec;
    const host = document.querySelector("conferbot-widget") as HTMLElement;
    const sr = host.shadowRoot!;
    const onRun = (e: Event) => {
      const te = e as TransitionEvent;
      const target = te.composedPath()[0] as HTMLElement;
      if (target?.id === "open-chatbot") rec.transitions.push(te.propertyName);
    };
    sr.addEventListener("transitionrun", onRun, true);
    const t0 = performance.now();
    const tick = () => {
      if (rec.stop) {
        sr.removeEventListener("transitionrun", onRun, true);
        return;
      }
      const icon = sr.getElementById("open-chatbot");
      const float = document.querySelector(".float-cta");
      const ics = icon ? getComputedStyle(icon) : null;
      rec.frames.push({
        t: Math.round(performance.now() - t0),
        cta: float ? Number.parseFloat(getComputedStyle(float).opacity) : 0,
        op: ics ? Number.parseFloat(ics.opacity) : 0,
        vis: ics ? ics.visibility : "missing",
        host: Number.parseFloat(getComputedStyle(host).opacity),
        bottom: host.style.getPropertyValue("--kx-chat-bottom").trim(),
      });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

async function stopRecording(page: Page): Promise<LauncherRecording> {
  return page.evaluate(() => {
    const w = window as Window & {
      __kxRec?: { frames: LauncherFrame[]; transitions: string[]; stop: boolean };
    };
    const rec = w.__kxRec!;
    rec.stop = true;
    return { frames: rec.frames, transitions: rec.transitions };
  });
}

async function hideStickyBar(page: Page) {
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect
    .poll(
      () =>
        page.evaluate(() => {
          const float = document.querySelector(".float-cta");
          return (
            !document.documentElement.classList.contains("sticky-chrome-in") &&
            !float?.classList.contains("is-in") &&
            Number.parseFloat(getComputedStyle(float!).opacity) === 0
          );
        }),
      { timeout: 15_000 },
    )
    .toBe(true);
}

const settled = (page: Page) =>
  expect
    .poll(
      () =>
        page.evaluate(() => {
          const icon = document
            .querySelector("conferbot-widget")
            ?.shadowRoot?.getElementById("open-chatbot");
          return icon ? icon.getAnimations().length : -1;
        }),
      { timeout: 5_000 },
    )
    .toBe(0);

/** First frame index (ms) where a series crosses a threshold. */
function firstFrame(frames: LauncherFrame[], pick: (f: LauncherFrame) => boolean) {
  return frames.find(pick)?.t ?? Number.POSITIVE_INFINITY;
}

/** Launcher enter/exit must be a real transition that tracks the CTA. */
function expectAnimatedWithCta(rec: LauncherRecording, dir: "in" | "out") {
  expect(rec.transitions).toContain("opacity");
  expect(rec.transitions).toContain("transform");
  const between = rec.frames.filter((f) => f.op > 0.05 && f.op < 0.95);
  expect(between.length, "launcher should pass through intermediate opacity").toBeGreaterThanOrEqual(4);
  const ctaMoves = firstFrame(rec.frames, (f) => (dir === "in" ? f.cta > 0.02 : f.cta < 0.98));
  const launcherMoves = firstFrame(rec.frames, (f) => (dir === "in" ? f.op > 0.02 : f.op < 0.98));
  expect(Number.isFinite(ctaMoves) && Number.isFinite(launcherMoves)).toBe(true);
  // Same 0.5s ease as the CTA; allow one frame of skew either way.
  expect(Math.abs(launcherMoves - ctaMoves)).toBeLessThanOrEqual(34);
  // Never visible while the host gate is still closed, never at full opacity
  // before it has faded in (that was the "snap").
  if (dir === "in") {
    const firstShown = rec.frames.find((f) => f.op > 0.02 && f.host > 0);
    expect(firstShown?.op ?? 1).toBeLessThan(0.5);
  }
}

/**
 * Scroll to mid-page so boot.js itself shows the CTA (past the hero, footer not
 * covering). Forcing .is-in and jumping to the page end races boot's footer
 * check, which hides the bar again.
 */
async function revealStickyCta(page: Page) {
  await page.evaluate(() => window.scrollTo({ top: 2500, behavior: "instant" }));
  await expect
    .poll(
      () =>
        page.evaluate(() => {
          const float = document.querySelector(".float-cta");
          return Boolean(
            document.documentElement.classList.contains("sticky-chrome-in") &&
              float?.classList.contains("is-in") &&
              Number.parseFloat(getComputedStyle(float).opacity) > 0.5,
          );
        }),
      { timeout: 15_000 },
    )
    .toBe(true);
}

test.describe("Conferbot launcher enters and leaves with the sticky CTA", () => {
  test.beforeEach(async ({ page, context }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "chromium project only");
    await context.clearCookies();
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await seedConsentRejected(context, page);
  });

  for (const [label, viewport] of [
    ["desktop", DESKTOP],
    ["mobile", MOBILE],
  ] as const) {
    test(`${label}: starts hidden behind the host gate, then fades in and out with the CTA`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.reload({ waitUntil: "domcontentloaded" });
      await ensureConsentClosed(page);

      const firstPaint = await mountLateConferbot(page);
      // Conferbot's first render (launcher opacity 1) is behind the light-DOM gate.
      expect(firstPaint).toEqual({
        iconOpacity: "1",
        hostOpacity: "0",
        hostPointerEvents: "none",
        ready: false,
      });

      const before = await liftSnapshot(page);
      expect(before.stickyChromeIn).toBe(false);
      expect(before.hostDisplayed).toBe(true);
      expect(before.launcherVisible).toBe(false);
      expect(before.launcherOpacity).toBe(0);

      await settled(page);
      await startRecording(page);
      await revealStickyCta(page);
      await expect
        .poll(async () => liftSnapshot(page), { timeout: 10_000 })
        .toMatchObject({ stickyChromeIn: true, launcherVisible: true, launcherOpacity: 1 });
      await settled(page);
      const enter = await stopRecording(page);
      expectAnimatedWithCta(enter, "in");

      const shown = await liftSnapshot(page);
      expect(shown.lifted).toBe(label === "mobile");
      if (label === "mobile") {
        expect(Number.parseFloat(shown.cssBottom)).toBeGreaterThan(80);
        if (shown.gap != null) expect(shown.gap).toBeGreaterThanOrEqual(8);
        // Lifted to the CTA's resting height from the first visible frame.
        const enterBottoms = new Set(enter.frames.filter((f) => f.op > 0.02).map((f) => f.bottom));
        expect([...enterBottoms]).toEqual([shown.cssBottom]);
      }

      await startRecording(page);
      await hideStickyBar(page);
      await expect
        .poll(async () => liftSnapshot(page), { timeout: 10_000 })
        .toMatchObject({ stickyChromeIn: false, launcherVisible: false, launcherOpacity: 0 });
      await settled(page);
      const exit = await stopRecording(page);
      expectAnimatedWithCta(exit, "out");
      expect(exit.frames.at(-1)?.vis).toBe("hidden");
      if (label === "mobile") {
        // Stays lifted while fading out instead of dropping onto the page first.
        const fading = exit.frames.filter((f) => f.op > 0.02 && f.op < 0.98);
        expect(new Set(fading.map((f) => f.bottom))).toEqual(new Set([shown.cssBottom]));
      }
    });
  }

  test("widget that mounts after the CTA is already in fades in instead of snapping", async ({
    page,
  }) => {
    await page.setViewportSize(MOBILE);
    await page.reload({ waitUntil: "domcontentloaded" });
    await ensureConsentClosed(page);
    await revealStickyCta(page);
    await expect(page.locator("html")).toHaveClass(/sticky-chrome-in/);

    // Record from before the host exists (first-input scroll loads Conferbot late).
    await page.evaluate(() => {
      document.querySelectorAll("conferbot-widget").forEach((el) => el.remove());
    });
    const recorder = page.evaluate(() => {
      const frames: { op: number; host: number; vis: string; ty: number }[] = [];
      return new Promise<typeof frames>((resolve) => {
        const t0 = performance.now();
        const tick = () => {
          const host = document.querySelector("conferbot-widget") as HTMLElement | null;
          const icon = host?.shadowRoot?.getElementById("open-chatbot");
          if (host && icon) {
            const cs = getComputedStyle(icon);
            frames.push({
              op: Number.parseFloat(cs.opacity),
              host: Number.parseFloat(getComputedStyle(host).opacity),
              vis: cs.visibility,
              ty: cs.transform === "none" ? 0 : new DOMMatrixReadOnly(cs.transform).m42,
            });
          }
          if (performance.now() - t0 < 2500) requestAnimationFrame(tick);
          else resolve(frames);
        };
        requestAnimationFrame(tick);
      });
    });
    const firstPaint = await mountLateConferbot(page, 400);
    expect(firstPaint.hostOpacity).toBe("0");
    const frames = await recorder;

    const painted = frames.filter((f) => f.host > 0 && f.vis !== "hidden");
    expect(painted.length).toBeGreaterThan(5);
    // First frame the user can see is the start of the fade, not opacity 1.
    expect(painted[0].op).toBeLessThan(0.5);
    expect(painted.filter((f) => f.op > 0.05 && f.op < 0.95).length).toBeGreaterThanOrEqual(4);
    expect(painted.at(-1)?.op).toBe(1);
    // It rises into place too (translateY 18px → 0), not just a fade at rest.
    expect(painted[0].ty).toBeGreaterThan(9);
    expect(painted.filter((f) => f.ty > 1 && f.ty < 17).length).toBeGreaterThanOrEqual(4);
    expect(painted.at(-1)?.ty).toBe(0);
    // Never shown at full opacity while the gate was closed and then re-hidden.
    const gatedFull = frames.findIndex((f) => f.host === 0);
    const lastGated = frames.map((f) => f.host).lastIndexOf(0);
    expect(gatedFull === -1 || lastGated < frames.indexOf(painted[0])).toBe(true);
  });

  test("resize while the CTA is in keeps the launcher shown without re-animating", async ({
    page,
  }) => {
    await page.setViewportSize(MOBILE);
    await page.reload({ waitUntil: "domcontentloaded" });
    await ensureConsentClosed(page);
    await mountLateConferbot(page);
    await revealStickyCta(page);
    await expect
      .poll(async () => liftSnapshot(page), { timeout: 10_000 })
      .toMatchObject({ launcherVisible: true, launcherOpacity: 1, lifted: true });
    await settled(page);

    await startRecording(page);
    await page.setViewportSize(DESKTOP);
    await expect
      .poll(async () => liftSnapshot(page), { timeout: 10_000 })
      .toMatchObject({ mobileMq: false, lifted: false, launcherVisible: true, launcherOpacity: 1 });
    await page.setViewportSize(MOBILE);
    await revealStickyCta(page);
    await expect
      .poll(async () => liftSnapshot(page), { timeout: 10_000 })
      .toMatchObject({ mobileMq: true, lifted: true, launcherVisible: true, launcherOpacity: 1 });
    const resized = await stopRecording(page);
    // No fade-out/fade-in blink across the breakpoint.
    expect(resized.transitions).not.toContain("opacity");
    expect(Math.min(...resized.frames.map((f) => f.op))).toBe(1);
    const back = await liftSnapshot(page);
    expect(Number.parseFloat(back.cssBottom)).toBeGreaterThan(80);
    if (back.gap != null) expect(back.gap).toBeGreaterThanOrEqual(8);
  });

  test("reduced motion: launcher follows the CTA without transitions", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize(MOBILE);
    await page.reload({ waitUntil: "domcontentloaded" });
    await ensureConsentClosed(page);
    await mountLateConferbot(page);
    expect((await liftSnapshot(page)).launcherVisible).toBe(false);

    await startRecording(page);
    await revealStickyCta(page);
    await expect
      .poll(async () => liftSnapshot(page), { timeout: 10_000 })
      .toMatchObject({ launcherVisible: true, launcherOpacity: 1 });
    await hideStickyBar(page);
    await expect
      .poll(async () => liftSnapshot(page), { timeout: 10_000 })
      .toMatchObject({ launcherVisible: false, launcherOpacity: 0 });
    const rec = await stopRecording(page);
    expect(rec.transitions).toEqual([]);
    expect(rec.frames.filter((f) => f.op > 0.05 && f.op < 0.95)).toEqual([]);
  });
});
