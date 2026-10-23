import Link from "next/link";
import { PLANS } from "@/lib/content";
import { HL } from "./ui";

/** Portfolio price band. The amount stays tied to the Website plan. */
export default function PricingCta() {
  return (
    <section className="price price--portfolio">
      <div className="container center">
        <p className="eyebrow">A practical starting point</p>
        <h2><HL text="Start With The Website Plan" mark="Website Plan" /></h2>
        <p className="price__num">{PLANS[0].price}<small>/mo</small></p>
        <p>A professional site, reliable hosting, search-ready structure, and a clear path for calls and forms.</p>
        <Link className="btn btn--primary btn--lg" href="/pricing" prefetch={false}>Compare Plans And Features</Link>
      </div>
    </section>
  );
}
