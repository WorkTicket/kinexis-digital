# PayPal sandbox acceptance

**Status: BLOCKED — PayPal remains required for launch; sandbox was not run.**

Fresh `npm run check:invoice-security` passed mocked order/capture integrity, association, ledger, route, import, reconciliation, and webhook fixtures. Output explicitly confirms PayPal HTTP was mocked and sandbox was NOT RUN.

**Owner actions:** provide authorized sandbox merchant/buyer, sandbox credentials through the approved secret channel, webhook verification configuration, and isolated callback URLs. Approve sandbox tests for success/capture, cancellation/failure, duplicate/replay, amount/currency/merchant/invoice mismatch, invalid signature, persistence failure and retry. Verify ledger state after each. No live charges or production configuration changes.
