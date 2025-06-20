import React from "react";

import QuoteCarousel from "./QuoteCarousel";
import { Testimonial } from "./QuoteCarouselCard";

export type SuccessStoriesData = {
  title: string;
  description: string;
  slides: Testimonial[];
};

export default function SuccessStories({ data }: { data: SuccessStoriesData }) {
  const { title, description, slides } = data;

  return (
    <section className="p-6 md:p-12 text-text_black">
      <h2 className="text-[28px] md:text-[48px] font-medium">{title}</h2>
      <p className="text-[14px] leading-[20px] md:text-lg mt-4">{description}</p>

      <div className="-p-3 md:p-0 mt-10 flex flex-nowrap justify-between gap-4">
        <QuoteCarousel slides={slides} />
      </div>
    </section>
  );
}
