import sharp from "sharp";
import { open, readFile, readdir, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

const assetsDir = path.join(process.cwd(), "public", "assets");

function isLosslessWebp(buf) {
  if (buf.length < 12) return false;
  if (buf.toString("ascii", 0, 4) !== "RIFF") return false;
  if (buf.toString("ascii", 8, 12) !== "WEBP") return false;
  return buf.includes(Buffer.from("VP8L"));
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

function exists(filePath) {
  return stat(filePath).then(
    () => true,
    () => false,
  );
}

async function sameSizeMaster(webpPath, width, height) {
  const dir = path.dirname(webpPath);
  const base = path.basename(webpPath, ".webp");
  const candidates = [".png", ".jpg", ".jpeg"].map((ext) => path.join(dir, base + ext));
  let best = null;
  let bestRank = 0;
  for (const candidate of candidates) {
    if (!(await exists(candidate))) continue;
    const meta = await sharp(candidate).metadata();
    if (meta.width !== width || meta.height !== height) continue;
    const rank = meta.format === "png" ? 3 : meta.format === "jpeg" ? 2 : 1;
    if (rank > bestRank) {
      best = candidate;
      bestRank = rank;
    }
  }
  return best;
}

async function largerMaster(webpPath) {
  const base = path.basename(webpPath, ".webp");
  if (!base.endsWith("-thumb")) return null;
  const stem = base.slice(0, -"-thumb".length);
  const dir = path.dirname(webpPath);
  const candidates = [".png", ".jpg", ".jpeg", ".webp"].map((ext) =>
    path.join(dir, stem + ext),
  );
  let best = null;
  let bestRank = 0;
  for (const candidate of candidates) {
    if (candidate === webpPath || !(await exists(candidate))) continue;
    const meta = await sharp(candidate).metadata();
    const rank = meta.format === "png" ? 3 : meta.format === "jpeg" ? 2 : 1;
    if (rank > bestRank) {
      best = candidate;
      bestRank = rank;
    }
  }
  return best;
}

async function encodeLossless(source, resize) {
  let pipeline = sharp(source);
  if (resize) {
    pipeline = pipeline.resize(resize.width, resize.height, {
      fit: "cover",
      kernel: "lanczos3",
      position: "centre",
    });
  }
  return pipeline.webp({ lossless: true, effort: 6 }).toBuffer();
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function replaceFile(filePath, buffer) {
  const temp = `${filePath}.lossless-tmp`;
  await writeFile(temp, buffer);
  let lastError = null;
  for (let attempt = 0; attempt < 8; attempt += 1) {
    let handle;
    try {
      // r+ overwrites without truncating first, so a failed open leaves the
      // original bytes in place. Windows denies unlink while Next has the file open.
      handle = await open(filePath, "r+");
      await handle.write(buffer, 0, buffer.length, 0);
      await handle.truncate(buffer.length);
      await handle.close();
      await unlink(temp).catch(() => {});
      return;
    } catch (error) {
      lastError = error;
      await handle?.close().catch(() => {});
      const code = error && typeof error === "object" && "code" in error ? error.code : "";
      if (code !== "UNKNOWN" && code !== "EBUSY" && code !== "EPERM") throw error;
      await wait(250 * (attempt + 1));
    }
  }
  throw lastError;
}

async function convertWebp(filePath) {
  const before = await stat(filePath);
  const current = await sharp(filePath).metadata();
  const master = await sameSizeMaster(filePath, current.width, current.height);
  const thumbMaster = master ? null : await largerMaster(filePath);
  const source = master ?? thumbMaster ?? filePath;
  const resize = thumbMaster
    ? { width: current.width, height: current.height }
    : null;

  if (!master && !thumbMaster) {
    const buf = await readFile(filePath);
    if (isLosslessWebp(buf)) {
      return { filePath, skipped: true, before: before.size, after: before.size };
    }
  }

  const encoded = await encodeLossless(source, resize);
  if (!isLosslessWebp(encoded)) {
    throw new Error(`Encode was not VP8L: ${filePath}`);
  }
  await replaceFile(filePath, encoded);
  return {
    filePath,
    skipped: false,
    source: path.relative(process.cwd(), source),
    before: before.size,
    after: encoded.length,
  };
}

async function convertLogo(pngPath) {
  const webpPath = pngPath.replace(/\.png$/i, ".webp");
  const encoded = await encodeLossless(pngPath, null);
  if (!isLosslessWebp(encoded)) throw new Error(`Logo encode failed: ${pngPath}`);
  await writeFile(webpPath, encoded);
  return { webpPath, bytes: encoded.length };
}

const webps = (await walk(assetsDir)).filter((file) => file.toLowerCase().endsWith(".webp"));
let beforeTotal = 0;
let afterTotal = 0;
let converted = 0;
for (const file of webps) {
  let result;
  try {
    result = await convertWebp(file);
  } catch (error) {
    console.error("failed", path.relative(process.cwd(), file));
    throw error;
  }
  beforeTotal += result.before;
  afterTotal += result.after;
  if (!result.skipped) converted += 1;
  const rel = path.relative(process.cwd(), file);
  const kb = (n) => `${Math.round(n / 1024)}kb`;
  console.log(
    result.skipped ? "skip" : "webp",
    rel,
    result.skipped ? kb(result.before) : `${kb(result.before)} -> ${kb(result.after)}`,
    result.source ? `from ${result.source}` : "",
  );
}

for (const logo of [
  path.join(assetsDir, "logos", "kinexis-logo-on-dark.png"),
  path.join(assetsDir, "logos", "kinexis-logo-on-light.png"),
]) {
  const result = await convertLogo(logo);
  console.log("logo", path.relative(process.cwd(), result.webpPath), `${Math.round(result.bytes / 1024)}kb`);
}

console.log(
  `done ${converted}/${webps.length} converted, ${Math.round(beforeTotal / 1024)}kb -> ${Math.round(afterTotal / 1024)}kb`,
);
