import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealVariant = "fade" | "fadeUp" | "rise" | "clip" | "blur" | "pop";
type RevealTag =
  | "div"
  | "li"
  | "header"
  | "article"
  | "ul"
  | "ol"
  | "section"
  | "dl"
  | "span"
  | "p"
  | "h2"
  | "h3"
  | "h4"
  | "nav"
  | "aside"
  | "figure"
  | "figcaption";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  as?: RevealTag;
  /** Retained for call-site compatibility; viewport is owned by CSS. */
  when?: string;
  eager?: boolean;
  stagger?: boolean;
};

/**
 * Zero-JS entrance shell. Content is always visible in SSR (no opacity:0 trap).
 * Desktop-only view-timeline polish lives in motion.css (.motion-section).
 */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  stagger = false,
}: RevealProps) {
  return (
    <Tag
      className={cn(
        stagger ? "motion-stagger" : "motion-section",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  as?: RevealTag;
  stagger?: number;
  delayChildren?: number;
  when?: string;
  "aria-label"?: string;
};

export function RevealGroup({
  children,
  className,
  as: Tag = "div",
  "aria-label": ariaLabel,
}: RevealGroupProps) {
  return (
    <Tag className={cn("motion-stagger", className)} aria-label={ariaLabel}>
      {children}
    </Tag>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  as?: RevealTag;
  id?: string;
};

export function RevealItem({
  children,
  className,
  as: Tag = "div",
  id,
}: RevealItemProps) {
  return (
    <Tag className={className} id={id}>
      {children}
    </Tag>
  );
}

type MediaRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "wipe" | "float";
  from?: "left" | "right";
};

/** Media stays painted — clip/wipe polish is CSS-only on desktop. */
export function MediaReveal({
  children,
  className,
}: MediaRevealProps) {
  return (
    <div className={cn("media-reveal motion-section", className)}>{children}</div>
  );
}

export default Reveal;
