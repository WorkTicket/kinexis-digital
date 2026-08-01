/**
 * Strategy-call booking rules shared by the calendar UI and /api/booking.
 * Times are interpreted in Central Time (America/Chicago).
 */

export const BOOKING_TIMEZONE = "America/Chicago";
/** Visitor-facing label — keep plain language, not the IANA id. */
export const BOOKING_TIMEZONE_LABEL = "Central Standard Time";
export const BOOKING_DURATION_MINUTES = 30;
/** Minimum lead time before a slot can be booked. */
export const BOOKING_MIN_LEAD_MS = 24 * 60 * 60 * 1000;
/** How far ahead visitors can book. */
export const BOOKING_MAX_DAYS_AHEAD = 45;
/** Weekday hours (inclusive start, exclusive end of last slot start). */
export const BOOKING_SLOT_START_HOUR = 9;
export const BOOKING_SLOT_END_HOUR = 17; // last slot starts at 16:30

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]\d|2[0-3]):(00|30)$/;

export type BookingSlot = {
  /** YYYY-MM-DD in BOOKING_TIMEZONE */
  date: string;
  /** HH:mm in BOOKING_TIMEZONE */
  time: string;
};

/** Format a Date as YYYY-MM-DD in the booking timezone. */
export function formatDateInBookingTz(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: BOOKING_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/** Convert a Toronto local date+time into a UTC Date. */
export function bookingSlotToUtc(date: string, time: string): Date {
  if (!DATE_RE.test(date) || !TIME_RE.test(time)) {
    return new Date(NaN);
  }

  const desired = `${date}T${time}:00`;
  // Start from treating the wall time as UTC, then correct by zone offset.
  let utcMs = Date.parse(`${desired}Z`);
  if (Number.isNaN(utcMs)) return new Date(NaN);

  for (let i = 0; i < 4; i++) {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: BOOKING_TIMEZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date(utcMs));

    const get = (type: Intl.DateTimeFormatPartTypes) =>
      parts.find((p) => p.type === type)?.value ?? "00";

    const hour = Number(get("hour")) % 24;
    const asUtcLabel = Date.parse(
      `${get("year")}-${get("month")}-${get("day")}T${String(hour).padStart(2, "0")}:${get("minute")}:${get("second")}Z`,
    );
    const desiredUtcLabel = Date.parse(`${desired}Z`);
    utcMs += desiredUtcLabel - asUtcLabel;
  }

  return new Date(utcMs);
}

export function isWeekdayInBookingTz(date: string): boolean {
  if (!DATE_RE.test(date)) return false;
  // Noon UTC on that calendar date is a safe probe for weekday in Toronto.
  const probe = bookingSlotToUtc(date, "12:00");
  if (Number.isNaN(probe.getTime())) return false;
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: BOOKING_TIMEZONE,
    weekday: "short",
  }).format(probe);
  return weekday !== "Sat" && weekday !== "Sun";
}

/** Half-hour slot starts for a given calendar day (may include past/too-soon slots). */
export function listDaySlotTimes(): string[] {
  const times: string[] = [];
  for (let hour = BOOKING_SLOT_START_HOUR; hour < BOOKING_SLOT_END_HOUR; hour++) {
    times.push(`${String(hour).padStart(2, "0")}:00`);
    times.push(`${String(hour).padStart(2, "0")}:30`);
  }
  return times;
}

export function isSlotBookable(
  date: string,
  time: string,
  now: Date = new Date(),
  bookedTimes?: ReadonlySet<string> | readonly string[],
): boolean {
  if (!DATE_RE.test(date) || !TIME_RE.test(time)) return false;
  if (!isWeekdayInBookingTz(date)) return false;
  if (!listDaySlotTimes().includes(time)) return false;

  if (bookedTimes) {
    const taken =
      bookedTimes instanceof Set ? bookedTimes : new Set(bookedTimes);
    if (taken.has(time)) return false;
  }

  const start = bookingSlotToUtc(date, time);
  if (Number.isNaN(start.getTime())) return false;

  const earliest = now.getTime() + BOOKING_MIN_LEAD_MS;
  if (start.getTime() < earliest) return false;

  const maxDate = new Date(now.getTime() + BOOKING_MAX_DAYS_AHEAD * 24 * 60 * 60 * 1000);
  const maxDay = formatDateInBookingTz(maxDate);
  if (date > maxDay) return false;

  return true;
}

