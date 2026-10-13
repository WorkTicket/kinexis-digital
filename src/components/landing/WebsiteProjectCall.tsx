"use client";

import { StrategyCallBooking } from "@/components/contact/StrategyCallBooking";
import { getContactContent } from "@/content/contact";
import type { Locale } from "@/i18n/routing";

export function WebsiteProjectCall({ locale, title, subtitle, ...props }: {
  locale: Locale;
  title: string;
  subtitle: string;
  landingSlug: string;
  preset: { name: string; email: string; notes: string };
}) {
  const contact = getContactContent(locale);
  return <StrategyCallBooking {...props} stayOnPage content={{
    ...contact,
    booking: { ...contact.booking, title, subtitle, submitButton: "Confirm this time" },
  }} />;
}
