import Link from "next/link";
import { DeferredImg } from "./DeferredImg";
import { portfolioFile, type Project } from "@/lib/projects";

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
  className = "",
  scrollDuration = 5000,
  showCtaOnHover = false,
}: {
  project: Project;
  href?: string;
  label?: string;
  hrefLang?: string;
  ctaLabel?: string;
  clickToScroll?: boolean;
  className?: string;
  scrollDuration?: number;
  showCtaOnHover?: boolean;
}) {
  const shot = portfolioFile(project.image, 640);
  const full = portfolioFile(project.image);
  const inner = (
    <div className="shot__page">
      <div className="shot__track">
        <DeferredImg
          src={shot}
          srcSet={`${shot} 640w, ${full} 1100w`}
          sizes="(max-width: 720px) 46vw, (max-width: 1100px) 30vw, 280px"
          alt={`${project.name} website design`}
          width={640}
          height={Math.round((project.height * 640) / project.width)}
          className="shot__img"
        />
      </div>
    </div>
  );
  const cls = `shot shot--hero${clickToScroll ? " shot--click" : ""}${className ? ` ${className}` : ""}`;
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
        aria-label={label ?? `View ${project.name}`}
        data-name={project.name}
        data-duration={scrollDuration}
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
        data-duration={scrollDuration}
      >
        {inner}
        <span className="shot__hint" aria-hidden="true">Click to scroll</span>
        {ctaOverlay}
      </div>
    );
  }
  return (
    <div className={cls} data-name={project.name} data-duration={scrollDuration}>
      {inner}
    </div>
  );
}
