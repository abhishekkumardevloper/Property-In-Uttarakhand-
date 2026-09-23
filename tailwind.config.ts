import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#111111",
        "mountain-dark": "#0d1f17",
        forest: "#1e3a2a",
        "mountain-green": "#2d4a3e",
        stone: "#8a9296",
        ivory: "#f4ede0",
        mist: "#c8cdd0",
        gold: "#c9a84c",
        "gold-light": "#e8c97a",
        "gold-dark": "#a08030",
        "deep-charcoal": "#0a0a0a",
        "warm-gray": "#2a2a2a",
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 8rem)", { lineHeight: "0.95" }],
        "display-lg": ["clamp(2.5rem, 6vw, 6rem)", { lineHeight: "0.95" }],
        "display-md": ["clamp(2rem, 4vw, 4rem)", { lineHeight: "1.05" }],
        "display-sm": ["clamp(1.5rem, 3vw, 3rem)", { lineHeight: "1.1" }],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease forwards",
        "slide-up": "slideUp 0.8s ease forwards",
        "float": "float 6s ease-in-out infinite",
        "mist": "mist 8s ease-in-out infinite",
        "cursor-expand": "cursorExpand 0.3s ease forwards",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        mist: {
          "0%, 100%": { opacity: "0.3", transform: "translateX(0)" },
          "50%": { opacity: "0.7", transform: "translateX(20px)" },
        },
        cursorExpand: {
          from: { transform: "scale(1)" },
          to: { transform: "scale(1.5)" },
        },
      },
      backgroundImage: {
        "mountain-gradient": "linear-gradient(180deg, #0d1f17 0%, #1e3a2a 40%, #111111 100%)",
        "hero-gradient": "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.9) 100%)",
        "gold-gradient": "linear-gradient(135deg, #c9a84c 0%, #e8c97a 50%, #c9a84c 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1200": "1200ms",
      },
    },
  },
  plugins: [],
};

export default config;
