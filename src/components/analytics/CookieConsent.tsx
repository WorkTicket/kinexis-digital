"use client";

import { useTranslations } from "next-intl";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { useFocusTrap } from "@/hooks/useFocusTrap";

const STORAGE_KEY = "kinexis-cookie-consent";

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
  const [consent, setConsent] = useState<ConsentState>("pending");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted" || stored === "rejected") {
      setConsent(stored);
      document.documentElement.classList.remove("cookie-pending");
    } else {
      document.documentElement.classList.add("cookie-pending");
    }
    setReady(true);
  }, []);

  const accept = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    document.documentElement.classList.remove("cookie-pending");
    setConsent("accepted");
  }, []);

  const reject = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "rejected");
    document.documentElement.classList.remove("cookie-pending");
    setConsent("rejected");
  }, []);

  return (
    <CookieConsentContext.Provider value={{ consent: ready ? consent : "pending", ready, accept, reject }}>
      {children}
      <CookieBanner
        armed={ready && consent === "pending"}
        onAccept={accept}
        onReject={reject}
      />
    </CookieConsentContext.Provider>
  );
}

function CookieBanner({
  armed,
  onAccept,
  onReject,
}: {
  armed: boolean;
  onAccept: () => void;
  onReject: () => void;
}) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("cookies");
  useFocusTrap(bannerRef, armed);

  return (
    <div
      ref={bannerRef}
      role="dialog"
      aria-modal={armed || undefined}
      aria-labelledby="cookie-consent-title"
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
