type IntakeLocale = "en" | "es";

const COPY = {
  en: {
    thanks: "Thanks — we have your content. We’ll use it for your preview and site build.",
    contact: "Your contact",
    name: "First Name",
    email: "Email",
    phone: "Phone",
    business: "Business details",
    businessName: "Business Name",
    trade: "Trade & city (e.g. Plumbing, Boise)",
    displayPhone: "Phone number to show on the website",
    serviceArea: "Cities / service area",
    serviceAreaHint: "List the cities or counties you serve.",
    services: "Main services to feature",
    servicesHint: "For example: drain cleaning, leak repairs, or water heater installation.",
    hours: "Business hours (optional)",
    website: "Current website (optional)",
    brand: "Brand & direction",
    colors: "Colors you already use (optional)",
    colorsHint: "Hex codes, paint names, or “match our truck.”",
    designNotes: "Sites you like or design notes (optional)",
    designNotesHint: "Portfolio examples or screenshots of sites you like help most.",
    notes: "Anything else we should know? (optional)",
    sending: "What are you sending?",
    sendingLead: "Check what you have ready. Photos of your work help us make the preview specific to your business.",
    checks: [
      { name: "has_logo", label: "Logo file" },
      { name: "has_job_photos", label: "Job / project photos" },
      { name: "has_truck_photos", label: "Truck, van, or shop photos" },
      { name: "has_team_photos", label: "Team or owner photos" },
      { name: "has_docs", label: "License or insurance docs" },
      { name: "use_placeholders", label: "No photos yet — start with placeholders" },
    ],
    uploads: "Uploads",
    uploadsLead: "Images only (JPG, PNG, WebP, HEIC, or HEIF). Up to 4 MB each, 9 files total including your logo.",
    logo: "Logo (optional)",
    photos: "Job, truck, team, or shop photos",
    gotcha: "Leave blank",
    button: "Send My Website Content",
    note: "We use this for your homepage preview and full site build. No card required.",
    fast: "Free preview in 2 business days once we have what we need.",
  },
  es: {
    thanks: "Gracias — ya tenemos tu contenido. Lo usamos para la vista previa y el sitio.",
    contact: "Tu contacto",
    name: "Nombre",
    email: "Correo",
    phone: "Teléfono",
    business: "Datos del negocio",
    businessName: "Nombre del negocio",
    trade: "Oficio y ciudad (ej. Plomería, Boise)",
    displayPhone: "Teléfono para mostrar en el sitio",
    serviceArea: "Ciudades / zona de servicio",
    serviceAreaHint: "Escribe las ciudades o condados donde trabajas.",
    services: "Servicios principales a destacar",
    servicesHint: "Por ejemplo: limpieza de drenajes, reparación de fugas o instalación de calentadores.",
    hours: "Horario (opcional)",
    website: "Sitio web actual (opcional)",
    brand: "Marca y dirección",
    colors: "Colores que ya usas (opcional)",
    colorsHint: "Códigos hex, nombres de pintura o “igual que la camioneta.”",
    designNotes: "Sitios que te gustan o notas de diseño (opcional)",
    designNotesHint: "Ejemplos del portafolio o capturas de sitios que te gusten ayudan más.",
    notes: "¿Algo más que debamos saber? (opcional)",
    sending: "¿Qué vas a enviar?",
    sendingLead: "Marca lo que ya tienes listo. Las fotos de tus trabajos ayudan a que la vista previa refleje tu negocio.",
    checks: [
      { name: "has_logo", label: "Archivo de logo" },
      { name: "has_job_photos", label: "Fotos de trabajos / proyectos" },
      { name: "has_truck_photos", label: "Fotos de camioneta o taller" },
      { name: "has_team_photos", label: "Fotos del equipo o del dueño" },
      { name: "has_docs", label: "Licencia o seguro" },
      { name: "use_placeholders", label: "Aún no tengo fotos; empezar con imágenes de muestra" },
    ],
    uploads: "Archivos",
    uploadsLead: "Solo imágenes (JPG, PNG, WebP, HEIC o HEIF). Hasta 4 MB por archivo y 9 archivos en total, incluido el logo.",
    logo: "Logo (opcional)",
    photos: "Fotos de trabajos, camioneta, equipo o taller",
    gotcha: "Déjalo en blanco",
    button: "Enviar información para mi sitio web",
    note: "Lo usamos para tu vista previa y el sitio completo. Sin tarjeta.",
    fast: "Vista previa gratis en 2 días hábiles cuando tengamos lo necesario.",
  },
} as const;

