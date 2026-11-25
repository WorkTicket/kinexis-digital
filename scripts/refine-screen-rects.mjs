import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const a = await sharp("public/portfolio/basecoat-floors-devices.webp").ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const b = await sharp("public/portfolio/rinseworks-devices.webp").ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const c = await sharp("public/portfolio/happy-yard-devices.webp").ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const w = a.info.width;
const h = a.info.height;

const mask = Buffer.alloc(w * h);
for (let i = 0, p = 0; i < a.data.length; i += 4, p++) {
  const d =
    Math.abs(a.data[i] - b.data[i]) +
    Math.abs(a.data[i + 1] - b.data[i + 1]) +
    Math.abs(a.data[i + 2] - b.data[i + 2]) +
    Math.abs(a.data[i] - c.data[i]) +
    Math.abs(a.data[i + 1] - c.data[i + 1]) +
    Math.abs(a.data[i + 2] - c.data[i + 2]);
  if (d > 80 && a.data[i + 3] > 200 && b.data[i + 3] > 200) mask[p] = 255;
}

const visited = new Uint8Array(w * h);
const components = [];
for (let start = 0; start < w * h; start++) {
  if (!mask[start] || visited[start]) continue;
  const q = [start];
  visited[start] = 1;
  let minX = w,
    minY = h,
    maxX = 0,
    maxY = 0,
    count = 0;
  const pixels = [];
  while (q.length) {
    const p = q.pop();
    pixels.push(p);
    count++;
    const x = p % w;
    const y = (p / w) | 0;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
    for (const n of [p - 1, p + 1, p - w, p + w]) {
      if (n < 0 || n >= w * h || visited[n] || !mask[n]) continue;
      const nx = n % w;
      if (Math.abs(nx - x) + Math.abs(((n / w) | 0) - y) !== 1) continue;
      visited[n] = 1;
      q.push(n);
    }
  }
  if (count < 2000) continue;
  components.push({ minX, minY, maxX, maxY, count, pixels });
}
components.sort((x, y) => y.count - x.count);

function densestRect(comp, targetAspect) {
  // Score every candidate crop inside bbox for mask density + aspect proximity
  const { minX, minY, maxX, maxY } = comp;
  const set = new Set(comp.pixels);
  let best = null;
  const step = 4;
  for (let top = minY; top < maxY; top += step) {
    for (let left = minX; left < maxX; left += step) {
      for (let height = 80; top + height - 1 <= maxY; height += step) {
        const width = Math.round(height * targetAspect);
        if (left + width - 1 > maxX) continue;
        let hit = 0;
        const total = width * height;
        // sample every 2px for speed
        for (let y = top; y < top + height; y += 2) {
          for (let x = left; x < left + width; x += 2) {
            if (set.has(y * w + x)) hit++;
          }
        }
        const samples = Math.ceil(width / 2) * Math.ceil(height / 2);
        const density = hit / samples;
        if (density < 0.92) continue;
        const score = density * total;
        if (!best || score > best.score) {
          best = { left, top, width, height, density, score };
        }
      }
    }
  }
  return best;
}

const targets = [
  { name: "desktop", aspect: 1440 / 810 },
  { name: "laptop", aspect: 1366 / 794 },
  { name: "tablet", aspect: 768 / 1210 },
  { name: "mobile", aspect: 450 / 1000 },
];

// Assign components to device names by position:
// desktop = top-center largest, laptop = right, tablet = left, mobile = bottom-center
const ordered = [...components].slice(0, 4);
ordered.sort((a, b) => a.minY - b.minY);
const desktop = ordered.reduce((best, c) => (c.count > best.count ? c : best), ordered[0]);
const rest = ordered.filter((c) => c !== desktop);
rest.sort((a, b) => a.minX - b.minX);
const tablet = rest[0];
const mobile = rest[1];
const laptop = rest[2];
const assigned = { desktop, laptop, tablet, mobile };

const rects = {};
for (const t of targets) {
  const rect = densestRect(assigned[t.name], t.aspect);
  rects[t.name] = rect;
  console.log(t.name, rect);
}

await writeFile("design-source/device-screen-rects.json", JSON.stringify({ width: w, height: h, rects }, null, 2));

// Preview: draw rects on basecoat
const overlay = Buffer.alloc(w * h * 4);
const colors = { desktop: [255, 0, 0, 120], laptop: [0, 255, 0, 120], tablet: [0, 0, 255, 120], mobile: [255, 255, 0, 120] };
for (const [name, r] of Object.entries(rects)) {
  if (!r) continue;
  const [cr, cg, cb, ca] = colors[name];
  for (let y = r.top; y < r.top + r.height; y++) {
    for (let x = r.left; x < r.left + r.width; x++) {
      const i = (y * w + x) * 4;
      overlay[i] = cr;
      overlay[i + 1] = cg;
      overlay[i + 2] = cb;
      overlay[i + 3] = ca;
    }
  }
}
await sharp("public/portfolio/basecoat-floors-devices.webp")
  .composite([{ input: overlay, raw: { width: w, height: h, channels: 4 }, blend: "over" }])
  .png()
  .toFile("public/portfolio/_screen-rects-preview.png");
console.log("wrote preview + rects json");
