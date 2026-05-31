import Image from "next/image";
import React, { useState } from "react";

import Rotate from "@/../public/images/flashcards/rotate.svg";

type FlashcardProps = {
  title: string;
  icon: string;
  info: string;
};

const Flashcard: React.FC<FlashcardProps> = ({ title, icon, info }) => {
  const [flip, setFlip] = useState(false);
  return (
    <div className="perspective cursor-pointer">
      <div
        className={`card ${flip ? "flip" : ""}`}
        onClick={() => {
          setFlip(!flip);
        }}
      >
        <div className="front">
          <div className="relative flex h-full w-full flex-col items-center justify-center rounded-xl border border-black bg-white p-4 shadow-lg">
            <Image
              src={icon}
              alt={title}
              width={200}
              height={200}
              className="h-[120px] w-[120px] md:h-[200px] md:w-[200px]"
            />
            <h3 className="mt-2 max-w-xs text-center font-golos text-[24px] leading-tight md:text-4xl">
              {title}
            </h3>
            <div className="absolute top-1 right-1 m-4">
              <Rotate className="fill-[#525252]" />
            </div>
          </div>
        </div>

        <div className="back">
          <div className="relative flex h-full w-full flex-col items-center justify-center rounded-xl border border-black bg-orange-600 p-4 shadow-lg">
            <h3 className="p-4 text-center font-golos text-2xl text-white md:text-3xl">{title}</h3>
            <p className="px-3 text-center font-golos text-xs text-white md:px-4 md:text-sm">{info}</p>
            <div className="absolute top-1 right-1 m-4">
              <Rotate className="fill-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
