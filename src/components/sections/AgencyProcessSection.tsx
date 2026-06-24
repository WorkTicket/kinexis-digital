"use client";

import { useCallback, useMemo, useState } from "react";
import { m as motion, AnimatePresence } from "@/lib/framer";
import {
  Search,
  Layers,
  Rocket,
  TrendingUp,
  Check,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import Button from "@/components/ui/Button";
import TwoLineText from "@/components/ui/TwoLineText";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { AgencyHubContent } from "@/content/agency-hub";

type Props = {
  process: AgencyHubContent["process"];
};

const phaseMeta: {
  icon: LucideIcon;
  accent: string;
  glow: string;
}[] = [
  { icon: Search, accent: "#00d4ff", glow: "rgba(0,212,255,0.18)" },
  { icon: Layers, accent: "#00a8e8", glow: "rgba(0,168,232,0.16)" },
  { icon: Rocket, accent: "#0099cc", glow: "rgba(0,153,204,0.16)" },
  { icon: TrendingUp, accent: "#00d4ff", glow: "rgba(0, 212, 255, 0.2)" },
];

function WindowChrome() {
  return (
    <div className="flex items-center gap-2" aria-hidden>
      <span className="h-2.5 w-2.5 rounded-full bg-neon-cyan/50" />
      <span className="h-2.5 w-2.5 rounded-full bg-neon-cyan/30" />
      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
    </div>
  );
}

function DeliverablesPanel({
  deliverables,
  outcome,
  accent,
  glow,
  reducedMotion,
}: {
  deliverables: string[];
  outcome: string;
  accent: string;
  glow: string;
  reducedMotion: boolean;
}) {
  return (
    <div className="relative flex h-full flex-col">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
          Phase deliverables
        </span>
        <WindowChrome />
      </div>

      <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/[0.06] bg-black/25 p-6 md:p-8">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-[70px]"
          style={{ background: glow }}
          aria-hidden
        />

        <ul className="relative space-y-3">
          {deliverables.map((item, i) => (
            <motion.li
              key={item}
              className="flex items-start gap-3.5 rounded-xl border border-white/[0.05] bg-white/[0.025] px-4 py-3.5"
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border"
                style={{
                  borderColor: `${accent}33`,
                  backgroundColor: `${accent}14`,
                }}
              >
                <Check className="h-2.5 w-2.5" style={{ color: accent }} strokeWidth={2.5} />
              </span>
              <span className="text-sm leading-relaxed text-white/75">{item}</span>
            </motion.li>
          ))}
        </ul>

        <div
          className="relative mt-6 rounded-xl border p-5"
          style={{
            borderColor: `${accent}25`,
            background: `linear-gradient(135deg, ${accent}0a, transparent)`,
          }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
            Typical outcome
          </p>
          <p className="mt-2 text-xl font-bold tracking-tight md:text-2xl" style={{ color: accent }}>
            {outcome}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AgencyProcessSection({ process }: Props) {
  const reducedMotion = usePrefersReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  const steps = useMemo(
    () =>
      process.steps.map((step, i) => ({
        ...step,
        ...phaseMeta[i],
        deliverables: step.deliverables ?? [],
        outcome: step.outcome ?? "",
      })),
    [process.steps]
  );

  const active = steps[activeStep];

  const goToStep = useCallback((index: number) => {
    setActiveStep(index);
  }, []);

  return (
    <section className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:26px_26px] opacity-35"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-neon-blue/[0.03] blur-[100px]"
        aria-hidden
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={active.title}
          className="pointer-events-none absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full blur-[120px]"
          style={{ background: active.glow }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: reducedMotion ? 0.4 : 0.85, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        />
      </AnimatePresence>

      <div className="container-site relative z-10">
        <div className="section-header">
          <span className="section-label">Process</span>
          <h2 className="section-title">
            <TwoLineText text={process.title} variant="section" />
          </h2>
          <p className="section-subtitle">
            <TwoLineText text={process.subtitle} variant="body" />
          </p>
        </div>

        {/* Desktop pipeline navigator */}
        <div className="mx-auto mt-16 hidden max-w-4xl lg:block">
          <div className="flex items-start">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = activeStep === i;
              const isPast = i < activeStep;
              const connectorComplete = activeStep > i;

              return (
                <div key={step.phase} className="contents">
                  <button
                    type="button"
                    onClick={() => goToStep(i)}
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
                          layoutId="agency-process-ring"
                          className="absolute inset-0 rounded-2xl border border-neon-cyan/30"
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        />
                      )}
                      <Icon
                        className={`h-5 w-5 transition-colors duration-500 ${
                          isActive
                            ? "text-neon-cyan"
                            : isPast
                              ? "text-neon-cyan/60"
                              : "text-white/35 group-hover:text-white/55"
                        }`}
                        strokeWidth={1.75}
                      />
                    </span>

                    <span
                      className={`max-w-[6.5rem] text-xs font-semibold leading-snug transition-colors duration-500 ${
                        isActive ? "text-white" : isPast ? "text-white/60" : "text-white/35 group-hover:text-white/50"
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>

                  {i < steps.length - 1 && (
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
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = activeStep === i;
            return (
              <button
                key={step.phase}
                type="button"
                onClick={() => goToStep(i)}
                className={`flex shrink-0 items-center gap-2.5 rounded-full border px-4 py-2.5 transition-all duration-400 ${
                  isActive
                    ? "border-neon-cyan/35 bg-neon-cyan/[0.08] text-white"
                    : "border-white/[0.08] bg-white/[0.02] text-white/50"
                }`}
                aria-current={isActive ? "step" : undefined}
              >
                <Icon
                  className={`h-3.5 w-3.5 ${isActive ? "text-neon-cyan" : "text-white/40"}`}
                  strokeWidth={1.75}
                />
                <span className="text-xs font-semibold uppercase tracking-wider">{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Main showcase panel */}
        <div className="mx-auto mt-10 max-w-5xl lg:mt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.title}
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
              <div className="relative grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <div className="border-b border-white/[0.06] p-8 md:p-10 lg:border-b-0 lg:border-r lg:p-12">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon-cyan" />
                      </span>
                      Active phase
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
                      <h3 className="type-subheader text-white">{active.title}</h3>
                      <p className="mt-3 max-w-md type-body leading-relaxed text-muted">
                        {active.description}
                      </p>
                    </div>
                  </div>

                  {active.deliverables.length > 0 && (
                    <div className="mt-8 flex flex-wrap gap-2 lg:hidden">
                      {active.deliverables.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/55"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-10 hidden items-center gap-4 lg:flex">
                    <button
                      type="button"
                      onClick={() => goToStep(Math.max(0, activeStep - 1))}
                      disabled={activeStep === 0}
                      className="text-xs font-semibold uppercase tracking-wider text-white/30 transition-colors hover:text-white/60 disabled:pointer-events-none disabled:opacity-30"
                    >
                      Previous
                    </button>
                    <div className="h-px flex-1 bg-white/[0.06]" />
                    {activeStep < steps.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => goToStep(activeStep + 1)}
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neon-cyan transition-colors hover:text-neon-cyan/80"
                      >
                        Next phase
                        <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                      </button>
                    ) : (
                      <span className="text-xs font-semibold uppercase tracking-wider text-neon-cyan/60">
                        Final phase
                      </span>
                    )}
                  </div>
                </div>

                {active.deliverables.length > 0 && (
                  <div className="hidden p-8 md:p-10 lg:block lg:p-12">
                    <DeliverablesPanel
                      deliverables={active.deliverables}
                      outcome={active.outcome}
                      accent={active.accent}
                      glow={active.glow}
                      reducedMotion={reducedMotion}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile stacked overview */}
        <div className="mt-8 space-y-3 lg:hidden">
          {steps.map((step, i) => {
            if (i === activeStep) return null;
            const Icon = step.icon;
            return (
              <button
                key={step.phase}
                type="button"
                onClick={() => goToStep(i)}
                className="flex w-full items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 text-left transition-colors hover:border-white/10 hover:bg-white/[0.03]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                  <Icon className="h-4 w-4 text-white/40" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white/70">{step.title}</p>
                  <p className="mt-0.5 truncate text-xs text-white/35">{step.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="section-cta-row">
          <Button href="/about" variant="secondary" fullWidthMobile>
            {process.viewAllLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
