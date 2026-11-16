/**
 * Image quality pass — visually lossless re-encodes + missing 2x / mobile candidates.
 * Stickers 240/400/480, footer 210/420, portfolio cards 400/480/800,
 * case-study full shots 400/662/800 (+ master 1100), page-hero AVIFs at q~65–70.
 *
 * Run: node scripts/optimize-image-quality-pass.mjs
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { rebuildFromMaster } from "./still-encode.mjs";

const kb = (n) => `${Math.round(n / 1024)}KB`;
const WEBP_Q = 85;
const AVIF_DETAIL_Q = 68;
const AVIF_PHOTO_Q = 65;

const STICKERS = [
  "public/assets/kinexis/stickers/60-day_tracked-lead_guarantee_badge.webp",
  "public/assets/kinexis/stickers/zero-down-website-97.webp",
  "public/assets/kinexis/stickers/zero-down-lead-system-197.webp",
  "public/assets/kinexis/stickers/zero-down-plus-297.webp",
  "public/assets/kinexis/stickers/zero-down-own-it-1497.webp",
  "public/assets/kinexis/stickers/plan-name-website-97.webp",
  "public/assets/kinexis/stickers/plan-name-lead-system-197.webp",
  "public/assets/kinexis/stickers/plan-name-plus-297.webp",
  "public/assets/kinexis/stickers/plan-name-own-it-1497.webp",
  "public/assets/kinexis/stickers/sin-anticipo-sitio-web-97.webp",
  "public/assets/kinexis/stickers/sin-anticipo-sistema-clientes-197.webp",
  "public/assets/kinexis/stickers/sin-anticipo-plus-297.webp",
  "public/assets/kinexis/stickers/sin-anticipo-hazlo-tuyo-1497.webp",
  "public/assets/kinexis/stickers/planes-sitio-web-97.webp",
  "public/assets/kinexis/stickers/planes-sistema-clientes-197.webp",
  "public/assets/kinexis/stickers/planes-plus-297.webp",
  "public/assets/kinexis/stickers/planes-hazlo-tuyo-1497.webp",
];

async function encodeFixed(master, output, { width, format, quality, photo = false, height, fit } = {}) {
  const source = await readFile(master);
  let pipeline = sharp(source);
  if (width && height) {
    pipeline = pipeline.resize(width, height, { fit: fit ?? "cover", position: "top", kernel: "lanczos3" });
  } else if (width) {
    pipeline = pipeline.resize({ width, withoutEnlargement: true, kernel: "lanczos3" });
  }
  const buffer =
    format === "avif"
      ? await pipeline
          .avif({
            quality,
            effort: 7,
            chromaSubsampling: photo ? "4:2:0" : "4:4:4",
          })
          .toBuffer()
      : await pipeline
          .webp({ quality, effort: 5, smartSubsample: false, alphaQuality: 100 })
          .toBuffer();
  await writeFile(output, buffer);
  return buffer.length;
}

console.log("=== stickers 240/400/480 (WebP q85 / AVIF q68) ===");
for (const input of STICKERS) {
  for (const width of [240, 400, 480]) {
    const webp = await encodeFixed(input, input.replace(/\.webp$/, `-${width}.webp`), {
      width,
      format: "webp",
      quality: WEBP_Q,
    });
    const avif = await encodeFixed(input, input.replace(/\.webp$/, `-${width}.avif`), {
      width,
      format: "avif",
      quality: AVIF_DETAIL_Q,
    });
    console.log(`  ${path.basename(input)} ${width}w  webp ${kb(webp)} / avif ${kb(avif)}`);
  }
}

console.log("=== footer logo 210/420 (WebP q85) ===");
{
  const master = "public/assets/logos/footer-nav.webp";
  for (const width of [210, 420]) {
    const size = await encodeFixed(master, master.replace(/\.webp$/, `-${width}.webp`), {
      width,
      format: "webp",
      quality: WEBP_Q,
    });
    console.log(`  footer-nav-${width}.webp ${kb(size)}`);
  }
}

console.log("=== portfolio cards 400/480/800 (WebP q85 / AVIF q65) ===");
{
  const dir = "public/portfolio";
  const cards = (await readdir(dir)).filter((n) => n.endsWith("-card.webp"));
  for (const name of cards) {
    const cardMaster = path.join(dir, name);
    const liveMaster = path.join(dir, name.replace(/-card\.webp$/, ".webp"));
    for (const width of [400, 480, 800]) {
      const height = Math.round((width * 480) / 640);
      // 800w needs the full live master (card crop master is only 640w).
      const sourcePath = width > 640 ? liveMaster : cardMaster;
      const webpOut = cardMaster.replace(/-card\.webp$/, `-card-${width}.webp`);
      const avifOut = cardMaster.replace(/-card\.webp$/, `-card-${width}.avif`);
      const webp = await encodeFixed(sourcePath, webpOut, {
        width,
        height,
        fit: "cover",
        format: "webp",
        quality: WEBP_Q,
      });
      const avif = await encodeFixed(sourcePath, avifOut, {
        width,
        height,
        fit: "cover",
        format: "avif",
        quality: AVIF_PHOTO_Q,
        photo: true,
      });
      console.log(`  ${path.basename(webpOut)} ${kb(webp)} / ${path.basename(avifOut)} ${kb(avif)}`);
    }
  }
}

console.log("=== case-study full shots 400/662/800 (WebP q85 / AVIF q65) ===");
{
  const dir = "public/portfolio";
  const lives = (await readdir(dir)).filter(
    (n) =>
      n.startsWith("live-") &&
      n.endsWith(".webp") &&
      !/-(card|320|400|640|662|800|1100)\.webp$/.test(n) &&
      !n.includes("-card"),
  );
  for (const name of lives) {
    const master = path.join(dir, name);
    for (const width of [400, 662, 800]) {
      const webp = await encodeFixed(master, master.replace(/\.webp$/, `-${width}.webp`), {
        width,
        format: "webp",
        quality: WEBP_Q,
      });
      const avif = await encodeFixed(master, master.replace(/\.webp$/, `-${width}.avif`), {
        width,
        format: "avif",
        quality: AVIF_PHOTO_Q,
        photo: true,
      });
      console.log(`  ${name} ${width}w  webp ${kb(webp)} / avif ${kb(avif)}`);
    }
  }
}

console.log("=== page-hero 480/640 AVIF at q68 (keep LCP preload widths) ===");
{
  const directory = "public/assets/heroes";
  const heroes = (await readdir(directory)).filter((file) => /-1254\.webp$/.test(file)).sort();
  for (const file of heroes) {
    const master = path.join(directory, file);
    const base = master.replace(/-1254\.webp$/, "");
    for (const width of [480, 640]) {
      // Fixed q — no 22KB crush. 480w remains the mobile 2x LCP candidate (~260 CSS).
      const avif = await encodeFixed(master, `${base}-${width}.avif`, {
        width,
        format: "avif",
        quality: AVIF_DETAIL_Q,
      });
      const webp = await encodeFixed(master, `${base}-${width}.webp`, {
        width,
        format: "webp",
        quality: WEBP_Q,
      });
      console.log(`  ${path.basename(base)} ${width}w  webp ${kb(webp)} / avif ${kb(avif)}`);
    }
  }
}

console.log("=== industry hero 480 AVIF at q65 photo ===");
{
  const industryDirectory = "public/assets/industries";
  const industries = (await readdir(industryDirectory, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  for (const name of industries) {
    const master = path.join(industryDirectory, name, "hero.webp");
    const avif = await encodeFixed(master, path.join(industryDirectory, name, "hero-480.avif"), {
      width: 480,
      format: "avif",
      quality: AVIF_PHOTO_Q,
      photo: true,
    });
    const webp = await encodeFixed(master, path.join(industryDirectory, name, "hero-480.webp"), {
      width: 480,
      format: "webp",
      quality: WEBP_Q,
    });
    console.log(`  ${name} 480w  webp ${kb(webp)} / avif ${kb(avif)}`);
  }
}

console.log("done");
