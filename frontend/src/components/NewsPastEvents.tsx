import React from "react";
import Link from "next/link";

export type NewsPastEventsData = {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
};

export default function NewsPastEvents({ data }: { data: NewsPastEventsData }) {
  const { title, description, buttonText, buttonLink } = data;

  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-12">
      <div className="my-14 ml-4 max-w-lg">
        <h2 className="text-[48px] font-bold text-left">{title}</h2>
        <p className="text-gray-600 mt-2 text-left">{description}</p>
        <Link href={buttonLink}>
          <button
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
            aria-label={buttonText}
          >
            {buttonText}
          </button>
        </Link>
      </div>
    </section>
  );
}
