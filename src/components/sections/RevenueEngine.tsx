"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Eye, MousePointerClick, Users, DollarSign } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import TwoLineText from "@/components/ui/TwoLineText";
import Section from "@/components/shared/services/Section";
import GrowthLineChart from "@/components/ui/DataViz/GrowthLineChart";

const stageIds = ["visibility", "traffic", "leads", "revenue"] as const;
type StageId = (typeof stageIds)[number];

const chartDataByStage: Record<StageId, number[]> = {
  visibility: [4, 18, 29, 38, 46, 52, 58],
  traffic: [1.2, 2.0, 2.8, 3.4, 4.2, 6.4, 9.2],
  leads: [12, 13, 14, 15, 17, 52, 125],
  revenue: [5, 6.5, 9, 13, 21, 37, 62],
};

const stageIcons = {
  visibility: Eye,
  traffic: MousePointerClick,
  leads: Users,
  revenue: DollarSign,
} as const;

function formatMetric(value: number, unit: string): string {
  const formattedValue = Number.isInteger(value) ? `${Math.round(value)}` : value.toFixed(1);
  if (unit.includes("$")) return `$${formattedValue}K`;
  if (unit.includes("(K)")) return `${formattedValue}K`;
  return formattedValue;
}

function growthLabel(start: number, end: number): string {
  if (start <= 0) return "";
  const mult = end / start;
  if (mult >= 10) return `${Math.round(mult)}×`;
  if (mult >= 2) return `${mult.toFixed(1)}×`;
  return `+${Math.round(((end - start) / start) * 100)}%`;
}

type Props = { surfaceIndex?: number };

export default function RevenueEngine({ surfaceIndex = 0 }: Props) {
  const t = useTranslations("revenueEngine");

  const stages = useMemo(
    () =>
      stageIds.map((id) => {
        const chartData = chartDataByStage[id];
        const start = chartData[0];
        const end = chartData[chartData.length - 1];
        return {
          id,
          label: t(`stages.${id}.label`),
          tags: t.raw(`stages.${id}.tags`) as string[],
          description: t(`stages.${id}.description`),
          chartUnit: t(`chartUnits.${id}`),
          chartData,
          start,
          end,
          growth: growthLabel(start, end),
          Icon: stageIcons[id],
        };
      }),
    [t],
  );

  return (
    <Section id="revenue-engine" surfaceIndex={surfaceIndex}>
      <div className="container-site">
        <SectionHeader
          align="center"
          badge={t("label")}
          title={<TwoLineText text={t("title")} variant="section" />}
          description={<TwoLineText text={t("subtitle")} variant="body" />}
          headingId="revenue-engine-heading"
        />

        <ol className="section-content mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stages.map((stage, i) => (
            <li
              key={stage.id}
              className="relative flex flex-col rounded-2xl border border-surface bg-surface-raised p-6 sm:p-7"
            >
              {i < stages.length - 1 && (
                <ArrowRight
                  className="absolute -right-3.5 top-10 z-10 hidden h-4 w-4 text-neon-cyan/35 xl:block"
                  aria-hidden
                />
              )}

              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                  <stage.Icon className="h-5 w-5 text-neon-cyan" aria-hidden />
                </span>
                {stage.growth && (
                  <span className="shrink-0 rounded-lg bg-neon-cyan/10 px-2.5 py-1 text-sm font-semibold tabular-nums text-neon-cyan">
                    {stage.growth}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-semibold tracking-tight text-white">{stage.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{stage.description}</p>

              <div className="mt-5 rounded-xl border border-white/[0.04] bg-bg-dark/40 px-2 pb-1 pt-3">
                <GrowthLineChart
                  data={stage.chartData}
                  unit={stage.chartUnit}
                  height={112}
                  showArea
                  showDots
                  showHeader={false}
                  baselineZero
                  chartKey={stage.id}
                  className="w-full"
                />
              </div>

              <div className="mt-5 border-t border-surface pt-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">
                  {t("metricStart")} → {t("metricCurrent")}
                </p>
                <p className="mt-1 text-sm tabular-nums text-white/55">
                  {formatMetric(stage.start, stage.chartUnit)}
                  <span className="mx-1.5 text-white/25">→</span>
                  <span className="font-semibold text-white">
                    {formatMetric(stage.end, stage.chartUnit)}
                  </span>
                </p>
                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                  {stage.tags.map((tag) => (
                    <span key={tag} className="text-xs font-medium text-white/35">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
