import type { MetaLeadForm } from "@/lib/meta-capi";

export type Field = {
  label: string;
  name: string;
  kind?: "text" | "email" | "tel" | "url" | "textarea" | "file";
  required?: boolean;
  auto?: string;
  multiple?: boolean;
  accept?: string;
};

/**
 * Homepage-preview lead form.
 * Name required; phone or email required (enforced in boot.js + API).
 * Business + business-type/city give enough context to draft a homepage.
 */
export const LEAD_FIELDS: Field[] = [
  { label: "First Name", name: "name", required: true, auto: "given-name" },
  { label: "Email", name: "email", kind: "email", auto: "email" },
  { label: "Phone", name: "phone", kind: "tel", auto: "tel" },
  { label: "Business Name", name: "business", required: true, auto: "organization" },
  { label: "Business type and city (e.g. HVAC in Phoenix)", name: "trade", required: true },
  { label: "Current website (optional)", name: "website", auto: "url" },
];

/** Spanish labels for the same homepage-preview lead form. */
export const LEAD_FIELDS_ES: Field[] = [
  { label: "Nombre", name: "name", required: true, auto: "given-name" },
  { label: "Correo", name: "email", kind: "email", auto: "email" },
  { label: "Teléfono", name: "phone", kind: "tel", auto: "tel" },
  { label: "Nombre del negocio", name: "business", required: true, auto: "organization" },
  { label: "Tipo de negocio y ciudad (ej. HVAC en Phoenix)", name: "trade", required: true },
  { label: "Sitio web actual (opcional)", name: "website", auto: "url" },
];

