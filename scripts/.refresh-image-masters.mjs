import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const artwork = "C:/Users/Slay3r/AppData/Local/Temp/opencode/kinexis-artwork";
const portfolioMasters = "C:/Users/Slay3r/AppData/Local/Temp/opencode/kinexis-portfolio-png";
const parseCsv = (line) => [...line.matchAll(/(?:^|,)(?:"((?:[^"]|"")*)"|([^,]*))/g)].map((m) => (m[1] ?? m[2]).replaceAll('""', '"'));
const rows = (await readFile(path.join(artwork, "placement-guide.csv"), "utf8")).trim().split(/\r?\n/).slice(1).map(parseCsv);
const log = [];
const usable = new Set();

for (const [masterRel, widthText, heightText, currentPath] of rows) {
  if (!masterRel) continue;
  const source = path.join(artwork, masterRel);
  const expectedWidth = Number(widthText);
  const expectedHeight = Number(heightText);
  try {
    const meta = await sharp(await readFile(source)).metadata();
    if (!meta.width || !meta.height || (expectedWidth && meta.width !== expectedWidth) || (expectedHeight && meta.height !== expectedHeight)) {
      console.warn(`REJECT dimension mismatch/corrupt: ${masterRel} (${meta.width}x${meta.height}; expected ${expectedWidth}x${expectedHeight})`);
      continue;
    }
    const outputPath = currentPath && currentPath.endsWith(".webp") ? currentPath : null;
    const currentBytes = outputPath ? await readFile(outputPath).catch(() => null) : null;
    const currentMeta = currentBytes ? await sharp(currentBytes).metadata().catch(() => null) : null;
    if (currentMeta?.width && currentMeta.width > meta.width) {
      console.warn(`REJECT smaller than live file: ${masterRel} (${meta.width}px vs ${currentMeta.width}px)`);
      continue;
    }
    usable.add(masterRel);
  } catch (error) {
    console.warn(`REJECT unreadable: ${masterRel}: ${error.message}`);
  }
}

async function encode(sourcePath, targetPath, width, height, crop = false) {
  const src = await readFile(sourcePath);
  let pipeline = sharp(src);
  if (width && height && crop) pipeline = pipeline.resize(width, height, { fit: "cover", position: "top", kernel: "lanczos3" });
  else if (width) pipeline = pipeline.resize({ width, withoutEnlargement: true, kernel: "lanczos3" });
  const ext = path.extname(targetPath).toLowerCase();
  const previousBuffer = await readFile(targetPath).catch(() => null);
  let baselineBuffer = null;
  try { baselineBuffer = execFileSync("git", ["cat-file", "blob", `HEAD:${targetPath}`], { stdio: ["ignore", "pipe", "ignore"] }); } catch { /* new/untracked derivative */ }
  const currentBytes = baselineBuffer?.length ?? previousBuffer?.length ?? 0;
  let quality = ext === ".avif" ? 78 : 88;
  const floor = ext === ".avif" ? 52 : 68;
  let result;
  for (;;) {
    result = ext === ".avif"
      ? await pipeline.clone().avif({ quality, effort: 7, chromaSubsampling: "4:2:0" }).toBuffer()
      : await pipeline.clone().webp({ quality, effort: 6, smartSubsample: true, alphaQuality: 100 }).toBuffer();
    if (!currentBytes || width > 860 || result.length <= currentBytes * 1.05 || quality <= floor) break;
    quality -= 4;
  }
  if (currentBytes && width <= 860 && result.length > currentBytes * 1.05) {
    if (baselineBuffer) await writeFile(targetPath, baselineBuffer);
    log.push(`${targetPath}: ${baselineBuffer ? "kept tracked original" : "kept current"} (${Math.round(currentBytes / 1024)} KB; new would exceed +5% mobile budget)`);
    return;
  }
  const encodedMeta = await sharp(result).metadata();
  const sourceMeta = await sharp(src).metadata();
  if (sourceMeta.hasAlpha && !encodedMeta.hasAlpha) throw new Error(`Alpha lost: ${targetPath}`);
  await writeFile(targetPath, result);
  log.push(`${targetPath}: ${Math.round(currentBytes / 1024)} -> ${Math.round(result.length / 1024)} KB`);
}

for (const [masterRel, , , , outputs] of rows) {
  if (!masterRel || !outputs || !usable.has(masterRel)) continue;
  const source = path.join(artwork, masterRel);
  const outputList = outputs.split(";").map((s) => s.trim()).filter((s) => /\.(?:webp|avif)$/i.test(s));
  for (const rel of outputList) {
    const target = path.resolve(rel);
    let meta;
    try { meta = await sharp(await readFile(target)).metadata(); } catch { continue; }
    const basename = path.basename(target);
    const sizeMatch = basename.match(/-(\d+)(?:\.[^.]+)$/);
    const width = sizeMatch ? Number(sizeMatch[1]) : meta.width;
    const height = /-card\.webp$/i.test(basename) ? meta.height : undefined;
    await encode(source, target, width, height, /-card\.webp$/i.test(basename));
  }
}

// Page and industry hero responsive files that are not all individually listed in the guide.
for (const [master, folder, prefix, widths] of [
  ...Array.from({ length: 14 }, (_, i) => [`page-heroes/${String(i + 1).padStart(2, "0")}-${["homepage","portfolio","about","process","reviews","pricing","web-design","local-seo","website-audit","maintenance","faqs","blog","contact","upgrades"][i]}.png`, "public/assets/heroes", `${String(i + 1).padStart(2, "0")}-${["homepage","portfolio","about","process","reviews","pricing","web-design","local-seo","website-audit","maintenance","faqs","blog","contact","upgrades"][i]}`, [480,640,960,1254]]),
]) {
  const source = path.join(artwork, master);
  if (!usable.has(master)) continue;
  for (const width of widths) for (const ext of ["webp", "avif"]) {
    const target = `${folder}/${prefix}-${width}.${ext}`;
    if (await stat(target).catch(() => null)) await encode(source, target, width);
  }
}

// Poster candidates requested for the current srcSet plus an extra-small and
// wide desktop candidate. Existing candidates above are replaced from the PNG.
const posterMaster = path.join(artwork, "video/kinexis-explainer-v5f-preview-poster.png");
for (const width of [280, 480, 560, 640, 768, 960, 1120]) {
  for (const ext of ["webp", "avif"]) {
    const target = `public/assets/video/kinexis-explainer-v5f-preview-poster-${width}.${ext}`;
    await encode(posterMaster, target, width);
  }
}

// Full-page PNG captures: update the existing full-size screenshot and make crisp
// scroll previews plus top-of-page cards. Device/score source masters were not supplied.
for (const file of await readdir(portfolioMasters)) {
  if (!file.toLowerCase().endsWith(".png")) continue;
  const slug = path.basename(file, ".png").toLowerCase();
  const base = `public/portfolio/${slug}`;
  const source = path.join(portfolioMasters, file);
  if (!(await stat(`${base}.webp`).catch(() => null))) continue;
  const metadata = await sharp(source).metadata();
  if (!metadata.width || !metadata.height || metadata.width !== 2560) throw new Error(`Unexpected capture size: ${file}`);
  await encode(source, `${base}.webp`, 1600);
  for (const width of [320, 640]) await encode(source, `${base}-${width}.webp`, width);
  for (const width of [400, 480, 640, 800]) {
    const height = Math.round(width * 0.75);
    const out = width === 640 ? `${base}-card.webp` : `${base}-card-${width}.webp`;
    await encode(source, out, width, height, true);
  }
}
console.log(log.join("\n"));
