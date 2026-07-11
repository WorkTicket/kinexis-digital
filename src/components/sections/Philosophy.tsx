"use client";

import { useCallback, useMemo, useState } from "react";
import { m as motion } from "@/lib/framer";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Clock,
  Crown,
  EyeOff,
  FileX,
  Info,
  RefreshCw,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import Section from "@/components/shared/services/Section";
import { EASE_OUT } from "@/lib/motion-config";

const beforeIcons: LucideIcon[] = [Clock, FileX, EyeOff, Sparkles, RefreshCw];
const afterIcons: LucideIcon[] = [CalendarCheck, Target, UserCheck, TrendingUp, Crown];

type PanelVariant = "before" | "after";

type ComparisonRow = {
  label: string;
  detail: string;
  Icon: LucideIcon;
};

function WindowChrome({ variant }: { variant: PanelVariant }) {
  const dotColors =
    variant === "before"
      ? ["bg-red-400/35", "bg-amber-400/25", "bg-white/10"]
      : ["bg-neon-cyan/50", "bg-neon-cyan/30", "bg-white/15"];

  return (
    <div className="flex items-center gap-2" aria-hidden>
      {dotColors.map((color) => (
        <span key={color} className={cn("h-2.5 w-2.5 rounded-full", color)} />
      ))}
    </div>
  );
}

function DashboardCard({
  variant,
  title,
  stats,
  pipelineLabel,
  pipelineValue,
  pipelineWidth,
}: {
  variant: PanelVariant;
  title: string;
  stats: { label: string; value: string; tone: string }[];
  pipelineLabel: string;
  pipelineValue: string;
  pipelineWidth: string;
}) {
  const isBefore = variant === "before";

  return (
    <div
      className={cn(
        "relative flex min-h-[12.75rem] flex-col rounded-2xl border p-4 md:p-5",
        isBefore
          ? "border-red-500/10 bg-gradient-to-br from-red-950/35 to-red-950/10"
          : "overflow-hidden border-neon-cyan/15 bg-gradient-to-br from-neon-cyan/[0.08] to-blue-500/[0.04]"
      )}
    >
      <div className="mb-4 flex min-h-[1.25rem] items-center justify-between">
        <WindowChrome variant={variant} />
        <span
          className={cn(
            "text-[10px] font-medium uppercase tracking-wider",
            isBefore ? "text-red-400/40" : "text-neon-cyan/50"
          )}
        >
          {title}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={cn(
              "rounded-xl border px-3 py-2.5",
              isBefore ? "border-red-500/[0.08] bg-black/20" : "border-neon-cyan/10 bg-black/20"
            )}
          >
            <p
              className={cn(
                "text-[9px] font-semibold uppercase tracking-wider",
                isBefore ? "text-red-400/35" : "text-neon-cyan/45"
              )}
            >
              {stat.label}
            </p>
            <p className={cn("mt-1 text-sm font-bold tabular-nums", stat.tone)}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-auto space-y-2 pt-4">
        <div
          className={cn(
            "flex min-h-[0.875rem] items-center justify-between text-[9px] font-semibold uppercase tracking-wider",
            isBefore ? "text-white/25" : "text-white/30"
          )}
        >
          <span>{pipelineLabel}</span>
          <span className={isBefore ? "text-red-400/40" : "text-neon-cyan/70"}>{pipelineValue}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-surface-hover">
          <motion.div
            className={cn(
              "h-full rounded-full",
              isBefore
                ? "bg-gradient-to-r from-red-500/25 to-red-400/15"
                : "bg-gradient-to-r from-neon-cyan/40 via-neon-cyan to-blue-400/70"
            )}
            initial={{ width: 0 }}
            whileInView={{ width: pipelineWidth }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: EASE_OUT }}
          />
        </div>
      </div>
    </div>
  );
}

