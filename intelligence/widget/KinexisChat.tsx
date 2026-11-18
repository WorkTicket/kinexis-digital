"use client";

import { useEffect, useRef, useState } from "react";
import "./kinexis-chat.css";

type Message = { role: "user" | "assistant"; content: string };
type Session = { session_id: string; token: string };

const intro =
  "Hi! I’m KINEXIS Intelligence, your AI website and growth assistant. What would you like to improve about your business?";

export default function KinexisChat({ apiUrl }: { apiUrl: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: intro },
  ]);
  const [session, setSession] = useState<Session | null>(null);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [lead, setLead] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    service: "",
    budget: "",
    timeline: "",
    problem: "",
    contact_consent: false,
  });
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function getSession() {
    if (session) return session;
    const res = await fetch(`${apiUrl}/session`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        page_url: location.href,
        locale: navigator.language,
        referrer: document.referrer || null,
        consent: false,
      }),
    });
    if (!res.ok) throw Error("Could not connect");
    const s = (await res.json()) as Session;
    setSession(s);
    return s;
  }

  async function send(value = draft) {
    const text = value.trim();
    if (!text || busy) return;
    setBusy(true);
    setError("");
    setDraft("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    try {
      const s = await getSession();
      const res = await fetch(`${apiUrl}/chat`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...s, message: text }),
      });
      if (!res.ok) throw Error("Could not send message");
      const body = (await res.json()) as { answer: string };
      setMessages((m) => [...m, { role: "assistant", content: body.answer }]);
    } catch {
      setError("Connection issue. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const s = await getSession();
      const res = await fetch(`${apiUrl}/lead`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...s, ...form, request_next_steps: true }),
      });
      if (!res.ok) throw Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Could not submit. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const fields = [
    "name",
    "email",
    "phone",
    "company",
    "website",
    "service",
    "budget",
    "timeline",
    "problem",
  ] as const;

  return (
    <div className="ki-root">
      <button
        className="ki-launch"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={open}
      >
        {open ? "×" : "✦"} <span>{open ? "Close" : "Ask KINEXIS AI"}</span>
      </button>
      {open && (
        <section className="ki-panel" aria-label="KINEXIS AI assistant">
          <header className="ki-head">
            <div className="ki-logo">✦</div>
            <div>
              <strong>KINEXIS Intelligence</strong>
              <small>AI sales assistant · Available 24/7</small>
            </div>
            <button
              className="ki-icon"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
          </header>

          {submitted ? (
            <div className="ki-success">
              <h3>Thank you!</h3>
              <p>
                Your project details have been received. The KINEXIS team can
                review your request.
              </p>
              <button onClick={() => setSubmitted(false)}>Back to chat</button>
            </div>
          ) : lead ? (
            <form className="ki-form" onSubmit={submit}>
              <h3>Tell us about your project</h3>
              <p>Share a few details so our team can follow up.</p>
              {fields.map((k) => (
                <label key={k}>
                  {k === "problem"
                    ? "What are you looking to achieve?"
                    : k.charAt(0).toUpperCase() + k.slice(1)}
                  {k === "name" || k === "email" ? " *" : ""}
                  <input
                    type={k === "email" ? "email" : "text"}
                    required={k === "name" || k === "email"}
                    maxLength={k === "problem" ? 1000 : 250}
                    value={form[k]}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, [k]: e.target.value }))
                    }
                  />
                </label>
              ))}
              <label className="ki-consent">
                <input
                  type="checkbox"
                  required
                  checked={form.contact_consent}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      contact_consent: e.target.checked,
                    }))
                  }
                />{" "}
                I agree to be contacted about my request.
              </label>
              <div className="ki-actions">
                <button type="button" onClick={() => setLead(false)}>
                  Back
                </button>
                <button type="submit" disabled={busy}>
                  {busy ? "Sending…" : "Send my request"}
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="ki-messages" role="log" aria-live="polite">
                {messages.map((m, i) => (
                  <div className={"ki-bubble " + m.role} key={i}>
                    {m.content}
                  </div>
                ))}
                {busy && <div className="ki-bubble assistant">Thinking…</div>}
                <div ref={bottom} />
              </div>
              <div className="ki-quick">
                <button onClick={() => send("I need a new website")}>
                  New website
                </button>
                <button onClick={() => send("I want more leads")}>
                  More leads
                </button>
                <button onClick={() => setLead(true)}>Get a quote</button>
              </div>
              <form
                className="ki-compose"
                onSubmit={(e) => {
                  e.preventDefault();
                  void send();
                }}
              >
                <input
                  aria-label="Your message"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Ask about your business growth…"
                  maxLength={1500}
                />
                <button
                  type="submit"
                  disabled={busy || !draft.trim()}
                  aria-label="Send message"
                >
                  ➤
                </button>
              </form>
            </>
          )}
          {error && (
            <p className="ki-error" role="alert">
              {error}
            </p>
          )}
          <footer className="ki-foot">
            AI assistant · Please don&apos;t share sensitive information
          </footer>
        </section>
      )}
    </div>
  );
}
