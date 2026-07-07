import { cn } from "@/lib/utils";

type SiteLogoProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
};

export default function SiteLogo({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
}: SiteLogoProps) {
  const avifSrc = src.endsWith(".webp") ? src.replace(/\.webp$/, ".avif") : null;

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority="auto"
      className={cn("block max-w-full object-contain object-left", className)}
    />
  );

  if (!avifSrc) return img;

  return (
    <picture>
      <source srcSet={avifSrc} type="image/avif" />
      {img}
    </picture>
  );
}
