import Section from "@/components/shared/services/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionIntroWithVisualization from "@/components/shared/services/SectionIntroWithVisualization";
import type { ServiceOverviewData } from "@/content/services/architecture/types";
import { cardClasses } from "@/lib/card-styles";
import type { ReactNode } from "react";

type Props = ServiceOverviewData & {
  surfaceIndex: number;
  visualization?: ReactNode;
};

/** Problem/solution overview with split layout and card grid — not stacked prose lines. */
export default function ServiceOverview({
  headline,
  problem,
  solution,
  problemPoints,
  solutionPoints,
  surfaceIndex,
  visualization,
}: Props) {
  return (
    <Section id="overview" variant="dark" surfaceIndex={surfaceIndex}>
      <div className="container-site">
        <SectionIntroWithVisualization
          header={<SectionHeader title={headline} description={problem} />}
          visualization={visualization}
        />

        <div className="section-content grid gap-grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
          <ul className="grid gap-grid-sm sm:grid-cols-2">
            {problemPoints.map((point) => (
              <li
                key={point}
                className={cardClasses({
                  surface: "elevated",
                  hover: false,
                  className: "!p-5 md:!p-6 border-red-500/10 bg-red-950/10",
                })}
              >
                <p className="text-sm leading-relaxed text-red-100/75 md:text-base">{point}</p>
              </li>
            ))}
          </ul>

          <div className="rounded-2xl border border-neon-cyan/15 bg-neon-cyan/[0.04] p-8 md:p-10">
            <h3 id="overview-solution-heading" className="card-heading">
              {solution}
            </h3>
            <ul className="mt-6 space-y-4">
              {solutionPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted md:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-cyan" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
