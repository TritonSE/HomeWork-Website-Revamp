"use client";

import React, { useContext, useEffect, useState } from "react";

import Header from "@/components/Header";
import { PageDataContext } from "@/contexts/pageDataContext";

type HeaderData = {
  imageUrl: string;
  header: string;
  subheader: string;
  fancy?: boolean;
};

type ContentField = {
  text: string;
};

export default function HomePage() {
  const context = useContext(PageDataContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (context?.pageData && !context.loading) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50); // slight delay for fade-in trigger
      return () => {
        clearTimeout(timer);
      };
    }
  }, [context]);

  if (!context) return <div>Error: PageDataContext is not provided.</div>;

  const { pageData, loading } = context;
  if (loading) return null; // No loading message, just delay content appearance

  const homePageData = pageData.find((page) => page.pagename === "home");
  if (!homePageData) return <div>No home page data found.</div>;

  const headerField = homePageData.fields.find((field) => field.name === "header");
  const headerData = headerField?.data as HeaderData;

  const contentFields = homePageData.fields.filter((field) => field.name === "content");

  return (
    <div
      className={`transition-opacity duration-700 ease-in ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {headerField && (
        <Header
          imageUrl={headerData.imageUrl}
          header={headerData.header}
          subheader={headerData.subheader}
          fancy={headerData.fancy}
        />
      )}

      <div className="px-6 py-4">
        {contentFields.map((field, index) => {
          const content = field.data as ContentField;
          return (
            <p key={index} className="text-lg font-golos mb-4">
              {content.text}
            </p>
          );
        })}
      </div>
    </div>
  );
}
