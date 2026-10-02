export type IntakeTextField = {
  type: "text" | "textarea";
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "email" | "tel" | "numeric" | "text";
  rows?: number;
};

export type IntakeCheckField = {
  type: "checks";
  id: string;
  label: string;
  hint?: string;
  options: string[];
  max?: number;
  layout: "stack" | "wrap";
};

export type IntakeCompetitorsField = { type: "competitors" };

export type IntakeNote = { type: "note"; text: string };

export type IntakeField =
  | IntakeTextField
  | IntakeCheckField
  | IntakeCompetitorsField
  | IntakeNote;

export type IntakeSection = {
  number: string;
  title: string;
  intro?: string;
  rows: IntakeField[][];
};

export const INTAKE_STORAGE_KEY = "kinexis-intake-draft-v1";

export const INTAKE_FACTS = [
  "Estimated time: 8–10 minutes",
  "No wrong answers",
  "Confidential",
] as const;

export const INTAKE_HOWTO = [
  "Select any field and type. Select a box to check it, and select it again to clear it.",
  "Short, rough notes are perfect. Not sure? Write “Not sure” and we’ll cover it together on our kickoff call.",
  "Submit at the bottom. Your answers go straight to your Kinexis project contact. Company, contact name, email, and signature are the only required fields.",
] as const;

export const INTAKE_NEXT = [
  {
    number: "1",
    title: "We review",
    text: "Your answers, competitors and current online presence.",
  },
  {
    number: "2",
    title: "Discovery call",
    text: "We fill any gaps and align on goals, scope and timeline.",
  },
  {
    number: "3",
    title: "Proposal & sitemap",
    text: "You receive a clear plan, page structure and project timeline.",
  },
] as const;

const text = (
  id: string,
  label: string,
  hint?: string,
  extra?: Partial<IntakeTextField>,
): IntakeTextField => ({
  type: "text",
  id,
  label,
  hint,
  ...extra,
});

const area = (
  id: string,
  label: string,
  hint?: string,
  rows = 4,
): IntakeTextField => ({
  type: "textarea",
  id,
  label,
  hint,
  rows,
});

const checks = (
  id: string,
  label: string,
  options: string[],
  layout: "stack" | "wrap",
  hint?: string,
  max?: number,
): IntakeCheckField => ({
  type: "checks",
  id,
  label,
  hint,
  options,
  layout,
  max,
});

