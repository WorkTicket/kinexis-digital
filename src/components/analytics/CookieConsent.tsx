"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Button from "@/components/ui/Button";

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
    }
    setReady(true);
  }, []);

  const accept = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setConsent("accepted");
  }, []);

  const reject = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "rejected");
    setConsent("rejected");
  }, []);

  return (
    <CookieConsentContext.Provider value={{ consent: ready ? consent : "pending", ready, accept, reject }}>
      {children}
      {ready && consent === "pending" && <CookieBanner onAccept={accept} onReject={reject} />}
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
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-white/[0.08] bg-bg-dark/95 p-4 backdrop-blur-md sm:p-6"
    >
      <div className="container-site flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <p id="cookie-consent-title" className="text-sm font-semibold text-white">
            {t("title")}
          </p>
          <p id="cookie-consent-desc" className="mt-1.5 text-sm text-muted leading-relaxed">
            {t("description")}{" "}
            <Link href="/privacy" className="text-neon-cyan underline underline-offset-2">
              {t("privacyLink")}
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button type="button" variant="ghost" onClick={onReject} className="text-sm">
            {t("reject")}
          </Button>
          <Button type="button" variant="primary" onClick={onAccept} className="text-sm">
            {t("accept")}
          </Button>
        </div>
      </div>
    </div>
  );
}
