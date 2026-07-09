import Section from "@/components/shared/services/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import ServicePhaseList from "@/components/ui/ServicePhaseList";
import type { ServicePhase } from "@/components/ui/ServicePhaseList";

type Props = {
  title: string;
  subtitle: string;
  intro?: string;
  steps: ServicePhase[];
  surfaceIndex: number;
};

export default function ProcessSection({ title, subtitle, intro, steps, surfaceIndex }: Props) {
  return (
    <Section id="process" variant="editorial" surfaceIndex={surfaceIndex}>
      <div className="container-site">
        <SectionHeader title={title} description={subtitle} />
        {intro ? (
          <p className="section-content mx-auto max-w-3xl text-base leading-relaxed text-muted md:text-lg">{intro}</p>
        ) : null}
        <div className="section-content">
          <ServicePhaseList phases={steps} />
        </div>
      </div>
    </Section>
  );
}
