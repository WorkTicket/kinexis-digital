# Conferbot acceptance

**Status: BLOCKED — Conferbot remains required for launch; isolated integration acceptance is pending.**

Fresh `npm run check` passed local Conferbot widget and webhook contract fixtures, including signature, redaction, idempotency, persistence fixture, partial-write retry and payload-size checks. This is not a live bot/D1 test.

**Owner actions:** provision nonproduction bot ID/secret, isolated `LEAD_DB` and migration, approved test notification destination, and webhook access. Authorize an isolated conversation lifecycle test covering consent, create/update, duplicate/retry, persistence, notification, and failure recovery. Verify no customer or production destination is contacted. Keep feature enabled in release policy; do not claim acceptance or silently disable it.
