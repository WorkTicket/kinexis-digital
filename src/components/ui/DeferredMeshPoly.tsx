"use client";

import { useEffect, useState } from "react";

/**
 * Decorative mesh polygon overlay — not rendered until after LCP so hero text
 * stays the LCP element. Skipped on mobile where the texture image hurt scores most.
 */
export default function DeferredMeshPoly() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (isMobile) return;

    let activated = false;
    const activate = () => {
      if (activated) return;
      activated = true;
      setActive(true);
    };

    const scheduleActivate = () => window.setTimeout(activate, 800);

    if ("PerformanceObserver" in window) {
      try {
        const observer = new PerformanceObserver(() => scheduleActivate());
        observer.observe({ type: "largest-contentful-paint", buffered: true });
        const fallback = window.setTimeout(activate, 8000);
        return () => {
          observer.disconnect();
          window.clearTimeout(fallback);
        };
      } catch {
        /* fall through */
      }
    }

    const onLoad = () => scheduleActivate();
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    const fallback = window.setTimeout(activate, 8000);
    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(fallback);
    };
  }, []);

  if (!active) return null;

  return <div className="mesh-poly-layer mesh-poly-layer--active" aria-hidden />;
}
