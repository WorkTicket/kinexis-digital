type Props = {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  /** In-view images (the LCP) load with the document. Everything else waits until it nears the viewport. */
  eager?: boolean;
  onError?: () => void;
  /** Shown in place of the image if the file fails. Handled outside React so the picture stays static. */
  fallback?: string;
};

function placeholder(width: number, height: number) {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E%3C/svg%3E`;
}

/**
 * Off-screen artwork stays on `data-src` until `DeferImages` sees it near the viewport.
 * The reserved box is the only thing in the first HTML, so the file cannot delay the largest paint.
 */
export function DeferredImg({ src, srcSet, sizes, alt, width, height, className, eager = false, onError, fallback }: Props) {
  if (eager) {
    return (
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
        fetchPriority="high"
        data-fallback={fallback}
        onError={onError}
      />
    );
  }
  return (
    <img
      src={placeholder(width, height)}
      data-src={src}
      data-srcset={srcSet}
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
}
