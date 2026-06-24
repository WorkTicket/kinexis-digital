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
  return (
    // Native img avoids next/image SSR/client markup differences that cause hydration errors.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={cn("block max-w-full object-contain object-left", className)}
    />
  );
}
