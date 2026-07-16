"use client";

import type { ReactNode } from "react";
import { BrowserFrame, FloatingBadge, HeroVizShell, HeroVizStage } from "./ServiceHeroVizParts";

export type HeroVizBadge = {
  label: string;
  value: string;
  position?: "top-right" | "top-left" | "bottom-left" | "bottom-right";
  accent?: "cyan" | "emerald";
  delay?: number;
};

type Props = {
  browserLabel: string;
  frameClassName?: string;
  highlight?: boolean;
  stageClassName?: string;
  badges?: HeroVizBadge[];
  children: ReactNode;
};

export default function HeroVizContainer({
  browserLabel,
  frameClassName,
  highlight,
  stageClassName = "items-center",
  badges,
  children,
}: Props) {
  return (
    <HeroVizShell>
      <HeroVizStage className={stageClassName}>
        <BrowserFrame label={browserLabel} delay={0.5} highlight={highlight} frameClassName={frameClassName}>
          {children}
        </BrowserFrame>
        {badges?.map((badge, i) => <FloatingBadge key={i} {...badge} />)}
      </HeroVizStage>
    </HeroVizShell>
  );
}