function ComparisonListItem({
  id,
  variant,
  label,
  detail,
  Icon,
  index,
  align,
  isOpen,
  onToggle,
}: {
  id: string;
  variant: PanelVariant;
  label: string;
  detail: string;
  Icon: LucideIcon;
  index: number;
  align: "left" | "right";
  isOpen: boolean;
  onToggle: (id: string) => void;
}) {
  const isBefore = variant === "before";
  const { fadeUp } = useMotionVariants();

  return (
    <motion.li
      className="relative"
      initial={fadeUp.hidden}
      whileInView={{
        ...(fadeUp.visible as object),
        transition: {
          ...((fadeUp.visible as { transition?: object }).transition ?? {}),
          delay: index * 0.08,
        },
      }}
      viewport={{ once: true }}
    >
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
        aria-describedby={isOpen ? `${id}-detail` : undefined}
        className={cn(
          "group/item relative flex w-full min-h-[3.75rem] items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan/40",
          isBefore
            ? "border-subtle bg-surface-base hover:border-red-500/10 hover:bg-red-950/20"
            : "border-neon-cyan/10 bg-surface-base hover:border-neon-cyan/20 hover:bg-neon-cyan/[0.04] hover:shadow-[0_0_24px_-8px_rgba(0,212,255,0.25)]",
          isOpen && (isBefore ? "border-red-500/15 bg-red-950/25" : "border-neon-cyan/25 bg-neon-cyan/[0.06]")
        )}
      >
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
            isBefore
              ? "border-red-500/10 bg-red-950/30"
              : "border-neon-cyan/20 bg-neon-cyan/[0.08] transition-shadow duration-300 group-hover/item:shadow-[0_0_16px_-4px_rgba(0,212,255,0.35)]"
          )}
        >
          <Icon
            className={cn("h-4 w-4", isBefore ? "text-red-400/45" : "text-neon-cyan")}
            strokeWidth={1.75}
          />
        </span>
        <span className={cn("type-body flex-1", isBefore ? "text-white/35" : "text-white")}>{label}</span>
        <Info
          className={cn(
            "h-3.5 w-3.5 shrink-0 transition-colors",
            isBefore
              ? "text-red-400/25 group-hover/item:text-red-400/45"
              : "text-neon-cyan/30 group-hover/item:text-neon-cyan/60"
          )}
          strokeWidth={2}
        />
        {isBefore ? (
          <span className="text-sm font-light text-red-400/30" aria-hidden>
            ×
          </span>
        ) : (
          <Check className="h-4 w-4 shrink-0 text-neon-cyan" strokeWidth={2.5} aria-hidden />
        )}

        {/* Hover popup — desktop */}
        <span
          role="tooltip"
          className={cn(
            "pointer-events-none absolute bottom-[calc(100%+0.625rem)] z-30 hidden w-[min(100%,17.5rem)] rounded-xl border p-3.5 text-xs leading-relaxed shadow-[0_16px_48px_-12px_rgba(0,0,0,0.65)] transition-all duration-200 md:block",
            align === "left" ? "left-0" : "right-0",
            isBefore
              ? "border-red-500/15 bg-[var(--tooltip-bg-before)]/95 text-white/65 backdrop-blur-md"
              : "border-neon-cyan/20 bg-[var(--tooltip-bg-after)]/95 text-white/80 backdrop-blur-md",
            "opacity-0 translate-y-1 group-hover/item:opacity-100 group-hover/item:translate-y-0 group-focus-visible/item:opacity-100 group-focus-visible/item:translate-y-0"
          )}
        >
          {detail}
        </span>
      </button>

      {/* Tap / keyboard popup — mobile & pinned state */}
      <div
        id={`${id}-detail`}
        className={cn(
          "overflow-hidden transition-all duration-300 md:hidden",
          isOpen ? "mt-2 max-h-40 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <p
          className={cn(
            "rounded-xl border px-4 py-3 text-xs leading-relaxed",
            isBefore
              ? "border-red-500/10 bg-red-950/20 text-white/55"
              : "border-neon-cyan/15 bg-neon-cyan/[0.05] text-white/75"
          )}
        >
          {detail}
        </p>
      </div>
    </motion.li>
  );
}

