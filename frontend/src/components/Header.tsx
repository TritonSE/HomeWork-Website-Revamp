import Image from "next/image";
import React, { ReactNode } from "react";

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
  return (
    <div
      className="flex flex-col justify-center items-start gap-[179px] p-[20px]"
      style={{
        height: "940px",
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0.6) 100%), url(${imageUrl})`,
        backgroundSize: "cover", // Ensure the background image covers the entire area
        backgroundPosition: "center", // Center the image
      }}
    >
      <div className="flex flex-col items-start gap-[20px] max-w-[1336px] mx-[52px] text-white text-left ">
        {fancy && (
          <div className="z-0 absolute pt-4 -ml-4">
            <Image src="/icons/headerSquiggle.svg" width="396" height="53" alt="squiggle" />
          </div>
        )}
        <div className="relative font-[Baskerville] text-[64px] leading-[96px] max-w-[1195px]">
          {header}
        </div>
        <div className="font-[Golos Text] text-[20px] font-normal leading-[26px] max-w-[790px] mt-0">
          {subheader}
        </div>

        {children}
      </div>
    </div>
  );
};

export default Header;
