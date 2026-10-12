import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const destination = "public/assets/images/home/optimized";
await fs.mkdir(destination, { recursive: true });
const inputs = [];
for (const directory of ["services", "industries", "case-studies"]) {
  for (const filename of await fs.readdir(`public/assets/images/${directory}`)) {
    if (directory === "services" ? /^service-.*\.webp$/.test(filename)
      : directory === "industries" ? /^industry-.*-thumb\.webp$/.test(filename)
        : /^(landscaping-company-growth|plumbing-company-growth|ecommerce-store-growth)\.webp$/.test(filename)) {
      inputs.push(`public/assets/images/${directory}/${filename}`);
    }
  }
}
let original = 0;
let mobile = 0;
for (const input of inputs) {
  original += (await fs.stat(input)).size;
  const name = path.basename(input, ".webp");
  for (const width of [640, 960, 1536]) {
    const output = `${destination}/${name}-${width}.webp`;
    await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 72, effort: 4 }).toFile(output);
    if (width === 640) mobile += (await fs.stat(output)).size;
  }
}
console.log(`${inputs.length} image originals: ${(original / 1024 / 1024).toFixed(2)} MB; mobile derivatives: ${(mobile / 1024 / 1024).toFixed(2)} MB`);
