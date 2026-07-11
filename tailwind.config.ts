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
        accent: "var(--accent)",
        border: "var(--border)",
        surface: {
          base: "var(--surface-base)",
          raised: "var(--surface-raised)",
          glass: "var(--surface-glass)",
          hover: "var(--surface-hover)",
          active: "var(--surface-active)",
        },
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
      },
      borderColor: {
        subtle: "var(--border-subtle)",
        surface: "var(--border-default)",
        strong: "var(--border-strong)",
      },
      divideColor: {
        subtle: "var(--border-subtle)",
        surface: "var(--border-default)",
        strong: "var(--border-strong)",
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
      spacing: {
        "hero-y": "clamp(6rem, 12vw, 7.5rem)",
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
