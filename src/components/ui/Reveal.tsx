import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps<T extends ElementType> = {
  as?: T;
  /** Cascade the reveal across direct children instead of the container itself. */
  stagger?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/**
 * Server-rendered scroll reveal. Renders plain HTML (no client JS, no framer-motion)
 * and is fully visible in SSR. The entrance animation is a desktop-only, CSS
 * scroll-timeline enhancement defined in globals.css (`.reveal` / `.reveal-stagger`).
 */
export default function Reveal<T extends ElementType = "div">({
  as,
  stagger = false,
  className,
  children,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag className={cn(stagger ? "reveal-stagger" : "reveal", className)} {...rest}>
      {children}
    </Tag>
  );
}
