"use client";

import { m as motion } from "@/lib/framer";
import PhaseDot from "@/components/ui/PhaseDot";

const steps = [
  {
    title: "Audit",
    description:
      "We dig into your traffic, conversions, tech setup, and what your competitors are doing. No decisions without data.",
    metric: "Full audit delivered in week 1",
  },
  {
    title: "Strategy",
    description:
      "A custom roadmap based on your goals and market reality. Every recommendation connects to revenue, not vanity metrics.",
    metric: "Clear KPIs at every milestone",
  },
  {
    title: "Execution",
    description:
      "Our team builds, optimizes, and launches across channels at the same time. Each channel supports the others.",
    metric: "Multi-channel coordination",
  },
  {
    title: "Scale",
    description:
      "Once we prove what works, we double down. Resources go to channels delivering real ROI. Underperformers get cut.",
    metric: "Weekly optimization and reporting",
  },
];

export default function TrustedProcess() {
  return (
    <section className="section-padding border-t border-white/[0.06] relative overflow-hidden">
      <div className="container-site relative z-10">
        <div className="grid gap-grid-lg lg:grid-cols-[1fr_1.2fr] items-start">
          {/* Editorial left column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">How We Deliver</span>
            <h2 className="section-title section-title--left mt-4">
              A system, not a guess.
            </h2>
            <p className="section-subtitle section-subtitle--left mt-6">
              No magic tricks. No hand-waving. A repeatable framework that takes your business from where it is to where you want it to be.
            </p>
          </motion.div>

          {/* Vertical timeline — no icons */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-white/[0.06] hidden sm:block" />

            <div className="space-y-0">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  className="relative flex gap-8 sm:gap-10 py-8 border-b border-white/[0.04] last:border-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="hidden sm:flex w-8 shrink-0 items-start justify-center pt-1">
                    <PhaseDot letter={step.title[0]} active={i === 0} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="sm:hidden">
                        <PhaseDot letter={step.title[0]} active={i === 0} />
                      </span>
                      <h3 className="text-xl font-bold md:text-2xl">{step.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {step.description}
                    </p>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-neon-cyan/70">
                      {step.metric}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
