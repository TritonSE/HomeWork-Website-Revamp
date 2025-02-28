"use client";
import React from "react";
import Flashcard from "./Flashcard";

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

  return (
    <div>
      <div className="flex md:flex-row flex-col w-full justify-between pt-12">
        <div className="font-golos  md:w-[calc(40%)] w-full px-8 md:pb-0 pb-20">
          <div className="text-[32px] mb-8 weight-500 ">
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
              Through collaborative efforts, we are committed to facilitating a seamless transition
              for individuals returning from incarceration. Our Friday night classes serve as a
              gateway to Union careers. To enhance engagement, we organize unique in-person
              gatherings six times a year, bringing together Trade Union representatives and
              individuals with diverse incarceration experiences. These gatherings foster
              discussions on high-wage careers, apprenticeship programs, and occupational skills
              training.
            </div>
          </div>
        </div>
        <div className="md:px-8">
          <img src="/images/whatwedo.png" className="h-[calc(100%)] object-contain w-full" />
        </div>
      </div>
      <div className="px-8">
        <div className="text-5xl font-golos pb-8 mt-20">Our Model</div>
        <div className="flex flex-col">
          {flashcards.map((flashcard, index) => (
            <div key={index} className="relative flex flex-col">
              <div
                className={`flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} w-full items-center`}
              >
                <Flashcard {...flashcard} />
                {index < 5 && (
                  <>
                    <div className="w-[calc(100%-724.5px)] h-[5px] bg-gray-600" />
                    <div className="h-[206.5px] w-[5px] bg-gray-600 mt-auto" />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashcardPage;
