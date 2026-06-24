"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type AnimatedCounterProps = {
  from: number;
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

export default function AnimatedCounter({
  from,
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
}: AnimatedCounterProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;

          if (reducedMotion) {
            setCount(to);
            return;
          }

          // 950ms quartic ease-out: faster initial rise, dramatic deceleration
          // at the end for a satisfying "settlement" effect.
          const duration = 950;
          const startTime = performance.now();
          const diff = to - from;

          function animate(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(from + diff * eased);
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          }
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [from, to, reducedMotion]);

  const formatted = count.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
