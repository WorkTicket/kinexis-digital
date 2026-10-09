/**
 * Native high-resolution laptop + phone stills.
 * Screenshots sit inside the bezel, so the glass cannot overflow the frame.
 *
 * Usage: node scripts/render-device-photos.mjs
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const shotDir = path.join(root, "tmp", "lp-device-rebuild");
const outDir = path.join(root, "public", "assets", "images", "lp");
const STAGE = { width: 2000, height: 1334 };
const SCALE = 2;

const jobs = [
  {
    id: "a1",
    desktop: "a1-desktop.png",
    phone: "a1-phone.png",
    out: "a1-devices.webp",
    theme: "graphite",
  },
  {
    id: "plumbing",
    desktop: "plumbing-desktop.png",
    phone: "plumbing-phone.png",
    out: "plumbing-devices.webp",
    theme: "silver",
  },
];

function keys() {
  const rows = [15, 14, 13, 12];
  return rows
    .map(
      (count) =>
        `<div class="row">${"<i></i>".repeat(count)}</div>`,
    )
    .join("");
}

function scene({ desktopSrc, phoneSrc, theme }) {
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
      radial-gradient(ellipse 55% 28% at 48% 86%, rgba(255,255,255,.07), transparent 70%),
      #000;
  }
  .laptop {
    position: absolute;
    left: 28px;
    top: 36px;
    width: 1280px;
    transform-origin: 62% 58%;
    transform: perspective(2100px) rotateX(9deg) rotateY(-21deg);
    transform-style: preserve-3d;
    filter: drop-shadow(18px 36px 28px rgba(0,0,0,.62));
  }
  .lid {
    border-radius: 22px 22px 6px 6px;
    padding: 18px 16px 20px;
    background:
      linear-gradient(118deg, rgba(255,255,255,.55), transparent 22%),
      ${
        theme === "silver"
          ? "linear-gradient(165deg, #f7f7f8 0%, #d5d6da 32%, #a9aaaf 68%, #e4e5e8 100%)"
          : "linear-gradient(165deg, #d7d8dc 0%, #8e9096 34%, #5c5e64 70%, #b4b6bb 100%)"
      };
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,.8),
      inset 0 -1px 0 rgba(0,0,0,.25);
  }
  .cam {
    width: 9px;
    height: 9px;
    margin: 0 auto 10px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #8d8e93, #111 68%);
    box-shadow: 0 0 0 3px #1a1b1e;
  }
  .glass {
    position: relative;
    aspect-ratio: 1440 / 900;
    overflow: hidden;
    border-radius: 3px;
    background: #000;
    box-shadow: inset 0 0 0 1px rgba(0,0,0,.65);
  }
  .glass img, .pscreen img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
  .glass::after, .pscreen::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(115deg, rgba(255,255,255,.16), transparent 24% 78%, rgba(255,255,255,.05));
    pointer-events: none;
  }
  .hinge {
    height: 12px;
    margin: 0 46px;
    background: linear-gradient(#8a8b90, #2c2d31 46%, #9a9ba0);
  }
  .deck {
    height: 196px;
    margin: 0 78px;
    border-radius: 0 0 18px 18px;
    padding: 14px 36px 0;
    background: linear-gradient(180deg, #f3f4f6 0%, #c9cacf 42%, #dedfe3 100%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.7);
    transform: rotateX(-42deg);
    transform-origin: top center;
  }
  .theme-graphite .deck {
    background: linear-gradient(180deg, #c8c9ce 0%, #8b8d93 55%, #a6a8ad 100%);
  }
  .row { display: flex; gap: 5px; margin-bottom: 5px; }
  .row i {
    flex: 1;
    height: 18px;
    border-radius: 3px;
    background: linear-gradient(180deg, #3c3d42, #16171a);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.28), 0 1px 0 rgba(0,0,0,.35);
  }
  .pad {
    width: 210px;
    height: 28px;
    margin: 8px auto 0;
    border-radius: 8px;
    background: linear-gradient(#d7d8dc, #b7b8bd);
    box-shadow: inset 0 0 0 1px rgba(0,0,0,.15);
  }
  .phone {
    position: absolute;
    right: 118px;
    top: 248px;
    width: 392px;
    z-index: 4;
    transform: perspective(1600px) rotateY(13deg);
    filter: drop-shadow(-22px 34px 26px rgba(0,0,0,.7));
  }
  .chassis {
    position: relative;
    border-radius: 54px;
    padding: 12px;
    background:
      linear-gradient(160deg, rgba(255,255,255,.45), transparent 30%),
      ${
        theme === "silver"
          ? "linear-gradient(165deg, #f4f5f7, #b9bac0 45%, #eceef1)"
          : "linear-gradient(165deg, #3a3b40, #0c0c0e 46%, #2c2d32)"
      };
    box-shadow:
      inset 0 0 0 1.5px rgba(255,255,255,.28),
      inset 0 0 0 7px #050505;
  }
  .pscreen {
    position: relative;
    aspect-ratio: 390 / 844;
    overflow: hidden;
    border-radius: 42px;
    background: #000;
  }
  .side {
    position: absolute;
    right: -3px;
    width: 3px;
    border-radius: 2px;
    background: #6a6b70;
  }
  .side.a { top: 128px; height: 72px; }
  .side.b { top: 214px; height: 48px; }
</style>
</head>
<body>
  <div class="stage theme-${theme}">
    <div class="laptop">
      <div class="lid">
        <div class="cam"></div>
        <div class="glass"><img src="${desktopSrc}" alt="" /></div>
      </div>
      <div class="hinge"></div>
      <div class="deck">
        ${keys()}
        <div class="pad"></div>
      </div>
    </div>
    <div class="phone">
      <span class="side a"></span>
      <span class="side b"></span>
      <div class="chassis">
        <div class="pscreen"><img src="${phoneSrc}" alt="" /></div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

async function main() {
  await mkdir(shotDir, { recursive: true });
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
    args: ["--hide-scrollbars", "--force-color-profile=srgb"],
  });
  try {
    for (const job of jobs) {
      const htmlPath = path.join(shotDir, `${job.id}-photo.html`);
      const pngPath = path.join(shotDir, `${job.id}-photo.png`);
      await writeFile(
        htmlPath,
        scene({
          desktopSrc: pathToFileURL(path.join(shotDir, job.desktop)).href,
          phoneSrc: pathToFileURL(path.join(shotDir, job.phone)).href,
          theme: job.theme,
        }),
        "utf8",
      );
      const context = await browser.newContext({
        viewport: STAGE,
        deviceScaleFactor: SCALE,
      });
      const page = await context.newPage();
      await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
      await page.waitForFunction(
        () => [...document.images].every((img) => img.complete && img.naturalWidth > 0),
      );
      await page.screenshot({
        path: pngPath,
        type: "png",
        clip: { x: 0, y: 0, width: STAGE.width, height: STAGE.height },
        animations: "disabled",
      });
      await context.close();
      const outPath = path.join(outDir, job.out);
      await sharp(pngPath).webp({ quality: 95, effort: 6, smartSubsample: false }).toFile(outPath);
      const meta = await sharp(outPath).metadata();
      console.log(`${job.id} ${meta.width}x${meta.height}`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
