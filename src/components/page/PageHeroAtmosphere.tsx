/**
 * Full-bleed still for marketing PageHero routes.
 * Mesh orbs are display:none in globals — this is the visible atmosphere.
 */
export function PageHeroAtmosphere() {
  return (
    <div
      aria-hidden
      className="page-hero-atmosphere pointer-events-none absolute inset-0 overflow-hidden"
    >
      <picture>
        <source
          media="(min-width: 1024px)"
          srcSet="/assets/images/editorial/hero-still.webp"
          type="image/webp"
        />
        <img
          src="/assets/images/editorial/hero-still-sm.webp"
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
