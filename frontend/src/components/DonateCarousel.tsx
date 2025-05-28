"use client";

import Image from "next/image";
import React, { useState } from "react";

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
    <div className="relative flex flex-col justify-center items-center max-w-full h-[550px] overflow-hidden m-6">
      {/* Carousel Image Container */}
      <div className="flex flex-row gap-[24px] w-full h-full items-center justify-center">
        {/* Previous Arrow */}
        <div className="flex items-center">
          <Image
            src="/carousel_arrow_left.svg"
            alt="Previous"
            width={20}
            height={34.5}
            onClick={handlePrev}
            className="cursor-pointer"
          />
        </div>

        <div className="relative flex-1 min-w-[200px] h-full flex-auto overflow-hidden">
          {/* Image Sliding Animation */}
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{
              transform: `translateX(-${String(currentIndex * 100)}%)`, // Shifts images based on the index
            }}
          >
            {images.map((image, index) => (
              <div key={index} className="min-w-full h-full relative">
                <Image src={image} alt={`Slide ${String(index)}`} fill={true} objectFit="cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Next Arrow */}
        <div className="flex items-center">
          <Image
            src="/carousel_arrow_right.svg"
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
