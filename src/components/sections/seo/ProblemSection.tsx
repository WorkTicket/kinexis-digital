"use client";

import SeoInsightPanel from "@/components/sections/seo/SeoInsightPanel";

type ProblemSectionProps = {
  title: string;
  intro: string;
  points: string[];
  surfaceIndex?: number;
};

export default function ProblemSection({ title, intro, points, surfaceIndex }: ProblemSectionProps) {
  return (
    <SeoInsightPanel
      variant="problem"
      title={title}
      intro={intro}
      points={points}
      surfaceIndex={surfaceIndex}
    />
  );
}
