"use client";

import { Button } from "@/components/ui/Button";
import { trackCallClick } from "@/lib/analytics/events";
import {
  businessProfile,
  formatBusinessPhone,
  getBusinessTelHref,
} from "@/lib/business";
import type { ButtonSize, ButtonVariant } from "@/lib/button-styles";

type Props = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  fullWidthMobile?: boolean;
  className?: string;
  children?: React.ReactNode;
};

/** Button-styled click-to-call — no-ops when phone is not configured. */
export function CallButton({
  variant = "outline",
  size = "lg",
  fullWidth,
  fullWidthMobile,
  className,
  children,
}: Props) {
  const href = getBusinessTelHref();
  if (!href || !businessProfile.phone) return null;

  const label =
    children ??
    `Call ${formatBusinessPhone(businessProfile.phone) ?? businessProfile.phone}`;

  return (
    <Button
      href={href}
      target="_self"
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      fullWidthMobile={fullWidthMobile}
      className={className}
      onClick={() => {
        trackCallClick();
      }}
    >
      {label}
    </Button>
  );
}
