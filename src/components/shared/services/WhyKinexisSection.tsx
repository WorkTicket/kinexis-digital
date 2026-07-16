import type { ReactNode } from "react";
import Section from "@/components/shared/services/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionIntroWithVisualization from "@/components/shared/services/SectionIntroWithVisualization";
import WhyKinexisGrid from "@/components/shared/services/WhyKinexisGrid";
import type { WhyKinexisData } from "@/content/services/architecture/types";

type Props = WhyKinexisData & {
  surfaceIndex: number;
  visualization?: ReactNode;
};

export default function WhyKinexisSection({ headline, subtitle, points, surfaceIndex, visualization }: Props) {
  return (
    <Section id="why-kinexis" variant="default" surfaceIndex={surfaceIndex}>
      <div className="container-site">
        <SectionIntroWithVisualization
          header={<SectionHeader title={headline} description={subtitle} />}
          visualization={visualization}
        />
        <div className="section-content mx-auto max-w-5xl">
          <WhyKinexisGrid points={points} />
        </div>
      </div>
    </Section>
  );
}
