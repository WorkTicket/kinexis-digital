interface CloudflareEnv {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
  WORKER_SELF_REFERENCE: { fetch: (req: Request) => Promise<Response> };

  INDEXNOW_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  GMAIL_USER?: string;
  GMAIL_APP_PASSWORD?: string;
  NEXT_PUBLIC_SITE_URL?: string;
  NEXT_PUBLIC_GA_ID?: string;
  NEXT_PUBLIC_CLARITY_ID?: string;
  NEXT_PUBLIC_GSC_VERIFICATION?: string;
  SENTRY_ORG?: string;
  SENTRY_PROJECT?: string;
  NEXT_PUBLIC_SENTRY_DSN?: string;
  GOOGLE_PSI_API_KEY?: string;

  RATE_LIMIT_KV?: {
    get(key: string): Promise<string | null>;
    get(key: string, type: "json"): Promise<unknown>;
    put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  };
}
