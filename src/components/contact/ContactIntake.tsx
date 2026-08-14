"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { ContactContent } from "@/content/contact";
import { cn } from "@/lib/cn";

const StrategyCallBooking = dynamic(
  () =>
    import("@/components/contact/StrategyCallBooking").then(
      (mod) => mod.StrategyCallBooking,
    ),
);

const ContactForm = dynamic(
  () =>
    import("@/components/contact/ContactForm").then((mod) => mod.ContactForm),
);

type Props = { content: ContactContent };
type Tab = "book" | "message";

function tabFromHash(): Tab {
  if (typeof window === "undefined") return "book";
  return window.location.hash === "#contact-form" ? "message" : "book";
}

export function ContactIntake({ content: c }: Props) {
  const [tab, setTab] = useState<Tab>("book");

  useEffect(() => {
    const sync = () => setTab(tabFromHash());
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <div id="contact-form" className="overflow-hidden rounded-2xl bg-[color-mix(in_oklab,var(--foreground)_4%,transparent)]">
      <div className="p-2">
        <div
          role="tablist"
          aria-label={c.optionsAria}
          className="grid grid-cols-2 gap-1 rounded-[var(--radius-md)] bg-foreground/[0.04] p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === "book"}
            id="contact-tab-book"
            aria-controls="contact-panel-book"
            onClick={() => setTab("book")}
            className={cn(
              "min-h-11 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm font-semibold transition-colors",
              tab === "book"
                ? "bg-foreground text-background"
                : "text-muted hover:bg-foreground/[0.04] hover:text-foreground",
            )}
          >
            {c.booking.tabLabel}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "message"}
            id="contact-tab-message"
            aria-controls="contact-panel-message"
            onClick={() => setTab("message")}
            className={cn(
              "min-h-11 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm font-semibold transition-colors",
              tab === "message"
                ? "bg-foreground text-background"
                : "text-muted hover:bg-foreground/[0.04] hover:text-foreground",
            )}
          >
            {c.booking.messageTabLabel}
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-5 md:p-6 lg:p-7">
        <div
          role="tabpanel"
          id="contact-panel-book"
          aria-labelledby="contact-tab-book"
          hidden={tab !== "book"}
        >
          {tab === "book" ? <StrategyCallBooking content={c} /> : null}
        </div>
        <div
          role="tabpanel"
          id="contact-panel-message"
          aria-labelledby="contact-tab-message"
          hidden={tab !== "message"}
        >
          {tab === "message" ? <ContactForm content={c} /> : null}
        </div>
      </div>
    </div>
  );
}
