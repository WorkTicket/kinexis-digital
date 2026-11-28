export type QualifyField = {
  label: string;
  name: string;
  kind?: "text" | "email" | "tel" | "url" | "textarea" | "file" | "select";
  required?: boolean;
  auto?: string;
  multiple?: boolean;
  accept?: string;
  options?: { value: string; label: string }[];
};

/** Pre-qualification fields for Prompt 3 — values are enums/short selects, not free PII essays. */
export const TRADE_OPTIONS = [
  { value: "Plumbing", label: "Plumbing" },
  { value: "Landscaping", label: "Landscaping" },
  { value: "Roofing", label: "Roofing" },
  { value: "Tree service", label: "Tree service" },
  { value: "Other trade", label: "Other trade" },
] as const;

export const HAS_WEBSITE_OPTIONS = [
  { value: "yes", label: "Yes — I have a site" },
  { value: "want", label: "I want one" },
  { value: "no", label: "No" },
] as const;

export const START_TIMELINE_OPTIONS = [
  { value: "within_30", label: "Within 30 days" },
  { value: "1_3_months", label: "1–3 months" },
  { value: "exploring", label: "Just exploring" },
] as const;

export const DECISION_MAKER_OPTIONS = [
  { value: "yes", label: "Yes, I decide" },
  { value: "helps", label: "I help decide" },
  { value: "no", label: "No — gathering info" },
] as const;

export const QUALIFY_FIELDS_EN: QualifyField[] = [
  { label: "First Name", name: "name", required: true, auto: "given-name" },
  { label: "Email", name: "email", kind: "email", auto: "email" },
  { label: "Phone", name: "phone", kind: "tel", auto: "tel" },
  { label: "Business Name", name: "business", required: true, auto: "organization" },
  {
    label: "Trade",
    name: "trade",
    kind: "select",
    required: true,
    options: TRADE_OPTIONS.map((o) => ({ value: o.value, label: o.label })),
  },
  { label: "City", name: "city", required: true, auto: "address-level2" },
  { label: "State", name: "state", required: true, auto: "address-level1" },
  {
    label: "Do you have a website now?",
    name: "has_website",
    kind: "select",
    required: true,
    options: HAS_WEBSITE_OPTIONS.map((o) => ({ value: o.value, label: o.label })),
  },
  { label: "Website URL (if yes)", name: "website", kind: "url", auto: "url" },
  {
    label: "How soon do you want to start?",
    name: "start_timeline",
    kind: "select",
    required: true,
    options: START_TIMELINE_OPTIONS.map((o) => ({ value: o.value, label: o.label })),
  },
  {
    label: "Are you the owner or decision-maker?",
    name: "decision_maker",
    kind: "select",
    required: true,
    options: DECISION_MAKER_OPTIONS.map((o) => ({ value: o.value, label: o.label })),
  },
];

export const QUALIFY_FIELDS_ES: QualifyField[] = [
  { label: "Nombre", name: "name", required: true, auto: "given-name" },
  { label: "Correo", name: "email", kind: "email", auto: "email" },
  { label: "Teléfono", name: "phone", kind: "tel", auto: "tel" },
  { label: "Nombre del negocio", name: "business", required: true, auto: "organization" },
  {
    label: "Oficio",
    name: "trade",
    kind: "select",
    required: true,
    options: [
      { value: "Plumbing", label: "Plomería" },
      { value: "Landscaping", label: "Paisajismo" },
      { value: "Roofing", label: "Techos" },
      { value: "Tree service", label: "Servicio de árboles" },
      { value: "Other trade", label: "Otro oficio" },
    ],
  },
  { label: "Ciudad", name: "city", required: true, auto: "address-level2" },
  { label: "Estado", name: "state", required: true, auto: "address-level1" },
  {
    label: "¿Tienes un sitio web ahora?",
    name: "has_website",
    kind: "select",
    required: true,
    options: [
      { value: "yes", label: "Sí — tengo sitio" },
      { value: "want", label: "Quiero uno" },
      { value: "no", label: "No" },
    ],
  },
  { label: "URL del sitio (si aplica)", name: "website", kind: "url", auto: "url" },
  {
    label: "¿Cuándo quieres empezar?",
    name: "start_timeline",
    kind: "select",
    required: true,
    options: [
      { value: "within_30", label: "En 30 días" },
      { value: "1_3_months", label: "1–3 meses" },
      { value: "exploring", label: "Solo explorando" },
    ],
  },
  {
    label: "¿Eres el dueño o decides?",
    name: "decision_maker",
    kind: "select",
    required: true,
    options: [
      { value: "yes", label: "Sí, yo decido" },
      { value: "helps", label: "Ayudo a decidir" },
      { value: "no", label: "No — busco información" },
    ],
  },
];

/** Slim preview bar: same qualify selects, shorter labels. */
export const QUALIFY_SLIM_EN: QualifyField[] = [
  { label: "First Name *", name: "name", required: true, auto: "given-name" },
  { label: "Email (or phone)", name: "email", kind: "email", auto: "email" },
  { label: "Phone (e.g. 307-555-0142)", name: "phone", kind: "tel", auto: "tel" },
  { label: "Business Name *", name: "business", required: true, auto: "organization" },
  {
    label: "Trade *",
    name: "trade",
    kind: "select",
    required: true,
    options: TRADE_OPTIONS.map((o) => ({ value: o.value, label: o.label })),
  },
  { label: "City *", name: "city", required: true, auto: "address-level2" },
  { label: "State *", name: "state", required: true, auto: "address-level1" },
  {
    label: "Website now? *",
    name: "has_website",
    kind: "select",
    required: true,
    options: HAS_WEBSITE_OPTIONS.map((o) => ({ value: o.value, label: o.label })),
  },
  { label: "Website URL (if yes)", name: "website", kind: "url", auto: "url" },
  {
    label: "Start when? *",
    name: "start_timeline",
    kind: "select",
    required: true,
    options: START_TIMELINE_OPTIONS.map((o) => ({ value: o.value, label: o.label })),
  },
  {
    label: "Decision-maker? *",
    name: "decision_maker",
    kind: "select",
    required: true,
    options: DECISION_MAKER_OPTIONS.map((o) => ({ value: o.value, label: o.label })),
  },
];

export const QUALIFY_SLIM_ES: QualifyField[] = [
  { label: "Nombre *", name: "name", required: true, auto: "given-name" },
  { label: "Correo (o teléfono)", name: "email", kind: "email", auto: "email" },
  { label: "Teléfono (ej. 307-555-0142)", name: "phone", kind: "tel", auto: "tel" },
  { label: "Nombre del negocio *", name: "business", required: true, auto: "organization" },
  ...QUALIFY_FIELDS_ES.slice(4),
];
