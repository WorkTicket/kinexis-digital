"use client";

import type { ReactNode } from "react";
import { usePathname } from "@/i18n/navigation";
import { getLandingChrome } from "@/lib/landing-chrome";

type Props = {
  /** Rendered on paid landers (logo + form CTA chrome). */
  onLanding?: ReactNode;
  /** Rendered on the rest of the site. */
  offLanding?: ReactNode;
  /** Dallas Meta lander only. Other /lp pages keep their existing chrome. */
  slimOnly?: boolean;
};

export function LandingChromeGate({
  onLanding = null,
  offLanding = null,
  slimOnly = false,
}: Props) {
  const pathname = usePathname();
  const landing = getLandingChrome(pathname);
  const active = slimOnly ? Boolean(landing?.slim) : Boolean(landing);
  return active ? onLanding : offLanding;
}
