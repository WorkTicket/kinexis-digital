import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { formatMetricValue } from "@/lib/format-metric";
import { cn } from "@/lib/utils";

export type CaseStudyMetricCardData = {
  label: string;
  before: number;
  after: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

type Props = {
  metric: CaseStudyMetricCardData;
  className?: string;
};

export default function CaseStudyMetricCard({ metric, className }: Props) {
  const { label, before, after, prefix, suffix, decimals } = metric;

  return (
    <article className={cn("case-study-metric-card", className)}>
      <p className="case-study-metric-card__label">{label}</p>
      <div className="case-study-metric-card__value type-metric-sm">
        <AnimatedCounter
          from={before}
          to={after}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
        />
      </div>
      <div className="case-study-metric-card__delta">
        <span className="case-study-metric-card__before">{formatMetricValue(before, metric)}</span>
        <span className="case-study-metric-card__arrow" aria-hidden="true">
          &rarr;
        </span>
        <span className="case-study-metric-card__after">{formatMetricValue(after, metric)}</span>
      </div>
    </article>
  );
}
