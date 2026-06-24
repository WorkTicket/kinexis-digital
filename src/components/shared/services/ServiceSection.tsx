"use client";

import { m as motion } from "@/lib/framer";
import { cn } from "@/lib/utils";
import Section from "@/components/shared/services/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import type { ServiceSectionData, VisualVariant } from "@/content/services/architecture/types";
import { useMotionVariants } from "@/hooks/useMotionVariants";

type Props = ServiceSectionData & { surfaceIndex: number };

function statusBadgeClass(value: string) {
  const v = value.toLowerCase();
  if (v.includes("scal") || v.includes("escal")) return "bg-green-500/10 text-green-400";
  if (v.includes("optim")) return "bg-yellow-500/10 text-yellow-400";
  if (v.includes("test") || v.includes("proban")) return "bg-blue-500/10 text-blue-400";
  if (v.includes("active") || v.includes("live") || v.includes("activo")) return "bg-green-500/10 text-green-400";
  return "bg-white/[0.06] text-text-secondary";
}

function looksLikeStatus(value: string) {
  return /^(scaling|optimizing|testing|active|live|escalando|optimizando|probando|activo)$/i.test(value.trim());
}

function VariantLayout({
  variant,
  pointCount,
  children,
  className,
}: {
  variant: VisualVariant;
  pointCount?: number;
  children: React.ReactNode;
  className?: string;
}) {
  if (variant === "comparison") {
    return <div className={cn("section-content grid gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] md:grid-cols-2", className)}>{children}</div>;
  }
  if (variant === "mockup") {
    const mockupCols = pointCount === 4 ? "md:grid-cols-4" : "md:grid-cols-3";
    return <div className={cn("section-content grid gap-6", mockupCols, className)}>{children}</div>;
  }
  if (variant === "split") {
    return <div className={cn("section-content max-w-3xl space-y-4", className)}>{children}</div>;
  }
  return <div className={cn("section-content", className)}>{children}</div>;
}

export default function ServiceSection({ id, headline, subheadline, visualVariant, points, body, surfaceIndex }: Props) {
  const { fadeUp, stagger } = useMotionVariants();

  return (
    <Section id={id} variant={visualVariant === "chart" ? "data" : visualVariant === "mockup" ? "visual" : "editorial"} surfaceIndex={surfaceIndex}>
      <div className="container-site" style={{ maxWidth: "var(--container-max)", paddingInline: "var(--inner-padding)" }}>
        <SectionHeader pattern="B" title={headline} subtitle={subheadline} />
        {body && <p className="section-content mx-auto max-w-3xl text-center text-muted">{body}</p>}

        <VariantLayout variant={visualVariant} pointCount={points?.length}>
          {visualVariant === "chart" && points && (
            <motion.div
              className="grid gap-6 md:grid-cols-2"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {points.map((point) => (
                <motion.div
                  key={point.title}
                  variants={fadeUp}
                  className="flex h-full flex-col rounded-2xl border border-white/[0.06] bg-white/[0.025] p-6 md:p-8 transition-colors duration-300 hover:border-white/[0.1] hover:bg-white/[0.04]"
                >
                  <h3 className="font-bold leading-snug">{point.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{point.description}</p>
                  {point.metric ? (
                    <p className="mt-5 border-t border-white/[0.06] pt-4 type-metric text-neon-cyan">{point.metric}</p>
                  ) : null}
                </motion.div>
              ))}
            </motion.div>
          )}

          {visualVariant === "dashboard" && points && (
            <motion.div
              className="space-y-3"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {points.map((point) => (
                <motion.div
                  key={point.title}
                  variants={fadeUp}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.025] px-5 py-4 md:px-6 md:py-5 transition-colors duration-300 hover:border-white/[0.1] hover:bg-white/[0.04]"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold leading-snug">{point.title}</h3>
                    {point.description ? (
                      looksLikeStatus(point.description) ? (
                        <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusBadgeClass(point.description)}`}>
                          {point.description}
                        </span>
                      ) : (
                        <p className="mt-1 text-sm text-muted">{point.description}</p>
                      )
                    ) : null}
                  </div>
                  {point.metric ? (
                    <span className="shrink-0 type-metric text-neon-cyan whitespace-nowrap">{point.metric}</span>
                  ) : null}
                </motion.div>
              ))}
            </motion.div>
          )}

          {visualVariant === "mockup" && points && points.map((point) => (
            <motion.div key={point.title} variants={fadeUp} className="flex h-full flex-col rounded-2xl border border-white/[0.06] bg-bg-dark p-6">
              <h3 className="font-bold">{point.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{point.description}</p>
              {point.metric && <p className="mt-4 type-metric text-neon-cyan">{point.metric}</p>}
            </motion.div>
          ))}

          {visualVariant === "split" && points && (
            <motion.div className="space-y-4" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {points.map((point) => {
                const longMetric = Boolean(point.metric && point.metric.length > 24);

                return (
                  <motion.div
                    key={point.title}
                    variants={fadeUp}
                    className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-6 md:p-8 transition-colors duration-300 hover:border-white/[0.1] hover:bg-white/[0.04]"
                  >
                    <div
                      className={
                        point.metric && !longMetric
                          ? "flex flex-wrap items-start justify-between gap-4"
                          : undefined
                      }
                    >
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold">{point.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{point.description}</p>
                      </div>
                      {point.metric && !longMetric ? (
                        <span className="shrink-0 font-mono text-neon-cyan whitespace-nowrap">{point.metric}</span>
                      ) : null}
                    </div>
                    {point.metric && longMetric ? (
                      <p className="mt-4 border-t border-white/[0.06] pt-4 text-sm font-semibold leading-relaxed text-neon-cyan/80">
                        {point.metric}
                      </p>
                    ) : null}
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {visualVariant === "comparison" && points && points.map((point, index) => (
            <motion.div
              key={point.title}
              variants={fadeUp}
              className={cn(
                "flex h-full flex-col bg-bg p-8 md:p-10",
                index === 0 && points.length > 1 && "md:border-r md:border-white/[0.06]",
                index === points.length - 1 && "bg-gradient-to-br from-neon-cyan/[0.04] via-bg to-bg",
              )}
            >
              <h3 className="text-lg font-bold leading-snug">{point.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{point.description}</p>
              {point.metric ? (
                <p className="mt-5 border-t border-white/[0.06] pt-4 text-sm font-semibold leading-relaxed text-neon-cyan/80">
                  {point.metric}
                </p>
              ) : null}
            </motion.div>
          ))}
        </VariantLayout>
      </div>
    </Section>
  );
}
