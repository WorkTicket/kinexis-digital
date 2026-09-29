/**
 * Full-bleed still for marketing PageHero routes.
 * Pass a page-specific asset so hubs don't share one photo.
 */
export function PageHeroAtmosphere({
  src,
  srcSm,
}: {
  src: string;
  /** Optional smaller still for phones; falls back to `src`. */
  srcSm?: string;
}) {
  const mobileSrc = srcSm ?? src;

  return (
    <div
      aria-hidden
      className="page-hero-atmosphere pointer-events-none absolute inset-0 overflow-hidden"
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
