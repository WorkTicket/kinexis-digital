import { chromium } from "playwright";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const outDir = "public/assets/images/resources";

const shots = [
  { file: "search-central", url: "https://developers.google.com/search" },
  { file: "ads-help", url: "https://support.google.com/google-ads" },
  {
    file: "meta-help",
    url: "https://www.facebook.com/business/help/?locale=en_US",
  },
  { file: "web-performance", url: "https://web.dev/performance" },
  { file: "business-profile", url: "https://support.google.com/business" },
  { file: "think-with-google", url: "https://www.thinkwithgoogle.com/" },
];

const cookieSelectors = [
  'button:has-text("Accept all")',
  'button:has-text("Accept All")',
  'button:has-text("I agree")',
  'button:has-text("Reject all")',
  "#onetrust-accept-btn-handler",
  'button[aria-label="Accept all"]',
  'button:has-text("Allow all cookies")',
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1080 },
  deviceScaleFactor: 1,
  locale: "en-US",
  extraHTTPHeaders: { "Accept-Language": "en-US,en;q=0.9" },
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
});

for (const shot of shots) {
  const page = await context.newPage();
  console.log("capturing", shot.file, shot.url);
  try {
    await page.goto(shot.url, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    await page.waitForTimeout(3500);

    for (const sel of cookieSelectors) {
      try {
        const btn = page.locator(sel).first();
        if (await btn.isVisible({ timeout: 800 })) {
          await btn.click({ timeout: 1000 });
        }
      } catch {
        // ignore
      }
    }

    await page.waitForTimeout(1000);
    const pngPath = path.join(outDir, `${shot.file}-raw.png`);
    await page.screenshot({ path: pngPath, fullPage: false });

    const webpPath = path.join(outDir, `${shot.file}.webp`);
    const info = await sharp(pngPath)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 85, effort: 5 })
      .toFile(webpPath);
    fs.unlinkSync(pngPath);
    console.log("ok", shot.file, info.size);
  } catch (err) {
    console.error("FAIL", shot.file, err.message);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log("done");
