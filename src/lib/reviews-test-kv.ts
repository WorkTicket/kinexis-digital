import "server-only";

/**
 * In-memory KV used by review and rate-limit route tests.
 * Production isolates never set REVIEWS_TEST_MEMORY, so this stays inert.
 */

export type ReviewsTestKv = {
  get(key: string): Promise<string | null>;
  get(key: string, type: "json"): Promise<unknown>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
};

let testKv: ReviewsTestKv | null = null;

export function reviewsTestMemoryEnabled() {
  return process.env.REVIEWS_TEST_MEMORY === "1";
}

export function setReviewsTestKv(kv: ReviewsTestKv | null) {
  if (!reviewsTestMemoryEnabled()) {
    throw new Error("Reviews test KV requires REVIEWS_TEST_MEMORY=1");
  }
  testKv = kv;
}

export function getReviewsTestKv(): ReviewsTestKv | null {
  if (!reviewsTestMemoryEnabled()) return null;
  return testKv;
}

/** Simple Map-backed KV for Node route harnesses. */
export function createMemoryReviewsKv(): ReviewsTestKv {
  const store = new Map<string, string>();
  async function get(key: string): Promise<string | null>;
  async function get(key: string, type: "json"): Promise<unknown>;
  async function get(key: string, type?: "json"): Promise<string | null | unknown> {
    const value = store.get(key) ?? null;
    if (type === "json") {
      if (value === null) return null;
      try {
        return JSON.parse(value) as unknown;
      } catch {
        return null;
      }
    }
    return value;
  }
  return {
    get,
    async put(key: string, value: string) {
      store.set(key, value);
    },
  };
}
