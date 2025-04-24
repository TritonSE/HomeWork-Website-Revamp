"use client";

import { Button } from "@tritonse/tse-constellation";
import Image from "next/image";
import Link from "next/link";
export default function Mission() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between text-text_black">
      <div className="md:w-1/2">
        <p className="text-[48px] font-medium ">Our Mission</p>
        <p className="mt-4 text-lg">
          We&apos;re Homework. We want to reduce recidivism, increase public safety, and change the
          narrative around what it means to be formerly incarcerated.
        </p>
        <Link href="/our-team">
          <Button className="mt-6 px-6 py-3 rounded-lg transition">Learn More</Button>
        </Link>
      </div>
      <div className="w-[612px] flex h-[373px] relative">
        <Image src="/images/mission_image.png" alt="Our Mission" fill={true} objectFit="cover" />
      </div>
    </section>
  );
}
