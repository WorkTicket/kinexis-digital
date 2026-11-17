/**
 * Refresh responsive image derivatives from the external artwork and portfolio
 * PNG masters. Masters stay outside the repository. Set KINEXIS_ARTWORK_DIR
 * and KINEXIS_PORTFOLIO_DIR before running this script.
 */
import { access, readFile, readdir, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const ART = process.env.KINEXIS_ARTWORK_DIR;
const PORTFOLIO = process.env.KINEXIS_PORTFOLIO_DIR;
const MOBILE_GROWTH = 1.05;
const WEBP = { quality: 90, effort: 5, smartSubsample: false, alphaQuality: 100 };
const AVIF = { quality: 80, effort: 6, chromaSubsampling: "4:4:4" };
const baselineBytes = new Map();
const baselineBuffers = new Map();
let trackedSizes;

if (!ART || !PORTFOLIO) {
  throw new Error("Set KINEXIS_ARTWORK_DIR and KINEXIS_PORTFOLIO_DIR to the extracted master folders.");
}

function parseCsvLine(line) {
  const values = [];
  let value = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      if (quoted && line[i + 1] === '"') {
        value += '"';
        i += 1;
      } else quoted = !quoted;
    } else if (char === "," && !quoted) {
      values.push(value);
      value = "";
    } else value += char;
  }
  values.push(value);
  return values;
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

function outputGeometry(output, current, source, { portfolioCard = false, portfolioBase = false } = {}) {
  const widthMatch = path.basename(output).match(/-(\d+)\.(?:webp|avif)$/i);
  const width = portfolioBase ? 1600 : widthMatch ? Number(widthMatch[1]) : current?.width ?? source.width;
  if (portfolioCard) return { width, height: Math.round((width * 3) / 4), fit: "cover" };
  if (output.includes(`${path.sep}public${path.sep}portfolio${path.sep}`)) {
    return { width: Math.min(width, source.width), height: Math.max(1, Math.round(Math.min(width, source.width) * source.height / source.width)), fit: "fill" };
  }
  const aspect = current?.width && current?.height ? current.width / current.height : source.width / source.height;
  return { width: Math.min(width, source.width), height: Math.max(1, Math.round(Math.min(width, source.width) / aspect)), fit: "cover" };
}

function gitBaselineSize(outputPath) {
  const relative = path.relative(ROOT, outputPath).split(path.sep).join("/");
  if (!trackedSizes) {
    trackedSizes = new Map();
    try {
      const listing = execFileSync("git", ["ls-tree", "-r", "-l", "HEAD", "--", "public"], { encoding: "utf8" });
      for (const line of listing.split(/\r?\n/)) {
        const match = line.match(/^\d+ blob \w+\s+(\d+)\t(.+)$/);
        if (match) trackedSizes.set(match[2], Number(match[1]));
      }
    } catch {}
  }
  if (!baselineBytes.has(relative)) baselineBytes.set(relative, trackedSizes.get(relative) ?? 0);
  return baselineBytes.get(relative);
}

function gitBaselineBuffer(outputPath) {
  const relative = path.relative(ROOT, outputPath).split(path.sep).join("/");
  if (!baselineBuffers.has(relative)) {
    let buffer = null;
    try {
      buffer = execFileSync("git", ["show", `HEAD:${relative}`], { encoding: "buffer" });
    } catch {}
    baselineBuffers.set(relative, buffer);
  }
  return baselineBuffers.get(relative);
}

async function encodeOne(sourcePath, outputPath, {
  maxGrowth,
  portfolioCard = false,
  portfolioBase = false,
  targetQuality,
  effort,
  chromaSubsampling,
} = {}) {
  const sourceBuffer = await readFile(sourcePath);
  const sourceMeta = await sharp(sourceBuffer).metadata();
  const oldBuffer = await readFile(outputPath).catch(() => null);
  const oldMeta = oldBuffer ? await sharp(oldBuffer).metadata() : null;
  const currentBytes = oldBuffer?.length ?? 0;
  const oldBytes = gitBaselineSize(outputPath) || currentBytes;
  const geometry = outputGeometry(outputPath, oldMeta, sourceMeta, { portfolioCard, portfolioBase });
  const mobile = geometry.width <= 860 && oldBytes > 0;
  const budget = mobile ? Math.floor(oldBytes * (maxGrowth ?? MOBILE_GROWTH)) : Infinity;
  const format = outputPath.endsWith(".avif") ? "avif" : "webp";
  const defaults = format === "avif" ? AVIF : WEBP;
  const options = {
    ...defaults,
    ...(effort == null ? {} : { effort }),
    ...(chromaSubsampling == null ? {} : { chromaSubsampling }),
  };
  let quality = targetQuality ?? options.quality;
  let buffer;

  const render = async (q) => {
    let pipeline = sharp(sourceBuffer).resize(geometry.width, geometry.height, {
      fit: geometry.fit,
      position: portfolioCard ? "top" : "centre",
      kernel: "lanczos3",
      withoutEnlargement: true,
    });
    if (format === "avif") pipeline = pipeline.avif({ ...options, quality: q });
    else pipeline = pipeline.webp({ ...options, quality: q });
    return pipeline.toBuffer();
  };

  buffer = await render(quality);
  while (buffer.length > budget && quality > 40) {
    quality -= 4;
    buffer = await render(quality);
  }
  if (buffer.length > budget) {
    console.warn(`KEEP existing (mobile budget): ${path.relative(ROOT, outputPath)} ${oldBytes} baseline, ${currentBytes} current -> ${buffer.length} bytes`);
    const baseline = gitBaselineBuffer(outputPath);
    if (baseline) await writeFile(outputPath, baseline);
    return { output: outputPath, oldBytes, newBytes: baseline?.length ?? currentBytes, kept: true, mobile };
  }
  const resultMeta = await sharp(buffer).metadata();
  if (sourceMeta.hasAlpha && !resultMeta.hasAlpha) throw new Error(`Alpha channel dropped: ${outputPath}`);
  await writeFile(outputPath, buffer);
  console.log(`${path.relative(ROOT, outputPath)} ${oldBytes} baseline -> ${buffer.length}${mobile ? " mobile" : ""}`);
  return { output: outputPath, oldBytes, newBytes: buffer.length, kept: false, mobile };
}

