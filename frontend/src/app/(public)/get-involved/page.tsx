"use client";

import { Button } from "@tritonse/tse-constellation";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

import Header from "@/components/Header";
import { PageDataContext } from "@/contexts/pageDataContext";
import { useWindowSize } from "@/hooks/useWindowSize";

const GetInvolvedPage: React.FC = () => {
  const context = useContext(PageDataContext);
  const [isVisible, setIsVisible] = useState(false);
  const { isMobile } = useWindowSize();

  useEffect(() => {
    if (context?.pageData && !context.loading) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [context]);

  if (!context) return <div>Error: Page data not available.</div>;
  const { pageData, loading } = context;
  if (loading) return null;

  const page = pageData.find((p) => p.pagename === "get-involved");
  if (!page) return <div>No Get Involved page data found.</div>;

  const headerField = page.fields.find((f) => f.name === "header");
  const attendField = page.fields.find((f) => f.name === "attend");
  const donateField = page.fields.find((f) => f.name === "donate");

  const headerData = headerField?.data as {
    imageUrl: string;
    header: string;
    subheader: string;
    fancy?: boolean;
  };
  const attendData = attendField?.data as {
    title: string;
    description: string;
    buttonText: string;
    imageUrl: string;
  };
  const donateData = donateField?.data as {
    title: string;
    description: string;
    buttonText: string;
    imageUrl: string;
  };

  return (
    <div
      className={`flex flex-col gap-5 sm:gap-10 w-full transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Header Section */}
      {headerField && (
        <Header
          imageUrl={headerData.imageUrl}
          header={headerData.header}
          subheader={headerData.subheader}
          fancy={headerData.fancy}
        />
      )}

      {/* Attend Section */}
      <section className="flex flex-col sm:flex-row justify-between items-center gap-6 w-full px-6 md:px-12">
        <div className="md:w-1/2">
          <h1 className="mb-6 text-[28px] md:text-[48px] sm:text-4xl font-medium font-golos">
            {attendData.title}
          </h1>
          <p className="text-sm sm:text-lg mb-6">{attendData.description}</p>
          <Link href="/calendar">
            <Button>{attendData.buttonText}</Button>
          </Link>
        </div>
        <div className="w-full md:w-[590px] flex h-[280px] md:h-[369px] relative">
          <Image src={attendData.imageUrl} alt="Our Mission" fill={true} objectFit="cover" />
        </div>
      </section>

      {/* Donate Section */}

      <section className="flex flex-col sm:flex-row justify-between items-center gap-6 w-full px-6 md:px-12 py-6 md:py-16">
        <div className="w-full md:w-[590px] flex h-[280px] md:h-[369px] relative order-2 sm:order-1">
          <Image src={donateData.imageUrl} alt="Our Mission" fill={true} objectFit="cover" />
        </div>

        <div className="md:w-1/2 order-1 sm:order-2">
          <h1 className="mb-6 text-[28px] sm:text-[48px] font-medium font-golos">
            {donateData.title}
          </h1>
          <p className="text-sm sm:text-lg mb-6">{donateData.description}</p>
          <Link href="/calendar">
            <Button>{donateData.buttonText}</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default GetInvolvedPage;
