"use client";

import { useEffect, useState } from "react";

/**
 * Flip true after the browser is idle (or a short timeout).
 * Used to start non-critical media after LCP without changing the visual design.
 */
export function useIdleReady(enabled = true, timeout = 1800) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let idleId = 0;
    let timeoutId = 0;
    const start = () => setReady(true);

    if (typeof requestIdleCallback === "function") {
      idleId = requestIdleCallback(start, { timeout });
    } else {
      timeoutId = window.setTimeout(start, Math.min(timeout, 600));
    }

    return () => {
      if (idleId) cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [enabled, timeout]);

  return ready;
}
