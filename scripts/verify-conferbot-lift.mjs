/**
 * Prove the shadow-DOM launcher lift at 390×844 (and desktop unchanged).
 * Against live CDN widget + injected positioner matching ConferbotWidget.tsx.
 * Set BASE_URL=http://127.0.0.1:3000 to hit a local build with the real component
 * (then set INJECT_LIFT=0 so the page's own positioner runs).
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL || "https://www.kinexisdigital.com";
const INJECT = process.env.INJECT_LIFT !== "0";
const ART = "/opt/cursor/artifacts";
mkdirSync(ART, { recursive: true });

/** Mirrors startLauncherPositioner apply() in ConferbotWidget.tsx */
const POSITIONER = () => {
  const MOBILE_MQ = "(max-width: 860px)";
  const HOST_SEL = "conferbot-widget";
  const STYLE_ID = "kx-chat-lift";
  const HOST_CLASS = "kx-chat-lift";
  const GAP = 12;
  const CTA_EXTRA = 62;
  const PANEL_EXTRA = 58;

  const clearInlineLift = (root) => {
    if (!root) return;
    root
      .querySelectorAll(
        "#open-chatbot.chatbot__icon, .chatbot__icon, .chatbot__icon__cta, #chat-cta, .live_chat__chat__screen",
      )
      .forEach((node) => {
        node.style.removeProperty("bottom");
        node.style.removeProperty("inset");
      });
  };

  const apply = () => {
    const host = document.querySelector(HOST_SEL);
    if (!host?.shadowRoot) return false;
    const mobile = window.matchMedia(MOBILE_MQ).matches;
    if (!mobile) {
      host.classList.remove(HOST_CLASS);
      host.removeAttribute("data-cb-own-m-bottom");
      host.style.removeProperty("--kx-chat-bottom");
      host.style.removeProperty("--cb-o-m-bottom");
      host.shadowRoot.getElementById(STYLE_ID)?.remove();
      clearInlineLift(host.shadowRoot);
      return true;
    }
    const html = document.documentElement;
    const floatHidden =
      html.classList.contains("no-float") || html.classList.contains("consent-open");
    const float = document.querySelector(".float-cta");
    const fr = float?.getBoundingClientRect();
    const floatVisible =
      float &&
      !floatHidden &&
      float.classList.contains("is-in") &&
      fr &&
      fr.height > 1 &&
      fr.top < window.innerHeight &&
      fr.bottom > 0 &&
      getComputedStyle(float).display !== "none";
    let bottomPx;
    if (floatVisible) {
      bottomPx = Math.max(GAP, Math.round(window.innerHeight - fr.top + GAP));
    } else {
      bottomPx = GAP + 16;
    }
    const bottom = `${bottomPx}px`;
    host.classList.add(HOST_CLASS);
    host.style.setProperty("--kx-chat-bottom", bottom);
    host.setAttribute("data-cb-own-m-bottom", "");
    host.style.setProperty("--cb-o-m-bottom", bottom);
    let styleEl = host.shadowRoot.getElementById(STYLE_ID);
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = STYLE_ID;
      host.shadowRoot.appendChild(styleEl);
    }
    styleEl.textContent = `
@media (max-width: 860px) {
:host(.${HOST_CLASS}) .chatbot__icon{bottom:var(--kx-chat-bottom)!important}
:host(.${HOST_CLASS}) .chatbot__icon__cta,:host(.${HOST_CLASS}) #chat-cta{bottom:calc(var(--kx-chat-bottom) + ${CTA_EXTRA}px)!important}
:host(.${HOST_CLASS}) .live_chat__chat__screen.show__chat{bottom:calc(var(--kx-chat-bottom) + ${PANEL_EXTRA}px)!important}
}
`;
    clearInlineLift(host.shadowRoot);
    return { bottomPx, floatVisible: Boolean(floatVisible) };
  };
  return apply();
};

async function settlePage(page, { scrollForFloat }) {
  // Force-dismiss consent (cookie may already be set; React can still flash open)
  await page.evaluate(() => {
    document.cookie = "kinexis_consent=" + encodeURIComponent("v1|a=0|d=0") + "; Path=/; Max-Age=15552000; SameSite=Lax";
    document.documentElement.classList.remove("consent-open");
    window.dispatchEvent(new Event("kinexis:consent"));
    const banner = document.querySelector(".consent-banner, [data-consent], dialog.consent");
    if (banner instanceof HTMLElement) banner.style.display = "none";
  });
  await page.waitForTimeout(300);

  await page.evaluate(() => {
    window.dispatchEvent(new Event("scroll", { bubbles: true }));
    window.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
  });

  for (let i = 0; i < 50; i++) {
    const ok = await page.evaluate(
      () => Boolean(document.querySelector("conferbot-widget")?.shadowRoot?.querySelector(".chatbot__icon")),
    );
    if (ok) break;
    await page.waitForTimeout(400);
  }

  if (scrollForFloat) {
    // Past hero so boot.js adds .float-cta.is-in
    await page.evaluate(() => window.scrollTo(0, Math.min(900, document.body.scrollHeight * 0.35)));
    await page.waitForTimeout(600);
    for (let i = 0; i < 20; i++) {
      const shown = await page.evaluate(() =>
        document.querySelector(".float-cta")?.classList.contains("is-in"),
      );
      if (shown) break;
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(300);
    }
  }
}