function ComparisonPanel({
  variant,
  eyebrow,
  title,
  titleClassName,
  badge,
  dashboardTitle,
  stats,
  pipelineLabel,
  pipelineValue,
  pipelineWidth,
  rows,
  align,
  openTooltipId,
  onToggleTooltip,
}: {
  variant: PanelVariant;
  eyebrow: string;
  title: React.ReactNode;
  titleClassName: string;
  badge: React.ReactNode;
  dashboardTitle: string;
  stats: { label: string; value: string; tone: string }[];
  pipelineLabel: string;
  pipelineValue: string;
  pipelineWidth: string;
  rows: ComparisonRow[];
  align: "left" | "right";
  openTooltipId: string | null;
  onToggleTooltip: (id: string) => void;
}) {
  const isBefore = variant === "before";
  const { fadeUp } = useMotionVariants();

  return (
    <motion.div
      className={cn(
        "relative flex flex-col p-6 md:p-8 lg:p-10",
        isBefore ? "border-b border-surface lg:border-b-0 lg:border-r" : ""
      )}
      initial={fadeUp.hidden}
      whileInView={{
        ...(fadeUp.visible as object),
        transition: {
          ...((fadeUp.visible as { transition?: object }).transition ?? {}),
          delay: isBefore ? 0 : 0.1,
        },
      }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <div
        className={cn(
          "pointer-events-none absolute rounded-full blur-[70px]",
          isBefore
            ? "-right-16 top-0 h-48 w-48 bg-red-500/[0.06]"
            : "-left-16 bottom-0 h-56 w-56 bg-neon-cyan/[0.08]"
        )}
        aria-hidden
      />
      {!isBefore && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-neon-cyan/10"
          aria-hidden
        />
      )}

      <div className="relative flex min-h-[5.5rem] items-start justify-between gap-4">
        <div>
          <span
            className={cn(
              "text-[10px] font-semibold uppercase tracking-[0.22em]",
              isBefore ? "text-red-400/55" : "text-neon-cyan/80"
            )}
          >
            {eyebrow}
          </span>
          <h3 className={cn("type-subheader mt-2", titleClassName)}>{title}</h3>
        </div>
        {badge}
      </div>

      <div className="relative mt-6">
        <DashboardCard
          variant={variant}
          title={dashboardTitle}
          stats={stats}
          pipelineLabel={pipelineLabel}
          pipelineValue={pipelineValue}
          pipelineWidth={pipelineWidth}
        />
      </div>

      <ul className="relative mt-6 flex flex-1 flex-col space-y-2">
        {rows.map(({ label, detail, Icon }, i) => {
          const itemId = `${variant}-${i}`;
          return (
            <ComparisonListItem
              key={itemId}
              id={itemId}
              variant={variant}
              label={label}
              detail={detail}
              Icon={Icon}
              index={i}
              align={align}
              isOpen={openTooltipId === itemId}
              onToggle={onToggleTooltip}
            />
          );
        })}
      </ul>
    </motion.div>
  );
}

type Props = { surfaceIndex?: number };

