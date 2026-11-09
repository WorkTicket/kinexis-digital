import { imageVariant } from "@/lib/image-sources";

/** Responsive industry LCP art. Never points at the multi-hundred-KB master WebP. */
export default function IndustryHeroArt({
  slug,
  alt,
}: {
  slug: string;
  alt: string;
}) {
  const heroFile = `/assets/industries/${slug}/hero.webp`;
  // 480 → mobile 2x, 768 → mobile 3x / desktop 1x, 960 → desktop 2x.
  const widths = [480, 768, 960] as const;
  const sizes = "(max-width: 860px) 92vw, 620px";
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
        decoding="async"
        fetchPriority="high"
      />
    </picture>
  );
}
