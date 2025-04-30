"use client";
import DOMPurify from "dompurify";
import { marked } from "marked";
import Image from "next/image";
import { useEffect, useState } from "react";

import Header from "@/components/Header";

export default function OurTeamPage() {
  const [bioMD, setBioMD] = useState<string[]>();
  const [gridWidth, setGridWidth] = useState(0);
  const imageFrac = 0.25;

  const teamMembers = [
    {
      name: "Jason Shanley",
      title: "Founder & CEO",
      imageUrl: "/images/jason-shanley.png",
      bio: "Fire Captain\nFather\nSmart Fella\n<https://www.youtube.com>",
    },
    {
      name: "Jason Shanley",
      title: "Founder & CEO",
      imageUrl: "/images/jason-shanley.png",
      bio: "Fire Captain",
    },
    {
      name: "Jason Shanley",
      title: "Founder & CEO",
      imageUrl: "/images/jason-shanley.png",
      bio: "Fire Captain",
    },
    {
      name: "Jason Shanley",
      title: "Founder & CEO",
      imageUrl: "/images/jason-shanley.png",
      bio: "Fire Captain",
    },
    {
      name: "Jason Shanley",
      title: "Founder & CEO",
      imageUrl: "/images/jason-shanley.png",
      bio: "Fire Captain",
    },
    {
      name: "Jason Shanley",
      title: "Founder & CEO",
      imageUrl: "/images/jason-shanley.png",
      bio: "Fire Captain",
    },
  ];
  useEffect(() => {
    const getGridWidth = () => {
      const gridContainer = document.getElementById("grid-container");
      if (gridContainer) {
        //display grid after loading
        gridContainer.style.display = "grid";

        setGridWidth(gridContainer.offsetWidth);
      }
    };

    window.addEventListener("resize", getGridWidth);
    getGridWidth();

    // add styling to links
    DOMPurify.removeAllHooks();
    DOMPurify.addHook("afterSanitizeAttributes", function (node) {
      if (node.tagName === "A") {
        node.setAttribute("class", "text-primary_orange hover:underline");
      }
    });

    void (async () => {
      const sanitizedBios = await Promise.all(
        teamMembers.map(async (member) => {
          // convert markdown to html
          const rawHtml = await marked(member.bio);
          // sanitize html to prevent injection
          return DOMPurify.sanitize(rawHtml, {
            ALLOWED_TAGS: ["a", "b", "i", "em", "strong", "p", "br", "ul", "ol", "li"],
            ALLOWED_ATTR: ["href", "target", "rel"],
          });
        }),
      );
      setBioMD(sanitizedBios);
    })();

    return () => {
      window.removeEventListener("resize", getGridWidth);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-text_black">
      {/* Header */}
      <Header
        imageUrl="/images/our-team-header.png"
        header="Our Team"
        subheader="Our incredible staff that drives the spirit of Homework. We’re committed to helping you redefine what it means to be formerly incarcerated."
      />

      {/* Team Members Section */}
      <div className="mx-[32px] py-12">
        <h2 className="text-[16px] font-medium sm:text-[48px] leading-[3rem] sm:leading-[3.5rem] tracking-normal text-left mb-6">
          Our Team
        </h2>

        <p className="mb-12 text-[20px]">
          We’re a team of XX, XX, and XX, actively changing what it means to be previously
          incarcerated. We’re XX, XX, and XX, and we’re just getting started.
        </p>

        {/* Grid Layout */}
        <div
          id="grid-container"
          style={{ gap: `20px ${(gridWidth * (1 - 3 * imageFrac)) / 2}px` }}
          className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 hidden"
        >
          {teamMembers.map((member, index) => (
            <div key={index}>
              <div
                className="relative"
                style={{
                  width: `${gridWidth * imageFrac}px`,
                  height: `${gridWidth * imageFrac}px`,
                }}
              >
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill={true}
                  className="mb-4 object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              {member.title}
              {bioMD && (
                <p
                  dangerouslySetInnerHTML={{ __html: bioMD[index] }}
                  className="text-[12px] whitespace-pre-line"
                ></p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
