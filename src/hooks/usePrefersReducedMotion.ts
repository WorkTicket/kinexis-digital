"use client";

import { useEffect, useState } from "react";

// Initial value is always false so that the server render and the first client
// render produce identical markup (no hydration mismatch). The effect runs
// synchronously after mount and updates the value before the browser paints,
// so reduced-motion users never see a flash of full animation.
// MotionConfig reducedMotion="always" (set in MotionProvider) additionally
// tells Framer Motion to snap animations instantly at the Framer level.
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
