// Rebuilds page hero derivatives from the largest WebP master.
// Run with: npm run images:heroes
import { readdir } from "node:fs/promises";
import path from "node:path";
import { rebuildFromMaster } from "./still-encode.mjs";

const directory = "public/assets/heroes";
const heroes = (await readdir(directory)).filter((file) => /-1254\.webp$/.test(file)).sort();

for (const file of heroes) {
  const master = path.join(directory, file);
  const base = master.replace(/-1254\.webp$/, "");
  for (const width of [480, 640, 960]) {
    await rebuildFromMaster(master, `${base}-${width}.webp`, {
      webpQuality: width <= 640 ? 85 : 90,
    });
    // 480w ≈ mobile 2× for ~260 CSS; allow q~65–70 (visually lossless) instead of a 22KB crush.
    await rebuildFromMaster(master, `${base}-${width}.avif`, {
      format: "avif",
      maxBytes: width <= 480 ? 32 * 1024 : width <= 640 ? 42 * 1024 : 90 * 1024,
    });
  }
  await rebuildFromMaster(master, `${base}-1254.avif`, { format: "avif" });
}
