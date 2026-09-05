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
};

/** Click-to-call link — only renders when NEXT_PUBLIC_BUSINESS_PHONE is set. */
export function CallLink({ className, children }: Props) {
  const href = getBusinessTelHref();
  if (!href || !businessProfile.phone) return null;
  const display =
    formatBusinessPhone(businessProfile.phone) ?? businessProfile.phone;

  return (
    <a
      href={href}
      target="_self"
      className={cn("call-link", className)}
      aria-label={`Call ${display}`}
      onClick={() => {
        trackCallClick();
      }}
    >
      {children ?? <span className="call-link__num">{display}</span>}
    </a>
  );
}
