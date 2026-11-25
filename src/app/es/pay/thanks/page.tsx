import Link from "next/link";
import CheckoutTrack from "@/components/CheckoutTrack";
import { contentMetadata } from "@/lib/seo";
import { CHECKOUT_PLANS, money } from "@/lib/pay";
import { isSubscriptionId } from "@/lib/paypal";
import { PageHero } from "@/components/ui";
import { SITE, telHref } from "@/lib/site";

export const metadata = contentMetadata({
  path: "/es/pay/thanks",
  title: "Gracias por tu pago | Kinexis Digital",
  description: "Confirmación de pago de tu plan de sitio Kinexis.",
  absolute: true,
  locale: "es-419",
  index: false,
});

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string | string[]; sid?: string | string[] }>;
}) {
  const query = await searchParams;
  const planKey = typeof query.plan === "string" ? query.plan : "";
  const sid = typeof query.sid === "string" ? query.sid : "";
  const plan = CHECKOUT_PLANS.find((item) => item.key === planKey) ?? null;
  const ok = Boolean(plan && isSubscriptionId(sid));

  return (
    <div className="pay-page" lang="es">
      {ok && plan ? (
        <CheckoutTrack
          name="purchase"
          params={{
            kind: "subscription",
            plan: plan.slug,
            currency: "USD",
            value: plan.price,
          }}
        />
      ) : null}
      <PageHero
        locale="es-419"
        eyebrow="Pago"
        h1={ok ? "Gracias. Tu pago quedó registrado." : "No pudimos confirmar ese pago."}
        mark={ok ? "registrado" : "confirmar"}
        image="pricing"
        imageAlt="Confirmación de pago"
        sub={ok
          ? `${plan!.name} · $${money(plan!.price)}${plan!.monthly ? "/mes" : " una vez"}. Te escribimos con el siguiente paso.`
          : `Si PayPal te cobró, escríbenos al ${SITE.phone} o a ${SITE.email} con el correo de PayPal.`}
      />
      <section className="section">
        <div className="container container--narrow center">
          {ok ? (
            <Link className="btn btn--primary btn--lg" href="/es/contact" prefetch={false}>
              Enviar datos del negocio
            </Link>
          ) : (
            <a className="btn btn--primary btn--lg" href={telHref(SITE.phone)}>
              Llamar o escribir {SITE.phone}
            </a>
          )}
          <p className="muted" style={{ marginTop: "1rem" }}>
            <Link className="trust-mark" href="/es/pay" prefetch={false}>Volver al pago</Link>
            {" · "}
            <Link className="trust-mark" href="/es/pricing" prefetch={false}>Ver planes</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
