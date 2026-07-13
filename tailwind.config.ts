import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Neo-brutalist "on paper" system — flat, high-contrast, no gradients.
        primary: "#00C2CB", // accent teal — main CTAs, links, focus
        secondary: "#FF2FD1", // accent magenta — secondary emphasis
        tertiary: "#FFD400", // accent yellow — highlights, XP/level, badges
        background: "#F2ECDD", // paper beige page background
        surface: "#FFFFFF",
        "surface-dim": "#F2ECDD",
        "surface-bright": "#FFFFFF",
        "surface-variant": "#EAE3CE",
        "surface-container": "#F7F3E7",
        "surface-container-low": "#F2ECDD",
        "surface-container-high": "#FFFFFF",
        "surface-container-highest": "#FFFFFF",
        "surface-container-lowest": "#F2ECDD",
        "surface-tint": "#00C2CB",
        "on-surface": "#0A0A0A",
        "on-surface-variant": "#4A463C",
        "on-background": "#0A0A0A",
        "on-primary": "#0A0A0A",
        "on-primary-container": "#003538",
        "on-secondary": "#FFFFFF",
        "on-secondary-container": "#3D0030",
        "on-tertiary": "#0A0A0A",
        "on-tertiary-container": "#3D3000",
        "primary-container": "#8FE9EE",
        "primary-fixed": "#8FE9EE",
        "primary-fixed-dim": "#00C2CB",
        "on-primary-fixed": "#0A0A0A",
        "on-primary-fixed-variant": "#003538",
        "secondary-container": "#FFC7F3",
        "secondary-fixed": "#FFC7F3",
        "secondary-fixed-dim": "#FF2FD1",
        "on-secondary-fixed": "#0A0A0A",
        "on-secondary-fixed-variant": "#3D0030",
        "tertiary-container": "#FFEA99",
        "tertiary-fixed": "#FFEA99",
        "tertiary-fixed-dim": "#FFD400",
        "on-tertiary-fixed-variant": "#3D3000",
        outline: "#000000",
        "outline-variant": "#000000",
        "inverse-surface": "#0A0A0A",
        "inverse-on-surface": "#F2ECDD",
        "inverse-primary": "#00C2CB",
        error: "#E8112D",
        "on-error": "#FFFFFF",
        "error-container": "#FFD6DC",
        "on-error-container": "#0A0A0A",
      },
      spacing: {
        "margin-desktop": "80px",
        "margin-mobile": "20px",
        gutter: "24px",
      },
      maxWidth: {
        "container-max": "1280px",
      },
      borderRadius: {
        DEFAULT: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
        full: "9999px",
      },
      boxShadow: {
        brutal: "6px 6px 0 #000",
        "brutal-sm": "3px 3px 0 #000",
        "brutal-lg": "10px 10px 0 #000",
        "brutal-xl": "14px 14px 0 #000",
        "brutal-press": "2px 2px 0 #000",
        "brutal-teal": "6px 6px 0 #00C2CB",
        "brutal-magenta": "6px 6px 0 #FF2FD1",
        "brutal-yellow": "6px 6px 0 #FFD400",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        blink: "blink 1s infinite",
        "fade-up": "fade-up 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
