"use client";

import "@/styles/routes/contact.css";
import dynamic from "next/dynamic";
import { useEffect, useState, type KeyboardEvent } from "react";
import { useTranslations } from "next-intl";
import { ContactForm } from "./ContactForm";
import type { ContactContent } from "@/content/contact";
import { cn } from "@/lib/cn";

function BookingSkeleton() {
  const t = useTranslations("a11y");
  return <div className="contact-booking-skeleton" aria-busy="true"><span className="sr-only">{t("loadingSite")}</span><div className="contact-booking-skeleton__title" /><div className="contact-booking-skeleton__line" /><div className="contact-booking-skeleton__cols"><div className="contact-booking-skeleton__cal" /><div className="contact-booking-skeleton__side" /></div></div>;
}

const StrategyCallBooking = dynamic(() => import("@/components/contact/StrategyCallBooking").then(mod => mod.StrategyCallBooking), { ssr: false, loading: () => <BookingSkeleton /> });
type Tab = "message" | "book";
const tabFromHash = (): Tab => typeof window !== "undefined" && window.location.hash === "#book-call" ? "book" : "message";

export function ContactIntake({ content: c }: { content: ContactContent }) {
  const [tab, setTab] = useState<Tab>("message");
  useEffect(() => {
    const sync = () => setTab(tabFromHash());
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  const tabs = [{ id: "message", label: c.booking.messageTabLabel }, { id: "book", label: c.booking.tabLabel }] as const;
  function onTabKey(event: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? "message" : event.key === "End" ? "book" : tab === "message" ? "book" : "message";
    setTab(next);
    document.getElementById(`contact-tab-${next}`)?.focus();
  }
  return <div id="contact-form" className="contact-intake">
    <div className="contact-intake__tabs" role="tablist" aria-label={c.optionsAria} onKeyDown={onTabKey}>
      {tabs.map(item => <button key={item.id} type="button" role="tab" tabIndex={tab === item.id ? 0 : -1} aria-selected={tab === item.id} id={`contact-tab-${item.id}`} aria-controls={`contact-panel-${item.id}`} onClick={() => setTab(item.id)} className={cn("contact-intake__tab", tab === item.id && "contact-intake__tab--active")}>{item.label}</button>)}
    </div>
    <div className="contact-intake__body">
      <div role="tabpanel" id="contact-panel-message" aria-labelledby="contact-tab-message" hidden={tab !== "message"}><ContactForm content={c} /></div>
      <div role="tabpanel" id="contact-panel-book" aria-labelledby="contact-tab-book" hidden={tab !== "book"}>{tab === "book" ? <StrategyCallBooking content={c} /> : null}</div>
    </div>
  </div>;
}
