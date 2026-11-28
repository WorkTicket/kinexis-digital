import Form from "./Form";
import { chromeFor } from "@/i18n/chrome";
import type { Locale } from "@/lib/i18n";
import { QUALIFY_SLIM_EN, QUALIFY_SLIM_ES } from "@/lib/lead-qualify-fields";

const PHOTO_EN = {
  label: "Photos (optional)",
  name: "photos",
  kind: "file" as const,
  multiple: true,
  accept: "image/*,.heic,.heif",
};
const PHOTO_ES = {
  label: "Fotos (opcional)",
  name: "photos",
  kind: "file" as const,
  multiple: true,
  accept: "image/*,.heic,.heif",
};

/** Slim free-preview lead form. Only mount on pages that should show it. */
export default function PreviewBar({ locale = "en" }: { locale?: Locale }) {
  const chrome = chromeFor(locale);
  const fields = locale === "en" ? [...QUALIFY_SLIM_EN, PHOTO_EN] : [...QUALIFY_SLIM_ES, PHOTO_ES];

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
