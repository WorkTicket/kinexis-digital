"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

type Copy = {
  title: string;
  sub: string;
  name: string;
  email: string;
  stars: string;
  quote: string;
  button: string;
  thanks: string;
  fill: string;
  error: string;
  network: string;
};

const EN: Copy = {
  title: "Leave a review on this site",
  sub: "Your words show up here after you send them. Prefer Trustpilot or Facebook? Use the buttons above.",
  name: "Your name",
  email: "Email",
  stars: "Star rating",
  quote: "Your review",
  button: "Post my review",
  thanks: "Thanks — your review is live on this page.",
  fill: "Please fill in the highlighted fields.",
  error: "Something went wrong. Please try again.",
  network: "Network error. Please try again.",
};

export default function SiteReviewForm({ copy = EN }: { copy?: Partial<Copy> }) {
  const text = { ...EN, ...copy };
  const router = useRouter();
  const [stars, setStars] = useState(5);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [msg, setMsg] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    let firstBad: HTMLElement | null = null;
    form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[required]").forEach((el) => {
      const ok = !!el.value.trim() && el.checkValidity();
      el.classList.toggle("invalid", !ok);
      el.setAttribute("aria-invalid", String(!ok));
      if (!ok && !firstBad) firstBad = el;
    });
    if (firstBad) {
      setMsg(text.fill);
      (firstBad as HTMLElement).focus();
      return;
    }

    const data = new FormData(form);
    if (String(data.get("_gotcha") ?? "").trim()) return;
    data.set("stars", String(stars));

    setBusy(true);
    setMsg("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.ok) {
        setDone(true);
        form.reset();
        setStars(5);
        router.refresh();
        return;
      }
      setMsg(body.error || text.error);
    } catch {
      setMsg(text.network);
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="site-review-form site-review-form--done" data-island="">
        <p className="form__msg is-ok" role="status">
          <span className="check" aria-hidden="true">✓</span>
          <b>{text.thanks}</b>
        </p>
        <button className="btn btn--ghost" type="button" onClick={() => { setDone(false); setMsg(""); }}>
          Write another
        </button>
      </div>
    );
  }

  return (
    <form className="form site-review-form" noValidate data-island="" onSubmit={submit}>
      <div className="site-review-form__intro">
        <h3>{text.title}</h3>
        <p className="muted">{text.sub}</p>
      </div>

      <fieldset className="site-review-form__stars">
        <legend>{text.stars}</legend>
        <div className="site-review-form__star-row" role="radiogroup" aria-label={text.stars}>
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              className={`site-review-form__star${stars >= value ? " is-on" : ""}`}
              aria-checked={stars === value}
              role="radio"
              onClick={() => setStars(value)}
            >
              <span aria-hidden="true">★</span>
              <span className="sr-only">{value} star{value === 1 ? "" : "s"}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <label className="field">
        <input type="text" name="name" placeholder=" " autoComplete="name" required maxLength={80} />
        <span>{text.name}</span>
      </label>
      <label className="field">
        <input type="email" name="email" placeholder=" " autoComplete="email" required maxLength={200} />
        <span>{text.email}</span>
      </label>
      <label className="field">
        <textarea name="quote" rows={4} placeholder=" " required minLength={12} maxLength={1200} />
        <span>{text.quote}</span>
      </label>

      <div hidden>
        <label>
          Leave blank
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button className={`btn btn--primary btn--lg${busy ? " is-loading" : ""}`} type="submit" disabled={busy}>
        {text.button}
      </button>
      {msg ? <p className="form__msg is-error" role="alert">{msg}</p> : <p className="form__msg" role="status" />}
    </form>
  );
}
