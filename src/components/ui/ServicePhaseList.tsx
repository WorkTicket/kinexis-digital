"use client";

import { m as motion } from "@/lib/framer";
import { cn } from "@/lib/utils";
import PhaseAccent from "@/components/ui/PhaseAccent";

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
    <ol className={cn("space-y-6 max-w-4xl mx-auto list-none", className)}>
      {phases.map((phase, i) => (
        <motion.li
          key={phase.title}
          className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-bg-dark"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col gap-6 p-6 md:flex-row md:items-stretch md:gap-10">
            <div className="flex items-center gap-4 md:shrink-0 md:items-stretch md:gap-6 md:w-72">
              <PhaseAccent className="h-8 w-1 md:h-auto md:self-stretch" />
              <div className="flex items-center md:min-w-0 md:flex-1 flex-col items-start">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-neon-cyan/70">
                  Phase {i + 1}
                </span>
                <h3 className="mt-1 text-lg font-bold">{phase.title}</h3>
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-center">
              <p className="text-sm leading-relaxed text-muted">{phase.desc}</p>
              <p className="mt-3 text-xs font-semibold text-neon-cyan">{phase.metric}</p>
            </div>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
