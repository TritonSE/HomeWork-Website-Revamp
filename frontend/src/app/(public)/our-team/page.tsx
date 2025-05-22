"use client";
import DOMPurify from "dompurify";
import { marked } from "marked";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

import Header from "@/components/Header";
import { PageDataContext } from "@/contexts/pageDataContext";

export default function OurTeamPage() {
  const context = useContext(PageDataContext);
  const [isVisible, setIsVisible] = useState(false);

  const [bioMD, setBioMD] = useState<string[]>();
  const [gridWidth, setGridWidth] = useState(0);
  const imageFrac = 0.25;

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

  useEffect(() => {
    if (context?.pageData && !context.loading) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [context]);

  if (!context) return <div>Error: Page data not available.</div>;
  const { pageData, loading } = context;
  if (loading) return null;

  const teamPage = pageData.find((data) => data.pagename === "our-team");
  if (!teamPage) return <div>No team page data found.</div>;

  const headerField = teamPage.fields.find((field) => field.name === "header");
  const membersField = teamPage.fields.find((field) => field.name === "members");
  const teamMembers =
    (membersField?.data as { name: string; title: string; imageUrl: string; bio: string }[]) ?? [];

  const headerData = headerField?.data as {
    title: string;
    description: string;
  };

  return (
    <div
      className={`min-h-screen bg-white transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Header */}
      <Header
        imageUrl="/images/our-team-header.png"
        header="Our Team"
        subheader="Our incredible staff that drives the spirit of Homework. We’re committed to helping you redefine what it means to be formerly incarcerated."
      />

      {/* Team Members Section */}
      <div className="h-[20px] sm:h-[40px]" />

      <div className="p-12">
        <h2 className="text-[16px] font-medium sm:text-[48px] leading-[3rem] sm:leading-[3.5rem] tracking-normal text-left mb-6">
          {headerData.title}
        </h2>
        <p className="mb-12 text-[20px]">{headerData.description}</p>

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
