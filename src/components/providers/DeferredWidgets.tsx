"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, Suspense } from "react";
import { usePathname } from "@/i18n/navigation";

const BackToTop = dynamic(() => import("@/components/layout/BackToTop"), { ssr: false });

export default function DeferredWidgets() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const isLanding = pathname.startsWith("/lp/");

  useEffect(() => {
    if (isLanding) return;

    // Defer widget mount until the browser is idle so they never compete
    // with LCP or FID on the critical path.
    if (typeof requestIdleCallback !== "undefined") {
      const id = requestIdleCallback(() => setMounted(true), { timeout: 3000 });
      return () => cancelIdleCallback(id);
    }
    // Fallback for browsers without requestIdleCallback (Safari < 16.4).
    const t = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(t);
  }, [isLanding]);

  if (isLanding || !mounted) return null;

  return (
    <Suspense>
      <BackToTop />
    </Suspense>
  );
}
