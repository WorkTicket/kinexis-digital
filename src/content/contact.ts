import type { Locale } from "@/i18n/routing";

export type ContactBookingContent = {
  title: string;
  subtitle: string;
  timezoneNote: string;
  timeLabel: string;
  pickDateHint: string;
  noSlots: string;
  notesLabel: string;
  notesPlaceholder: string;
  submitButton: string;
  submittingButton: string;
  successTitle: string;
  successSubtitle: string;
  /** Brief flash shown before redirecting to /thank-you. */
  confirmFlash: string;
  errorMessage: string;
  selectSlotError: string;
  footnote: string;
  prevMonth: string;
  nextMonth: string;
  orDivider: string;
  tabLabel: string;
  messageTabLabel: string;
};

export type ContactContent = {
  heroTitle: string;
  heroTitleLine: string;
  heroSignal: string;
  heroEyebrow: string;
  emailEyebrow: string;
  optionsAria: string;
  heroSubtitle: string;
  formTitle: string;
  formSubtitle: string;
  successTitle: string;
  successSubtitle: string;
  /** Brief flash shown before redirecting to /thank-you. */
  confirmFlash: string;
  errorMessage: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  companyLabel: string;
  companyPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  serviceLabel: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitButton: string;
  submittingButton: string;
  sidebarTitle: string;
  sidebarSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  trustLabel1: string;
  trustLabel2: string;
  trustLabel3: string;
  servicePlaceholder: string;
  serviceOptions: string[];
  formFootnote: string;
  booking: ContactBookingContent;
};

