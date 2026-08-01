import {
  Search,
  Layers,
  Rocket,
  TrendingUp,
  Check,
  type LucideIcon,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import type { AgencyHubContent } from "@/content/agency-hub";
import Section from "@/components/shared/services/Section";
import { featureCardGridClass } from "@/lib/card-styles";

type Props = {
  process: AgencyHubContent["process"];
  surfaceIndex?: number;
};

const phaseIcons: LucideIcon[] = [Search, Layers, Rocket, TrendingUp];

/** Static process steps — no interaction. */
export default function AgencyProcessSection({ process, surfaceIndex = 0 }: Props) {
  return (
    <Section id="agency-process" surfaceIndex={surfaceIndex}>
      <div className="container-site">
        <SectionHeader
          badge="Process"
          title={process.title}
          description={process.subtitle}
          headingId="agency-process-heading"
        />

        <ol className={`section-content ${featureCardGridClass(2)}`} role="list">
          {process.steps.map((step, i) => {
            const Icon = phaseIcons[i] ?? Search;
            const deliverables = step.deliverables ?? [];
            const outcome = step.outcome ?? "";

            return (
              <li key={step.phase}>
                <Card hover={false} className="flex h-full flex-col">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5">
                      <Icon className="h-5 w-5 text-neon-cyan" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neon-cyan/70">
                        {step.phase}
                      </p>
                      <h3 className="mt-1 card-heading">{step.title}</h3>
                    </div>
                  </div>

                  <p className="mt-5 type-body text-muted">{step.description}</p>

                  {deliverables.length > 0 && (
                    <ul className="mt-6 space-y-2.5" role="list">
                      {deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-white/70">
                          <Check
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neon-cyan/70"
                            strokeWidth={2.5}
                            aria-hidden
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {outcome && (
                    <p className="mt-6 border-t border-surface pt-5 text-sm font-medium text-white/85">
                      {outcome}
                    </p>
                  )}
                </Card>
              </li>
            );
          })}
        </ol>

        <div className="section-cta-row">
          <Button href="/about" variant="secondary" fullWidthMobile>
            {process.viewAllLabel}
          </Button>
        </div>
      </div>
    </Section>
  );
}
