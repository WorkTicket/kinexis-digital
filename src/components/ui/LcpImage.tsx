import Image from "next/image";
import { cn } from "@/lib/cn";

type LcpImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  quality?: number;
  /** Skip the image optimizer and preload the file so LCP is not queued behind Sharp. */
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  /** Smaller still for phones — preloaded only on mobile. */
  mobileSrc?: string;
  /** Already-compressed webp: skip `/_next/image` and lazy-load the file. */
  direct?: boolean;
};

/**
 * Priority stills serve the already-compressed asset directly.
 * `/_next/image` on Cloudflare Workers adds a transform hop that delays LCP
 * on Slow 4G — the homepage poster already avoids that path.
 */
export function LcpImage({
  src,
  alt,
  className,
  sizes,
  quality = 75,
  priority = false,
  fill = true,
  width = 1200,
  height = 800,
  mobileSrc,
  direct = false,
}: LcpImageProps) {
  const imgClassName = cn(
    fill && "absolute inset-0 h-full w-full object-cover",
    className,
  );

  if (priority) {
    return (
      <>
        {mobileSrc ? (
          <>
            <link
              rel="preload"
              as="image"
              href={mobileSrc}
              type="image/webp"
              media="(max-width: 767px)"
              fetchPriority="high"
            />
            <link
              rel="preload"
              as="image"
              href={src}
              type="image/webp"
              media="(min-width: 768px)"
              fetchPriority="high"
            />
          </>
        ) : (
          <link
            rel="preload"
            as="image"
            href={src}
            type="image/webp"
            fetchPriority="high"
          />
        )}
        {mobileSrc ? (
          <picture>
            <source media="(min-width: 768px)" srcSet={src} type="image/webp" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mobileSrc}
              alt={alt}
              width={width}
              height={height}
              fetchPriority="high"
              decoding="sync"
              className={imgClassName}
            />
          </picture>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            fetchPriority="high"
            decoding="sync"
            className={imgClassName}
          />
        )}
      </>
    );
  }

  if (direct) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        className={imgClassName}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        className={className}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      quality={quality}
      className={className}
    />
  );
}
