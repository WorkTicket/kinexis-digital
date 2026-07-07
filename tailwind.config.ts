import type { Config } from "tailwindcss";

// Brand accent constants — backgrounds/text use CSS vars in globals.css (dark mode only).
const BRAND = {
  NEON_CYAN: "#00d4ff",
  NEON_BLUE: "#0099cc",
} as const;

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-dark": "var(--bg-dark)",
        "bg-secondary": "var(--bg-secondary)",
        charcoal: "var(--charcoal)",
        "dark-gray": "var(--dark-gray)",
        panel: "var(--panel)",
        muted: "rgb(var(--muted-rgb) / <alpha-value>)",
        foreground: "var(--text)",
        "neon-cyan": BRAND.NEON_CYAN,
        "neon-blue": BRAND.NEON_BLUE,
        accent: BRAND.NEON_CYAN,
        border: "var(--border)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
      },
      fontFamily: {
        ubuntu: ["var(--font-ubuntu)", "sans-serif"],
      },
      maxWidth: {
        container: "1280px",
        readable: "42rem",
        "readable-sm": "32rem",
        intro: "65ch",
        "heading-h1": "16em",
        "heading-h2": "13em",
        "section-header": "42rem",
        subtitle: "48rem",
      },
      backgroundImage: {
        gradient: `linear-gradient(90deg, ${BRAND.NEON_BLUE}, ${BRAND.NEON_CYAN})`,
      },
      fontSize: {
        hero: ["clamp(2.125rem, 6vw, 4.5rem)", { lineHeight: "1.0", letterSpacing: "-0.02em" }],
        "hero-lg": ["clamp(3rem, 5.5vw, 4.5rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "hero-xl": ["clamp(3.75rem, 7vw, 7.5rem)", { lineHeight: "0.92", letterSpacing: "-0.02em" }],
        section: ["clamp(1.75rem, 4vw, 2.125rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "section-md": ["clamp(2rem, 3.5vw, 2.5rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "section-lg": ["clamp(2.5rem, 4.5vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        subheader: ["clamp(1.25rem, 2.5vw, 1.75rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "subheader-lg": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        body: ["clamp(1rem, 0.5vw + 0.95rem, 1.125rem)", { lineHeight: "1.7" }],
        "body-lg": ["clamp(1.0625rem, 0.5vw + 1rem, 1.25rem)", { lineHeight: "1.65" }],
      },
      spacing: {
        "hero-y": "clamp(6rem, 12vw, 7.5rem)",
        "section-y": "4.5rem",
        "section-y-md": "6rem",
        "section-y-lg": "7.5rem",
        "card-pad": "clamp(1.5rem, 4vw, 2rem)",
        "touch": "3rem",
        "grid-gap-sm": "var(--grid-gap-sm)",
        "grid-gap-lg": "var(--grid-gap-lg)",
      },
      minHeight: {
        touch: "3rem",
        "touch-lg": "3.5rem",
      },
      minWidth: {
        touch: "2.75rem",
        "touch-lg": "3.5rem",
      },
      transitionDuration: {
        premium: "600ms",
        luxury: "800ms",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
