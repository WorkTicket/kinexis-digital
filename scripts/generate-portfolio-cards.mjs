/**
 * Crop top 4:3 cards from tall portfolio screenshots so listing pages
 * do not download multi-thousand-pixel scroll captures.
 * Run: node scripts/generate-portfolio-cards.mjs
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = "public/portfolio";
const WIDTH = 640;
const HEIGHT = 480;
const MAX_BYTES = 55 * 1024;

const files = (await readdir(DIR))
  .filter((name) => /-640\.webp$/.test(name) && !name.includes("-scores-"))
  .sort();

let written = 0;
for (const name of files) {
  const srcPath = path.join(DIR, name);
  const outPath = srcPath.replace(/-640\.webp$/, "-card.webp");
  const source = await readFile(srcPath);
  let quality = 78;
  let buffer;
  for (; quality >= 60; quality -= 4) {
    buffer = await sharp(source)
      .resize(WIDTH, HEIGHT, { fit: "cover", position: "top" })
      .webp({ quality, effort: 5, smartSubsample: true })
      .toBuffer();
    if (buffer.length <= MAX_BYTES) break;
  }
  await writeFile(outPath, buffer);
  written += 1;
  console.log(`OK  ${path.basename(outPath)} (${Math.round(buffer.length / 1024)} KB, q=${quality})`);
}

console.log(`\nGenerated ${written} portfolio card crops.`);
