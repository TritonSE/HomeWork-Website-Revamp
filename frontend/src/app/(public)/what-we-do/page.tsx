"use client";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";

import Flashcard from "../../../components/Flashcard/Flashcard";
import Header from "../../../components/Header";

import { PageDataContext } from "@/contexts/pageDataContext";

type FlashcardData = {
  title: string;
  icon: string;
  info: string;
};

const FlashcardPage: React.FC = () => {
  const context = useContext(PageDataContext);

  const flashcardHeight = 408;
  const [viewport, setViewport] = useState({ h: 1000 }); // default placeholder

  useEffect(() => {
    const getViewport = () => ({ h: window.innerHeight });
    setViewport(getViewport());
    const handleResize = () => {
      setViewport(getViewport());
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [screenWidth, setScreenWidth] = useState<number>(1200);
  const isMobile = screenWidth < 1200;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const flashcardsRef = useRef<HTMLDivElement | null>(null);
  const [flashcardsTop, setFlashcardsTop] = useState(0);
  const [flashcardsHeight, setFlashcardsHeight] = useState(1);

  useEffect(() => {
    const measure = () => {
      if (flashcardsRef.current) {
        setFlashcardsTop(flashcardsRef.current.offsetTop);
        setFlashcardsHeight(flashcardsRef.current.offsetHeight);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
    };
  }, []);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!flashcardsHeight || !flashcardsTop) return;
    const START_DELAY = flashcardsTop / 4;
    const onScroll = () => {
      const bottom = window.scrollY + viewport.h;
      const startLine = flashcardsTop + START_DELAY;
      const pxPast = Math.max(0, bottom - startLine);
      const current = Math.min(pxPast / flashcardsHeight, 1);
      setProgress((prev) => (current > prev ? current : prev));
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [flashcardsTop, flashcardsHeight, viewport.h]);

  if (!context) return <div>Error: Page data not available.</div>;
  const { pageData } = context;

  const pageEntry = pageData.find((p) => p.pagename === "what-we-do");

  const headerField = pageEntry?.fields.find((f) => f.name === "header");
  const heroField = pageEntry?.fields.find((f) => f.name === "hero");
  const modelHeadingField = pageEntry?.fields.find((f) => f.name === "modelHeading");
  const flashcardsField = pageEntry?.fields.find((f) => f.name === "flashcards");

  const headerData = headerField?.data as {
    imageUrl: string;
    header: string;
    subheader: string;
    fancy?: boolean;
  };

  const heroData = heroField?.data as {
    title: string;
    description: string[];
    imageUrl: string;
  };

  const modelHeading = modelHeadingField?.data as {
    text: string;
  };

  const flashcards = (flashcardsField?.data as FlashcardData[]) ?? [];

  const SEG = 0.08;
  const segIndex = Math.min(Math.floor(progress / SEG), 9);
  const segT = (progress - segIndex * SEG) / SEG;

  const maxRightPosition = screenWidth - 380;
  const maxLeftPosition = 230;
  const [ballXPosDesktop, ballYPositionDesktop] = (() => {
    switch (segIndex) {
      case 0:
        return [480 + segT * (maxRightPosition - 500), flashcardHeight * 0.5];
      case 1:
        return [maxRightPosition, flashcardHeight * (0.5 + segT)];
      case 2:
        return [
          maxRightPosition - segT * (maxRightPosition - maxLeftPosition),
          1.5 * flashcardHeight,
        ];
      case 3:
        return [maxLeftPosition, flashcardHeight * (1.5 + segT)];
      case 4:
        return [
          maxLeftPosition + segT * (maxRightPosition - maxLeftPosition),
          2.5 * flashcardHeight,
        ];
      case 5:
        return [maxRightPosition, flashcardHeight * (2.5 + segT)];
      case 6:
        return [
          maxRightPosition - segT * (maxRightPosition - maxLeftPosition),
          3.5 * flashcardHeight,
        ];
      case 7:
        return [maxLeftPosition, flashcardHeight * (3.5 + segT)];
      case 8:
        return [
          maxLeftPosition + segT * (maxRightPosition - maxLeftPosition),
          4.5 * flashcardHeight,
        ];
      case 9:
        return [maxRightPosition, flashcardHeight * (4.5 + Math.min(1, segT))];
      default:
        return [maxLeftPosition, flashcardHeight * 0.5];
    }
  })();

  const totalMobileHeight = flashcards.length * flashcardHeight;
  const ballYPositionMobile = flashcardHeight * 0.5 + progress * totalMobileHeight;

  const cardOpacity = (idx: number) => Math.min(Math.max((progress - (idx - 1) * SEG) / SEG, 0), 1);

  const fill = (seg: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9) =>
    Math.min(Math.max((progress - seg * SEG) / SEG, 0), 1);

  return (
    <div>
      {headerData && (
        <Header
          imageUrl={headerData.imageUrl}
          header={headerData.header}
          subheader={headerData.subheader}
          fancy={headerData.fancy}
        />
      )}{" "}
      <div className="flex md:flex-row flex-col w-full justify-between h-[500px] pt-12">
        <div className="font-golos md:pb-0 pb-20 flex flex-col md:flex-row w-full">
          <div className="md:pl-12 pb-6 md:pb-0 md:w-[80%] md:max-w-4xl ">
            {heroData && <div className="text-[32px] mb-8 weight-500">{heroData.title}</div>}
            {heroData?.description.map((line, i) => (
              <div className={i > 0 ? "mt-6 text-[20px]" : "text-[20px]"} key={i}>
                {line}
              </div>
            ))}
          </div>
        </div>
        {heroData && (
          <div className="md:mr-12 md:max-w-[35%] w-full bg-gray-300 h-full relative">
            <Image
              src={heroData.imageUrl}
              alt={heroData.title}
              fill={true}
              className="object-cover"
              priority
            />
          </div>
        )}
      </div>
      <div className="px-8">
        {modelHeading && <div className="text-5xl font-golos pb-8 mt-20">{modelHeading.text}</div>}

        <div ref={flashcardsRef} className="relative flex pb-20 flex-col">
          {!isMobile && (
            <>
              <div
                className="lineX absolute"
                style={{
                  left: 480,
                  top: flashcardHeight * 0.5,
                  width: fill(0) * (maxRightPosition - 450),
                }}
              />
              <div
                className="lineY absolute"
                style={{
                  left: maxRightPosition + 25,
                  top: flashcardHeight * 0.5 + 5,
                  height: fill(1) * flashcardHeight,
                }}
              />
              <div
                className="lineX absolute"
                style={{
                  left: maxRightPosition + 25 - fill(2) * (maxRightPosition - maxLeftPosition),
                  top: flashcardHeight * 1.5,
                  width: fill(2) * (maxRightPosition - maxLeftPosition),
                }}
              />
              <div
                className="lineY absolute"
                style={{
                  left: maxLeftPosition + 25,
                  top: flashcardHeight * 1.5 + 5,
                  height: fill(3) * flashcardHeight,
                }}
              />
              <div
                className="lineX absolute"
                style={{
                  left: maxLeftPosition + 25 + 5,
                  top: flashcardHeight * 2.5,
                  width: fill(4) * (maxRightPosition - maxLeftPosition),
                }}
              />
              <div
                className="lineY absolute"
                style={{
                  left: maxRightPosition + 25,
                  top: flashcardHeight * 2.5 + 5,
                  height: fill(5) * flashcardHeight,
                }}
              />
              <div
                className="lineX absolute"
                style={{
                  left: maxRightPosition + 25 - fill(6) * (maxRightPosition - maxLeftPosition),
                  top: flashcardHeight * 3.5,
                  width: fill(6) * (maxRightPosition - maxLeftPosition),
                }}
              />
              <div
                className="lineY absolute"
                style={{
                  left: maxLeftPosition + 25,
                  top: flashcardHeight * 3.5,
                  height: fill(7) * flashcardHeight,
                }}
              />
              <div
                className="lineX absolute"
                style={{
                  left: maxLeftPosition + 25,
                  top: flashcardHeight * 4.5,
                  width: fill(8) * (maxRightPosition - maxLeftPosition),
                }}
              />
              <div
                className="lineY absolute"
                style={{
                  left: maxRightPosition + 25,
                  top: flashcardHeight * 4.5,
                  height: fill(9) * flashcardHeight,
                }}
              />
              {/* Moving circle */}
              <div
                className="circle absolute"
                style={{ left: ballXPosDesktop + 2.5, top: ballYPositionDesktop + 2.5 }}
              />
            </>
          )}
          {isMobile && (
            <>
              <div
                className="lineY absolute"
                style={{
                  left: "50%",
                  top: flashcardHeight * 0.5,
                  height: progress * totalMobileHeight,
                }}
              />
              <div
                className="circle absolute"
                style={{ left: `calc(50% - 22.5px)`, top: ballYPositionMobile }}
              />
            </>
          )}
          {flashcards.map((flashcard, index) => {
            const rowClass = isMobile
              ? "flex-row justify-center py-12"
              : index % 2 === 0
                ? "flex-row"
                : "flex-row-reverse";
            return (
              <div
                key={index}
                className={`relative flex ${rowClass} items-center`}
                style={{ opacity: cardOpacity(index), transition: "opacity 0.5s ease-in" }}
              >
                <Flashcard {...flashcard} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FlashcardPage;
