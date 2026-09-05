"use client";

import { useRouter } from "@/i18n/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { ContactContent } from "@/content/contact";
import { useFormHoneypot } from "@/hooks/useFormHoneypot";
import {
  BOOKING_TIMEZONE_LABEL,
  dayHasBookableSlots,
  findFirstBookableDate,
  formatBookingSlotLabel,
  formatDateInBookingTz,
  getMonthGrid,
  isSlotBookable,
  listDaySlotTimes,
} from "@/lib/booking";
import { getAttributionPayload } from "@/lib/analytics/click-ids";
import { trackBookingClick } from "@/lib/analytics/events";
import {
  createMetaEventId,
  stashPendingConversion,
} from "@/lib/analytics/pending-conversion";
import { navigateAfterSubmit } from "@/lib/in-app-browser";
import { cn } from "@/lib/cn";

type Props = {
  content: ContactContent;
};

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const ALL_SLOT_TIMES = listDaySlotTimes();
const AVAILABILITY_POLL_MS = 4000;
const THANK_YOU_DELAY_MS = 1200;

function formatTimeLabel(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

function formatShortDateLabel(date: string): string {
  const parsed = new Date(`${date}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

export function StrategyCallBooking({ content: c }: Props) {
  const router = useRouter();
  const { honeypotProps, honeypotPayload } = useFormHoneypot();
  const submitLock = useRef(false);
  const b = c.booking;

  const now = useMemo(() => new Date(), []);
  const todayStr = formatDateInBookingTz(now);
  const initialDate = useMemo(
    () => findFirstBookableDate(now) ?? todayStr,
    [now, todayStr],
  );

  const initialYear = Number(initialDate.slice(0, 4));
  const initialMonth = Number(initialDate.slice(5, 7)) - 1;
  const minYear = Number(todayStr.slice(0, 4));
  const minMonth = Number(todayStr.slice(5, 7)) - 1;

  const [viewYear, setViewYear] = useState(initialYear);
  const [viewMonth, setViewMonth] = useState(initialMonth);
  const [selectedDate, setSelectedDate] = useState<string>(initialDate);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [bookedByDate, setBookedByDate] = useState<Record<string, string[]>>({});

  const grid = useMemo(() => getMonthGrid(viewYear, viewMonth), [viewYear, viewMonth]);
  const monthParam = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}`;

  const refreshAvailability = useCallback(async () => {
    try {
      const res = await fetch(`/api/booking/availability?month=${monthParam}`, {
        cache: "no-store",
      });
      if (!res.ok) return;
      const data = (await res.json()) as { booked?: Record<string, string[]> };
      if (data.booked && typeof data.booked === "object") {
        setBookedByDate(data.booked);
      }
    } catch {
      // Keep last known availability if the poll fails.
    }
  }, [monthParam]);

  useEffect(() => {
    void refreshAvailability();
    const id = window.setInterval(() => {
      void refreshAvailability();
    }, AVAILABILITY_POLL_MS);
    return () => window.clearInterval(id);
  }, [refreshAvailability]);

  useEffect(() => {
    if (!selectedTime) return;
    if (status === "submitting" || status === "success") return;
    const booked = bookedByDate[selectedDate] ?? [];
    if (booked.includes(selectedTime)) {
      setSelectedTime(null);
      setErrorMsg("That time was just booked. Please choose another slot.");
      setStatus("error");
    }
  }, [bookedByDate, selectedDate, selectedTime, status]);

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(Date.UTC(viewYear, viewMonth, 1))),
    [viewYear, viewMonth],
  );

  const canGoPrev = useMemo(() => {
    if (viewYear > minYear) return true;
    return viewMonth > minMonth;
  }, [viewYear, viewMonth, minYear, minMonth]);

  const goPrevMonth = () => {
    if (!canGoPrev) return;
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goNextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const selectDate = (date: string) => {
    const liveNow = new Date();
    const booked = bookedByDate[date] ?? [];
    if (!dayHasBookableSlots(date, liveNow, booked)) return;
    setSelectedDate(date);
    setSelectedTime(null);
    setErrorMsg("");
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      setErrorMsg(b.selectSlotError);
      setStatus("error");
      return;
    }
    if (submitLock.current) return;
    submitLock.current = true;

    setStatus("submitting");
    setErrorMsg("");

    try {
      const attribution = getAttributionPayload();
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          date: selectedDate,
          time: selectedTime,
          notes: notes.trim() || undefined,
          ...honeypotPayload,
          ...attribution,
        }),
      });

      if (!res.ok) {
        submitLock.current = false;
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || b.errorMessage);
      }

      const metaEventId = createMetaEventId("Schedule");
      stashPendingConversion({
        type: "booking",
        email,
        serviceInterest: "Strategy Call",
        formType: "contact",
        conversionAlreadyFired: true,
        metaEvent: "Schedule",
        metaEventId,
      });
      trackBookingClick({ email, metaEventId, serviceInterest: "Strategy Call" });

      const bookedDate = selectedDate;
      const bookedTime = selectedTime;

      setSelectedTime(null);
      setBookedByDate((prev) => {
        const existing = prev[bookedDate] ?? [];
        if (existing.includes(bookedTime)) return prev;
        return {
          ...prev,
          [bookedDate]: [...existing, bookedTime].sort(),
        };
      });

      setStatus("success");
      void refreshAvailability();
      window.setTimeout(() => {
        navigateAfterSubmit("/thank-you", router);
      }, THANK_YOU_DELAY_MS);
    } catch (err) {
      submitLock.current = false;
      setErrorMsg(err instanceof Error ? err.message : b.errorMessage);
      setStatus("error");
      void refreshAvailability();
    }
  };

  const selectedLabel = selectedTime
    ? formatBookingSlotLabel(selectedDate, selectedTime)
    : `${formatShortDateLabel(selectedDate)} · pick a time`;

  const liveNow = new Date();
  const selectedDayBooked = bookedByDate[selectedDate] ?? [];

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center justify-center gap-3 py-16 text-center"
      >
        <p className="text-xl font-semibold text-foreground">{b.confirmFlash}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-foreground">
          {b.title}
        </h2>
        <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted">
          {b.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative space-y-5">
        <input type="text" {...honeypotProps} />

        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:items-start md:gap-6">
          <div className="rounded-2xl bg-[color-mix(in_oklab,var(--foreground)_4%,transparent)] p-3 sm:p-3.5">
            <div className="mb-2 flex items-center justify-between">
              <button
                type="button"
                onClick={goPrevMonth}
                disabled={!canGoPrev}
                className="inline-flex h-11 w-11 items-center justify-center text-muted transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30 sm:h-9 sm:w-9"
                aria-label={b.prevMonth}
              >
                ‹
              </button>
              <p className="text-xs font-semibold text-foreground">{monthLabel}</p>
              <button
                type="button"
                onClick={goNextMonth}
                className="inline-flex h-11 w-11 items-center justify-center text-muted transition-colors hover:text-foreground sm:h-9 sm:w-9"
                aria-label={b.nextMonth}
              >
                ›
              </button>
            </div>

            <div className="grid grid-cols-7 gap-0.5 text-center text-[10px] font-semibold uppercase tracking-wide text-muted">
              {WEEKDAYS.map((day, i) => (
                <div key={`${day}-${i}`} className="py-1">
                  {day}
                </div>
              ))}
            </div>

            <div className="mt-0.5 grid min-h-[14.5rem] grid-cols-7 grid-rows-6 content-start gap-0.5 sm:min-h-[12.75rem]">
              {grid.map((date, i) => {
                if (!date) {
                  return <div key={`empty-${i}`} className="h-10 sm:h-8" />;
                }
                const booked = bookedByDate[date] ?? [];
                const bookable = dayHasBookableSlots(date, liveNow, booked);
                const selected = selectedDate === date;
                const isToday = date === todayStr;
                const dayNum = Number(date.slice(8, 10));

                return (
                  <button
                    key={date}
                    type="button"
                    disabled={!bookable}
                    onClick={() => selectDate(date)}
                    className={cn(
                      "h-10 rounded-[var(--radius-xs)] text-xs font-medium transition-colors sm:h-8",
                      !bookable && "cursor-not-allowed text-foreground/20",
                      bookable &&
                        !selected &&
                        "text-foreground/80 hover:bg-foreground/5",
                      selected && "bg-foreground font-semibold text-background",
                      isToday && !selected && "ring-1 ring-inset ring-foreground/30",
                    )}
                    aria-pressed={selected}
                    aria-label={date}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>

            <p className="mt-2.5 text-[11px] leading-snug text-muted">
              {BOOKING_TIMEZONE_LABEL} · 30-minute call
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <div className="mb-2 flex items-baseline justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {b.timeLabel}
                </p>
                <p className="text-[11px] text-muted">{b.timezoneNote}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-1.5">
                {ALL_SLOT_TIMES.map((time) => {
                  const taken = selectedDayBooked.includes(time);
                  const bookable = isSlotBookable(
                    selectedDate,
                    time,
                    liveNow,
                    selectedDayBooked,
                  );
                  const selected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      disabled={!bookable}
                      onClick={() => {
                        if (!bookable) return;
                        setSelectedTime(time);
                        setErrorMsg("");
                        if (status === "error") setStatus("idle");
                      }}
                      className={cn(
                        "min-h-11 rounded-[var(--radius-sm)] border px-1 py-2.5 text-xs font-medium transition-colors sm:min-h-0 sm:py-1.5 sm:text-[12px]",
                        (!bookable || taken) &&
                          "cursor-not-allowed border-transparent bg-foreground/[0.03] text-foreground/25 line-through",
                        bookable &&
                          !selected &&
                          "border-line text-foreground/80 hover:border-foreground/40 hover:text-foreground",
                        selected && "border-foreground bg-foreground text-background",
                      )}
                      aria-pressed={selected}
                      aria-label={
                        taken
                          ? `${formatTimeLabel(time)} (booked)`
                          : formatTimeLabel(time)
                      }
                    >
                      {formatTimeLabel(time)}
                    </button>
                  );
                })}
              </div>

              <p className="mt-2 min-h-[1.25rem] text-xs font-medium text-foreground">
                {selectedLabel}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="booking-name" className="form-label">
                  {c.nameLabel} <span className="text-foreground">*</span>
                </label>
                <input
                  type="text"
                  id="booking-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  placeholder={c.namePlaceholder}
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="booking-email" className="form-label">
                  {c.emailLabel} <span className="text-foreground">*</span>
                </label>
                <input
                  type="email"
                  id="booking-email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder={c.emailPlaceholder}
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="booking-notes" className="form-label">
                {b.notesLabel}
              </label>
              <textarea
                id="booking-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="form-textarea !min-h-[4.5rem]"
                placeholder={b.notesPlaceholder}
                rows={2}
                maxLength={2000}
              />
            </div>
          </div>
        </div>

        <div className="min-h-[2.75rem]">
          {status === "error" && errorMsg ? (
            <p
              role="alert"
              aria-live="assertive"
              className="rounded-[var(--radius-sm)] border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-600 dark:text-red-400"
            >
              {errorMsg}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted sm:max-w-xs">{b.footnote}</p>
          <Button
            type="submit"
            size="lg"
            disabled={status === "submitting" || !selectedTime}
            className="sm:min-w-[12rem]"
          >
            {status === "submitting" ? b.submittingButton : b.submitButton}
          </Button>
        </div>
      </form>
    </div>
  );
}
