import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import { EventsCarouselCard } from "./EventsCarouselCard";

import leftArrow from "@/../public/icons/left-arrow.svg";
import rightArrow from "@/../public/icons/right-arrow.svg";

type EventsCarouselProps = {
  children?:
    | React.ReactElement<typeof EventsCarouselCard>
    | React.ReactElement<typeof EventsCarouselCard>[];
};

export const EventsCarousel: React.FC<EventsCarouselProps> = ({ children }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Calculates amount for carousel to scroll
  const [scrollAmount, setScrollAmount] = useState(0);
  const updateScrollAmount = () => {
    const carouselCard = carouselRef.current?.firstChild as HTMLElement;
    if (carouselRef.current && carouselCard) {
      const cardWidth = carouselCard.offsetWidth;
      const carouselStlye = window.getComputedStyle(carouselRef.current);

      // parseInt removes the 'px' from the style values
      const carouselGap = parseInt(carouselStlye.gap);
      const carouselWidth = parseInt(carouselStlye.width);

      const totalCardWidth = cardWidth + carouselGap;
      const numDisplayedCards = Math.floor(carouselWidth / totalCardWidth);
      setScrollAmount(totalCardWidth * numDisplayedCards);
    }
  };

  const numChildren = React.Children.count(children);

  // Get the scroll amount using the card width on mount and when the window changes size
  useEffect(() => {
    if (numChildren > 0) {
      updateScrollAmount();
      window.addEventListener("resize", updateScrollAmount);

      return () => {
        window.removeEventListener("resize", updateScrollAmount);
      };
    }
  }, []);

  // Scrolls the carousel a set amount
  const scrollCarousel = (amount: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: amount,
        behavior: "smooth",
      });
    }
  };

  const scrollleft = () => {
    scrollCarousel(scrollAmount !== 0 ? -scrollAmount : -200);
  };
  const scrollRight = () => {
    scrollCarousel(scrollAmount !== 0 ? scrollAmount : 200);
  };

  const carouselFormat = numChildren > 0 ? "justify-center gap-1" : "justify-between h-96";

  return (
    <div className={`flex flex-row ${carouselFormat}`}>
      <Image
        src={leftArrow as StaticImport}
        onClick={scrollleft}
        className="cursor-pointer"
        alt="Event carousel left arrow"
      ></Image>
      <div
        ref={carouselRef}
        className="
                flex flex-row gap-5 
                mr-5 ml-5 
                overflow-x-auto scroll-smooth snap-x snap-mandatory"
      >
        {children}
      </div>
      <Image
        src={rightArrow as StaticImport}
        onClick={scrollRight}
        className="cursor-pointer"
        alt="Event carousel right arrow"
      ></Image>
    </div>
  );
};
