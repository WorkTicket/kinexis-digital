import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const files = [
  "live-a1-landscaping.jpg",
  "afterglow-outdoor-lighting.webp",
  "slatewash.webp",
  "liftline-garage-doors.webp",
  "clearpeak.webp",
  "fieldstone-masonry.webp",
  "vantage-wraps.webp",
  "groundwork-coatings.webp",
  "undertow-drainage.webp",
  "jollyglow.webp",
  "graft-tree-care.webp",
  "popwave-parties.webp",
  "fieldwork-coaching.webp",
  "spraycraft.webp",
  "basecoat-floors.webp",
  "earthform-grading.webp",
  "sunday-house-cleaning.webp",
  "brightburrow-wildlife.webp",
  "rinseworks.webp",
  "honeycomb-attic.webp",
  "riverstone-basement.webp",
  "haulgood.webp",
  "red-oak-roofing.webp",
  "kiln-hearth-chimney.webp",
];

const budget = 900 * 1024;
for (const file of files) {
  const target = path.join("public/portfolio", file);
  const source = await readFile(target);
  const image = sharp(source);
  const metadata = await image.metadata();
  if (!metadata.width || !metadata.height) throw new Error(`Invalid image: ${target}`);
  if (metadata.width <= 1280 && source.length <= budget) {
    console.log(`${target}: already within budget`);
    continue;
  }

  let quality = 84;
  let output;
  do {
    const pipeline = sharp(source).resize({ width: 1280, withoutEnlargement: true });
    output = file.endsWith(".jpg")
      ? await pipeline.jpeg({ quality, mozjpeg: true }).toBuffer()
      : await pipeline.webp({ quality, effort: 6, smartSubsample: true }).toBuffer();
    if (output.length <= budget || quality <= 64) break;
    quality -= 4;
  } while (quality >= 64);

  if (output.length > budget) {
    throw new Error(`${target} remains above ${budget} bytes at quality ${quality}`);
  }
  await writeFile(target, output);
  console.log(
    `${target}: ${source.length} -> ${output.length} bytes (${metadata.width}x${metadata.height}, q${quality})`,
  );
}
