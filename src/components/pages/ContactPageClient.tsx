import { Clock, Shield, Sparkles, Mail } from "lucide-react";
import type { ContactContent } from "@/content/contact";
import Section from "@/components/shared/services/Section";
import ContactIntake from "@/components/pages/ContactIntake";
import { businessProfile } from "@/lib/business";

type Props = { content: ContactContent };

/**
 * Server component — sidebar stays static HTML.
 * Intake (booking + message tabs) ships as a client island.
 */
export default function ContactPageClient({ content: c }: Props) {
  const steps = [
    { title: c.step1Title, desc: c.step1Desc },
    { title: c.step2Title, desc: c.step2Desc },
    { title: c.step3Title, desc: c.step3Desc },
  ];

  const trustBadges = [
    { icon: <Clock className="h-3.5 w-3.5" />, label: c.trustLabel1 },
    { icon: <Shield className="h-3.5 w-3.5" />, label: c.trustLabel2 },
    { icon: <Sparkles className="h-3.5 w-3.5" />, label: c.trustLabel3 },
  ];

  return (
    <Section id="contact-form" surfaceIndex={0} compact>
      <div className="container-site">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_320px]">
          <ContactIntake content={c} />

          <aside className="flex flex-col gap-5 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-surface bg-surface-raised p-5 md:p-6">
              <h2 className="text-base font-semibold text-white">{c.sidebarTitle}</h2>
              <p className="mt-1 text-sm text-text-secondary">{c.sidebarSubtitle}</p>

              <ol className="mt-5 space-y-4">
                {steps.map((step, i) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neon-cyan/10 text-[11px] font-bold text-neon-cyan">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{step.title}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-text-secondary">
                        {step.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border border-surface bg-surface-raised px-5 py-4">
              <ul className="space-y-2.5">
                {trustBadges.map((badge) => (
                  <li key={badge.label} className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-neon-cyan/10 text-neon-cyan">
                      {badge.icon}
                    </span>
                    <span className="text-sm font-medium text-white/80">{badge.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-surface bg-surface-raised px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted">
                Email
              </p>
              <a
                href={`mailto:${businessProfile.email}`}
                className="mt-2 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {businessProfile.email}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </Section>
  );
}
