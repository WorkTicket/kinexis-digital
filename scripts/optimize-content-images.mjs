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
