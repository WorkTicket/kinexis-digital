// Rebuilds responsive poster derivatives from the full WebP master.
// The master file is left as exported so a later run cannot soften it.
import { rebuildFromMaster } from "./still-encode.mjs";

const base = "public/assets/video/kinexis-explainer-v5f-preview-poster.webp";
const widths = [480, 640, 768, 960];

for (const width of widths) {
  const prefix = base.replace(/\.webp$/, `-${width}`);
  await rebuildFromMaster(base, `${prefix}.webp`, { width });
  await rebuildFromMaster(base, `${prefix}.avif`, { format: "avif", width });
}

await rebuildFromMaster(base, base.replace(/\.webp$/, ".avif"), { format: "avif" });
