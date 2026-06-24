"use client";

import { m as motion } from "@/lib/framer";
import { Search, ClipboardList, Rocket, TrendingUp, Sparkles } from "lucide-react";

const phases = [
  {
    title: "Audit",
    icon: Search,
    description:
      "We review your funnel, traffic sources, conversion data, and competitors to find where growth is hiding.",
    details: [
      "Full funnel audit and conversion analysis",
      "Traffic source and channel performance review",
      "Tech stack evaluation and integration mapping",
      "Competitor analysis and gap identification",
      "Clear list of priorities based on your data",
    ],
  },
  {
    title: "Strategy",
    icon: ClipboardList,
    description:
      "We build a custom roadmap based on your specific goals and market reality. Every recommendation connects to revenue, not vanity metrics.",
    details: [
      "Custom growth roadmap with clear milestones",
      "Channel strategy and resource allocation",
      "KPI framework and measurement plan",
      "Cross-channel integration blueprint",
      "Revenue forecasting and target setting",
    ],
  },
  {
    title: "Execution",
    icon: Rocket,
    description:
      "Design, development, writing, and campaign launches executed with clear milestones and weekly progress reporting.",
    details: [
      "Design and development sprints with rapid iteration",
      "Content production and campaign launches",
      "Weekly progress reporting and transparent dashboards",
      "Milestone-based delivery with quality gates",
      "Cross-channel coordination and alignment",
    ],
  },
  {
    title: "Scale",
    icon: TrendingUp,
    description:
      "Continuous optimization, A/B testing, and performance analysis ensure every dollar is spent on what delivers the highest ROI.",
    details: [
      "A/B testing and conversion rate optimization",
      "Performance analysis and KPI tracking",
      "Iterative refinement based on real data",
      "Scalable systems and process documentation",
      "Steady growth through testing and iteration",
    ],
  },
];

export default function ServicesProcess() {
  return (
    <section className="section-padding bg-bg relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.06]"
            style={{
              background:
                i === 0
                  ? "radial-gradient(circle, #005f80, transparent)"
                  : i === 1
                  ? "radial-gradient(circle, #0099cc, transparent)"
                  : "radial-gradient(circle, #00d4ff, transparent)",
              top: i === 0 ? "-10%" : i === 1 ? "20%" : "50%",
              left: i === 0 ? "-10%" : i === 1 ? "50%" : "70%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      <div className="container-site relative z-10">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">How We Deliver</span>
          <h2 className="section-title">Our Approach</h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            Every project follows four phases: move fast early, then keep building on what works.
          </p>
        </motion.div>

        <div className="section-content grid gap-grid-sm md:grid-cols-2 lg:grid-cols-4">
          {phases.map((phase, i) => {
            const Icon = phase.icon;
            return (
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-neon-cyan/10 bg-gradient-to-br from-neon-cyan/20 to-neon-blue/10 mb-5">
                  <Icon className="h-6 w-6 text-neon-cyan" />
                </div>

                <h3 className="text-xl font-bold">{phase.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {phase.description}
                </p>

                <div className="mt-6 space-y-2.5 pt-6 border-t border-white/[0.06]">
                  {phase.details.map((detail) => (
                    <div key={detail} className="flex items-start gap-2.5">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neon-cyan/10">
                        <Sparkles className="h-2.5 w-2.5 text-neon-cyan" />
                      </div>
                      <span className="text-xs leading-relaxed text-text-secondary">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
