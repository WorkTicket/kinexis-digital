/**
 * Capture live desktop + phone screenshots and composite them into
 * high-resolution laptop/phone stills for the get-a-website landing page.
 *
 * Usage: node scripts/rebuild-lp-device-shots.mjs
 */
import { chromium, devices } from "playwright";
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const tmpDir = path.join(root, "tmp", "lp-device-rebuild");
const outDir = path.join(root, "public", "assets", "images", "lp");

const DESKTOP = { width: 1440, height: 900 };
const PHONE = { width: 390, height: 844 };
const STAGE = { width: 1600, height: 1064 };
const OUTPUT_SCALE = 2;

const sites = [
  {
    id: "a1",
    url: "https://a1pslandscape.com/",
    readyText: "Get a Free Quote",
    out: "a1-devices.webp",
  },
  {
    id: "plumbing",
    url: "https://www.callpreferredplumbing.com/",
    readyText: "Local Plumber",
    out: "plumbing-devices.webp",
  },
];

function sceneHtml({ desktopSrc, phoneSrc }) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { box-sizing: border-box; }
  html, body {
    margin: 0;
    width: ${STAGE.width}px;
    height: ${STAGE.height}px;
    background: #000;
    overflow: hidden;
  }
  .stage {
    position: relative;
    width: ${STAGE.width}px;
    height: ${STAGE.height}px;
    background:
      radial-gradient(ellipse 70% 46% at 46% 78%, rgba(255,255,255,.05), transparent 70%),
      #000;
  }
  .shadow {
    position: absolute;
    left: 180px;
    right: 140px;
    bottom: 78px;
    height: 70px;
    background: radial-gradient(ellipse at center, rgba(0,0,0,.0), transparent 70%);
    filter: blur(8px);
  }
  .ground {
    position: absolute;
    left: 120px;
    right: 90px;
    bottom: 86px;
    height: 90px;
    background: radial-gradient(ellipse at center, rgba(255,255,255,.16), transparent 68%);
    filter: blur(10px);
    opacity: .55;
  }
  .laptop {
    position: absolute;
    left: 36px;
    top: 78px;
    width: 1120px;
    transform-origin: 58% 62%;
    transform: perspective(2400px) rotateX(7deg) rotateY(-18deg);
    filter: drop-shadow(0 28px 28px rgba(0,0,0,.55));
  }
  .lid {
    background: linear-gradient(145deg, #e7e8ea 0%, #c5c6ca 28%, #9ea0a4 70%, #d4d5d8 100%);
    border-radius: 22px 22px 8px 8px;
    padding: 16px 16px 20px;
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,.75),
      inset 0 -1px 0 rgba(0,0,0,.18);
  }
  .cam {
    width: 8px;
    height: 8px;
    margin: 0 auto 9px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #6d6e72, #1a1b1e 70%);
    box-shadow: 0 0 0 2px #2a2b2e;
  }
  .screen {
    aspect-ratio: 1440 / 900;
    border-radius: 6px;
    overflow: hidden;
    background: #0b0d10;
    box-shadow: inset 0 0 0 1px rgba(0,0,0,.45);
  }
  .screen img, .pscreen img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }
  .hinge {
    height: 10px;
    margin: 0 18px;
    background: linear-gradient(#6a6b6e, #2e2f32 45%, #8d8e92);
    border-radius: 0 0 4px 4px;
  }
  .deck {
    height: 118px;
    margin: -2px 34px 0;
    border-radius: 0 0 18px 18px;
    background: linear-gradient(180deg, #dedfe2 0%, #b7b8bc 55%, #c8c9cd 100%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.5);
    position: relative;
  }
  .keys {
    position: absolute;
    left: 28px;
    right: 28px;
    top: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .row { display: flex; gap: 4px; }
  .row i {
    flex: 1;
    height: 11px;
    border-radius: 2px;
    background: linear-gradient(180deg, #4a4b4f, #232427);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.22), 0 1px 0 rgba(0,0,0,.25);
  }
  .row.space { padding: 0 38%; }
  .pad {
    position: absolute;
    left: 50%;
    bottom: 14px;
    width: 168px;
    height: 22px;
    transform: translateX(-50%);
    border-radius: 6px;
    background: linear-gradient(#cfd0d4, #b4b5b9);
    box-shadow: inset 0 0 0 1px rgba(0,0,0,.12);
  }
  .phone {
    position: absolute;
    right: 36px;
    top: 186px;
    width: 332px;
    z-index: 3;
    transform: perspective(1800px) rotateY(11deg) rotateZ(0.4deg);
    filter: drop-shadow(-18px 26px 24px rgba(0,0,0,.6));
  }
  .chassis {
    background: linear-gradient(160deg, #2a2b2e, #0e0e10 42%, #3a3b3e 100%);
    border-radius: 46px;
    padding: 12px;
    box-shadow:
      inset 0 0 0 1.5px rgba(255,255,255,.18),
      inset 0 0 0 6px #050505;
  }
  .pscreen {
    aspect-ratio: 390 / 844;
    border-radius: 34px;
    overflow: hidden;
    background: #071018;
    position: relative;
  }
  .btn {
    position: absolute;
    right: -3px;
    top: 148px;
    width: 3px;
    height: 64px;
    border-radius: 2px;
    background: #5c5d61;
  }
  .btn.quiet {
    top: 228px;
    height: 42px;
  }
</style>
</head>
<body>
  <div class="stage">
    <div class="ground"></div>
    <div class="laptop">
      <div class="lid">
        <div class="cam"></div>
        <div class="screen"><img src="${desktopSrc}" alt="" /></div>
      </div>
      <div class="hinge"></div>
      <div class="deck">
        <div class="keys">
          <div class="row">${"<i></i>".repeat(14)}</div>
          <div class="row">${"<i></i>".repeat(14)}</div>
          <div class="row">${"<i></i>".repeat(13)}</div>
          <div class="row space"><i></i></div>
        </div>
        <div class="pad"></div>
      </div>
    </div>
    <div class="phone">
      <span class="btn"></span>
      <span class="btn quiet"></span>
      <div class="chassis">
        <div class="pscreen"><img src="${phoneSrc}" alt="" /></div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

async function dismissOverlays(page) {
  for (const sel of [
    'button:has-text("Reject non-essential")',
    'button:has-text("Reject")',
    'button:has-text("Accept analytics")',
    'button:has-text("Accept all")',
    'button:has-text("Accept All")',
    'button:has-text("Accept")',
    'button:has-text("Got it")',
    'button:has-text("I agree")',
    '[aria-label="Close"]',
    '[aria-label="close"]',
  ]) {
    const btn = page.locator(sel).first();
    if (await btn.isVisible({ timeout: 350 }).catch(() => false)) {
      await btn.click().catch(() => {});
      await page.waitForTimeout(250);
    }
  }
}

async function capturePair(contextDesktop, contextPhone, site) {
  const deskPage = await contextDesktop.newPage();
  const phonePage = await contextPhone.newPage();
  const deskPath = path.join(tmpDir, `${site.id}-desktop.png`);
  const phonePath = path.join(tmpDir, `${site.id}-phone.png`);
  if (existsSync(deskPath) && existsSync(phonePath) && !process.argv.includes("--recapture")) {
    console.log(`\n${site.id} reusing captured screenshots`);
    return { deskPath, phonePath };
  }

  try {
    console.log(`\n${site.id} desktop ${site.url}`);
    await deskPage.goto(site.url, { waitUntil: "commit", timeout: 60000 });
    await deskPage.addStyleTag({
      content: "html{scrollbar-width:none}::-webkit-scrollbar{display:none}",
    });
    for (let i = 0; i < 20; i++) {
      await deskPage.waitForTimeout(700);
      const challenge = await deskPage
        .locator("text=Verify you are human")
        .count()
        .catch(() => 0);
      const ready = await deskPage
        .locator(`text=${site.readyText}`)
        .count()
        .catch(() => 0);
      if (ready > 0 && challenge === 0) break;
    }
    await deskPage.evaluate(() => document.fonts?.ready).catch(() => {});
    await deskPage
      .waitForFunction(() => [...document.images].every((img) => img.complete), {
        timeout: 12000,
      })
      .catch(() => {});
    await dismissOverlays(deskPage);
    await deskPage.waitForTimeout(800);
    await deskPage.screenshot({
      path: deskPath,
      type: "png",
      clip: { x: 0, y: 0, width: DESKTOP.width, height: DESKTOP.height },
      animations: "disabled",
    });
    console.log(`  desktop → ${deskPath}`);

    console.log(`${site.id} phone`);
    await phonePage.goto(site.url, { waitUntil: "commit", timeout: 60000 });
    await phonePage.addStyleTag({
      content: "html{scrollbar-width:none}::-webkit-scrollbar{display:none}",
    });
    for (let i = 0; i < 20; i++) {
      await phonePage.waitForTimeout(700);
      const challenge = await phonePage
        .locator("text=Verify you are human")
        .count()
        .catch(() => 0);
      const ready = await phonePage
        .locator(`text=${site.readyText}`)
        .count()
        .catch(() => 0);
      if (ready > 0 && challenge === 0) break;
    }
    await phonePage.evaluate(() => document.fonts?.ready).catch(() => {});
    await phonePage
      .waitForFunction(() => [...document.images].every((img) => img.complete), {
        timeout: 12000,
      })
      .catch(() => {});
    await dismissOverlays(phonePage);
    await phonePage.waitForTimeout(800);
    await phonePage.screenshot({
      path: phonePath,
      type: "png",
      clip: { x: 0, y: 0, width: PHONE.width, height: PHONE.height },
      animations: "disabled",
    });
    console.log(`  phone → ${phonePath}`);
  } finally {
    await deskPage.close();
    await phonePage.close();
  }

  return { deskPath, phonePath };
}

async function composite(browser, site, shots) {
  const htmlPath = path.join(tmpDir, `${site.id}-scene.html`);
  const pngPath = path.join(tmpDir, `${site.id}-scene.png`);
  const html = sceneHtml({
    desktopSrc: pathToFileURL(shots.deskPath).href,
    phoneSrc: pathToFileURL(shots.phonePath).href,
  });
  await writeFile(htmlPath, html, "utf8");

  const context = await browser.newContext({
    viewport: STAGE,
    deviceScaleFactor: OUTPUT_SCALE,
  });
  const page = await context.newPage();
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
  await page.waitForFunction(
    () => [...document.images].every((img) => img.complete && img.naturalWidth > 0),
    { timeout: 15000 },
  );
  await page.screenshot({
    path: pngPath,
    type: "png",
    clip: { x: 0, y: 0, width: STAGE.width, height: STAGE.height },
    animations: "disabled",
  });
  await context.close();

  const outPath = path.join(outDir, site.out);
  await sharp(pngPath)
    .webp({ quality: 92, effort: 6, smartSubsample: true })
    .toFile(outPath);
  const meta = await sharp(outPath).metadata();
  const stat = await sharp(outPath).toBuffer();
  console.log(
    `  wrote ${outPath} ${meta.width}x${meta.height} ${(stat.length / 1024).toFixed(0)}KB`,
  );
}

async function main() {
  await mkdir(tmpDir, { recursive: true });
  await mkdir(outDir, { recursive: true });

  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
    args: ["--disable-blink-features=AutomationControlled", "--hide-scrollbars"],
  });

  const contextDesktop = await browser.newContext({
    viewport: DESKTOP,
    deviceScaleFactor: 2,
    locale: "en-US",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  });
  const phone = devices["iPhone 14"];
  const contextPhone = await browser.newContext({
    ...phone,
    viewport: PHONE,
    deviceScaleFactor: 3,
    locale: "en-US",
  });
  await contextDesktop.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => undefined });
  });
  await contextPhone.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => undefined });
  });

  try {
    for (const site of sites) {
      const shots = await capturePair(contextDesktop, contextPhone, site);
      await composite(browser, site, shots);
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