function StickerCheck({ name, label }: { name: string; label: string }) {
  return (
    <label className="sticker-check">
      <input type="checkbox" name={name} value="yes" />
      <span className="sticker-check__box" aria-hidden="true">
        <svg viewBox="0 0 20 20" focusable="false">
          <path d="m4 10 4 4 8-9" />
        </svg>
      </span>
      <span className="sticker-check__label">{label}</span>
    </label>
  );
}

function Field({
  label,
  name,
  kind = "text",
  required,
  auto,
  hint,
  wide,
}: {
  label: string;
  name: string;
  kind?: "text" | "email" | "tel" | "url" | "textarea";
  required?: boolean;
  auto?: string;
  hint?: string;
  wide?: boolean;
}) {
  return (
    <label className={wide || kind === "textarea" ? "field field--wide" : "field"}>
      {kind === "textarea" ? (
        <textarea name={name} rows={4} placeholder=" " required={required} />
      ) : (
        <input type={kind} name={name} placeholder=" " autoComplete={auto} required={required} />
      )}
      <span>{label}</span>
      {hint ? <em className="intake-hint">{hint}</em> : null}
    </label>
  );
}

/** Client handoff form: business details + logo/photos for the homepage preview build. */
export default function IntakeForm({ locale = "en" }: { locale?: IntakeLocale }) {
  const c = COPY[locale];

  return (
    <form
      className="form intake-form"
      noValidate
      data-lead=""
      data-contact-or=""
      data-meta-form="intake"
      data-thanks={c.thanks}
      data-max-files="9"
      data-max-file-mb="4"
      action="/api/contact"
      method="post"
      encType="multipart/form-data"
      name="website-intake"
      id="website-intake"
    >
      <input type="hidden" name="topic" value="intake" />

      <fieldset className="intake-block">
        <legend>{c.contact}</legend>
        <div className="intake-grid">
          <Field label={c.name} name="name" required auto="given-name" />
          <Field label={c.email} name="email" kind="email" auto="email" />
          <Field label={c.phone} name="phone" kind="tel" auto="tel" />
        </div>
      </fieldset>

      <fieldset className="intake-block">
        <legend>{c.business}</legend>
        <div className="intake-grid">
          <Field label={c.businessName} name="business" required auto="organization" />
          <Field label={c.trade} name="trade" required />
          <Field label={c.displayPhone} name="display_phone" kind="tel" auto="tel" />
          <Field label={c.serviceArea} name="service_area" required wide hint={c.serviceAreaHint} />
          <Field label={c.services} name="services" kind="textarea" required hint={c.servicesHint} />
          <Field label={c.hours} name="hours" />
          <Field label={c.website} name="website" kind="url" auto="url" />
        </div>
      </fieldset>

      <fieldset className="intake-block">
        <legend>{c.brand}</legend>
        <div className="intake-grid">
          <Field label={c.colors} name="colors" hint={c.colorsHint} />
          <Field label={c.designNotes} name="design_notes" kind="textarea" hint={c.designNotesHint} />
          <Field label={c.notes} name="notes" kind="textarea" />
        </div>
      </fieldset>

      <fieldset className="intake-block">
        <legend>{c.sending}</legend>
        <p className="intake-lead muted">{c.sendingLead}</p>
        <div className="sticker-check-grid">
          {c.checks.map((item) => (
            <StickerCheck key={item.name} name={item.name} label={item.label} />
          ))}
        </div>
      </fieldset>

      <fieldset className="intake-block">
        <legend>{c.uploads}</legend>
        <p className="intake-lead muted">{c.uploadsLead}</p>
        <label className="field field--file">
          <span>{c.logo}</span>
          <input type="file" name="logo" accept="image/*,.heic,.heif" />
        </label>
        <label className="field field--file">
          <span>{c.photos}</span>
          <input type="file" name="photos" accept="image/*,.heic,.heif" multiple />
        </label>
      </fieldset>

      <div hidden>
        <label>
          {c.gotcha}
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button className="btn btn--primary btn--lg" type="submit">
        {c.button}
      </button>
      <p className="muted small">{c.note}</p>
      <p className="form__fast">
        <span className="reply-dot" aria-hidden="true" /> {c.fast}
      </p>
      <p className="form__msg" role="status"></p>
    </form>
  );
}
