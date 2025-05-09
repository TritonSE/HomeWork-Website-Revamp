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
    <section className="px-8 md:px-16 py-12">
      <h2 className="text-[48px] font-bold text-gray-900">{title}</h2>
      <p className="text-gray-600 mt-4 max-w-2xl">{description}</p>

      <div className="mt-10 flex flex-nowrap justify-between gap-4">
        <QuoteCarousel slides={slides} />
      </div>
    </section>
  );
}
