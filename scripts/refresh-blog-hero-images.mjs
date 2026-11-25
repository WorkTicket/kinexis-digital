import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const replacements = [
  ["public/og/tools.webp", "public/blog/small-business-marketing-budget.webp"],
  ["public/og/web-design.webp", "public/blog/contractor-website-quote-form.webp"],
  ["public/og/website-management.webp", "public/blog/contractor-website-redesign-checklist.webp"],
  ["public/og/services.webp", "public/blog/how-to-choose-contractor-web-designer.webp"],
  ["public/portfolio/good-riddance-junk-card.webp", "public/blog/junk-removal-website-cost.webp"],
  ["public/portfolio/graft-tree-care-card.webp", "public/blog/tree-service-website-cost.webp"],
  ["public/og/portfolio.webp", "public/blog/contractor-website-checklist.webp"],
  ["public/og/industries.webp", "public/blog/plumber-website-pages-es.webp"],
  ["public/og/reviews.webp", "public/blog/contractor-google-reviews-es.webp"],
  ["public/og/seo-services.webp", "public/blog/google-business-profile-checklist.webp"],
];
const widths = [640, 768, 960];

for (const [source, target] of replacements) {
  const directory = path.dirname(target);
  await mkdir(directory, { recursive: true });
  const sourceMetadata = await sharp(source).metadata();
  const sourceRatio = (sourceMetadata.width ?? 0) / (sourceMetadata.height ?? 1);
  const fit = sourceRatio > 1.8 ? "contain" : "cover";
  const resizeOptions = { fit, position: "centre", background: "#031b4e" };
  const master = sharp(source).resize(1200, 675, resizeOptions);
  await master.clone().webp({ quality: 88 }).toFile(target);

  for (const width of widths) {
    const stem = target.replace(/\.webp$/, `-${width}`);
    await sharp(source)
      .resize(width, Math.round((width * 675) / 1200), resizeOptions)
      .webp({ quality: 84 })
      .toFile(`${stem}.webp`);
    await sharp(source)
      .resize(width, Math.round((width * 675) / 1200), resizeOptions)
      .avif({ quality: 55 })
      .toFile(`${stem}.avif`);
  }
}

console.log(`Refreshed ${replacements.length} unique blog hero images and responsive variants.`);
