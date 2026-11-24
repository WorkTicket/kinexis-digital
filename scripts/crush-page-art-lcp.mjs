/**
 * Crush CampaignArtwork LCP files to match CSS display (~260 mobile / ~560 desktop).
 * Mobile: re-encode at 520w WebP (+ AVIF sibling for future).
 * Desktop: re-encode at 960w AVIF.
 * Run: node scripts/crush-page-art-lcp.mjs
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const dir = "public/assets/kinexis/page-art";
const files = await readdir(dir);

async function encodeAvif(source, { width, maxBytes, photo = true }) {
  let quality = photo ? 55 : 62;
  const floor = photo ? 28 : 40;
  let buffer;
  do {
    let pipeline = sharp(source);
    if (width) pipeline = pipeline.resize({ width, withoutEnlargement: true, kernel: "lanczos3" });
    buffer = await pipeline
      .avif({
        quality,
        effort: 7,
        chromaSubsampling: photo ? "4:2:0" : "4:4:4",
      })
      .toBuffer();
    quality -= 4;
  } while (buffer.length > maxBytes && quality >= floor);
  return buffer;
}

async function encodeWebp(source, { width, maxBytes }) {
  let quality = 72;
  let buffer;
  do {
    let pipeline = sharp(source);
    if (width) pipeline = pipeline.resize({ width, withoutEnlargement: true, kernel: "lanczos3" });
    buffer = await pipeline.webp({ quality, effort: 5, smartSubsample: true }).toBuffer();
    quality -= 4;
  } while (buffer.length > maxBytes && quality >= 40);
  return buffer;
}

const kb = (n) => `${Math.round(n / 1024)}KB`;

for (const file of files.sort()) {
  const full = path.join(dir, file);
  if (/-mobile(?:-es)?\.webp$/.test(file)) {
    const source = await readFile(full);
    // Display ≤260 CSS; 520w covers DPR2 without shipping 1080 masters.
    const webp = await encodeWebp(source, { width: 520, maxBytes: 28 * 1024 });
    await writeFile(full, webp);
    const avifPath = full.replace(/\.webp$/, ".avif");
    const avif = await encodeAvif(source, { width: 520, maxBytes: 22 * 1024 });
    await writeFile(avifPath, avif);
    console.log(`${file}: → webp ${kb(webp.length)} / avif ${kb(avif.length)}`);
    continue;
  }
  if (/-desktop(?:-es)?\.avif$/.test(file)) {
    const source = await readFile(full);
    // Display ≤560–627 CSS; 960w is enough for DPR1.5–2 lab desktop.
    const avif = await encodeAvif(source, { width: 960, maxBytes: 48 * 1024 });
    await writeFile(full, avif);
    console.log(`${file}: → avif ${kb(avif.length)}`);
  }
}
