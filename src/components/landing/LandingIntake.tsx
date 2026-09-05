import type { LucideIcon } from "lucide-react";
import { Clock, Handshake, Mail, Shield } from "lucide-react";
import { CallLink } from "@/components/analytics/CallLink";
import { LandingCallPath } from "@/components/landing/LandingCallPath";
import { LandingLeadForm } from "@/components/landing/LandingLeadForm";
import { LandingTrust } from "@/components/landing/LandingTrust";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CONTACT_EMAIL } from "@/content/contact";
import type { LandingPageEntry } from "@/content/registry/landing-pages";
import { getBusinessTelHref } from "@/lib/business";
import { duration } from "@/lib/motion";

const STEP_ICONS: LucideIcon[] = [Clock, Mail, Handshake];
const TRUST_ICONS: LucideIcon[] = [Clock, Shield, Handshake];

type Props = {
  page: LandingPageEntry;
  /** Form-only panel for the hero rail. */
  embedded?: boolean;
  /** High-intent paid lander treatment. */
  campaign?: boolean;
  /** Unique field prefix when the form is repeated on the page. */
  formId?: string;
  /** What trust proof to render under the form. */
  trust?: "full" | "logos" | "checks" | "none";
  /** Call button under the form. Default true. */
  showCallPath?: boolean;
};

export function LandingIntake({
  page,
  embedded = false,
  campaign = false,
  formId = "lp-form-fields",
  trust: trustMode = "full",
  showCallPath = true,
}: Props) {
  const steps = page.formSteps ?? [];
  const trust = page.formTrust ?? [];
  const showLogos = trustMode === "full" || trustMode === "logos";
  const showQuote = trustMode === "full";
  const showChecks =
    trust.length > 0 &&
    (trustMode === "full" ||
      trustMode === "checks" ||
      (embedded && trustMode === "logos"));

  const formCard = (
    <div
      className={
        campaign
          ? "lp-campaign-form"
          : page.auditLayout
            ? "lp-audit-form-card"
            : "rounded-2xl bg-[color-mix(in_oklab,var(--foreground)_4%,transparent)]"
      }
    >
      <div
        className={
          page.auditLayout
            ? "lp-audit-form-card__inner"
            : embedded
              ? "p-4 sm:p-5"
              : "p-4 sm:p-5 md:p-6 lg:p-7"
        }
      >
        <LandingLeadForm
          serviceLabel={page.serviceLabel}
          formTitle={page.formTitle}
          formSubtitle={page.formSubtitle}
          submitLabel={page.submitLabel}
          formFootnote={page.formFootnote}
          formCtaHint={page.formCtaHint}
          formCtaDetail={page.formCtaDetail}
          formDetailsPlaceholder={page.formDetailsPlaceholder}
          websiteRequired={page.websiteRequired}
          conversionKind={page.conversionKind}
          landingSlug={page.slug}
          id={formId}
          dense={embedded}
          staged={page.stagedHeroForm}
          qualification={page.auditLayout && !page.essentialsOnly}
          essentialsOnly={page.essentialsOnly}
          phoneRequired={page.phoneRequired}
          businessNameRequired={page.businessNameRequired}
          consentLabel={page.consentLabel}
          needOptions={page.needOptions}
          budgetOptions={page.budgetOptions}
        />
        {showLogos ? (
          <LandingTrust
            logos={page.logos}
            testimonial={showQuote ? page.testimonial : undefined}
          />
        ) : null}
        {showChecks ? (
          <ul className="lp-form-trust mt-4 flex flex-col gap-2 text-xs text-muted">
            {trust.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        ) : null}
        {showCallPath ? (
          <LandingCallPath
            compact={embedded}
            hint={
              page.auditLayout
                ? "Same-day pickup on mobile. Ask for the website consultation."
                : undefined
            }
          />
        ) : null}
      </div>
    </div>
  );

  if (embedded) {
    return (
      <div
        id={formId === "lp-form-fields" ? "lp-form" : undefined}
        aria-label={page.formTitle}
      >
        {formCard}
      </div>
    );
  }

  if (page.auditLayout) {
    return (
      <section
        id="lp-form"
        aria-label={page.formTitle}
        className="lp-audit-form chapter chapter--studio relative"
      >
        <div className="shell chapter-shell--standard relative">
          <Reveal variant="fadeUp">
            <div className="lp-audit-form__panel">{formCard}</div>
          </Reveal>
        </div>
      </section>
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

              <div className="contact-aside__channels">
                {getBusinessTelHref() ? (
                  <div className="contact-aside__channel">
                    <p className="section-eyebrow">Phone</p>
                    <CallLink className="contact-aside__channel-value" />
                    <p className="contact-aside__channel-hint">
                      Same-day pickup on mobile. Ask for the consult.
                    </p>
                  </div>
                ) : null}
                <div className="contact-aside__channel">
                  <p className="section-eyebrow">Email</p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="contact-aside__channel-value"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
