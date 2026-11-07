import Form, { type Field } from "./Form";
import { chromeFor } from "@/i18n/chrome";
import { englishPath, getLocale, getRequestPath } from "@/lib/i18n";

/** Pages that already own a full lead form, checkout, or legal copy. */
const HIDE = new Set([
  "/contact",
  "/pay",
  "/privacy",
  "/terms",
  "/update",
]);

const SLIM_FIELDS_EN: Field[] = [
  { label: "First Name", name: "name", required: true, auto: "given-name" },
  { label: "Email", name: "email", kind: "email", required: true, auto: "email" },
  { label: "Phone", name: "phone", kind: "tel", auto: "tel" },
];

const SLIM_FIELDS_ES: Field[] = [
  { label: "Nombre", name: "name", required: true, auto: "given-name" },
  { label: "Correo", name: "email", kind: "email", required: true, auto: "email" },
  { label: "Teléfono", name: "phone", kind: "tel", auto: "tel" },
];

/** Slim free-preview lead form flush under the header border. */
export default async function PreviewBar() {
  const path = englishPath(await getRequestPath());
  if (HIDE.has(path) || path.startsWith("/pay/")) return null;

  const locale = await getLocale();
  const chrome = chromeFor(locale);
  const fields = locale === "en" ? SLIM_FIELDS_EN : SLIM_FIELDS_ES;

  return (
    <div className="preview-bar" role="region" aria-label={chrome.previewBarTitle}>
      <div className="container preview-bar__inner">
        <p className="preview-bar__label">
          <span className="preview-bar__mark" aria-hidden="true" />
          <span>
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
