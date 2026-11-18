export const META_CONTENT_NAME_BY_FORM = {
  home: "homepage_preview",
  contact: "contact_form",
  audit: "website_audit",
  "lp-get-a-website": "lp_get_a_website",
  "lp-phoenix-preview": "lp_phoenix_preview",
  "strategy-call": "strategy_call",
  intake: "intake_form",
  footer: "footer_form",
  "review-qr-tool": "review_qr_tool_preview",
} as const;

export type MetaLeadForm = keyof typeof META_CONTENT_NAME_BY_FORM;

export type MetaLeadEventInput = {
  eventId: string;
  eventSourceUrl: string;
  formPath: string;
  metaForm: MetaLeadForm;
  language: "en" | "es";
  email?: string;
  phone?: string;
  clientIp?: string;
  clientUserAgent?: string;
  fbp?: string;
  fbc?: string;
  consent: boolean;
  eventTime?: number;
};

type MetaLeadPayload = {
  event_name: "Lead";
  event_time: number;
  event_id: string;
  action_source: "website";
  event_source_url: string;
  user_data: Record<string, string | string[]>;
  custom_data: {
    content_name: string;
    form_path: string;
    lang: "en" | "es";
  };
};

export function normalizeMetaEmail(value: string) {
  return value.trim().toLowerCase();
}

export function normalizeMetaPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10) return `1${digits}`;
  return digits;
}

export async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function validEventInput(input: MetaLeadEventInput) {
  if (!input.consent || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(input.eventId)) {
    return false;
  }
  if (!Object.prototype.hasOwnProperty.call(META_CONTENT_NAME_BY_FORM, input.metaForm)) return false;
  if (!/^\/(?!\/)[A-Za-z0-9/_~.%\-]{0,240}$/.test(input.formPath) || input.formPath.includes("..")) {
    return false;
  }
  try {
    const url = new URL(input.eventSourceUrl);
    return url.protocol === "https:" &&
      (url.hostname === "www.kinexisdigital.com" || url.hostname === "kinexisdigital.com") &&
      url.pathname === input.formPath && !url.search && !url.hash;
  } catch {
    return false;
  }
}

export async function buildMetaLeadPayload(input: MetaLeadEventInput): Promise<MetaLeadPayload | null> {
  if (!validEventInput(input)) return null;

  const userData: MetaLeadPayload["user_data"] = {};
  const email = input.email ? normalizeMetaEmail(input.email) : "";
  const phone = input.phone ? normalizeMetaPhone(input.phone) : "";
  if (email) userData.em = [await sha256Hex(email)];
  if (phone.length >= 7 && phone.length <= 15) userData.ph = [await sha256Hex(phone)];
  if (input.clientIp) userData.client_ip_address = input.clientIp.slice(0, 64);
  if (input.clientUserAgent) userData.client_user_agent = input.clientUserAgent.slice(0, 1000);
  if (input.fbp && /^[A-Za-z0-9._:-]{1,512}$/.test(input.fbp)) userData.fbp = input.fbp;
  if (input.fbc && /^[A-Za-z0-9._:-]{1,512}$/.test(input.fbc)) userData.fbc = input.fbc;

  return {
    event_name: "Lead",
    event_time: input.eventTime ?? Math.floor(Date.now() / 1000),
    event_id: input.eventId,
    action_source: "website",
    event_source_url: input.eventSourceUrl,
    user_data: userData,
    custom_data: {
      content_name: META_CONTENT_NAME_BY_FORM[input.metaForm],
      form_path: input.formPath,
      lang: input.language,
    },
  };
}

export async function sendMetaLeadCapi(
  input: MetaLeadEventInput,
  pixelId: string,
  token: string,
  fetcher: typeof fetch = fetch,
): Promise<{ accepted: boolean; status?: number }> {
  if (!input.consent || !/^\d{5,20}$/.test(pixelId) || !token.trim()) {
    return { accepted: false };
  }

  const event = await buildMetaLeadPayload(input);
  if (!event) return { accepted: false };

  try {
    const response = await fetcher(`https://graph.facebook.com/v21.0/${pixelId}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [event], access_token: token }),
      signal: AbortSignal.timeout(4_000),
    });
    if (!response.ok) return { accepted: false, status: response.status };
    const result = await response.json() as { events_received?: unknown };
    return {
      accepted: typeof result.events_received === "number" && result.events_received > 0,
      status: response.status,
    };
  } catch {
    return { accepted: false };
  }
}
