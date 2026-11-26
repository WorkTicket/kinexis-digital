type Props = {
  src: string;
  srcSet?: string;
  avifSrcSet?: string;
  sizes?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  /** Near-fold images may load with the document. Never uses fetchpriority=high —
   * that is reserved for real LCP art (PageHero / CampaignHeroArtwork / HeroFilm). */
  eager?: boolean;
  onError?: () => void;
  /** Shown in place of the image if the file fails. Handled outside React so the picture stays static. */
  fallback?: string;
};

/**
 * Let the browser's native lazy loader handle off-screen artwork. Keeping the
 * real URL in the HTML means images still load if the optional boot script is delayed.
 */
export function DeferredImg({ src, srcSet, avifSrcSet, sizes, alt, width, height, className, eager = false, onError, fallback }: Props) {
  if (eager) {
    const image = (
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        aria-hidden={alt === "" ? true : undefined}
        className={className}
        loading="eager"
        decoding="async"
        fetchPriority="auto"
        data-fallback={fallback}
        onError={onError}
      />
    );
    return avifSrcSet ? <picture><source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />{image}</picture> : image;
  }
  const image = (
      <img
        src={src}
        srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      aria-hidden={alt === "" ? true : undefined}
      className={className}
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      data-fallback={fallback}
      onError={onError}
    />
  );
  return avifSrcSet ? <picture><source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />{image}</picture> : image;
}
