import type { IndustrySlug, IndustryStatCallout } from "@/content/industries";
import { IndustryGlyph } from "@/components/industry/industry-glyphs";
import { cn } from "@/lib/cn";

type Props = {
  slug: IndustrySlug;
  eyebrow?: string;
  statCallout?: IndustryStatCallout;
  size?: "md" | "lg";
  className?: string;
};

export function IndustrySignalPanel({
  slug,
  eyebrow,
  statCallout,
  size = "md",
  className,
}: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "ind-panel",
        size === "lg" && "ind-panel--lg",
        className,
      )}
    >
      <div className="ind-panel__stage">
        <IndustryGlyph slug={slug} className="ind-panel__glyph" />
      </div>

      {(eyebrow || statCallout) && (
        <div className="ind-panel__meta">
          {eyebrow ? <span className="ind-panel__tag">{eyebrow}</span> : null}
          {statCallout ? (
            <span className="ind-panel__stat">
              <span className="ind-panel__stat-value">{statCallout.value}</span>
              <span className="ind-panel__stat-label">
                {statCallout.label}
              </span>
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}
