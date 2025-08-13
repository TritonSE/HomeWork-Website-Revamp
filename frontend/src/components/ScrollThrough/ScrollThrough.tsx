"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Slide = {
  title: string;
  description: string | string[];
  image: string;
};

type ScrollThroughProps = {
  heading: string;
  slidesData: Slide[];
};

export default function ScrollThrough({ heading, slidesData }: ScrollThroughProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = () => {
    setCurrentIndex((prev) => (prev + 1) % slidesData.length);
  };

  const currentSlide = slidesData[currentIndex];

  return (
    <section className="w-full py-8 flex md:px-12">
      {/* Main container */}
      <div className="w-full max-w-[1336px] h-auto md:h-[742px] flex flex-col px-6 md:px-0">
        {/* Heading (left-aligned) */}
        <h2 className="text-left font-golos text-[28px] md:text-[32px] md:text-[48px] font-medium leading-[130%] mb-6">
          {heading}
        </h2>

        {/* Image + Text Card Wrapper */}
        <div
          onClick={handleClick}
          className="flex flex-col md:flex-row flex-1 items-stretch gap-8 md:gap-14 cursor-pointer"
        >
          {/* IMAGE SECTION (fade animation) */}
          <div className="relative w-full h-[375px] md:h-full rounded-[20px] overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${currentSlide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "20px",
                }}
              />
            </AnimatePresence>
          </div>

          {/* TEXT CARD SECTION (scroll up/down animation) */}
          <div className="relative w-full min-h-[375px] md:h-full overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentIndex}
                initial={{ y: "calc(100% + 20px)" }}
                animate={{ y: 0 }}
                exit={{ y: "calc(-100% - 20px)" }}
                transition={{ duration: 0.5 }}
                className="
                  absolute 
                  top-0 
                  left-0 
                  w-full 
                  h-full 
                  bg-[#F3F3F3] 
                  rounded-[20px]
                  flex 
                  items-center
                  justify-center 
                  p-6 md:p-10
                "
              >
                {/* 
                  Inner container: 
                  - Keeps the text left-aligned 
                  - Ensures both the title and paragraph start at the same point 
                */}
                <div className="flex flex-col items-start text-left max-w-[600px] w-full">
                  <h3
                    style={{ fontFamily: "Libre Baskerville" }}
                    className="
                      font-normal 
                      text-[#1B1B1B]
                      text-[40px] md:text-[75px]
                      leading-[48px] md:leading-[80px]
                      text-left
                      mb-4 md:mb-12
                    "
                  >
                    {currentSlide.title}
                  </h3>

                  {/* Check if description is an array and render paragraphs properly */}
                  {Array.isArray(currentSlide.description) ? (
                    currentSlide.description.map((paragraph, index) => (
                      <p
                        key={index}
                        className="
                          font-golos
                          text-[#1B1B1B]
                          text-[14px] md:text-[20px]
                          leading-[22px] md:leading-[26px]
                          font-normal
                          text-left
                          mb-4 md:mb-8
                        "
                      >
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <p
                      className="
                        font-golos
                        text-[#1B1B1B]
                        text-[14px] md:text-[20px]
                        leading-[22px] md:leading-[26px]
                        font-normal
                        text-left
                      "
                    >
                      {currentSlide.description}
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
