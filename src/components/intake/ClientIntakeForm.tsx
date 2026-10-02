"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  COMPETITOR_COUNT,
  INTAKE_FACTS,
  INTAKE_HOWTO,
  INTAKE_NEXT,
  INTAKE_SECTIONS,
  INTAKE_STORAGE_KEY,
  competitorKey,
  eachIntakeField,
  type IntakeCheckField,
  type IntakeField,
  type IntakeTextField,
} from "@/content/client-intake";
import { useFormHoneypot } from "@/hooks/useFormHoneypot";

type Answers = Record<string, string | string[]>;

function todayLabel() {
  return new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function emptyAnswers(): Answers {
  const answers: Answers = {};
  eachIntakeField((field) => {
    if (field.type === "checks") answers[field.id] = [];
    else if (field.type === "text" || field.type === "textarea") {
      if (answers[field.id] == null) answers[field.id] = "";
    } else if (field.type === "competitors") {
      for (let index = 1; index <= COMPETITOR_COUNT; index += 1) {
        answers[competitorKey(index, "name")] = "";
        answers[competitorKey(index, "url")] = "";
        answers[competitorKey(index, "notes")] = "";
      }
    }
  });
  return answers;
}

function readDraft(): Answers | null {
  try {
    const raw = localStorage.getItem(INTAKE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    const draft: Answers = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === "string" && value.length <= 4000) draft[key] = value;
      else if (
        Array.isArray(value) &&
        value.every((item) => typeof item === "string") &&
        value.length <= 40
      ) {
        draft[key] = value;
      }
    }
    return draft;
  } catch {
    return null;
  }
}

function isFilled(field: IntakeField, answers: Answers): boolean {
  if (field.type === "note") return false;
  if (field.type === "competitors") {
    for (let index = 1; index <= COMPETITOR_COUNT; index += 1) {
      if (
        String(answers[competitorKey(index, "name")] ?? "").trim() ||
        String(answers[competitorKey(index, "url")] ?? "").trim() ||
        String(answers[competitorKey(index, "notes")] ?? "").trim()
      ) {
        return true;
      }
    }
    return false;
  }
  const value = answers[field.id];
  if (Array.isArray(value)) return value.length > 0;
  return String(value ?? "").trim().length > 0;
}

function progressCount(answers: Answers) {
  let total = 0;
  let filled = 0;
  eachIntakeField((field) => {
    if (field.type === "note") return;
    total += 1;
    if (isFilled(field, answers)) filled += 1;
  });
  return { total, filled };
}

