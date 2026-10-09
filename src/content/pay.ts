import type { Locale } from "@/i18n/routing";
import { getLocaleContent, localeContent } from "@/i18n/locale-content";

export type PayContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  signal: string;
  copy: string;
  formTitle: string;
  formSubtitle: string;
  amountLabel: string;
  amountHint: string;
  descriptionLabel: string;
  descriptionPlaceholder: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  companyLabel: string;
  companyPlaceholder: string;
  submit: string;
  submitting: string;
  footnote: string;
  errorFallback: string;
  asideTitle: string;
  asideSubtitle: string;
  steps: { title: string; desc: string }[];
  trust: string[];
  successTitle: string;
  successCopy: string;
  successHome: string;
  cancelledTitle: string;
  cancelledCopy: string;
  cancelledBack: string;
};

const payContent = localeContent<PayContent>({
  en: {
    metaTitle: "Pay an Invoice or Project Deposit",
    metaDescription:
      "Pay a KINEXIS invoice or project deposit with PayPal. You finish on PayPal, and the receipt goes to the PayPal account you pay with.",
    eyebrow: "Invoices",
    title: "Pay an invoice",
    signal: "or a deposit",
    copy: "Enter the amount we agreed on. You finish on PayPal with a card or your PayPal balance, and PayPal emails the receipt.",
    formTitle: "Payment details",
    formSubtitle: "Use the amount from your invoice or the deposit we confirmed.",
    amountLabel: "Amount",
    amountHint: "USD, from $1 to $75,000.",
    descriptionLabel: "What this payment is for",
    descriptionPlaceholder: "March website deposit",
    nameLabel: "Your name",
    namePlaceholder: "Jordan Lee",
    emailLabel: "Your email",
    emailPlaceholder: "you@company.com",
    companyLabel: "Company",
    companyPlaceholder: "Optional",
    submit: "Continue to PayPal",
    submitting: "Opening PayPal…",
    footnote: "You pay on PayPal. We never see your card number or PayPal password.",
    errorFallback: "We couldn't open PayPal. Try again, or email hello@kinexisdigital.com.",
    asideTitle: "What happens next",
    asideSubtitle: "You leave this page only to pay on PayPal.",
    steps: [
      {
        title: "Confirm the amount",
        desc: "Name the invoice or deposit so we can match it on our side.",
      },
      {
        title: "Pay on PayPal",
        desc: "Use a card or your PayPal balance. PayPal emails the receipt when it goes through.",
      },
      {
        title: "We get notified",
        desc: "PayPal tells us when the payment is complete. Withdrawals go to the bank linked on that PayPal account.",
      },
    ],
    trust: ["PayPal checkout", "Email receipt", "USD only"],
    successTitle: "Back from PayPal",
    successCopy:
      "If the payment went through, PayPal emails a receipt to the account you paid with. We get a notice here once PayPal confirms it. If you don't see the receipt in a few minutes, check spam, or return to the payment page and try again.",
    successHome: "Back to the site",
    cancelledTitle: "Payment not completed",
    cancelledCopy:
      "Nothing was charged. You can go back and try again, or email hello@kinexisdigital.com if the amount looks wrong.",
    cancelledBack: "Return to payment",
  },
  "es-419": {
    metaTitle: "Paga una factura o un anticipo",
    metaDescription:
      "Paga una factura o un anticipo de KINEXIS con PayPal. Terminas el pago en PayPal y el recibo llega a la cuenta con la que pagaste.",
    eyebrow: "Facturas",
    title: "Paga una factura",
    signal: "o un anticipo",
    copy: "Escribe el monto que acordamos. Terminas en PayPal con tarjeta o saldo, y PayPal manda el recibo.",
    formTitle: "Datos del pago",
    formSubtitle: "Usa el monto de tu factura o el anticipo que confirmamos.",
    amountLabel: "Monto",
    amountHint: "USD, de $1 a $75,000.",
    descriptionLabel: "Para qué es este pago",
    descriptionPlaceholder: "Anticipo del sitio, marzo",
    nameLabel: "Tu nombre",
    namePlaceholder: "Jordan Lee",
    emailLabel: "Tu correo",
    emailPlaceholder: "tu@empresa.com",
    companyLabel: "Empresa",
    companyPlaceholder: "Opcional",
    submit: "Continuar a PayPal",
    submitting: "Abriendo PayPal…",
    footnote: "Pagas en PayPal. Nosotros no vemos tu tarjeta ni tu contraseña de PayPal.",
    errorFallback: "No pudimos abrir PayPal. Inténtalo de nuevo o escribe a hello@kinexisdigital.com.",
    asideTitle: "Qué sigue",
    asideSubtitle: "Sales de esta página solo para pagar en PayPal.",
    steps: [
      {
        title: "Confirma el monto",
        desc: "Nombra la factura o el anticipo para que podamos identificarlo.",
      },
      {
        title: "Paga en PayPal",
        desc: "Usa una tarjeta o tu saldo de PayPal. El recibo llega por correo cuando el pago sale bien.",
      },
      {
        title: "Nos llega el aviso",
        desc: "PayPal nos avisa cuando el pago queda confirmado. El retiro va al banco vinculado a esa cuenta de PayPal.",
      },
    ],
    trust: ["Pago en PayPal", "Recibo por correo", "Solo USD"],
    successTitle: "De vuelta de PayPal",
    successCopy:
      "Si el pago salió bien, PayPal manda el recibo a la cuenta con la que pagaste. Nosotros recibimos un aviso cuando PayPal lo confirma. Si el recibo no llega en unos minutos, revisa el spam o vuelve a la página de pago.",
    successHome: "Volver al sitio",
    cancelledTitle: "El pago no se completó",
    cancelledCopy:
      "No se hizo ningún cargo. Puedes volver a intentarlo, o escribir a hello@kinexisdigital.com si el monto no cuadra.",
    cancelledBack: "Volver al pago",
  },
});

export function getPayContent(locale: Locale): PayContent {
  return getLocaleContent(payContent, locale);
}
