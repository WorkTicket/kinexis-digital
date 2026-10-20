"use client";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Link } from "@/i18n/navigation";
import { useFormHoneypot } from "@/hooks/useFormHoneypot";
import { QUICK_FIELDS, LAUNCH_FIELDS, SMS_CONSENT_TEXT, SMS_CONSENT_VERSION, INTAKE_AUTHORIZATION, requiresTradeLicense, type ContractorField } from "@/content/contractor-intake";
import { businessProfile, getBusinessPhoneDisplay, getBusinessTelHref } from "@/lib/business";

type Answers = Record<string, string | string[] | boolean>;
export function ClientIntakeForm() {
  const locale = useLocale();
  const es = locale !== "en";
  const lang = es ? "es" : "en";
  const [answers, setAnswers] = useState<Answers>({});
  const [smsConsent, setSmsConsent] = useState(false);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const lock = useRef(false);
  const { honeypotProps, honeypotPayload } = useFormHoneypot();
  useEffect(() => {
    document.documentElement.classList.add("intake-page");
    setDate(new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()));
    return () => document.documentElement.classList.remove("intake-page");
  }, []);
  const setValue = (id: string, value: string | string[]) => setAnswers(a => ({ ...a, [id]: value }));
  function field(f: ContractorField) {
    const label = es ? f.es : f.en;
    const required = f.required || (f.id === "licenseNumber" && requiresTradeLicense(answers.trade));
    const hint = f.hint?.[es ? 1 : 0];
    const id = `intake-${f.id}`;
    const shared = { id, name: f.id, required, "aria-describedby": hint ? `${id}-hint` : undefined };
    const value = String(answers[f.id] ?? "");
    if (f.type === "radio" || f.type === "checks") {
      return <fieldset className="intake-field" key={f.id}><legend className="intake-label">{label}{required ? " *" : ""}</legend>{hint && <p className="intake-hint" id={`${id}-hint`}>{hint}</p>}<div className="intake-checks">{f.options?.map(([en, translation]) => <label className="intake-check" key={en}><input type={f.type === "radio" ? "radio" : "checkbox"} name={f.id} value={en} required={f.type === "radio" && required} checked={f.type === "radio" ? value === en : Array.isArray(answers[f.id]) && (answers[f.id] as string[]).includes(en)} onChange={() => {
        if (f.type === "radio") setValue(f.id, en);
        else { const previous = Array.isArray(answers[f.id]) ? answers[f.id] as string[] : []; setValue(f.id, previous.includes(en) ? previous.filter(v => v !== en) : [...previous, en]); }
      }} /><span>{es ? translation : en}</span></label>)}</div></fieldset>;
    }
    return <div className="intake-field" key={f.id}><label className="intake-label" htmlFor={id}>{label}{required ? " *" : ""}</label>{hint && <p className="intake-hint" id={`${id}-hint`}>{hint}</p>}{f.type === "select" ? <select {...shared} value={value} onChange={e => setValue(f.id, e.target.value)}><option value="">{es ? "Seleccione" : "Choose one"}</option>{f.options?.map(([en, translation]) => <option key={en} value={en}>{es ? translation : en}</option>)}</select> : f.type === "textarea" ? <textarea {...shared} rows={3} maxLength={4000} value={value} placeholder={f.placeholder?.[es ? 1 : 0]} onChange={e => setValue(f.id, e.target.value)} /> : <input {...shared} type={f.type ?? "text"} maxLength={500} value={value} placeholder={f.placeholder?.[es ? 1 : 0]} onChange={e => setValue(f.id, e.target.value)} />}</div>;
  }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lock.current || !event.currentTarget.reportValidity()) return;
    lock.current = true; setStatus("sending"); setError("");
    try {
      const res = await fetch("/api/intake", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ answers: { ...answers, smsConsent, smsConsentTimestamp: new Date().toISOString(), smsConsentVersion: SMS_CONSENT_VERSION, pageUrl: window.location.href, locale, signatureDate: date }, ...honeypotPayload }) });
      if (!res.ok) throw new Error("intake");
      setStatus("success");
    } catch { setStatus("error"); setError(es ? "No pudimos enviar sus respuestas. Inténtelo de nuevo." : "We couldn't send your answers. Please try again."); }
    finally { lock.current = false; }
  }
  return <div className="intake" lang={es ? "es" : "en"}>
    <header className="intake-hero">
      <div className="intake-wrap intake-hero__inner">
        <div className="intake-hero__topbar">
          <Link href="/" className="intake-hero__brand" aria-label={es ? "Kinexis Digital — inicio" : "Kinexis Digital — home"}>
            <BrandLogo height={32} />
          </Link>
          <LanguageSwitcher compact />
        </div>
        <h1>{es ? "Empecemos: su vista previa gratis" : "Get started: your free homepage preview"}</h1>
        <p className="intake-lede">{es ? "Toma unos 5 minutos. Hacemos su vista previa gratis en 2 días hábiles después de su llamada. Sin tarjeta y sin compromiso. ¿No sabe alguna respuesta? Déjela en blanco y le preguntamos por texto." : "Takes about 5 minutes. We build your free homepage preview within 2 business days of your call. No card, nothing owed to look. Not sure about an answer? Skip it and we'll ask by text."}</p>
      </div>
    </header>
    <div className="intake-wrap intake-body"><p className="intake-note">{es ? "Nunca escriba contraseñas, accesos ni números de tarjeta aquí." : "Never write passwords, logins or card numbers here."}</p>
    {status === "success" ? <p className="intake-success" role="status">{es ? "Recibimos sus respuestas. Nos pondremos en contacto con usted." : "We have your answers. We'll be in touch."}</p> : <form onSubmit={submit}>
      <section className="intake-section"><h2>{es ? "1. Para empezar (para su vista previa gratis)" : "1. Quick start (for your free preview)"}</h2><div className="intake-fields">{QUICK_FIELDS.map(field)}</div>
      {answers.trade === "Roofing" && <p className="intake-note">{es ? "Regla de Texas para techeros: no podemos anunciar que maneja reclamos de seguro por el cliente, ni que quita o paga el deducible. Sí podemos decir que da inspecciones de techo gratis." : "Texas rule for roofers: we can't advertise handling insurance claims for customers, or waiving or paying deductibles. We can say you give free roof inspections."}</p>}
      <p className="intake-hint">{es ? "Envíe su logo y fotos por texto o correo:" : "Text or email your logo and photos:"} <a href={`mailto:${businessProfile.email}`}>{businessProfile.email}</a>{getBusinessTelHref() && <> · <a href={getBusinessTelHref()!}>{getBusinessPhoneDisplay()}</a></>}</p></section>
      <section className="intake-section"><h2>{es ? "2. Antes del lanzamiento (opcional ahora, después de aprobar su vista previa)" : "2. Before launch (optional now, after you approve your preview)"}</h2><div className="intake-fields">{LAUNCH_FIELDS.map(field)}</div></section>
      <section className="intake-section"><h2>{es ? "Consentimiento y firma" : "Consent and signature"}</h2><label className="intake-check"><input type="checkbox" name="smsConsent" checked={smsConsent} onChange={e => setSmsConsent(e.target.checked)} /><span>{SMS_CONSENT_TEXT[lang]} {es ? "Vea la " : "See our "}<Link href="/privacy">{es ? "Política de Privacidad" : "Privacy Policy"}</Link>{es ? " y los " : " and "}<Link href="/terms">{es ? "Términos" : "Terms"}</Link>.</span></label><p className="intake-note">{INTAKE_AUTHORIZATION[lang]}</p>{field({ id: "signature", en: "Type your full name", es: "Escriba su nombre completo", required: true })}<div className="intake-field"><label htmlFor="signature-date">{es ? "Fecha (hora Central)" : "Date (Central time)"}</label><input id="signature-date" name="signatureDate" value={date} readOnly /></div></section>
      {error && <p role="alert" className="intake-error">{error}</p>}<div className="intake-submit"><button type="submit" disabled={status === "sending"}>{status === "sending" ? (es ? "Enviando…" : "Sending…") : es ? "Enviar mis respuestas" : "Send my answers"}</button></div><input type="text" {...honeypotProps} />
    </form>}
    <section className="intake-next"><h2>{es ? "Qué sigue" : "What happens next"}</h2><div className="intake-next__grid">{(es ? [["Hacemos su vista previa gratis", "en 2 días hábiles después de su llamada."], ["Usted la revisa.", "Sin tarjeta y sin compromiso."], ["¿Le gusta? Apruébela", "y su página queda lista en 7 días cuando tengamos su información. Los planes mensuales empiezan el día que se publica."]] : [["We build your free preview", "within 2 business days of your call."], ["You look at it.", "No card, nothing owed."], ["Love it? Approve it", "and your site goes live within 7 days once we have your info. Monthly plans start the day it goes live."]]).map(([title, text], i) => <article className="intake-next__card" key={title}><span className="intake-next__num">{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    </div></div>;
}
