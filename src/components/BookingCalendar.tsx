"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { SITE } from "@/lib/site";

const TZ = "America/Chicago";
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const STEP = 30;
const OPEN = 9 * 60;
const LAST = 17 * 60 + 30;
const HORIZON = 45;

type Ymd = string;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function chicagoYmd(date = new Date()): Ymd {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

function addDays(ymd: Ymd, days: number): Ymd {
  const [y, m, d] = ymd.split("-").map(Number);
  const next = new Date(Date.UTC(y, m - 1, d + days));
  return `${next.getUTCFullYear()}-${pad(next.getUTCMonth() + 1)}-${pad(next.getUTCDate())}`;
}

function weekdayIndex(ymd: Ymd) {
  const label = new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "short" }).format(instant(ymd, "12:00"));
  return WEEKDAYS.indexOf(label as (typeof WEEKDAYS)[number]);
}

function instant(ymd: Ymd, hm: string) {
  const [y, m, d] = ymd.split("-").map(Number);
  const [hh, mm] = hm.split(":").map(Number);
  let utc = Date.UTC(y, m - 1, d, hh, mm);
  for (let i = 0; i < 3; i++) {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
    }).formatToParts(new Date(utc));
    const get = (type: string) => Number(parts.find((part) => part.type === type)?.value);
    const shown = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour") % 24, get("minute"));
    utc += Date.UTC(y, m - 1, d, hh, mm) - shown;
  }
  return new Date(utc);
}

function slots() {
  const times: string[] = [];
  for (let min = OPEN; min <= LAST; min += STEP) times.push(`${pad(Math.floor(min / 60))}:${pad(min % 60)}`);
  return times;
}

const TIMES = slots();

function labelTime(hm: string) {
  const [h, m] = hm.split(":").map(Number);
  return `${h % 12 || 12}:${pad(m)} ${h >= 12 ? "PM" : "AM"}`;
}

function labelDay(ymd: Ymd, locale = "en-US") {
  return new Intl.DateTimeFormat(locale, { timeZone: TZ, weekday: "long", month: "long", day: "numeric" }).format(instant(ymd, "12:00"));
}

function monthLabel(year: number, month: number, locale = "en-US") {
  return new Intl.DateTimeFormat(locale, { timeZone: TZ, month: "long", year: "numeric" }).format(instant(`${year}-${pad(month + 1)}-01`, "12:00"));
}

const BOOKING_EN = {
  fill: "Please fill in the highlighted fields.",
  mail: "Your email app should open with this request. If it does not, email",
  error: "Something went wrong. Please try again.",
  network: "Network error. Please try again.",
  requested: "Time requested",
  confirm: "We’ll confirm by email. If that time is taken, we’ll send the next open one.",
  prev: "Previous month",
  next: "Next month",
  chooseDay: "Choose a day",
  zone: "Weekdays, Central Time. Choose a time at least a day ahead.",
  noTimes: "No open times this day.",
  chooseTime: "Choose a time",
  at: "at",
  firstName: "First Name",
  email: "Email",
  phone: "Phone",
  business: "Trade or business",
  book: "Book This Time",
  days: "SMTWTFS",
  dateLocale: "en-US",
};

export type BookingCopy = typeof BOOKING_EN;

