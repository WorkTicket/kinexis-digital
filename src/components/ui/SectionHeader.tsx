import { cn } from "@/lib/utils";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import TwoLineText from "@/components/ui/TwoLineText";
import type { ReactNode } from "react";

type Align = "center" | "left";
type Size = "default" | "lg";

type Props = {
  badge?: string;
  title: string | ReactNode;
  description?: string | ReactNode;
  align?: Align;
  size?: Size;
  headingId?: string;
  /** Retained for call-site compatibility; viewport is owned by Reveal. */
  viewportMargin?: string;
  children?: ReactNode;
  className?: string;
};

export default function SectionHeader({
  badge,
  title,
  description,
  align = "center",
  size = "default",
  headingId,
  children,
  className,
}: Props) {
  const isCenter = align === "center";

  return (
    <Reveal
      stagger
      className={cn(
        "section-header",
        isCenter ? "mx-auto" : "mr-auto",
        className,
      )}
    >
      {badge ? (
        <RevealItem as="span" variant="pop" className="section-label">
          {badge}
        </RevealItem>
      ) : null}
      <RevealItem
        as="h2"
        variant="blur"
        id={headingId}
        className={cn(
          "section-title text-balance",
          size === "lg" && "section-title--lg",
          !isCenter && "section-title--left",
          badge ? "" : "mt-0",
        )}
      >
        {typeof title === "string" ? (
          <TwoLineText text={title} variant="section" />
        ) : (
          title
        )}
      </RevealItem>
      {description ? (
        <RevealItem
          as="p"
          variant="fadeUp"
          className={cn("section-subtitle", !isCenter && "section-subtitle--left")}
        >
          {description}
        </RevealItem>
      ) : null}
      {children ? <RevealItem variant="fadeUp">{children}</RevealItem> : null}
    </Reveal>
  );
}
