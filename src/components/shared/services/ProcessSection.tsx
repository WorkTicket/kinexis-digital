"use client";

import Section from "@/components/shared/services/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import ServicePhaseList from "@/components/ui/ServicePhaseList";
import type { ServicePhase } from "@/components/ui/ServicePhaseList";

type Props = {
  title: string;
  subtitle: string;
  steps: ServicePhase[];
  surfaceIndex: number;
};

export default function ProcessSection({ title, subtitle, steps, surfaceIndex }: Props) {
  return (
    <Section id="process" variant="editorial" surfaceIndex={surfaceIndex}>
      <div className="container-site" style={{ maxWidth: "var(--container-max)", paddingInline: "var(--inner-padding)" }}>
        <SectionHeader pattern="B" title={title} subtitle={subtitle} />
        <div className="section-content">
          <ServicePhaseList phases={steps} />
        </div>
      </div>
    </Section>
  );
}
