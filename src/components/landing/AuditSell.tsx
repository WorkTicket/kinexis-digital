import { FileText, Handshake, KeyRound, type LucideIcon } from "lucide-react";
import { ViewportCluster } from "@/components/landing/ViewportCluster";
import { Button } from "@/components/ui/Button";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { MediaReveal, Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type {
  LandingPagePitch,
  LandingPageSellPoint,
} from "@/content/registry/landing-pages";
import { duration } from "@/lib/motion";

const SELL_ICONS: { test: RegExp; icon: LucideIcon }[] = [
  { test: /notes|read/i, icon: FileText },
  { test: /quote|job/i, icon: Handshake },
  { test: /own/i, icon: KeyRound },
];

function iconForSellPoint(title: string): LucideIcon {
  return SELL_ICONS.find((entry) => entry.test.test(title))?.icon ?? FileText;
}

export function AuditSell({
  eyebrow = "What you get",
  title,
  dek,
  points,
  ctaLabel,
}: Partial<LandingPagePitch> & {
  points?: LandingPageSellPoint[];
  ctaLabel?: string;
}) {
  return (
    <section
      aria-labelledby="lp-audit-sell-heading"
      className="lp-audit-sell chapter chapter--studio relative"
    >
      <div className="shell chapter-shell--tight relative">
        <div className="lp-audit-sell__layout">
          {title ? (
            <Reveal variant="rise" when="chapter">
              <ChapterLead
                headingId="lp-audit-sell-heading"
                eyebrow={eyebrow ?? "What you get"}
                title={title}
                dek={dek}
              />
            </Reveal>
          ) : null}

          <MediaReveal
            className="lp-audit-sell__viewports"
            variant="float"
            from="right"
            delay={0.06}
          >
            <ViewportCluster />
          </MediaReveal>
        </div>

        {points?.length ? (
          <RevealGroup
            as="ul"
            className="lp-audit-sell__points"
            stagger={duration.staggerTight}
            delayChildren={0.05}
          >
            {points.map((point) => {
              const Icon = iconForSellPoint(point.title);
              return (
                <RevealItem as="li" key={point.title} variant="fadeUp">
                  <article className="lp-audit-sell__point">
                    <span className="icon-well lp-audit-sell__icon" aria-hidden>
                      <Icon strokeWidth={1.5} />
                    </span>
                    <div className="lp-audit-sell__copy">
                      <h3 className="lp-audit-sell__point-title">{point.title}</h3>
                      <p className="lp-audit-sell__point-body">{point.body}</p>
                      {point.items?.length ? (
                        <ul className="lp-audit-sell__includes">
                          {point.items.map((entry) => (
                            <li key={entry}>{entry}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>
        ) : null}

        {ctaLabel ? (
          <div className="lp-audit-sell__action">
            <Button href="#lp-form" variant="link" arrow>
              {ctaLabel}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
