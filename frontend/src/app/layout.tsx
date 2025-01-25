"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";
import "../global.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          colors={{
            primary_dark: "#F05629",
          }}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
