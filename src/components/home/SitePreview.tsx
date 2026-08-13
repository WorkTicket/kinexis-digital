import Image from "next/image";
import { cn } from "@/lib/cn";

type SitePreviewProps = {
  image: string;
  imageAlt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/** Static homepage screenshot inside the device frame. */
export function SitePreview({
  image,
  imageAlt,
  className,
  sizes = "(max-width: 1024px) 100vw, 52vw",
  priority = false,
}: SitePreviewProps) {
  return (
    <div className={cn("site-preview", className)}>
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes={sizes}
        priority={priority}
        className="site-preview__still object-cover object-top"
      />
    </div>
  );
}
