"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

import QuoteCarouselCard, { Testimonial } from "./QuoteCarouselCard";

/**
 * Props for the QuoteCarousel component
 */
type QuoteCarouselProps = {
  slides: Testimonial[];
}

/**
 * Quote Carousel Component
 */
const QuoteCarousel: React.FC<QuoteCarouselProps> = ({ slides = [] }) => {
  // Use provided slides or fall back to defaults
  const slidesToDisplay = slides;

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
    if (diff === 1 || diff === -(slidesToDisplay.length - 1)) return "right";
    if (diff === -1 || diff === slidesToDisplay.length - 1) return "left";
    return "hidden";
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-12 overflow-hidden">
      {/* Main carousel container */}
      <div className="relative" style={{ height: "600px" }}>
        {/* Slides */}
        {slidesToDisplay.map((slide, index) => (
          <QuoteCarouselCard key={slide.id} slide={slide} position={getSlidePosition(index)} />
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-40 bg-white rounded-full p-2 shadow-lg focus:outline-none hover:bg-gray-100 transition-colors"
        disabled={isAnimating}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} className="text-gray-700" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-40 bg-white rounded-full p-2 shadow-lg focus:outline-none hover:bg-gray-100 transition-colors"
        disabled={isAnimating}
        aria-label="Next slide"
      >
        <ChevronRight size={24} className="text-gray-700" />
      </button>
    </div>
  );
};

export default QuoteCarousel;
