"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

// Example slide data
const slidesData = [
  {
    title: "Self-Awareness",
    description:
      "We encourage self-awareness by recognizing the unique challenges individuals face post-incarceration. Understanding oneself is the first step toward meaningful reintegration.",
    image: "/images/ScrollThroughs/self_awareness.svg", // Replace with your actual path
  },
  {
    title: "Self-Advocacy",
    description:
      "We empower individuals to advocate for themselves, emphasizing the importance of asserting one’s needs and aspirations in the journey to rebuilding lives.",
    image: "/images/ScrollThroughs/self_awareness.svg",
  },
  {
    title: "Resilience",
    description:
      "Embracing the inherent strength and resilience within each person, we foster an environment that encourages growth and transformation beyond past challenges.",
    image: "/images/ScrollThroughs/self_awareness.svg",
  },
];

export default function OurValues() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = () => {
    setCurrentIndex((prev) => (prev + 1) % slidesData.length);
  };

  const currentSlide = slidesData[currentIndex];

  return (
    <section className="w-full py-8 flex justify-center">
      {/* Main container */}
      <div className="w-full max-w-[1336px] h-auto md:h-[742px] flex flex-col px-4 md:px-0">
        {/* Heading */}
        <h2 className="text-left font-golos text-[32px] md:text-[48px] font-medium leading-[130%] text-[#1B1B1B] mb-6">
          Our Values
        </h2>

        {/* Image + Text Card Wrapper */}
        <div
          onClick={handleClick}
          className="flex flex-col md:flex-row flex-1 items-stretch gap-8 cursor-pointer"
        >
          {/* IMAGE SECTION (fades) */}
          <div className="relative w-full h-[300px] md:h-full">
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
                }}
              />
            </AnimatePresence>
          </div>

          {/* TEXT CARD SECTION (scroll-wheel style with gap) */}
          <div className="relative w-full min-h-[300px] md:h-full overflow-hidden">
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
                    flex-col 
                    items-center 
                    justify-center 
                    text-center 
                    p-10
                  "
              >
                {/* 
                    Title (responsive):
                    - 32px on mobile
                    - 64px on md+
                  */}
                <h3
                  style={{ fontFamily: "Libre Baskerville" }}
                  className="
                      font-normal 
                      text-[#1B1B1B]
                      text-[32px] md:text-[64px]
                      leading-[42px] md:leading-[96px]
                    "
                >
                  {currentSlide.title}
                </h3>

                {/*
                    Paragraph (responsive):
                    - 16px on mobile
                    - 20px on md+
                  */}
                <p
                  className="
                      font-golos
                      text-[#1B1B1B]
                      text-[16px] md:text-[20px]
                      leading-[22px] md:leading-[26px]
                      font-normal
                      max-w-[80%]
                      mt-4
                    "
                >
                  {currentSlide.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
