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
    <section className="flex text-text_black flex-col md:flex-row items-center justify-between py-12">
      <div>
        <h2 className="text-[48px] font-medium">{title}</h2>
        <p className="mt-4 mb-6">{description}</p>
        <Link href={buttonLink}>
          <Button>{buttonText}</Button>
        </Link>
      </div>
    </section>
  );
}
