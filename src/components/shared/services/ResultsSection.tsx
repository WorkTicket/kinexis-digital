"use client";

import { m as motion } from "@/lib/framer";
import Section from "@/components/shared/services/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import ProofMetric from "@/components/ui/ProofMetric";
import type { ResultMetric } from "@/content/services/architecture/types";
import { useMotionVariants } from "@/hooks/useMotionVariants";

type Props = {
  title: string;
  subtitle: string;
  metrics: ResultMetric[];
  surfaceIndex: number;
};

export default function ResultsSection({ title, subtitle, metrics, surfaceIndex }: Props) {
  const { fadeUp, stagger } = useMotionVariants();

  return (
    <Section id="results" variant="data" surfaceIndex={surfaceIndex}>
      <div className="container-site" style={{ maxWidth: "var(--container-max)", paddingInline: "var(--inner-padding)" }}>
        <SectionHeader pattern="B" title={title} subtitle={subtitle} />
        <motion.div
          className="section-content grid gap-grid-sm md:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {metrics.map((r) => (
            <motion.div key={r.label} variants={fadeUp} className="proof-metric-card">
              <ProofMetric value={r.metric} label={r.label} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
