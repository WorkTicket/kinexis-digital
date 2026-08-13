import type { AbstractIntlMessages } from "next-intl";

const CHROME_MESSAGE_KEYS = [
  "nav",
  "a11y",
  "theme",
  "language",
  "cookies",
  "error",
] as const;

/** Client chrome only — keeps the full catalog out of every page's JS. */
export function pickChromeMessages(messages: AbstractIntlMessages) {
  const picked: AbstractIntlMessages = {};
  for (const key of CHROME_MESSAGE_KEYS) {
    const value = messages[key];
    if (value !== undefined) picked[key] = value;
  }
  return picked;
}
