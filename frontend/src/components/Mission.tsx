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
    <section className="p-6 md:p-12 flex w-full flex-col md:flex-row items-center justify-between text-text_black">
      <div className="md:w-1/2">
        <p className="text-[28px] md:text-[48px] font-medium ">{title}</p>
        <p className="mt-4 leading-[20px] md:leading-md md:text-[20px] text-[14px]">
          {description}
        </p>
        <Link href={buttonLink}>
          <Button className="my-6 text-[14px] md:text-lg md:mt-6 px-6 py-3 rounded-lg transition">
            {buttonText}
          </Button>
        </Link>
      </div>
      <div className="w-full h-[216px] md:w-[612px] flex md:h-[373px] relative">
        <Image src={imageUrl} alt="Our Mission" fill={true} objectFit="cover" />
      </div>
    </section>
  );
}
