import type { Locale } from "@/i18n/routing";

export type TrustStripIcon = "google" | "meta" | "shield" | "chart";

export type TrustStripItem = {
  label: string;
  icon: TrustStripIcon;
};

export type TrustStripContent = {
  items: TrustStripItem[];
};

export const trustStripContent: Record<Locale, TrustStripContent> = {
  en: {
    items: [
      { label: "Google Ads Certified", icon: "google" },
      { label: "Meta Business Partner", icon: "meta" },
      { label: "Month-to-month contracts", icon: "shield" },
      { label: "Revenue-focused reporting", icon: "chart" },
    ],
  },
  es: {
    items: [
      { label: "Certificados en Google Ads", icon: "google" },
      { label: "Meta Business Partner", icon: "meta" },
      { label: "Contratos mes a mes", icon: "shield" },
      { label: "Reportes orientados a ingresos", icon: "chart" },
    ],
  },
};