export const contactContentI18n: Record<Locale, ContactContent> = {
  en: {
    heroTitle: "Let's talk.",
    heroTitleLine: "Let's",
    heroSignal: "talk.",
    heroEyebrow: "Contact",
    emailEyebrow: "Email",
    optionsAria: "Contact options",
    heroSubtitle:
      "Book a call or send a short message. You'll hear back within one business day with a straight read on fit and next steps.",
    formTitle: "Send a message",
    formSubtitle:
      "Share the challenge, the goal, and the timeline. We'll reply with a clear take, not a generic pitch.",
    successTitle: "Got it. We'll be in touch.",
    successSubtitle:
      "We received your message and will reach out within one business day. Check your inbox.",
    confirmFlash: "Message sent",
    errorMessage: "Something went wrong. Please try again or email us directly.",
    nameLabel: "Full Name",
    namePlaceholder: "Your name",
    emailLabel: "Email Address",
    emailPlaceholder: "you@company.com",
    companyLabel: "Company",
    companyPlaceholder: "Your company (optional)",
    phoneLabel: "Phone Number",
    phonePlaceholder: "+1 (555) 000-0000 (optional)",
    serviceLabel: "What are you looking for?",
    messageLabel: "Comments",
    messagePlaceholder:
      "What's the biggest leak in your marketing right now? What does a good next 12 months look like?",
    submitButton: "Send Message",
    submittingButton: "Sending…",
    sidebarTitle: "What happens next",
    sidebarSubtitle: "Simple process. Fast reply. No pressure to buy on the call.",
    step1Title: "You book or write us",
    step1Desc:
      "Pick a call time above, or send a short message. A strategist reviews it personally.",
    step2Title: "We confirm within a day",
    step2Desc:
      "You'll get a confirmation and, if needed, a quick reply before we meet.",
    step3Title: "Clear next steps",
    step3Desc:
      "On the call we map what's broken, what to fix first, and whether we're the right fit.",
    trustLabel1: "< 24hr response",
    trustLabel2: "No lock-in contracts",
    trustLabel3: "Free initial consultation",
    servicePlaceholder: "Select a service…",
    serviceOptions: [
      "Web Design & Development",
      "Search Engine Optimization (SEO)",
      "Paid Ads (Google / Meta)",
      "Social Media Marketing",
      "Branding & Identity",
      "Email Marketing",
      "Content Marketing",
      "Growth Consulting",
      "Other / Not Sure Yet",
    ],
    formFootnote: "No long-term contracts. Month to month. We'll never share your details.",
    booking: {
      title: "Book a strategy call",
      subtitle:
        "30 minutes. Weekdays. We review what's leaking, what to fix first, and if we're the right partner.",
      timezoneNote: "24-hour minimum notice",
      timeLabel: "Times",
      pickDateHint: "Choose a date to see open times.",
      noSlots: "No open times this day. Try another date.",
      notesLabel: "Notes (optional)",
      notesPlaceholder: "Biggest challenge right now…",
      submitButton: "Book strategy call",
      submittingButton: "Booking…",
      successTitle: "You're booked.",
      successSubtitle: "We got your request and will confirm shortly. Check your inbox.",
      confirmFlash: "Call booked",
      errorMessage: "Something went wrong. Please try again or email us directly.",
      selectSlotError: "Choose a date and time to continue.",
      footnote: "Confirmation by email. No payment to book.",
      prevMonth: "Previous month",
      nextMonth: "Next month",
      orDivider: "Or send a message instead",
      tabLabel: "Book a call",
      messageTabLabel: "Send a message",
    },
  },
  es: {
    heroTitle: "Hablemos.",
    heroTitleLine: "Hablemos",
    heroSignal: "ya.",
    heroEyebrow: "Contacto",
    emailEyebrow: "Correo",
    optionsAria: "Opciones de contacto",
    heroSubtitle:
      "Reserva una llamada o envía un mensaje corto. Te respondemos en un día laborable con una lectura clara de encaje y próximos pasos.",
    formTitle: "Enviar un mensaje",
    formSubtitle:
      "Cuéntanos el problema, el objetivo y el plazo. Te devolvemos una lectura concreta, no un pitch genérico.",
    successTitle: "Recibido. Te escribimos.",
    successSubtitle:
      "Hemos recibido tu mensaje y te contactaremos en un día laborable. Revisa tu bandeja de entrada.",
    confirmFlash: "Mensaje enviado",
    errorMessage: "Algo ha fallado. Inténtalo de nuevo o escríbenos directamente.",
    nameLabel: "Nombre completo",
    namePlaceholder: "Tu nombre",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "tu@empresa.com",
    companyLabel: "Empresa",
    companyPlaceholder: "Tu empresa (opcional)",
    phoneLabel: "Teléfono",
    phonePlaceholder: "+34 600 000 000 (opcional)",
    serviceLabel: "¿Qué necesitas?",
    messageLabel: "Comentarios",
    messagePlaceholder:
      "¿Dónde se está perdiendo ahora mismo tu marketing? ¿Cómo se ve un buen próximo año?",
    submitButton: "Enviar mensaje",
    submittingButton: "Enviando…",
    sidebarTitle: "Qué pasa después",
    sidebarSubtitle: "Proceso simple. Respuesta rápida. Sin presión para comprar en la llamada.",
    step1Title: "Reservas o nos escribes",
    step1Desc:
      "Elige una hora arriba o envía un mensaje corto. Un estratega lo revisa en persona.",
    step2Title: "Confirmamos en un día",
    step2Desc:
      "Recibes confirmación y, si hace falta, una respuesta breve antes de vernos.",
    step3Title: "Próximos pasos claros",
    step3Desc:
      "En la llamada mapeamos qué está roto, qué arreglar primero y si somos el encaje correcto.",
    trustLabel1: "Respuesta < 24 h",
    trustLabel2: "Sin contratos de permanencia",
    trustLabel3: "Consulta inicial gratuita",
    servicePlaceholder: "Selecciona un servicio…",
    serviceOptions: [
      "Diseño y desarrollo web",
      "Posicionamiento SEO",
      "Anuncios de pago (Google / Meta)",
      "Marketing en redes sociales",
      "Branding e identidad",
      "Email marketing",
      "Marketing de contenidos",
      "Consultoría de crecimiento",
      "Otro / Aún no lo tengo claro",
    ],
    formFootnote: "Sin contratos a largo plazo. Mes a mes. Nunca compartiremos tus datos.",
    booking: {
      title: "Reservar una llamada estratégica",
      subtitle:
        "30 minutos. De lunes a viernes. Revisamos qué se está perdiendo, qué arreglar primero y si encajamos como partner.",
      timezoneNote: "Aviso mínimo de 24 horas",
      timeLabel: "Horas",
      pickDateHint: "Elige una fecha para ver huecos libres.",
      noSlots: "No hay huecos este día. Prueba otra fecha.",
      notesLabel: "Notas (opcional)",
      notesPlaceholder: "El mayor problema ahora mismo…",
      submitButton: "Reservar llamada estratégica",
      submittingButton: "Reservando…",
      successTitle: "Queda reservada.",
      successSubtitle: "Hemos recibido tu solicitud y confirmaremos en breve. Revisa tu bandeja de entrada.",
      confirmFlash: "Llamada reservada",
      errorMessage: "Algo ha fallado. Inténtalo de nuevo o escríbenos directamente.",
      selectSlotError: "Elige una fecha y una hora para continuar.",
      footnote: "Confirmación por correo. Sin pago para reservar.",
      prevMonth: "Mes anterior",
      nextMonth: "Mes siguiente",
      orDivider: "O envía un mensaje",
      tabLabel: "Reservar llamada",
      messageTabLabel: "Enviar un mensaje",
    },
  },
};

export const CONTACT_EMAIL = "hello@kinexisdigital.com";

const en = contactContentI18n.en;

export const contactContentFlat = {
  ...en,
};

export { contactContentFlat as contactContent };

export function getContactContent(locale: Locale): ContactContent {
  return contactContentI18n[locale] ?? contactContentI18n.en;
}
