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
    <div className="perspective">
      <div
        className={`card ${flip ? "flip" : ""}`}
        onClick={() => {
          setFlip(!flip);
        }}
      >
        <div className="front">
          <div className="relative flex flex-col items-center justify-center bg-white shadow-lg rounded-xl p-4 w-[483px] h-[408px] border border-black">
            <Image src={icon} alt={title} width={200} height={200} />
            <h3 className="text-center font-golos mt-2 text-4xl max-w-xs">{title}</h3>
            <div className="absolute top-1 right-1">
              <Rotate className="fill-[#525252]" />
            </div>
          </div>
        </div>

        <div className="back">
          <div className="flex flex-col items-center justify-center bg-orange-600 shadow-lg rounded-xl p-4 w-[483px] h-[408px] border border-black">
            <h3 className="text-center font-golos text-3xl text-white p-4">{title}</h3>
            <p className="text-center font-golos text-sm px-4 text-white">{info}</p>
            <div className="absolute top-1 right-1">
              <Rotate className="fill-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
