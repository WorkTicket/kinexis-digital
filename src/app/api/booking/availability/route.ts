import { NextResponse } from "next/server";
import {
  addCalendarDays,
  formatDateInBookingTz,
  getMonthGrid,
} from "@/lib/booking";
import { getBookedTimesForDates } from "@/lib/booking-store";

/**
 * GET /api/booking/availability?month=YYYY-MM
 * or ?date=YYYY-MM-DD
 * or ?from=YYYY-MM-DD&to=YYYY-MM-DD
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month");
    const date = searchParams.get("date");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    let dates: string[] = [];

    if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
      dates = [date];
    } else if (
      from &&
      to &&
      /^\d{4}-\d{2}-\d{2}$/.test(from) &&
      /^\d{4}-\d{2}-\d{2}$/.test(to) &&
      from <= to
    ) {
      let cursor = from;
      for (let i = 0; i < 62 && cursor <= to; i++) {
        dates.push(cursor);
        cursor = addCalendarDays(cursor, 1);
      }
    } else if (month && /^\d{4}-\d{2}$/.test(month)) {
      const year = Number(month.slice(0, 4));
      const monthIndex = Number(month.slice(5, 7)) - 1;
      dates = getMonthGrid(year, monthIndex).filter(
        (d): d is string => typeof d === "string",
      );
    } else {
      // Default: today → +45 days worth of calendar dates for the current month view.
      const today = formatDateInBookingTz(new Date());
      const year = Number(today.slice(0, 4));
      const monthIndex = Number(today.slice(5, 7)) - 1;
      dates = getMonthGrid(year, monthIndex).filter(
        (d): d is string => typeof d === "string",
      );
    }

    const booked = await getBookedTimesForDates(dates);
    return NextResponse.json(
      { booked },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error("Booking availability error:", error);
    return NextResponse.json({ booked: {} }, { status: 200 });
  }
}
