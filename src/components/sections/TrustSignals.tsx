"use client";

import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ProofMetric from "@/components/ui/ProofMetric";
import { m as motion } from "@/lib/framer";

const stats = [
  { label: "Revenue we've generated for clients", value: 12, prefix: "$", suffix: "M+" },
  { label: "Years of team experience", value: 25, suffix: "+ years" },
  { label: "Clients at a time (max)", value: 10, suffix: "" },
  { label: "Average traffic increase", value: 340, prefix: "+", suffix: "%" },
];

export default function TrustSignals() {
  return (
    <section className="section-padding-sm border-t border-white/[0.06]">
      <div className="container-site">
        <motion.div
          className="grid gap-grid-lg md:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((s) => (
            <ProofMetric
              key={s.label}
              size="lg"
              value={
                <AnimatedCounter
                  from={0}
                  to={s.value as number}
                  prefix={s.prefix}
                  suffix={s.suffix}
                />
              }
              label={s.label}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
