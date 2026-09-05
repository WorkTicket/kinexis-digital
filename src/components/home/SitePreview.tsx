import { LcpImage } from "@/components/ui/LcpImage";
import { cn } from "@/lib/cn";

type SitePreviewProps = {
  image: string;
  imageAlt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Skip `/_next/image` for already-compressed landing stills. */
  direct?: boolean;
};

/** Static homepage screenshot inside the device frame. */
export function SitePreview({
  image,
  imageAlt,
  className,
  sizes = "(max-width: 1024px) 100vw, 52vw",
  priority = false,
  direct = false,
}: SitePreviewProps) {
  return (
    <div className={cn("site-preview", className)}>
      <LcpImage
        src={image}
        alt={imageAlt}
        sizes={sizes}
        quality={priority ? 75 : 70}
        priority={priority}
        direct={direct}
        className="site-preview__still object-cover object-top"
        width={1600}
        height={1000}
      />
    </div>
  );
}
