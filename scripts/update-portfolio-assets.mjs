import { access, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const suppliedRoot = path.resolve(process.argv[2] ?? "design-source/portfolio-upgraded");
const suppliedWebp = path.join(suppliedRoot, "webp");
const legacyRoot = path.resolve("design-source/portfolio/full-pages");
const hasSuppliedPackage = await access(suppliedWebp).then(() => true, () => false);
const hasFlatScreenshots = !hasSuppliedPackage && await access(suppliedRoot).then(() => true, () => false);
const screenshotsRoot = hasSuppliedPackage
  ? suppliedWebp
  : hasFlatScreenshots
    ? suppliedRoot
    : path.join(legacyRoot, "Desktop");
const mobileRoot = hasSuppliedPackage
  ? suppliedWebp
  : hasFlatScreenshots
    ? suppliedRoot
    : path.join(legacyRoot, "Mobile");
const devicesRoot = hasSuppliedPackage ? path.join(suppliedRoot, "device-webp") : undefined;
const dataPath = "src/data/portfolio.ts";
let data = await readFile(dataPath, "utf8");
const projects = [...data.matchAll(/\{ slug: "([^"]+)"[^\n]+/g)];
const screenshots = await readdir(screenshotsRoot);
const devices = devicesRoot ? await readdir(devicesRoot) : [];
const inputs = await Promise.all(projects.map(async ([line, slug]) => {
  const file = screenshots.find((name) => name.toLowerCase() === `${slug}-desktop-full.webp`);
  if (!file) throw new Error(`Missing desktop screenshot: ${slug}`);
  const mobileFile = screenshots.find((name) => name.toLowerCase() === `${slug}-mobile-full.webp`)
    ?? file.replace("-Desktop-", "-Mobile-");
  const mobile = path.join(mobileRoot, mobileFile);
  await sharp(mobile).metadata();
  const source = path.join(screenshotsRoot, file);
  const metadata = await sharp(source).metadata();
  if (!metadata.width || !metadata.height) throw new Error(`Invalid screenshot: ${file}`);
  const deviceFile = devices.find((name) => name.toLowerCase() === `${slug}-four-device.webp`);
  return { line, slug, source, deviceSource: deviceFile && devicesRoot ? path.join(devicesRoot, deviceFile) : undefined };
}));

for (const { line, slug, source, deviceSource } of inputs) {
  const full = await sharp(source).resize({ width: 1100 }).webp({ quality: 88 }).toBuffer({ resolveWithObject: true });
  const small = await sharp(source).resize({ width: 640 }).webp({ quality: 85 }).toBuffer();
  await writeFile(`public/portfolio/${slug}.webp`, full.data);
  await writeFile(`public/portfolio/${slug}-640.webp`, small);
  if (deviceSource) {
    const [deviceFull, deviceSmall] = await Promise.all([
      sharp(deviceSource).resize({ width: 1536, withoutEnlargement: true }).webp({ quality: 88, alphaQuality: 90, smartSubsample: true }).toBuffer(),
      sharp(deviceSource).resize({ width: 768 }).webp({ quality: 85, alphaQuality: 90, smartSubsample: true }).toBuffer(),
    ]);
    await writeFile(`public/portfolio/${slug}-devices.webp`, deviceFull);
    await writeFile(`public/portfolio/${slug}-devices-sm.webp`, deviceSmall);
  }
  data = data.replace(line, line.replace(/width: \d+, height: \d+/, `width: ${full.info.width}, height: ${full.info.height}`));
  console.log(`${slug}: ${full.info.width} x ${full.info.height}`);
}
data = data.replace(/PORTFOLIO_ASSET_VERSION = "(\d+)"/, (_, version) => `PORTFOLIO_ASSET_VERSION = "${Number(version) + 1}"`);
await writeFile(dataPath, data);
console.log(`Updated ${inputs.length} projects and ${inputs.length * (devicesRoot ? 4 : 2)} responsive assets.`);
