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
      },
      fontFamily: {
        golos: ['"GolosText"', "sans-serif"],
        manrope: ['"Manrope"', "sans-serif"],
        baskerville: ['"Baskerville"', "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
