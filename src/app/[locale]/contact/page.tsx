import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  Calendar,
  Clock,
  Handshake,
  Mail,
  Map,
  Shield,
} from "lucide-react";
import { ContactIntake } from "@/components/contact/ContactIntake";
import { CallLink } from "@/components/analytics/CallLink";
import { PageHero } from "@/components/page/PageHero";
import JsonLd from "@/components/seo/JsonLd";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CONTACT_EMAIL, getContactContent } from "@/content/contact";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
import { getBusinessTelHref } from "@/lib/business";
import { buildAbsoluteUrl, buildPageMetadata, getSiteUrl } from "@/lib/metadata";
import { duration } from "@/lib/motion";
import {
  breadcrumbSchema,
  localBusinessSchema,
  organizationSchema,
} from "@/lib/schema";

type Props = { params: LocaleParams };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildPageMetadata({
    locale,
    path: "/contact",
    title: "Schedule a Marketing Strategy Call",
    description:
      "Tell us what's broken in your marketing. Book a strategy call. We respond within one business day with clear next steps, not a generic pitch deck.",
  });
}

const STEP_ICONS: LucideIcon[] = [Calendar, Mail, Map];
const TRUST_ICONS: LucideIcon[] = [Clock, Shield, Handshake];

export default async function ContactPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const c = getContactContent(locale);

  const steps = [
    { title: c.step1Title, desc: c.step1Desc },
    { title: c.step2Title, desc: c.step2Desc },
    { title: c.step3Title, desc: c.step3Desc },
  ];

  const trust = [c.trustLabel1, c.trustLabel2, c.trustLabel3];

  return (
    <main className="relative flex flex-1 flex-col">
      <JsonLd
        data={[
          organizationSchema(),
          localBusinessSchema(buildAbsoluteUrl(locale, "/contact")),
          breadcrumbSchema([
            { name: "Home", url: buildAbsoluteUrl(locale, "/") },
            { name: "Contact", url: buildAbsoluteUrl(locale, "/contact") },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": `${getSiteUrl()}/contact#webpage`,
            url: buildAbsoluteUrl(locale, "/contact"),
            name: "Book a Strategy Call",
            description:
              "Contact KINEXIS Digital to book a strategy call or send a project inquiry.",
            isPartOf: { "@id": `${getSiteUrl()}/#website` },
            about: { "@id": `${getSiteUrl()}/#organization` },
          },
        ]}
      />
      <PageHero
        eyebrow={c.heroEyebrow}
        title={c.heroTitleLine}
        signal={c.heroSignal}
        copy={c.heroSubtitle}
        compact
        hideActions
      />

      <section className="chapter chapter--studio relative">
        <div className="shell relative py-24 md:py-32 lg:py-40">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_300px]">
            <Reveal variant="fadeUp">
              <ContactIntake content={c} />
            </Reveal>

            <Reveal variant="fadeUp" delay={0.08}>
              <aside className="contact-aside">
                <div>
                  <h2 className="contact-aside__title">
                    {c.sidebarTitle}
                  </h2>
                  <p className="contact-aside__subtitle">{c.sidebarSubtitle}</p>

                  <RevealGroup
                    as="ol"
                    className="contact-aside__steps"
                    stagger={duration.staggerTight}
                    delayChildren={0.06}
                    aria-label={c.sidebarTitle}
                  >
                    {steps.map((step, index) => {
                      const Icon = STEP_ICONS[index] ?? Calendar;
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
                                {step.desc}
                              </p>
                            </div>
                          </div>
                        </RevealItem>
                      );
                    })}
                  </RevealGroup>
                </div>

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

                <div className="contact-aside__channels">
                  {getBusinessTelHref() ? (
                    <div className="contact-aside__channel">
                      <p className="section-eyebrow">{c.phoneEyebrow}</p>
                      <CallLink className="contact-aside__channel-value" />
                      <p className="contact-aside__channel-hint">{c.phoneHint}</p>
                    </div>
                  ) : null}
                  <div className="contact-aside__channel">
                    <p className="section-eyebrow">{c.emailEyebrow}</p>
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
    </main>
  );
}
