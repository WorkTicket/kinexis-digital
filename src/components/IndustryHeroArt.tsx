import { IMAGE_SIZES, imageVariant } from "@/lib/image-sources";

/** Responsive industry LCP art. Never points at the multi-hundred-KB master WebP. */
export default function IndustryHeroArt({
  slug,
  alt,
}: {
  slug: string;
  alt: string;
}) {
  const heroFile = `/assets/industries/${slug}/hero.webp`;
  // 480 → mobile lab DPR, 768 → tablet, 960 → desktop 2x.
  const widths = [480, 768, 960] as const;
  const sizes = IMAGE_SIZES.industryHero;
  const webpSrcSet = widths.map((width) => `${imageVariant(heroFile, width, "webp")} ${width}w`).join(", ");
  const avifSrcSet = widths.map((width) => `${imageVariant(heroFile, width, "avif")} ${width}w`).join(", ");
  const fallback = imageVariant(heroFile, 768, "webp");

  return (
    <picture>
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <img
        className="hero-art industry-hero__img"
        src={fallback}
        srcSet={webpSrcSet}
        sizes={sizes}
        alt={alt}
        width={1536}
        height={1024}
        loading="eager"
        decoding="sync"
        fetchPriority="high"
      />
    </picture>
  );
}