function measure(page) {
  return page.evaluate(() => {
    const host = document.querySelector("conferbot-widget");
    const icon = host?.shadowRoot?.querySelector(".chatbot__icon");
    const float = document.querySelector(".float-cta");
    const ir = icon?.getBoundingClientRect();
    const fr = float?.getBoundingClientRect();
    return {
      iconBottomCss: icon ? getComputedStyle(icon).bottom : null,
      iconTop: ir?.top ?? null,
      iconBottom: ir?.bottom ?? null,
      floatTop: fr?.top ?? null,
      floatHeight: fr?.height ?? null,
      floatIsIn: float?.classList.contains("is-in") ?? false,
      gap: ir && fr && fr.height > 0 && float.classList.contains("is-in") ? fr.top - ir.bottom : null,
      hostClass: host?.className ?? null,
      hasStyle: Boolean(host?.shadowRoot?.getElementById("kx-chat-lift")),
      ownAttr: host?.hasAttribute("data-cb-own-m-bottom") ?? false,
      consentOpen: document.documentElement.classList.contains("consent-open"),
      viewport: { w: window.innerWidth, h: window.innerHeight },
    };
  });
}

const browser = await chromium.launch({ headless: true });

async function run(viewport, label, { injectLift, scrollForFloat }) {
  const context = await browser.newContext({
    viewport,
    isMobile: viewport.width <= 500,
    hasTouch: viewport.width <= 500,
    // Avoid HeadlessChrome / Playwright tokens — Conferbot refuses to mount for those UAs.
    userAgent:
      viewport.width <= 500
        ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
        : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  });
  await context.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => false });
  });
  // Reject non-essential before first paint (raw v1|…; page parseConsentCookie decodes)
  const host = new URL(BASE).hostname;
  await context.addCookies([
    {
      name: "kinexis_consent",
      value: "v1|a=0|d=0",
      domain: host.startsWith("www.") ? host.slice(4) : host,
      path: "/",
    },
    {
      name: "kinexis_consent",
      value: "v1|a=0|d=0",
      domain: host,
      path: "/",
    },
  ]);
  const page = await context.newPage();
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded", timeout: 60_000 });
  await settlePage(page, { scrollForFloat });

  const mounted = await page.evaluate(
    () => Boolean(document.querySelector("conferbot-widget")?.shadowRoot?.querySelector(".chatbot__icon")),
  );
  if (!mounted) {
    console.error(label, "widget did not mount");
    await context.close();
    return null;
  }

  if (injectLift) {
    await page.evaluate(POSITIONER);
    await page.waitForTimeout(150);
    await page.evaluate(POSITIONER);
  } else {
    // Give the page positioner a beat after scroll
    await page.waitForTimeout(400);
  }

  const m = await measure(page);
  const shot = `${ART}/conferbot-lift-${label}.png`;
  await page.screenshot({ path: shot, fullPage: false });
  console.log(JSON.stringify({ label, injectLift, measure: m, shot }, null, 2));
  await context.close();
  return m;
}

const before = await run(
  { width: 390, height: 844 },
  "mobile-before",
  { injectLift: false, scrollForFloat: true },
);
const after = await run(
  { width: 390, height: 844 },
  "mobile-after",
  { injectLift: INJECT, scrollForFloat: true },
);
const desktop = await run(
  { width: 1280, height: 800 },
  "desktop",
  { injectLift: INJECT, scrollForFloat: false },
);

await browser.close();

if (!after || after.gap == null || after.gap < 8) {
  console.error("FAIL: mobile gap after lift too small", after);
  process.exit(1);
}
if (Math.abs(after.gap - 12) > 6) {
  console.warn("WARN: gap not ~12px", after.gap);
}
if (desktop?.ownAttr) {
  console.error("FAIL: desktop should clear own-m-bottom", desktop);
  process.exit(1);
}
console.log("PASS", {
  beforeGap: before?.gap,
  afterGap: after.gap,
  afterBottom: after.iconBottomCss,
  desktopBottom: desktop?.iconBottomCss,
  desktopOwnAttr: desktop?.ownAttr,
});
