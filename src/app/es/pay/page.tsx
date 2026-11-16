import dynamic from "next/dynamic";
import Link from "next/link";
import { redirect } from "next/navigation";
import { contentMetadata } from "@/lib/seo";
import { checkoutPlanFromQuery } from "@/lib/pay";
import { ContentSchema } from "@/components/JsonLd";
import { Faq, PageHero } from "@/components/ui";
import { ES_CHECKOUT_UI, ES_PAY_FAQS } from "@/i18n/spanish-plan-compare";

const PayCheckout = dynamic(() => import("@/components/PayCheckout"));

export const metadata = contentMetadata({
  path: "/es/pay",
  title: "Paga tu plan de sitio web | Kinexis Digital",
  description: "Elige Website, Lead System, Plus u Own It y paga de forma segura con PayPal. Precios en USD: $97, $197, $297 o $1,497.",
  absolute: true,
  locale: "es-419",
});

function PaymentIcon({ kind }: { kind: "plan" | "receipt" | "card" }) {
  return (
    <svg className="pay-step-icon" viewBox="0 0 40 40" fill="none" stroke="#031b4e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="6" y="6" width="31" height="31" rx="10" fill="#031b4e" stroke="none" />
      <rect x="2" y="2" width="31" height="31" rx="10" fill="#ff6a00" />
      {kind === "plan" && <><rect x="9" y="9" width="17" height="17" rx="3" fill="#fff" /><path d="M13 14h8m-8 5 3 3 6-7" /></>}
      {kind === "receipt" && <><path d="M10 8h15v19l-4-2-3 2-4-2-4 2Z" fill="#fff" /><path d="M14 13h7m-7 5h7m-7 4h3" /></>}
      {kind === "card" && <><rect x="7" y="11" width="21" height="15" rx="3" fill="#fff" /><path d="M8 16h19M12 22h4" /><path d="m23 6 2-3m5 7 3-1" /></>}
    </svg>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string | string[] }>;
}) {
  const query = await searchParams;
  const requestedPlan = typeof query.plan === "string" ? query.plan : null;
  const { plan: initialPlan, found } = checkoutPlanFromQuery(requestedPlan);
  if (requestedPlan && !found) redirect("/es/pricing");
  const ui = ES_CHECKOUT_UI;

  return (
    <div className="pay-page" lang="es">
      <ContentSchema
        path="/es/pay"
        title="Paga tu plan de sitio web | Kinexis Digital"
        description="Elige Website, Lead System, Plus u Own It y paga de forma segura con PayPal."
        crumbs={[{ name: "Inicio", path: "/es" }, { name: "Pago", path: "/es/pay" }]}
        faqs={[...ES_PAY_FAQS]}
        inLanguage="es-419"
      />
      <PageHero
        locale="es-419"
        className="pay-hero"
        eyebrow={ui.heroEyebrow}
        h1={ui.heroH1}
        mark={ui.heroMark}
        image="pricing"
        imageAlt="Tarjeta de pago y palomas en colores Kinexis"
        sub={ui.heroSub}
      >
        <p className="pay-hero-links">
          {ui.heroPreview}{" "}
          <Link className="trust-mark" href="/es/contact" prefetch={false}>{ui.heroPreviewCta}</Link>{" "}
          primero.{" "}
          <Link className="pay-hero-links__invoice trust-mark" href="/pay#invoice" hrefLang="en-US" prefetch={false}>
            {ui.heroInvoice}
          </Link>
        </p>
      </PageHero>

      <section className="section pay-pick">
        <div className="container">
          <div className="pay-route" role="group" aria-label="Proceso de pago">
            <span><PaymentIcon kind="plan" /> {ui.routePlan}</span>
            <span><PaymentIcon kind="receipt" /> {ui.routeTotal}</span>
            <span><PaymentIcon kind="card" /> {ui.routePaypal}</span>
          </div>
          <PayCheckout key={initialPlan.key} initialPlan={initialPlan.key} locale="es" />

          <div className="pay-after">
            <div className="pay-after__head">
              <div>
                <p className="eyebrow">{ui.beforePayEyebrow}</p>
                <h2>{ui.beforePayH1}</h2>
                <p className="muted">{ui.beforePaySub}</p>
              </div>
              <Link className="pay-jump trust-mark" href="/pay#invoice" hrefLang="en-US" prefetch={false}>
                {ui.jumpInvoice}
              </Link>
            </div>
            <div className="pay-after__faqs">
              <Faq items={[...ES_PAY_FAQS]} openFirst={false} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
