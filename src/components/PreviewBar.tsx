import Form, { type Field } from "./Form";
import { chromeFor } from "@/i18n/chrome";
import type { Locale } from "@/lib/i18n";

const SLIM_FIELDS_EN: Field[] = [
  { label: "First Name *", name: "name", required: true, auto: "given-name" },
  { label: "Email (or phone)", name: "email", kind: "email", auto: "email" },
  { label: "Phone (e.g. 307-555-0142)", name: "phone", kind: "tel", auto: "tel" },
  { label: "Business Name *", name: "business", required: true, auto: "organization" },
  { label: "Trade and city * (e.g. Plumbing in Boise)", name: "trade", required: true },
  {
    label: "Photos (optional)",
    name: "photos",
    kind: "file",
    multiple: true,
    accept: "image/*,.heic,.heif",
  },
];

const SLIM_FIELDS_ES: Field[] = [
  { label: "Nombre *", name: "name", required: true, auto: "given-name" },
  { label: "Correo (o teléfono)", name: "email", kind: "email", auto: "email" },
  { label: "Teléfono (ej. 307-555-0142)", name: "phone", kind: "tel", auto: "tel" },
  { label: "Nombre del negocio *", name: "business", required: true, auto: "organization" },
  { label: "Oficio y ciudad * (ej. Plomería en Boise)", name: "trade", required: true },
  {
    label: "Fotos (opcional)",
    name: "photos",
    kind: "file",
    multiple: true,
    accept: "image/*,.heic,.heif",
  },
];

/** Slim free-preview lead form. Only mount on pages that should show it. */
export default function PreviewBar({ locale = "en" }: { locale?: Locale }) {
  const chrome = chromeFor(locale);
  const fields = locale === "en" ? SLIM_FIELDS_EN : SLIM_FIELDS_ES;

  return (
    <div className="preview-bar" role="region" aria-label={chrome.previewBarTitle}>
      <div className="container preview-bar__inner">
        <p className="preview-bar__label">
          <span className="preview-bar__copy">
            <b>{chrome.previewBarTitle}</b>
            <span className="preview-bar__hint">{chrome.previewBarHint}</span>
          </span>
        </p>
        <Form
          slim
          fields={fields}
          conversion="preview"
          metaForm="home"
          button={chrome.chat}
          buttonClass="btn btn--primary"
          fast
          fastText={chrome.previewBarHint}
        />
      </div>
    </div>
  );
}
