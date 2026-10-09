"use client";

import { trackCallClick } from "@/lib/analytics/events";
import {
  businessProfile,
  formatBusinessPhone,
  getBusinessTelHref,
} from "@/lib/business";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  children?: React.ReactNode;
  /** Overrides the default English "Call {number}" name. */
  ariaLabel?: string;
  dataCta?: string;
};

/** Click-to-call link — only renders when NEXT_PUBLIC_BUSINESS_PHONE is set. */
export function CallLink({ className, children, ariaLabel, dataCta }: Props) {
  const href = getBusinessTelHref();
  if (!href || !businessProfile.phone) return null;
  const display =
    formatBusinessPhone(businessProfile.phone) ?? businessProfile.phone;

  return (
    <a
      href={href}
      target="_self"
      className={cn("call-link", className)}
      aria-label={ariaLabel ?? `Call ${display}`}
      data-cta={dataCta}
      onClick={() => {
        trackCallClick();
      }}
    >
      {children ?? <span className="call-link__num">{display}</span>}
    </a>
  );
}
