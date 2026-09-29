import type { CSSProperties } from "react";

/**
 * Full-bleed still for marketing PageHero routes.
 * Pass a page-specific asset so hubs don't share one photo.
 */
export function PageHeroAtmosphere({
  src,
  srcSm,
  focus,
}: {
  src: string;
  /** Optional smaller still for phones; falls back to `src`. */
  srcSm?: string;
  /** CSS object-position — bias the subject into the clear half under the wash. */
  focus?: string;
}) {
  const mobileSrc = srcSm ?? src;
  const style = focus
    ? ({ ["--page-hero-focus"]: focus } as CSSProperties)
    : undefined;

  return (
    <div
      aria-hidden
      className="page-hero-atmosphere pointer-events-none absolute inset-0 overflow-hidden"
      style={style}
    >
      <picture>
        {srcSm ? (
          <source media="(min-width: 1024px)" srcSet={src} type="image/webp" />
        ) : null}
        <img
          src={mobileSrc}
          alt=""
          width={1920}
          height={1080}
          decoding="async"
          className="page-hero-atmosphere__media"
        />
      </picture>
      <div className="page-hero-atmosphere__scrim" />
    </div>
  );
}