export default function Philosophy({ surfaceIndex = 0 }: Props) {
  const t = useTranslations("philosophy");
  const tCommon = useTranslations("common");
  const { fadeUp } = useMotionVariants();
  const [openTooltipId, setOpenTooltipId] = useState<string | null>(null);

  const beforeItems = t.raw("beforeItems") as string[];
  const afterItems = t.raw("afterItems") as string[];
  const beforeDetails = t.raw("beforeItemDetails") as string[];
  const afterDetails = t.raw("afterItemDetails") as string[];

  const beforeRows = useMemo(
    () =>
      beforeItems.map((label, i) => ({
        label,
        detail: beforeDetails[i] ?? "",
        Icon: beforeIcons[i] ?? Clock,
      })),
    [beforeItems, beforeDetails]
  );

  const afterRows = useMemo(
    () =>
      afterItems.map((label, i) => ({
        label,
        detail: afterDetails[i] ?? "",
        Icon: afterIcons[i] ?? Target,
      })),
    [afterItems, afterDetails]
  );

  const handleToggleTooltip = useCallback((id: string) => {
    setOpenTooltipId((current) => (current === id ? null : id));
  }, []);

  const dashboardStats = useMemo(
    () => ({
      before: [
        { label: t("statImpressions"), value: "3.2M", tone: "text-red-300/55" },
        { label: t("statEngagement"), value: "0.6%", tone: "text-red-400/50" },
        { label: t("statRevenue"), value: "↓ 34%", tone: "text-red-400/70" },
      ],
      after: [
        { label: t("statImpressions"), value: "580K", tone: "text-neon-cyan/80" },
        { label: t("statEngagement"), value: "8.4%", tone: "text-white" },
        { label: t("statRevenue"), value: "+47%", tone: "gradient-text" },
      ],
    }),
    [t]
  );

  return (
    <Section id="philosophy" surfaceIndex={surfaceIndex} className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:26px_26px] opacity-35"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-neon-cyan/[0.04] blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/2 h-72 w-72 rounded-full bg-red-500/[0.04] blur-[100px]"
        aria-hidden
      />

      <div className="container-site relative z-10">
        <SectionHeader
          badge={t("label")}
          title={t("title")}
          description={t("subtitle")}
          headingId="philosophy-heading"
        />

        <div className="mx-auto mt-14 max-w-6xl lg:mt-16">
          <div className="relative overflow-hidden rounded-3xl border border-surface bg-gradient-to-br from-white/[0.04] via-bg-secondary/95 to-bg-dark shadow-panel-lg">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent"
              aria-hidden
            />

            <div className="grid items-stretch lg:grid-cols-[1fr_auto_1fr]">
              <ComparisonPanel
                variant="before"
                eyebrow={t("before")}
                title={t("agencyA")}
                titleClassName="text-white/35"
                badge={
                  <span className="shrink-0 rounded-full border border-red-500/15 bg-red-950/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-red-400/60">
                    {t("statusBefore")}
                  </span>
                }
                dashboardTitle={t("dashboardBefore")}
                stats={dashboardStats.before}
                pipelineLabel={t("pipelineLabel")}
                pipelineValue={t("pipelineBefore")}
                pipelineWidth="11%"
                rows={beforeRows}
                align="left"
                openTooltipId={openTooltipId}
                onToggleTooltip={handleToggleTooltip}
              />

              <div className="relative flex items-center justify-center self-stretch border-b border-surface px-6 py-5 lg:border-b-0 lg:border-x lg:border-surface lg:px-5 lg:py-10">
                <div
                  className="pointer-events-none absolute inset-x-3 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-red-500/20 via-white/10 to-neon-cyan/30"
                  aria-hidden
                />
                <motion.span
                  className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-neon-cyan/25 bg-neon-cyan/[0.08] shadow-lg shadow-neon-cyan/10"
                  initial={fadeUp.hidden}
                  whileInView={{
                    ...(fadeUp.visible as object),
                    transition: {
                      ...((fadeUp.visible as { transition?: object }).transition ?? {}),
                      delay: 0.2,
                    },
                  }}
                  viewport={{ once: true }}
                >
                  <ArrowRight className="h-4 w-4 text-neon-cyan" strokeWidth={2} />
                </motion.span>
              </div>

              <ComparisonPanel
                variant="after"
                eyebrow={t("after")}
                title="KINEXIS"
                titleClassName="gradient-text"
                badge={
                  <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-neon-cyan/25 bg-neon-cyan/[0.08] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-neon-cyan">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon-cyan" />
                    </span>
                    {t("statusAfter")}
                  </span>
                }
                dashboardTitle={t("dashboardAfter")}
                stats={dashboardStats.after}
                pipelineLabel={t("pipelineLabel")}
                pipelineValue={t("pipelineAfter")}
                pipelineWidth="78%"
                rows={afterRows}
                align="right"
                openTooltipId={openTooltipId}
                onToggleTooltip={handleToggleTooltip}
              />
            </div>
          </div>
        </div>

        <div className="section-cta-row">
          <Button href="/about" variant="secondary">
            {tCommon("learnAboutUs")}
          </Button>
        </div>
      </div>
    </Section>
  );
}
