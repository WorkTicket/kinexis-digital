import { CheckCheck, LockKeyhole, MonitorSmartphone } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { getContractorDesign } from "@/content/contractor-design";
import "@/styles/components/offer-assurance.css";

/** Verified offer facts, not customer-result or certification claims. */
export function OfferAssuranceStrip({ locale }: { locale: Locale }) {
  const content = getContractorDesign(locale);
  const items = [content.promises[0], content.heroTerms, content.promises[2]];
  const icons = [MonitorSmartphone, LockKeyhole, CheckCheck];
  return <aside className="offer-assurance" aria-label={content.heroNote}><ul className="shell">{items.map((item, index) => { const Icon = icons[index]; return <li key={item}><Icon size={20} strokeWidth={1.5} aria-hidden /><span>{item}</span></li>; })}</ul></aside>;
}
