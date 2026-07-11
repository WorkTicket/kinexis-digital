import Section from "@/components/shared/services/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import MetricCard from "@/components/ui/MetricCard";
import Reveal from "@/components/ui/Reveal";
import { featureCardGridClass } from "@/lib/card-styles";
import type { ResultMetric } from "@/content/services/architecture/types";

type Props = {
  title: string;
  subtitle: string;
  metrics: ResultMetric[];
  surfaceIndex: number;
};

export default function ResultsSection({ title, subtitle, metrics, surfaceIndex }: Props) {
  return (
    <Section id="results" variant="proof" surfaceIndex={surfaceIndex}>
      <div className="container-site">
        <SectionHeader title={title} description={subtitle} />
        <Reveal stagger className={featureCardGridClass(metrics.length, "section-content")}>
          {metrics.map((r) => (
            <MetricCard key={r.label} value={r.metric} label={r.label} />
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
