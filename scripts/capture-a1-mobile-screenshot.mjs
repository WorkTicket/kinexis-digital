/**
 * Capture a real mobile viewport screenshot of A1 Property Services
 * for the get-a-website hero phone mockup.
 *
 * Usage: node scripts/capture-a1-mobile-screenshot.mjs
 */
import { chromium, devices } from "playwright";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const outDir = path.join(process.cwd(), "public", "assets", "images", "lp");
const outPath = path.join(outDir, "a1-mobile.webp");
const url = "https://a1pslandscape.com/";
const phone = devices["iPhone 14"];
/** Full iPhone 14 logical size so the still fills a 9:19.5 phone bezel. */
const viewport = { width: 390, height: 844 };

async function capture() {
  await mkdir(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    ...phone,
    viewport,
    locale: "en-US",
  });
  const page = await context.newPage();

  console.log(`Capturing mobile ${viewport.width}x${viewport.height} → ${url}`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1800);

  for (const sel of [
    'button:has-text("Accept")',
    'button:has-text("Accept all")',
    'button:has-text("Got it")',
    '[aria-label="Close"]',
  ]) {
    const btn = page.locator(sel).first();
    if (await btn.isVisible({ timeout: 500 }).catch(() => false)) {
      await btn.click().catch(() => {});
      await page.waitForTimeout(400);
    }
  }

  const { width, height } = viewport;
  const pngBuffer = await page.screenshot({
    type: "png",
    clip: { x: 0, y: 0, width, height },
  });

  await browser.close();

  const meta = await sharp(pngBuffer).metadata();
  await sharp(pngBuffer)
    .webp({ quality: 90, effort: 6 })
    .toFile(outPath);

  const outMeta = await sharp(outPath).metadata();
  console.log(
    `  captured ${meta.width}x${meta.height} png → ${outPath} (${outMeta.width}x${outMeta.height} webp)`,
  );
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
