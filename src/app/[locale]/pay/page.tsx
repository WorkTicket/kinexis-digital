import type { Metadata } from "next";
import "@/styles/routes/contact.css";
import { CreditCard, Landmark, Receipt } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PayForm } from "@/components/pay/PayForm";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page/PageHero";
import { PlanCheckout } from "@/components/pay/PlanCheckout";
import { getPlanContent } from "@/content/pay-plans";
import "@/styles/routes/pay.css";
import { getPayContent } from "@/content/pay";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
import { buildPageMetadata } from "@/lib/metadata";

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
  const c = getPlanContent(locale);
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
  const plans = getPlanContent(locale);

  return (
    <main className="pay-page relative flex flex-1 flex-col">
      <PageHero
        eyebrow={plans.eyebrow}
        title={plans.title}
        copy={plans.intro}
        compact
        hideActions
        className="pay-page-hero"
        meta={<div className="pay-hero-meta"><p>{plans.preview} <Link href="/contact">{plans.previewLink}<ArrowUpRight size={14} aria-hidden /></Link> {plans.first}</p><a href="#pay-invoice">{plans.invoiceLink}<ArrowUpRight size={14} aria-hidden /></a></div>}
      />
      <PlanCheckout locale={locale} />

      <section id="pay-invoice" className="pay-invoice chapter chapter--studio relative" aria-labelledby="pay-invoice-heading">
        <div className="shell relative py-16 md:py-24">
          <h2 id="pay-invoice-heading" className="type-section mb-8">{plans.invoice}</h2>
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_300px]">
            <div>
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
            </div>

            <div>
              <aside className="contact-aside">
                <div>
                  <h2 className="contact-aside__title">{c.asideTitle}</h2>
                  <p className="contact-aside__subtitle">{c.asideSubtitle}</p>
                  <ol
                    className="contact-aside__steps"
                    aria-label={c.asideTitle}
                  >
                    {c.steps.map((step, index) => {
                      const Icon = STEP_ICONS[index] ?? Receipt;
                      return (
                        <li key={step.title}>
                          <div className="contact-aside__step">
                            <span className="icon-well icon-well--sm" aria-hidden>
                              <Icon strokeWidth={1.5} />
                            </span>
                            <div>
                              <p className="contact-aside__step-title">{step.title}</p>
                              <p className="contact-aside__step-desc">{step.desc}</p>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
                <ul className="contact-aside__trust">
                  {c.trust.map((label) => (
                    <li key={label} className="contact-aside__trust-item">
                      {label}
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
