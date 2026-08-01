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

export const contactContent: Record<Locale, ContactContent> = {
  en: {
    heroTitle: "Start with a conversation, not a pitch deck.",
    heroSubtitle:
      "Tell us what's not working in your marketing. We'll respond within one business day with an honest read on whether we can help.",
    formTitle: "Start the Conversation",
    formSubtitle:
      "Share what you're working on and we'll come back to you with a clear plan. No vague promises, no wasted time.",
    successTitle: "You're in good hands.",
    successSubtitle:
      "We've received your message and will reach out within one business day. Check your inbox.",
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
      "What's your biggest marketing challenge right now? What does success look like in 12 months?",
    submitButton: "Send Message",
    submittingButton: "Sending…",
    sidebarTitle: "What Happens Next",
    sidebarSubtitle: "We keep things simple. No long waits, no pressure.",
    step1Title: "You book or write us",
    step1Desc:
      "Pick a call time above, or send a short message. Either way, a strategist reviews it personally.",
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
        "30 minutes. Weekdays. We'll look at what's leaking and whether we can help.",
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
    heroTitle: "Empieza con una conversación, no con un pitch.",
    heroSubtitle:
      "Cuéntanos qué no está funcionando en tu marketing. Responderemos en un día hábil con una evaluación honesta sobre si podemos ayudarte.",
    formTitle: "Inicia la Conversación",
    formSubtitle:
      "Comparte en qué estás trabajando y te responderemos con un plan claro. Sin promesas vagas, sin tiempo perdido.",
    successTitle: "Estás en buenas manos.",
    successSubtitle:
      "Recibimos tu mensaje y nos pondremos en contacto en un día hábil. Revisa tu bandeja de entrada.",
    confirmFlash: "Mensaje enviado",
    errorMessage: "Algo salió mal. Por favor intenta de nuevo o escríbenos directamente.",
    nameLabel: "Nombre Completo",
    namePlaceholder: "Tu nombre",
    emailLabel: "Correo Electrónico",
    emailPlaceholder: "tu@empresa.com",
    companyLabel: "Empresa",
    companyPlaceholder: "Tu empresa (opcional)",
    phoneLabel: "Teléfono",
    phonePlaceholder: "+1 (555) 000-0000 (opcional)",
    serviceLabel: "¿Qué estás buscando?",
    messageLabel: "Comentarios",
    messagePlaceholder:
      "¿Cuál es tu mayor desafío de marketing ahora? ¿Cómo sería el éxito en 12 meses?",
    submitButton: "Enviar Mensaje",
    submittingButton: "Enviando…",
    sidebarTitle: "¿Qué Pasa Después?",
    sidebarSubtitle: "Lo mantenemos simple. Sin largas esperas, sin presión.",
    step1Title: "Agenda o escríbenos",
    step1Desc:
      "Elige un horario arriba o envía un mensaje corto. Un estratega lo revisa en persona.",
    step2Title: "Confirmamos en un día",
    step2Desc:
      "Recibes confirmación y, si hace falta, una respuesta rápida antes de la llamada.",
    step3Title: "Próximos pasos claros",
    step3Desc:
      "En la llamada mapeamos qué falla, qué arreglar primero y si somos el equipo adecuado.",
    trustLabel1: "Respuesta < 24hrs",
    trustLabel2: "Sin contratos forzados",
    trustLabel3: "Consulta inicial gratuita",
    servicePlaceholder: "Selecciona un servicio…",
    serviceOptions: [
      "Diseño y Desarrollo Web",
      "SEO (Optimización en Buscadores)",
      "Anuncios Pagados (Google / Meta)",
      "Marketing en Redes Sociales",
      "Branding e Identidad",
      "Email Marketing",
      "Marketing de Contenidos",
      "Consultoría de Crecimiento",
      "Otro / Aún no estoy seguro",
    ],
    formFootnote: "Sin contratos a largo plazo. Mes a mes. Nunca compartiremos tus datos.",
    booking: {
      title: "Agenda una llamada de estrategia",
      subtitle:
        "30 minutos. Entre semana. Revisamos qué está fallando y si podemos ayudar.",
      timezoneNote: "Aviso mínimo de 24 horas",
      timeLabel: "Horarios",
      pickDateHint: "Elige una fecha para ver horarios.",
      noSlots: "No quedan horarios este día. Prueba otra fecha.",
      notesLabel: "Notas (opcional)",
      notesPlaceholder: "Tu mayor desafío ahora…",
      submitButton: "Reservar llamada",
      submittingButton: "Reservando…",
      successTitle: "Quedó agendada.",
      successSubtitle: "Recibimos tu solicitud y confirmaremos pronto. Revisa tu bandeja de entrada.",
      confirmFlash: "Llamada reservada",
      errorMessage: "Algo salió mal. Intenta de nuevo o escríbenos directamente.",
      selectSlotError: "Elige una fecha y hora para continuar.",
      footnote: "Confirmación por correo. Sin pago para reservar.",
      prevMonth: "Mes anterior",
      nextMonth: "Mes siguiente",
      orDivider: "O envía un mensaje",
      tabLabel: "Agendar llamada",
      messageTabLabel: "Enviar mensaje",
    },
  },
};
