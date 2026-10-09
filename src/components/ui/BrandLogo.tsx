import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

type BrandLogoProps = {
  className?: string;
  height?: number;
  lazy?: boolean;
};

/**
 * Header/footer mark — native img so the optimizer never contends with LCP.
 * Parent links expose the accessible name; alt supports SEO crawlers.
 */
export function BrandLogo({ className, height = 28, lazy = false }: BrandLogoProps) {
  const style = { "--brand-logo-h": `${height}px` } as CSSProperties;
  const loading = lazy ? ("lazy" as const) : undefined;

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/logos/kinexis-logo-on-light.png"
        alt="Kinexis Digital"
        width={180}
        height={35}
        decoding="async"
        fetchPriority="low"
        loading={loading}
        className={cn("brand-logo brand-logo--on-light", className)}
        style={style}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/logos/kinexis-logo-on-dark.png"
        alt="Kinexis Digital"
        width={180}
        height={35}
        decoding="async"
        fetchPriority="low"
        loading={loading}
        className={cn("brand-logo brand-logo--on-dark", className)}
        style={style}
      />
    </>
  );
}
