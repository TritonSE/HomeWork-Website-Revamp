/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState, useRef } from "react";
import Flashcard from "../../../components/Flashcard/Flashcard";
import Header from "../../../components/Header";

/**
 * FlashcardPage – responsive flash‑card experience
 *
 * Desktop (≥ 800 px):
 *   – Flashcards alternate left/right with a zig‑zag connecting line that animates on scroll.
 *
 * Mobile (< 800 px):
 *   – Flashcards stack in a single neat column.
 *   – Connecting line becomes a single vertical line straight down the page with the same scroll‑progress animation.
 */
const FlashcardPage: React.FC = () => {
  /* ------------------------------------------------------------------
   * Static flash‑card data
   * ----------------------------------------------------------------*/
  const flashcards = [
    {
      title: "Attending a Life Skills Workshop",
      icon: "/images/flashcards/flashcard1.png",
      info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      title: "Rebuilding Families",
      icon: "/images/flashcards/flashcard2.png",
      info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      title: "Supporting the Community",
      icon: "/images/flashcards/flashcard3.png",
      info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      title: "Participating in Civic Engagement",
      icon: "/images/flashcards/flashcard4.png",
      info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      title: "Entering the Union",
      icon: "/images/flashcards/flashcard5.png",
      info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      title: "Joining the Homework Family",
      icon: "/images/flashcards/flashcard6.png",
      info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];
  const flashcardHeight = 408;
  const getViewport = () => ({ h: window.innerHeight });
  const [viewport, setViewport] = useState(getViewport());

  useEffect(() => {
    const onResize = () => setViewport(getViewport());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const [screenWidth, setScreenWidth] = useState<number>(
    typeof window === "undefined" ? 1200 : window.innerWidth,
  );
  const isMobile = screenWidth < 1200;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
    return () => window.removeEventListener("resize", measure);
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
    return () => window.removeEventListener("scroll", onScroll);
  }, [flashcardsTop, flashcardsHeight, viewport.h]);

  const SEG = 0.1;
  const segIndex = Math.min(Math.floor(progress / SEG), 9);
  const segT = (progress - segIndex * SEG) / SEG;

  const maxRightPosition = screenWidth - 360;
  const maxLeftPosition = 223;
  const [ballXPosDesktop, ballYPositionDesktop] = (() => {
    switch (segIndex) {
      case 0:
        return [500 + segT * (maxRightPosition - 500), flashcardHeight * 2];
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
        return [maxRightPosition, flashcardHeight * (4.5 + segT)];
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
      <Header
        imageUrl="/images/what-we-do_header_img.png"
        header="What We Do"
        subheader="Prioritizing life skills, our goal extends beyond job placement to ensure excellence and leadership in chosen careers. "
      />

      <div className="flex md:flex-row flex-col w-full justify-between pt-12">
        <div className="font-golos  md:w-[calc(60%)] md:max-w-4xl w-full px-8 md:pb-0 pb-20">
          <div className="text-[32px] mb-8 weight-500">
            Transforming Lives, Empowering Communities
          </div>
          <div className="text-[20px] weight-400">
            <div>
              By leveraging community resources, we establish a supportive peer mentoring
              environment that empowers San Diegans towards lasting change and success.
            </div>
            <div className="mt-6">
              Our transformative approach to post-incarceration support emphasizes continuous
              assistance during employment rather than solely focusing on pre-employment readiness.
            </div>
          </div>
        </div>
        <div className="md:px-8">
          <img src="/images/whatwedo.png" className="h-[calc(100%)] object-contain w-full" />
        </div>
      </div>

      <div className="px-8">
        <div className="text-5xl font-golos pb-8 mt-20">Our Model</div>

        <div ref={flashcardsRef} className="relative flex flex-col">
          {!isMobile && (
            <>
              <div
                className="lineX absolute"
                style={{
                  left: 525,
                  top: flashcardHeight * 0.5,
                  width: fill(0) * (maxRightPosition - 500),
                }}
              />
              <div
                className="lineY absolute"
                style={{
                  left: maxRightPosition + 25,
                  top: flashcardHeight * 0.5,
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
                  top: flashcardHeight * 1.5,
                  height: fill(3) * flashcardHeight,
                }}
              />
              <div
                className="lineX absolute"
                style={{
                  left: maxLeftPosition + 25,
                  top: flashcardHeight * 2.5,
                  width: fill(4) * (maxRightPosition - maxLeftPosition),
                }}
              />
              <div
                className="lineY absolute"
                style={{
                  left: maxRightPosition + 25,
                  top: flashcardHeight * 2.5,
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
                style={{ opacity: cardOpacity(index), transition: "opacity 2s linear" }}
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
