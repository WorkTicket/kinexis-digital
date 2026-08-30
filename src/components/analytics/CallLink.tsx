"use client";

import { trackCallClick } from "@/lib/analytics/events";
import { businessProfile, getBusinessTelHref } from "@/lib/business";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

/** Click-to-call link — only renders when NEXT_PUBLIC_BUSINESS_PHONE is set. */
export function CallLink({ className, children }: Props) {
  const href = getBusinessTelHref();
  if (!href || !businessProfile.phone) return null;

  return (
    <a
      href={href}
      className={cn(className)}
      onClick={() => {
        trackCallClick();
      }}
    >
      {children ?? businessProfile.phone}
    </a>
  );
}
