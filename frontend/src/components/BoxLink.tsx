import Link from "next/link";
import React from "react";

export type BoxLinkProps = {
  tall: boolean;
  src: string;
  header: string;
  body: string;
  link: string;
};

export function BoxLink({
  tall: isTall,
  src: imgSrc,
  header: header,
  body: body,
  link: link,
}: BoxLinkProps) {
  let contStyle =
    'group relative overflow-hidden cursor-pointer flex after:content-[""] after:absolute after:bottom-[0] after:left-[0] after:w-[0] after:h-[6px] after:bg-blue-500 after:transition-all after:duration-300 after:ease-in-out after:z-20 hover:after:w-full before:content-[""] before:absolute before:top-[0] before:left-[0] before:w-full before:h-full before:bg-[rgba(0,_0,_0,_0.5)] before:z-10 hover:before:bg-[rgba(0,_0,_0,_0.2)]';
  if (isTall) {
    contStyle += " h-[598px]";
  } else {
    contStyle += " h-[539px]";
  }

  return (
    <Link href={link}>
      <div className={contStyle}>
        <img
          src={imgSrc}
          className="absolute top-[0] left-[0] w-full h-full object-cover transition-transform duration-500 ease-in-out scale-100 group-hover:scale-110"
          alt={"Image Source"}
        />
        <div
          className={
            'absolute left-0 bottom-0 w-full h-[186px] pl-[24px] pr-[24px] pb-[40px] text-[#f9f9f9] font-["GolosText"] z-20 text-left justify-between flex-col'
          }
        >
          <div className={"mb-auto"}>
            <h3 className={"m-0 text-[2rem] font-medium leading-[150%]"}>{header}</h3>
            <p className={"text-[1.25rem] font-normal leading-[130%]"}>{body}</p>
          </div>
          <span
            className={
              "text-[16px] font-medium no-underline text-[#f9f9f9] font-[GolosText] transition-colors duration-200 ease-in-out pb-10 mt-[100px] absolute bottom-0 inline-flex items-center gap-2"
            }
          >
            Learn More
            <span className="inline-block w-[1rem] h-[1rem] bg-[url(/Arrow1.png)] bg-no-repeat bg-contain align-middle transition-all duration-300 ease-in-out group-hover:w-[2.12rem] group-hover:h-[0.875rem] group-hover:bg-[url(/Arrow2.png)]"></span>
          </span>
        </div>
      </div>
    </Link>
  );
}
