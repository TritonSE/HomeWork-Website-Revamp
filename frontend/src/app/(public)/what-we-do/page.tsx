"use client";
import React, { useContext, useEffect, useState } from "react";

import Flashcard from "@/components/Flashcard/Flashcard";
import { PageDataContext } from "@/contexts/pageDataContext";

const WhatWeDoPage: React.FC = () => {
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
  const { pageData } = context;
  const page = pageData.find((entry) => entry.pagename === "what-we-do");
  if (!page) return <div></div>;

  const heroField = page.fields.find((field) => field.name === "hero");
  const flashcardField = page.fields.find((field) => field.name === "flashcards");

  const heroData = heroField?.data as {
    title: string;
    description: string[];
    imageUrl: string;
  };

  const flashcards = flashcardField?.data as {
    title: string;
    icon: string;
    info: string;
  }[];

  return (
    <div className={`transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
      <div className="flex md:flex-row flex-col w-full justify-between pt-12">
        <div className="font-golos md:w-[calc(60%)] md:max-w-4xl w-full px-8 md:pb-0 pb-20">
          <div className="text-[32px] mb-8 weight-500 ">{heroData.title}</div>
          <div className="text-[20px] weight-400">
            {heroData.description.map((line, i) => (
              <div className={i > 0 ? "mt-6" : ""} key={i}>
                {line}
              </div>
            ))}
          </div>
        </div>
        <div className="md:px-8">
          <img src={heroData.imageUrl} className="h-[calc(100%)] object-contain w-full" />
        </div>
      </div>
      <div className="px-8">
        <div className="text-5xl font-golos pb-8 mt-20">Our Model</div>
        <div className="flex flex-col">
          {flashcards.map((flashcard, index) => (
            <div key={index} className="relative flex flex-col">
              <div
                className={`flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} w-full items-center`}
              >
                <Flashcard {...flashcard} />
                {index < flashcards.length - 1 && (
                  <>
                    <div className="w-[calc(100%-724.5px)] h-[5px] bg-gray-600" />
                    <div className="h-[206.5px] w-[5px] bg-gray-600 mt-auto" />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatWeDoPage;
