export type Field = { label: string; name: string; kind?: "text" | "email" | "tel" | "url" | "textarea" | "file"; required?: boolean; auto?: string };

export const LEAD_FIELDS: Field[] = [
  { label: "First Name", name: "name", required: true, auto: "given-name" },
  { label: "Email", name: "email", kind: "email", required: true, auto: "email" },
  { label: "Phone", name: "phone", kind: "tel", auto: "tel" },
  { label: "Website / Business Name", name: "business" },
];

export default function Form({ fields, button, note, fast, fastText = "Expect a fast response from us xD" }: { fields: Field[]; button: string; note?: string; fast?: boolean; fastText?: string }) {
  return (
    <form className="form" noValidate data-lead="">
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
      <button className="btn btn--primary btn--lg" type="submit">{button}</button>
      {note && <p className="muted small">{note}</p>}
      {fast && <p className="form__fast"><span className="reply-dot" aria-hidden="true" /> {fastText}</p>}
      <p className="form__msg" role="status"></p>
    </form>
  );
}
