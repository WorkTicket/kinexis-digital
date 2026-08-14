import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type RootProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Hero stage wrapper. Scroll-linked parallax is intentionally omitted from
 * the first-load tree — remounting a motion layer after idle caused CLS > 1
 * and wrecked mobile LCP. CSS enter animations still run on the children.
 */
export function HeroScrollRoot({ children, className }: RootProps) {
  return <div className={cn(className)}>{children}</div>;
}

type Props = {
  children: ReactNode;
  layer?: "stage" | "copy";
};

export function HeroParallax({ children }: Props) {
  return <>{children}</>;
}
