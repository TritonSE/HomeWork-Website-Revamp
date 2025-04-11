"use client";
import React, { useEffect, useState, useRef } from "react";
import Flashcard from "../../../components/Flashcard/Flashcard";
import Header from "../../../components/Header";
const FlashcardPage: React.FC = () => {
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
  // run once and on resize
  const getViewport = () => ({
    w: window.innerWidth,
    h: window.innerHeight,
  });
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
  const [flashcardsTop, setFlashcardsTop] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (flashcardsRef.current) {
        setFlashcardsTop(flashcardsRef.current.offsetTop);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const [progress, setProgress] = useState(0);
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

  useEffect(() => {
    if (!flashcardsHeight) return;
    if (!flashcardsTop) return;
    const START_DELAY = flashcardsTop / 8;

    const onScroll = () => {
      const bottom = window.scrollY + viewport.h;
      const startLine = flashcardsTop + START_DELAY;
      const pxPast = Math.max(0, bottom - startLine);
      const current = Math.min(pxPast / flashcardsHeight, 1);
      setProgress((prev) => (current > prev ? current : prev)); // so doesnt undo animation
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [flashcardsTop, flashcardsHeight, viewport.h]);

  const SEG = 0.1;
  const segIndex = Math.min(Math.floor(progress / SEG), 9);
  const segT = (progress - segIndex * SEG) / SEG;

  const [screenWidth, setScreenWidth] = useState(20000); //arbitrary big

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);

      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const maxRightPosition = screenWidth - 360;
  const maxLeftPosition = 223;
  const cardOpacity = (idx: number) => Math.min(Math.max((progress - (idx - 1) * SEG) / SEG, 0), 1);

  const [ballXPos, ballYPosition] = (() => {
    switch (segIndex) {
      case 0:
        return [500 + segT * (maxRightPosition - 500), 204];
      case 1:
        return [maxRightPosition, 204 + segT * 408];
      case 2:
        return [maxRightPosition - segT * (maxRightPosition - maxLeftPosition), 204 + 408];
      case 3:
        return [maxLeftPosition, 204 + 408 + segT * 408];
      case 4:
        return [maxLeftPosition + segT * (maxRightPosition - maxLeftPosition), 204 + 2 * 408];
      case 5:
        return [maxRightPosition, 204 + 408 + 408 + segT * 408];
      case 6:
        return [maxRightPosition - segT * (maxRightPosition - maxLeftPosition), 204 + 3 * 408];
      case 7:
        return [maxLeftPosition, 204 + 408 + 408 + 408 + segT * 408];
      case 8:
        return [maxLeftPosition + segT * (maxRightPosition - maxLeftPosition), 204 + 4 * 408];
      case 9:
        return [maxRightPosition, 204 + 4 * 408 + segT * 408];
      default:
        return [maxLeftPosition + segT * (maxRightPosition - maxLeftPosition), 204 + 2 * 408];
    }
  })();
  const fill = (seg: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9) =>
    Math.min(Math.max((progress - seg * SEG) / SEG, 0), 1);

  const flashcardsRef = useRef<HTMLDivElement | null>(null);
  return (
    <div>
      <Header
        imageUrl="/images/what-we-do_header_img.png"
        header="What We Do"
        subheader="Prioritizing life skills, our goal extends beyond job placement to ensure excellence and leadership in chosen careers. "
      ></Header>
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
          <div
            className="lineX absolute"
            style={{
              left: 525,
              top: 204,
              width: fill(0) * (maxRightPosition - 500),
            }}
          />
          <div
            className="lineY absolute"
            style={{
              left: maxRightPosition + 25,
              top: 204,
              height: fill(1) * 408,
            }}
          />
          <div
            className="lineX absolute"
            style={{
              left: maxRightPosition + 25 - fill(2) * (maxRightPosition - maxLeftPosition),
              top: 204 + 408,
              width: fill(2) * (maxRightPosition - maxLeftPosition),
            }}
          />
          <div
            className="lineY absolute"
            style={{
              left: maxLeftPosition + 25,
              top: 204 + 408,
              height: fill(3) * 408,
            }}
          />
          <div
            className="lineX absolute"
            style={{
              left: maxLeftPosition + 25,
              top: 204 + 2 * 408,
              width: fill(4) * (maxRightPosition - maxLeftPosition),
            }}
          />
          <div
            className="lineY absolute"
            style={{ left: maxRightPosition + 25, top: 204 + 816, height: fill(5) * 408 }}
          />
          <div
            className="lineX absolute"
            style={{
              left: maxRightPosition + 25 - fill(6) * (maxRightPosition - maxLeftPosition),
              top: 204 + 3 * 408,
              width: fill(6) * (maxRightPosition - maxLeftPosition),
            }}
          />
          <div
            className="lineY absolute"
            style={{
              left: maxLeftPosition + 25,
              top: 204 + 1224,
              height: fill(7) * 408,
            }}
          />
          <div
            className="lineX absolute"
            style={{
              left: maxLeftPosition + 25,
              top: 204 + 4 * 408,
              width: fill(8) * (maxRightPosition - maxLeftPosition),
            }}
          />
          <div
            className="lineY absolute"
            style={{ left: maxRightPosition + 25, top: 204 + 1632, height: fill(9) * 408 }}
          />
          <div className="circle absolute" style={{ left: ballXPos, top: ballYPosition }} />
          {flashcards.map((flashcard, index) => (
            <div
              key={index}
              className={`relative flex ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              } items-center`}
              style={{ opacity: cardOpacity(index), transition: "opacity 2s linear" }}
            >
              <Flashcard {...flashcard} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashcardPage;
