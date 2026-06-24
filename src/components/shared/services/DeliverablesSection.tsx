"use client";

import { m as motion } from "@/lib/framer";
import { Check } from "lucide-react";
import Section from "@/components/shared/services/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import type { DeliverableItem } from "@/content/services/architecture/types";

type Props = {
  title: string;
  subtitle: string;
  items: DeliverableItem[];
  surfaceIndex: number;
};

export default function DeliverablesSection({ title, subtitle, items, surfaceIndex }: Props) {
  return (
    <Section id="deliverables" variant="dark" surfaceIndex={surfaceIndex}>
      <div className="container-site" style={{ maxWidth: "var(--container-max)", paddingInline: "var(--inner-padding)" }}>
        <SectionHeader pattern="C" title={title} subtitle={subtitle} />

        <motion.div
          className="section-content relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-surface bg-gradient-to-br from-white/[0.05] via-bg-secondary/90 to-bg-dark shadow-panel"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative border-b border-white/[0.06] px-6 py-5 md:px-10 md:py-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">Scope of work</span>
          </div>
          <ul className="relative grid gap-px bg-white/[0.06] md:grid-cols-2">
            {items.map((item, i) => (
              <motion.li
                key={item.title}
                className="flex gap-4 bg-bg-secondary/90 px-6 py-6 md:px-8 md:py-7"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-neon-cyan/25 bg-neon-cyan/[0.1]">
                  <Check className="h-2.5 w-2.5 text-neon-cyan" strokeWidth={2.5} aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="font-bold leading-snug">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Section>
  );
}
