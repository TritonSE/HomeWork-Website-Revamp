"use client";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

import Header from "@/components/Header";
import { PageDataContext } from "@/contexts/pageDataContext";

const Button: React.FC<{ text: string }> = ({ text }) => (
  <button className="p-3 pr-5 pl-5 w-fit rounded bg-orange-600 text-white font-golos text-xs sm:text-sm hover:bg-orange-500">
    {text}
  </button>
);

const GetInvolvedPage: React.FC = () => {
  const context = useContext(PageDataContext);
  const [isVisible, setIsVisible] = useState(false);

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
      className={`flex flex-col gap-5 sm:gap-10 w-full p-5 transition-opacity duration-700 ${
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
      <section className="flex flex-col sm:flex-row justify-between items-center gap-6 w-full p-5">
        <div className="flex flex-col gap-5 sm:w-7/12 sm:pr-5">
          <h1 className="mb-2 text-2xl sm:text-4xl font-medium font-golos">{attendData.title}</h1>
          <p className="text-sm sm:text-base">{attendData.description}</p>
          <Button text={attendData.buttonText} />
        </div>
        <Image
          src={attendData.imageUrl}
          width={500}
          height={250}
          alt="get involved attend"
          className="sm:w-5/12"
        />
      </section>

      {/* Donate Section */}
      <section className="flex flex-col-reverse sm:flex-row justify-between items-center gap-6 w-full p-5">
        <Image
          src={donateData.imageUrl}
          width={500}
          height={250}
          alt="get involved donate"
          className="sm:w-5/12"
        />
        <div className="flex flex-col gap-5 sm:w-7/12 sm:pl-5">
          <h1 className="mb-2 text-2xl sm:text-4xl font-medium font-golos">{donateData.title}</h1>
          <p className="text-sm sm:text-base">{donateData.description}</p>
          <Button text={donateData.buttonText} />
        </div>
      </section>
    </div>
  );
};

export default GetInvolvedPage;
