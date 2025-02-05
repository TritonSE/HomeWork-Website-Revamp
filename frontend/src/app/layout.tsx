"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";

import "../global.css";
import { Footer } from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          colors={{
            primary_dark: "#F05629",
          }}
        >
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
