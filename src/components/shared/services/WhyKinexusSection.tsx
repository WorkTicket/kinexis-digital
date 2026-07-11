import type { ReactNode } from "react";
import Section from "@/components/shared/services/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionIntroWithVisualization from "@/components/shared/services/SectionIntroWithVisualization";
import WhyKinexusGrid from "@/components/shared/services/WhyKinexusGrid";
import type { WhyKinexusData } from "@/content/services/architecture/types";

type Props = WhyKinexusData & {
  surfaceIndex: number;
  visualization?: ReactNode;
};

export default function WhyKinexusSection({ headline, subtitle, points, surfaceIndex, visualization }: Props) {
  return (
    <Section id="why-kinexus" variant="default" surfaceIndex={surfaceIndex}>
      <div className="container-site">
        <SectionIntroWithVisualization
          header={<SectionHeader title={headline} description={subtitle} />}
          visualization={visualization}
        />
        <div className="section-content mx-auto max-w-5xl">
          <WhyKinexusGrid points={points} />
        </div>
      </div>
    </Section>
  );
}
