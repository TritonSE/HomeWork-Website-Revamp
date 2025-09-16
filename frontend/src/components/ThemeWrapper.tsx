"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      colors={{
        primary_dark: "#F05629",
        secondary_highlight_1: "#F05629",
        secondary_highlight_2: "#F05629",
      }}
      fonts={{
        primary: '"GolosText", sans-serif',
        secondary: "GolosText",
      }}
    >
      {children}
    </ThemeProvider>
  );
}
