/**
 * Live production debug for Conferbot launcher vs sticky float bar.
 * Spoofs webdriver + non-HeadlessChrome UA so Conferbot mounts.
 */
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const ART = "/opt/cursor/artifacts";
mkdirSync(ART, { recursive: true });

const MOBILE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
const DESKTOP_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function measureFn() {
  const host = document.querySelector("conferbot-widget");
  const sr = host?.shadowRoot;
  const icon = sr?.querySelector(".chatbot__icon, #open-chatbot");
  const float = document.querySelector(".float-cta");
  const ir = icon?.getBoundingClientRect();
  const fr = float?.getBoundingClientRect();
  const styleEl = sr?.getElementById("kx-chat-lift");
  return {
    href: location.href,
    viewport: { w: innerWidth, h: innerHeight },
    mq860: matchMedia("(max-width: 860px)").matches,
    htmlClass: document.documentElement.className,
    host: host
      ? {
          connected: host.isConnected,
          className: host.className,
          ownMBottom: host.hasAttribute("data-cb-own-m-bottom"),
          kxBottom: host.style.getPropertyValue("--kx-chat-bottom"),
          cbBottom: host.style.getPropertyValue("--cb-o-m-bottom"),
          attrs: [...host.attributes].map((a) => [a.name, a.value.slice(0, 60)]),
        }
      : null,
    shadow: {
      hasShadow: Boolean(sr),
      styleId: Boolean(styleEl),
      styleLen: styleEl?.textContent?.length ?? 0,
      stylePreview: styleEl?.textContent?.slice(0, 180) ?? null,
      childTags: sr ? [...sr.children].map((c) => c.tagName + (c.id ? "#" + c.id : "")).slice(0, 25) : [],
    },
    icon: icon
      ? {
          id: icon.id,
          className: icon.className,
          inline: icon.getAttribute("style")?.slice(0, 220),
          computedBottom: getComputedStyle(icon).bottom,
          computedRight: getComputedStyle(icon).right,
          rect: { top: ir.top, bottom: ir.bottom, left: ir.left, right: ir.right, h: ir.height, w: ir.width },
        }
      : null,
    float: float
      ? {
          className: float.className,
          isIn: float.classList.contains("is-in"),
          display: getComputedStyle(float).display,
          visibility: getComputedStyle(float).visibility,
          opacity: getComputedStyle(float).opacity,
          transform: getComputedStyle(float).transform,
          bottomCss: getComputedStyle(float).bottom,
          rect: fr
            ? { top: fr.top, bottom: fr.bottom, left: fr.left, right: fr.right, h: fr.height, w: fr.width }
            : null,
        }
      : null,
    gap:
      ir && fr && float?.classList.contains("is-in") && fr.height > 1
        ? fr.top - ir.bottom
        : null,
    neededBottom:
      fr && float?.classList.contains("is-in") && fr.height > 1
        ? Math.round(innerHeight - fr.top + 12)
        : null,
  };
}

async function prep(context) {
  await context.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => false });
  });
  await context.addCookies([
    { name: "kinexis_consent", value: "v1|a=0|d=0", domain: "kinexisdigital.com", path: "/" },
    { name: "kinexis_consent", value: "v1|a=0|d=0", domain: "www.kinexisdigital.com", path: "/" },
  ]);
}

async function dismissConsent(page) {
  await page.evaluate(() => {
    document.cookie =
      "kinexis_consent=" + encodeURIComponent("v1|a=0|d=0") + "; Path=/; Max-Age=15552000; SameSite=Lax";
    document.documentElement.classList.remove("consent-open");
    window.dispatchEvent(new Event("kinexis:consent"));
  });
}

async function waitWidget(page, ms = 20000) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    const ok = await page.evaluate(
      () => Boolean(document.querySelector("conferbot-widget")?.shadowRoot?.querySelector(".chatbot__icon")),
    );
    if (ok) return true;
    await page.waitForTimeout(400);
  }
  return false;
}

async function scrollFloatIn(page) {
  for (let i = 0; i < 25; i++) {
    const shown = await page.evaluate(() => document.querySelector(".float-cta")?.classList.contains("is-in"));
    if (shown) return true;
    await page.evaluate(() => window.scrollBy(0, 350));
    await page.waitForTimeout(250);
  }
  return false;
}

const browser = await chromium.launch({ headless: true });
const results = {};

// --- A: mobile native 390x844 on / and /es, wait 10s after float ---
for (const path of ["/", "/es"]) {
  const label = path === "/" ? "home-mobile" : "es-mobile";
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    userAgent: MOBILE_UA,
  });
  await prep(context);
  const page = await context.newPage();
  await page.goto("https://www.kinexisdigital.com" + path, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await dismissConsent(page);
  await page.evaluate(() => {
    window.dispatchEvent(new Event("scroll", { bubbles: true }));
    window.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
  });
  const mounted = await waitWidget(page);
  const floatIn = await scrollFloatIn(page);
  await page.waitForTimeout(10_000);
  const m = await page.evaluate(measureFn);
  await page.screenshot({ path: `${ART}/live-debug-${label}.png`, fullPage: false });
  results[label] = { mounted, floatIn, measure: m, shot: `${ART}/live-debug-${label}.png` };
  await context.close();
}

// --- B: load desktop then resize to 390 (DevTools pattern) ---
{
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent: DESKTOP_UA,
  });
  await prep(context);
  const page = await context.newPage();
  await page.goto("https://www.kinexisdigital.com/es", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await dismissConsent(page);
  await page.evaluate(() => {
    window.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
  });
  await waitWidget(page, 15000);
  const before = await page.evaluate(measureFn);
  await page.setViewportSize({ width: 390, height: 844 });
  // Playwright setViewportSize alone may not flip isMobile; still tests resize handlers
  await page.waitForTimeout(500);
  await scrollFloatIn(page);
  await page.waitForTimeout(10_000);
  const after = await page.evaluate(measureFn);
  await page.screenshot({ path: `${ART}/live-debug-desktop-to-390.png`, fullPage: false });
  results["desktop-to-390"] = { before, after, shot: `${ART}/live-debug-desktop-to-390.png` };
  await context.close();
}

// --- C: check if production chunk contains positioner markers ---
{
  const context = await browser.newContext({ userAgent: DESKTOP_UA });
  await prep(context);
  const page = await context.newPage();
  const chunkHits = [];
  page.on("response", async (r) => {
    const u = r.url();
    if (!/kinexisdigital\.com\/_next\/static\/chunks\/.+\.js/.test(u)) return;
    if (r.status() !== 200) return;
    try {
      const text = await r.text();
      if (/kx-chat-lift|startLauncherPositioner|data-cb-own-m-bottom|float-cta/.test(text)) {
        chunkHits.push({
          url: u.slice(0, 160),
          kx: text.includes("kx-chat-lift"),
          positioner: /startLauncherPositioner|kx-chat-lift/.test(text),
          ownM: text.includes("data-cb-own-m-bottom"),
          floatCta: text.includes("float-cta"),
        });
      }
    } catch {}
  });
  await page.goto("https://www.kinexisdigital.com/es", { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(2000);
  results.chunkHits = chunkHits;
  await context.close();
}

writeFileSync(`${ART}/live-debug-conferbot-lift.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
await browser.close();
