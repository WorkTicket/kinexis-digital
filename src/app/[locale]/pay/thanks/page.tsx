import type { Metadata } from "next";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
import { getPlanContent } from "@/content/pay-plans";
import { PAYPAL_PLANS, type PlanKey } from "@/config/paypal-plans";
import { BUSINESS_PHONE_E164 } from "@/config/business-identity";
import { sanitizeSubscriptionId } from "@/lib/paypal-subscriptions";
import { buildPageMetadata } from "@/lib/metadata";
import { SubscriptionConversion } from "@/components/pay/SubscriptionConversion";
import "@/styles/routes/pay.css";

type Props = { params: LocaleParams; searchParams: Promise<{ plan?: string | string[]; sid?: string | string[] }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const c = getPlanContent(locale);
  return buildPageMetadata({ locale, path: "/pay/thanks", title: c.thanks, description: c.next[1], noIndex: true, noFollow: true });
}
export default async function SubscriptionThanks({ params, searchParams }: Props) {
  const locale = await resolveLocale(params);
  const c = getPlanContent(locale);
  const query = await searchParams;
  const sid = sanitizeSubscriptionId(query.sid);
  const plan = typeof query.plan === "string" && Object.hasOwn(PAYPAL_PLANS, query.plan) ? query.plan as PlanKey : null;
  const index = plan ? (["website", "leadSystem", "plus"] as const).indexOf(plan) : -1;
  return <main className="pay-thanks">
    <h1>{c.thanks}</h1><p>{index >= 0 ? c.names[index] : c.unknownPlan}</p>
    <p>{c.sidLabel}: <code>{sid ?? c.sidFallback}</code></p>
    <ol>{c.next.map(step => <li key={step}>{step}</li>)}<li><a href={`sms:${BUSINESS_PHONE_E164}`}>{c.questions} {BUSINESS_PHONE_E164}</a></li></ol>
    {plan && sid && <SubscriptionConversion plan={plan} sid={sid} />}
  </main>;
}