const report = [];
const guidePath = path.join(ART, "placement-guide.csv");
const rows = (await readFile(guidePath, "utf8")).trim().split(/\r?\n/).slice(1).map(parseCsvLine);
for (const [masterRel, expectedWidth, expectedHeight, targetRel, outputsCell] of rows) {
  if (!masterRel?.toLowerCase().endsWith(".png") || !targetRel?.startsWith("public/")) continue;
  // SVG exports are reference-only; preserve the site's existing SVGs.
  if (targetRel.endsWith(".svg")) continue;
  const sourcePath = path.join(ART, masterRel);
  const sourceMeta = await sharp(sourcePath).metadata();
  const expectedRatio = Number(expectedWidth) / Number(expectedHeight);
  if (!sourceMeta.width || !sourceMeta.height || Math.abs(sourceMeta.width / sourceMeta.height - expectedRatio) > 0.005) {
    throw new Error(`Unexpected source dimensions for ${masterRel}: ${sourceMeta.width}x${sourceMeta.height}`);
  }
  const outputs = new Set([targetRel, ...(outputsCell || "").split(";").map((item) => item.trim()).filter(Boolean)]);
  for (const relative of outputs) {
    if (!/\.(?:webp|avif)$/i.test(relative)) continue;
    const outputPath = path.join(ROOT, relative);
    if (!(await exists(path.dirname(outputPath)))) continue;
    report.push(await encodeOne(sourcePath, outputPath));
  }
}

const posterMaster = path.join(ART, "video/kinexis-explainer-v5f-preview-poster.png");
if (await exists(posterMaster)) {
  for (const format of ["webp", "avif"]) {
    report.push(await encodeOne(
      posterMaster,
      path.join(ROOT, `public/assets/video/kinexis-explainer-v5f-preview-poster-1120.${format}`),
    ));
  }
}

// Full-page portfolio screenshots and their current responsive/card variants.
const portfolioFiles = (await readdir(PORTFOLIO)).filter((name) => name.toLowerCase().endsWith(".png")).sort();
for (const name of portfolioFiles) {
  const slug = path.basename(name, ".png");
  const sourcePath = path.join(PORTFOLIO, name);
  const sourceMeta = await sharp(sourcePath).metadata();
  if (sourceMeta.width !== 2560) throw new Error(`Portfolio capture must be 2560px wide: ${name} (${sourceMeta.width})`);
  const candidates = [
    `${slug}.webp`, `${slug}.avif`, `${slug}-320.webp`, `${slug}-320.avif`,
    `${slug}-640.webp`, `${slug}-640.avif`,
    `${slug}-card.webp`, `${slug}-card.avif`,
    `${slug}-card-400.webp`, `${slug}-card-400.avif`,
    `${slug}-card-480.webp`, `${slug}-card-480.avif`,
    `${slug}-card-800.webp`, `${slug}-card-800.avif`,
  ];
  for (const basename of candidates) {
    const outputPath = path.join(ROOT, "public/portfolio", basename);
    if (!(await exists(outputPath))) continue;
    const isCard = /-card(?:-\d+)?\.(?:webp|avif)$/.test(basename);
    const isBase = basename === `${slug}.webp` || basename === `${slug}.avif`;
    report.push(await encodeOne(sourcePath, outputPath, { portfolioCard: isCard, portfolioBase: isBase }));
  }
}

const mobile = report.filter((item) => item.mobile && !item.kept);
const over = mobile.filter((item) => item.newBytes > Math.floor(item.oldBytes * MOBILE_GROWTH));
console.log(`\nRefreshed ${report.length} files; mobile variants ${mobile.length}; over-budget ${over.length}.`);
if (over.length) process.exitCode = 1;
