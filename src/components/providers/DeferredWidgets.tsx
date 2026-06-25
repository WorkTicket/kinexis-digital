"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, Suspense } from "react";

const BackToTop = dynamic(() => import("@/components/layout/BackToTop"), { ssr: false });
const ChatBot = dynamic(() => import("@/components/features/ChatBot"), { ssr: false });

export default function DeferredWidgets() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Defer widget mount until the browser is idle so they never compete
    // with LCP or FID on the critical path.
    if (typeof requestIdleCallback !== "undefined") {
      const id = requestIdleCallback(() => setMounted(true), { timeout: 3000 });
      return () => cancelIdleCallback(id);
    }
    // Fallback for browsers without requestIdleCallback (Safari < 16.4).
    const t = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  return (
    <Suspense>
      <BackToTop />
      <ChatBot />
    </Suspense>
  );
}
