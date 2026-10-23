import { ShotFrame } from "./ShotFrame";
import type { Project } from "@/lib/projects";

/** Portfolio card: scrollable screenshot on hover. "View This Project" overlay appears on hover for real projects. */
export default function ProjectCard({ project, href, label, hrefLang, ctaLabel }: { project: Project; href?: string; label?: string; hrefLang?: string; ctaLabel?: string }) {
  const isPlaceholder = project.placeholder === true;
  return (
    <ShotFrame
      project={project}
      href={isPlaceholder ? undefined : (href ?? `/portfolio/${project.slug}`)}
      label={isPlaceholder ? undefined : (label ?? `View ${project.name}`)}
      hrefLang={isPlaceholder ? undefined : hrefLang}
      ctaLabel={ctaLabel}
      scrollDuration={10000}
      showCtaOnHover={!isPlaceholder}
    />
  );
}