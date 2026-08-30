import type { LucideIcon } from "lucide-react";
import { Clock, Handshake, Mail, Shield } from "lucide-react";
import { LandingLeadForm } from "@/components/landing/LandingLeadForm";
import { LandingTrust } from "@/components/landing/LandingTrust";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CONTACT_EMAIL } from "@/content/contact";
import type { LandingPageEntry } from "@/content/registry/landing-pages";
import { duration } from "@/lib/motion";

const STEP_ICONS: LucideIcon[] = [Clock, Mail, Handshake];
const TRUST_ICONS: LucideIcon[] = [Clock, Shield, Handshake];

type Props = {
  page: LandingPageEntry;
  /** Form-only panel for the hero rail. */
  embedded?: boolean;
};

export function LandingIntake({ page, embedded = false }: Props) {
  const steps = page.formSteps ?? [];
  const trust = page.formTrust ?? [];

  const formCard = (
    <div className="overflow-hidden rounded-2xl bg-[color-mix(in_oklab,var(--foreground)_4%,transparent)]">
      <div className={embedded ? "p-4 sm:p-5" : "p-4 sm:p-5 md:p-6 lg:p-7"}>
        <LandingLeadForm
          serviceLabel={page.serviceLabel}
          formTitle={page.formTitle}
          formSubtitle={page.formSubtitle}
          submitLabel={page.submitLabel}
          formFootnote={page.formFootnote}
          formDetailsPlaceholder={page.formDetailsPlaceholder}
          websiteRequired={page.websiteRequired}
          conversionKind={page.conversionKind}
          landingSlug={page.slug}
          id="lp-form-fields"
          dense={embedded}
          staged={page.stagedHeroForm}
        />
        <LandingTrust logos={page.logos} testimonial={page.testimonial} />
        {embedded && trust.length > 0 ? (
          <ul className="mt-4 flex flex-col gap-2 border-t border-[var(--line)] pt-4 text-xs text-muted">
            {trust.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );

  if (embedded) {
    return (
      <div id="lp-form" aria-label={page.formTitle}>
        {formCard}
      </div>
    );
  }

  return (
    <section
      id="lp-form"
      aria-label={page.formTitle}
      className="chapter chapter--studio relative"
    >
      <div className="shell relative py-24 md:py-32 lg:py-40">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_300px]">
          <Reveal variant="fadeUp">
            {formCard}
          </Reveal>

          <Reveal variant="fadeUp" delay={0.08}>
            <aside className="contact-aside">
              <div>
                <h2 className="contact-aside__title">
                  {page.formAsideTitle ?? "What happens next"}
                </h2>
                {page.formAsideSubtitle ? (
                  <p className="contact-aside__subtitle">
                    {page.formAsideSubtitle}
                  </p>
                ) : null}

                {steps.length > 0 ? (
                  <RevealGroup
                    as="ol"
                    className="contact-aside__steps"
                    stagger={duration.staggerTight}
                    delayChildren={0.06}
                    aria-label={page.formAsideTitle ?? "What happens next"}
                  >
                    {steps.map((step, index) => {
                      const Icon = STEP_ICONS[index] ?? Clock;
                      return (
                        <RevealItem key={step.title} as="li" variant="fadeUp">
                          <div className="contact-aside__step">
                            <span className="icon-well icon-well--sm" aria-hidden>
                              <Icon strokeWidth={1.5} />
                            </span>
                            <div>
                              <p className="contact-aside__step-title">
                                {step.title}
                              </p>
                              <p className="contact-aside__step-desc">
                                {step.detail}
                              </p>
                            </div>
                          </div>
                        </RevealItem>
                      );
                    })}
                  </RevealGroup>
                ) : null}
              </div>

              {trust.length > 0 ? (
                <ul className="contact-aside__trust">
                  {trust.map((label, index) => {
                    const Icon = TRUST_ICONS[index] ?? Shield;
                    return (
                      <li key={label} className="contact-aside__trust-item">
                        <span className="icon-well icon-well--sm" aria-hidden>
                          <Icon strokeWidth={1.5} />
                        </span>
                        {label}
                      </li>
                    );
                  })}
                </ul>
              ) : null}

              <div>
                <p className="section-eyebrow">Email</p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="mt-2 inline-flex text-sm text-foreground transition-opacity hover:opacity-70"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
