import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ProofMetric from "@/components/ui/ProofMetric";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/shared/services/Section";

const stats = [
  { label: "Revenue we've generated for clients", value: 12, prefix: "$", suffix: "M+" },
  { label: "Years of team experience", value: 25, suffix: "+ years" },
  { label: "Clients at a time (max)", value: 10, suffix: "" },
  { label: "Average traffic increase", value: 340, prefix: "+", suffix: "%" },
];

export default function TrustSignals() {
  return (
    <Section id="trust-signals" surfaceIndex={0} compact>
      <div className="container-site">
        <Reveal className="grid gap-grid-lg md:grid-cols-4">
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
        </Reveal>
      </div>
    </Section>
  );
}
