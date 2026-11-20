import { preload } from "react-dom";
import { still } from "@/lib/image-sources";

const PAGE_ART = "/assets/kinexis/page-art";
const HOME_ART = "/assets/home";

export type CampaignPageArt =
  | "homepage-hero"
  | "website-audit"
  | "about"
  | "portfolio"
  | "industries"
  | "pricing"
  | "client-reviews"
  | "blog"
  | "contact"
  | "all-services"
  | "web-design"
  | "local-seo"
  | "upgrades";

export function CampaignHeroArtwork({
  name,
  alt,
  fallback,
  priority = false,
}: {
  name: CampaignPageArt;
  alt: string;
  fallback: string;
  priority?: boolean;
}) {
  const desktop = still(`${PAGE_ART}/${name}-desktop.avif`);
  const mobile = still(`${PAGE_ART}/${name}-mobile.webp`);
  if (priority) {
    preload(desktop, {
      as: "image",
      type: "image/avif",
      media: "(min-width: 861px)",
      fetchPriority: "high",
    });
    preload(mobile, {
      as: "image",
      type: "image/webp",
      media: "(max-width: 860px)",
      fetchPriority: "high",
    });
  }

  return (
    <picture className="campaign-page-art">
      <source media="(max-width: 860px)" type="image/webp" srcSet={mobile} />
      <source type="image/avif" srcSet={desktop} />
      <img
        src={fallback}
        alt={alt}
        width={2400}
        height={1350}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "low"}
        className="hero-art campaign-page-art__img"
      />
    </picture>
  );
}

export type HomeSectionArt =
  | "homepage-website-showcase"
  | "homepage-built-for-your-trade"
  | "review-follow-up";

const HOME_ART_DIMENSIONS: Record<HomeSectionArt, { width: number; height: number }> = {
  "homepage-website-showcase": { width: 1200, height: 1156 },
  "homepage-built-for-your-trade": { width: 1200, height: 869 },
  "review-follow-up": { width: 1200, height: 691 },
};

/** Section graphics use 800w WebP for narrow layouts and the supplied 1200w
 * AVIF/WebP master for larger slots; the 1600w files are intentionally unused
 * because these sections never render wide enough to benefit from them. */
export function HomeSectionArtwork({
  name,
  alt,
  className = "",
}: {
  name: HomeSectionArt;
  alt: string;
  className?: string;
}) {
  const narrow = still(`${HOME_ART}/${name}-800w.webp`);
  const wideFormat = name === "review-follow-up" ? "webp" : "avif";
  const wide = still(`${HOME_ART}/${name}-1200w.${wideFormat}`);
  const { width, height } = HOME_ART_DIMENSIONS[name];

  return (
    <picture className={`home-section-art ${className}`.trim()}>
      <source media="(max-width: 860px)" type="image/webp" srcSet={narrow} />
      <source type={`image/${wideFormat}`} srcSet={wide} />
      <img
        src={narrow}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
      />
    </picture>
  );
}
