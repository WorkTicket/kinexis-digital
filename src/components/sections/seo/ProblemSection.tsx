"use client";

import SeoInsightPanel from "@/components/sections/seo/SeoInsightPanel";

type ProblemSectionProps = {
  title: string;
  intro: string;
  points: string[];
};

export default function ProblemSection({ title, intro, points }: ProblemSectionProps) {
  return <SeoInsightPanel variant="problem" title={title} intro={intro} points={points} />;
}
