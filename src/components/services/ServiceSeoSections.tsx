import AnswerBlock from "@/components/sections/seo/AnswerBlock";
import ProblemSection from "@/components/sections/seo/ProblemSection";
import SolutionSection from "@/components/sections/seo/SolutionSection";
import DeliverablesSection from "@/components/sections/seo/DeliverablesSection";
import ComparisonTable from "@/components/sections/seo/ComparisonTable";
import { getServiceSeoContent } from "@/content/service-seo";
import type { ServiceSeoSlug } from "@/content/service-seo/types";
import type { Locale } from "@/i18n/routing";

type Props = {
  slug: ServiceSeoSlug;
  locale: Locale;
  startSurfaceIndex?: number;
};

export default function ServiceSeoSections({ slug, locale, startSurfaceIndex = 0 }: Props) {
  const seo = getServiceSeoContent(slug, locale);
  let surfaceIndex = startSurfaceIndex;

  return (
    <>
      <AnswerBlock text={seo.answerBlock} surfaceIndex={surfaceIndex++} />
      <ProblemSection
        title={seo.problem.title}
        intro={seo.problem.intro}
        points={seo.problem.points}
        surfaceIndex={surfaceIndex++}
      />
      <SolutionSection
        title={seo.solution.title}
        intro={seo.solution.intro}
        points={seo.solution.points}
        surfaceIndex={surfaceIndex++}
      />
      <DeliverablesSection
        title={seo.deliverables.title}
        subtitle={seo.deliverables.subtitle}
        items={seo.deliverables.items}
        surfaceIndex={surfaceIndex++}
      />
      <ComparisonTable
        title={seo.comparison.title}
        subtitle={seo.comparison.subtitle}
        layout={seo.comparison.layout}
        columns={seo.comparison.columns}
        rows={seo.comparison.rows}
        surfaceIndex={surfaceIndex++}
      />
    </>
  );
}
