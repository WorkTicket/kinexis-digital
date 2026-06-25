"use client";

import { useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { m as motion, AnimatePresence } from "@/lib/framer";
import { useTranslations } from "next-intl";
import { Eye, MousePointerClick, Users, TrendingUp, ArrowRight, type LucideIcon } from "lucide-react";
import TwoLineText from "@/components/ui/TwoLineText";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const ResultsTrajectoryChart = dynamic(
  () => import("@/components/ui/DataViz/ResultsTrajectoryChart"),
  { ssr: false }
);

const stageIds = ["visibility", "traffic", "leads", "revenue"] as const;
type StageId = (typeof stageIds)[number];

const stageMeta: Record<
  StageId,
  { icon: LucideIcon; accent: string; glow: string; index: string }
> = {
  visibility: { icon: Eye, accent: "#00d4ff", glow: "rgba(0,212,255,0.18)", index: "01" },
  traffic: { icon: MousePointerClick, accent: "#00a8e8", glow: "rgba(0,168,232,0.16)", index: "02" },
  leads: { icon: Users, accent: "#0099cc", glow: "rgba(0,153,204,0.16)", index: "03" },
  revenue: { icon: TrendingUp, accent: "#00d4ff", glow: "rgba(0, 212, 255, 0.2)", index: "04" },
};

const chartDataByStage: Record<StageId, number[]> = {
  visibility: [4, 8, 14, 22, 32, 44, 58],
  traffic: [1.2, 2.0, 2.8, 3.6, 4.8, 6.2, 9.2],
  leads: [12, 13, 14, 15, 17, 52, 125],
  revenue: [5, 8, 12, 18, 26, 40, 62],
};

const chartLabels = ["M1", "M2", "M3", "M4", "M5", "M6", "M7"];

function formatMetric(value: number, unit: string): string {
  if (unit.includes("$")) {
    return value >= 10 ? `$${Math.round(value)}K` : `$${value.toFixed(1)}K`;
  }
  if (unit.includes("(K)")) {
    return value >= 10 ? `${Math.round(value)}K` : `${value.toFixed(1)}K`;
  }
  return Number.isInteger(value) ? `${Math.round(value)}` : value.toFixed(1);
}

function growthLabel(start: number, end: number): string {
  if (start <= 0) return "";
  const mult = end / start;
  if (mult >= 10) return `${Math.round(mult)}×`;
  if (mult >= 2) return `${mult.toFixed(1)}×`;
  const pct = Math.round(((end - start) / start) * 100);
  return `+${pct}%`;
}

export default function RevenueEngine() {
  const t = useTranslations("revenueEngine");
  const reducedMotion = usePrefersReducedMotion();
  const [activeStage, setActiveStage] = useState(0);

  const stages = useMemo(
    () =>
      stageIds.map((id) => {
        const meta = stageMeta[id];
        const chartData = chartDataByStage[id];
        const start = chartData[0];
        const end = chartData[chartData.length - 1];
        return {
          id,
          ...meta,
          label: t(`stages.${id}.label`),
          tags: t.raw(`stages.${id}.tags`) as string[],
          description: t(`stages.${id}.description`),
          chartData,
          chartLabels,
          chartUnit: t(`chartUnits.${id}`),
          start,
          end,
          growth: growthLabel(start, end),
        };
      }),
    [t]
  );

  const active = stages[activeStage];

  const goToStage = useCallback((index: number) => {
    setActiveStage(index);
  }, []);

  return (
    <section className="section-padding relative overflow-hidden border-t border-white/[0.06] bg-bg-dark">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:28px_28px] opacity-40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
        aria-hidden
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/3 rounded-full blur-[120px]"
          style={{ background: active.glow }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: reducedMotion ? 0.5 : 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        />
      </AnimatePresence>

      <div className="container-site relative z-10">
        <div className="section-header">
          <span className="section-label">{t("label")}</span>
          <h2 className="section-title">
            <TwoLineText text={t("title")} variant="section" />
          </h2>
          <p className="section-subtitle">
            <TwoLineText text={t("subtitle")} variant="body" />
          </p>
        </div>

        {/* Desktop pipeline navigator */}
        <div className="mx-auto mt-16 hidden max-w-4xl lg:block">
          <div className="flex items-start">
            {stages.map((stage, i) => {
              const Icon = stage.icon;
              const isActive = activeStage === i;
              const isPast = i < activeStage;
              const connectorComplete = activeStage > i;

              return (
                <div key={stage.id} className="contents">
                  <button
                    type="button"
                    onClick={() => goToStage(i)}
                    className="group relative z-10 flex shrink-0 flex-col items-center gap-4 text-center"
                    aria-current={isActive ? "step" : undefined}
                  >
                    <span
                      className={`relative flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-2xl border transition-all duration-500 ${
                        isActive
                          ? "border-neon-cyan/40 bg-white/[0.06] shadow-lg shadow-neon-cyan/10"
                          : isPast
                            ? "border-neon-cyan/20 bg-white/[0.03]"
                            : "border-white/[0.08] bg-white/[0.02] group-hover:border-white/15 group-hover:bg-white/[0.04]"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="framework-stage-ring"
                          className="absolute inset-0 rounded-2xl border border-neon-cyan/30"
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        />
                      )}
                      <Icon
                        className={`h-5 w-5 transition-colors duration-500 ${
                          isActive ? "text-neon-cyan" : isPast ? "text-neon-cyan/60" : "text-white/35 group-hover:text-white/55"
                        }`}
                        strokeWidth={1.75}
                      />
                    </span>

                    <span
                      className={`max-w-[5.5rem] text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-500 ${
                        isActive ? "text-white" : isPast ? "text-white/60" : "text-white/35 group-hover:text-white/50"
                      }`}
                    >
                      {stage.label}
                    </span>
                  </button>

                  {i < stages.length - 1 && (
                    <div
                      className="relative mx-3 mt-[2.125rem] h-px min-w-[2rem] flex-1 self-start"
                      aria-hidden
                    >
                      <div className="absolute inset-0 bg-white/[0.06]" />
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-cyan/30 via-neon-cyan/70 to-neon-cyan"
                        initial={false}
                        animate={{ width: connectorComplete ? "100%" : "0%" }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile stage pills */}
        <div className="mt-10 flex gap-2 overflow-x-auto pb-1 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {stages.map((stage, i) => {
            const Icon = stage.icon;
            const isActive = activeStage === i;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => goToStage(i)}
                className={`flex shrink-0 items-center gap-2.5 rounded-full border px-4 py-2.5 transition-all duration-400 ${
                  isActive
                    ? "border-neon-cyan/35 bg-neon-cyan/[0.08] text-white"
                    : "border-white/[0.08] bg-white/[0.02] text-white/50"
                }`}
                aria-current={isActive ? "step" : undefined}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-neon-cyan" : "text-white/40"}`} strokeWidth={1.75} />
                <span className="text-xs font-semibold uppercase tracking-wider">{stage.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main showcase panel */}
        <div className="mx-auto mt-10 max-w-5xl lg:mt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-3xl border border-surface bg-gradient-to-br from-white/[0.05] via-bg-secondary/90 to-bg-dark shadow-panel"
            >
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-[80px]"
                style={{ background: active.glow }}
                aria-hidden
              />

              <div className="relative grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
                {/* Content column */}
                <div className="border-b border-white/[0.06] p-8 md:p-10 lg:border-b-0 lg:border-r lg:p-12">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                      {t("stage")} {active.index}
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-neon-cyan/80">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon-cyan" />
                      </span>
                      {t("liveTrajectory")}
                    </span>
                  </div>

                  <div className="mt-8 flex items-start gap-5">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04]"
                      style={{ boxShadow: `0 0 32px ${active.glow}` }}
                    >
                      <active.icon className="h-6 w-6 text-neon-cyan" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="type-subheader text-white">{active.label}</h3>
                      <p className="mt-3 max-w-sm type-body text-muted leading-relaxed">{active.description}</p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {active.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/55"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-10 rounded-2xl border border-white/[0.06] bg-black/20 p-5 md:p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                      {active.chartUnit}
                    </p>
                    <div className="mt-4 flex flex-wrap items-end gap-3 md:gap-4">
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-white/35">{t("metricStart")}</p>
                        <p className="mt-1 type-metric text-white/50">
                          {formatMetric(active.start, active.chartUnit)}
                        </p>
                      </div>
                      <ArrowRight className="mb-2 h-4 w-4 shrink-0 text-white/20" strokeWidth={1.5} />
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-neon-cyan/60">{t("metricCurrent")}</p>
                        <p className="mt-1 type-metric">
                          {formatMetric(active.end, active.chartUnit)}
                        </p>
                      </div>
                      {active.growth && (
                        <span className="mb-1 ml-auto rounded-full border border-neon-cyan/25 bg-neon-cyan/[0.08] px-3 py-1 text-xs font-bold text-neon-cyan">
                          {active.growth}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Chart column */}
                <div className="flex flex-col justify-end p-8 md:p-10 lg:p-12 lg:pt-14">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                      {t("trajectoryPeriod")}
                    </span>
                    <span className="text-[10px] font-medium text-white/25">{active.chartUnit}</span>
                  </div>

                  <ResultsTrajectoryChart
                    key={active.id}
                    data={active.chartData}
                    labels={active.chartLabels}
                    unit={active.chartUnit}
                    height={220}
                    startLabel={t("chartStart")}
                    endLabel={t("chartEnd")}
                    className="w-full"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile stacked overview */}
        <div className="mt-12 space-y-3 lg:hidden">
          {stages.map((stage, i) => {
            if (i === activeStage) return null;
            const Icon = stage.icon;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => goToStage(i)}
                className="flex w-full items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 text-left transition-colors hover:border-white/10 hover:bg-white/[0.03]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                  <Icon className="h-4 w-4 text-white/40" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white/70">{stage.label}</p>
                  <p className="mt-0.5 truncate text-xs text-white/35">{stage.description}</p>
                </div>
                <span className="shrink-0 text-xs font-bold tabular-nums text-neon-cyan/70">
                  {formatMetric(stage.end, stage.chartUnit)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
