/**
 * Width variants for hover-scroll portfolio screenshots.
 * Lab/PSI: ~280px / 46vw slots were downloading 640×tall masters (~150–190 KiB).
 * Emit 320w WebP+AVIF and 640w AVIF from each *-640.webp master.
 * Run: node scripts/generate-portfolio-shot-widths.mjs
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = "public/portfolio";

const files = (await readdir(DIR))
  .filter((name) => /-640\.webp$/.test(name) && !name.includes("-scores-"))
  .sort();

let written = 0;
for (const name of files) {
  const srcPath = path.join(DIR, name);
  const source = await readFile(srcPath);
  const stem = name.replace(/-640\.webp$/, "");

  let wq = 82;
  let webp;
  for (; wq >= 64; wq -= 4) {
    webp = await sharp(source)
      .resize({ width: 320, withoutEnlargement: true, kernel: "lanczos3" })
      .webp({ quality: wq, effort: 4, smartSubsample: true, alphaQuality: 100 })
      .toBuffer();
    if (webp.length <= 70 * 1024) break;
  }
  await writeFile(path.join(DIR, `${stem}-320.webp`), webp);
  written += 1;

  let aq = 68;
  let avif320;
  for (; aq >= 44; aq -= 4) {
    avif320 = await sharp(source)
      .resize({ width: 320, withoutEnlargement: true, kernel: "lanczos3" })
      .avif({ quality: aq, effort: 3, chromaSubsampling: "4:2:0" })
      .toBuffer();
    if (avif320.length <= 55 * 1024) break;
  }
  await writeFile(path.join(DIR, `${stem}-320.avif`), avif320);
  written += 1;

  let aq640 = 70;
  let avif640;
  for (; aq640 >= 48; aq640 -= 4) {
    avif640 = await sharp(source)
      .avif({ quality: aq640, effort: 2, chromaSubsampling: "4:2:0" })
      .toBuffer();
    if (avif640.length <= 120 * 1024) break;
  }
  await writeFile(path.join(DIR, `${stem}-640.avif`), avif640);
  written += 1;

  // The 800w detail-page candidate must come from the 1600w master, not the
  // 640w derivative, so desktop DPR 1 gets a suitably sharp image without
  // downloading the full master. DPR 2 continues to use the genuine master.
  const master = await readFile(path.join(DIR, `${stem}.webp`));
  const detailVariants = [];
  for (const width of [800, 960]) {
    let webpDetail;
    let quality = 88;
    for (; quality >= 72; quality -= 4) {
      webpDetail = await sharp(master)
        .resize({ width, withoutEnlargement: true, kernel: "lanczos3" })
        .webp({ quality, effort: 5, smartSubsample: true, alphaQuality: 100 })
        .toBuffer();
      if (webpDetail.length <= 600 * 1024) break;
    }
    await writeFile(path.join(DIR, `${stem}-${width}.webp`), webpDetail);
    detailVariants.push(`${width}.webp ${Math.round(webpDetail.length / 1024)}k`);
    written += 1;
  }

  console.log(
    `OK  ${stem}: 320.webp ${Math.round(webp.length / 1024)}k / 320.avif ${Math.round(avif320.length / 1024)}k / 640.avif ${Math.round(avif640.length / 1024)}k / ${detailVariants.join(" / ")}`,
  );
}

console.log(`\nWrote ${written} portfolio shot width variants.`);
