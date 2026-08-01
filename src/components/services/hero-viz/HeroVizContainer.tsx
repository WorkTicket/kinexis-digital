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
  url?: string;
  children: ReactNode;
};

export default function HeroVizContainer({
  browserLabel,
  frameClassName,
  highlight,
  stageClassName = "items-center",
  badges,
  url,
  children,
}: Props) {
  return (
    <HeroVizShell>
      <HeroVizStage className={stageClassName}>
        <BrowserFrame
          label={browserLabel}
          delay={0.45}
          highlight={highlight}
          url={url}
          frameClassName={frameClassName ?? "h-[180px] w-[250px]"}
        >
          {children}
        </BrowserFrame>
        {badges?.slice(0, 1).map((badge, i) => (
          <FloatingBadge key={`${badge.label}-${i}`} {...badge} />
        ))}
      </HeroVizStage>
    </HeroVizShell>
  );
}
