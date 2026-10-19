"use client";

import { Link } from "@/i18n/navigation";
import { LOCALE_CHOICE_COOKIE_NAME, LOCALE_COOKIE_MAX_AGE } from "@/i18n/routing";

export function TermsLanguageSwitch({ spanish }: { spanish: boolean }) {
  function rememberChoice() {
    const secure = window.location.protocol === "https:" ? "; secure" : "";
    document.cookie = `${LOCALE_CHOICE_COOKIE_NAME}=1; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax${secure}`;
  }
  return (
    <nav aria-label={spanish ? "Idioma de los términos" : "Terms language"} className="terms-languages">
      <Link href="/terms" locale="en" lang="en" prefetch={false} onClick={rememberChoice} aria-current={!spanish ? "page" : undefined}>EN</Link>
      <span aria-hidden="true"> / </span>
      <Link href="/terms" locale="es-419" lang="es" prefetch={false} onClick={rememberChoice} aria-current={spanish ? "page" : undefined}>ES</Link>
    </nav>
  );
}
