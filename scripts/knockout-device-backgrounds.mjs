/**
 * Convert opaque black four-device mockups to transparent RGBA WebP
 * matching the Basecoat / portfolio-upgraded device style.
 *
 * Usage: node scripts/knockout-device-backgrounds.mjs [path-to-extracted-folder]
 */
import { readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const kitRoot = path.resolve(
  process.argv[2] ?? path.join(process.env.USERPROFILE ?? "", "Downloads", "KINEXIS-11-Final-Perfect-Mockups"),
);
const publicDir = path.resolve("public/portfolio");
const dataPath = path.resolve("src/data/portfolio.ts");

const TEMPLATES = [
  ["undertow", "undertow-drainage"],
  ["switchyard", "switchyard-heating-air"],
  ["graft", "graft-tree-care"],
  ["tileline", "tileline-bath-tile"],
  ["brightburrow", "brightburrow-wildlife"],
  ["riverstone", "riverstone-basement"],
  ["kiln", "kiln-hearth-chimney"],
  ["honeycomb", "honeycomb-attic"],
  ["docklight", "docklight-marine-detail"],
  ["lockwell", "lockwell-door-hardware"],
  ["earthform", "earthform-grading"],
];

function knockOutBlack(data, w, h, threshold = 18) {
  const visited = new Uint8Array(w * h);
  const q = [];
  const seeds = [
    [0, 0],
    [w - 1, 0],
    [0, h - 1],
    [w - 1, h - 1],
    [w >> 1, 0],
    [0, h >> 1],
    [w - 1, h >> 1],
    [w >> 1, h - 1],
  ];
  for (const [x, y] of seeds) q.push(y * w + x);

  while (q.length) {
    const p = q.pop();
    if (visited[p]) continue;
    visited[p] = 1;
    const i = p * 4;
    if (data[i] > threshold || data[i + 1] > threshold || data[i + 2] > threshold) continue;
    data[i] = data[i + 1] = data[i + 2] = data[i + 3] = 0;
    const x = p % w;
    const y = (p / w) | 0;
    if (x > 0) q.push(p - 1);
    if (x < w - 1) q.push(p + 1);
    if (y > 0) q.push(p - w);
    if (y < h - 1) q.push(p + w);
  }

  // Turn near-black fringe next to cleared pixels into soft alpha.
  const copy = Buffer.from(data);
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const p = y * w + x;
      const i = p * 4;
      if (copy[i + 3] === 0) continue;
      const lum = (copy[i] + copy[i + 1] + copy[i + 2]) / 3;
      if (lum > 28) continue;
      let nearClear = false;
      for (const d of [-1, 1, -w, w]) {
        if (copy[(p + d) * 4 + 3] === 0) {
          nearClear = true;
          break;
        }
      }
      if (!nearClear) continue;
      data[i] = data[i + 1] = data[i + 2] = 0;
      data[i + 3] = Math.max(0, Math.min(255, Math.round((lum / 28) * 255)));
    }
  }
}

for (const [folder, slug] of TEMPLATES) {
  const src = path.join(kitRoot, folder, "four-device-mockup.png");
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  knockOutBlack(data, info.width, info.height);
  const rgba = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();

  const [deviceFull, deviceSmall] = await Promise.all([
    sharp(rgba)
      .resize({ width: 1536, withoutEnlargement: true })
      .webp({ quality: 88, alphaQuality: 100, smartSubsample: true, effort: 4 })
      .toBuffer(),
    sharp(rgba)
      .resize({ width: 768 })
      .webp({ quality: 85, alphaQuality: 100, smartSubsample: true, effort: 4 })
      .toBuffer(),
  ]);

  await writeFile(path.join(publicDir, `${slug}-devices.webp`), deviceFull);
  await writeFile(path.join(publicDir, `${slug}-devices-sm.webp`), deviceSmall);

  const meta = await sharp(deviceFull).metadata();
  let transparent = 0;
  const raw = await sharp(deviceFull).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 3; i < raw.data.length; i += 4) if (raw.data[i] < 10) transparent++;
  const pct = ((100 * transparent) / (raw.info.width * raw.info.height)).toFixed(1);
  console.log(
    `${slug}: alpha=${meta.hasAlpha} transparent=${pct}% ${Math.round(deviceFull.length / 1024)}kb / sm ${Math.round(deviceSmall.length / 1024)}kb`,
  );
}

let portfolio = await readFile(dataPath, "utf8");
portfolio = portfolio.replace(
  /PORTFOLIO_ASSET_VERSION = "(\d+)"/,
  (_, version) => `PORTFOLIO_ASSET_VERSION = "${Number(version) + 1}"`,
);
await writeFile(dataPath, portfolio);

for (const name of [
  "_test-undertow-transparent.webp",
  "_test-undertow-lossless.webp",
  "_cmp-basecoat.webp",
  "_cmp-undertow-old.webp",
  "_cmp-undertow-test.webp",
]) {
  try {
    await unlink(path.join(publicDir, name));
  } catch {
    /* optional cleanup */
  }
}

console.log("Updated 11 transparent device mockups + asset version.");
