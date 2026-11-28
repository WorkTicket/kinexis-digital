import "server-only";

/**
 * Cloudflare Turnstile siteverify — gated by TURNSTILE_ENABLED=1.
 * Do not create keys here. Secret must never be logged or committed.
 */
export async function verifyTurnstileToken(token: string, remoteIp?: string): Promise<boolean> {
  if (String(process.env.TURNSTILE_ENABLED || "").trim() !== "1") return true;
  const secret = String(process.env.TURNSTILE_SECRET_KEY || "").trim();
  if (!secret) return false;
  if (!token || token.length > 2048) return false;

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
