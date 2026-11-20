import { imageVariant, still } from "@/lib/image-sources";

const SUPPLIED_INDUSTRY_HEROES = new Set([
  "plumbing", "hvac", "electrical", "roofing", "garage-doors", "painting",
  "remodeling", "landscaping", "pressure-washing", "junk-removal", "tree-care",
]);

/** Per-industry desktop/mobile hero artwork supplied as optimized AVIF/WebP. */
export default function IndustryHeroArt({
  slug,
  alt,
}: {
  slug: string;
  alt: string;
}) {
  const hasSuppliedHero = SUPPLIED_INDUSTRY_HEROES.has(slug);
  const desktop = still(`/assets/industries/${slug}/${slug}-desktop.avif`);
  const mobile = hasSuppliedHero
    ? still(`/assets/industries/${slug}/${slug}-mobile.webp`)
    : imageVariant(`/assets/industries/${slug}/hero.webp`, 768, "webp");
  const oldDesktopSrcSet = [480, 768, 960, 1120, 1536]
    .map((width) => `${imageVariant(`/assets/industries/${slug}/hero.webp`, width, "avif")} ${width}w`)
    .join(", ");

  return (
    <picture>
      {hasSuppliedHero ? (
        <>
          <source media="(max-width: 860px)" type="image/webp" srcSet={mobile} />
          <source type="image/avif" srcSet={desktop} />
        </>
      ) : (
        <source type="image/avif" srcSet={oldDesktopSrcSet} />
      )}
      <img
        className="hero-art industry-hero__img"
        src={mobile}
        alt={alt}
        width={2400}
        height={1350}
        loading="eager"
        decoding="sync"
        fetchPriority="high"
      />
    </picture>
  );
}
