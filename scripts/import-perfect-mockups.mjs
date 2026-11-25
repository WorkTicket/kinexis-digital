/**
 * Import KINEXIS-11-Final-Perfect-Mockups (PNG, no mouse cursor) into public/portfolio as WebP.
 *
 * Usage: node scripts/import-perfect-mockups.mjs [path-to-extracted-folder]
 */
import { access, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const kitRoot = path.resolve(
  process.argv[2] ?? path.join(process.env.USERPROFILE ?? "", "Downloads", "KINEXIS-11-Final-Perfect-Mockups"),
);
const publicDir = path.resolve("public/portfolio");
const dataPath = path.resolve("src/data/portfolio.ts");

const TEMPLATES = [
  { folder: "undertow", slug: "undertow-drainage" },
  { folder: "switchyard", slug: "switchyard-heating-air" },
  { folder: "graft", slug: "graft-tree-care" },
  { folder: "tileline", slug: "tileline-bath-tile" },
  { folder: "brightburrow", slug: "brightburrow-wildlife" },
  { folder: "riverstone", slug: "riverstone-basement" },
  { folder: "kiln", slug: "kiln-hearth-chimney" },
  { folder: "honeycomb", slug: "honeycomb-attic" },
  { folder: "docklight", slug: "docklight-marine-detail" },
  { folder: "lockwell", slug: "lockwell-door-hardware" },
  { folder: "earthform", slug: "earthform-grading" },
];

await access(kitRoot);

const results = [];
for (const project of TEMPLATES) {
  const dir = path.join(kitRoot, project.folder);
  const desktop = path.join(dir, "desktop-full.png");
  const devices = path.join(dir, "four-device-mockup.png");
  await access(desktop);
  await access(devices);

  const full = await sharp(desktop).resize({ width: 1100 }).webp({ quality: 88 }).toBuffer({ resolveWithObject: true });
  const small = await sharp(desktop).resize({ width: 640 }).webp({ quality: 85 }).toBuffer();

  // Match Basecoat-style transparent device mockups (kit ships with baked black).
  const { data: rgba, info } = await sharp(devices).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const visited = new Uint8Array(info.width * info.height);
  const q = [];
  for (const [x, y] of [
    [0, 0],
    [info.width - 1, 0],
    [0, info.height - 1],
    [info.width - 1, info.height - 1],
    [info.width >> 1, 0],
    [0, info.height >> 1],
    [info.width - 1, info.height >> 1],
    [info.width >> 1, info.height - 1],
  ]) {
    q.push(y * info.width + x);
  }
  while (q.length) {
    const p = q.pop();
    if (visited[p]) continue;
    visited[p] = 1;
    const i = p * 4;
    if (rgba[i] > 18 || rgba[i + 1] > 18 || rgba[i + 2] > 18) continue;
    rgba[i] = rgba[i + 1] = rgba[i + 2] = rgba[i + 3] = 0;
    const x = p % info.width;
    const y = (p / info.width) | 0;
    if (x > 0) q.push(p - 1);
    if (x < info.width - 1) q.push(p + 1);
    if (y > 0) q.push(p - info.width);
    if (y < info.height - 1) q.push(p + info.width);
  }
  const devicesRgba = await sharp(rgba, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();

  const [deviceFull, deviceSmall] = await Promise.all([
    sharp(devicesRgba).resize({ width: 1536, withoutEnlargement: true }).webp({ quality: 88, alphaQuality: 100, smartSubsample: true }).toBuffer(),
    sharp(devicesRgba).resize({ width: 768 }).webp({ quality: 85, alphaQuality: 100, smartSubsample: true }).toBuffer(),
  ]);

  await writeFile(path.join(publicDir, `${project.slug}.webp`), full.data);
  await writeFile(path.join(publicDir, `${project.slug}-640.webp`), small);
  await writeFile(path.join(publicDir, `${project.slug}-devices.webp`), deviceFull);
  await writeFile(path.join(publicDir, `${project.slug}-devices-sm.webp`), deviceSmall);

  results.push({ slug: project.slug, width: full.info.width, height: full.info.height });
  console.log(`${project.slug}: ${full.info.width} x ${full.info.height}`);
}

let data = await readFile(dataPath, "utf8");
for (const project of results) {
  const re = new RegExp(
    `(\\{ slug: "${project.slug}"[^}]*width: )\\d+(, height: )\\d+`,
  );
  if (!re.test(data)) throw new Error(`Missing portfolio entry for ${project.slug}`);
  data = data.replace(re, `$1${project.width}$2${project.height}`);
}
data = data.replace(/PORTFOLIO_ASSET_VERSION = "(\d+)"/, (_, version) => `PORTFOLIO_ASSET_VERSION = "${Number(version) + 1}"`);
await writeFile(dataPath, data);

console.log(`Updated ${results.length} portfolio mockups (webp + dimensions + asset version).`);
