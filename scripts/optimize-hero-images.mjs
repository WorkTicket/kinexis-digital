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
    await rebuildFromMaster(master, `${base}-${width}.avif`, { format: "avif" });
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
  await rebuildFromMaster(master, path.join(industryDirectory, name, "hero-768.webp"));
  await rebuildFromMaster(master, path.join(industryDirectory, name, "hero-768.avif"), { format: "avif" });
  await rebuildFromMaster(master, path.join(industryDirectory, name, "hero.avif"), { format: "avif" });
}
