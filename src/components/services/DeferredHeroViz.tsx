"use client";

import type { ReactNode } from "react";
import { useDeferMotion } from "@/hooks/useDeferMotion";
import HeroVizMobileShell from "@/components/services/hero-viz/HeroVizMobileShell";

type Props = { children: ReactNode };

/** On mobile, render a static placeholder instead of animated hero visualizations. */
export default function DeferredHeroViz({ children }: Props) {
  const defer = useDeferMotion();
  if (defer) return <HeroVizMobileShell />;
  return children;
}
