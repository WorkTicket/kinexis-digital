import Link from "next/link";
import type { ReactNode } from "react";
import { getLocale, spainize, withLocale } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export function OpenDialog({ id, className, children }: { id: "guarantee" | "video"; className?: string; children: ReactNode }) {
  return <button type="button" className={className} data-dialog={id}>{children}</button>;
}

function CloseDialog({ label }: { label: string }) {
  return (
    <button className="dlg__close" type="button" aria-label={label} data-dialog-close="">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true" focusable="false">
        <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}

/** Closed until the boot script opens one. The video frame is added on open so it does not load with the page. */
export default async function DialogHost() {
  const locale = await getLocale();
  const es = locale !== "en";
  const t = (text: string) => (locale === "es-ES" ? spainize(text) : text);
  const close = es ? "Cerrar" : "Close";
  return (
    <>
      <dialog id="dlg-guarantee" className="dlg">
        <CloseDialog label={close} />
        <div className="dlg__sheet">
          <h3>{es ? "Garantía de clientes en 60 días" : "60-Day Lead Guarantee"}</h3>
          {es ? (
            <>
              <p>{t("Si Lead System o Plus produce")} <b>{t("cero clientes rastreados en los primeros 60 días en línea")}</b>, {t("condonamos el")} <b>{t("tercer y cuarto cargo mensual")}</b> {t("y")} <b>{t("se elimina el mínimo")}</b>.</p>
              <p>{t("Un cliente rastreado es una llamada de 30 segundos o más desde el celular, alguien que no contestó y responde al mensaje, o un formulario de cotización real. No cuentan el spam, los números equivocados, los solicitantes de empleo ni los clientes actuales. Una garantía por negocio. Own It no incluye esta garantía.")}</p>
              <p className="dlg__terms"><Link href={withLocale(locale, "/terms")} prefetch={false}>{t("Leer los términos del plan")}</Link></p>
              <Link className="btn btn--primary" href={withLocale(locale, "/pricing")} prefetch={false} data-dialog-close="">{t("Ver los cuatro planes")}</Link>
            </>
          ) : (
            <>
              <p>If Lead System or Plus produces <b>zero tracked leads in your first 60 days live</b>, we waive your <b>3rd and 4th monthly charges</b> and the <b>minimum is dropped</b>.</p>
              <p>A tracked lead is a call of 30+ seconds, a missed caller who replies to the text-back, or a real quote form. Spam, wrong numbers, job applicants and existing customers do not count. One guarantee per business. Own It does not include a lead guarantee.</p>
              <p className="dlg__terms"><Link href="/terms" prefetch={false}>Read the full plan terms</Link></p>
              <Link className="btn btn--primary" href="/pricing" prefetch={false} data-dialog-close="">See the Four Plans</Link>
            </>
          )}
        </div>
      </dialog>
      <dialog id="dlg-video" className="dlg dlg--video" data-video={SITE.videoUrl}>
        <CloseDialog label={close} />
        <div className="video-embed" data-video-slot="">
          {SITE.videoUrl ? null : es
            ? <p>{t("Este video no está disponible ahora.")} <Link href={withLocale(locale, "/contact")} prefetch={false}>{t("Escríbenos")}</Link> {t("y te enviamos el más reciente.")}</p>
            : <p>This video is not available right now. <Link href="/contact" prefetch={false}>Contact us</Link> and we will send the latest one.</p>}
        </div>
      </dialog>
    </>
  );
}
