"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { isHomePath } from "@/lib/is-home-path";

const FramerMotionProviderSSR = dynamic(
  () =>
    import("@/components/providers/FramerMotionProvider").then(
      (m) => m.FramerMotionProvider
    ),
  { ssr: true }
);

/** Lazy-loaded Framer Motion — must render inside MotionFlagsProvider. */
export default function FramerMotionShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = isHomePath(pathname);

  // Homepage defers FM to HomeDeferredSections so the hero never waits on the chunk.
  if (isHome) {
    return <>{children}</>;
  }

  return <FramerMotionProviderSSR>{children}</FramerMotionProviderSSR>;
}
