"use client";
import { Icon } from "@tritonse/tse-constellation";
// import TestPageComponent from "../../../components/testPageComponent";
import Image from "next/image";
import Link from "next/link";

const testPage = () => {
  // return <TestPageComponent />;

  return (
    <div className="pageWrapper mx-[122px] my-[107px]">
      <div className="flex items-start">
        <Link href="/" className="text-[#B4B4B4] hover:underline flex items-center gap-2">
          <Icon name="ic_arrowback" fill="#B4B4B4" size={16} />
          Back to Homework website
        </Link>
      </div>

      <div className="messageWrapper mt-[80px] flex flex-col items-center justify-center">
        <Image
          src="/icons/ic_success.svg"
          width={250}
          height={250}
          alt={"transaction success"}
          className="block mx-auto"
        ></Image>
        <div className="text-[#000000] font-medium text-[48px] leading-[130%] tracking-[0px] text-center w-[648px] max-h-[213px] mb-[17px]">
          Thank you for your donation!
        </div>

        <div className="text-[#6C6C6C] font-normal text-[24px] leading-[150%] tracking-[2%] text-center w-[648px] max-h-[72px] mb-[32px]">
          Your donation directly contributes to empowering individuals to thrive post-incarceration.
        </div>

        <div className="text-[#6C6C6C] font-normal text-[18px] leading-[150%] tracking-[2%] text-center w-[454px] max-h-[54px] mb-[28px]">
          Check out our
          <Link href="/calendar" className="underline">
            upcoming events calendar
          </Link>
          to find more ways to get involved
        </div>
        <Image
          src="../../logo-dark.png"
          width={133}
          height={73}
          alt={"HomeWork Logo"}
          className="block mx-auto"
        ></Image>
      </div>
    </div>
  );
};

export default testPage;
