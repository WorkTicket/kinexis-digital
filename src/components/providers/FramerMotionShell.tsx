"use client";

import type { ReactNode } from "react";

/**
 * Passthrough — motion features load from root MotionProvider.
 * Kept so older call sites that wrap with FramerMotionShell do not nest LazyMotion.
 */
export default function FramerMotionShell({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
