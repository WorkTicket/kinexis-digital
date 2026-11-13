// Rebuilds page and industry hero derivatives from the largest WebP master.
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
    await rebuildFromMaster(master, `${base}-${width}.webp`);
    // Never let the LCP AVIF grow past what already scores 100 in lab.
    await rebuildFromMaster(master, `${base}-${width}.avif`, {
      format: "avif",
      maxBytes: width <= 480 ? 32 * 1024 : width <= 640 ? 55 * 1024 : 110 * 1024,
    });
  }
  await rebuildFromMaster(master, `${base}-1254.avif`, { format: "avif" });
}

const industryDirectory = "public/assets/industries";
const industries = (await readdir(industryDirectory, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

for (const name of industries) {
  const master = path.join(industryDirectory, name, "hero.webp");
  // Pages never reference the master WebP (often 300–700KB). Serve capped
  // derivatives only: 480 mobile 2x, 768 mobile 3x / desktop 1x, 960 desktop 2x.
  for (const width of [480, 768, 960]) {
    await rebuildFromMaster(master, path.join(industryDirectory, name, `hero-${width}.webp`), {
      width,
      webpQuality: width <= 480 ? 80 : 82,
    });
    await rebuildFromMaster(master, path.join(industryDirectory, name, `hero-${width}.avif`), {
      format: "avif",
      width,
      photo: true,
      maxBytes: width <= 480 ? 45 * 1024 : width <= 768 ? 85 * 1024 : 140 * 1024,
    });
  }
  await rebuildFromMaster(master, path.join(industryDirectory, name, "hero.avif"), {
    format: "avif",
    photo: true,
    maxBytes: 220 * 1024,
  });
}
