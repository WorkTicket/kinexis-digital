"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import type { ContactContent } from "@/content/contact";
import { useFormHoneypot } from "@/hooks/useFormHoneypot";
import { getAttributionPayload } from "@/lib/analytics/click-ids";
import { stashPendingConversion } from "@/lib/analytics/pending-conversion";
import { trackBookingClick } from "@/lib/analytics/events";
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
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Props = {
  content: ContactContent;
  /** When true, omit outer card chrome (used inside ContactIntake). */
  embedded?: boolean;
};

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const ALL_SLOT_TIMES = listDaySlotTimes();
/** How often to refresh booked slots so other visitors see taken times quickly. */
const AVAILABILITY_POLL_MS = 4000;
/** Let the short success flash register before navigating. */
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

export default function StrategyCallBooking({ content: c, embedded = false }: Props) {
  const router = useRouter();
  const { honeypotProps, honeypotPayload } = useFormHoneypot();
  const b = c.booking;

  const now = useMemo(() => new Date(), []);
  const todayStr = formatDateInBookingTz(now);
  const initialDate = useMemo(() => findFirstBookableDate(now) ?? todayStr, [now, todayStr]);

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
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
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

  // If the selected time gets taken by someone else, clear it.
  // Skip while submitting/success so our own booking doesn't flash a red error.
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
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || b.errorMessage);
      }

      trackBookingClick();
      stashPendingConversion({
        type: "lead",
        email,
        serviceInterest: "Strategy Call",
        formType: "contact",
      });

      const bookedDate = selectedDate;
      const bookedTime = selectedTime;

      // Clear selection first so the "taken by someone else" effect never fires red.
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
        router.push("/thank-you");
      }, THANK_YOU_DELAY_MS);
    } catch (err) {
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
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neon-cyan/15 ring-1 ring-neon-cyan/30">
          <CheckCircle className="h-6 w-6 text-neon-cyan" strokeWidth={1.5} />
        </div>
        <p className="text-xl font-semibold text-neon-cyan">{b.confirmFlash}</p>
      </div>
    );
  }

  return (
    <div className={cn(!embedded && "rounded-2xl border border-surface bg-surface-raised p-5 md:p-6")}>
      <div className="mb-5">
        <h2 className="text-lg font-semibold tracking-tight text-white md:text-xl">
          {b.title}
        </h2>
        <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-text-secondary">
          {b.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative space-y-5">
        <input type="text" {...honeypotProps} />

        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:items-start md:gap-6">
          <div className="rounded-xl border border-white/[0.06] bg-bg-dark/30 p-3 sm:p-3.5">
            <div className="mb-2 flex items-center justify-between">
              <button
                type="button"
                onClick={goPrevMonth}
                disabled={!canGoPrev}
                className="inline-flex h-7 w-7 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                aria-label={b.prevMonth}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <p className="text-xs font-semibold text-white">{monthLabel}</p>
              <button
                type="button"
                onClick={goNextMonth}
                className="inline-flex h-7 w-7 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-white/[0.06] hover:text-white"
                aria-label={b.nextMonth}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-0.5 text-center text-[10px] font-semibold uppercase tracking-wide text-text-muted">
              {WEEKDAYS.map((day, i) => (
                <div key={`${day}-${i}`} className="py-1">
                  {day}
                </div>
              ))}
            </div>

            <div className="mt-0.5 grid h-[12.75rem] grid-cols-7 grid-rows-6 content-start gap-0.5">
              {grid.map((date, i) => {
                if (!date) {
                  return <div key={`empty-${i}`} className="h-8" />;
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
                      "h-8 rounded-md text-xs font-medium transition-colors",
                      !bookable && "cursor-not-allowed text-white/15",
                      bookable &&
                        !selected &&
                        "text-white/80 hover:bg-neon-cyan/10 hover:text-neon-cyan",
                      selected && "bg-neon-cyan font-semibold text-bg",
                      isToday && !selected && "ring-1 ring-inset ring-neon-cyan/35",
                    )}
                    aria-pressed={selected}
                    aria-label={date}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>

            <p className="mt-2.5 text-[11px] leading-snug text-text-muted">
              {BOOKING_TIMEZONE_LABEL} · 30-minute call
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <div className="mb-2 flex items-baseline justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  {b.timeLabel}
                </p>
                <p className="text-[11px] text-text-muted">{b.timezoneNote}</p>
              </div>

              <div className="grid grid-cols-4 gap-1.5">
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
                        "rounded-md border px-1 py-1.5 text-[11px] font-medium transition-colors sm:text-[12px]",
                        (!bookable || taken) &&
                          "cursor-not-allowed border-transparent bg-white/[0.02] text-white/20 line-through",
                        bookable &&
                          !selected &&
                          "border-subtle text-white/75 hover:border-neon-cyan/40 hover:text-white",
                        selected && "border-neon-cyan bg-neon-cyan/15 text-neon-cyan",
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

              <p className="mt-2 min-h-[1.25rem] text-xs font-medium text-neon-cyan/90">
                {selectedLabel}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="form-group !mb-0">
                <label htmlFor="booking-name" className="form-label !mb-1.5 !text-xs">
                  {c.nameLabel} <span className="text-neon-cyan">*</span>
                </label>
                <input
                  type="text"
                  id="booking-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input !py-2.5 !text-sm"
                  placeholder={c.namePlaceholder}
                  autoComplete="name"
                />
              </div>
              <div className="form-group !mb-0">
                <label htmlFor="booking-email" className="form-label !mb-1.5 !text-xs">
                  {c.emailLabel} <span className="text-neon-cyan">*</span>
                </label>
                <input
                  type="email"
                  id="booking-email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input !py-2.5 !text-sm"
                  placeholder={c.emailPlaceholder}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group !mb-0">
              <label htmlFor="booking-notes" className="form-label !mb-1.5 !text-xs">
                {b.notesLabel}
              </label>
              <textarea
                id="booking-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="form-textarea !min-h-[4.5rem] !py-2.5 !text-sm"
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
              className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-sm text-red-400"
            >
              {errorMsg}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 border-t border-white/[0.06] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-text-muted sm:max-w-xs">{b.footnote}</p>
          <Button
            type="submit"
            variant="primary"
            disabled={status === "submitting" || !selectedTime}
            className={cn(
              "sm:min-w-[12rem]",
              status === "submitting" && "cursor-not-allowed opacity-70",
            )}
          >
            {status === "submitting" ? b.submittingButton : b.submitButton}
          </Button>
        </div>
      </form>
    </div>
  );
}
