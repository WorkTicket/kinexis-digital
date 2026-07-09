"use client";

import GrowthLineChart from "./GrowthLineChart";
import CaseStudyProof from "@/components/ui/CaseStudyProof";
import ProofMetric from "@/components/ui/ProofMetric";
import Card from "@/components/ui/Card";

type ChartType = "growth" | "ranking" | "volume" | "revenue";

type Props = {
  label: string;
  headline: string;
  description?: string;
  chartType?: ChartType;
  data: number[];
  labels?: string[];
  metric?: string;
  unit?: string;
  caseStudy?: { result: string; client: string; href?: string };
};

const chartPresets: Record<
  ChartType,
  { accent: string; showArea: boolean; lowerIsBetter?: boolean }
> = {
  growth: { accent: "#00d4ff", showArea: true },
  ranking: { accent: "#0099cc", showArea: false, lowerIsBetter: false },
  volume: { accent: "#00d4ff", showArea: true },
  revenue: { accent: "#00d4ff", showArea: true },
};

export default function DataStoryPanel({
  label,
  headline,
  description,
  chartType = "growth",
  data,
  labels,
  metric,
  unit,
  caseStudy,
}: Props) {
  const preset = chartPresets[chartType];

  return (
    <Card
      animated
      hover={false}
      className="group relative overflow-hidden !bg-bg-dark !p-8 md:!p-10"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="lg:w-2/5">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            {label}
          </span>
          <h3 className="type-subheader mt-4">{headline}</h3>
          {description && (
            <p className="type-body mt-4 text-muted max-w-sm">{description}</p>
          )}
          {metric && (
            <ProofMetric value={metric} size="lg" align="left" className="mt-6" />
          )}
          {caseStudy && (
            <div className="mt-8">
              <CaseStudyProof
                result={caseStudy.result}
                client={caseStudy.client}
                href={caseStudy.href}
              />
            </div>
          )}
        </div>

        <div className="lg:w-3/5">
          <GrowthLineChart
            data={data}
            labels={labels}
            height={140}
            accent={preset.accent}
            showArea={preset.showArea}
            lowerIsBetter={preset.lowerIsBetter}
            unit={unit}
            chartKey={`${chartType}-${data.join("-")}`}
          />
        </div>
      </div>
    </Card>
  );
}
