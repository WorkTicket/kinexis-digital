"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import {
  createMotionVariants,
  defaultMotionVariants,
  EASE_OUT,
  resolveMotionConfig,
  type MotionVariants,
} from "@/lib/motion-config";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const MotionVariantsContext = createContext<MotionVariants>(defaultMotionVariants);

export function useMotionVariants(): MotionVariants {
  return useContext(MotionVariantsContext);
}

// Initial value is false so server and first client render match exactly.
// The effect fires after mount and corrects the value before the browser paints.
function useIsMobileMotion(): boolean {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const update = () => setMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return mobile;
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobileMotion();

  const resolved = useMemo(
    () => resolveMotionConfig({ reduced, mobile }),
    [reduced, mobile]
  );

  const variants = useMemo(() => createMotionVariants(resolved), [resolved]);

  useEffect(() => {
    const root = document.documentElement;

    if (mobile && !reduced) {
      root.setAttribute("data-motion", "reduce-mobile");
    } else {
      root.removeAttribute("data-motion");
    }

    if (reduced) {
      root.setAttribute("data-reduced-motion", "true");
    } else {
      root.removeAttribute("data-reduced-motion");
    }
  }, [mobile, reduced]);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionVariantsContext.Provider value={variants}>
        {/* Always "never" — we own reduced-motion detection ourselves via
            usePrefersReducedMotion + resolveMotionConfig. When reduced=true,
            resolved.duration is 0, making every animation instant through the
            transition prop below. Using "always" or "user" causes Framer Motion
            to set shouldReduceMotion=true inside VisualElement, which unconditionally
            fires a warnOnce dev warning — even though we intentionally set it.
            With "never", shouldReduceMotion is always false and the warning never
            fires, while our duration:0 transition still gives instant animations. */}
        <MotionConfig
          reducedMotion="never"
          transition={{ duration: resolved.duration, ease: EASE_OUT }}
        >
          {children}
        </MotionConfig>
      </MotionVariantsContext.Provider>
    </LazyMotion>
  );
}
