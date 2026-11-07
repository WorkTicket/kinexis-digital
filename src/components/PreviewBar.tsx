import Form, { type Field } from "./Form";
import { chromeFor } from "@/i18n/chrome";
import { englishPath, getLocale, getRequestPath } from "@/lib/i18n";

/** High-intent pages where a slim preview form under the header can close a lead. */
const SHOW = new Set([
  "/",
  "/web-design",
  "/seo-services",
  "/pricing",
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

/** Slim free-preview lead form on the hero / first-section divider (key pages only). */
export default async function PreviewBar() {
  const path = englishPath(await getRequestPath());
  if (!SHOW.has(path)) return null;

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
