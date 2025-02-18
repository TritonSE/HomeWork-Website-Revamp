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
        primary_dark: "#F05629",
        secondary_highlight_1: "#F05629",
        secondary_highlight_2: "#F05629",
      },
      fontFamily: {
        golos: ['"GolosText"', "sans-serif"],
        manrope: ['"Manrope"', "sans-serif"],
      },
    },
    screens: {
      sm: "550px",
      md: "850px",
    },
  },
  plugins: [],
} satisfies Config;
