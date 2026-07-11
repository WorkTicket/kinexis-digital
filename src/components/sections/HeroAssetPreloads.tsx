/** Homepage hero background preloads — must render at page root for head hoisting. */
export default function HeroAssetPreloads() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/assets/images/kinexis-hero-desktop.webp"
        media="(min-width: 1280px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/assets/images/kinexis-hero-tablet.webp"
        media="(min-width: 768px) and (max-width: 1279px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/assets/images/polygonal-net-desktop.webp"
        media="(min-width: 1280px)"
      />
      <link
        rel="preload"
        as="image"
        href="/assets/images/polygonal-net-tablet.webp"
        media="(min-width: 1024px) and (max-width: 1279px)"
      />
    </>
  );
}
