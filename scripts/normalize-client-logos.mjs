/**
 * Fetch client logos, knock out solid black backgrounds, and pack each
 * into a shared transparent canvas so the homepage wall sizes evenly.
 *
 * Usage: node scripts/normalize-client-logos.mjs
 */
import sharp from "sharp";
import { mkdir, readFile, writeFile, unlink } from "node:fs/promises";
import path from "node:path";

const outDir = path.join(process.cwd(), "public", "assets", "logos", "clients");

/** Shared frame — wide enough for marks + tall icons without cropping */
const FRAME_W = 480;
const FRAME_H = 240;
const PAD = 36;

const sources = [
  {
    slug: "a1-property-services",
    name: "A1 Property Services",
    // Local SVG recreation — live site only ships a soft 256px raster
    local: "a1-property-services.svg",
  },
  {
    slug: "preferred-plumbing",
    name: "Preferred Plumbing",
    url: "https://www.callpreferredplumbing.com/images/preferred-logo.webp",
  },
  {
    slug: "manos-creativas",
    name: "Manos Creativas",
    url: "https://bynmwcreative.com/images/logo.webp",
  },
];

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

async function prepareMark(input, { protectDarkInk = false } = {}) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const threshold = protectDarkInk ? 12 : 36;

  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    if (a < 8) continue;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const chroma = max - min;

    if (max <= threshold && chroma < 16) {
      data[i + 3] = 0;
      continue;
    }

    if (protectDarkInk && max <= 55 && chroma < 18) {
      const v = Math.round(78 + (max / 55) * 48);
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
    }
  }

  return sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels,
    },
  })
    .trim({ threshold: 12 })
    .png()
    .toBuffer();
}

async function packIntoFrame(markPng) {
  const maxW = FRAME_W - PAD * 2;
  const maxH = FRAME_H - PAD * 2;

  const fitted = await sharp(markPng)
    .resize({
      width: maxW,
      height: maxH,
      fit: "inside",
      withoutEnlargement: false,
    })
    .png()
    .toBuffer();

  const fittedMeta = await sharp(fitted).metadata();
  const left = Math.round((FRAME_W - fittedMeta.width) / 2);
  const top = Math.round((FRAME_H - fittedMeta.height) / 2);

  return sharp({
    create: {
      width: FRAME_W,
      height: FRAME_H,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: fitted, left, top }])
    .webp({ quality: 94, effort: 6, alphaQuality: 100 })
    .toBuffer();
}

await mkdir(outDir, { recursive: true });

for (const source of sources) {
  let raw;
  if (source.local) {
    raw = await readFile(path.join(outDir, source.local));
    // Rasterize SVG at high density for crisp webp
    raw = await sharp(raw, { density: 300 }).png().toBuffer();
  } else {
    const res = await fetch(source.url, { headers: { "User-Agent": UA } });
    if (!res.ok) throw new Error(`${source.slug}: HTTP ${res.status}`);
    raw = Buffer.from(await res.arrayBuffer());
  }

  const mark = await prepareMark(raw, {
    protectDarkInk: Boolean(source.protectDarkInk),
  });
  const framed = await packIntoFrame(mark);
  const outPath = path.join(outDir, `${source.slug}.webp`);
  await writeFile(outPath, framed);

  const meta = await sharp(framed).metadata();
  console.log(`✓ ${source.slug} → ${meta.width}x${meta.height}`);
}

// Remove debug scratch files if present
for (const junk of [
  "_a1-preview.png",
  "_preferred-raw.png",
  "_a1-dark-mask.png",
  "a1-property-services-source.webp",
]) {
  try {
    await unlink(path.join(outDir, junk));
    console.log(`removed ${junk}`);
  } catch {
    /* ignore */
  }
}

console.log("Done.");
