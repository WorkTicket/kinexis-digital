/**
 * Bake each portfolio homepage hero into the Lighthouse 100 template gray box.
 * Output: public/portfolio/{slug}-scores.webp (~25KB each).
 *
 * Usage: node scripts/build-pagespeed-scores.mjs
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public/portfolio");
const LOCAL_TPL = path.join(ROOT, "public/assets/brand/lighthouse-100-source.png");

/** Gray panel including the thin border (1024×530 template). */
const LEFT = 605;
const TOP = 216;
const BOX_W = 365;
const BOX_H = 255;

function templatePath() {
  if (process.env.PAGESPEED_TEMPLATE && fs.existsSync(process.env.PAGESPEED_TEMPLATE)) {
    return process.env.PAGESPEED_TEMPLATE;
  }
  if (fs.existsSync(LOCAL_TPL)) return LOCAL_TPL;
  return path.join(ROOT, "public/assets/brand/lighthouse-100.webp");
}

async function buildOne(tpl, file) {
  const slug = file.replace(/\.webp$/, "");
  const shot640 = path.join(OUT_DIR, `${slug}-640.webp`);
  const shotFull = path.join(OUT_DIR, file);
  const src = fs.existsSync(shot640) ? shot640 : shotFull;
  const meta = await sharp(src).metadata();
  const cropH = Math.min(meta.height, Math.round((meta.width * BOX_H) / BOX_W));
  const hero = await sharp(src)
    .extract({ left: 0, top: 0, width: meta.width, height: cropH })
    .resize(BOX_W, BOX_H, { fit: "cover", position: "top" })
    .toBuffer();
  const out = path.join(OUT_DIR, `${slug}-scores.webp`);
  await sharp(tpl)
    .composite([{ input: hero, left: LEFT, top: TOP }])
    .webp({ quality: 82, effort: 5 })
    .toFile(out);
  return { slug, bytes: fs.statSync(out).size };
}

const files = fs
  .readdirSync(OUT_DIR)
  .filter(
    (f) =>
      f.endsWith(".webp") &&
      !f.includes("-640") &&
      !f.includes("-devices") &&
      !f.includes("-scores") &&
      !f.startsWith("live-"),
  );

const tpl = templatePath();
const results = [];
for (const file of files) results.push(await buildOne(tpl, file));
for (const r of results) console.log(`${r.slug}: ${Math.round(r.bytes / 1024)}kb`);
console.log(`built ${results.length} pagespeed composites from ${path.basename(tpl)}`);
