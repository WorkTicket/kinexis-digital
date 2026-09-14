import { SitePreview } from "@/components/home/SitePreview";
import { LandingIntake } from "@/components/landing/LandingIntake";
import { iconForLandingPoint } from "@/components/landing/landing-icons";
import { Button } from "@/components/ui/Button";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type {
  LandingPageEntry,
  LandingPagePainItem,
  LandingPagePrice,
  LandingPageProof,
  LandingPageSample,
} from "@/content/registry/landing-pages";
import { Link } from "@/i18n/navigation";
import { duration } from "@/lib/motion";

export function AuditProof({ items }: { items: LandingPageProof[] }) {
  if (!items.length) return null;

  return (
    <aside className="lp-audit-proof" aria-label="Results">
      <div className="shell lp-audit-proof__inner">
        <ul className="lp-audit-proof__stats">
          {items.slice(0, 4).map((item) => (
            <li key={`${item.metric}-${item.label}`}>
              <span className="lp-audit-proof__metric">{item.metric}</span>
              <span className="lp-audit-proof__label">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export function AuditPain({
  title,
  subtitle,
  eyebrow = "Why they leave",
  items,
}: {
  title: string;
  subtitle: string;
  eyebrow?: string;
  items: LandingPagePainItem[];
}) {
  return (
    <section
      aria-labelledby="lp-pain-heading"
      className="lp-audit-pain lp-audit-pain--dark chapter relative"
    >
      <div className="shell chapter-shell--tight relative">
        <Reveal variant="rise" when="chapter">
          <ChapterLead
            headingId="lp-pain-heading"
            eyebrow={eyebrow}
            title={title}
            dek={subtitle}
          />
        </Reveal>
        <RevealGroup
          as="ul"
          className="lp-audit-pain__list"
          stagger={duration.staggerTight}
          delayChildren={0.06}
        >
          {items.map((item) => {
            const Icon = iconForLandingPoint(item.title);
            return (
              <RevealItem as="li" key={item.title} variant="fadeUp">
                <article className="lp-audit-pain__item">
                  <span className="icon-well lp-audit-pain__icon" aria-hidden>
                    <Icon strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="lp-audit-pain__title">{item.title}</h3>
                    <p className="lp-audit-pain__body">{item.body}</p>
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}

export function AuditFit({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  if (!items.length) return null;

  return (
    <section
      aria-labelledby="lp-audit-fit-heading"
      className="lp-audit-fit chapter relative"
    >
      <div className="shell relative">
        <Reveal variant="rise" when="chapter">
          <h2 id="lp-audit-fit-heading" className="lp-audit-fit__title">
            {title}
          </h2>
          <p className="lp-audit-fit__line">{items.join(" · ")}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function AuditWork({
  title,
  intro,
  samples,
}: {
  title: string;
  intro?: string;
  samples: LandingPageSample[];
}) {
  if (!samples.length) return null;

  return (
    <section
      id="work"
      aria-labelledby="lp-audit-work-heading"
      className="lp-audit-work chapter relative"
    >
      <div className="shell chapter-shell--monument relative">
        <Reveal variant="rise" when="chapter">
          <ChapterLead
            headingId="lp-audit-work-heading"
            eyebrow="Work"
            title={title}
            dek={intro}
          />
        </Reveal>

        <RevealGroup
          as="ul"
          className="lp-audit-work__stack lp-audit-work__stack--equal"
          stagger={duration.staggerTight}
          delayChildren={0.08}
        >
          {samples.map((sample) => {
            const headline = sample.label
              ? `${sample.metric} ${sample.label}`
              : sample.metric;
            const card = (
              <article className="lp-audit-work__plate">
                <div className="lp-audit-work__media">
                  <div className="lp-audit-work__shot">
                    <SitePreview
                      image={sample.image}
                      imageAlt={sample.imageAlt}
                      sizes="(max-width: 767px) 100vw, 46vw"
                      direct
                    />
                  </div>
                </div>
                <div className="lp-audit-work__copy">
                  {sample.industry || sample.kind ? (
                    <p className="lp-audit-work__badge">
                      {sample.industry ?? sample.kind}
                    </p>
                  ) : null}
                  <h3 className="lp-audit-work__client">{sample.client}</h3>
                  <p className="lp-audit-work__result">{headline}</p>
                  {sample.summary ? (
                    <p className="lp-audit-work__summary">{sample.summary}</p>
                  ) : null}
                  {sample.href ? (
                    <span className="lp-audit-work__cta">View Project</span>
                  ) : null}
                </div>
              </article>
            );

            return (
              <RevealItem as="li" key={sample.client} variant="fadeUp">
                {sample.href ? (
                  <Link href={sample.href} className="lp-audit-work__link">
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}

export function AuditPricing({
  title,
  intro,
  items,
  note,
}: {
  title: string;
  intro?: string;
  items: LandingPagePrice[];
  note?: string;
}) {
  return (
    <section
      id="pricing"
      aria-labelledby="lp-audit-pricing-heading"
      className="lp-audit-pricing chapter relative"
    >
      <div className="shell chapter-shell--tight relative">
        <Reveal variant="rise" when="chapter">
          <ChapterLead
            headingId="lp-audit-pricing-heading"
            eyebrow="Investment"
            title={title}
            dek={intro}
          />
        </Reveal>

        <RevealGroup
          as="ul"
          className="lp-audit-pricing__list"
          stagger={duration.staggerTight}
          delayChildren={0.06}
        >
          {items.map((item) => (
            <RevealItem as="li" key={item.name} variant="fadeUp">
              <article className="lp-audit-pricing__card">
                <div className="lp-audit-pricing__head">
                  <h3 className="lp-audit-pricing__name">{item.name}</h3>
                  <p className="lp-audit-pricing__price">{item.price}</p>
                </div>
                <p className="lp-audit-pricing__body">{item.body}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        {note ? <p className="lp-audit-pricing__note">{note}</p> : null}
      </div>
    </section>
  );
}

const AUDIT_POINT_EMOJI: Record<string, string> = {
  "Mobile usability": "📱",
  "Speed and performance": "⚡",
  "Call and quote path": "📞",
  "Search foundation": "🔍",
  "Tracking and lead capture": "📈",
};

const NEXT_STEP_EMOJI: Record<string, string> = {
  "Send your website": "🌐",
  "We review the five key areas": "🔎",
  "You get our recommendations": "📋",
};

function emojiFor(map: Record<string, string>, title: string, fallback: string) {
  return map[title] ?? fallback;
}

export function AuditClose({ page }: { page: LandingPageEntry }) {
  const checks = page.process ?? [];
  const nextSteps = page.formSteps ?? [];

  return (
    <section
      id="lp-form"
      aria-labelledby="lp-audit-close-heading"
      className="lp-audit-close chapter relative"
    >
      <div className="shell chapter-shell--standard relative">
        <div className="lp-audit-close__layout">
          <Reveal variant="rise" when="chapter" className="lp-audit-close__copy">
            <p className="lp-audit-hero__eyebrow lp-audit-close__eyebrow">
              {page.processIntro ?? "Free 5-point website audit"}
            </p>
            <h2 id="lp-audit-close-heading" className="lp-audit-close__title">
              {page.processTitle ?? page.formTitle}
            </h2>
            {page.formAsideSubtitle ? (
              <p className="lp-audit-close__lede">{page.formAsideSubtitle}</p>
            ) : null}
            {checks.length ? (
              <ul
                className="lp-audit-close__checks"
                aria-label="What the audit reviews"
              >
                {checks.map((step) => (
                  <li key={step.title}>
                    <span className="lp-audit-close__emoji" aria-hidden>
                      {emojiFor(AUDIT_POINT_EMOJI, step.title, "✅")}
                    </span>
                    <span className="lp-audit-close__check-copy">
                      <span className="lp-audit-close__check-title">
                        {step.title}
                      </span>
                      {step.detail ? (
                        <span className="lp-audit-close__check-detail">
                          {step.detail}
                        </span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
            {nextSteps.length ? (
              <div className="lp-audit-close__next">
                <p className="lp-audit-close__next-label">What happens next</p>
                <ul
                  className="lp-audit-close__steps"
                  aria-label="What happens next"
                >
                  {nextSteps.map((step) => (
                    <li key={step.title}>
                      <span className="lp-audit-close__emoji" aria-hidden>
                        {emojiFor(NEXT_STEP_EMOJI, step.title, "➡️")}
                      </span>
                      <div className="lp-audit-close__step-copy">
                        <p className="lp-audit-close__step-title">{step.title}</p>
                        {step.detail ? (
                          <p className="lp-audit-close__step-detail">
                            {step.detail}
                          </p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Reveal>
          <Reveal variant="fadeUp" delay={0.08} when="chapter">
            <LandingIntake
              page={page}
              embedded
              formId="lp-audit-fields"
              trust="none"
              showCallPath={false}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function AuditFinalCta({
  title,
  copy,
  ctaLabel,
}: {
  title: string;
  copy?: string;
  ctaLabel: string;
}) {
  return (
    <section
      aria-labelledby="lp-audit-final-heading"
      className="lp-audit-final chapter relative"
    >
      <div className="shell relative">
        <Reveal variant="rise" when="chapter" className="lp-audit-final__inner">
          <h2 id="lp-audit-final-heading" className="lp-audit-final__title">
            {title}
          </h2>
          {copy ? <p className="lp-audit-final__copy">{copy}</p> : null}
          <Button href="#lp-form" size="lg">
            {ctaLabel}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