export default function Form({
  fields,
  button,
  note,
  fast,
  fastText = "Send it over and we'll get back to you soon.",
  slim = false,
  /** Slim preview bar uses ghost so it doesn’t compete with nav/hero primaries. */
  buttonClass,
  hiddenFields,
  conversion,
  metaForm,
  contactInquiry,
  locale,
}: {
  fields: Field[];
  button: string;
  note?: React.ReactNode;
  fast?: boolean;
  fastText?: string;
  slim?: boolean;
  buttonClass?: string;
  hiddenFields?: Record<string, string>;
  conversion?: "preview" | "audit";
  metaForm?: MetaLeadForm;
  locale?: "en" | "es";
  contactInquiry?: {
    locale: "en" | "es";
    followupHref: string;
  };
}) {
  const submitClass = buttonClass
    ?? (slim ? "btn btn--ghost" : "btn btn--primary btn--lg");
  const inquiryCopy = contactInquiry?.locale === "es" ? {
    prompt: "¿Sobre qué nos contactas? Elige todas las opciones que quieras.",
    options: [
      ["free-preview", "Quiero una vista previa gratis de mi página"],
      ["plans", "Planes o precios"],
      ["website-help", "Ayuda con un sitio que ya tengo"],
      ["other", "Otra consulta"],
    ],
    previewTitle: "Unos detalles más para preparar tu vista previa",
    previewLead: "Para crear una vista previa que se sienta como tu negocio, necesitamos tus servicios, zona de trabajo y recursos visuales. Sube tu logo y fotos de trabajos, o autoriza el uso de recursos de reemplazo si aún no los tienes.",
    serviceArea: "Ciudades o zonas donde trabajas",
    services: "Servicios principales que quieres destacar",
    servicesHint: "Por ejemplo, los 3–6 trabajos que más quieres recibir.",
    notes: "¿Qué deberían saber tus clientes? (opcional)",
    message: "Mensaje (opcional)",
    uploadsTitle: "Recursos para la vista previa",
    uploadsLead: "Sube tu logo y fotos del antes y después o del trabajo terminado. Hasta 5 imágenes (JPG, PNG, WebP, GIF o HEIC), 4 MB cada una.",
    logo: "Logo",
    photos: "Fotos de trabajos",
    assetFallback: "No tengo estos recursos. Kinexis proporcionará un logo de texto sencillo y fotos de stock relevantes para los recursos que falten en el diseño de vista previa.",
    assetError: "Sube un logo y fotos de trabajos, o autoriza recursos de reemplazo para lo que falte.",
    chooseOne: "Elige al menos una opción para saber cómo ayudarte.",
    defaultButton: "Enviar mi consulta",
    previewButton: "Solicitar mi vista previa gratis",
    thanks: "Gracias — recibimos tu consulta.",
    previewThanks: "Gracias — recibimos tu solicitud de vista previa. Si puedes, añade tu logo y fotos para que se parezca más a tu negocio.",
    followupLabel: "Añadir detalles y fotos",
  } : {
    prompt: "What are you contacting us about? Select all that apply.",
    options: [
      ["free-preview", "I’d like a free homepage preview"],
      ["plans", "Website plans or pricing"],
      ["website-help", "Help with a website I already have"],
      ["other", "Something else"],
    ],
    previewTitle: "A few more details for your homepage preview",
    previewLead: "To make a preview feel like your business, we need your services, service area, and visual assets. Upload your logo and job photos, or allow replacement assets if you don’t have them yet.",
    serviceArea: "Cities or areas you serve",
    services: "Main services you want featured",
    servicesHint: "For example, the 3–6 jobs you most want to book.",
    notes: "What should customers know about your business? (optional)",
    message: "Message (optional)",
    uploadsTitle: "Assets for your preview",
    uploadsLead: "Upload your logo and before-and-after or finished-job photos. Up to 5 images (JPG, PNG, WebP, GIF, or HEIC), 4 MB each.",
    logo: "Logo",
    photos: "Job photos",
    assetFallback: "I don’t have these ready. Kinexis will provide a simple text-based logo and relevant stock photos for anything missing in the preview design.",
    assetError: "Upload a logo and job photos, or allow replacement assets for anything missing.",
    chooseOne: "Choose at least one option so we know how to help.",
    defaultButton: "Send My Message",
    previewButton: "Request My Free Homepage Preview",
    thanks: "Thanks — your message is on its way.",
    previewThanks: "Thanks — we received your preview request. If you can, add your logo and photos to make the preview feel more like your business.",
    followupLabel: "Add details and photos",
  };
  return (
    <form
      className={slim ? "form form--slim" : "form"}
      noValidate
      data-lead=""
      data-contact-or=""
      data-conversion={conversion}
      data-meta-form={metaForm}
      data-contact-inquiry={contactInquiry ? "" : undefined}
      data-preview-href={contactInquiry?.followupHref}
      data-thanks={contactInquiry ? inquiryCopy.thanks : undefined}
      data-preview-thanks={contactInquiry ? inquiryCopy.previewThanks : undefined}
      data-inquiry-error-copy={contactInquiry ? inquiryCopy.chooseOne : undefined}
      data-followup-label={contactInquiry ? inquiryCopy.followupLabel : undefined}
      data-preview-asset-error-copy={contactInquiry ? inquiryCopy.assetError : undefined}
      data-max-files={contactInquiry ? 5 : undefined}
      data-max-file-mb={contactInquiry ? 4 : undefined}
      action="/api/contact"
      method="post"
      encType="multipart/form-data"
    >
      {contactInquiry ? (
        <>
          <fieldset className="intake-block contact-inquiry__choices" aria-describedby="contact-inquiry-error">
            <legend>{inquiryCopy.prompt}</legend>
            <div className="sticker-check-grid">
              {inquiryCopy.options.map(([value, label]) => (
                <label className="sticker-check" key={value}>
                  <input type="checkbox" name="inquiry" value={value} />
                  <span className="sticker-check__box" aria-hidden="true">
                    <svg viewBox="0 0 20 20" focusable="false">
                      <path d="m4 10 4 4 8-9" />
                    </svg>
                  </span>
                  <span className="sticker-check__label">{label}</span>
                </label>
              ))}
            </div>
            <p className="contact-inquiry__error" id="contact-inquiry-error" data-inquiry-error="" role="status" aria-live="polite" />
          </fieldset>
          <fieldset className="intake-block contact-preview-details" data-preview-details="" hidden aria-describedby="contact-preview-help contact-preview-asset-error">
            <legend>{inquiryCopy.previewTitle}</legend>
            <p className="muted small contact-preview-details__lead" id="contact-preview-help">{inquiryCopy.previewLead}</p>
            <label className="field field--wide">
              <input type="text" name="service_area" placeholder=" " data-preview-required="" />
              <span>{inquiryCopy.serviceArea}</span>
            </label>
            <label className="field field--wide">
              <textarea name="services" rows={3} placeholder=" " data-preview-required="" />
              <span>{inquiryCopy.services}</span>
              <em className="intake-hint">{inquiryCopy.servicesHint}</em>
            </label>
            <label className="field field--wide">
              <textarea name="preview_notes" rows={3} placeholder=" " />
              <span>{inquiryCopy.notes}</span>
            </label>
            <div className="contact-preview-uploads">
              <div className="contact-preview-uploads__copy">
                <h3>{inquiryCopy.uploadsTitle}</h3>
                <p className="muted small">{inquiryCopy.uploadsLead}</p>
              </div>
              <div className="contact-preview-uploads__grid">
                <label className="field field--file">
                  <span>{inquiryCopy.logo}</span>
                  <input
                    type="file"
                    name="logo"
                    accept="image/jpeg,image/png,image/webp,image/gif,image/heic,image/heif,.jpg,.jpeg,.png,.webp,.gif,.heic,.heif"
                    data-preview-upload=""
                    aria-describedby="contact-preview-upload-help"
                  />
                </label>
                <label className="field field--file">
                  <span>{inquiryCopy.photos}</span>
                  <input
                    type="file"
                    name="photos"
                    accept="image/jpeg,image/png,image/webp,image/gif,image/heic,image/heif,.jpg,.jpeg,.png,.webp,.gif,.heic,.heif"
                    multiple
                    data-preview-upload=""
                    aria-describedby="contact-preview-upload-help"
                  />
                </label>
              </div>
              <span id="contact-preview-upload-help" className="sr-only">{inquiryCopy.uploadsLead}</span>
            </div>
            <label className="sticker-check contact-preview-asset-consent">
              <input type="checkbox" name="preview_asset_fallback" value={inquiryCopy.assetFallback} data-preview-asset-consent="" aria-describedby="contact-preview-upload-help contact-preview-asset-error" />
              <span className="sticker-check__box" aria-hidden="true">
                <svg viewBox="0 0 20 20" focusable="false">
                  <path d="m4 10 4 4 8-9" />
                </svg>
              </span>
              <span className="sticker-check__label">{inquiryCopy.assetFallback}</span>
            </label>
            <p className="contact-preview-asset-error" id="contact-preview-asset-error" data-preview-asset-error="" role="status" aria-live="polite" />
          </fieldset>
        </>
      ) : null}
      {fields.map((f) => f.kind === "file" ? (
        <label className="field field--file" key={f.name}>
          <span>{f.label}</span>
          <input
            type="file"
            name={f.name}
            accept={f.accept}
            multiple={f.multiple}
          />
        </label>
      ) : (
        <label className="field" key={f.name}>
          {f.kind === "textarea"
            ? <textarea name={f.name} rows={4} placeholder=" " required={f.required} />
            : <input type={f.kind ?? "text"} name={f.name} placeholder=" " autoComplete={f.auto} required={f.required} />}
          <span>{contactInquiry && f.name === "trade"
            ? (contactInquiry.locale === "es" ? "Tipo de negocio y ciudad" : "Business type and city")
            : contactInquiry?.locale === "es" && f.name === "website"
              ? "Sitio web (opcional)"
              : f.label}</span>
        </label>
      ))}
      {contactInquiry ? (
        <label className="field field--wide">
          <textarea name="message" rows={3} placeholder=" " />
          <span>{inquiryCopy.message}</span>
        </label>
      ) : null}
      <div hidden>
        <label>
          {locale === "es" || contactInquiry?.locale === "es" ? "Déjalo en blanco" : "Leave blank"}
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
        {hiddenFields
          ? Object.entries(hiddenFields).map(([name, value]) => (
              <input key={name} type="hidden" name={name} value={value} />
            ))
          : null}
      </div>
      <button
        className={submitClass}
        type="submit"
        data-default-button={contactInquiry ? inquiryCopy.defaultButton : undefined}
        data-preview-button={contactInquiry ? inquiryCopy.previewButton : undefined}
      >
        {contactInquiry ? inquiryCopy.defaultButton : button}
      </button>
      {note && <p className="muted small">{note}</p>}
      {fast && <p className="form__fast"><span className="reply-dot" aria-hidden="true" /> {fastText}</p>}
      <p className="form__msg" role="status"></p>
    </form>
  );
}
