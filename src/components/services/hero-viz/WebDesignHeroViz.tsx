"use client";

import {
  SkeletonBlock,
  SkeletonLine,
} from "./ServiceHeroVizParts";
import HeroVizContainer from "./HeroVizContainer";

export default function WebDesignHeroViz() {
  return (
    <HeroVizContainer
      browserLabel="Desktop"
      highlight
      frameClassName="h-[165px] w-[220px]"
      badges={[
        { label: "PageSpeed", value: "94/100", accent: "emerald" },
        { label: "Responsive", value: "✓", position: "bottom-left", delay: 1.3 },
      ]}
    >
      <SkeletonLine width="lg" />
      <SkeletonLine width="md" />
      <div className="mt-auto flex gap-1">
        <SkeletonBlock className="h-5 flex-1 !bg-neon-cyan/15" />
        <div className="h-5 w-8 rounded bg-white/[0.04]" />
      </div>
    </HeroVizContainer>
  );
}
