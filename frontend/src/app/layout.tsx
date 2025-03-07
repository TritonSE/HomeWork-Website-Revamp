"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";

import NavBar from "../components/NavBar/NavBar";

import "../global.css";
import { Footer } from "@/components/Footer";
import { ArticleContextProvider } from "@/contexts/articleContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  return (
    <html lang="en">
      <body className="min-h-screen overflow-y-auto">
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
          <NavBar />
          <main className="min-h-screen pt-0">
            <ArticleContextProvider>{children}</ArticleContextProvider>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
