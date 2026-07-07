import sharp from "sharp";
import { mkdir, access, unlink } from "node:fs/promises";
import path from "node:path";

const publicDir = path.join(process.cwd(), "public");
const assetsDir = path.join(publicDir, "assets");
const imagesDir = path.join(assetsDir, "images");
const logosDir = path.join(assetsDir, "logos");

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function optimize() {
  await mkdir(logosDir, { recursive: true });

  const logoFullPng = path.join(logosDir, "KINEXIS_logo_full.png");
  const logoIconPng = path.join(logosDir, "KINEXIS_icon_logo.png");

  if (await fileExists(logoFullPng)) {
    await sharp(logoFullPng)
      .resize(360, 60, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(path.join(logosDir, "KINEXIS_logo_full.webp"));

    await sharp(logoFullPng)
      .resize(180, 30, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 72, effort: 6 })
      .toFile(path.join(logosDir, "KINEXIS_logo_preloader.webp"));

    await sharp(logoFullPng)
      .resize(360, 60, { fit: "inside", withoutEnlargement: true })
      .avif({ quality: 80, effort: 6 })
      .toFile(path.join(logosDir, "KINEXIS_logo_full.avif"));
  }

  // Re-optimize from existing webp when source PNG was removed on prior runs
  const logoFullWebp = path.join(logosDir, "KINEXIS_logo_full.webp");
  if (!(await fileExists(logoFullPng)) && (await fileExists(logoFullWebp))) {
    await sharp(logoFullWebp)
      .resize(180, 30, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 72, effort: 6 })
      .toFile(path.join(logosDir, "KINEXIS_logo_preloader.webp"));
  }

  if (await fileExists(logoIconPng)) {
    await sharp(logoIconPng)
      .resize(280, 280, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(path.join(logosDir, "KINEXIS_icon_logo.webp"));

    await sharp(logoIconPng)
      .resize(280, 280, { fit: "inside", withoutEnlargement: true })
      .avif({ quality: 80, effort: 6 })
      .toFile(path.join(logosDir, "KINEXIS_icon_logo.avif"));

    await sharp(logoIconPng)
      .resize(512, 512, { fit: "inside", withoutEnlargement: true })
      .png({ compressionLevel: 9, palette: true })
      .toFile(path.join(publicDir, "logo.png"));
  }

  await mkdir(imagesDir, { recursive: true });

  // Responsive hero background variants (kinexis_hero.jpg → optimized webp)
  const heroSrc = path.join(imagesDir, "kinexis_hero.jpg");
  if (await fileExists(heroSrc)) {
    for (const [name, width] of [
      ["kinexis-hero-mobile", 640],
      ["kinexis-hero-tablet", 1024],
      ["kinexis-hero-desktop", 1920],
    ]) {
      await sharp(heroSrc)
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality: 75, effort: 6 })
        .toFile(path.join(imagesDir, `${name}.webp`));
    }
  }

  // Responsive polygonal net overlay — low-opacity decorative layer, keep files small
  const polyNetSrc = path.join(imagesDir, "Polygonal_Net.jpg");
  const polyNetExisting = path.join(imagesDir, "polygonal-net-desktop.webp");
  const polySource = (await fileExists(polyNetSrc))
    ? polyNetSrc
    : (await fileExists(polyNetExisting))
      ? polyNetExisting
      : null;

  if (polySource) {
    for (const [name, width, quality] of [
      ["polygonal-net-mobile", 640, 40],
      ["polygonal-net-tablet", 720, 38],
      ["polygonal-net-desktop", 960, 38],
    ]) {
      const outPath = path.join(imagesDir, `${name}.webp`);
      const tmpPath = `${outPath}.new`;
      await sharp(polySource)
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality, effort: 6, smartSubsample: true, nearLossless: false })
        .toFile(tmpPath);
      await unlink(outPath).catch(() => {});
      await sharp(tmpPath)
        .webp({ quality, effort: 6, smartSubsample: true })
        .toFile(outPath);
      await unlink(tmpPath).catch(() => {});
    }
  }

  for (const stale of ["polygonal-net-desktop.webp.tmp", "polygonal-net-tablet.webp.tmp", "polygonal-net-mobile.webp.tmp"]) {
    await unlink(path.join(imagesDir, stale)).catch(() => {});
  }

  // Remove redundant assets
  const toRemove = [
    path.join(assetsDir, "noise.png"),
    path.join(assetsDir, "images", "Polygon_mesh.jpg"),
    path.join(assetsDir, "images", "Polygon_mesh.webp"),
    path.join(logosDir, "KINEXIS_icon_logo.png"),
    path.join(logosDir, "KINEXIS_logo_full.png"),
  ];

  for (const file of toRemove) {
    try {
      await unlink(file);
    } catch {
      // ignore missing files
    }
  }

  console.log("Image optimization complete.");
}

optimize().catch((err) => {
  console.error(err);
  process.exit(1);
});
