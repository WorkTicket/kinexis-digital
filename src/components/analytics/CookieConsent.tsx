"use client";

import { useTranslations } from "next-intl";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import {
  persistConsentChoice,
  readStoredConsent,
} from "@/lib/analytics/consent";
import { isCookieBannerExemptPath } from "@/lib/landing-chrome";

type ConsentState = "pending" | "accepted" | "rejected";

type CookieConsentContextValue = {
  consent: ConsentState;
  ready: boolean;
  accept: () => void;
  reject: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue>({
  consent: "pending",
  ready: false,
  accept: () => {},
  reject: () => {},
});

export function useCookieConsent() {
  return useContext(CookieConsentContext);
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideBanner = isCookieBannerExemptPath(pathname);
  const [consent, setConsent] = useState<ConsentState>("pending");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    if (hideBanner) {
      document.documentElement.classList.remove("cookie-pending");
      if (stored === "accepted" || stored === "rejected") {
        persistConsentChoice(stored);
        setConsent(stored);
      }
      setReady(true);
      return;
    }

    if (stored === "accepted" || stored === "rejected") {
      persistConsentChoice(stored);
      setConsent(stored);
      document.documentElement.classList.remove("cookie-pending");
    } else {
      document.documentElement.classList.add("cookie-pending");
    }
    setReady(true);
  }, [hideBanner]);

  const accept = useCallback(() => {
    persistConsentChoice("accepted");
    document.documentElement.classList.remove("cookie-pending");
    setConsent("accepted");
  }, []);

  const reject = useCallback(() => {
    persistConsentChoice("rejected");
    document.documentElement.classList.remove("cookie-pending");
    setConsent("rejected");
  }, []);

  return (
    <CookieConsentContext.Provider value={{ consent: ready ? consent : "pending", ready, accept, reject }}>
      <div className="site-root">
        {children}
        {hideBanner ? null : (
          <CookieBanner onAccept={accept} onReject={reject} />
        )}
      </div>
    </CookieConsentContext.Provider>
  );
}

function CookieBanner({
  onAccept,
  onReject,
}: {
  onAccept: () => void;
  onReject: () => void;
}) {
  const t = useTranslations("cookies");

  return (
    <div
      role="region"
      aria-label={t("title")}
      aria-describedby="cookie-consent-desc"
      className="cookie-banner chrome-glass"
    >
      <div className="shell cookie-banner__inner">
        <div className="cookie-banner__copy">
          <p id="cookie-consent-title" className="cookie-banner__title">
            {t("title")}
          </p>
          <p id="cookie-consent-desc" className="cookie-banner__desc">
            {t("description")}{" "}
            <Link href="/privacy" className="cookie-banner__link">
              {t("privacyLink")}
            </Link>
          </p>
        </div>
        <div className="cookie-banner__actions">
          <Button type="button" variant="ghost" size="sm" onClick={onReject}>
            {t("reject")}
          </Button>
          <Button type="button" variant="primary" size="sm" onClick={onAccept}>
            {t("accept")}
          </Button>
        </div>
      </div>
    </div>
  );
}
