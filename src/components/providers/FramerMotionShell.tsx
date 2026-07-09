"use client";

import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { scheduleIdleOrScroll } from "@/lib/schedule-idle-or-scroll";

/**
 * Defers the Framer Motion provider until idle/scroll on every page.
 * SSR hero text paints without waiting on the ~40 KiB FM chunk.
 */
export default function FramerMotionShell({ children }: { children: ReactNode }) {
  const [Provider, setProvider] = useState<ComponentType<{ children: ReactNode }> | null>(
    null
  );

  useEffect(() => {
    return scheduleIdleOrScroll(() => {
      void import("@/components/providers/FramerMotionProvider").then((m) => {
        setProvider(() => m.FramerMotionProvider);
      });
    });
  }, []);

  if (!Provider) {
    return <>{children}</>;
  }

  return <Provider>{children}</Provider>;
}
