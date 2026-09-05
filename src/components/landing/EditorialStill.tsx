import { SitePreview } from "@/components/home/SitePreview";
import { cn } from "@/lib/cn";

type Props = {
  image: string;
  imageAlt: string;
  sizes: string;
  /** 16:9 story still vs 4:3 case plate */
  wide?: boolean;
  className?: string;
  direct?: boolean;
};

/** Full-bleed editorial still — used instead of a laptop frame on paid landers. */
export function EditorialStill({
  image,
  imageAlt,
  sizes,
  wide = false,
  className,
  direct = false,
}: Props) {
  return (
    <figure
      className={cn(
        "lp-editorial-still",
        wide && "lp-editorial-still--wide",
        className,
      )}
    >
      <SitePreview
        image={image}
        imageAlt={imageAlt}
        sizes={sizes}
        direct={direct}
      />
    </figure>
  );
}
