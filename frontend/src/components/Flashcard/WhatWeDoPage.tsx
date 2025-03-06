// "use client";
// import React from "react";
// import Flashcard from "./Flashcard";

// const FlashcardPage: React.FC = () => {
//   const flashcards = [
//     {
//       title: "Attending a Life Skills Workshop",
//       icon: "/images/flashcards/flashcard1.png",
//       info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     },
//     {
//       title: "Rebuilding Families",
//       icon: "/images/flashcards/flashcard2.png",
//       info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     },
//     {
//       title: "Supporting the Community",
//       icon: "/images/flashcards/flashcard3.png",
//       info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     },
//     {
//       title: "Participating in Civic Engagement",
//       icon: "/images/flashcards/flashcard4.png",
//       info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     },
//     {
//       title: "Entering the Union",
//       icon: "/images/flashcards/flashcard5.png",
//       info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     },
//     {
//       title: "Joining the Homework Family",
//       icon: "/images/flashcards/flashcard6.png",
//       info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     },
//   ];

//   return (
//     <div>
//       <div className="flex md:flex-row flex-col w-full justify-between pt-12">
//         <div className="font-golos  md:w-[calc(60%)] md:max-w-4xl w-full px-8 md:pb-0 pb-20">
//           <div className="text-[32px] mb-8 weight-500 ">
//             Transforming Lives, Empowering Communities
//           </div>
//           <div className="text-[20px] weight-400">
//             <div>
//               By leveraging community resources, we establish a supportive peer mentoring
//               environment that empowers San Diegans towards lasting change and success.
//             </div>
//             <div className="mt-6">
//               Our transformative approach to post-incarceration support emphasizes continuous
//               assistance during employment rather than solely focusing on pre-employment readiness.
//               Through collaborative efforts, we are committed to facilitating a seamless transition
//               for individuals returning from incarceration. Our Friday night classes serve as a
//               gateway to Union careers. To enhance engagement, we organize unique in-person
//               gatherings six times a year, bringing together Trade Union representatives and
//               individuals with diverse incarceration experiences. These gatherings foster
//               discussions on high-wage careers, apprenticeship programs, and occupational skills
//               training.
//             </div>
//           </div>
//         </div>
//         <div className="md:px-8">
//           <img src="/images/whatwedo.png" className="h-[calc(100%)] object-contain w-full" />
//         </div>
//       </div>
//       <div className="px-8">
//         <div className="text-5xl font-golos pb-8 mt-20">Our Model</div>
//         <div className="flex flex-col">
//           {flashcards.map((flashcard, index) => (
//             <div key={index} className="relative flex flex-col">
//               <div
//                 className={`flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} w-full items-center`}
//               >
//                 <Flashcard {...flashcard} />
//                 {index < 5 && (
//                   <>
//                     <div className="w-[calc(100%-724.5px)] h-[5px] bg-gray-600" />
//                     <div className="h-[206.5px] w-[5px] bg-gray-600 mt-auto" />
//                   </>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FlashcardPage;
"use client";
import React, { useEffect, useState } from "react";
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

  const [scrollPosition, setScrollPosition] = useState(0);
  const [screenWidth, setScreenWidth] = useState(20000);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);

      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };

      const handleScroll = () => {
        setScrollPosition(window.scrollY);
      };

      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  const [numReached, setNumReached] = useState(1); //reached as in got to above this box and will trigger vertical
  const [ballXPos, setBallXPos] = useState(500);
  const [ballYPosition, setBallYPosition] = useState(204);

  const maxRightPosition = screenWidth - 360;
  const maxLeftPosition = 360;

  useEffect(() => {
    console.log(horizontalDir);
    console.log(verticalDir);
    if (horizontalDir) {
      if (numReached % 2 === 1) {
        let newX = 500 + scrollPosition * 2.5;
        if (newX > maxRightPosition) newX = maxRightPosition;
        setBallXPos(newX);
      } else {
        let newX = maxRightPosition - scrollPosition * 2.5; // need fix this
        if (newX < maxLeftPosition) newX = maxLeftPosition;
        setBallXPos(newX);
      }
    }
    if (verticalDir) {
      setBallYPosition(204 + (scrollPosition - firstScroll) * 1);
    }
  }, [scrollPosition, numReached]); // Recalculate when scrolling or direction changes

  const isMaxPositionReached = ballXPos === maxRightPosition;
  const isMinPositionReached = ballXPos === maxLeftPosition;
  const horizontalDir =
    (ballYPosition === 712 || ballYPosition === 204) &&
    !isMaxPositionReached &&
    !isMinPositionReached;
  const verticalDir = !horizontalDir;

  // need to have when reaches 712 or 204, horizontal is true. if x becomes max/min then becomes vertical
  const reachedBlock = Math.floor((ballYPosition - 204) / 408) + 1; // actually reached the midpoint of the block
  const [secondHorizontal, setSecondHorizontal] = useState(0);
  const [firstScroll, setFirstScroll] = useState(0); //firstscroll is how much scrolling it took to reach first vertical point
  //probably need more of these scrolls for the other vertical scrolls
  useEffect(() => {
    if (horizontalDir) {
      setSecondHorizontal(window.scrollY);
      // console.log(secondHorizontal);
    }
  }, [horizontalDir]);
  useEffect(() => {
    if (isMaxPositionReached) {
      if (numReached === 1) {
        // setReachedFirstEnd(true);
        setNumReached(2);
        setFirstScroll((ballXPos - 500) / 2.5);
      }
    }
    if (isMinPositionReached) {
      if (numReached === 2) {
      }
    }
  }, [isMaxPositionReached, isMinPositionReached]);
  return (
    <div>
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

        <div className="relative flex flex-col">
          {flashcards.map((flashcard, index) => (
            <div key={index} className="relative flex flex-col">
              <div
                className={`flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} w-full items-center`}
              >
                <Flashcard {...flashcard} />
                {index === 0 && (
                  <div>
                    <div
                      className="lineX"
                      style={{
                        left: `525px`,
                        width: `${ballXPos - 500}px`,
                      }}
                    ></div>
                    {!isMaxPositionReached && (
                      <>
                        <div
                          className="circle"
                          style={{
                            left: `${ballXPos}px`, // Ball moves along the line
                          }}
                        ></div>
                      </>
                    )}

                    {isMaxPositionReached && (
                      <>
                        {reachedBlock === 2 && (
                          <div
                            className="lineY"
                            style={{
                              left: `${ballXPos + 25}px`,
                              top: `204px`,
                              height: `408px`,
                            }}
                          ></div>
                        )}
                        {!(reachedBlock === 2) && (
                          <>
                            <div
                              className="lineY"
                              style={{
                                left: `${screenWidth - 360 + 25}px`,
                                top: `204px`,
                                height: `${ballYPosition - 204}px`,
                              }}
                            ></div>
                            <div
                              className="circle"
                              style={{
                                left: `${screenWidth - 360}px`,
                                top: `${ballYPosition}px`,
                              }}
                            ></div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                )}
                {/* can check ballYposition-204 to check if reached 2nd */}
                {index === 1 && reachedBlock === 2 && (
                  <>
                    <div className="lineX" style={{ right: screenWidth - 360 }}></div>
                    <div className="circle" style={{ left: screenWidth - 360 }}></div>
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
