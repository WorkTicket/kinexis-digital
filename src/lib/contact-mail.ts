import "server-only";

import { isPreviewSite, SITE } from "@/lib/site";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactEmailBinding = {
  send(message: {
    from: { email: string; name: string };
    to: string[];
    replyTo?: { email: string; name: string };
    subject: string;
    text: string;
    attachments: Array<{
      filename: string;
      content: ArrayBuffer;
      type: string;
      disposition: "attachment";
    }>;
  }): Promise<unknown>;
};

function parseRecipients(configured: string) {
  return configured
    .split(/[;,]/)
    .map((address) => address.trim().toLowerCase())
    .filter((address, index, all) => EMAIL_PATTERN.test(address) && all.indexOf(address) === index);
}

/**
 * Team inboxes for contact/review/lead alerts.
 * On the preview Worker, only CONTACT_PREVIEW_TO is used — never CONTACT_TO /
 * SITE.email — so preview form traffic cannot reach production inboxes.
 * Empty preview list means "do not send" (callers fail closed).
 */
export function contactRecipients() {
  if (isPreviewSite()) {
    return parseRecipients(process.env.CONTACT_PREVIEW_TO || "");
  }

  const configured = process.env.CONTACT_TO || process.env.CONTACT_TO_EMAIL || SITE.email;
  const recipients = parseRecipients(configured);
  return recipients.length > 0 ? recipients : [SITE.email];
}

/** True when preview isolation left no deliverable inbox. */
export function contactDeliveryBlocked() {
  return isPreviewSite() && contactRecipients().length === 0;
}

export function contactEmailBinding(): ContactEmailBinding | undefined {
  try {
    const env = getCloudflareContext().env as CloudflareEnv & { CONTACT_EMAIL?: ContactEmailBinding };
    return env.CONTACT_EMAIL;
  } catch {
    // Binding unavailable in plain Node.js development or test processes.
    return undefined;
  }
}

export function logDeliveryFailure(provider: string, error: unknown) {
  const details = error && typeof error === "object"
    ? error as { name?: unknown; code?: unknown; command?: unknown; responseCode?: unknown }
    : {};
  console.error("Contact delivery failed", {
    provider,
    name: typeof details.name === "string" ? details.name : undefined,
    code: typeof details.code === "string" ? details.code : undefined,
    command: typeof details.command === "string" ? details.command : undefined,
    responseCode: typeof details.responseCode === "number" ? details.responseCode : undefined,
  });
}
