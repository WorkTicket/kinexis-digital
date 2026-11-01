// Generates the responsive AVIF/WebP variants used by the homepage section art
// and the blog cards. Run with: node scripts/optimize-content-images.mjs
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const HOME = [
  "public/assets/home/built-for-your-trade.webp",
  "public/assets/home/what-every-site-includes.webp",
  "public/assets/home/google-reviews-handled.webp",
];
// 1280w keeps 600px-wide artwork crisp on 2x displays without sending the
// original 1536w file. Smaller candidates preserve mobile performance.
const HOME_WIDTHS = [640, 768, 1120, 1280];

const BLOG = [
  "public/blog/website-mistakes-that-cost-you-calls.webp",
  "public/blog/turn-clicks-into-calls.webp",
  "public/blog/small-business-marketing-budget.webp",
  "public/blog/make-your-website-mobile-ready.webp",
  "public/blog/get-found-and-calls-from-google-new.webp",
  "public/blog/build-trust-with-reviews.webp",
];
const BLOG_WIDTHS = [640, 960];

const AUDIT = ["public/assets/audit/hero.webp"];
const AUDIT_WIDTHS = [480, 768, 960];

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
const STICKER_WIDTHS = [400, 800];

// These images contain UI text and hard illustration edges. The previous AVIF
// quality of 55 visibly softened them; these settings retain edge detail while
// remaining substantially smaller than the source files.
const WEBP = { quality: 86, effort: 5, smartSubsample: true };
const AVIF = { quality: 65, effort: 5, chromaSubsampling: "4:4:4" };

const kb = (bytes) => `${Math.round(bytes / 1024)}KB`;

async function emit(input, width, format) {
  const output = width
    ? input.replace(/\.webp$/, `-${width}.${format}`)
    : input.replace(/\.webp$/, `.${format}`);
  // Read first so Sharp does not keep the input file open while replacing it
  // on Windows.
  const source = await readFile(input);
  const buffer = await sharp(source)
    .resize({ width: width || undefined, withoutEnlargement: true })
    [format](format === "webp" ? WEBP : AVIF)
    .toBuffer();
  await writeFile(output, buffer);
  return { output, size: buffer.length };
}

for (const input of HOME) {
  const { width, height } = await sharp(input).metadata();
  if (!width || !height) throw new Error(`Invalid image: ${input}`);
  const sizes = [`${path.basename(input)} ${width}w`];
  for (const w of HOME_WIDTHS) {
    const webp = await emit(input, w, "webp");
    const avif = await emit(input, w, "avif");
    sizes.push(`-${w}.webp ${kb(webp.size)} / -${w}.avif ${kb(avif.size)}`);
  }
  console.log(input);
  console.log(`  ${sizes.join(", ")}`);
}

for (const input of BLOG) {
  const { width } = await sharp(input).metadata();
  if (!width) throw new Error(`Invalid image: ${input}`);
  for (const w of BLOG_WIDTHS) {
    const webp = await emit(input, w, "webp");
    const avif = await emit(input, w, "avif");
    console.log(`${input}: ${w}w ${kb(webp.size)} webp / ${kb(avif.size)} avif`);
  }
}

for (const input of [...AUDIT, ...STICKERS]) {
  const widths = AUDIT.includes(input) ? AUDIT_WIDTHS : STICKER_WIDTHS;
  for (const width of widths) {
    const webp = await emit(input, width, "webp");
    const avif = await emit(input, width, "avif");
    console.log(`${input}: ${width}w ${kb(webp.size)} webp / ${kb(avif.size)} avif`);
  }
}