export default function BookingCalendar({ copy = BOOKING_EN }: { copy?: BookingCopy }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(timer);
  }, []);
  const today = useMemo(() => chicagoYmd(), []);
  const latest = useMemo(() => addDays(today, HORIZON), [today]);
  const [cursor, setCursor] = useState(() => {
    const [y, m] = today.split("-").map(Number);
    return { year: y, month: m - 1 };
  });
  const [day, setDay] = useState<Ymd | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [msg, setMsg] = useState<React.ReactNode>("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const cells = useMemo(() => {
    const count = new Date(cursor.year, cursor.month + 1, 0).getDate();
    const lead = weekdayIndex(`${cursor.year}-${pad(cursor.month + 1)}-01`);
    const blanks = Array.from({ length: lead }, () => null);
    const days = Array.from({ length: count }, (_, i) => `${cursor.year}-${pad(cursor.month + 1)}-${pad(i + 1)}`);
    return [...blanks, ...days];
  }, [cursor]);

  const openTimes = day ? TIMES.filter((hm) => instant(day, hm).getTime() >= now + 24 * 60 * 60 * 1000) : [];

  function canBook(ymd: Ymd) {
    if (ymd < today || ymd > latest) return false;
    const dow = weekdayIndex(ymd);
    if (dow === 0 || dow === 6) return false;
    return TIMES.some((hm) => instant(ymd, hm).getTime() >= now + 24 * 60 * 60 * 1000);
  }

  function shiftMonth(delta: number) {
    setCursor((current) => {
      const next = new Date(current.year, current.month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
  }

  function pickDay(ymd: Ymd) {
    setDay(ymd);
    setTime(null);
    setMsg("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!day || !time) return;
    const form = event.currentTarget;
    let firstBad: HTMLElement | null = null;
    form.querySelectorAll<HTMLInputElement>("[required]").forEach((el) => {
      const ok = !!el.value.trim() && el.checkValidity();
      el.classList.toggle("invalid", !ok);
      el.setAttribute("aria-invalid", String(!ok));
      if (!ok && !firstBad) firstBad = el;
    });
    if (firstBad) {
      setMsg(copy.fill);
      (firstBad as HTMLElement).focus();
      return;
    }
    const data = new FormData(form);
    if (String(data.get("_gotcha") ?? "").trim()) return;
    data.set("topic", "strategy-call");
    data.set("date", labelDay(day, copy.dateLocale));
    data.set("time", `${labelTime(time)} Central`);
    setBusy(true);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { Accept: "application/json" }, body: data });
      const body = await res.json().catch(() => ({})) as { error?: string };
      if (res.ok) {
        setDone(true);
        setMsg("");
        return;
      }
      if (res.status === 503) {
        const lines = [...data.entries()].filter((entry): entry is [string, string] => entry[0] !== "_gotcha" && typeof entry[1] === "string" && entry[1].trim() !== "").map(([key, value]) => `${key}: ${value}`).join("\n");
        window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent("Strategy call request")}&body=${encodeURIComponent(lines)}`;
        setMsg(<>{copy.mail} <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</>);
        return;
      }
      setMsg(body.error || copy.error);
    } catch {
      setMsg(copy.network);
    } finally {
      setBusy(false);
    }
  }

  if (done && day && time) {
    return (
      <div className="booking-cal booking-cal--done" data-island="">
        <span className="check" aria-hidden="true">✓</span>
        <h3>{copy.requested}</h3>
        <p>{labelDay(day, copy.dateLocale)} {copy.at} {labelTime(time)} Central.</p>
        <p className="muted">{copy.confirm}</p>
      </div>
    );
  }

  const atStart = cursor.year === Number(today.slice(0, 4)) && cursor.month === Number(today.slice(5, 7)) - 1;
  const end = latest.split("-").map(Number);
  const atEnd = cursor.year > end[0] || (cursor.year === end[0] && cursor.month >= end[1] - 1);

  return (
    <div className="booking-cal" data-island="">
      <div className="booking-cal__head">
        <button type="button" className="booking-cal__nav" onClick={() => shiftMonth(-1)} disabled={atStart} aria-label={copy.prev}>‹</button>
        <h3>{monthLabel(cursor.year, cursor.month, copy.dateLocale)}</h3>
        <button type="button" className="booking-cal__nav" onClick={() => shiftMonth(1)} disabled={atEnd} aria-label={copy.next}>›</button>
      </div>
      <div className="booking-cal__week" aria-hidden="true">
        {WEEKDAYS.map((name, index) => <span key={name}>{copy.days[index] ?? name.slice(0, 1)}</span>)}
      </div>
      <div className="booking-cal__days" role="group" aria-label={copy.chooseDay}>
        {cells.map((ymd, index) => ymd ? (
          <button
            key={ymd}
            type="button"
            className={`booking-cal__day${ymd === today ? " is-today" : ""}${ymd === day ? " is-selected" : ""}`}
            disabled={!canBook(ymd)}
            aria-pressed={ymd === day}
            aria-label={labelDay(ymd, copy.dateLocale)}
            onClick={() => pickDay(ymd)}
          >
            {Number(ymd.slice(8))}
          </button>
        ) : <span key={`blank-${index}`} />)}
      </div>
      <p className="booking-cal__zone">{copy.zone}</p>
      {day && (
        <div className="booking-cal__times">
          <p>{labelDay(day, copy.dateLocale)}</p>
          {openTimes.length === 0 ? <p className="muted">{copy.noTimes}</p> : (
            <div className="booking-cal__slots" role="group" aria-label={copy.chooseTime}>
              {openTimes.map((hm) => (
                <button key={hm} type="button" aria-pressed={hm === time} className={hm === time ? "is-selected" : ""} onClick={() => { setTime(hm); setMsg(""); }}>
                  {labelTime(hm)}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      {day && time && (
        <form className="form booking-cal__form" noValidate onSubmit={submit} onInput={(event) => (event.target as HTMLElement).classList.remove("invalid")}>
          <p className="booking-cal__picked">{labelDay(day, copy.dateLocale)} {copy.at} {labelTime(time)} Central</p>
          <label className="field"><input name="name" placeholder=" " autoComplete="given-name" required /><span>{copy.firstName}</span></label>
          <label className="field"><input type="email" name="email" placeholder=" " autoComplete="email" required /><span>{copy.email}</span></label>
          <label className="field"><input type="tel" name="phone" placeholder=" " autoComplete="tel" /><span>{copy.phone}</span></label>
          <label className="field"><input name="business" placeholder=" " /><span>{copy.business}</span></label>
          <div hidden>
            <label>
              Leave blank
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <button className={`btn btn--primary btn--lg${busy ? " is-loading" : ""}`} type="submit" disabled={busy}>{copy.book}</button>
          <p className="form__msg" role="status">{msg}</p>
        </form>
      )}
    </div>
  );
}
