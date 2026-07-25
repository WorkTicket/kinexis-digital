/**
 * Capture desktop homepage screenshots for case study clients,
 * then optimize to WebP via sharp.
 *
 * Usage: node scripts/capture-case-study-screenshots.mjs
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const outDir = path.join(process.cwd(), "public", "assets", "images", "case-studies");

const sites = [
  {
    slug: "landscaping-company-growth",
    url: "https://a1pslandscape.com/",
  },
  {
    slug: "plumbing-company-growth",
    url: "https://www.callpreferredplumbing.com/",
  },
  {
    slug: "saas-platform-growth",
    url: "https://bynmwcreative.com/",
  },
];

async function capture() {
  await mkdir(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    locale: "en-US",
  });

  for (const site of sites) {
    const page = await context.newPage();
    console.log(`Capturing ${site.slug} → ${site.url}`);

    try {
      await page.goto(site.url, { waitUntil: "networkidle", timeout: 60000 });
      // Let late paints / cookie banners settle
      await page.waitForTimeout(1500);

      // Dismiss common cookie/consent overlays if present
      for (const sel of [
        'button:has-text("Accept")',
        'button:has-text("Accept all")',
        'button:has-text("Aceptar")',
        'button:has-text("Got it")',
        '[aria-label="Close"]',
      ]) {
        const btn = page.locator(sel).first();
        if (await btn.isVisible({ timeout: 500 }).catch(() => false)) {
          await btn.click().catch(() => {});
          await page.waitForTimeout(400);
        }
      }

      const pngBuffer = await page.screenshot({
        type: "png",
        clip: { x: 0, y: 0, width: 1440, height: 900 },
      });

      const webpPath = path.join(outDir, `${site.slug}.webp`);
      const thumbPath = path.join(outDir, `${site.slug}-card.webp`);

      await sharp(pngBuffer)
        .resize(1440, 900, { fit: "cover" })
        .webp({ quality: 78, effort: 6 })
        .toFile(webpPath);

      await sharp(pngBuffer)
        .resize(800, 500, { fit: "cover" })
        .webp({ quality: 72, effort: 6 })
        .toFile(thumbPath);

      console.log(`  ✓ ${webpPath}`);
      console.log(`  ✓ ${thumbPath}`);
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
