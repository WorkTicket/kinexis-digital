"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > 400);
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })
      }
      className="fixed-safe-bottom fixed-safe-right fixed z-40 flex h-14 w-14 items-center justify-center rounded-full glass text-white shadow-lg transition-opacity duration-300 hover:opacity-90 touch-manipulation animate-[fadeIn_0.2s_ease-out]"
      aria-label="Back to top"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}
