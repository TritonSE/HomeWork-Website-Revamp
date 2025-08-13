"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

import QuoteCarouselCard, { Testimonial } from "./QuoteCarouselCard";

/**
 * Props for the QuoteCarousel component
 */
type QuoteCarouselProps = {
  slides: Testimonial[];
};

/**
 * Quote Carousel Component
 */
const QuoteCarousel: React.FC<QuoteCarouselProps> = ({ slides = [] }) => {
  // Use provided slides or fall back to defaults
  const slidesToDisplay = slides.length > 5 ? slides : slides.concat(slides);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex((prev) => (prev + 1) % slidesToDisplay.length);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex((prev) => (prev - 1 + slidesToDisplay.length) % slidesToDisplay.length);
    }
  };

  // Reset animation flag after transition completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match this with the transition duration

    return () => {
      clearTimeout(timer);
    };
  }, [activeIndex]);

  /**
   * Determines the position class of a slide
   * @param {number} index - Index of the slide
   * @returns {string} Position category ('center', 'left', 'right', or 'hidden')
   */
  const getSlidePosition = (index: number) => {
    // Normalize the index differences to handle wrapping
    const diff = (index - activeIndex + slidesToDisplay.length) % slidesToDisplay.length;

    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === slidesToDisplay.length - 1) return "left";
    if (diff === 2) return "hiddenRight";
    return "hiddenLeft";
  };

  return (
    <div className="relative flex flex-row w-screen bg-gray justify-between -mx-6 md:-mx-12 pt-12 overflow-hidden h-screen">
      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="z-40 bg-white md:pl-6 md:shadow-lg focus:outline-none hover:bg-gray-100 transition-colors"
        disabled={isAnimating}
        aria-label="Previous slide"
      >
        <ChevronLeft size={48} className="text-gray-700" />
      </button>

      {/* Main carousel container */}
      {/* Slides */}
      <div className="w-full">
        {slidesToDisplay.map((slide, index) => (
          <QuoteCarouselCard key={index} slide={slide} position={getSlidePosition(index)} />
        ))}
      </div>

      <button
        onClick={nextSlide}
        className="z-40 bg-white md:pr-6 md:shadow-lg focus:outline-none hover:bg-gray-100 transition-colors"
        disabled={isAnimating}
        aria-label="Next slide"
      >
        <ChevronRight size={48} className="text-gray-700" />
      </button>
    </div>
  );
};

export default QuoteCarousel;