export function validateBookingSlot(
  date: unknown,
  time: unknown,
  now: Date = new Date(),
): { ok: true; date: string; time: string; start: Date } | { ok: false; error: string } {
  if (typeof date !== "string" || typeof time !== "string") {
    return { ok: false, error: "Date and time are required." };
  }
  if (!DATE_RE.test(date)) {
    return { ok: false, error: "Invalid date." };
  }
  if (!TIME_RE.test(time)) {
    return { ok: false, error: "Invalid time." };
  }
  if (!isWeekdayInBookingTz(date)) {
    return { ok: false, error: "Strategy calls are available on weekdays only." };
  }
  if (!listDaySlotTimes().includes(time)) {
    return { ok: false, error: "That time slot is not available." };
  }

  const start = bookingSlotToUtc(date, time);
  if (Number.isNaN(start.getTime())) {
    return { ok: false, error: "Invalid date or time." };
  }

  const earliest = now.getTime() + BOOKING_MIN_LEAD_MS;
  if (start.getTime() < earliest) {
    return {
      ok: false,
      error: "Please choose a time at least 24 hours from now.",
    };
  }

  const maxDate = new Date(now.getTime() + BOOKING_MAX_DAYS_AHEAD * 24 * 60 * 60 * 1000);
  if (date > formatDateInBookingTz(maxDate)) {
    return { ok: false, error: "Please choose a date within the next 45 days." };
  }

  return { ok: true, date, time, start };
}

/** Human-readable slot for emails and UI. */
export function formatBookingSlotLabel(date: string, time: string): string {
  const start = bookingSlotToUtc(date, time);
  if (Number.isNaN(start.getTime())) return `${date} ${time}`;

  return new Intl.DateTimeFormat("en-US", {
    timeZone: BOOKING_TIMEZONE,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(start);
}

/** Calendar month grid helpers (Sunday-first). */
export function getMonthGrid(year: number, monthIndex: number): (string | null)[] {
  // monthIndex: 0-11
  const first = new Date(Date.UTC(year, monthIndex, 1));
  const daysInMonth = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
  // Weekday of the 1st in Toronto — use noon UTC probe for that calendar day
  const firstDateStr = `${year}-${String(monthIndex + 1).padStart(2, "0")}-01`;
  const probe = bookingSlotToUtc(firstDateStr, "12:00");
  const weekdayName = new Intl.DateTimeFormat("en-US", {
    timeZone: BOOKING_TIMEZONE,
    weekday: "short",
  }).format(probe);
  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  const startPad = weekdayMap[weekdayName] ?? first.getUTCDay();

  const cells: (string | null)[] = [];
  for (let i = 0; i < startPad; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(
      `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    );
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function dayHasBookableSlots(
  date: string,
  now: Date = new Date(),
  bookedTimes?: ReadonlySet<string> | readonly string[],
): boolean {
  if (!isWeekdayInBookingTz(date)) return false;
  return listDaySlotTimes().some((time) =>
    isSlotBookable(date, time, now, bookedTimes),
  );
}

/** Advance YYYY-MM-DD by one calendar day (Gregorian). */
export function addCalendarDays(date: string, days: number): string {
  const [y, m, d] = date.split("-").map(Number);
  const next = new Date(Date.UTC(y, m - 1, d + days));
  return `${next.getUTCFullYear()}-${String(next.getUTCMonth() + 1).padStart(2, "0")}-${String(next.getUTCDate()).padStart(2, "0")}`;
}

/** First bookable date on or after today in the booking timezone. */
export function findFirstBookableDate(now: Date = new Date()): string | null {
  let date = formatDateInBookingTz(now);
  for (let i = 0; i < BOOKING_MAX_DAYS_AHEAD; i++) {
    if (dayHasBookableSlots(date, now)) return date;
    date = addCalendarDays(date, 1);
  }
  return null;
}
