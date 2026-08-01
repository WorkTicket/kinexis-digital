"use client";

import { useState } from "react";
import { CalendarDays, MessageSquare } from "lucide-react";
import type { ContactContent } from "@/content/contact";
import ContactForm from "@/components/pages/ContactForm";
import StrategyCallBooking from "@/components/pages/StrategyCallBooking";
import { cn } from "@/lib/utils";

type Props = { content: ContactContent };
type Tab = "book" | "message";

export default function ContactIntake({ content: c }: Props) {
  const [tab, setTab] = useState<Tab>("book");

  return (
    <div className="overflow-hidden rounded-2xl border border-surface bg-surface-raised">
      <div className="border-b border-surface bg-bg-dark/40 p-2">
        <div
          role="tablist"
          aria-label="Contact options"
          className="grid grid-cols-2 gap-1 rounded-xl bg-white/[0.03] p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === "book"}
            id="contact-tab-book"
            aria-controls="contact-panel-book"
            onClick={() => setTab("book")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
              tab === "book"
                ? "bg-neon-cyan text-bg shadow-sm"
                : "text-text-secondary hover:bg-white/[0.04] hover:text-white",
            )}
          >
            <CalendarDays className="h-4 w-4" />
            <span className="truncate">{c.booking.tabLabel}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "message"}
            id="contact-tab-message"
            aria-controls="contact-panel-message"
            onClick={() => setTab("message")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
              tab === "message"
                ? "bg-neon-cyan text-bg shadow-sm"
                : "text-text-secondary hover:bg-white/[0.04] hover:text-white",
            )}
          >
            <MessageSquare className="h-4 w-4" />
            <span className="truncate">{c.booking.messageTabLabel}</span>
          </button>
        </div>
      </div>

      <div className="p-5 md:p-6 lg:p-7">
        <div
          role="tabpanel"
          id="contact-panel-book"
          aria-labelledby="contact-tab-book"
          hidden={tab !== "book"}
        >
          {tab === "book" ? <StrategyCallBooking content={c} embedded /> : null}
        </div>
        <div
          role="tabpanel"
          id="contact-panel-message"
          aria-labelledby="contact-tab-message"
          hidden={tab !== "message"}
        >
          {tab === "message" ? <ContactForm content={c} embedded /> : null}
        </div>
      </div>
    </div>
  );
}
