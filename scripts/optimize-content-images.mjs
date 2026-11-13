// Generates the responsive AVIF/WebP variants used by the homepage section art
// and the blog cards. Run with: node scripts/optimize-content-images.mjs
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { rebuildFromMaster } from "./still-encode.mjs";

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
  "public/blog/monthly-website-vs-own-it.webp",
  "public/blog/missed-call-text-back-templates.webp",
  "public/blog/plumber-website-cost.webp",
  "public/blog/plumbing-website-pages.webp",
  "public/blog/hvac-website-cost.webp",
  "public/blog/hvac-website-pages.webp",
  "public/blog/electrician-website-cost.webp",
  "public/blog/electrician-website-pages.webp",
  "public/blog/roofing-website-cost.webp",
  "public/blog/roofing-website-pages.webp",
  "public/blog/garage-door-website-cost.webp",
  "public/blog/garage-door-website-pages.webp",
  "public/blog/painting-website-cost.webp",
  "public/blog/painting-website-pages.webp",
  "public/blog/remodeling-website-cost.webp",
  "public/blog/remodeling-website-pages.webp",
  "public/blog/landscaping-website-cost.webp",
  "public/blog/landscaping-website-pages.webp",
  "public/blog/pool-service-website-cost.webp",
  "public/blog/pool-service-website-pages.webp",
  "public/blog/pressure-washing-website-cost.webp",
  "public/blog/pressure-washing-website-pages.webp",
  "public/blog/window-cleaning-website-cost.webp",
  "public/blog/window-cleaning-website-pages.webp",
  "public/blog/lawn-care-website-cost.webp",
  "public/blog/lawn-care-website-pages.webp",
  "public/blog/how-to-ask-for-google-reviews-contractor.webp",
  "public/blog/missed-call-text-delayed-10dlc.webp",
  "public/blog/google-business-profile-vs-website.webp",
  "public/blog/freelancer-vs-agency-vs-subscription-website.webp",
  "public/blog/wix-vs-squarespace-vs-managed-website-contractors.webp",
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

const kb = (bytes) => `${Math.round(bytes / 1024)}KB`;

async function emit(input, width, format) {
  const output = input.replace(/\.webp$/, `-${width}.${format}`);
  const size = await rebuildFromMaster(input, output, { format, width });
  return { output, size: size ?? 0 };
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

// Portfolio cards and device previews are downscaled from the full export.
// Quality 86 matches the previous transfer size while keeping screenshot text.
const portfolioDir = "public/portfolio";
const portfolioFiles = (await readdir(portfolioDir)).filter((file) => file.endsWith(".webp"));
for (const file of portfolioFiles.filter((name) => !name.endsWith("-640.webp") && !name.includes("-devices"))) {
  const master = path.join(portfolioDir, file);
  await rebuildFromMaster(master, master.replace(/\.webp$/, "-640.webp"), { width: 640, webpQuality: 86 });
}
for (const file of portfolioFiles.filter((name) => name.endsWith("-devices.webp"))) {
  const master = path.join(portfolioDir, file);
  await rebuildFromMaster(master, master.replace(/\.webp$/, "-sm.webp"), { width: 768, webpQuality: 86 });
}

const brand = [
  ["public/assets/brand/rocket-launch-laptop.webp", "public/assets/brand/rocket-launch-laptop-sm.webp"],
  ["public/assets/brand/cobalt-brushstroke-arrow.webp", "public/assets/brand/cobalt-brushstroke-arrow-sm.webp"],
];
for (const [master, output] of brand) {
  const { width } = await sharp(await readFile(output)).metadata();
  await rebuildFromMaster(master, output, { width, webpQuality: 92 });
}

await rebuildFromMaster(
  "public/assets/logos/header-nav.webp",
  "public/assets/logos/header-nav-360.webp",
  { width: 360, webpQuality: 78 },
);
