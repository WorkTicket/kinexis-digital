import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { spainize, withLocale } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export { OpenDialog } from "./OpenDialog";

function CloseDialog({ label }: { label: string }) {
  return (
    <button className="dlg__close btn btn--ghost" type="button" aria-label={label} data-dialog-close="">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true" focusable="false">
        <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}

/** Closed until the boot script opens one. The video frame is added on open so it does not load with the page. */
export default function DialogHost({ locale }: { locale: Locale }) {
  const es = locale !== "en";
  const t = (text: string) => (locale === "es-ES" ? spainize(text) : text);
  const close = es ? "Cerrar" : "Close";
  return (
    <>
      <dialog id="dlg-guarantee" className="dlg">
        <CloseDialog label={close} />
        <div className="dlg__sheet">
          <h3>{es ? "Garantía de leads rastreados en 60 días" : "60-Day Lead Guarantee"}</h3>
          {es ? (
            <>
              <p>{t("Si Lead System o Plus produce")} <b>{t("cero clientes rastreados en los primeros 60 días en línea")}</b>, {t("condonamos el")} <b>{t("tercer y cuarto cargo mensual")}</b>.</p>
              <p>{t("Un lead rastreado es una llamada de 30 segundos o más, una persona que responde al texto si no contestas, o un formulario real de cotización. No cuentan el spam, los números equivocados, las solicitudes de empleo, los proveedores ni los clientes actuales. La cuenta debe estar al corriente. No aplica si un cambio tuyo impide el seguimiento, ni si pausas o cancelas antes del día 60. Una garantía por negocio. Own It no incluye esta garantía.")}</p>
              <p className="dlg__terms"><Link className="trust-mark" href={withLocale(locale, "/terms")} prefetch={false}>{t("Leer los términos del plan")}</Link></p>
              <Link className="btn btn--primary" href={withLocale(locale, "/pricing")} prefetch={false} data-dialog-close="">{t("Ver los cuatro planes")}</Link>
            </>
          ) : (
            <>
              <p>If Lead System or Plus produces <b>zero tracked leads in your first 60 days live</b>, we waive your <b>3rd and 4th monthly charges</b>.</p>
              <p>A tracked lead is a 30+ second call, a missed caller who replies to the text-back, or a real quote form. Spam, wrong numbers, job applicants, vendors, and existing customers do not count. The account must be in good standing. The guarantee does not apply if your changes make tracking unavailable or you pause/cancel before day 60. One guarantee per business. Own It is excluded.</p>
              <p className="dlg__terms"><Link className="trust-mark" href="/terms" prefetch={false}>Read the full plan terms</Link></p>
              <Link className="btn btn--primary" href="/pricing" prefetch={false} data-dialog-close="">See the Four Plans</Link>
            </>
          )}
        </div>
      </dialog>
      <dialog id="dlg-refund" className="dlg">
        <CloseDialog label={close} />
        <div className="dlg__sheet">
          <h3>{es ? "Garantía de devolución en 30 días" : "30-Day Money-Back Guarantee"}</h3>
          {es ? (
            <>
              <p>{t("Si no quedas satisfecho con tu sitio en los")} <b>{t("primeros 30 días desde el lanzamiento")}</b>, {t("te devolvemos")} <b>{t("tu pago más reciente completo")}</b>.</p>
              <p>{t("Aplica a los planes mensuales y a Own It. Debes pedirlo por escrito por texto, correo o Messenger dentro de esos 30 días. No cubre costos de terceros que ya hayamos pagado (renovación de dominio, fotos de stock, publicidad u otros servicios de terceros).")}</p>
              <p className="dlg__terms"><Link className="trust-mark" href={withLocale(locale, "/terms")} prefetch={false}>{t("Leer los términos del plan")}</Link></p>
              <Link className="btn btn--primary" href={withLocale(locale, "/contact")} prefetch={false} data-dialog-close="">{t("Solicitar mi vista previa gratis")}</Link>
            </>
          ) : (
            <>
              <p>If you are not satisfied with your website within <b>30 days of launch</b>, we refund your <b>most recent payment in full</b>.</p>
              <p>This applies to monthly plans and Own It. Requests must be made in writing by text, email, or Messenger within 30 days of launch. Refunds do not cover third-party costs we have already paid on your behalf, such as domain renewals, paid stock images, or paid advertising.</p>
              <p className="dlg__terms"><Link className="trust-mark" href="/terms" prefetch={false}>Read the full plan terms</Link></p>
              <Link className="btn btn--primary" href="/contact" prefetch={false} data-dialog-close="">Get My Free Preview</Link>
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
