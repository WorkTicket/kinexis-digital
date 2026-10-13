import sharp from "sharp";
import path from "node:path";

// Match Next's configured widths exactly so srcset descriptors reflect the file.
const widths = [32, 64, 96, 128, 180, 256, 280, 360, 375, 640, 768, 1024, 1280, 1536];
const source = "public/assets/images/lp/hero-devices.webp";
for (const width of widths) {
  const output = path.join("public/assets/images/lp/optimized", `hero-devices-${width}-v3.avif`);
  const result = await sharp(source)
    .resize({ width, withoutEnlargement: true })
    .avif({ quality: 65, chromaSubsampling: "4:4:4", effort: 6 })
    .toFile(output);
  console.log(`${width}px: ${(result.size / 1024).toFixed(1)} KiB`);
}
