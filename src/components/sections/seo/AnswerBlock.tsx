"use client";

import { useRef } from "react";
import { m as motion, useInView } from "@/lib/framer";
import { useTranslations } from "next-intl";
import { pageSectionClasses } from "@/lib/page-section-surface";

type AnswerBlockProps = {
  text: string;
  surfaceIndex?: number;
};

export default function AnswerBlock({ text, surfaceIndex = 0 }: AnswerBlockProps) {
  const t = useTranslations("common");
  const sectionRef = useRef<HTMLElement>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.35,
    margin: "0px 0px -12% 0px",
  });

  return (
    <motion.section
      ref={sectionRef}
      className={pageSectionClasses(surfaceIndex)}
      aria-label="Service summary"
      initial={false}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden={!isInView}
    >
      <div className="container-site">
        <motion.div
          className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent p-8 md:p-12"
          initial={false}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 28 }
          }
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden={!isInView}
        >
          <motion.div
            className="pointer-events-none absolute inset-y-4 left-0 w-1 rounded-full bg-gradient-to-b from-neon-cyan via-neon-blue to-transparent"
            initial={false}
            animate={
              isInView
                ? { scaleY: 1, opacity: 1 }
                : { scaleY: 0, opacity: 0 }
            }
            transition={{ duration: 0.8, delay: isInView ? 0.15 : 0, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-neon-cyan/[0.05] blur-[70px]"
            aria-hidden
          />
          <span className="relative mb-5 inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-neon-cyan/70">
            {t("atAGlance")}
          </span>
          <p className="relative pl-4 text-base leading-relaxed text-white/90 md:text-lg md:leading-relaxed">
            {text}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
