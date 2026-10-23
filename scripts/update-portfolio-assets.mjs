import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("design-source/portfolio/full-pages");
const dataPath = "src/data/portfolio.ts";
let data = await readFile(dataPath, "utf8");
const projects = [...data.matchAll(/\{ slug: "([^"]+)"[^\n]+/g)];
const desktops = await readdir(path.join(root, "Desktop"));
const inputs = await Promise.all(projects.map(async ([line, slug]) => {
  const file = desktops.find((name) => name.toLowerCase() === `${slug}-desktop-full.webp`);
  if (!file) throw new Error(`Missing desktop screenshot: ${slug}`);
  const mobile = path.join(root, "Mobile", file.replace("-Desktop-", "-Mobile-"));
  await sharp(mobile).metadata();
  const source = path.join(root, "Desktop", file);
  const metadata = await sharp(source).metadata();
  if (!metadata.width || !metadata.height) throw new Error(`Invalid screenshot: ${file}`);
  return { line, slug, source };
}));

for (const { line, slug, source } of inputs) {
  const full = await sharp(source).resize({ width: 1100 }).webp({ quality: 88 }).toBuffer({ resolveWithObject: true });
  const small = await sharp(source).resize({ width: 640 }).webp({ quality: 85 }).toBuffer();
  await writeFile(`public/portfolio/${slug}.webp`, full.data);
  await writeFile(`public/portfolio/${slug}-640.webp`, small);
  const devices = await sharp(`public/portfolio/${slug}-devices.webp`).resize({ width: 768 }).webp({ quality: 85 }).toBuffer();
  await writeFile(`public/portfolio/${slug}-devices-sm.webp`, devices);
  data = data.replace(line, line.replace(/width: \d+, height: \d+/, `width: ${full.info.width}, height: ${full.info.height}`));
  console.log(`${slug}: ${full.info.width} x ${full.info.height}`);
}
data = data.replace(/PORTFOLIO_ASSET_VERSION = "(\d+)"/, (_, version) => `PORTFOLIO_ASSET_VERSION = "${Number(version) + 1}"`);
await writeFile(dataPath, data);
console.log(`Updated ${inputs.length} projects and ${inputs.length * 3} previews.`);
