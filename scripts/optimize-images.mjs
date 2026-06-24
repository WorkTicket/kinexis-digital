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
      .webp({ quality: 90, effort: 6 })
      .toFile(path.join(logosDir, "KINEXIS_logo_full.webp"));

    await sharp(logoFullPng)
      .resize(360, 60, { fit: "inside", withoutEnlargement: true })
      .avif({ quality: 80, effort: 6 })
      .toFile(path.join(logosDir, "KINEXIS_logo_full.avif"));
  }

  if (await fileExists(logoIconPng)) {
    await sharp(logoIconPng)
      .resize(280, 280, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 90, effort: 6 })
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

  // Responsive polygonal net overlay (Polygonal_Net.jpg → optimized webp)
  const polyNetSrc = path.join(imagesDir, "Polygonal_Net.jpg");
  if (await fileExists(polyNetSrc)) {
    for (const [name, width] of [
      ["polygonal-net-mobile", 640],
      ["polygonal-net-tablet", 1024],
      ["polygonal-net-desktop", 1920],
    ]) {
      await sharp(polyNetSrc)
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality: 80, effort: 6 })
        .toFile(path.join(imagesDir, `${name}.webp`));
    }
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
