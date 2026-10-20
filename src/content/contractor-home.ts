import type { Locale } from "@/i18n/routing";
import { getPlanContent } from "./pay-plans";
export function getContractorHome(locale: Locale) {
  const es = locale !== "en";
  const plans = getPlanContent(locale);
  return {
    eyebrow: es ? "Para contratistas de Houston" : "For Houston contractors",
    title: es ? "Páginas web para contratistas de Houston. $0 de entrada, $197/mes." : "Websites for Houston contractors. $0 down, $197/mo.",
    metaTitle: es ? "Web para contratistas de Houston | $0 de entrada, $197/mes" : "Websites for Houston contractors | $0 down, $197/mo",
    copy: es ? "Primero creamos su nueva página de inicio, gratis. ¿Le gusta? Publique con $0 de entrada." : "We build your new homepage first, free. Love it? Launch with $0 down.",
    message: es ? "Escríbanos por Messenger" : "Message us on Messenger",
    seePlans: es ? "Ver planes" : "See plans",
    plans: es ? "Un plan para su negocio" : "A plan for your business",
    how: es ? "Cómo funciona" : "How it works",
    steps: es ? ["Envíenos su oficio por Messenger", "Llamada de 10 minutos; después, su vista previa gratis en 2 días hábiles", "Apruebe su página y suscríbase el día del lanzamiento"] : ["Message us your trade", "10-minute call, then your free homepage preview within 2 business days", "Approve it and subscribe on launch day"],
    conditions: es ? "Si ya se cobró el tercer mes, lo reembolsamos. La garantía se aplica automáticamente según el registro del día 60, una vez por negocio y propietario, con la cuenta al día y el sitio y el seguimiento activos. No es una promesa de ventas. Consulte las condiciones completas en los Términos §10.2." : "If your 3rd charge has already been taken, we refund it. The guarantee applies automatically based on the day-60 log, once per business and owner, with your account paid up and your site and tracking live. It is not a promise of sales. See Terms §10.2 for the full conditions.",
    faqTitle: es ? "Preguntas frecuentes" : "Frequently asked questions",
    faq: [
      { question: es ? "¿Cuál es el plazo mínimo?" : "Is there a minimum term?", answer: es ? "Mínimo de 3 meses desde el lanzamiento, luego mes a mes. Después puede cancelar en cualquier momento por texto, correo o Messenger." : "3-month minimum from launch, then month-to-month. Cancel anytime after that by text, email or Messenger." },
      ...[0, 1, 3, 5].map(index => ({ question: plans.faq[index][0], answer: plans.faq[index][1] })),
    ],
  };
}
