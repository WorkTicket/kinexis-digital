import { DeferredImg } from "./DeferredImg";

/** Artwork that stays out of the first paint, with a quiet placeholder if the file is missing. */
export default function SafeImage({
  alt,
  src,
  width,
  height,
  sizes,
  srcSet,
  fallbackLabel = "Image coming soon",
  className = "",
}: {
  alt: string;
  src: string;
  width: number;
  height: number;
  sizes?: string;
  srcSet?: string;
  fallbackLabel?: string;
  className?: string;
}) {
  return (
    <DeferredImg
      src={src}
      srcSet={srcSet}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      fallback={fallbackLabel}
    />
  );
}
