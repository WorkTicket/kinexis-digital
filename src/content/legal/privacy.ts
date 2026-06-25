import type { Locale } from "@/i18n/routing";

export type LegalSection = {
  title: string;
  paragraphs: string[];
  list?: string[];
};

export type LegalPageContent = {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
  contactLabel: string;
};

export const privacyContent: Record<Locale, LegalPageContent> = {
  en: {
    title: "Privacy Policy",
    lastUpdated: "June 24, 2026",
    intro:
      "KINEXIS Digital (\"KINEXIS,\" \"we,\" \"us,\" or \"our\") operates kinexisdigital.com. This Privacy Policy explains how we collect, use, disclose, and protect personal information when you visit our website, submit forms, or communicate with us.",
    contactLabel: "hello@kinexisdigital.com",
    sections: [
      {
        title: "Information We Collect",
        paragraphs: [
          "We collect information you provide directly, such as your name, email address, company name, phone number, service interests, and message content when you use our contact form, lead magnet, or chat widget.",
          "We automatically collect certain technical data when you visit our site, including IP address, browser type, device information, pages viewed, referring URLs, and approximate location derived from IP. We use cookies and similar technologies as described below.",
        ],
      },
      {
        title: "How We Use Your Information",
        paragraphs: ["We use personal information to:"],
        list: [
          "Respond to inquiries and provide requested services or audits",
          "Send follow-up communications related to your request",
          "Improve our website, content, and marketing performance",
          "Analyze site usage through analytics tools",
          "Comply with legal obligations and protect our rights",
        ],
      },
      {
        title: "Cookies and Analytics",
        paragraphs: [
          "We use cookies and similar technologies to operate the site and, with your consent, to measure traffic and user behavior. You can accept or reject non-essential cookies through our cookie banner.",
          "When enabled, we may use Google Analytics and Microsoft Clarity to understand how visitors use our site. These providers may process data according to their own privacy policies.",
        ],
      },
      {
        title: "Legal Bases (EEA/UK Visitors)",
        paragraphs: [
          "Where applicable, we process personal data based on consent (analytics cookies), contract performance (responding to your requests), legitimate interests (site security and improvement), and legal obligations.",
        ],
      },
      {
        title: "Sharing of Information",
        paragraphs: [
          "We do not sell your personal information. We may share data with service providers who help us operate our website and communications (such as email delivery and analytics), subject to appropriate safeguards. We may also disclose information if required by law or to protect our rights.",
        ],
      },
      {
        title: "Data Retention",
        paragraphs: [
          "We retain contact and lead information for as long as needed to respond to your inquiry, maintain business records, and comply with legal requirements. Analytics data is retained according to each provider's settings.",
        ],
      },
      {
        title: "Your Rights",
        paragraphs: [
          "Depending on your location, you may have rights to access, correct, delete, or restrict processing of your personal data, and to withdraw consent for analytics cookies at any time by clearing site data or using browser controls.",
          "California residents may have additional rights under the CCPA/CPRA. To exercise rights, contact us at the email below.",
        ],
      },
      {
        title: "Security",
        paragraphs: [
          "We implement reasonable administrative, technical, and organizational measures to protect personal information. No method of transmission over the Internet is 100% secure.",
        ],
      },
      {
        title: "Children",
        paragraphs: [
          "Our services are directed to businesses and are not intended for children under 16. We do not knowingly collect personal information from children.",
        ],
      },
      {
        title: "Changes to This Policy",
        paragraphs: [
          "We may update this Privacy Policy from time to time. The \"Last updated\" date at the top reflects the most recent revision. Continued use of the site after changes constitutes acceptance of the updated policy.",
        ],
      },
      {
        title: "Contact Us",
        paragraphs: [
          "For privacy questions or requests, email hello@kinexisdigital.com.",
        ],
      },
    ],
  },
  es: {
    title: "Política de Privacidad",
    lastUpdated: "24 de junio de 2026",
    intro:
      "KINEXIS Digital (\"KINEXIS,\" \"nosotros\" o \"nuestro\") opera kinexisdigital.com. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos la información personal cuando visitas nuestro sitio, envías formularios o te comunicas con nosotros.",
    contactLabel: "hello@kinexisdigital.com",
    sections: [
      {
        title: "Información que Recopilamos",
        paragraphs: [
          "Recopilamos la información que proporcionas directamente, como nombre, correo electrónico, empresa, teléfono, servicios de interés y mensajes cuando usas nuestro formulario de contacto, lead magnet o chat.",
          "Recopilamos automáticamente datos técnicos cuando visitas el sitio, incluyendo dirección IP, tipo de navegador, dispositivo, páginas vistas, URL de referencia y ubicación aproximada derivada de la IP.",
        ],
      },
      {
        title: "Cómo Usamos tu Información",
        paragraphs: ["Usamos la información personal para:"],
        list: [
          "Responder consultas y proporcionar servicios o auditorías solicitadas",
          "Enviar comunicaciones de seguimiento relacionadas con tu solicitud",
          "Mejorar nuestro sitio, contenido y rendimiento de marketing",
          "Analizar el uso del sitio mediante herramientas de analítica",
          "Cumplir obligaciones legales y proteger nuestros derechos",
        ],
      },
      {
        title: "Cookies y Analítica",
        paragraphs: [
          "Usamos cookies y tecnologías similares para operar el sitio y, con tu consentimiento, medir tráfico y comportamiento. Puedes aceptar o rechazar cookies no esenciales mediante nuestro banner de cookies.",
          "Cuando están habilitadas, podemos usar Google Analytics y Microsoft Clarity. Estos proveedores procesan datos según sus propias políticas de privacidad.",
        ],
      },
      {
        title: "Bases Legales (Visitantes EEE/Reino Unido)",
        paragraphs: [
          "Cuando corresponda, procesamos datos personales con base en consentimiento (cookies de analítica), ejecución de contrato (responder solicitudes), intereses legítimos (seguridad y mejora del sitio) y obligaciones legales.",
        ],
      },
      {
        title: "Compartir Información",
        paragraphs: [
          "No vendemos tu información personal. Podemos compartir datos con proveedores que nos ayudan a operar el sitio y las comunicaciones, sujetos a salvaguardas apropiadas. También podemos divulgar información si la ley lo exige.",
        ],
      },
      {
        title: "Retención de Datos",
        paragraphs: [
          "Conservamos información de contacto y leads el tiempo necesario para responder consultas, mantener registros comerciales y cumplir requisitos legales.",
        ],
      },
      {
        title: "Tus Derechos",
        paragraphs: [
          "Según tu ubicación, puedes tener derechos de acceso, corrección, eliminación o restricción del procesamiento, y retirar el consentimiento para cookies de analítica en cualquier momento.",
          "Los residentes de California pueden tener derechos adicionales bajo CCPA/CPRA. Contáctanos al correo indicado abajo.",
        ],
      },
      {
        title: "Seguridad",
        paragraphs: [
          "Implementamos medidas administrativas, técnicas y organizativas razonables para proteger la información personal. Ningún método de transmisión por Internet es 100% seguro.",
        ],
      },
      {
        title: "Menores",
        paragraphs: [
          "Nuestros servicios están dirigidos a empresas y no están pensados para menores de 16 años. No recopilamos intencionalmente información de menores.",
        ],
      },
      {
        title: "Cambios a Esta Política",
        paragraphs: [
          "Podemos actualizar esta Política de Privacidad periódicamente. La fecha de \"Última actualización\" refleja la revisión más reciente.",
        ],
      },
      {
        title: "Contáctanos",
        paragraphs: ["Para preguntas o solicitudes de privacidad, escribe a hello@kinexisdigital.com."],
      },
    ],
  },
};
