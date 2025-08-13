"use client";

import "@/global.css";
import { PageDataContextProvider } from "../../contexts/pageDataContext";

import { Footer } from "@/components/Footer";
import MobileNavBar from "@/components/NavBar/MobileNavBar";
import NavBar from "@/components/NavBar/NavBar";
import { ArticleContextProvider } from "@/contexts/articleContext";
import { useWindowSize } from "@/hooks/useWindowSize";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isMobile } = useWindowSize();
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  return (
    <>
      {isMobile ? <MobileNavBar /> : <NavBar />}
      <main className="min-h-screen pt-0">
        <ArticleContextProvider>
          <PageDataContextProvider>{children}</PageDataContextProvider>
        </ArticleContextProvider>
      </main>
      <Footer />
    </>
  );
}
