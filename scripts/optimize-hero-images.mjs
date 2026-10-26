// Generates AVIF alternatives for the pre-sized page hero artwork.
// Run with: npm run images:heroes
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const directory = "public/assets/heroes";
const files = (await readdir(directory))
  .filter((file) => /-(?:640|960|1254)\.webp$/.test(file))
  .sort();

for (const file of files) {
  const input = path.join(directory, file);
  const output = input.replace(/\.webp$/, ".avif");
  const source = await readFile(input);
  const encoded = await sharp(source).avif({ quality: 55, effort: 5 }).toBuffer();
  await writeFile(output, encoded);
  console.log(`${file} -> ${path.basename(output)} (${Math.round(encoded.length / 1024)}KB)`);
}
