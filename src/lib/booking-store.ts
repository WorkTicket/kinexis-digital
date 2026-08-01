import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
  bookingSlotToUtc,
  BOOKING_DURATION_MINUTES,
  BOOKING_MAX_DAYS_AHEAD,
} from "@/lib/booking";

interface KvBinding {
  get(key: string): Promise<string | null>;
  get(key: string, type: "json"): Promise<unknown>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

/** In-memory fallback for local Next.js (no KV). Shared across requests in one process. */
const memorySlots = new Map<string, number>();
const memoryDays = new Map<string, Set<string>>();

const SLOT_KEY_RE = /^booking:slot:(\d{4}-\d{2}-\d{2}):(\d{2}:\d{2})$/;

function slotKey(date: string, time: string): string {
  return `booking:slot:${date}:${time}`;
}

function dayKey(date: string): string {
  return `booking:day:${date}`;
}

function ttlSecondsForSlot(date: string, time: string): number {
  const start = bookingSlotToUtc(date, time);
  if (Number.isNaN(start.getTime())) return 0;
  const endMs = start.getTime() + BOOKING_DURATION_MINUTES * 60 * 1000;
  // Keep the reservation a day past the slot so late views still see it taken.
  const expireAt = endMs + 24 * 60 * 60 * 1000;
  return Math.max(60, Math.ceil((expireAt - Date.now()) / 1000));
}

function ttlSecondsForDayIndex(): number {
  return (BOOKING_MAX_DAYS_AHEAD + 2) * 24 * 60 * 60;
}

async function getKv(): Promise<KvBinding | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return (env?.RATE_LIMIT_KV as KvBinding | undefined) ?? null;
  } catch {
    return null;
  }
}

function pruneMemory() {
  const now = Date.now();
  for (const [key, expiresAt] of memorySlots) {
    if (expiresAt > now) continue;
    memorySlots.delete(key);
    const match = SLOT_KEY_RE.exec(key);
    if (!match) continue;
    const [, date, time] = match;
    const day = memoryDays.get(date);
    day?.delete(time);
    if (day && day.size === 0) memoryDays.delete(date);
  }
}

export async function getBookedTimesForDate(date: string): Promise<string[]> {
  const kv = await getKv();
  if (kv) {
    try {
      const raw = await kv.get(dayKey(date), "json");
      if (Array.isArray(raw)) {
        return raw.filter((t): t is string => typeof t === "string").sort();
      }
      return [];
    } catch {
      // fall through to memory
    }
  }

  pruneMemory();
  const times = memoryDays.get(date);
  return times ? [...times].sort() : [];
}

export async function getBookedTimesForDates(
  dates: string[],
): Promise<Record<string, string[]>> {
  const unique = [...new Set(dates.filter(Boolean))];
  const entries = await Promise.all(
    unique.map(async (date) => [date, await getBookedTimesForDate(date)] as const),
  );
  const out: Record<string, string[]> = {};
  for (const [date, times] of entries) {
    if (times.length > 0) out[date] = times;
  }
  return out;
}

export type ReserveSlotResult =
  | { ok: true }
  | { ok: false; reason: "taken" | "invalid" };

/**
 * Reserve a slot. Returns taken if another booking already holds it.
 * KV is eventually consistent — fine for low-volume strategy-call traffic.
 */
export async function reserveBookingSlot(
  date: string,
  time: string,
): Promise<ReserveSlotResult> {
  const ttl = ttlSecondsForSlot(date, time);
  if (!Number.isFinite(ttl) || ttl < 60) {
    return { ok: false, reason: "invalid" };
  }

  const kv = await getKv();
  if (kv) {
    try {
      const existing = await kv.get(slotKey(date, time));
      if (existing) return { ok: false, reason: "taken" };

      await kv.put(
        slotKey(date, time),
        JSON.stringify({ bookedAt: new Date().toISOString() }),
        { expirationTtl: ttl },
      );

      const current = await getBookedTimesForDate(date);
      if (!current.includes(time)) {
        const next = [...current, time].sort();
        await kv.put(dayKey(date), JSON.stringify(next), {
          expirationTtl: ttlSecondsForDayIndex(),
        });
      }

      return { ok: true };
    } catch (error) {
      console.error("Booking store KV error:", error);
      // Fall through to memory so local/dev still locks slots.
    }
  }

  pruneMemory();
  const key = slotKey(date, time);
  if (memorySlots.has(key)) return { ok: false, reason: "taken" };

  memorySlots.set(key, Date.now() + ttl * 1000);
  const day = memoryDays.get(date) ?? new Set<string>();
  day.add(time);
  memoryDays.set(date, day);
  return { ok: true };
}
