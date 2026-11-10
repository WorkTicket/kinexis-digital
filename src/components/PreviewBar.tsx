import Form, { type Field } from "./Form";
import { chromeFor } from "@/i18n/chrome";
import type { Locale } from "@/lib/i18n";

const SLIM_FIELDS_EN: Field[] = [
  { label: "First Name", name: "name", required: true, auto: "given-name" },
  { label: "Email", name: "email", kind: "email", auto: "email" },
  { label: "Phone", name: "phone", kind: "tel", auto: "tel" },
];

const SLIM_FIELDS_ES: Field[] = [
  { label: "Nombre", name: "name", required: true, auto: "given-name" },
  { label: "Correo", name: "email", kind: "email", auto: "email" },
  { label: "Teléfono", name: "phone", kind: "tel", auto: "tel" },
];

/** Slim free-preview lead form. Only mount on pages that should show it. */
export default function PreviewBar({ locale = "en" }: { locale?: Locale }) {
  const chrome = chromeFor(locale);
  const fields = locale === "en" ? SLIM_FIELDS_EN : SLIM_FIELDS_ES;

  return (
    <div className="preview-bar" role="region" aria-label={chrome.previewBarTitle}>
      <div className="container preview-bar__inner">
        <p className="preview-bar__label">
          <span className="preview-bar__mark" aria-hidden="true" />
          <span className="preview-bar__copy">
            <b>{chrome.previewBarTitle}</b>
            <span className="preview-bar__hint">{chrome.previewBarHint}</span>
          </span>
        </p>
        <Form
          slim
          fields={fields}
          button={chrome.chat}
          fast
          fastText={chrome.previewBarHint}
        />
      </div>
    </div>
  );
}
