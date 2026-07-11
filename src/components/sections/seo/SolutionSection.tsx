"use client";

import SeoInsightPanel from "@/components/sections/seo/SeoInsightPanel";

type SolutionSectionProps = {
  title: string;
  intro: string;
  points: string[];
  surfaceIndex?: number;
};

export default function SolutionSection({ title, intro, points, surfaceIndex }: SolutionSectionProps) {
  return (
    <SeoInsightPanel
      variant="solution"
      title={title}
      intro={intro}
      points={points}
      surfaceIndex={surfaceIndex}
    />
  );
}
