/**
 * Fresh lossless homepage screenshots for download.
 * Desktop 1440×900 @3x, phone 390×844 @3x.
 */
import { chromium, devices } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const outDir = path.join(process.cwd(), "screenshots");
const sites = [
  {
    id: "a1",
    url: "https://a1pslandscape.com/",
    ready: "Get a Free Quote",
  },
  {
    id: "preferred-plumbing",
    url: "https://www.callpreferredplumbing.com/",
    ready: "Local Plumber",
  },
];
const only = process.argv[2];
const targets = only ? sites.filter((site) => site.id.includes(only)) : sites;

async function dismiss(page) {
  for (const sel of [
    'button:has-text("Accept")',
    'button:has-text("Accept all")',
    'button:has-text("Got it")',
    '[aria-label="Close"]',
  ]) {
    const btn = page.locator(sel).first();
    if (await btn.isVisible({ timeout: 300 }).catch(() => false)) {
      await btn.click().catch(() => {});
      await page.waitForTimeout(200);
    }
  }
}

async function settle(page, ready) {
  await page.waitForSelector("body", { timeout: 20000 }).catch(() => {});
  await page
    .addStyleTag({
      content: "html{scrollbar-width:none}::-webkit-scrollbar{display:none}",
    })
    .catch(() => {});
  for (let i = 0; i < 18; i++) {
    await page.waitForTimeout(600);
    const challenge = await page.locator("text=Verify you are human").count().catch(() => 0);
    const hit = await page.locator(`text=${ready}`).count().catch(() => 0);
    if (hit > 0 && challenge === 0) break;
  }
  await page.evaluate(() => document.fonts?.ready).catch(() => {});
  await page
    .waitForFunction(() => [...document.images].every((img) => img.complete), { timeout: 12000 })
    .catch(() => {});
  await dismiss(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
    args: ["--hide-scrollbars"],
  });
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 3,
    locale: "en-US",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  });
  const phone = devices["iPhone 14"];
  const mobile = await browser.newContext({
    ...phone,
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    locale: "en-US",
  });

  try {
    for (const site of targets) {
      const desk = await desktop.newPage();
      console.log("desktop", site.url);
      await desk.goto(site.url, { waitUntil: "commit", timeout: 60000 });
      await settle(desk, site.ready);
      const deskPath = path.join(outDir, `${site.id}-desktop.png`);
      await desk.screenshot({
        path: deskPath,
        type: "png",
        clip: { x: 0, y: 0, width: 1440, height: 900 },
        animations: "disabled",
      });
      await desk.close();
      console.log("  ", deskPath);

      const mob = await mobile.newPage();
      console.log("mobile", site.url);
      await mob.goto(site.url, { waitUntil: "commit", timeout: 60000 });
      await settle(mob, site.ready);
      const mobPath = path.join(outDir, `${site.id}-mobile.png`);
      await mob.screenshot({
        path: mobPath,
        type: "png",
        clip: { x: 0, y: 0, width: 390, height: 844 },
        animations: "disabled",
      });
      await mob.close();
      console.log("  ", mobPath);
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
