import { PAYPAL_SDK_URL } from "@/config/paypal-plans";

export type ButtonActions = { disable: () => void | Promise<void>; enable: () => void | Promise<void> };
export type SubscriptionActions = { subscription: { create: (options: { plan_id: string }) => Promise<string> }; reject: () => unknown };
export type PayPalOptions = {
  style: { shape: string; color: string; layout: string; label: string };
  onInit: (data: unknown, actions: ButtonActions) => void;
  onClick: (data: unknown, actions: { reject: () => unknown }) => unknown;
  createSubscription: (data: unknown, actions: SubscriptionActions) => Promise<string>;
  onApprove: (data: { subscriptionID?: string }) => void;
  onError: () => void;
  onCancel: () => void;
};
export type PayPalButtons = { render: (container: HTMLElement) => Promise<void>; close?: () => Promise<void> };
export type PayPalSDK = { Buttons: (options: PayPalOptions) => PayPalButtons };
declare global { interface Window { paypal?: PayPalSDK } }

let sdkPromise: Promise<PayPalSDK> | undefined;
export function getPayPalSDKUrl(locale: string) {
  return `${PAYPAL_SDK_URL}&locale=${locale === "en" ? "en_US" : "es_US"}`;
}
export function loadPayPalSDK(locale: string): Promise<PayPalSDK> {
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve, reject) => {
    if (window.paypal) { resolve(window.paypal); return; }
    const script = document.createElement("script");
    script.id = "kinexis-paypal-subscriptions";
    script.src = getPayPalSDKUrl(locale);
    script.async = true;
    script.dataset.sdkIntegrationSource = "button-factory";
    const timeout = window.setTimeout(() => reject(new Error("PayPal SDK timed out")), 20000);
    script.onload = () => { window.clearTimeout(timeout); if (window.paypal) resolve(window.paypal); else reject(new Error("PayPal SDK missing")); };
    script.onerror = () => { window.clearTimeout(timeout); reject(new Error("PayPal SDK failed")); };
    document.head.appendChild(script);
  });
  return sdkPromise;
}

export function sanitizeSubscriptionId(value: unknown): string | null {
  return typeof value === "string" && /^I-[A-Z0-9]{6,}$/.test(value) ? value : null;
}
