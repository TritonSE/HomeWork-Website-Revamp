"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";

import { PageDataContext } from "@/contexts/pageDataContext";

const Button: React.FC<{ text: string }> = ({ text }) => {
  return (
    <button className="p-3 pr-5 pl-5 w-fit rounded bg-orange-600 text-white font-golos text-xs sm:text-sm hover:bg-orange-500">
      {text}
    </button>
  );
};

const GetInvolvedPage = () => {
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

  const getInvolvedData = pageData.find((data) => data.pagename === "get-involved");
  if (!getInvolvedData) return <div>No Get Involved page data found.</div>;

  const attendField = getInvolvedData.fields.find((field) => field.name === "attend");
  const donateField = getInvolvedData.fields.find((field) => field.name === "donate");

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
