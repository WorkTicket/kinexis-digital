"use client";

import { m as motion } from "@/lib/framer";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { Quote } from "lucide-react";
import type { TestimonialsContent } from "@/content/testimonials";

import { pageSectionClasses } from "@/lib/page-section-surface";

type Props = {
  content: TestimonialsContent;
  surfaceIndex?: number;
};

export default function Testimonials({ content: c, surfaceIndex = 0 }: Props) {
  const { fadeUp, stagger } = useMotionVariants();

  return (
    <section className={pageSectionClasses(surfaceIndex, { className: "relative overflow-hidden" })}>
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[48rem] -translate-x-1/2 bg-neon-cyan/[0.025] blur-[120px]"
        aria-hidden
      />
      <motion.div
        className="container-site relative"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <motion.div variants={fadeUp} className="section-header text-center">
          <span className="section-label">{c.label}</span>
          <h2 className="section-title">{c.title}</h2>
          <p className="section-subtitle">{c.subtitle}</p>
        </motion.div>

        <motion.div
          variants={stagger}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-2"
        >
          {c.items.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-6 md:p-7"
            >
              <Quote className="h-5 w-5 shrink-0 text-neon-cyan/30" />
              <blockquote className="flex-1 text-[15px] leading-relaxed text-white/70">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-auto border-t border-white/[0.06] pt-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/40">
                      {t.title} · {t.company}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-neon-cyan/15 bg-neon-cyan/[0.06] px-3 py-1 text-[11px] font-semibold text-neon-cyan/70">
                    {t.result}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
