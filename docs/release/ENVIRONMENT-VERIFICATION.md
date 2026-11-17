# Environment verification

**Status: BLOCKED.** No production configuration was read or changed.

Local `npm run check` passed, including the production search/deploy preflight contract; production deployment fails closed when build-time analytics IDs are missing or malformed. This verifies local logic only. No analytics account, Worker, D1, KV, PayPal, Conferbot, notification provider, monitoring, or production secret was accessed in this session.

**Owner actions:** supply an approved isolated preview environment and test destinations; document runtime bindings versus build-time variables for GA4, Meta, Worker, D1, KV, PayPal, Conferbot, lead notifications, canonical site URL, and monitoring; confirm staging does not share production D1/billing or customer-facing notifications. Never place secrets in reports or `NEXT_PUBLIC_` variables.
