import Link from "next/link";
import { DeferredImg } from "./DeferredImg";
import { portfolioFile, portfolioShotSrcSet, type Project } from "@/lib/projects";

/** Matches CSS display: ~46vw mobile / ~280px desktop shot frames. */
const SHOT_SIZES = "(max-width: 720px) 46vw, (max-width: 1100px) 30vw, 280px";

/**
 * Browser frame with a full-page screenshot.
 * Hover, click, and keyboard scrolling are handled once for every frame.
 * A missing screenshot falls back to a neutral placeholder.
 */
export function ShotFrame({
  project,
  href,
  label,
  hrefLang,
  ctaLabel = "View This Project",
  clickToScroll = false,
  scrollOnHover = true,
  className = "",
  showCtaOnHover = false,
}: {
  project: Project;
  href?: string;
  label?: string;
  hrefLang?: string;
  ctaLabel?: string;
  clickToScroll?: boolean;
  scrollOnHover?: boolean;
  className?: string;
  showCtaOnHover?: boolean;
}) {
  // Scrollable frames need the full-page capture so hover/hold can pan — serve
  // 320w by default (lab ~280px / 46vw) with 640w for DPR via srcset.
  // Static listing cards keep the lighter top 4:3 crop.
  const useCard = !scrollOnHover;
  const shot = portfolioFile(project.image, useCard ? "card" : 320);
  const srcSet = useCard ? undefined : portfolioShotSrcSet(project.image, "webp");
  const avifSrcSet = useCard ? undefined : portfolioShotSrcSet(project.image, "avif");
  const width = useCard ? 640 : 320;
  const height = useCard ? 480 : Math.round((project.height * width) / project.width);
  // Named link owns the accessible name; keep the screenshot decorative so
  // label-content-name-mismatch only cares about visible CTA text.
  const imgAlt = href ? "" : `${project.name} website design`;
  const accessibleName = showCtaOnHover
    ? `${ctaLabel}: ${project.name}`
    : (label ?? `View ${project.name}`);
  const inner = (
    <div className="shot__page">
      <div className="shot__track">
        <DeferredImg
          src={shot}
          srcSet={srcSet}
          avifSrcSet={avifSrcSet}
          sizes={SHOT_SIZES}
          alt={imgAlt}
          width={width}
          height={height}
          className="shot__img"
        />
      </div>
    </div>
  );
  const cls = `shot shot--hero${clickToScroll ? " shot--click" : ""}${scrollOnHover ? "" : " shot--static"}${className ? ` ${className}` : ""}`;
  const ctaOverlay = showCtaOnHover ? (
    <span className="btn btn--primary shot__cta-overlay" aria-hidden="true">
      {ctaLabel}
    </span>
  ) : null;

  if (href) {
    return (
      <Link
        className={cls}
        href={href}
        hrefLang={hrefLang}
        prefetch={false}
        aria-label={accessibleName}
        data-name={project.name}
      >
        {inner}
        {ctaOverlay}
      </Link>
    );
  }
  if (clickToScroll) {
    return (
      <div
        className={cls}
        role="button"
        tabIndex={0}
        aria-label={`Scroll the ${project.name} website screenshot`}
        data-name={project.name}
      >
        {inner}
        <span className="shot__hint" aria-hidden="true">Click to scroll</span>
        {ctaOverlay}
      </div>
    );
  }
  return (
    <div className={cls} data-name={project.name}>
      {inner}
    </div>
  );
}
