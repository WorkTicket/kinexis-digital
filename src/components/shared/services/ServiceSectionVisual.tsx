"use client";

import { m as motion } from "@/lib/framer";
import CardFamily from "@/components/ui/CardFamily";
import StepIcon from "@/components/ui/StepIcon";
import { cardClasses, featureCardGridClass } from "@/lib/card-styles";
import { cn } from "@/lib/utils";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import type { ServiceSectionTableHeaders, VisualVariant } from "@/content/services/architecture/types";
import {
  Activity,
  BarChart3,
  FileSearch,
  Gauge,
  Layers,
  MapPin,
  Search,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react";

type Point = { title: string; description: string; metric?: string };

type Props = {
  variant: VisualVariant;
  points: Point[];
  tableHeaders?: ServiceSectionTableHeaders;
};

const contentIcons: LucideIcon[] = [FileSearch, Gauge, Layers, Target, Search, MapPin, Activity, Sparkles];

function CapabilityCard({ point, icon: Icon, index }: { point: Point; icon: LucideIcon; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <CardFamily family="glass" className="flex h-full flex-col gap-5 !p-6 md:!p-7">
        <StepIcon icon={Icon} size="sm" />
        <div className="flex flex-1 flex-col">
          <h3 className="font-bold leading-snug" style={{ fontSize: "var(--text-h4, 1.125rem)" }}>
            {point.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{point.description}</p>
          {point.metric ? (
            <span className="mt-4 inline-flex w-fit rounded-lg border border-neon-cyan/20 bg-neon-cyan/[0.08] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-neon-cyan/90">
              {point.metric}
            </span>
          ) : null}
        </div>
      </CardFamily>
    </motion.div>
  );
}

function ContentGrid({ points }: { points: Point[] }) {
  return (
    <div className={featureCardGridClass(points.length)}>
      {points.map((point, i) => (
        <CapabilityCard key={point.title} point={point} icon={contentIcons[i % contentIcons.length]} index={i} />
      ))}
    </div>
  );
}

function DashboardTable({ points, headers }: { points: Point[]; headers: ServiceSectionTableHeaders }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-surface shadow-panel">
      <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.5fr)_minmax(0,1.3fr)] gap-px bg-surface-hover text-xs md:text-sm">
        <div className="bg-bg-dark px-5 py-4 font-semibold uppercase tracking-wider text-muted">{headers.col1}</div>
        <div className="bg-bg-dark px-5 py-4 font-semibold uppercase tracking-wider text-muted">{headers.col2}</div>
        <div className="bg-bg-dark px-5 py-4 font-semibold uppercase tracking-wider text-muted">{headers.col3}</div>
        {points.map((point, i) => (
          <motion.div key={point.title} className="contents" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}>
            <div className="bg-bg-secondary/90 px-5 py-4 font-medium">{point.title}</div>
            <div className="bg-bg-secondary/90 px-5 py-4">
              {point.metric ? (
                <span className="inline-block rounded-full border border-neon-cyan/20 bg-neon-cyan/[0.08] px-2 py-0.5 text-[11px] font-semibold text-neon-cyan">
                  {point.metric}
                </span>
              ) : null}
            </div>
            <div className="bg-bg-secondary/90 px-5 py-4 text-muted">{point.description}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ChartGrid({ points }: { points: Point[] }) {
  return (
    <div className={featureCardGridClass(points.length)}>
      {points.map((point, i) => (
        <motion.div
          key={point.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: i * 0.07 }}
          className={cardClasses({ surface: "elevated", className: "group !p-6 md:!p-8 transition-all duration-500 hover:border-neon-cyan/20" })}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="font-bold leading-snug">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{point.description}</p>
            </div>
            {point.metric ? (
              <div className="shrink-0 text-right">
                <BarChart3 className="ml-auto h-4 w-4 text-neon-cyan/50" aria-hidden />
                <p className="mt-2 font-mono text-sm font-semibold text-neon-cyan">{point.metric}</p>
              </div>
            ) : null}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ComparisonGrid({ points }: { points: Point[] }) {
  return (
    <div className={featureCardGridClass(points.length)}>
      {points.map((point, i) => (
        <motion.div
          key={point.title}
          initial={{ opacity: 0, x: i % 2 === 0 ? -12 : 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className={cn(
            "rounded-2xl border p-6 md:p-8",
            i % 2 === 0
              ? "border-strong bg-surface-raised"
              : "border-neon-cyan/15 bg-neon-cyan/[0.04]",
          )}
        >
          <h3 className="font-bold leading-snug">{point.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{point.description}</p>
          {point.metric ? (
            <p className="mt-4 font-mono text-lg font-semibold text-neon-cyan">{point.metric}</p>
          ) : null}
        </motion.div>
      ))}
    </div>
  );
}

function SplitGrid({ points }: { points: Point[] }) {
  const { fadeUp, stagger } = useMotionVariants();

  return (
    <motion.div className={featureCardGridClass(points.length)} variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
      {points.map((point, i) => {
        const Icon = contentIcons[i % contentIcons.length];
        return (
          <motion.div
            key={point.title}
            variants={fadeUp}
            className={cardClasses({
              hover: false,
              className: "flex gap-4 !bg-surface-raised/40 !p-6",
            })}
          >
            <StepIcon icon={Icon} size="sm" />
            <div className="min-w-0">
              <h3 className="text-sm font-bold leading-snug md:text-base">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{point.description}</p>
              {point.metric ? (
                <p className="mt-3 text-xs font-semibold text-neon-cyan/85">{point.metric}</p>
              ) : null}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function MockupGrid({ points }: { points: Point[] }) {
  const previews = [
    { bars: [42, 68, 55, 88], metric: "+38%" },
    { bars: [30, 48, 72, 60], metric: "2.1×" },
    { bars: [55, 40, 78, 92], metric: "94" },
    { bars: [22, 58, 45, 70], metric: "-41%" },
  ];

  return (
    <div className={featureCardGridClass(points.length)}>
      {points.map((point, i) => {
        const preview = previews[i % previews.length];
        return (
          <motion.div
            key={point.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-bg-secondary/90 shadow-[0_20px_40px_-16px_rgba(0,0,0,0.5)]"
          >
            <div className="relative border-b border-white/[0.06] bg-[linear-gradient(165deg,rgba(22,28,40,0.95),rgba(10,12,18,0.98))] px-5 pb-4 pt-4">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="mb-3 flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]/70" />
                <div className="h-1.5 w-1.5 rounded-full bg-[#febc2e]/70" />
                <div className="h-1.5 w-1.5 rounded-full bg-[#28c840]/70" />
                <div className="ml-1 h-3 flex-1 rounded bg-black/30" />
              </div>
              <div className="flex h-16 items-end gap-1.5">
                {preview.bars.map((h, bi) => (
                  <motion.div
                    key={bi}
                    className={`flex-1 rounded-t ${bi === preview.bars.length - 1 ? "bg-neon-cyan" : "bg-neon-cyan/30"}`}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + bi * 0.05, duration: 0.45 }}
                  />
                ))}
              </div>
              <div className="mt-2 text-right text-[11px] font-bold text-neon-cyan">{preview.metric}</div>
            </div>
            <div className="p-6">
              <h3 className="font-bold leading-snug">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{point.description}</p>
              {point.metric ? (
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-neon-cyan/80">{point.metric}</p>
              ) : null}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function ServiceSectionVisual({ variant, points, tableHeaders }: Props) {
  if (!points.length) return null;

  switch (variant) {
    case "dashboard":
      if (tableHeaders) {
        return <DashboardTable points={points} headers={tableHeaders} />;
      }
      return <ContentGrid points={points} />;
    case "chart":
      return <ChartGrid points={points} />;
    case "comparison":
      return <ComparisonGrid points={points} />;
    case "split":
      return <SplitGrid points={points} />;
    case "mockup":
      return <MockupGrid points={points} />;
    case "content":
    default:
      return <ContentGrid points={points} />;
  }
}
