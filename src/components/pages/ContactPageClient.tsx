import { Clock, Shield, Sparkles, Mail } from "lucide-react";
import Card from "@/components/ui/Card";
import type { ContactContent } from "@/content/contact";
import Section from "@/components/shared/services/Section";
import ContactForm from "@/components/pages/ContactForm";

type Props = { content: ContactContent };

/**
 * Server component — the static sidebar renders as HTML with zero hydration.
 * Only <ContactForm> ships client JS, which keeps the page's TBT low.
 */
export default function ContactPageClient({ content: c }: Props) {
  const steps = [
    { title: c.step1Title, desc: c.step1Desc, icon: <Clock className="h-5 w-5" /> },
    { title: c.step2Title, desc: c.step2Desc, icon: <Mail className="h-5 w-5" /> },
    { title: c.step3Title, desc: c.step3Desc, icon: <Sparkles className="h-5 w-5" /> },
  ];

  const trustBadges = [
    { icon: <Clock className="h-4 w-4" />, label: c.trustLabel1 },
    { icon: <Shield className="h-4 w-4" />, label: c.trustLabel2 },
    { icon: <Sparkles className="h-4 w-4" />, label: c.trustLabel3 },
  ];

  return (
    <Section id="contact-form" surfaceIndex={0}>
      <div className="container-site">
        <div className="grid gap-10 lg:gap-14 xl:gap-16 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px]">
          <div>
            <ContactForm content={c} />
          </div>

          <div className="flex flex-col gap-6">
            <Card hover={false} className="!p-8">
              <h2 className="type-subheader text-white">{c.sidebarTitle}</h2>
              <p className="mt-2 text-sm text-text-secondary">{c.sidebarSubtitle}</p>

              <ol className="mt-8 space-y-7">
                {steps.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="relative flex flex-col items-center">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-neon-cyan/20 to-accent/10 ring-1 ring-white/[0.08] text-neon-cyan">
                        {step.icon}
                      </div>
                      {i < steps.length - 1 && (
                        <div className="mt-2 h-full w-px bg-gradient-to-b from-white/[0.08] to-transparent" />
                      )}
                    </div>
                    <div className="pb-2 pt-1">
                      <p className="text-sm font-semibold text-white">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-text-secondary">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>

            <Card hover={false} className="!p-6">
              <div className="flex flex-col gap-3">
                {trustBadges.map((badge, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neon-cyan/10 text-neon-cyan">
                      {badge.icon}
                    </div>
                    <span className="text-sm font-medium text-white/80">{badge.label}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card hover={false} className="!p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                Or reach us directly
              </p>
              <a
                href="mailto:hello@kinexisdigital.com"
                className="mt-3 flex items-center gap-3 group"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-subtle bg-surface-glass text-text-muted group-hover:text-neon-cyan group-hover:border-neon-cyan/30 transition-colors duration-300">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-sm text-text-secondary group-hover:text-white transition-colors duration-300">
                  hello@kinexisdigital.com
                </span>
              </a>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
}
