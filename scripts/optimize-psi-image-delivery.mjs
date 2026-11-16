/**
 * PSI Perf 100 — image-delivery variants (historical; superseded for fidelity by
 * scripts/optimize-image-quality-pass.mjs which re-encodes at WebP q~85 / AVIF q~65–68
 * and adds sticker 480w, card 800w, and case-study 400w).
 *
 * Prefer: node scripts/optimize-image-quality-pass.mjs
 * Legacy: node scripts/optimize-psi-image-delivery.mjs
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { rebuildFromMaster } from "./still-encode.mjs";

const kb = (n) => `${Math.round(n / 1024)}KB`;

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

console.log("=== stickers 240/400 ===");
for (const input of STICKERS) {
  for (const width of [240, 400]) {
    const maxWebp = width <= 240 ? 10 * 1024 : 16 * 1024;
    const maxAvif = width <= 240 ? 8 * 1024 : 12 * 1024;
    const webp = await rebuildFromMaster(input, input.replace(/\.webp$/, `-${width}.webp`), {
      width,
      webpQuality: width <= 240 ? 72 : 78,
      maxBytes: maxWebp,
    });
    const avif = await rebuildFromMaster(input, input.replace(/\.webp$/, `-${width}.avif`), {
      width,
      format: "avif",
      maxBytes: maxAvif,
    });
    console.log(`  ${path.basename(input)} ${width}w  webp ${kb(webp ?? 0)} / avif ${kb(avif ?? 0)}`);
  }
}

console.log("=== footer logo 210/420 ===");
{
  const master = "public/assets/logos/footer-nav.webp";
  const source = await readFile(master);
  for (const width of [210, 420]) {
    let q = 82;
    let buf;
    for (; q >= 60; q -= 4) {
      buf = await sharp(source)
        .resize({ width, withoutEnlargement: true, kernel: "lanczos3" })
        .webp({ quality: q, effort: 5, smartSubsample: true })
        .toBuffer();
      if (buf.length <= (width <= 210 ? 8 * 1024 : 14 * 1024)) break;
    }
    const out = master.replace(/\.webp$/, `-${width}.webp`);
    await writeFile(out, buf);
    console.log(`  footer-nav-${width}.webp ${kb(buf.length)} q=${q}`);
  }
}

console.log("=== blog 768w ===");
{
  const blogDir = "public/blog";
  const masters = (await readdir(blogDir)).filter(
    (name) => name.endsWith(".webp") && !/-\d+\.webp$/.test(name),
  );
  for (const name of masters) {
    const input = path.join(blogDir, name);
    const webp = await rebuildFromMaster(input, input.replace(/\.webp$/, "-768.webp"), {
      width: 768,
      webpQuality: 82,
      maxBytes: 48 * 1024,
    });
    const avif = await rebuildFromMaster(input, input.replace(/\.webp$/, "-768.avif"), {
      width: 768,
      format: "avif",
      photo: true,
      maxBytes: 40 * 1024,
    });
    console.log(`  ${name} 768w  webp ${kb(webp ?? 0)} / avif ${kb(avif ?? 0)}`);
  }
}

console.log("=== portfolio live cards 400/480 ===");
{
  const dir = "public/portfolio";
  const cards = (await readdir(dir)).filter((n) => n.endsWith("-card.webp"));
  for (const name of cards) {
    const master = path.join(dir, name);
    const source = await readFile(master);
    for (const width of [400, 480]) {
      const height = Math.round((width * 480) / 640);
      let q = 78;
      let webp;
      for (; q >= 58; q -= 4) {
        webp = await sharp(source)
          .resize(width, height, { fit: "cover", position: "top" })
          .webp({ quality: q, effort: 5, smartSubsample: true })
          .toBuffer();
        if (webp.length <= (width <= 400 ? 22 * 1024 : 28 * 1024)) break;
      }
      const webpOut = master.replace(/-card\.webp$/, `-card-${width}.webp`);
      await writeFile(webpOut, webp);
      let aq = 62;
      let avif;
      for (; aq >= 40; aq -= 4) {
        avif = await sharp(source)
          .resize(width, height, { fit: "cover", position: "top" })
          .avif({ quality: aq, effort: 6, chromaSubsampling: "4:2:0" })
          .toBuffer();
        if (avif.length <= (width <= 400 ? 16 * 1024 : 20 * 1024)) break;
      }
      const avifOut = master.replace(/-card\.webp$/, `-card-${width}.avif`);
      await writeFile(avifOut, avif);
      console.log(
        `  ${path.basename(webpOut)} ${kb(webp.length)} / ${path.basename(avifOut)} ${kb(avif.length)}`,
      );
    }
  }
}

console.log("=== case-study full shots 662/800 ===");
{
  const dir = "public/portfolio";
  const lives = (await readdir(dir)).filter(
    (n) => n.startsWith("live-") && n.endsWith(".webp") && !/-(card|320|640|662|800|1100)\.webp$/.test(n) && !n.includes("-card"),
  );
  for (const name of lives) {
    const master = path.join(dir, name);
    for (const width of [662, 800]) {
      const webp = await rebuildFromMaster(master, master.replace(/\.webp$/, `-${width}.webp`), {
        width,
        webpQuality: 80,
        maxBytes: width <= 662 ? 120 * 1024 : 160 * 1024,
      });
      const avif = await rebuildFromMaster(master, master.replace(/\.webp$/, `-${width}.avif`), {
        width,
        format: "avif",
        photo: true,
        maxBytes: width <= 662 ? 90 * 1024 : 120 * 1024,
      });
      console.log(`  ${name} ${width}w  webp ${kb(webp ?? 0)} / avif ${kb(avif ?? 0)}`);
    }
  }
}

console.log("done");
