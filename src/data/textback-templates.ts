export type TextbackTemplateSet = { trade: string; templates: string[] };

export const TEXTBACK_TEMPLATES: Record<string, TextbackTemplateSet> = {
  plumbing: {
    trade: "Plumbing",
    templates: [
      "Hi, this is {Business}. We just missed your call about a plumbing issue. Reply LEAK, DRAIN, or HEATER and the best number/time to reach you.",
      "Thanks for calling {Business}. We’re on a job and will call back shortly. If this is no water or a burst, reply URGENT.",
      "Got your missed call. For a water heater quote, reply with brand/age if you know it. We’ll text back a visit window.",
      "After-hours note from {Business}: leave the issue in a text and we’ll confirm first thing during staffed hours.",
      "If you called about a clog, reply DRAIN and your city. We’ll confirm whether we can get there today.",
    ],
  },
  hvac: {
    trade: "HVAC",
    templates: [
      "Hi from {Business} — missed your call. Reply NO COOL, NO HEAT, or QUOTE and your zip.",
      "We’re on a service call. Reply URGENT for no-cool/no-heat and we’ll prioritize a callback.",
      "For a system replacement quote, reply with home size/age if you have it. We’ll schedule a consult.",
      "After hours: text the symptom and we’ll confirm the first open tech window.",
      "Maintenance season: reply TUNEUP to ask about shoulder-season service.",
    ],
  },
  electrical: {
    trade: "Electrical",
    templates: [
      "Hi, {Business} missed your call. Reply PANEL, EV, or OUTLET and your city.",
      "If something smells like burning or breakers won’t reset, reply URGENT — don’t wait on email.",
      "EV charger installs: reply with panel amps if known and we’ll book a site check.",
      "After hours: text the issue; we’ll confirm during staffed hours.",
      "Licensed electrical work only — reply with the job type and we’ll confirm fit.",
    ],
  },
  roofing: {
    trade: "Roofing",
    templates: [
      "Hi from {Business}. Missed your call — reply LEAK, REPLACE, or STORM.",
      "Active leak? Reply URGENT and your address area. We’ll aim for a same-day inspection window when crews allow.",
      "Replacement quotes: reply with roof age/material if you know it.",
      "Storm follow-up: we document the roof; we don’t promise insurance outcomes.",
      "After hours: text photos of the damage if safe, and we’ll confirm next steps.",
    ],
  },
};
