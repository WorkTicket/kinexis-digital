import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const outDir = path.join(process.cwd(), "public", "assets", "logos", "clients");

const sources = [
  {
    slug: "a1-property-services",
    url: "https://a1pslandscape.com/images/icon.webp",
    protectDarkInk: true,
  },
  {
    slug: "preferred-plumbing",
    url: "https://www.callpreferredplumbing.com/images/preferred-logo.webp",
  },
  {
    slug: "manos-creativas",
    url: "https://bynmwcreative.com/images/logo.webp",
  },
];

/**
 * Knock out near-black *background* only.
 * Skip marks that already ship with transparency and use dark ink as part of
 * the logo (A1's lower swoosh) — thresholding those eats edges and looks broken.
 */
async function knockOutBlack(input, { protectDarkInk = false } = {}) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  if (!protectDarkInk) {
    const threshold = 28;
    for (let i = 0; i < data.length; i += info.channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (r <= threshold && g <= threshold && b <= threshold) {
        data[i + 3] = 0;
      }
    }
  } else {
    // Lift near-black logo ink to mid-gray so it still reads on dark UIs.
    for (let i = 0; i < data.length; i += info.channels) {
      if (data[i + 3] < 8) continue;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      if (max <= 55 && max - min < 18) {
        const v = Math.round(70 + (max / 55) * 40);
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
      }
    }
  }

  return sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels,
    },
  })
    .trim({ threshold: 8 })
    .resize({ width: 640, height: 320, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 92, effort: 6, alphaQuality: 100 })
    .toBuffer();
}

await mkdir(outDir, { recursive: true });

for (const source of sources) {
  const res = await fetch(source.url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    },
  });
  if (!res.ok) throw new Error(`${source.slug}: HTTP ${res.status}`);
  const raw = Buffer.from(await res.arrayBuffer());
  const out = await knockOutBlack(raw, {
    protectDarkInk: Boolean(source.protectDarkInk),
  });
  const outPath = path.join(outDir, `${source.slug}.webp`);
  await sharp(out).toFile(outPath);
  const meta = await sharp(outPath).metadata();
  console.log(`✓ ${source.slug} ${meta.width}x${meta.height}`);
}