export const INTAKE_SECTIONS: IntakeSection[] = [
  {
    number: "01",
    title: "Business information",
    rows: [
      [
        text("companyName", "Company / Legal Name", undefined, {
          required: true,
          autoComplete: "organization",
        }),
        text("tradingName", "Trading name / DBA"),
      ],
      [
        text("primaryContact", "Primary Contact", undefined, {
          required: true,
          autoComplete: "name",
        }),
        text("contactTitle", "Title / Role", undefined, {
          autoComplete: "organization-title",
        }),
      ],
      [
        text("email", "Email", undefined, {
          required: true,
          autoComplete: "email",
          inputMode: "email",
        }),
        text("phone", "Phone", undefined, {
          autoComplete: "tel",
          inputMode: "tel",
        }),
      ],
      [area("businessAddress", "Business Address", "Street, city, state / region, postal code, country", 3)],
      [
        text("yearFounded", "Year Founded", undefined, { inputMode: "numeric" }),
        text("employees", "Number of Employees"),
      ],
      [text("currentWebsite", "Current Website", "URL, if any")],
      [text("decisionMaker", "Final Decision-Maker")],
      [
        checks(
          "preferredContact",
          "Preferred Contact",
          ["Email", "Phone call", "Text / WhatsApp", "Video call"],
          "wrap",
        ),
      ],
      [text("bestTimes", "Best Days / Times", "And your time zone")],
      [
        area(
          "socialLinks",
          "Social Media & Profile Links",
          "Facebook, Instagram, LinkedIn, TikTok, YouTube, X, Pinterest…",
          3,
        ),
      ],
      [text("hearAbout", "How Did You Hear About Us?")],
    ],
  },
  {
    number: "02",
    title: "About your business",
    intro: "Help us understand what you do and what makes you the better choice.",
    rows: [
      [text("industry", "Industry / Niche"), text("businessType", "Business Type")],
      [
        checks("customersAre", "Customers Are", ["Consumers (B2C)", "Businesses (B2B)", "Both"], "wrap"),
      ],
      [
        area(
          "whatYouDo",
          "What does your business do?",
          "In 2–3 sentences, as if explaining it to a new customer.",
        ),
      ],
      [
        area(
          "topServices",
          "Your top products / services",
          "List up to 5 — put the ones you most want more of first.",
        ),
      ],
      [
        area(
          "differentiators",
          "What makes you different from competitors?",
          "Experience, pricing, guarantees, speed, specialties, awards…",
        ),
      ],
      [
        checks(
          "serviceArea",
          "Service Area",
          ["Local", "Regional", "National", "International", "Online only"],
          "wrap",
        ),
      ],
      [
        area(
          "citiesServed",
          "Cities / Regions Served",
          "List the places you want to attract customers from",
          3,
        ),
      ],
    ],
  },
  {
    number: "03",
    title: "Website goals",
    intro: "What should your new website achieve for the business?",
    rows: [
      [
        checks(
          "projectReasons",
          "Main reason for this project",
          [
            "Brand-new website (no site yet)",
            "Redesign / modernize existing site",
            "Generate more leads or calls",
            "Sell products online",
            "Rank higher on Google",
            "Look more credible / professional",
            "Rebrand or new identity",
            "Fix mobile experience",
            "Speed and performance",
          ],
          "stack",
          "Check all that apply",
        ),
      ],
      [
        checks(
          "visitorActions",
          "Top action you want visitors to take",
          [
            "Call us",
            "Fill out a contact form",
            "Request a quote",
            "Book an appointment",
            "Buy online",
            "Visit our location",
            "Sign up for newsletter",
            "Download a resource",
            "Message us on WhatsApp / chat",
          ],
          "stack",
          "Check up to 3",
          3,
        ),
      ],
      [
        text("leadsNow", "Leads / Sales per Month Now", "Rough number is fine"),
        text("leadsGoal", "Leads / Sales Goal", "In 12 months"),
      ],
      [area("successLooks", "What does success look like in 6–12 months?")],
      [area("notWorking", "What isn’t working with your current website or online presence?")],
    ],
  },
  {
    number: "04",
    title: "Target audience",
    intro: "The more clearly we see your ideal customer, the better the site will convert.",
    rows: [
      [
        area(
          "idealCustomer",
          "Describe your ideal customer",
          "Age, location, job, income, what they care about",
        ),
      ],
      [area("customerProblems", "What problems or questions do customers have before they buy?")],
      [
        checks(
          "ageRange",
          "Customer Age Range",
          ["Under 25", "25–34", "35–44", "45–54", "55–64", "65+"],
          "wrap",
        ),
      ],
      [
        checks(
          "findYou",
          "How Customers Find You Today",
          [
            "Google search",
            "Referrals",
            "Social media",
            "Paid ads",
            "Directories (Yelp, etc.)",
            "Walk-ins",
            "Email",
            "Other",
          ],
          "wrap",
        ),
      ],
    ],
  },
  {
    number: "05",
    title: "Competitors & market",
    intro:
      "Who are you up against? Include local rivals and the businesses that show up when you search for your own services on Google.",
    rows: [
      [{ type: "competitors" }],
      [area("admire", "Websites you admire (any industry) and why", "Layout, colors, feel, features…")],
      [area("dislike", "Websites you dislike and why")],
      [
        checks(
          "marketPosition",
          "Market Position",
          [
            "Premium / high-end",
            "Mid-market",
            "Affordable / value",
            "Fastest service",
            "Most experienced",
            "Most personal",
          ],
          "wrap",
        ),
      ],
    ],
  },
  {
    number: "06",
    title: "Brand & design preferences",
    rows: [
      [
        checks(
          "alreadyHave",
          "I Already Have",
          [
            "Logo files",
            "Brand guidelines",
            "Brand colors",
            "Brand fonts",
            "Photography",
            "Tagline / slogan",
          ],
          "wrap",
        ),
      ],
      [
        checks(
          "needHelp",
          "I Need Help With",
          [
            "Logo design",
            "Brand guidelines",
            "Color palette",
            "Photography",
            "Copywriting",
            "Video",
          ],
          "wrap",
        ),
      ],
      [
        text("brandColors", "Brand Colors", "Names or HEX codes"),
        text("colorsAvoid", "Colors to Avoid"),
      ],
      [
        checks(
          "personality",
          "Brand personality",
          [
            "Professional",
            "Modern",
            "Friendly",
            "Luxury",
            "Bold",
            "Minimal",
            "Playful",
            "Trustworthy",
            "Technical",
            "Creative",
            "Natural / eco",
            "Traditional",
          ],
          "stack",
          "Choose up to 4",
          4,
        ),
      ],
      [
        checks(
          "designStyle",
          "Design Style",
          [
            "Clean & minimal",
            "Bold & dynamic",
            "Corporate",
            "Dark / high-contrast",
            "Editorial",
            "Warm & organic",
          ],
          "wrap",
        ),
      ],
      [
        checks(
          "tone",
          "Tone of Voice",
          ["Formal", "Conversational", "Expert / authoritative", "Witty / playful"],
          "wrap",
        ),
      ],
    ],
  },
  {
    number: "07",
    title: "Website structure & features",
    intro: "Check everything you need. If you’re not sure, check it and we’ll advise.",
    rows: [
      [
        checks(
          "pages",
          "Pages",
          [
            "Home",
            "About us",
            "Services (overview)",
            "Individual service pages",
            "Portfolio / gallery",
            "Testimonials / reviews",
            "Blog / news",
            "FAQ",
            "Contact",
            "Team",
            "Pricing",
            "Locations",
            "Online shop",
            "Booking",
            "Resources / downloads",
            "Careers",
            "Privacy / terms",
            "Landing pages",
          ],
          "stack",
        ),
      ],
      [
        checks(
          "features",
          "Features",
          [
            "Contact form",
            "Online booking",
            "E-commerce / payments",
            "Live chat / chatbot",
            "Newsletter sign-up",
            "Google Maps",
            "Photo / video gallery",
            "Reviews integration",
            "Client login / portal",
            "Multiple languages",
            "Social media feed",
            "CRM integration",
            "Quote calculator",
            "Click-to-call buttons",
            "Accessibility (ADA / WCAG)",
            "Cookie consent",
            "Other (tell us in Section 12)",
          ],
          "stack",
        ),
      ],
    ],
  },
  {
    number: "08",
    title: "Content & assets",
    rows: [
      [
        checks(
          "whoUpdates",
          "Who Updates the Site",
          ["I will", "Kinexis manages it", "Not sure"],
          "wrap",
          "After launch",
        ),
      ],
      [
        checks(
          "copyBy",
          "Website Copy Written By",
          ["Me / my team", "Kinexis", "A combination", "Not sure"],
          "wrap",
        ),
      ],
      [
        checks(
          "photos",
          "Professional Photos / Video",
          ["Already have", "Need photoshoot", "Need stock imagery", "Not sure"],
          "wrap",
        ),
      ],
      [
        checks(
          "assets",
          "Assets Available",
          [
            "Team photos",
            "Product photos",
            "Videos",
            "Testimonials",
            "Case studies",
            "Awards / certifications",
            "Price list",
            "Product catalog",
          ],
          "wrap",
        ),
      ],
    ],
  },
  {
    number: "09",
    title: "SEO & digital marketing",
    intro:
      "This tells us how to get your site found on day one and where to focus ongoing growth.",
    rows: [
      [
        area(
          "keywords",
          "Top keywords or phrases customers would search to find you",
          "e.g. “emergency plumber Austin” — list 5–10",
        ),
      ],
      [area("locationsRank", "Locations to Rank In", "Cities, regions or countries", 3)],
      [
        checks(
          "rankingToday",
          "Google Ranking Today",
          ["Never checked", "Page 1 for some terms", "Not showing up", "Not sure"],
          "wrap",
        ),
      ],
      [
        checks(
          "accounts",
          "Accounts You Already Have",
          [
            "Google Business Profile",
            "Google Analytics",
            "Search Console",
            "Tag Manager",
            "Meta / Facebook Pixel",
            "Google Ads",
            "Meta Ads",
            "Email platform",
            "CRM",
            "None / not sure",
          ],
          "wrap",
        ),
      ],
      [text("gbpLink", "Google Business Profile Link", "URL, if any")],
      [text("reviews", "Reviews & Average Rating", "Count and stars")],
      [text("crmTool", "Email / CRM Tool Used", "e.g. Mailchimp, HubSpot")],
      [text("adsBudget", "Paid Ads Budget / Month", "If any")],
      [
        checks(
          "reviewPlatforms",
          "Review Platforms",
          ["Google", "Yelp", "Facebook", "Trustpilot", "BBB", "Industry-specific"],
          "wrap",
        ),
      ],
      [
        checks(
          "ongoing",
          "Interested In Ongoing",
          [
            "Monthly SEO",
            "Local SEO / Google Business",
            "Content / blog writing",
            "Paid ads management",
            "Social media",
            "Setup only for now",
          ],
          "wrap",
        ),
      ],
      [
        area(
          "agencyHistory",
          "Have you worked with an SEO or marketing agency before?",
          "What worked, what didn’t?",
        ),
      ],
    ],
  },
  {
    number: "10",
    title: "Timeline & budget",
    intro: "Honest ranges help us recommend the right scope — nothing here is a commitment.",
    rows: [
      [text("launchDate", "Target Launch Date", "Ideal date")],
      [text("deadline", "Event or Deadline Driving It")],
      [
        checks(
          "investment",
          "Website Investment",
          [
            "Under $2,500",
            "$2,500–$5,000",
            "$5,000–$10,000",
            "$10,000–$25,000",
            "$25,000+",
            "Not sure",
          ],
          "wrap",
        ),
      ],
      [
        checks(
          "monthlyBudget",
          "Monthly Budget",
          ["Under $250", "$250–$500", "$500–$1,000", "$1,000–$2,500", "$2,500+"],
          "wrap",
          "Hosting, maintenance, SEO",
        ),
      ],
    ],
  },
  {
    number: "11",
    title: "Technical & access",
    intro:
      "For your security, please never write passwords or logins here — we’ll send a secure way to share access after kickoff.",
    rows: [
      [
        text("domain", "Domain Name", "e.g. yourcompany.com"),
        text("registrar", "Domain Registrar", "GoDaddy, Namecheap…"),
      ],
      [
        text("hosting", "Current Hosting", "Provider, if any"),
        text(
          "cms",
          "Current website platform",
          "What the site runs on today, if you have one",
        ),
      ],
      [
        checks(
          "emailBy",
          "Business Email By",
          ["Google Workspace", "Microsoft 365", "Hosting provider", "Other / none"],
          "wrap",
        ),
      ],
      [
        checks(
          "protectRankings",
          "Current Site Has Traffic or Rankings We Must Protect?",
          ["Yes", "No", "Not sure"],
          "wrap",
        ),
      ],
      [
        checks(
          "compliance",
          "Compliance Needs",
          ["ADA / accessibility", "GDPR / privacy", "HIPAA", "PCI (payments)", "None / not sure"],
          "wrap",
        ),
      ],
      [
        area(
          "tools",
          "Tools to connect to the website",
          "Booking, CRM, payments, email, accounting, inventory…",
          3,
        ),
      ],
    ],
  },
  {
    number: "12",
    title: "Final thoughts & authorization",
    rows: [
      [
        area(
          "anythingElse",
          "Anything else we should know?",
          "Concerns, must-haves, dealbreakers, past experiences…",
        ),
      ],
      [
        {
          type: "note",
          text: "By signing below, I confirm the information provided is accurate to the best of my knowledge and authorize Kinexis to use it to plan my website project.",
        },
      ],
      [
        text("authName", "Full Name", undefined, { autoComplete: "name" }),
        text("authTitle", "Title", undefined, { autoComplete: "organization-title" }),
      ],
      [
        text("signature", "Signature", "Type your name", {
          required: true,
          autoComplete: "name",
        }),
        text("signatureDate", "Date"),
      ],
    ],
  },
];

export const COMPETITOR_COUNT = 5;

export function competitorKey(index: number, part: "name" | "url" | "notes"): string {
  return `competitor${index}${part[0].toUpperCase()}${part.slice(1)}`;
}

export function eachIntakeField(visit: (field: IntakeField) => void) {
  for (const section of INTAKE_SECTIONS) {
    for (const row of section.rows) {
      for (const field of row) visit(field);
    }
  }
}
