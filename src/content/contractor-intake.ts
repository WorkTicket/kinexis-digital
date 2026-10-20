export type ContractorField = {
  id: string; en: string; es: string;
  type?: "textarea" | "email" | "tel" | "select" | "radio" | "checks";
  required?: boolean;
  options?: readonly (readonly [string, string])[];
  hint?: readonly [string, string];
  placeholder?: readonly [string, string];
};
export const TRADE_OPTIONS = [["Plumbing", "Plomería"], ["AC / HVAC", "Aire acondicionado / HVAC"], ["Roofing", "Techos"], ["Electrical", "Electricidad"], ["Landscaping / irrigation", "Jardinería / riego"], ["Remodeling", "Remodelación"], ["Other", "Otro"]] as const;
export const PLAN_OPTIONS = [["Lead System $197/mo, $0 down (most popular)", "Lead System $197/mes, $0 de entrada (más popular)"], ["Website $97/mo", "Website $97/mes"], ["Plus (English + Spanish) $297/mo", "Plus (inglés + español) $297/mes"], ["Own It $1,497 one time", "Own It $1,497 pago único"], ["Not sure yet", "Aún no estoy seguro"]] as const;
const yesNo = [["Yes", "Sí"], ["No", "No"]] as const;
export const QUICK_FIELDS: ContractorField[] = [
  { id: "companyName", en: "Business name (as you want it on the site)", es: "Nombre del negocio (como quiere que aparezca)", required: true },
  { id: "primaryContact", en: "Owner name", es: "Nombre del dueño", required: true },
  { id: "phone", en: "Best mobile number to call or text you", es: "Mejor celular para llamarle o escribirle", type: "tel", required: true },
  { id: "email", en: "Email", es: "Correo", type: "email", required: true },
  { id: "trade", en: "Your trade", es: "Su oficio", type: "select", options: TRADE_OPTIONS, required: true },
  { id: "plan", en: "Plan you're interested in", es: "Plan que le interesa", type: "radio", options: PLAN_OPTIONS, required: true, hint: ["3-month minimum on monthly plans, then month to month. Plus tax if any. You choose for sure after you see your preview.", "Mínimo de 3 meses en planes mensuales, después mes a mes. Más impuestos si aplican. Usted elige definitivamente después de ver su vista previa."] },
  { id: "citiesServed", en: "Cities and areas you serve", es: "Ciudades y zonas donde trabaja", type: "textarea", placeholder: ["e.g. Katy, Cypress, Pearland, or within 30 miles of Sugar Land", "p. ej. Katy, Cypress, Pearland, o a 30 millas de Sugar Land"] },
  { id: "topServices", en: "Your top 3–6 services (the jobs you want more of first)", es: "Sus 3 a 6 servicios principales (primero los trabajos que más quiere)", type: "textarea", placeholder: ["e.g. water heater repair, drain cleaning, slab leaks", "p. ej. reparación de calentadores, limpieza de drenajes, fugas bajo la losa"] },
  { id: "licenseNumber", en: "Texas license number", es: "Número de licencia de Texas", hint: ["Required for plumbing (Responsible Master Plumber, starts with M), AC/HVAC (ACR license) and electrical (shown as TECL ####). Irrigation: TCEQ LI number. Texas requires it on your advertising, so it goes in your site footer.", "Obligatorio para plomería (Responsible Master Plumber, empieza con M), AC/HVAC (licencia ACR) y electricidad (TECL ####). Riego: número LI de TCEQ. Texas exige que aparezca en su publicidad, por eso va en el pie de su página."] },
  { id: "currentWebsite", en: "Current website, if any", es: "Página web actual, si tiene" },
  { id: "gbpLink", en: "Google Business Profile link, if any (Google Maps → your business → Share → copy link)", es: "Enlace de su Perfil de Google, si tiene (Google Maps → su negocio → Compartir → copiar enlace)" },
  { id: "logo", en: "Logo", es: "Logo", type: "checks", options: [["I'll text or email my logo", "Enviaré mi logo por texto o correo"], ["I don't have one. Please make a simple one.", "No tengo. Por favor, hagan uno sencillo."]] },
  { id: "photos", en: "Photos of your work, team or trucks (2–5; phone photos are fine)", es: "Fotos de sus trabajos, equipo o camionetas (2 a 5; sirven del celular)", type: "checks", options: [["I'll text or email photos", "Enviaré fotos por texto o correo"], ["I don't have photos yet. Use licensed stock photos for now.", "Todavía no tengo fotos. Usen fotos con licencia por ahora."]] },
  { id: "brandColors", en: 'Colors you like (or "match my logo" / "you pick")', es: 'Colores que le gustan (o "como mi logo" / "ustedes escojan")' },
  { id: "hours", en: "Business hours", es: "Horario", placeholder: ["Mon–Fri 7am–6pm, Sat 8am–2pm", "Lun–vie 7am–6pm, sáb 8am–2pm"] },
  { id: "emergency", en: "Do you offer emergency or after-hours service?", es: "¿Ofrece servicio de emergencia o fuera de horario?", type: "radio", options: yesNo },
  { id: "spanishSite", en: "Do you want a Spanish version of your site?", es: "¿Quiere su página también en español?", type: "radio", options: [...yesNo, ["Not sure", "No estoy seguro"]], hint: ["A full English + Spanish site is the Plus plan.", "La página completa en inglés y español es el plan Plus."] },
];
export const LAUNCH_FIELDS: ContractorField[] = [
  { id: "domainChoice", en: "Domain", es: "Dominio", type: "radio", options: [["I have one", "Ya tengo uno"], ["I don't have one. Please register one in my name.", "No tengo. Por favor, registren uno a mi nombre."]] },
  { id: "domain", en: "Your domain and provider (GoDaddy, Namecheap, other). Don't send logins.", es: "Su dominio y proveedor (GoDaddy, Namecheap, otro). No envíe accesos." },
  { id: "pages", en: "Pages you want", es: "Páginas que quiere", type: "checks", options: [["Services", "Servicios"], ["Service areas", "Zonas de servicio"], ["Gallery", "Galería"], ["About", "Nosotros"], ["Reviews", "Reseñas"], ["Contact", "Contacto"], ["Financing", "Financiamiento"], ["Emergency", "Emergencia"], ["Other", "Otra"]] },
  { id: "whatYouDo", en: "About you: how you started, years in business, what makes your work different (bullets fine)", es: "Sobre usted: cómo empezó, años en el negocio y qué hace diferente su trabajo (puede usar puntos)", type: "textarea" },
  { id: "reviews", en: "Link to your Google reviews (we only show real reviews)", es: "Enlace a sus reseñas de Google (solo mostramos reseñas reales)" },
  { id: "insurance", en: "Insured or bonded? Any warranty on your work? (we only list what you confirm)", es: "¿Tiene seguro o fianza? ¿Ofrece garantía? (solo publicamos lo que usted confirme)", type: "textarea" },
  { id: "offers", en: "Current offers, if any (free estimates, senior discount, financing), with any limits or dates", es: "Promociones actuales (presupuestos gratis, descuento para adultos mayores, financiamiento), con límites o fechas", type: "textarea" },
  { id: "socialLinks", en: "Social links (Facebook, Instagram, Nextdoor, Yelp)", es: "Redes sociales (Facebook, Instagram, Nextdoor, Yelp)", type: "textarea" },
  { id: "leadTextName", en: "Who gets the new-lead texts? Name", es: "¿Quién recibe los mensajes de nuevos clientes? Nombre" },
  { id: "leadTextPhone", en: "New-lead text recipient mobile", es: "Celular de quien recibe los avisos", type: "tel" },
  { id: "anythingElse", en: "Anything else we should know?", es: "¿Algo más que debamos saber?", type: "textarea" },
];
export const SMS_CONSENT_VERSION = "sms-consent-v1";
export const SMS_CONSENT_TEXT = {
  en: "Yes, Kinexis Digital may text me at the mobile number above about my preview, my account and my questions. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.",
  es: "Sí, Kinexis Digital puede enviarme textos al celular de arriba sobre mi vista previa, mi cuenta y mis preguntas. La frecuencia de mensajes varía. Pueden aplicarse tarifas de mensajes y datos. Responda STOP para no recibir más y HELP para ayuda. Aceptar no es condición de compra.",
};
export const INTAKE_AUTHORIZATION = {
  en: "I confirm this information is accurate and that I'm authorized to share it for this business. Kinexis Digital may use it to build my free preview and website. This is not a purchase. Nothing is charged until I approve a plan.",
  es: "Confirmo que esta información es correcta y que estoy autorizado a compartirla por este negocio. Kinexis Digital puede usarla para hacer mi vista previa gratis y mi página. Esto no es una compra; no se cobra nada hasta que yo apruebe un plan.",
};
export function requiresTradeLicense(trade: unknown) {
  return ["Plumbing", "AC / HVAC", "Electrical"].includes(String(trade));
}
