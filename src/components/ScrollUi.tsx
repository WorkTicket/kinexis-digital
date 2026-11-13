import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { SITE, telHref } from "@/lib/site";

/** Floating CTA. Visibility is driven by boot.js + the no-float chrome class. */
export default function ScrollUi({ locale }: { locale: Locale }) {
  const es = locale !== "en";
  return (
    <div className="float-cta" inert>
      <span className="float-cta__label">
        {es ? <>Vista previa <b>gratis</b></> : <>Free <b>homepage preview</b></>}
      </span>
      <a className="btn btn--ghost float-cta__call" href={telHref(SITE.phone)}>{es ? "Llamar" : "Call"}</a>
      <Link className="btn btn--primary float-cta__preview" href={withLocale(locale, "/contact")} prefetch={false}>
        <span className="float-cta__preview-full">{es ? "Ver mi vista previa gratis" : "Get My Free Preview"}</span>
        <span className="float-cta__preview-short">{es ? "Vista previa" : "Free Preview"}</span>
      </Link>
    </div>
  );
}
