"use client";
import { StaticImageData } from "next/image";
import React from "react";

import Flashcard from "./Flashcard";

import Flashcard1 from "@/../public/images/flashcards/flashcard1.png";
import Flashcard2 from "@/../public/images/flashcards/flashcard2.png";
import Flashcard3 from "@/../public/images/flashcards/flashcard3.png";
import Flashcard4 from "@/../public/images/flashcards/flashcard4.png";
import Flashcard5 from "@/../public/images/flashcards/flashcard5.png";
import Flashcard6 from "@/../public/images/flashcards/flashcard6.png";

type FlashcardType = {
  title: string;
  icon: StaticImageData;
  info: string;
};
const FlashcardPage: React.FC = () => {
  const flashcards: FlashcardType[] = [
    {
      title: "Attending a Life Skills Workshop",
      icon: Flashcard1,
      info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      title: "Rebuilding Families",
      icon: Flashcard2,
      info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      title: "Supporting the Community",
      icon: Flashcard3,
      info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      title: "Participating in Civic Engagement",
      icon: Flashcard4,
      info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      title: "Entering the Union",
      icon: Flashcard5,
      info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      title: "Joining the Homework Family",
      icon: Flashcard6,
      info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];

  return (
    <div style={{ padding: "50px" }}>
      <div className="text-5xl font-golos pb-8">Our Model</div>
      <div className="flex flex-col">
        {flashcards.map((flashcard, index) => (
          <div key={index} className="relative flex flex-col">
            <div
              className={`flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} w-full items-center`}
            >
              <Flashcard {...flashcard} />
              {index < 5 && (
                <>
                  <div className={`w-[calc(100%-724.5px)] h-[5px] bg-gray-600`} />
                  <div className="h-[206.5px] w-[5px] bg-gray-600 mt-auto" />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashcardPage;
