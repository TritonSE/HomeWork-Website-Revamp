"use client";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

import { useWindowSize } from "@/hooks/useWindowSize";

export type HeaderComponents = {
  imageUrl: string;
  header: string;
  subheader: string;
  fancy?: boolean;
  children?: ReactNode;
};

const Header: React.FC<HeaderComponents> = ({
  imageUrl,
  header,
  subheader,
  fancy = false,
  children,
}: HeaderComponents) => {
  const { isMobile } = useWindowSize();
  return (
    <div
      className={`flex flex-col items-start p-[20px] 
        ${isMobile ? "pt-[100px] gap-[100px]" : "justify-center gap-[179px]"}`}
      style={{
        height: "940px",
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0.6) 100%), url(${imageUrl})`,
        backgroundSize: "cover", // Ensure the background image covers the entire area
        backgroundPosition: "center", // Center the image
      }}
    >
      {isMobile && (
        <div className="flex justify-center w-full">
          <Link href="/">
            <Image src="/homework_logo.svg" alt="Logo" width={176} height={98} priority />
          </Link>
        </div>
      )}
      <div className="flex flex-col items-start gap-[20px] max-w-[1336px] md:mx-[52px] text-white text-left ">
        {fancy &&
          (isMobile ? (
            <div className="z-0 absolute pt-4 md:-ml-4">
              <Image src="/icons/headerSquiggle.svg" width="160" height="29" alt="squiggle" />
            </div>
          ) : (
            <div className="z-0 absolute pt-4 md:-ml-4">
              <Image src="/icons/headerSquiggle.svg" width="396" height="53" alt="squiggle" />
            </div>
          ))}
        <div className="relative font-baskerville text-[32px] md:text-[64px] leading-[48px] md:leading-[96px] max-w-[1195px]">
          {header}
        </div>
        <div className="font-[Golos Text] text-[14px] md:text-[20px] font-normal leading-[20px] md:leading-[26px] max-w-[790px] mt-0">
          {subheader}
        </div>

        {children}
      </div>
    </div>
  );
};

export default Header;
