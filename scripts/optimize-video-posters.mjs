// Rebuilds responsive poster derivatives from the full WebP master.
// The master file is left as exported so a later run cannot soften it.
import { rebuildFromMaster } from "./still-encode.mjs";

const base = "public/assets/video/kinexis-explainer-v5f-preview-poster.webp";
// 280/560 match IMAGE_SIZES.heroFilm (270 mobile / 560 desktop); 768 covers 2× DPR.
const widths = [280, 560, 768];

for (const width of widths) {
  const prefix = base.replace(/\.webp$/, `-${width}`);
  const maxBytes = width <= 280 ? 12 * 1024 : width <= 560 ? 22 * 1024 : 36 * 1024;
  await rebuildFromMaster(base, `${prefix}.webp`, { width, webpQuality: 78, maxBytes });
  await rebuildFromMaster(base, `${prefix}.avif`, {
    format: "avif",
    width,
    photo: true,
    maxBytes: Math.round(maxBytes * 0.85),
  });
}

await rebuildFromMaster(base, base.replace(/\.webp$/, ".avif"), { format: "avif" });
