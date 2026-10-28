// Re-encodes the homepage film poster with enough edge detail for text and UI
// while preserving responsive AVIF/WebP candidates.
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const base = "public/assets/video/kinexis-explainer-v5f-preview-poster.webp";
const source = await readFile(base);
const widths = [640, 768, 960];

for (const width of widths) {
  const image = sharp(source).resize({ width, withoutEnlargement: true });
  const [webp, avif] = await Promise.all([
    image.clone().webp({ quality: 86, effort: 5, smartSubsample: true }).toBuffer(),
    image.clone().avif({ quality: 65, effort: 5, chromaSubsampling: "4:4:4" }).toBuffer(),
  ]);
  const prefix = base.replace(/\.webp$/, `-${width}`);
  await Promise.all([
    writeFile(`${prefix}.webp`, webp),
    writeFile(`${prefix}.avif`, avif),
  ]);
  console.log(`${width}w: ${Math.round(webp.length / 1024)}KB WebP / ${Math.round(avif.length / 1024)}KB AVIF`);
}

await Promise.all([
  writeFile(base, await sharp(source).webp({ quality: 86, effort: 5, smartSubsample: true }).toBuffer()),
  writeFile(base.replace(/\.webp$/, ".avif"), await sharp(source).avif({ quality: 65, effort: 5, chromaSubsampling: "4:4:4" }).toBuffer()),
]);
