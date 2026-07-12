import type { Locale } from "@/i18n/routing";

export type ContactContent = {
  heroTitle: string;
  heroSubtitle: string;
  formTitle: string;
  formSubtitle: string;
  successTitle: string;
  successSubtitle: string;
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
    messageLabel: "Tell Us About Your Project",
    messagePlaceholder:
      "What's your biggest marketing challenge right now? What does success look like in 12 months?",
    submitButton: "Send Message",
    submittingButton: "Sending…",
    sidebarTitle: "What Happens Next",
    sidebarSubtitle: "We keep things simple. No long waits, no pressure.",
    step1Title: "We review your message",
    step1Desc:
      "A senior strategist reads every submission, not a bot. You'll hear from us within one business day.",
    step2Title: "We schedule a call",
    step2Desc:
      "If there's a fit, we'll book a 30-minute discovery call to dig into your goals and challenges.",
    step3Title: "You get a clear proposal",
    step3Desc:
      "A custom strategy and scope tailored to your business, with pricing that makes sense.",
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
    messageLabel: "Cuéntanos Sobre Tu Proyecto",
    messagePlaceholder:
      "¿Cuál es tu mayor desafío de marketing ahora? ¿Cómo sería el éxito en 12 meses?",
    submitButton: "Enviar Mensaje",
    submittingButton: "Enviando…",
    sidebarTitle: "¿Qué Pasa Después?",
    sidebarSubtitle: "Lo mantenemos simple. Sin largas esperas, sin presión.",
    step1Title: "Revisamos tu mensaje",
    step1Desc:
      "Un estratega senior lee cada envío, no un bot. Tendrás respuesta en un día hábil.",
    step2Title: "Agendamos una llamada",
    step2Desc:
      "Si hay compatibilidad, programamos una llamada de 30 minutos para explorar tus objetivos.",
    step3Title: "Recibes una propuesta clara",
    step3Desc:
      "Una estrategia personalizada adaptada a tu negocio, con precios que tienen sentido.",
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
  },
};
