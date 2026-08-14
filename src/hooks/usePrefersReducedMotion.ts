"use client";

import { useEffect, useState } from "react";

// Initial value is always false so that the server render and the first client
// render produce identical markup (no hydration mismatch). The effect runs
// after mount and updates the value. MotionConfig reducedMotion="user"
// (set in FramerMotionProvider) snaps Framer animations for OS reduced-motion.
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}
