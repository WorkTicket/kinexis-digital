import sharp from "sharp";

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
    Math.abs(a.data[i + 3] - b.data[i + 3]) +
    Math.abs(a.data[i] - c.data[i]) +
    Math.abs(a.data[i + 1] - c.data[i + 1]) +
    Math.abs(a.data[i + 2] - c.data[i + 2]);
  // Differ across designs and opaque = screen content
  if (d > 80 && a.data[i + 3] > 200 && b.data[i + 3] > 200) mask[p] = 255;
}

await sharp(mask, { raw: { width: w, height: h, channels: 1 } }).png().toFile("public/portfolio/_screen-diff-mask.png");

// Connected components
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
      // 4-connect, avoid wrapping
      const nx = n % w;
      if (Math.abs(nx - x) + Math.abs(((n / w) | 0) - y) !== 1) continue;
      visited[n] = 1;
      q.push(n);
    }
  }
  if (count < 2000) continue;
  components.push({ minX, minY, maxX, maxY, count, w: maxX - minX + 1, h: maxY - minY + 1, pixels });
}

components.sort((x, y) => y.count - x.count);
console.log(
  "components",
  components.slice(0, 8).map((c) => ({
    x: c.minX,
    y: c.minY,
    w: c.w,
    h: c.h,
    count: c.count,
    fill: (c.count / (c.w * c.h)).toFixed(3),
    cx: ((c.minX + c.maxX) / 2) | 0,
    cy: ((c.minY + c.maxY) / 2) | 0,
  })),
);

// Build chrome: pixels that are similar across all three mockups (and opaque in basecoat)
const chrome = Buffer.alloc(w * h * 4);
let chromePixels = 0;
for (let i = 0, p = 0; i < a.data.length; i += 4, p++) {
  const dAB =
    Math.abs(a.data[i] - b.data[i]) +
    Math.abs(a.data[i + 1] - b.data[i + 1]) +
    Math.abs(a.data[i + 2] - b.data[i + 2]) +
    Math.abs(a.data[i + 3] - b.data[i + 3]);
  const dAC =
    Math.abs(a.data[i] - c.data[i]) +
    Math.abs(a.data[i + 1] - c.data[i + 1]) +
    Math.abs(a.data[i + 2] - c.data[i + 2]) +
    Math.abs(a.data[i + 3] - c.data[i + 3]);
  if (a.data[i + 3] > 0 && dAB < 24 && dAC < 24) {
    chrome[i] = a.data[i];
    chrome[i + 1] = a.data[i + 1];
    chrome[i + 2] = a.data[i + 2];
    chrome[i + 3] = a.data[i + 3];
    chromePixels++;
  }
}
console.log("chrome pixels", chromePixels);
await sharp(chrome, { raw: { width: w, height: h, channels: 4 } }).png().toFile("design-source/device-frame-base.png");
console.log("wrote design-source/device-frame-base.png");

// Screenshot dims from kit
for (const name of ["desktop", "laptop", "tablet", "mobile"]) {
  const m = await sharp(`C:/Users/Slay3r/Downloads/KINEXIS-11-Final-Perfect-Mockups/undertow/${name}.png`).metadata();
  console.log(name, m.width, m.height, (m.width / m.height).toFixed(3));
}
