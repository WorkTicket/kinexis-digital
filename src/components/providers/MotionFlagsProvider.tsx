"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createMotionVariants,
  defaultMotionVariants,
  resolveMotionConfig,
  type MotionEnvironment,
  type MotionVariants,
} from "@/lib/motion-config";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const MotionVariantsContext = createContext<MotionVariants>(defaultMotionVariants);

const defaultMotionEnvironment: MotionEnvironment = { reduced: false, mobile: false };
export const MotionEnvironmentContext = createContext<MotionEnvironment>(defaultMotionEnvironment);

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

/** Lightweight root provider — sets data-motion flags without loading Framer Motion. */
export function MotionFlagsProvider({ children }: { children: ReactNode }) {
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

  const environment = useMemo(
    () => ({ reduced, mobile }),
    [reduced, mobile]
  );

  return (
    <MotionEnvironmentContext.Provider value={environment}>
      <MotionVariantsContext.Provider value={variants}>
        {children}
      </MotionVariantsContext.Provider>
    </MotionEnvironmentContext.Provider>
  );
}
