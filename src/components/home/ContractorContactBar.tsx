"use client";

import { MessageCircle, Phone } from "lucide-react";
import { CallLink } from "@/components/analytics/CallLink";

export function ContractorContactBar({ message, call }: { message: string; call: string }) {
  return <nav className="offer-contact-bar" aria-label={message}>
    <CallLink className="offer-contact-bar__call" ariaLabel={call}><Phone size={18} aria-hidden /><span>{call}</span></CallLink>
    <a href="https://m.me/1342631805590605" className="offer-contact-bar__message"><MessageCircle size={18} aria-hidden /><span>{message}</span></a>
  </nav>;
}
