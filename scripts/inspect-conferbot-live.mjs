/**
 * Live inspect Conferbot launcher at 390×844.
 * Spoofs navigator.webdriver — Conferbot refuses to mount when webdriver=true.
 */
import { chromium } from "playwright";

const URL = process.env.INSPECT_URL || "https://www.kinexisdigital.com/";
const OUT = process.env.OUT || "/opt/cursor/artifacts/conferbot-live-inspect.png";

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
});
await context.addInitScript(() => {
  Object.defineProperty(navigator, "webdriver", { get: () => false });
});
const page = await context.newPage();

const responses = [];
page.on("response", (r) => {
  const u = r.url();
  if (/conferbot|wdt\./i.test(u)) responses.push([r.status(), u.slice(0, 180)]);
});

await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60_000 });
await page.waitForTimeout(1_500);

// Nudge idle/input boot path
await page.evaluate(() => {
  window.dispatchEvent(new Event("scroll", { bubbles: true }));
  window.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
});

// Wait for host up to 20s
let hostReady = false;
for (let i = 0; i < 40; i++) {
  hostReady = await page.evaluate(() => Boolean(document.querySelector("conferbot-widget")));
  if (hostReady) break;
  await page.waitForTimeout(500);
}

const info = await page.evaluate(() => {
  const host = document.querySelector("conferbot-widget");
  const float = document.querySelector(".float-cta");
  const floatRect = float?.getBoundingClientRect();
  const html = document.documentElement;
  const styles = getComputedStyle(html);
  const base = {
    hosts: document.querySelectorAll("conferbot-widget").length,
    script: Boolean(document.getElementById("conferbot-js")),
    ConferbotWidget: typeof window.ConferbotWidget,
    webdriver: navigator.webdriver,
    float: float
      ? {
          className: float.className,
          top: floatRect?.top,
          bottom: floatRect?.bottom,
          height: floatRect?.height,
          display: getComputedStyle(float).display,
          bottomCss: getComputedStyle(float).bottom,
        }
      : null,
    cssVars: {
      stickyStack: styles.getPropertyValue("--sticky-stack").trim(),
      chatLift: styles.getPropertyValue("--chat-lift").trim(),
      floatBarH: styles.getPropertyValue("--float-bar-h").trim(),
      sab: styles.getPropertyValue("--sab").trim(),
    },
    htmlClasses: html.className,
  };
  if (!host) return { ...base, host: null };

  const sr = host.shadowRoot;
  const icon = sr?.querySelector(".chatbot__icon");
  const cta = sr?.querySelector(".chatbot__icon__cta, #chat-cta");
  const panel = sr?.querySelector(".live_chat__chat__screen");
  const dump = (el) => {
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      tag: el.tagName,
      id: el.id,
      className: el.className,
      inlineStyle: el.getAttribute("style"),
      position: cs.position,
      bottom: cs.bottom,
      right: cs.right,
      zIndex: cs.zIndex,
      rect: { top: r.top, bottom: r.bottom, height: r.height, width: r.width },
    };
  };

  return {
    ...base,
    host: {
      tag: host.tagName,
      attrs: [...host.attributes].map((a) => [a.name, a.value.slice(0, 80)]),
      hasShadow: Boolean(sr),
      shadowMode: sr ? "open" : null,
      childCount: sr ? sr.children.length : 0,
    },
    icon: dump(icon),
    cta: dump(cta),
    panel: dump(panel),
    gapAboveFloat:
      icon && floatRect
        ? floatRect.top - icon.getBoundingClientRect().bottom
        : null,
  };
});

console.log(JSON.stringify({ responses: responses.slice(0, 30), info }, null, 2));

await page.screenshot({ path: OUT, fullPage: false });
console.log("screenshot", OUT);

await browser.close();
