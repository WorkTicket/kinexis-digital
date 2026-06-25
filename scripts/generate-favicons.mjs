/**
 * Builds tight-cropped favicon assets from the icon logo.
 * Run with: node scripts/generate-favicons.mjs
 */
import sharp from "sharp";
import toIco from "to-ico";
import { mkdir, writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const sourcePath = join(rootDir, "public", "assets", "logos", "KINEXIS_icon_logo.webp");
const appDir = join(rootDir, "src", "app");
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

/** Scale for the tab icon (32px) — keep the mark smaller in the tab. */
const TAB_LOGO_SCALE = 0.66;
/** Scale for favicon.ico (16px) — fill more of the tiny loading slot. */
const LOADING_LOGO_SCALE = 0.88;

function removeDarkBackground(data) {
  const pixels = new Uint8Array(data.length);
  pixels.set(data);

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    if (r < 48 && g < 48 && b < 48) {
      pixels[i + 3] = 0;
    }
  }

  return pixels;
}

async function loadTightLogo() {
  const { data, info } = await sharp(sourcePath)
    .extract({ left: 82, top: 50, width: 158, height: 88 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = removeDarkBackground(data);

  return sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim()
    .png()
    .toBuffer();
}

async function renderIcon(size, logoScale) {
  const logoOnly = await loadTightLogo();
  const logoSize = Math.max(1, Math.round(size * logoScale));

  const logo = await sharp(logoOnly)
    .resize(logoSize, logoSize, {
      fit: "contain",
      background: TRANSPARENT,
    })
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: TRANSPARENT,
    },
  })
    .composite([{ input: logo, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function writeIcon(outputPath, size, logoScale) {
  const buffer = await renderIcon(size, logoScale);
  await sharp(buffer).toFile(outputPath);
  console.log(`✓ Generated ${outputPath} (${size}×${size})`);
}

await mkdir(appDir, { recursive: true });

const icon16 = await renderIcon(16, LOADING_LOGO_SCALE);
const icon32 = await renderIcon(32, TAB_LOGO_SCALE);
const icon48 = await renderIcon(48, TAB_LOGO_SCALE);

await sharp(icon32).toFile(join(appDir, "icon.png"));
console.log(`✓ Generated ${join(appDir, "icon.png")} (32×32)`);

await writeIcon(join(appDir, "apple-icon.png"), 180, 0.62);

const faviconIco = await toIco([icon16, icon32, icon48]);
await writeFile(join(appDir, "favicon.ico"), faviconIco);
console.log(`✓ Generated ${join(appDir, "favicon.ico")} (16, 32, 48)`);

console.log("\n✅ Favicon assets written to src/app/");
