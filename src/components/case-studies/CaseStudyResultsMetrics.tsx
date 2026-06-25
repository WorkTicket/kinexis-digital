import CaseStudyMetricCard from "@/components/case-studies/CaseStudyMetricCard";
import type { CaseStudyResult } from "@/content/case-study-details";

type Props = {
  results: CaseStudyResult[];
};

export default function CaseStudyResultsMetrics({ results }: Props) {
  return (
    <div className="case-study-results-grid">
      {results.map((r) => (
        <CaseStudyMetricCard key={r.label} metric={r} />
      ))}
    </div>
  );
}
