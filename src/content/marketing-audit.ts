import type { Locale } from "@/i18n/routing";
import { localeContent } from "@/i18n/locale-content";

export type AuditLayer = {
  id: "site" | "search" | "ads" | "handoff";
  title: string;
  body: string;
};

export type AuditStep = {
  title: string;
  detail: string;
};

export type AuditFocusOption = {
  value: string;
  label: string;
};

export type MarketingAuditContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  signal: string;
  copy: string;
  primaryLabel: string;
  layersEyebrow: string;
  layersTitle: string;
  layersDek: string;
  layers: AuditLayer[];
  formTitle: string;
  formSubtitle: string;
  nameLabel: string;
  emailLabel: string;
  companyLabel: string;
  companyOptional: string;
  phoneLabel: string;
  phoneOptional: string;
  websiteLabel: string;
  websitePlaceholder: string;
  focusLabel: string;
  focusPlaceholder: string;
  focusOptions: AuditFocusOption[];
  notesLabel: string;
  notesOptional: string;
  notesPlaceholder: string;
  submitLabel: string;
  submittingLabel: string;
  formFootnote: string;
  errorMessage: string;
  asideTitle: string;
  asideSubtitle: string;
  returns: string[];
  stepsTitle: string;
  steps: AuditStep[];
  trust: string[];
};

const en: MarketingAuditContent = {
  metaTitle: "Free Marketing Audit of Your Site",
  metaDescription:
    "Send your site. We review the pages, search, ads, and how fast a lead gets a person, then write what to fix first. One business day.",
  eyebrow: "Audit",
  title: "Send the site.",
  signal: "We'll read it.",
  copy: "Send the URL. A strategist opens the site on a phone, checks whether search and ads are tied to calls or orders, and looks at how fast a lead gets a person. You get a short written brief: the main leak, what to fix before you spend more, and whether the honest move is a repair or a rebuild. If the site is fine and the follow-up is the problem, the brief says that. One business day. No deck.",
  primaryLabel: "Request the audit",
  layersEyebrow: "What we open",
  layersTitle: "Four places demand usually dies.",
  layersDek:
    "The review stays on the parts that decide whether a visit becomes a call, a form, or an order. A crawl export is a list. This is a read of where demand dies. Most of the time one of these four is doing the damage, and the other three can wait.",
  layers: [
    {
      id: "site",
      title: "The site on a phone",
      body: "Is the offer obvious, and can someone call or buy without hunting? A brochure that hides the next step wastes every channel you add on top.",
    },
    {
      id: "search",
      title: "Search",
      body: "Do you show up for the jobs and products people already pay for, including the map pack? Ranking only for your own name is a different problem.",
    },
    {
      id: "ads",
      title: "Ads, if you run them",
      body: "Is the budget tied to a conversion you can defend, or to clicks that never become work?",
    },
    {
      id: "handoff",
      title: "The handoff",
      body: "When a lead lands, does a person follow up the same day? And can you name which channel produced last month's calls?",
    },
  ],
  formTitle: "Request the audit",
  formSubtitle:
    "The website is required so we can open it. A phone number helps if one detail is missing before we write.",
  nameLabel: "Name",
  emailLabel: "Email",
  companyLabel: "Company",
  companyOptional: "optional",
  phoneLabel: "Phone",
  phoneOptional: "optional",
  websiteLabel: "Website",
  websitePlaceholder: "yoursite.com",
  focusLabel: "What should we open first?",
  focusPlaceholder: "Choose one",
  focusOptions: [
    { value: "site", label: "The site on a phone" },
    { value: "search", label: "Search and the map pack" },
    { value: "ads", label: "Paid ads" },
    { value: "tracking", label: "Tracking and follow-up" },
    { value: "full", label: "The whole demand path" },
  ],
  notesLabel: "Anything we should know",
  notesOptional: "optional",
  notesPlaceholder:
    "Towns you cover, the offer that has to convert, or the number that stopped moving.",
  submitLabel: "Request the audit",
  submittingLabel: "Sending…",
  formFootnote: "No automated sequence. A person reads what you sent.",
  errorMessage: "Something went wrong. Please try again.",
  asideTitle: "What you get back",
  asideSubtitle:
    "A strategist writes it. You can use the brief with us or on your own.",
  returns: [
    "The main leak, named in plain language",
    "What to fix before you spend more",
    "Repair or rebuild, when that is the honest call",
    "Enough detail to act without another call",
  ],
  stepsTitle: "What happens next",
  steps: [
    {
      title: "We open the URL",
      detail: "The site you sent, on a phone, plus the part you asked us to look at.",
    },
    {
      title: "We mark the leak",
      detail: "One primary bottleneck. The rest stays in the notes so it does not bury the point.",
    },
    {
      title: "You get the brief",
      detail: "Written findings within one business day. What to fix first, and why.",
    },
  ],
  trust: ["One business day", "Written by a person", "Useful if you never hire us"],
};

