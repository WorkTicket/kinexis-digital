# Consent verification

## Implemented policy

`CookieConsent.tsx` provides a pre-paint consent UI with Accept, Reject, Preferences, independent Analytics and Advertising controls, and a 180-day `SameSite=Lax` preference cookie. Unknown/invalid cookie and undecided states parse as denied. It emits `kinexis:consent` on writes. Keyboard focus handling, Escape-to-reject, and a preferences FAB are implemented; English and Spanish strings are present.

`boot.js` independently checks the analytics and ads bits before sending GA4 or Meta events. GA4 injects once after analytics consent and receives Google Consent Mode defaults/updates; automatic page views are disabled and application page views are explicit. Meta Pixel injects once after ads consent and uses its supported `fbq("consent","grant"|"revoke")` control. Withdrawal guards all future application dispatches, sends denied/revoke updates to already-loaded trackers, and clears tab-session attribution. Scripts are intentionally not removed: unloading a script does not undo initialization or cancel requests already sent. Reacceptance grants consent without reinjecting libraries or emitting duplicate initial page views.

RUM is a separate first-party endpoint and runs without consent as documented in `docs/engineering/RUM.md`; this is a policy decision, not a test proving legal adequacy. The page's consent copy describes analytics and advertising separately.

## Verification status

Playwright tests cover undecided/rejected states, independent analytics-only state, withdrawal after loading, tracker command/event guards, reacceptance without duplicate init/page view, and reload after withdrawal. These use test IDs and aborted/mock vendor endpoints; no request reaches a real analytics account. Keyboard implementation remains present, but these tests do not replace manual WCAG 2.2 AA verification or mobile consent usability review.

## Remaining risk

Already transmitted events and vendor requests cannot be recalled. Google/Meta account-side consent and conversion configuration cannot be independently verified without controlled owner access. RUM remains consent-independent first-party performance telemetry under the existing policy; legal/policy adequacy and retention need owner confirmation.
