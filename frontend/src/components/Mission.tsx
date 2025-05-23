"use client";

import { Button } from "@tritonse/tse-constellation";
import Image from "next/image";
import Link from "next/link";

type MissionData = {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
};

export default function Mission({ data }: { data: MissionData }) {
  const { title, description, imageUrl, buttonText, buttonLink } = data;

  return (
    <section className="p-12 flex flex-col md:flex-row items-center justify-between text-text_black">
      <div className="md:w-1/2">
        <p className="text-[48px] font-medium ">{title}</p>
        <p className="mt-4 text-lg">{description}</p>
        <Link href={buttonLink}>
          <Button className="mt-6 px-6 py-3 rounded-lg transition">{buttonText}</Button>
        </Link>
      </div>
      <div className="w-[612px] flex h-[373px] relative">
        <Image src={imageUrl} alt="Our Mission" fill={true} objectFit="cover" />
      </div>
    </section>
  );
}
