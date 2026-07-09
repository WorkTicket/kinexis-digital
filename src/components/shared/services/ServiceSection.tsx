import type { ReactNode } from "react";
import Section from "@/components/shared/services/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionIntroWithVisualization from "@/components/shared/services/SectionIntroWithVisualization";
import ServiceSectionVisual from "@/components/shared/services/ServiceSectionVisual";
import type { ServiceSectionData } from "@/content/services/architecture/types";

type Props = ServiceSectionData & {
  surfaceIndex: number;
  visualization?: ReactNode;
};

/** Capability sections — prose-first with supporting cards or tables. */
export default function ServiceSection({
  id,
  headline,
  subheadline,
  visualVariant,
  points,
  tableHeaders,
  body,
  maxCards = 3,
  surfaceIndex,
  visualization,
}: Props) {
  const sectionVariant =
    visualVariant === "dashboard" || visualVariant === "chart"
      ? "data"
      : visualVariant === "comparison"
        ? "editorial"
        : visualVariant === "mockup"
          ? "visual"
          : "default";

  const displayPoints = points?.slice(0, maxCards);

  return (
    <Section id={id} variant={sectionVariant} surfaceIndex={surfaceIndex}>
      <div className="container-site">
        <SectionIntroWithVisualization
          header={<SectionHeader title={headline} description={subheadline} />}
          visualization={visualization}
        />
        {body ? (
          <p className="section-content mx-auto max-w-3xl text-base leading-relaxed text-muted md:text-lg">{body}</p>
        ) : null}
        {displayPoints && displayPoints.length > 0 ? (
          <div className="section-content mx-auto max-w-5xl">
            <ServiceSectionVisual variant={visualVariant} points={displayPoints} tableHeaders={tableHeaders} />
          </div>
        ) : null}
      </div>
    </Section>
  );
}
