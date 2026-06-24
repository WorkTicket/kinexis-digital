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
        <MotionConfig
          reducedMotion={reduced ? "always" : "user"}
          transition={{ duration: resolved.duration, ease: EASE_OUT }}
        >
          {children}
        </MotionConfig>
      </MotionVariantsContext.Provider>
    </LazyMotion>
  );
}
