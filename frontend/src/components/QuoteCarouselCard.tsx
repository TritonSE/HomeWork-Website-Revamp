"use client";

import Image from "next/image";

/**
 * Interface for slide data structure
 */
export type Testimonial = {
  id: number | string;
  image: string;
  quote: string;
  author: string;
};

/**
 * Props for the QuoteCarouselCard component
 */
type QuoteCarouselCardProps = {
  slide: Testimonial;
  position: "center" | "left" | "right" | "hiddenRight" | "hiddenLeft";
};

/**
 * Quote Carousel Card Component
 */
const QuoteCarouselCard: React.FC<QuoteCarouselCardProps> = ({ slide, position }) => {
  const positionClasses = {
    center: "left-1/2 -translate-x-1/2 z-30 opacity-100",
    left: `left-0 md:left-24 -translate-x-1/2 z-20 translate-y-4 opacity-0 md:opacity-60`,
    right: `left-0 md:left-auto md:right-24 translate-x-1/2 z-20 translate-y-4 opacity-0 md:opacity-60`,
    hiddenRight: "md:right-0 translate-x-full translate-y-4 z-0 opacity-0",
    hiddenLeft: "md:left-0 -translate-x-full z-0 translate-y-4 opacity-0",
  };
  const quote = '"' + slide.quote + '"';

  return (
    <div
      className={`absolute w-full max-w-[80%] md:max-w-[40%] max-h-[80%] h-full rounded-lg bg-white p-6 border-2 border-black transition-all duration-500 ease-in-out transform 
        ${position === "center" ? "shadow-xl" : "shadow-lg"}
        ${positionClasses[position]}
      `}
    >
      <div className="flex flex-col items-center text-text_black h-full text-lg">
        <div className="w-full h-[60%] bg-gray-100 relative">
          {<Image src={slide.image} layout="fill" className="object-cover" alt="testimonial" />}
        </div>
        <div className="text-center p-2 md:p-6">
          <p className="mb-6 leading-[21px] md:leading-md text-[14px] md:text-lg">{quote}</p>
          <p className=" text-[14px] md:text-lg">-- {slide.author}</p>
        </div>
      </div>
    </div>
  );
};

export default QuoteCarouselCard;
