import { still } from "@/lib/image-sources";

/** Per-industry desktop/mobile hero artwork supplied as optimized AVIF/WebP. */
export default function IndustryHeroArt({
  slug,
  alt,
}: {
  slug: string;
  alt: string;
}) {
  const desktop = still(`/assets/industries/${slug}/${slug}-desktop.avif`);
  const mobile = still(`/assets/industries/${slug}/${slug}-mobile.webp`);

  return (
    <picture>
      <source media="(max-width: 860px)" type="image/webp" srcSet={mobile} />
      <source type="image/avif" srcSet={desktop} />
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
