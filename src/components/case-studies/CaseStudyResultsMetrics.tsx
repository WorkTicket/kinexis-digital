import CaseStudyMetricCard from "@/components/case-studies/CaseStudyMetricCard";
import type { CaseStudyResult } from "@/content/case-study-details";
import { cn } from "@/lib/utils";

type Props = {
  results: CaseStudyResult[];
  className?: string;
};

export default function CaseStudyResultsMetrics({ results, className }: Props) {
  return (
    <div className={cn("case-study-results-grid", className)}>
      {results.map((r) => (
        <CaseStudyMetricCard key={r.label} metric={r} />
      ))}
    </div>
  );
}
