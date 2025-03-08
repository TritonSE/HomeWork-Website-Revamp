import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/api/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary_orange: "#F05629",
        primary_dark: "#F05629",
        secondary_highlight_1: "#F05629",
        secondary_highlight_2: "#F05629",
        text_bg: "#F3F3F3",
      },
      fontFamily: {
        golos: ['"GolosText"', "sans-serif"],
        manrope: ['"Manrope"', "sans-serif"],
        baskerville: ['"Baskerville"', "sans-serif"],
        "libre-baskerville": ["Libre Baskerville", "serif"],
      },
    },
    screens: {
      sm: "550px",
      md: "850px",
      md2: "900px",
      md3: "1005px",
      pillars: "1200px",
    },
  },
  plugins: [],
} satisfies Config;
