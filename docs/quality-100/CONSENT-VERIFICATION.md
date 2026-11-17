# Consent verification

## Implemented policy

`CookieConsent.tsx` provides a pre-paint consent UI with Accept, Reject, Preferences, independent Analytics and Advertising controls, and a 180-day `SameSite=Lax` preference cookie. Unknown/invalid cookie and undecided states parse as denied. It emits `kinexis:consent` on writes. Keyboard focus handling, Escape-to-reject, and a preferences FAB are implemented; English and Spanish strings are present.

`boot.js` independently checks the analytics and ads bits before sending GA4 or Meta events. GA4 injects once on first interaction/scroll after consent or a 45-second delay. Meta Pixel injects once after consent on interaction or timeout. The consent listener re-arms these loaders; loaded libraries are not unloaded, and withdrawal does not explicitly revoke vendor cookies or issue an opt-out command. Existing nonessential requests may therefore persist after withdrawal.

RUM is a separate first-party endpoint and runs without consent as documented in `docs/engineering/RUM.md`; this is a policy decision, not a test proving legal adequacy. The page's consent copy describes analytics and advertising separately.

## Verification status

Source inspected for no decision, accepted, rejected, preference changes, and return cookie parsing. Automated checks were not run in this audit record; no browser automation specifically exercised network requests across all consent states. Keyboard implementation is present, but this is not a manual WCAG 2.2 AA assessment. Mobile layout behavior was not independently measured here. There is no live GA4/Meta account verification.

## Remaining risk

Withdrawal after a tracker has loaded is not demonstrated to stop collection. Add deterministic browser tests with intercepted vendor requests for undecided, accept analytics only, accept ads only, reject, change each preference, and return visits; confirm one initialization and no duplicate page view. Obtain privacy/owner decision on RUM's consent-independent collection and vendor withdrawal semantics before release.
