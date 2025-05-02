"use client";

import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";

import Flashcard from "@/components/Flashcard/Flashcard";
import Header from "@/components/Header";
import { PageDataContext } from "@/contexts/pageDataContext";

const FLASHCARD_HEIGHT = 408;
const SEG = 0.08;

const WhatWeDoPage: React.FC = () => {
  const context = useContext(PageDataContext);

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [viewportH, setViewportH] = useState(
    typeof window !== "undefined" ? window.innerHeight : 0,
  );
  const [scrollY, setScrollY] = useState(0);
  const [topY, setTopY] = useState(0);
  const [height, setHeight] = useState(1);

  useEffect(() => {
    if (context && !context.loading) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [context]);

  useEffect(() => {
    const measure = () => {
      setViewportH(window.innerHeight);
      if (ref.current) {
        setTopY(ref.current.offsetTop);
        setHeight(ref.current.offsetHeight);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!context) return <div>Error: Page data not available.</div>;
  const { pageData, loading } = context;
  if (loading) return null;

  const pageEntry = pageData.find((p) => p.pagename === "what-we-do");
  if (!pageEntry) return <div>No data</div>;

  const headerField = pageEntry.fields.find((f) => f.name === "header");
  const heroField = pageEntry.fields.find((f) => f.name === "hero");
  const flashcardsField = pageEntry.fields.find((f) => f.name === "flashcards");

  if (!headerField || !heroField || !flashcardsField) {
    return <div>Page fields missing</div>;
  }

  const headerData = headerField.data as {
    imageUrl: string;
    header: string;
    subheader: string;
    fancy?: boolean;
  };

  const heroData = heroField.data as {
    title: string;
    description: string[];
    imageUrl: string;
  };

  const flashcards = flashcardsField.data as {
    title: string;
    icon: string;
    info: string;
  }[];

  const bottom = scrollY + viewportH;
  const startLine = topY + height / 4;
  const pxPast = Math.max(0, bottom - startLine);
  const progress = Math.min(pxPast / height, 1);

  const segIndex = Math.min(Math.floor(progress / SEG), flashcards.length - 1);
  const segT = (progress - segIndex * SEG) / SEG;
  const maxRight = window.innerWidth - 360;
  const maxLeft = 223;
  let ballX = maxLeft;
  let ballY = FLASHCARD_HEIGHT * 0.5;

  switch (segIndex) {
    case 0:
      ballX = 500 + segT * (maxRight - 500);
      break;
    case 1:
      ballX = maxRight;
      ballY = FLASHCARD_HEIGHT * (0.5 + segT);
      break;
    case 2:
      ballX = maxRight - segT * (maxRight - maxLeft);
      ballY = FLASHCARD_HEIGHT * 1.5;
      break;
    case 3:
      ballX = maxLeft;
      ballY = FLASHCARD_HEIGHT * (1.5 + segT);
      break;
    case 4:
      ballX = maxLeft + segT * (maxRight - maxLeft);
      ballY = FLASHCARD_HEIGHT * 2.5;
      break;
    case 5:
      ballX = maxRight;
      ballY = FLASHCARD_HEIGHT * (2.5 + segT);
      break;
    case 6:
      ballX = maxRight - segT * (maxRight - maxLeft);
      ballY = FLASHCARD_HEIGHT * 3.5;
      break;
    case 7:
      ballX = maxLeft;
      ballY = FLASHCARD_HEIGHT * (3.5 + segT);
      break;
    case 8:
      ballX = maxLeft + segT * (maxRight - maxLeft);
      ballY = FLASHCARD_HEIGHT * 4.5;
      break;
    default:
      ballX = maxRight;
      ballY = FLASHCARD_HEIGHT * (4.5 + Math.min(segT, 1));
  }

  const cardOpacity = (i: number) => Math.min(Math.max((progress - (i - 1) * SEG) / SEG, 0), 1);

  return (
    <div className={`transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
      <Header
        imageUrl={headerData.imageUrl}
        header={headerData.header}
        subheader={headerData.subheader}
        fancy={headerData.fancy}
      />

      <div className="flex md:flex-row flex-col w-full justify-between pt-12">
        <div className="font-golos md:w-[60%] w-full px-8 pb-20">
          <div className="text-[32px] mb-8 weight-500">{heroData.title}</div>
          <div className="text-[20px] weight-400">
            {heroData.description.map((line, i) => (
              <div className={i > 0 ? "mt-6" : ""} key={i}>
                {line}
              </div>
            ))}
          </div>
        </div>
        <div className="md:px-8">
          <Image
            src={heroData.imageUrl}
            alt="Illustration of our program"
            width={800}
            height={600}
            className="h-full w-full object-contain"
            priority
          />
        </div>
      </div>

      <div className="px-8">
        <div className="text-5xl font-golos pb-8 mt-20">Our Model</div>
        <div ref={ref} className="relative flex flex-col">
          {window.innerWidth >= 1200 && (
            <>
              <div
                className="lineX absolute"
                style={{
                  left: 505,
                  top: FLASHCARD_HEIGHT * 0.5,
                  width: progress * (maxRight - 500),
                }}
              />
              <div className="circle absolute" style={{ left: ballX + 2.5, top: ballY + 2.5 }} />
            </>
          )}
          {flashcards.map((f, idx) => {
            const rowCls = idx % 2 === 0 ? "flex-row" : "flex-row-reverse";
            return (
              <div
                key={idx}
                className={`relative flex ${rowCls} items-center`}
                style={{ opacity: cardOpacity(idx), transition: "opacity 2s linear" }}
              >
                <Flashcard {...f} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FlashcardPage;