function NextSteps() {
  return (
    <section className="intake-next" aria-labelledby="intake-next-title">
      <h2 id="intake-next-title">What happens next</h2>
      <div className="intake-next__grid">
        {INTAKE_NEXT.map((step) => (
          <article key={step.number} className="intake-next__card">
            <div className="intake-next__num">{step.number}</div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ClientIntakeForm() {
  const { honeypotProps, honeypotPayload } = useFormHoneypot();
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const dirty = useRef(false);
  const lock = useRef(false);
  const baseId = useId();

  useEffect(() => {
    document.documentElement.classList.add("intake-page");
    const draft = readDraft();
    setAnswers((current) => ({
      ...current,
      ...(draft ?? {}),
      signatureDate:
        (typeof draft?.signatureDate === "string" && draft.signatureDate) ||
        current.signatureDate ||
        todayLabel(),
    }));
    setReady(true);
    return () => document.documentElement.classList.remove("intake-page");
  }, []);

  useEffect(() => {
    if (!ready || !dirty.current) return;
    const timer = window.setTimeout(() => {
      try {
        localStorage.setItem(INTAKE_STORAGE_KEY, JSON.stringify(answers));
        setSaved(true);
      } catch {
        /* private mode or a full disk should not block the form */
      }
    }, 400);
    return () => window.clearTimeout(timer);
  }, [answers, ready]);

  const { total, filled } = useMemo(() => progressCount(answers), [answers]);
  const pct = total ? Math.round((filled / total) * 100) : 0;

  function setText(id: string, value: string) {
    dirty.current = true;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function toggleCheck(field: IntakeCheckField, option: string) {
    dirty.current = true;
    setAnswers((prev) => {
      const current = Array.isArray(prev[field.id]) ? (prev[field.id] as string[]) : [];
      if (current.includes(option)) {
        return { ...prev, [field.id]: current.filter((item) => item !== option) };
      }
      if (field.max && current.length >= field.max) return prev;
      return { ...prev, [field.id]: [...current, option] };
    });
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lock.current) return;
    if (!event.currentTarget.reportValidity()) return;
    lock.current = true;
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, ...honeypotPayload }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        lock.current = false;
        setErrorMsg(data.error || "We couldn't send that. Please try again.");
        setStatus("error");
        return;
      }
      try {
        localStorage.removeItem(INTAKE_STORAGE_KEY);
      } catch {
        /* ignore */
      }
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      lock.current = false;
      setErrorMsg("We couldn't send that. Check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <div className="intake">
      <header className="intake-hero">
        <div className="intake-wrap intake-hero__inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="intake-hero__logo"
            src="/assets/logos/kinexis-logo-on-dark.png"
            alt="Kinexis"
            width={180}
            height={28}
          />
          <p className="intake-kicker">Website Design &amp; SEO</p>
          <h1>Client Intake Questionnaire</h1>
          <p className="intake-lede">
            Tell us about your business, your customers and your goals so we can build a
            website that wins you more business and gets found on Google.
          </p>
        </div>
      </header>

      {status !== "success" ? (
        <div
          className="intake-progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          aria-label="Questionnaire progress"
        >
          <span style={{ width: `${pct}%` }} />
        </div>
      ) : null}

      <div className="intake-wrap intake-body">
        {status === "success" ? (
          <>
            <div className="intake-success">
              <h2>We have your questionnaire.</h2>
              <p>
                Your project contact will read through it, then set a discovery call to
                fill any gaps and line up scope and timing. You can close this page.
              </p>
            </div>
            <NextSteps />
          </>
        ) : (
          <form onSubmit={onSubmit}>
            <ul className="intake-facts">
              {INTAKE_FACTS.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>

            <section className="intake-howto" aria-labelledby="intake-howto-title">
              <h2 id="intake-howto-title">How to complete this form</h2>
              <ol>
                {INTAKE_HOWTO.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
              {saved ? <p className="intake-saved">Saved on this device until you submit.</p> : null}
            </section>

            {INTAKE_SECTIONS.map((section) => (
              <section key={section.number} className="intake-section" aria-labelledby={`${baseId}-${section.number}`}>
                <h2 id={`${baseId}-${section.number}`}>
                  <span className="intake-section__num">{section.number}</span>
                  <span>{section.title}</span>
                </h2>
                {section.intro ? <p className="intake-section__intro">{section.intro}</p> : null}
                <div className="intake-fields">
                  {section.rows.map((row, rowIndex) => (
                    <FieldRow
                      key={`${section.number}-${rowIndex}`}
                      row={row}
                      answers={answers}
                      onText={setText}
                      onToggle={toggleCheck}
                    />
                  ))}
                </div>
              </section>
            ))}

            <NextSteps />

            <div className="intake-submit">
              {errorMsg ? (
                <p className="intake-error" role="alert">
                  {errorMsg}
                </p>
              ) : null}
              <button type="submit" disabled={status === "submitting"}>
                {status === "submitting" ? "Sending…" : "Submit questionnaire"}
              </button>
            </div>
            <input type="text" {...honeypotProps} />
          </form>
        )}
        <p className="intake-confidential">Confidential — prepared for Kinexis project use only</p>
      </div>
    </div>
  );
}

function FieldRow({
  row,
  answers,
  onText,
  onToggle,
}: {
  row: IntakeField[];
  answers: Answers;
  onText: (id: string, value: string) => void;
  onToggle: (field: IntakeCheckField, option: string) => void;
}) {
  if (row.length === 1) {
    return <FieldBlock field={row[0]} answers={answers} onText={onText} onToggle={onToggle} />;
  }
  return (
    <div className="intake-row">
      {row.map((field) => (
        <FieldBlock
          key={"id" in field ? field.id : field.type}
          field={field}
          answers={answers}
          onText={onText}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

function FieldBlock({
  field,
  answers,
  onText,
  onToggle,
}: {
  field: IntakeField;
  answers: Answers;
  onText: (id: string, value: string) => void;
  onToggle: (field: IntakeCheckField, option: string) => void;
}) {
  if (field.type === "note") {
    return <p className="intake-note">{field.text}</p>;
  }
  if (field.type === "competitors") {
    return <Competitors answers={answers} onText={onText} />;
  }
  if (field.type === "checks") {
    return <CheckGroup field={field} answers={answers} onToggle={onToggle} />;
  }
  return <TextField field={field} value={String(answers[field.id] ?? "")} onText={onText} />;
}

function TextField({
  field,
  value,
  onText,
}: {
  field: IntakeTextField;
  value: string;
  onText: (id: string, value: string) => void;
}) {
  const inputId = `intake-${field.id}`;
  const hintId = field.hint ? `${inputId}-hint` : undefined;
  const shared = {
    id: inputId,
    name: field.id,
    value,
    required: field.required,
    autoComplete: field.autoComplete,
    "aria-describedby": hintId,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onText(field.id, event.target.value),
  };
  return (
    <div className="intake-field">
      <label className="intake-label" htmlFor={inputId}>
        {field.label}
        {field.required ? (
          <span className="intake-req" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>
      {field.hint ? (
        <span className="intake-hint" id={hintId}>
          {field.hint}
        </span>
      ) : null}
      {field.type === "textarea" ? (
        <textarea {...shared} rows={field.rows ?? 4} maxLength={4000} />
      ) : (
        <input
          {...shared}
          type={field.inputMode === "email" ? "email" : field.inputMode === "tel" ? "tel" : "text"}
          inputMode={field.inputMode}
          maxLength={500}
        />
      )}
    </div>
  );
}

function CheckGroup({
  field,
  answers,
  onToggle,
}: {
  field: IntakeCheckField;
  answers: Answers;
  onToggle: (field: IntakeCheckField, option: string) => void;
}) {
  const labelId = `intake-${field.id}-label`;
  const selected = Array.isArray(answers[field.id]) ? (answers[field.id] as string[]) : [];
  const atMax = Boolean(field.max && selected.length >= field.max);
  return (
    <div className="intake-group" role="group" aria-labelledby={labelId}>
      <div className="intake-labelbar" id={labelId}>
        <span className="intake-label">{field.label}</span>
        {field.hint ? <span className="intake-hint">{field.hint}</span> : null}
      </div>
      <div className={field.layout === "wrap" ? "intake-checks intake-checks--wrap" : "intake-checks"}>
        {field.options.map((option) => {
          const checked = selected.includes(option);
          return (
            <label key={option} className="intake-check">
              <input
                type="checkbox"
                name={field.id}
                value={option}
                checked={checked}
                disabled={!checked && atMax}
                onChange={() => onToggle(field, option)}
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function Competitors({
  answers,
  onText,
}: {
  answers: Answers;
  onText: (id: string, value: string) => void;
}) {
  return (
    <div className="intake-comp">
      <div className="intake-comp__head">
        <span>#</span>
        <span>Competitor name</span>
        <span>Website URL</span>
        <span>What they do well / where you beat them</span>
      </div>
      {Array.from({ length: COMPETITOR_COUNT }, (_, index) => {
        const row = index + 1;
        return (
          <div className="intake-comp__row" key={row}>
            <div className="intake-comp__index" aria-hidden="true">
              {row}
            </div>
            <CompetitorCell
              label={`Competitor ${row} name`}
              id={competitorKey(row, "name")}
              value={String(answers[competitorKey(row, "name")] ?? "")}
              onText={onText}
            />
            <CompetitorCell
              label={`Competitor ${row} website`}
              id={competitorKey(row, "url")}
              value={String(answers[competitorKey(row, "url")] ?? "")}
              onText={onText}
            />
            <CompetitorCell
              label={`Competitor ${row} advantage`}
              id={competitorKey(row, "notes")}
              value={String(answers[competitorKey(row, "notes")] ?? "")}
              onText={onText}
            />
          </div>
        );
      })}
    </div>
  );
}

function CompetitorCell({
  label,
  id,
  value,
  onText,
}: {
  label: string;
  id: string;
  value: string;
  onText: (id: string, value: string) => void;
}) {
  return (
    <label className="intake-comp__cell">
      <span className="intake-comp__label-text">{label}</span>
      <input
        name={id}
        value={value}
        maxLength={300}
        autoComplete="off"
        onChange={(event) => onText(id, event.target.value)}
      />
    </label>
  );
}
