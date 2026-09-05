interface CloudflareEnv {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
  WORKER_SELF_REFERENCE: { fetch: (req: Request) => Promise<Response> };

  /** Cloudflare Email Service send binding (see wrangler.jsonc `send_email`). */
  EMAIL?: {
    send: (message: {
      to: string | string[];
      from: string | { email: string; name?: string };
      subject: string;
      html: string;
      text: string;
      replyTo?: string;
    }) => Promise<unknown>;
  };

  INDEXNOW_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  NEXT_PUBLIC_SITE_URL?: string;
  NEXT_PUBLIC_GA_ID?: string;
  NEXT_PUBLIC_GOOGLE_ADS_ID?: string;
  NEXT_PUBLIC_GADS_LABEL_LEAD?: string;
  NEXT_PUBLIC_GADS_LABEL_AUDIT?: string;
  NEXT_PUBLIC_GADS_LABEL_LP_WEB_DESIGN?: string;
  NEXT_PUBLIC_GADS_LABEL_LP_FACEBOOK_WEB_DESIGN?: string;
  NEXT_PUBLIC_GADS_LABEL_CALL?: string;
  NEXT_PUBLIC_GADS_LABEL_BOOKING?: string;
  NEXT_PUBLIC_META_PIXEL_ID?: string;
  META_CAPI_ACCESS_TOKEN?: string;
  META_CAPI_TEST_EVENT_CODE?: string;
  NEXT_PUBLIC_BUSINESS_PHONE?: string;
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
