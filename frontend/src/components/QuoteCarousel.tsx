"use client"; // Ensure this runs only on the client side

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import QuoteCarouselCard, { QuoteCarouselCardProps } from "./QuoteCarouselCard";

export interface QuoteCarouselProp {
  item: QuoteCarouselCardProps[];
}

export default function QuoteCarousel(items: QuoteCarouselProp) {
  return (
    <div className="w-full h-[672px] max-w-[1476px] mx-auto py-10 ">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20} // Adjust spacing between slides
        slidesPerView={1} // Default: 1 slide per view
        navigation
        loop={true}
        pagination={{ clickable: true }}
        className="w-full"
      >
        {items.item.map((testimonial, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <div className="grid place-items-center">
              <QuoteCarouselCard
                id={testimonial.id}
                image={testimonial.image}
                body={testimonial.body}
                name={testimonial.name}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
