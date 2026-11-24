/** Crush industry *-mobile.webp / *-desktop.avif LCP pair used on live release/2. */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = "public/assets/industries";
const dirs = (await readdir(root, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name);

async function encodeAvif(source, width, maxBytes) {
  let quality = 52;
  let buffer;
  do {
    buffer = await sharp(source)
      .resize({ width, withoutEnlargement: true, kernel: "lanczos3" })
      .avif({ quality, effort: 7, chromaSubsampling: "4:2:0" })
      .toBuffer();
    quality -= 4;
  } while (buffer.length > maxBytes && quality >= 28);
  return buffer;
}

async function encodeWebp(source, width, maxBytes) {
  let quality = 70;
  let buffer;
  do {
    buffer = await sharp(source)
      .resize({ width, withoutEnlargement: true, kernel: "lanczos3" })
      .webp({ quality, effort: 5, smartSubsample: true })
      .toBuffer();
    quality -= 4;
  } while (buffer.length > maxBytes && quality >= 40);
  return buffer;
}

for (const name of dirs.sort()) {
  const mobilePath = path.join(root, name, `${name}-mobile.webp`);
  const desktopPath = path.join(root, name, `${name}-desktop.avif`);
  try {
    const mobileSrc = await readFile(mobilePath);
    const webp = await encodeWebp(mobileSrc, 640, 32 * 1024);
    await writeFile(mobilePath, webp);
    const avif = await encodeAvif(mobileSrc, 640, 24 * 1024);
    await writeFile(mobilePath.replace(/\.webp$/, ".avif"), avif);
    console.log(`${name}-mobile: webp ${Math.round(webp.length / 1024)}KB avif ${Math.round(avif.length / 1024)}KB`);
  } catch {
    /* missing */
  }
  try {
    const desktopSrc = await readFile(desktopPath);
    const avif = await encodeAvif(desktopSrc, 1120, 55 * 1024);
    await writeFile(desktopPath, avif);
    console.log(`${name}-desktop: avif ${Math.round(avif.length / 1024)}KB`);
  } catch {
    /* missing */
  }
}
