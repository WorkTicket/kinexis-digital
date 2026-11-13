import type { QA } from "@/lib/content";
import { GENERATED_COST_POSTS } from "@/data/cost-post-bodies";
import { GENERATED_PAGES_POSTS } from "@/data/pages-post-bodies";
import { LEGACY_SLUG_POST_BODIES } from "@/data/legacy-slug-post-bodies-en";
import { PILLAR_POSTS } from "@/data/pillar-posts";
import { PILLAR_POSTS_MORE } from "@/data/pillar-posts-more";

export type EnglishPostBody = {
  lead: string;
  sections: { h2: string; html: string }[];
  faqs?: QA[];
};

export const EN_POST_CONTENT: Record<string, EnglishPostBody> = {
  ...GENERATED_COST_POSTS,
  ...GENERATED_PAGES_POSTS,

  "missed-call-text-back-templates": {
    lead: "Missed-call text-back is optional and needs a dedicated business phone line. On Lead System or Plus, a second tracking number is $1/mo if you use one, plus carrier text rates. Carrier approval usually takes 10–15 days and is not guaranteed.",
    faqs: [
          {
                "q": "How long before missed-call texts start?",
                "a": "Activation is subject to carrier approval. Texting typically begins 10–15 days after approval; approval is not guaranteed."
          },
          {
                "q": "Is text-back included in every plan?",
                "a": "No. It is optional and needs a dedicated business phone line. On Lead System or Plus, a second tracking number is $1/mo if you use one, plus carrier text rates."
          }
    ],
    sections: [
          {
                "h2": "How Text-Back Works Here",
                "html": "<p>You are mid-job. The phone rings in the truck. You cannot answer. A short text that names your business and asks what they need is often enough to keep that caller from dialing the next company on Google.</p><p>On Lead System and Plus, missed-call text-back can message someone who called your tracking number—after carrier approval. You need a dedicated business line. A second tracking number is $1/mo if you use one. Carrier messaging rates may apply. Approval usually takes 10–15 days and is not guaranteed.</p><p>This page is copy-ready drafts by trade. It is not a software roundup for the head term “missed call text back.” Have a qualified compliance review before you send anything. Rough math on lost calls: <a href=\"/tools/missed-call-calculator\">missed-call calculator</a>. Why the wait exists: <a href=\"/blog/missed-call-text-delayed-10dlc\">why missed-call texts are delayed</a>.</p>"
          },
          {
                "h2": "Plumbing Templates",
                "html": "<p id=\"plumbing\">Use these as drafts. Have a qualified review for TCPA/compliance before publish.</p><ul><li><code>Hi, this is {Business}. We just missed your call about a plumbing issue. Reply LEAK, DRAIN, or HEATER and the best number/time to reach you.</code></li><li><code>Thanks for calling {Business}. We’re on a job and will call back shortly. If this is no water or a burst, reply URGENT.</code></li><li><code>Got your missed call. For a water heater quote, reply with brand/age if you know it. We’ll text back a visit window.</code></li><li><code>After-hours note from {Business}: leave the issue in a text and we’ll confirm first thing during staffed hours.</code></li><li><code>If you called about a clog, reply DRAIN and your city. We’ll confirm whether we can get there today.</code></li></ul>"
          },
          {
                "h2": "HVAC Templates",
                "html": "<p id=\"hvac\">Use these as drafts. Have a qualified review for TCPA/compliance before publish.</p><ul><li><code>Hi from {Business} — missed your call. Reply NO COOL, NO HEAT, or QUOTE and your zip.</code></li><li><code>We’re on a service call. Reply URGENT for no-cool/no-heat and we’ll prioritize a callback.</code></li><li><code>For a system replacement quote, reply with home size/age if you have it. We’ll schedule a consult.</code></li><li><code>After hours: text the symptom and we’ll confirm the first open tech window.</code></li><li><code>Maintenance season: reply TUNEUP to ask about shoulder-season service.</code></li></ul>"
          },
          {
                "h2": "Electrical Templates",
                "html": "<p id=\"electrical\">Use these as drafts. Have a qualified review for TCPA/compliance before publish.</p><ul><li><code>Hi, {Business} missed your call. Reply PANEL, EV, or OUTLET and your city.</code></li><li><code>If something smells like burning or breakers won’t reset, reply URGENT — don’t wait on email.</code></li><li><code>EV charger installs: reply with panel amps if known and we’ll book a site check.</code></li><li><code>After hours: text the issue; we’ll confirm during staffed hours.</code></li><li><code>Licensed electrical work only — reply with the job type and we’ll confirm fit.</code></li></ul>"
          },
          {
                "h2": "Roofing Templates",
                "html": "<p id=\"roofing\">Use these as drafts. Have a qualified review for TCPA/compliance before publish.</p><ul><li><code>Hi from {Business}. Missed your call — reply LEAK, REPLACE, or STORM.</code></li><li><code>Active leak? Reply URGENT and your address area. We’ll aim for a same-day inspection window when crews allow.</code></li><li><code>Replacement quotes: reply with roof age/material if you know it.</code></li><li><code>Storm follow-up: we document the roof; we don’t promise insurance outcomes.</code></li><li><code>After hours: text photos of the damage if safe, and we’ll confirm next steps.</code></li></ul>"
          },
          {
                "h2": "Garage Doors Templates",
                "html": "<p id=\"garage-doors\">Use these as drafts. Have a qualified review for TCPA/compliance before publish.</p><ul><li><code>Hi from {Business}. Missed your call — reply SPRING, OPENER, or NEW DOOR and your city.</code></li><li><code>We’re on a service call. Reply URGENT if the door won’t open or close and we’ll prioritize a callback.</code></li><li><code>Broken spring or cable: reply SPRING and whether the door is stuck open or closed.</code></li><li><code>New door quotes: reply with single/double and material if you know it.</code></li><li><code>After hours: text the issue; we’ll confirm the first open tech window.</code></li></ul>"
          },
          {
                "h2": "Painting Templates",
                "html": "<p id=\"painting\">Use these as drafts. Have a qualified review for TCPA/compliance before publish.</p><ul><li><code>Hi from {Business}. Missed your call — reply INTERIOR, EXTERIOR, or CABINETS and the best number/time.</code></li><li><code>Thanks for calling {Business}. We’re on a job and will call back shortly. Reply QUOTE if you want an estimate window.</code></li><li><code>For an exterior estimate, reply with stories/siding type if you know it and your city.</code></li><li><code>After hours: text the rooms or photos and we’ll confirm a walkthrough during staffed hours.</code></li><li><code>Cabinet refinishing: reply CABINETS and whether doors are still on the boxes.</code></li></ul>"
          },
          {
                "h2": "Remodeling Templates",
                "html": "<p id=\"remodeling\">Use these as drafts. Have a qualified review for TCPA/compliance before publish.</p><ul><li><code>Hi from {Business}. Missed your call — reply KITCHEN, BATH, or OTHER and a good time to talk.</code></li><li><code>We’re on a jobsite. Reply CONSULT if you want to book a walkthrough, and your city.</code></li><li><code>Bathroom remodels: reply with roughly how old the bath is if you know it.</code></li><li><code>After hours: text a short note about the project; we’ll confirm next steps during staffed hours.</code></li><li><code>Photos help — reply PHOTO and send a couple when you can.</code></li></ul>"
          },
          {
                "h2": "Landscaping Templates",
                "html": "<p id=\"landscaping\">Use these as drafts. Have a qualified review for TCPA/compliance before publish.</p><ul><li><code>Hi from {Business}. Missed your call — reply MAINT, DESIGN, or CLEANUP and your zip.</code></li><li><code>We’re on a crew. Reply QUOTE if you want an estimate window and your city.</code></li><li><code>Weekly maintenance: reply ROUTE and your neighborhood so we can check coverage.</code></li><li><code>Design/install: reply DESIGN and a short note about the project.</code></li><li><code>After hours: text the address and job type; we’ll confirm during staffed hours.</code></li></ul>"
          },
          {
                "h2": "Pool Care Templates",
                "html": "<p id=\"pool-care\">Use these as drafts. Have a qualified review for TCPA/compliance before publish.</p><ul><li><code>Hi from {Business}. Missed your call — reply ROUTE, GREEN, or REPAIR and your zip.</code></li><li><code>We’re on a route. Reply URGENT for a green pool or dead pump and we’ll prioritize a callback.</code></li><li><code>Weekly service: reply ROUTE and your neighborhood so we can check coverage.</code></li><li><code>Equipment: reply PUMP or HEATER and the brand if you know it.</code></li><li><code>After hours: text the issue; we’ll confirm the first open window.</code></li></ul>"
          },
          {
                "h2": "Pressure Washing Templates",
                "html": "<p id=\"pressure-washing\">Use these as drafts. Have a qualified review for TCPA/compliance before publish.</p><ul><li><code>Hi from {Business}. Missed your call — reply HOUSE, CONCRETE, or ROOF and your city.</code></li><li><code>We’re on a job. Reply QUOTE for an estimate and roughly what needs washing.</code></li><li><code>Driveways/sidewalks: reply CONCRETE and your zip.</code></li><li><code>Soft wash / roof algae: reply ROOF — we confirm method before booking.</code></li><li><code>After hours: text photos if you have them and we’ll confirm next steps.</code></li></ul>"
          },
          {
                "h2": "Window Cleaning Templates",
                "html": "<p id=\"window-cleaning\">Use these as drafts. Have a qualified review for TCPA/compliance before publish.</p><ul><li><code>Hi from {Business}. Missed your call — reply HOME, STOREFRONT, or ROUTE and your city.</code></li><li><code>We’re on a route. Reply QUOTE for a first-clean estimate and roughly how many panes if you know.</code></li><li><code>Storefronts: reply with the business address and preferred clean day.</code></li><li><code>Recurring cleans: reply MONTHLY or QUARTERLY and we’ll confirm openings.</code></li><li><code>After hours: text the address; we’ll confirm during staffed hours.</code></li></ul>"
          },
          {
                "h2": "Yard Care Templates",
                "html": "<p id=\"yard-care\">Use these as drafts. Have a qualified review for TCPA/compliance before publish.</p><ul><li><code>Hi from {Business}. Missed your call — reply MOW, CLEANUP, or PET and your street/area.</code></li><li><code>We’re on a route. Reply ROUTE if you want weekly lawn service and your zip.</code></li><li><code>Pet-waste: reply PET and how often you need stops.</code></li><li><code>Seasonal cleanup: reply CLEANUP and we’ll confirm the next open day.</code></li><li><code>After hours: text the address and service; we’ll confirm first thing.</code></li></ul>"
          },
          {
                "h2": "Compliance Note",
                "html": "<p>SMS templates need a qualified compliance review before you send them to customers. Consent, identification, and opt-out rules still apply.</p><p><a href=\"/pricing\">See Lead System and Plus</a> or <a href=\"/contact\">get a free preview</a>.</p>"
          }
    ],
  },

  ...LEGACY_SLUG_POST_BODIES,

  ...PILLAR_POSTS_MORE,
  ...PILLAR_POSTS,
};
