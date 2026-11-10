"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { REVIEW_QUOTE_MAX, REVIEW_QUOTE_MIN } from "@/lib/review-limits";

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
  tooShort: string;
  tooLong: string;
  error: string;
  network: string;
};

const EN: Copy = {
  title: "Leave a review on this site",
  sub: `Send a short review (${REVIEW_QUOTE_MAX} characters max). We read every submission before it appears here. Prefer Trustpilot or Facebook? Use the buttons above.`,
  name: "Your name",
  email: "Email",
  stars: "Star rating",
  quote: "Your review",
  button: "Submit my review",
  thanks: "Thanks — we received your review and will publish it after a quick check.",
  fill: "Please fill in the highlighted fields.",
  tooShort: `Please write at least ${REVIEW_QUOTE_MIN} characters.`,
  tooLong: `Please keep your review to ${REVIEW_QUOTE_MAX} characters or fewer.`,
  error: "Something went wrong. Please try again.",
  network: "Network error. Please try again.",
};

export default function SiteReviewForm({ copy = EN }: { copy?: Partial<Copy> }) {
  const text = { ...EN, ...copy };
  const router = useRouter();
  const [stars, setStars] = useState(5);
  const [quoteLen, setQuoteLen] = useState(0);
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

    const quoteField = form.querySelector<HTMLTextAreaElement>('textarea[name="quote"]');
    const quoteValue = quoteField?.value.trim() ?? "";
    if (quoteField) {
      if (quoteValue.length > 0 && quoteValue.length < REVIEW_QUOTE_MIN) {
        quoteField.classList.add("invalid");
        quoteField.setAttribute("aria-invalid", "true");
        if (!firstBad) firstBad = quoteField;
        setMsg(text.tooShort);
        firstBad.focus();
        return;
      }
      if (quoteValue.length > REVIEW_QUOTE_MAX) {
        quoteField.classList.add("invalid");
        quoteField.setAttribute("aria-invalid", "true");
        if (!firstBad) firstBad = quoteField;
        setMsg(text.tooLong);
        firstBad.focus();
        return;
      }
    }

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
        setQuoteLen(0);
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
        <div
          className="site-review-form__star-row"
          role="radiogroup"
          aria-label={text.stars}
          onKeyDown={(event) => {
            if (event.key !== "ArrowRight" && event.key !== "ArrowLeft" && event.key !== "Home" && event.key !== "End") return;
            event.preventDefault();
            const next =
              event.key === "Home" ? 1 :
              event.key === "End" ? 5 :
              event.key === "ArrowRight" ? Math.min(5, stars + 1) :
              Math.max(1, stars - 1);
            setStars(next);
            const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]');
            buttons[next - 1]?.focus();
          }}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              className={`site-review-form__star${stars >= value ? " is-on" : ""}`}
              aria-checked={stars === value}
              role="radio"
              tabIndex={stars === value ? 0 : -1}
              onClick={() => setStars(value)}
            >
              <span aria-hidden="true">★</span>
              <span className="sr-only">{`${value} star${value === 1 ? "" : "s"}`}</span>
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
      <label className="field field--quote">
        <textarea
          name="quote"
          rows={4}
          placeholder=" "
          required
          minLength={REVIEW_QUOTE_MIN}
          maxLength={REVIEW_QUOTE_MAX}
          onInput={(event) => setQuoteLen(event.currentTarget.value.length)}
        />
        <span>{text.quote}</span>
      </label>
      <p className={`site-review-form__count${quoteLen >= REVIEW_QUOTE_MAX ? " is-max" : ""}`} aria-live="polite">
        {quoteLen}/{REVIEW_QUOTE_MAX}
      </p>

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
