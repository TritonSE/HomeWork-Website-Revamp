"use client";

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
  position: "center" | "left" | "right" | "hidden";
};

/**
 * Quote Carousel Card Component
 */
const QuoteCarouselCard: React.FC<QuoteCarouselCardProps> = ({ slide, position }) => {
  const positionClasses = {
    center: "left-1/2 -translate-x-1/2 -translate-y-4 z-30 scale-100 opacity-100",
    left: "left-24 -translate-x-1/2 z-20 scale-90 opacity-60",
    right: "right-24 translate-x-1/2 z-20 scale-90 opacity-60",
    hidden: "left-1/2 -translate-x-1/2 z-10 scale-75 opacity-0",
  };
  const quote = '"' + slide.quote + '"';

  return (
    <div
      className={`absolute w-full max-w-md rounded-lg bg-white p-6 border-2 border-black transition-all duration-500 ease-in-out transform ${position === "center" ? "shadow-xl" : "shadow-lg"}
        ${positionClasses[position]}
      `}
    >
      <div className="flex flex-col items-center">
        <img src={slide.image} className="w-full h-80 object-cover rounded mb-6" />
        <div className="text-center p-6">
          <p className="text-gray-800 text-lg mb-6">{quote}</p>
          <p className="text-gray-600 text-lg">-- {slide.author}</p>
        </div>
      </div>
    </div>
  );
};

export default QuoteCarouselCard;