const es: MarketingAuditContent = {
  metaTitle: "Auditoría de marketing de tu web",
  metaDescription:
    "Envía tu sitio. Revisamos las páginas, la búsqueda, los anuncios y qué tan rápido responde una persona. El informe llega en un día hábil.",
  eyebrow: "Auditoría",
  title: "Envía el sitio.",
  signal: "Lo leemos.",
  copy: "Envía la URL. Un estratega abre el sitio en el teléfono, revisa si la búsqueda y los anuncios están atados a llamadas o pedidos, y mira qué tan rápido un lead llega a una persona. Recibes un informe corto: la fuga principal, qué arreglar antes de gastar más, y si lo honesto es reparar o reconstruir. Si el sitio está bien y el problema es el seguimiento, el informe lo dice. Un día hábil. Sin presentación.",
  primaryLabel: "Pedir la auditoría",
  layersEyebrow: "Qué abrimos",
  layersTitle: "Cuatro puntos donde suele morir la demanda.",
  layersDek:
    "La revisión se queda en lo que decide si una visita se vuelve llamada, formulario o pedido. Un export de rastreo es una lista. Esto es una lectura de dónde muere la demanda. Casi siempre uno de estos cuatro está haciendo el daño, y los otros tres pueden esperar.",
  layers: [
    {
      id: "site",
      title: "El sitio en el teléfono",
      body: "¿La oferta es obvia, y se puede llamar o comprar sin buscar? Un folleto que esconde el siguiente paso desperdicia cualquier canal que le pongas encima.",
    },
    {
      id: "search",
      title: "Búsqueda",
      body: "¿Apareces para los trabajos y productos que la gente ya paga, incluido el pack de mapas? Salir solo por tu propio nombre es otro problema.",
    },
    {
      id: "ads",
      title: "Anuncios, si los corres",
      body: "Si están activos, ¿el presupuesto está atado a una conversión que puedes defender, o a clics que nunca se vuelven trabajo?",
    },
    {
      id: "handoff",
      title: "El traspaso",
      body: "Cuando entra un lead, ¿una persona responde el mismo día? ¿Y puedes nombrar qué canal produjo las llamadas del mes pasado?",
    },
  ],
  formTitle: "Pedir la auditoría",
  formSubtitle:
    "El sitio es obligatorio para poder abrirlo. Un teléfono ayuda si falta un detalle antes de escribir.",
  nameLabel: "Nombre",
  emailLabel: "Email",
  companyLabel: "Empresa",
  companyOptional: "opcional",
  phoneLabel: "Teléfono",
  phoneOptional: "opcional",
  websiteLabel: "Sitio web",
  websitePlaceholder: "tusitio.com",
  focusLabel: "¿Qué abrimos primero?",
  focusPlaceholder: "Elige uno",
  focusOptions: [
    { value: "site", label: "El sitio en el teléfono" },
    { value: "search", label: "Búsqueda y el pack de mapas" },
    { value: "ads", label: "Anuncios de pago" },
    { value: "tracking", label: "Medición y seguimiento" },
    { value: "full", label: "Toda la ruta de demanda" },
  ],
  notesLabel: "Algo que debamos saber",
  notesOptional: "opcional",
  notesPlaceholder:
    "Las ciudades que cubres, la oferta que tiene que convertir, o el número que dejó de moverse.",
  submitLabel: "Pedir la auditoría",
  submittingLabel: "Enviando…",
  formFootnote: "Sin secuencia automática. Una persona lee lo que enviaste.",
  errorMessage: "Algo salió mal. Inténtalo de nuevo.",
  asideTitle: "Qué recibes",
  asideSubtitle:
    "Lo escribe un estratega. Puedes usar el informe con nosotros o por tu cuenta.",
  returns: [
    "La fuga principal, dicha en lenguaje claro",
    "Qué arreglar antes de gastar más",
    "Reparar o reconstruir, cuando esa sea la respuesta honesta",
    "Detalle suficiente para actuar sin otra llamada",
  ],
  stepsTitle: "Qué sigue",
  steps: [
    {
      title: "Abrimos la URL",
      detail: "El sitio que enviaste, en un teléfono, más la parte que pediste revisar.",
    },
    {
      title: "Marcamos la fuga",
      detail: "Un cuello de botella principal. El resto queda en las notas para no tapar el punto.",
    },
    {
      title: "Recibes el informe",
      detail: "Hallazgos por escrito en un día hábil. Qué arreglar primero, y por qué.",
    },
  ],
  trust: ["Un día hábil", "Lo escribe una persona", "Sirve aunque no nos contrates"],
};

const byLocale = localeContent({
  en,
  "es-419": es,
});

export function getMarketingAuditContent(locale: Locale): MarketingAuditContent {
  return byLocale[locale] ?? en;
}
