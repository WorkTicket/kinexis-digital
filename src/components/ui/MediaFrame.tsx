import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type MediaFrameProps = ComponentPropsWithoutRef<"div"> & {
  /** Soft product-shot treatment with border + depth */
  shot?: boolean;
  size?: "sm" | "md" | "lg";
  children: ReactNode;
};

const sizeClass = {
  sm: "media-frame--sm",
  md: "",
  lg: "media-frame--lg",
} as const;

/**
 * Rounded frame for photos and screenshots.
 * Use for case-study imagery, product shots, and UI captures.
 */
export function MediaFrame({
  shot = false,
  size = "md",
  className,
  children,
  ...props
}: MediaFrameProps) {
  return (
    <div
      className={cn(
        "media-frame",
        shot && "media-frame--shot",
        sizeClass[size],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
