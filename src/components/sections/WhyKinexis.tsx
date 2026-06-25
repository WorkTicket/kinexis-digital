"use client";

import { m as motion } from "@/lib/framer";
import { BarChart3, TrendingUp, Eye, Sparkles } from "lucide-react";
import { useMotionVariants } from "@/hooks/useMotionVariants";

const values = [
  {
    icon: BarChart3,
    title: "Evidence Over Opinion",
    description:
      "We skip the guesswork. If we can't measure it, we don't recommend it. Every strategy comes with the numbers behind it.",
  },
  {
    icon: TrendingUp,
    title: "Long-Term Thinking",
    description:
      "Good marketing pays off over time. A six-month SEO push can keep bringing in leads for years. We plan for growth that lasts, not quick wins that fade.",
  },
  {
    icon: Eye,
    title: "Radical Transparency",
    description:
      "You get access to the dashboards, the numbers, and the thinking behind every decision. You'll always know where your budget goes and what's actually working. No surprises.",
  },
  {
    icon: Sparkles,
    title: "Craft Over Scale",
    description:
      "We take on 8 to 10 clients at a time, not 50 or 100. When your account isn't buried in a pile, you get real attention. That's how we work.",
  },
];

export default function WhyKinexis() {
  const { fadeUp, stagger } = useMotionVariants();

  return (
    <section className="section-padding border-t border-white/[0.06]">
      <div className="container-site">
        <div className="section-header">
          <span className="section-label">Why KINEXIS</span>
          <h2 className="section-title">Four principles we live by</h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            Four principles we actually live by.
          </p>
        </div>

        <motion.div
          className="relative mx-auto mt-20 max-w-4xl"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="absolute left-7 top-0 h-full w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent max-md:hidden" />

          {values.map((v) => (
            <motion.div
              key={v.title}
              variants={fadeUp}
              className="group relative flex gap-8 pb-16 last:pb-0"
            >
              <div className="relative z-10 flex flex-col items-center max-md:hidden">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-bg transition-all duration-200 group-hover:border-neon-cyan/40 group-hover:shadow-lg group-hover:shadow-neon-cyan/10">
                  <v.icon className="h-6 w-6 text-white/40 transition-colors duration-200 group-hover:text-neon-cyan" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 md:hidden mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10">
                    <v.icon className="h-5 w-5 text-neon-cyan" />
                  </div>
                </div>
                <h3 className="text-xl font-bold md:text-2xl">{v.title}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                  {v.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
