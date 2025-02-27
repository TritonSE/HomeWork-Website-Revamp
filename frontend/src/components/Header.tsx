import React from "react";
import "@fontsource/golos-text"; // Defaults to weight 400

export type HeaderComponents = {
  imageUrl: string;
  header: string;
  subheader: string;
};

const Header = ({ imageUrl, header, subheader }: HeaderComponents) => {
  return (
    <div
      className="flex flex-col justify-center items-start gap-[179px] p-[20px] opacity-0"
      style={{
        height: "940px",
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0.6) 100%), url(${imageUrl})`,
        backgroundSize: "cover", // Ensure the background image covers the entire area
        backgroundPosition: "center", // Center the image
      }}
    >
      <div className="flex flex-col items-start gap-[10px] max-w-[1336px] opacity-0 mx-[52px]">
        <div className="text-white text-left font-[Libre Baskerville] text-[64px] font-bold leading-[96px] max-w-[1195px]">
          {header}
        </div>
        <div className="text-white text-left font-[Golos Text] text-[20px] font-normal leading-[26px] max-w-[790px] opacity-0 mt-0">
          {subheader}
        </div>
      </div>
    </div>
  );
};

export default Header;
