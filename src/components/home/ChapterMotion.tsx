import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Chapter wrapper. Scroll-settle motion is omitted from first load so
 * chapter content does not remount after idle (CLS / LCP).
 */
export function ChapterMotion({ children, className }: Props) {
  return <div className={className}>{children}</div>;
}
