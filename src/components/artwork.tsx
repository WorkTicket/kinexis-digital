import { kitSrc } from "@/lib/site";
import { DeferredImg } from "./DeferredImg";

/** Decorative artwork lives in /assets/kinexis/decorative, illustrations in /assets/kinexis/illustrations. */
const DECORATIVE = /^(curved-arrow|loop-arrow|underline-swoosh|marker-highlight|pricing-brush|pricing-burst|emphasis-rays|section-background|dot-grid|brand-backdrop|cobalt-|cyan-oval|navy-outline-ring|orange-|pale-dot-grid)/;

/** Loads an SVG icon from /assets/kinexis/icons/{name}.svg once it is near the viewport.
 *  Pass alt="" when a heading already names the icon, so it is not announced twice. */
export function Icon({ name, className = "", alt, size = 84 }: { name: string; className?: string; alt?: string; size?: number }) {
  return (
    <img
      src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'%3E%3C/svg%3E`}
      data-src={kitSrc(`/assets/kinexis/icons/${name}.svg`)}
      alt={alt === undefined ? name : alt}
      className={`icon ${className}`}
      width={size}
      height={size}
      decoding="async"
    />
  );
}

/** Loads an SVG illustration from /assets/kinexis/illustrations/{name}.svg or /assets/kinexis/decorative/{name}.svg */
export function Illustration({ name, className = "", alt, width, height, format = "svg", folder, priority = false }: { name: string; className?: string; alt?: string; width?: number; height?: number; format?: "svg" | "webp" | "png"; folder?: "illustrations" | "decorative"; priority?: boolean }) {
  const ext = format === "svg" ? "svg" : format;
  const dir = folder ?? (DECORATIVE.test(name) ? "decorative" : "illustrations");
  const label = alt === undefined ? name : alt;
  const imageWidth = width ?? 240;
  const imageHeight = height ?? 180;
  const imageSrc = `/assets/kinexis/${dir}/${name}.${ext}`;
  if (!priority && format !== "svg") {
    return (
      <DeferredImg
        src={imageSrc}
        alt={label}
        className={className}
        width={imageWidth}
        height={imageHeight}
      />
    );
  }
  return (
    <img
      src={imageSrc}
      alt={label}
      aria-hidden={label === "" ? true : undefined}
      className={className}
      width={imageWidth}
      height={imageHeight}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "low"}
    />
  );
}
