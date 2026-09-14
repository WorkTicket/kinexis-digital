/**
 * Capture desktop homepage screenshots for case study clients,
 * then optimize to WebP via sharp.
 *
 * Usage:
 *   node scripts/capture-case-study-screenshots.mjs
 *   node scripts/capture-case-study-screenshots.mjs landscaping-company-growth
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";

const outDir = path.join(process.cwd(), "public", "assets", "images", "case-studies");
const lpDir = path.join(process.cwd(), "public", "assets", "images", "lp");
const VIEWPORT = { width: 1440, height: 900 };
const SCALE = 2;

const sites = [
  {
    slug: "landscaping-company-growth",
    url: "https://a1pslandscape.com/",
    lpCopy: "a1-desktop.webp",
  },
  {
    slug: "plumbing-company-growth",
    url: "https://www.callpreferredplumbing.com/",
  },
  {
    slug: "ecommerce-store-growth",
    url: "https://bynmwcreative.com/",
  },
];

const only = process.argv[2];
const targets = only
  ? sites.filter((site) => site.slug.includes(only) || site.url.includes(only))
  : sites;

async function dismissOverlays(page) {
  for (const sel of [
    'button:has-text("Accept")',
    'button:has-text("Accept all")',
    'button:has-text("Accept All")',
    'button:has-text("Aceptar")',
    'button:has-text("Got it")',
    'button:has-text("I agree")',
    '[aria-label="Close"]',
    '[aria-label="close"]',
  ]) {
    const btn = page.locator(sel).first();
    if (await btn.isVisible({ timeout: 400 }).catch(() => false)) {
      await btn.click().catch(() => {});
      await page.waitForTimeout(300);
    }
  }
}

async function capture() {
  if (!targets.length) {
    console.error(`No matching site for "${only}"`);
    process.exitCode = 1;
    return;
  }

  await mkdir(outDir, { recursive: true });
  await mkdir(lpDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: SCALE,
    locale: "en-US",
  });

  for (const site of targets) {
    const page = await context.newPage();
    console.log(`Capturing ${site.slug} → ${site.url}`);

    try {
      await page.goto(site.url, { waitUntil: "networkidle", timeout: 60000 });
      await page.evaluate(() => document.fonts?.ready).catch(() => {});
      await page.waitForTimeout(1800);
      await dismissOverlays(page);
      await page
        .waitForFunction(
          () => [...document.images].every((img) => img.complete),
          { timeout: 12000 },
        )
        .catch(() => {});

      const pngBuffer = await page.screenshot({
        type: "png",
        clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height },
        animations: "disabled",
      });

      const webpPath = path.join(outDir, `${site.slug}.webp`);
      const thumbPath = path.join(outDir, `${site.slug}-card.webp`);

      await sharp(pngBuffer).webp({ quality: 90, effort: 6 }).toFile(webpPath);

      await sharp(pngBuffer)
        .resize(1600, 1000, { fit: "cover" })
        .webp({ quality: 82, effort: 6 })
        .toFile(thumbPath);

      const meta = await sharp(webpPath).metadata();
      console.log(`  ✓ ${webpPath} (${meta.width}x${meta.height})`);
      console.log(`  ✓ ${thumbPath}`);

      if (site.lpCopy) {
        const lpPath = path.join(lpDir, site.lpCopy);
        await copyFile(webpPath, lpPath);
        console.log(`  ✓ ${lpPath}`);
      }
    } catch (err) {
      console.error(`  ✗ Failed ${site.slug}:`, err.message);
      process.exitCode = 1;
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log("Done.");
}

capture();
