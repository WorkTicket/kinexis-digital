"use client";

import { usePathname } from "@/i18n/navigation";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
  landingHeader: ReactNode;
  landingFooter: ReactNode;
};

/** Swaps full site chrome for a conversion-focused shell on /lp/* landers. */
export function SiteShell({
  children,
  header,
  footer,
  landingHeader,
  landingFooter,
}: Props) {
  const pathname = usePathname();
  const isLanding = pathname.startsWith("/lp");

  return (
    <>
      {isLanding ? landingHeader : header}
      <div className="site-shell flex min-h-full flex-1 flex-col">
        <div id="main-content" className="flex flex-1 flex-col">
          {children}
        </div>
        {isLanding ? landingFooter : footer}
      </div>
    </>
  );
}
