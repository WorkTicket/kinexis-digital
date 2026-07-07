"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const FramerMotionProvider = dynamic(
  () =>
    import("@/components/providers/FramerMotionProvider").then(
      (m) => m.FramerMotionProvider
    ),
  { ssr: true }
);

/** Lazy-loaded Framer Motion — must render inside MotionFlagsProvider. */
export default function FramerMotionShell({ children }: { children: ReactNode }) {
  return <FramerMotionProvider>{children}</FramerMotionProvider>;
}
