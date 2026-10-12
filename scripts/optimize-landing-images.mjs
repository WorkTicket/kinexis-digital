import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const source = path.resolve("public/assets/images/lp");
const destination = path.join(source, "optimized");
await fs.mkdir(destination, { recursive: true });
const names = (await fs.readdir(source)).filter((name) =>
  /^(hero-devices|a1-devices|plumbing-devices|manos-devices|colton-wehr|greenfield-|showcase-greenfield|showcase-a1-before|iphone-15-mockup).*\.webp$/.test(name),
);
let before = 0;
let after = 0;
for (const name of names) {
  const input = path.join(source, name);
  const output = path.join(destination, name);
  const width = name.includes("face") ? 96 : name.startsWith("greenfield-") || name.startsWith("showcase-") ? 960 : undefined;
  await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 68, effort: 6 }).toFile(output);
  before += (await fs.stat(input)).size;
  after += (await fs.stat(output)).size;
}
for (const width of [640, 960, 1280]) {
  await sharp(path.join(source, "manos-devices.webp"))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 68, effort: 6 })
    .toFile(path.join(destination, `manos-devices-${width}.webp`));
}
for (const tone of ["light", "dark"]) {
  await sharp(`public/assets/logos/kinexis-logo-on-${tone}.webp`)
    .resize({ width: 300, withoutEnlargement: true })
    .webp({ quality: 85, effort: 6 })
    .toFile(`public/assets/logos/kinexis-logo-on-${tone}-300.webp`);
}
console.log(`${names.length} images: ${(before / 1024 / 1024).toFixed(2)} MB → ${(after / 1024 / 1024).toFixed(2)} MB`);
