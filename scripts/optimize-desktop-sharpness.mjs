/**
 * Desktop / high-DPI sharpness — larger candidates + high-q re-encodes.
 * Leaves mobile LCP files byte-identical (page-hero 480/640, poster 280/560/768,
 * case-study 400, card 400/480).
 *
 * Run: node scripts/optimize-desktop-sharpness.mjs
 * Refresh external high-resolution masters with:
 * KINEXIS_ARTWORK_DIR=... KINEXIS_PORTFOLIO_DIR=... node scripts/optimize-desktop-sharpness.mjs --refresh-masters
 */
import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

if (process.argv.includes("--refresh-masters")) {
  await import("./refresh-image-masters.mjs");
  process.exit(0);
}

const kb = (n) => `${Math.round(n / 1024)}KB`;
const WEBP_Q = 90;
const AVIF_Q = 80;
const CONCURRENCY = 6;

async function encodeFixed(
  master,
  output,
  { width, format, quality, photo = false, height, fit } = {},
) {
  const source = await readFile(master);
  let pipeline = sharp(source);
  if (width && height) {
    pipeline = pipeline.resize(width, height, {
      fit: fit ?? "cover",
      position: "top",
      kernel: "lanczos3",
      withoutEnlargement: true,
    });
  } else if (width) {
    pipeline = pipeline.resize({ width, withoutEnlargement: true, kernel: "lanczos3" });
  }
  const buffer =
    format === "avif"
      ? await pipeline
          .avif({
            quality,
            effort: 6,
            chromaSubsampling: photo ? "4:2:0" : "4:4:4",
          })
          .toBuffer()
      : await pipeline
          .webp({ quality, effort: 5, smartSubsample: false, alphaQuality: 100 })
          .toBuffer();
  await writeFile(output, buffer);
  return buffer.length;
}

async function mapPool(items, limit, fn) {
  const results = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return results;
}

async function job(label, master, output, opts) {
  const prev = await stat(output)
    .then((s) => s.size)
    .catch(() => 0);
  const next = await encodeFixed(master, output, opts);
  console.log(`  ${label}  ${kb(prev)} -> ${kb(next)}`);
  return next;
}

console.log("=== page-hero 960/1254 (WebP q90 / AVIF q80–86 4:4:4) — skip 480/640 LCP ===");
{
  const directory = "public/assets/heroes";
  const heroes = (await readdir(directory)).filter((f) => /-1254\.webp$/.test(f)).sort();
  const tasks = [];
  for (const file of heroes) {
    const master = path.join(directory, file);
    const base = master.replace(/-1254\.webp$/, "");
    const stem = path.basename(base);
    tasks.push(() =>
      job(`${stem}-960.webp`, master, `${base}-960.webp`, {
        width: 960,
        format: "webp",
        quality: WEBP_Q,
      }),
    );
    tasks.push(() =>
      job(`${stem}-960.avif`, master, `${base}-960.avif`, {
        width: 960,
        format: "avif",
        quality: AVIF_Q,
      }),
    );
    // Retina page-hero AVIF uses q86 (above the photo band) so sticker/line art stays crisp.
    tasks.push(() =>
      job(`${stem}-1254.avif`, master, `${base}-1254.avif`, {
        width: 1254,
        format: "avif",
        quality: 86,
      }),
    );
  }
  await mapPool(tasks, CONCURRENCY, (t) => t());
}

console.log("=== home poster 960 only (leave 280/560/768 LCP bytes untouched) ===");
{
  const master = "public/assets/video/kinexis-explainer-v5f-preview-poster.webp";
  await job("poster-960.webp", master, master.replace(/\.webp$/, "-960.webp"), {
    width: 960,
    format: "webp",
    quality: WEBP_Q,
  });
  await job("poster-960.avif", master, master.replace(/\.webp$/, "-960.avif"), {
    width: 960,
    format: "avif",
    quality: AVIF_Q,
    photo: true,
  });
}

console.log("=== portfolio cards 800 (4:4:4) — keep 400/480 ===");
{
  const dir = "public/portfolio";
  const cards = (await readdir(dir)).filter((n) => n.endsWith("-card.webp"));
  const tasks = [];
  for (const name of cards) {
    const cardMaster = path.join(dir, name);
    const liveMaster = path.join(dir, name.replace(/-card\.webp$/, ".webp"));
    const width = 800;
    const height = Math.round((width * 480) / 640);
    const webpOut = cardMaster.replace(/-card\.webp$/, `-card-${width}.webp`);
    const avifOut = cardMaster.replace(/-card\.webp$/, `-card-${width}.avif`);
    tasks.push(() =>
      job(path.basename(webpOut), liveMaster, webpOut, {
        width,
        height,
        fit: "cover",
        format: "webp",
        quality: WEBP_Q,
      }),
    );
    tasks.push(() =>
      job(path.basename(avifOut), liveMaster, avifOut, {
        width,
        height,
        fit: "cover",
        format: "avif",
        quality: AVIF_Q,
      }),
    );
  }
  await mapPool(tasks, CONCURRENCY, (t) => t());
}

console.log("=== case-study shots 662/800 + master AVIF (keep 400) ===");
{
  const dir = "public/portfolio";
  const lives = (await readdir(dir)).filter(
    (n) =>
      n.startsWith("live-") &&
      n.endsWith(".webp") &&
      !/-(card|320|400|640|662|800|1100)\.webp$/.test(n) &&
      !n.includes("-card"),
  );
  const tasks = [];
  for (const name of lives) {
    const master = path.join(dir, name);
    for (const width of [662, 800]) {
      tasks.push(() =>
        job(`${name}-${width}.webp`, master, master.replace(/\.webp$/, `-${width}.webp`), {
          width,
          format: "webp",
          quality: WEBP_Q,
        }),
      );
      tasks.push(() =>
        job(`${name}-${width}.avif`, master, master.replace(/\.webp$/, `-${width}.avif`), {
          width,
          format: "avif",
          quality: AVIF_Q,
        }),
      );
    }
    tasks.push(() =>
      job(`${name}.avif`, master, master.replace(/\.webp$/, ".avif"), {
        format: "avif",
        quality: AVIF_Q,
      }),
    );
  }
  await mapPool(tasks, CONCURRENCY, (t) => t());
}

// Template full-page 320/640 stay at tip bytes (industry/home ShotFrame mobile picks 640).
// Case-study live masters already refresh 662/800 + 1100 AVIF above.

console.log("done");
