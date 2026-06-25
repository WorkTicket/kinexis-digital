"use client";

import { m as motion } from "@/lib/framer";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { pageSectionClasses } from "@/lib/page-section-surface";

export type FAQItem = { question: string; answer: string };

type FAQSectionProps = {
  label?: string;
  title?: string;
  items: FAQItem[];
  surfaceIndex?: number;
};

export default function FAQSection({
  label = "Common Questions",
  title = "FAQ",
  items,
  surfaceIndex = 0,
}: FAQSectionProps) {
  const { fadeUp, stagger } = useMotionVariants();

  return (
    <section className={pageSectionClasses(surfaceIndex)}>
      <div className="container-site">
        <div className="section-header">
          <span className="section-label">{label}</span>
          <h2 className="section-title">{title}</h2>
          <div className="section-divider" />
        </div>
        <motion.div
          className="section-content max-w-2xl mx-auto space-y-3"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {items.map((item) => (
            <motion.div key={item.question} variants={fadeUp}>
              <details className="group border-b border-white/[0.06]">
                <summary className="faq-summary">
                  <span>{item.question}</span>
                  <span className="text-neon-cyan text-xl transition-transform duration-200 flex-shrink-0 group-open:rotate-45">+</span>
                </summary>
                <p className="faq-answer">{item.answer}</p>
              </details>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
