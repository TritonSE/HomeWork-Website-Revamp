"use client";

import "@/global.css";
import { Footer } from "@/components/Footer";
import NavBar from "@/components/NavBar/NavBar";
import { ArticleContextProvider } from "@/contexts/articleContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  return (
    <>
      <NavBar opaque={true} />
      <main className="min-h-screen pt-6">
        <ArticleContextProvider>{children}</ArticleContextProvider>
      </main>
      <Footer />
    </>
  );
}
