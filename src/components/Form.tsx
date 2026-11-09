export type Field = { label: string; name: string; kind?: "text" | "email" | "tel" | "url" | "textarea" | "file"; required?: boolean; auto?: string };

/**
 * Homepage-preview lead form.
 * Name required; phone or email required (enforced in boot.js + API).
 * Business + trade/city give enough context to draft a homepage.
 */
export const LEAD_FIELDS: Field[] = [
  { label: "First Name", name: "name", required: true, auto: "given-name" },
  { label: "Email", name: "email", kind: "email", auto: "email" },
  { label: "Phone", name: "phone", kind: "tel", auto: "tel" },
  { label: "Business Name", name: "business", required: true, auto: "organization" },
  { label: "Trade and city (e.g. HVAC in Phoenix)", name: "trade", required: true },
  { label: "Current website (optional)", name: "website", auto: "url" },
];

/** Spanish labels for the same homepage-preview lead form. */
export const LEAD_FIELDS_ES: Field[] = [
  { label: "Nombre", name: "name", required: true, auto: "given-name" },
  { label: "Correo", name: "email", kind: "email", auto: "email" },
  { label: "Teléfono", name: "phone", kind: "tel", auto: "tel" },
  { label: "Nombre del negocio", name: "business", required: true, auto: "organization" },
  { label: "Oficio y ciudad (ej. HVAC en Phoenix)", name: "trade", required: true },
  { label: "Sitio web actual (opcional)", name: "website", auto: "url" },
];

export default function Form({
  fields,
  button,
  note,
  fast,
  fastText = "Send it over and we'll get back to you soon.",
  slim = false,
}: {
  fields: Field[];
  button: string;
  note?: string;
  fast?: boolean;
  fastText?: string;
  slim?: boolean;
}) {
  return (
    <form className={slim ? "form form--slim" : "form"} noValidate data-lead="" data-contact-or="">
      {fields.map((f) => f.kind === "file" ? (
        <label className="field field--file" key={f.name}><span>{f.label}</span><input type="file" name={f.name} /></label>
      ) : (
        <label className="field" key={f.name}>
          {f.kind === "textarea"
            ? <textarea name={f.name} rows={4} placeholder=" " required={f.required} />
            : <input type={f.kind ?? "text"} name={f.name} placeholder=" " autoComplete={f.auto} required={f.required} />}
          <span>{f.label}</span>
        </label>
      ))}
      <div hidden>
        <label>
          Leave blank
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button className={`btn btn--primary${slim ? "" : " btn--lg"}`} type="submit">{button}</button>
      {note && <p className="muted small">{note}</p>}
      {fast && <p className="form__fast"><span className="reply-dot" aria-hidden="true" /> {fastText}</p>}
      <p className="form__msg" role="status"></p>
    </form>
  );
}
