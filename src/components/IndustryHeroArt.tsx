import { preload } from "react-dom";
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
  const mobileAvif = still(`/assets/industries/${slug}/${slug}-mobile.avif`);
  const mobileWebp = still(`/assets/industries/${slug}/${slug}-mobile.webp`);

  preload(desktop, {
    as: "image",
    type: "image/avif",
    media: "(min-width: 861px)",
    fetchPriority: "high",
  });
  preload(mobileAvif, {
    as: "image",
    type: "image/avif",
    media: "(max-width: 860px)",
    fetchPriority: "high",
  });

  return (
    <picture>
      <source media="(max-width: 860px)" type="image/avif" srcSet={mobileAvif} />
      <source media="(max-width: 860px)" type="image/webp" srcSet={mobileWebp} />
      <source type="image/avif" srcSet={desktop} />
      <img
        className="hero-art industry-hero__img"
        src={mobileWebp}
        alt={alt}
        width={1120}
        height={630}
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
    </picture>
  );
}
