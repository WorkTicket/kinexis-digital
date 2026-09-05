import { Activity, MapPin, Smartphone, Target } from "lucide-react";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { LandingPageScopeItem } from "@/content/registry/landing-pages";
import { duration } from "@/lib/motion";

const ICONS = [Smartphone, MapPin, Target, Activity] as const;

export function CampaignScope({
  title,
  items,
}: {
  title: string;
  items: LandingPageScopeItem[];
}) {
  return (
    <section
      aria-labelledby="lp-scope-heading"
      className="lp-campaign-scope chapter chapter--studio relative"
    >
      <div className="shell chapter-shell--tight relative">
        <Reveal variant="rise" when="chapter">
          <ChapterLead
            layout="split"
            eyebrow="Scope"
            headingId="lp-scope-heading"
            title={title}
          />
        </Reveal>

        <RevealGroup
          as="ul"
          className="lp-campaign-scope__grid"
          stagger={duration.staggerTight}
          delayChildren={0.06}
        >
          {items.map((item, index) => {
            const Icon = ICONS[index] ?? Smartphone;
            return (
              <RevealItem as="li" key={item.title} variant="fadeUp">
                <article className="lp-campaign-scope__card">
                  <span className="lp-campaign-scope__icon" aria-hidden>
                    <Icon strokeWidth={1.5} />
                  </span>
                  <h3 className="lp-campaign-scope__title">{item.title}</h3>
                  <p className="lp-campaign-scope__body">{item.description}</p>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
