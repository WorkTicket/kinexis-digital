import type { Metadata } from "next";
import "@/styles/routes/contact.css";
import { CreditCard, Landmark, Receipt } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PayForm } from "@/components/pay/PayForm";
import { PageHero } from "@/components/page/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getPayContent } from "@/content/pay";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
import { buildPageMetadata } from "@/lib/metadata";
import { duration } from "@/lib/motion";

type Props = {
  params: LocaleParams;
  searchParams: Promise<{
    amount?: string;
    description?: string;
    name?: string;
    email?: string;
    company?: string;
  }>;
};

const STEP_ICONS: LucideIcon[] = [Receipt, CreditCard, Landmark];

function clip(value: string | undefined, max: number): string {
  return (value ?? "").replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, max);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const c = getPayContent(locale);
  return buildPageMetadata({
    locale,
    path: "/pay",
    title: c.metaTitle,
    description: c.metaDescription,
    noIndex: true,
    noFollow: true,
  });
}

export default async function PayPage({ params, searchParams }: Props) {
  const locale = await resolveLocale(params);
  const query = await searchParams;
  const c = getPayContent(locale);

  return (
    <main className="relative flex flex-1 flex-col">
      <PageHero
        eyebrow={c.eyebrow}
        title={c.title}
        signal={c.signal}
        copy={c.copy}
        compact
        hideActions
      />

      <section className="chapter chapter--studio relative">
        <div className="shell relative py-24 md:py-32 lg:py-40">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_300px]">
            <Reveal variant="fadeUp">
              <PayForm
                content={c}
                defaults={{
                  amount: clip(query.amount, 12),
                  description: clip(query.description, 140),
                  name: clip(query.name, 120),
                  email: clip(query.email, 200),
                  company: clip(query.company, 120),
                }}
              />
            </Reveal>

            <Reveal variant="fadeUp" delay={0.08}>
              <aside className="contact-aside">
                <div>
                  <h2 className="contact-aside__title">{c.asideTitle}</h2>
                  <p className="contact-aside__subtitle">{c.asideSubtitle}</p>
                  <RevealGroup
                    as="ol"
                    className="contact-aside__steps"
                    stagger={duration.staggerTight}
                    delayChildren={0.06}
                    aria-label={c.asideTitle}
                  >
                    {c.steps.map((step, index) => {
                      const Icon = STEP_ICONS[index] ?? Receipt;
                      return (
                        <RevealItem key={step.title} as="li" variant="fadeUp">
                          <div className="contact-aside__step">
                            <span className="icon-well icon-well--sm" aria-hidden>
                              <Icon strokeWidth={1.5} />
                            </span>
                            <div>
                              <p className="contact-aside__step-title">{step.title}</p>
                              <p className="contact-aside__step-desc">{step.desc}</p>
                            </div>
                          </div>
                        </RevealItem>
                      );
                    })}
                  </RevealGroup>
                </div>
                <ul className="contact-aside__trust">
                  {c.trust.map((label) => (
                    <li key={label} className="contact-aside__trust-item">
                      {label}
                    </li>
                  ))}
                </ul>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
