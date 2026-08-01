import { afterEach, describe, expect, it, vi } from "vitest";
import {
  BOOKING_MIN_LEAD_MS,
  bookingSlotToUtc,
  findFirstBookableDate,
  formatDateInBookingTz,
  isSlotBookable,
  isWeekdayInBookingTz,
  listDaySlotTimes,
  validateBookingSlot,
} from "@/lib/booking";

describe("booking helpers", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("lists half-hour weekday slots from 09:00 to 16:30", () => {
    const times = listDaySlotTimes();
    expect(times[0]).toBe("09:00");
    expect(times).toContain("12:30");
    expect(times.at(-1)).toBe("16:30");
    expect(times).not.toContain("17:00");
  });

  it("treats Saturday as non-weekday", () => {
    // 2026-08-01 is a Saturday
    expect(isWeekdayInBookingTz("2026-08-01")).toBe(false);
    expect(isWeekdayInBookingTz("2026-08-03")).toBe(true); // Monday
  });

  it("rejects slots sooner than 24 hours", () => {
    // Freeze "now" to a Tuesday morning Toronto time
    const now = bookingSlotToUtc("2026-08-04", "10:00");
    vi.setSystemTime(now);

    // Same-day afternoon — less than 24h
    expect(isSlotBookable("2026-08-04", "15:00", now)).toBe(false);

    // Next morning — still under 24h from 10:00
    expect(isSlotBookable("2026-08-05", "09:00", now)).toBe(false);

    // Exactly / after 24h window
    expect(isSlotBookable("2026-08-05", "10:00", now)).toBe(true);
    expect(isSlotBookable("2026-08-05", "10:30", now)).toBe(true);
  });

  it("validateBookingSlot returns a clear 24h error", () => {
    const now = bookingSlotToUtc("2026-08-04", "10:00");
    const result = validateBookingSlot("2026-08-04", "15:00", now);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toMatch(/24 hours/i);
    }
  });

  it("accepts a valid future weekday slot", () => {
    const now = bookingSlotToUtc("2026-08-04", "10:00");
    const result = validateBookingSlot("2026-08-06", "14:00", now);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.date).toBe("2026-08-06");
      expect(result.time).toBe("14:00");
      expect(result.start.getTime()).toBeGreaterThan(now.getTime() + BOOKING_MIN_LEAD_MS - 1);
    }
  });

  it("formatDateInBookingTz returns YYYY-MM-DD", () => {
    const d = bookingSlotToUtc("2026-08-06", "14:00");
    expect(formatDateInBookingTz(d)).toBe("2026-08-06");
  });

  it("findFirstBookableDate skips today when all slots are inside 24h", () => {
    const now = bookingSlotToUtc("2026-08-04", "10:00"); // Tuesday
    expect(findFirstBookableDate(now)).toBe("2026-08-05");
  });
});
