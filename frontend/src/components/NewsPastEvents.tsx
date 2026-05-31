"use client";

import { Button } from "@tritonse/tse-constellation";
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
    <section className="flex flex-col items-start justify-between p-6 text-text_black md:flex-row md:items-center md:p-12">
      <div className="max-w-2xl">
        <h2 className="text-[28px] font-medium leading-tight md:text-[48px]">{title}</h2>
        <p className="mb-6 mt-4 text-[14px] leading-[20px] md:text-[20px] md:leading-[26px]">
          {description}
        </p>
        <Link href={buttonLink}>
          <Button>{buttonText}</Button>
        </Link>
      </div>
    </section>
  );
}
