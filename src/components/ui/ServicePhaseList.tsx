"use client";

import { m as motion } from "@/lib/framer";
import PhaseDot from "@/components/ui/PhaseDot";
import { cardClasses } from "@/lib/card-styles";
import { cn } from "@/lib/utils";

export type ServicePhase = {
  title: string;
  desc: string;
  metric: string;
};

type Props = {
  phases: ServicePhase[];
  className?: string;
};

export default function ServicePhaseList({ phases, className }: Props) {
  return (
    <div className={cn("relative mx-auto max-w-3xl", className)}>
      <div
        className="pointer-events-none absolute left-[0.625rem] top-3 bottom-3 hidden w-px bg-gradient-to-b from-neon-cyan/30 via-white/[0.08] to-transparent lg:block"
        aria-hidden
      />
      <ol className="list-none space-y-4 lg:space-y-0">
        {phases.map((phase, i) => (
          <motion.li
            key={phase.title}
            className="relative lg:pb-8 lg:pl-9 last:lg:pb-0"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute left-0 top-[1.75rem] hidden items-center justify-center lg:flex">
              <PhaseDot active className="transition-shadow duration-premium" />
            </div>

            <div
              className={cardClasses({
                surface: "elevated",
                hover: false,
                className: "p-6 md:p-8",
              })}
            >
              <span className="mb-4 inline-block rounded-lg border border-strong bg-surface-glass px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-neon-cyan/65">
                Phase {i + 1}
              </span>
              <h3 className="text-lg font-bold leading-snug md:text-xl">{phase.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{phase.desc}</p>
              {phase.metric ? (
                <p className="mt-4 text-xs font-semibold text-neon-cyan/85 md:text-sm">{phase.metric}</p>
              ) : null}
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
