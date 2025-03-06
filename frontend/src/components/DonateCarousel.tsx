"use client";

import React, { useState } from "react";
import Image from "next/image";

export type DonateCarouselProps = {
  images: string[];
};

const DonateCarousel: React.FC<DonateCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative flex flex-col justify-center items-center max-w-[1336px] mx-auto overflow-hidden px-[24px]">
      {/* Carousel Image Container */}
      <div className="flex flex-row gap-[24px] max-w-full items-center justify-center">
        {/* Previous Arrow */}
        <div className="flex items-center">
          <Image
            src="carousel_arrow_left.svg"
            alt="Previous"
            width={20}
            height={34.5}
            onClick={handlePrev}
            className="cursor-pointer"
          />
        </div>

        <div className="relative flex-1 min-w-[200px] overflow-hidden">
          {/* Image Sliding Animation */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${String(currentIndex * 100)}%)`, // Shifts images based on the index
            }}
          >
            {images.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0 pt-[48px] pb-[48px]">
                <Image
                  src={image}
                  alt={`Slide ${String(index)}`}
                  layout="responsive"
                  width={500}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Next Arrow */}
        <div className="flex items-center">
          <Image
            src="carousel_arrow_right.svg"
            alt="Next"
            width={20}
            height={34.5}
            onClick={handleNext}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 transition-colors duration-500 ease-in-out rounded-full ${
              currentIndex === index ? "bg-gray-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default DonateCarousel;
