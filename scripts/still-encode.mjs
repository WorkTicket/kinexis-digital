// Shared encoder for the pre-sized stills in public/.
// Derivatives are rebuilt from the largest WebP master. AVIF at width <= 960
// stays near the previous transfer size so the LCP candidate does not grow
// enough to drop the lab score. Wider files are the retina-only candidates.
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const AVIF_DETAIL = { effort: 7, chromaSubsampling: "4:4:4" };
const AVIF_PHOTO = { effort: 7, chromaSubsampling: "4:2:0" };
const WEBP_BASE = { alphaQuality: 100, effort: 5, smartSubsample: false };

function avifQuality(width) {
  return width && width <= 960 ? 80 : 86;
}

async function encode(source, { width, format, webpQuality, avifQuality: quality, photo = false }) {
  let pipeline = sharp(source);
  if (width) pipeline = pipeline.resize({ width, withoutEnlargement: true, kernel: "lanczos3" });
  if (format === "webp") return pipeline.webp({ ...WEBP_BASE, quality: webpQuality }).toBuffer();
  return pipeline.avif({ ...(photo ? AVIF_PHOTO : AVIF_DETAIL), quality }).toBuffer();
}

async function writeReplace(output, buffer) {
  let lastError;
  for (let attempt = 0; attempt < 6; attempt++) {
    try {
      await writeFile(output, buffer);
      return;
    } catch (error) {
      lastError = error;
      if (!["UNKNOWN", "EBUSY", "EPERM"].includes(error.code)) throw error;
      await new Promise((resolve) => setTimeout(resolve, 200 * (attempt + 1)));
    }
  }
  throw lastError;
}

/**
 * Replace `output` using `master`. When the current file is a smaller
 * same-aspect version of the master, it is resized to that width.
 * Pass `width` to force a target width (used when creating a new size).
 */
export async function rebuildFromMaster(
  master,
  output,
  { format, webpQuality = 90, width: forcedWidth, photo = false, maxBytes } = {},
) {
  format = format ?? (output.endsWith(".avif") ? "avif" : "webp");
  const source = await readFile(master);
  const masterMeta = await sharp(source).metadata();
  if (!masterMeta.width || !masterMeta.height) throw new Error(`Invalid master: ${master}`);

  // Read the current file into memory first. Sharp keeps a path open on
  // Windows, and that blocks the replacement write.
  const previousBuf = await readFile(output).catch(() => null);
  const previous = previousBuf?.length ?? 0;
  const current = previousBuf ? await sharp(previousBuf).metadata() : null;
  if (current?.width && current?.height) {
    const masterRatio = masterMeta.width / masterMeta.height;
    const delta = Math.abs(current.width / current.height - masterRatio) / masterRatio;
    if (delta > 0.02) {
      console.warn(`skip ${output}: ${current.width}x${current.height} does not match ${masterMeta.width}x${masterMeta.height}`);
      return null;
    }
  }
  let width = forcedWidth && forcedWidth < masterMeta.width ? forcedWidth : undefined;
  if (!width && current?.width && current.width < masterMeta.width) width = current.width;

  const budgeted = format === "avif" && width && width <= 960 && previous > 0 && !maxBytes;
  const limit = previous + Math.max(Math.round(previous * 0.45), 20 * 1024);
  let quality = format === "avif" ? (photo ? 62 : avifQuality(width)) : webpQuality;
  let buffer = await encode(source, { width, format, webpQuality, avifQuality: quality, photo });
  // Hard maxBytes (lab LCP budgets) may need to dip below the usual detail floor.
  const floor = maxBytes ? (photo ? 32 : 48) : photo ? 40 : 72;
  while (
    ((budgeted && buffer.length > limit) || (maxBytes && buffer.length > maxBytes)) &&
    quality > floor
  ) {
    quality -= 4;
    buffer = await encode(source, { width, format, webpQuality, avifQuality: quality, photo });
  }

  const encoded = await sharp(buffer).metadata();
  if (masterMeta.hasAlpha && !encoded.hasAlpha) throw new Error(`Alpha dropped: ${output}`);
  await writeReplace(output, buffer);
  const note = format === "avif" ? ` q${quality}${photo ? " photo" : ""}` : "";
  console.log(`${output}: ${Math.round(previous / 1024)}KB -> ${Math.round(buffer.length / 1024)}KB${note}`);
  return buffer.length;
}
