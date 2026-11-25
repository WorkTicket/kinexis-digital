/**
 * Build transparent four-device mockups by compositing viewport screenshots
 * into the shared Basecoat/Afterglow device frame (greenscreen → replace).
 *
 * Usage:
 *   node scripts/compose-device-mockups.mjs [path-to-KINEXIS-11-Final-Perfect-Mockups]
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const kitRoot = path.resolve(
  process.argv[2] ?? path.join(process.env.USERPROFILE ?? "", "Downloads", "KINEXIS-11-Final-Perfect-Mockups"),
);
const publicDir = path.resolve("public/portfolio");
const designDir = path.resolve("design-source");
const dataPath = path.resolve("src/data/portfolio.ts");

const FRAME_SOURCES = [
  "public/portfolio/afterglow-outdoor-lighting-devices.webp",
  "public/portfolio/basecoat-floors-devices.webp",
  "public/portfolio/rinseworks-devices.webp",
  "public/portfolio/happy-yard-devices.webp",
  "public/portfolio/liftline-garage-doors-devices.webp",
];

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

const W = 1536;
const H = 1024;

async function loadRgba(file) {
  return sharp(file).resize(W, H, { fit: "fill" }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
}

function buildScreenMask(frames) {
  const mask = Buffer.alloc(W * H);
  const n = frames.length;
  for (let p = 0; p < W * H; p++) {
    const i = p * 4;
    let votes = 0;
    for (let a = 0; a < n; a++) {
      for (let b = a + 1; b < n; b++) {
        const A = frames[a].data;
        const B = frames[b].data;
        if (A[i + 3] < 200 || B[i + 3] < 200) continue;
        const d = Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2]);
        if (d > 60) votes++;
      }
    }
    // Differ across several pairs → screen content
    if (votes >= 3) mask[p] = 255;
  }
  return mask;
}

function dilate(mask, radius = 1) {
  const out = Buffer.alloc(mask.length);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let on = 0;
      for (let dy = -radius; dy <= radius && !on; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
          if (mask[ny * W + nx]) {
            on = 1;
            break;
          }
        }
      }
      out[y * W + x] = on ? 255 : 0;
    }
  }
  return out;
}

function components(mask, minCount = 5000) {
  const visited = new Uint8Array(W * H);
  const comps = [];
  for (let start = 0; start < W * H; start++) {
    if (!mask[start] || visited[start]) continue;
    const q = [start];
    visited[start] = 1;
    let minX = W,
      minY = H,
      maxX = 0,
      maxY = 0,
      count = 0;
    const pixels = [];
    while (q.length) {
      const p = q.pop();
      pixels.push(p);
      count++;
      const x = p % W;
      const y = (p / W) | 0;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
      for (const n of [p - 1, p + 1, p - W, p + W]) {
        if (n < 0 || n >= W * H || visited[n] || !mask[n]) continue;
        const nx = n % W;
        if (Math.abs(nx - x) + Math.abs(((n / W) | 0) - y) !== 1) continue;
        visited[n] = 1;
        q.push(n);
      }
    }
    if (count < minCount) continue;
    comps.push({ minX, minY, maxX, maxY, count, pixels, w: maxX - minX + 1, h: maxY - minY + 1 });
  }
  comps.sort((a, b) => b.count - a.count);
  return comps;
}

function fillHoles(comp) {
  // Mark outside via flood from bbox edges through non-mask pixels; remainder = solid screen.
  const { minX, minY, maxX, maxY } = comp;
  const bw = maxX - minX + 1;
  const bh = maxY - minY + 1;
  const outside = new Uint8Array(bw * bh);
  const q = [];
  const setPix = new Set(comp.pixels);
  for (let x = minX; x <= maxX; x++) {
    q.push([x, minY], [x, maxY]);
  }
  for (let y = minY; y <= maxY; y++) {
    q.push([minX, y], [maxX, y]);
  }
  while (q.length) {
    const [x, y] = q.pop();
    if (x < minX || y < minY || x > maxX || y > maxY) continue;
    const li = (y - minY) * bw + (x - minX);
    if (outside[li]) continue;
    if (setPix.has(y * W + x)) continue;
    outside[li] = 1;
    q.push([x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]);
  }
  const pixels = [];
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const li = (y - minY) * bw + (x - minX);
      if (outside[li]) continue;
      pixels.push(y * W + x);
    }
  }
  return {
    minX,
    minY,
    maxX,
    maxY,
    w: bw,
    h: bh,
    count: pixels.length,
    pixels,
  };
}

function labelScreens(comps) {
  const top4 = comps.slice(0, 4).map(fillHoles);
  const desktop = top4.reduce((best, c) => (c.count > best.count ? c : best), top4[0]);
  const rest = top4.filter((c) => c !== desktop).sort((a, b) => a.minX - b.minX);
  return { desktop, tablet: rest[0], mobile: rest[1], laptop: rest[2] };
}

function buildChrome(frames, screenMask) {
  // Keep hardware wherever frames agree; clear true screen content.
  const primary = frames[0].data;
  const out = Buffer.from(primary);
  for (let p = 0; p < W * H; p++) {
    const i = p * 4;
    if (!screenMask[p]) continue;
    let agree = true;
    for (let f = 1; f < frames.length; f++) {
      const B = frames[f].data;
      const d =
        Math.abs(primary[i] - B[i]) +
        Math.abs(primary[i + 1] - B[i + 1]) +
        Math.abs(primary[i + 2] - B[i + 2]) +
        Math.abs(primary[i + 3] - B[i + 3]);
      if (d > 28) {
        agree = false;
        break;
      }
    }
    if (agree && primary[i + 3] > 200) continue; // notch / shared chrome
    out[i] = out[i + 1] = out[i + 2] = out[i + 3] = 0;
  }
  return out;
}

function buildGreenscreen(chrome, screenMask) {
  const out = Buffer.from(chrome);
  for (let p = 0; p < W * H; p++) {
    if (!screenMask[p]) continue;
    const i = p * 4;
    out[i] = 0;
    out[i + 1] = 255;
    out[i + 2] = 0;
    out[i + 3] = 255;
  }
  return out;
}

async function fitShot(file, rect) {
  // Website heroes: pin to top of the screen (cover width, crop bottom if needed)
  return sharp(file)
    .resize(rect.w, rect.h, { fit: "cover", position: "top" })
    .ensureAlpha()
    .raw()
    .toBuffer();
}

function stampScreen(canvas, shot, comp) {
  const { minX, minY, w, h, pixels } = comp;
  const set = new Set(pixels);
  for (let ly = 0; ly < h; ly++) {
    for (let lx = 0; lx < w; lx++) {
      const gp = (minY + ly) * W + (minX + lx);
      if (!set.has(gp)) continue;
      const si = (ly * w + lx) * 4;
      const di = gp * 4;
      // Only write opaque screenshot pixels
      if (shot[si + 3] < 8) continue;
      canvas[di] = shot[si];
      canvas[di + 1] = shot[si + 1];
      canvas[di + 2] = shot[si + 2];
      canvas[di + 3] = 255;
    }
  }
}

async function composeProject(folder, screens, chrome) {
  const dir = path.join(kitRoot, folder);
  const canvas = Buffer.alloc(W * H * 4); // transparent

  // Back → front so overlaps read correctly before chrome
  for (const name of ["desktop", "laptop", "tablet", "mobile"]) {
    const comp = screens[name];
    const shot = await fitShot(path.join(dir, `${name}.png`), comp);
    stampScreen(canvas, shot, comp);
  }

  const chromePng = await sharp(chrome, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
  const screensPng = await sharp(canvas, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();

  return sharp(screensPng)
    .composite([{ input: chromePng, blend: "over" }])
    .ensureAlpha()
    .png()
    .toBuffer();
}

console.log("Loading reference frames…");
const frames = [];
for (const file of FRAME_SOURCES) {
  frames.push(await loadRgba(file));
}

console.log("Building screen masks…");
let screenMask = buildScreenMask(frames);
screenMask = dilate(screenMask, 1);
const comps = components(screenMask);
const screens = labelScreens(comps);
for (const [name, c] of Object.entries(screens)) {
  console.log(`${name}: ${c.minX},${c.minY} ${c.w}x${c.h} px=${c.count}`);
}

// Rebuild a clean per-screen mask (only the 4 labeled components) for chrome cutouts
const cleanMask = Buffer.alloc(W * H);
for (const c of Object.values(screens)) {
  for (const p of c.pixels) cleanMask[p] = 255;
}
const cutMask = dilate(cleanMask, 1);

const chrome = buildChrome(frames, cutMask);
const greenscreen = buildGreenscreen(chrome, cleanMask);

await mkdir(designDir, { recursive: true });
await sharp(chrome, { raw: { width: W, height: H, channels: 4 } }).png().toFile(path.join(designDir, "device-frame-chrome.png"));
await sharp(greenscreen, { raw: { width: W, height: H, channels: 4 } }).png().toFile(path.join(designDir, "device-frame-greenscreen.png"));
await writeFile(
  path.join(designDir, "device-screen-rects.json"),
  JSON.stringify(
    {
      width: W,
      height: H,
      screens: Object.fromEntries(
        Object.entries(screens).map(([name, c]) => [
          name,
          { x: c.minX, y: c.minY, w: c.w, h: c.h, count: c.count },
        ]),
      ),
    },
    null,
    2,
  ),
);
console.log("Wrote chrome + greenscreen frame");

for (const [folder, slug] of TEMPLATES) {
  const png = await composeProject(folder, screens, chrome);
  const [full, sm] = await Promise.all([
    sharp(png).webp({ quality: 90, alphaQuality: 100, smartSubsample: true, effort: 4 }).toBuffer(),
    sharp(png).resize({ width: 768 }).webp({ quality: 86, alphaQuality: 100, smartSubsample: true, effort: 4 }).toBuffer(),
  ]);
  await writeFile(path.join(publicDir, `${slug}-devices.webp`), full);
  await writeFile(path.join(publicDir, `${slug}-devices-sm.webp`), sm);
  console.log(`${slug}: ${Math.round(full.length / 1024)}kb`);
}

let portfolio = await readFile(dataPath, "utf8");
portfolio = portfolio.replace(
  /PORTFOLIO_ASSET_VERSION = "(\d+)"/,
  (_, version) => `PORTFOLIO_ASSET_VERSION = "${Number(version) + 1}"`,
);
await writeFile(dataPath, portfolio);
console.log("Done — composed 11 mockups from greenscreen frame + screenshots.");
