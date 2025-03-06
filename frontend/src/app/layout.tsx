"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";

import NavBar from "../components/NavBar/NavBar";
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
      <body className="min-h-screen overflow-y-auto bg-black text-white">
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
          <main className="min-h-screen pt-[120px]">
            {children}
            <div className="h-[2000px] bg-gray-900">Temporary Scrollable Content</div>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
