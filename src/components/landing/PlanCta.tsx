"use client";

import { Button } from "@/components/ui/Button";
import { trackLandingFunnel } from "@/lib/analytics/landing-funnel";
import type { ButtonSize } from "@/lib/button-styles";
import type { MouseEvent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  placement: string;
  landingSlug?: string;
  href?: string;
  size?: ButtonSize;
  className?: string;
  arrow?: boolean;
  fullWidthMobile?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function PlanCta({
  children,
  placement,
  landingSlug = "get-a-website",
  href = "#lp-form",
  size = "lg",
  className,
  arrow,
  fullWidthMobile,
  onClick,
}: Props) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackLandingFunnel("cta_click", { landingSlug, placement });
    onClick?.(event);
  };

  return (
    <Button
      href={href}
      size={size}
      className={className}
      arrow={arrow}
      fullWidthMobile={fullWidthMobile}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
