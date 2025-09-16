import { Metadata } from "next";

import "@/global.css";
import ThemeWrapper from "@/components/ThemeWrapper";

export const metadata: Metadata = {
  title: "HoMEwork: Freedom Looks Good On You",
  description:
    "HoMEwork is an organization committed to reducing recidivism for post-incarcerated individuals. By leveraging community resources, we establish a supportive peer mentoring environment that empowers San Diegans towards lasting change and success.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.png" type="image/png" sizes="png" />
      <body className="min-h-screen overflow-y-auto">
        <ThemeWrapper> {children} </ThemeWrapper>
      </body>
    </html>
  );
}
