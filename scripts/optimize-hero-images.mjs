// Generates AVIF alternatives for the pre-sized page hero artwork.
// Run with: npm run images:heroes
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const directory = "public/assets/heroes";
const pageHeroes = (await readdir(directory))
  .filter((file) => /-(?:640|960|1254)\.webp$/.test(file))
  .map((file) => path.join(directory, file));
const industryDirectory = "public/assets/industries";
const industryHeroes = (await readdir(industryDirectory, { recursive: true, withFileTypes: true }))
  .filter((entry) => entry.isFile() && /^hero(?:-768)?\.webp$/.test(entry.name))
  .map((entry) => path.join(entry.parentPath, entry.name));
const files = [...pageHeroes, ...industryHeroes].sort();

for (const input of files) {
  const output = input.replace(/\.webp$/, ".avif");
  const source = await readFile(input);
  // Hero art has hard outlines and small interface details; 4:4:4 chroma and
  // moderate quality avoid the soft edges produced by the old quality-55 files.
  const encoded = await sharp(source)
    .avif({ quality: 65, effort: 5, chromaSubsampling: "4:4:4" })
    .toBuffer();
  await writeFile(output, encoded);
  console.log(`${input} -> ${output} (${Math.round(encoded.length / 1024)}KB)`);
}
