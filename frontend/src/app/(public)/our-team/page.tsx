"use client";
import DOMPurify from "dompurify";
import { marked } from "marked";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

import Header from "@/components/Header";
import { PageDataContext } from "@/contexts/pageDataContext";

type Member = { name: string; title: string; imageUrl: string; bio: string };
type Intro = { title: string; description: string };
type Header = { imageUrl: string; header: string; subheader: string };

export default function OurTeamPage() {
  const context = useContext(PageDataContext);
  const [isVisible, setIsVisible] = useState(false);

  const [members, setMembers] = useState<Member[]>();
  const [descriptionData, setDescriptionData] = useState<Intro>();
  const [headerData, setHeaderData] = useState<Header>();
  const [bioMD, setBioMD] = useState<string[]>();

  useEffect(() => {
    // add styling to links
    DOMPurify.removeAllHooks();
    DOMPurify.addHook("afterSanitizeAttributes", function (node) {
      if (node.tagName === "A") {
        node.setAttribute("class", "text-primary_orange hover:underline");
      }
    });
  }, []);

  useEffect(() => {
    if (context?.pageData && !context.loading) {
      const { pageData } = context;
      const teamPage = pageData.find((data) => data.pagename === "our-team");

      const descriptionField = teamPage?.fields.find((field) => field.name === "description");
      const membersField = teamPage?.fields.find((field) => field.name === "members");
      const headerField = teamPage?.fields.find((field) => field.name === "header");
      setMembers(membersField?.data as Member[]);
      setDescriptionData(descriptionField?.data as Intro);
      setHeaderData(headerField?.data as Header);

      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [context]);

  useEffect(() => {
    if (members) {
      void (async () => {
        const sanitizedBios = await Promise.all(
          members.map(async (member) => {
            if (!member.bio) return "";
            // convert markdown to html
            const rawHtml = await marked(member.bio.replace(/\\n/g, "\n"));
            // sanitize html to prevent injection
            return DOMPurify.sanitize(rawHtml, {
              ALLOWED_TAGS: ["a", "b", "i", "em", "strong", "p", "br", "ul", "ol", "li"],
              ALLOWED_ATTR: ["href", "target", "rel"],
            });
          }),
        );
        setBioMD(sanitizedBios);
      })();
    }
  }, [members]);

  return (
    <div
      className={`min-h-screen bg-white transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Header */}
      <Header
        imageUrl={headerData?.imageUrl ?? ""}
        header={headerData?.header ?? ""}
        subheader={headerData?.subheader ?? ""}
      />

      {/* Team Members Section */}
      <div className="h-[20px] sm:h-[40px]" />
      <div className="p-6 md:p-12">
        <h2 className="text-[28px] font-medium md:text-[48px] leading-[3rem] sm:leading-[3.5rem] tracking-normal text-left mb-2 md:mb-6">
          {descriptionData?.title}
        </h2>
        <p className="mb-12 text-[14px] md:text-[20px]">{descriptionData?.description}</p>
        {/* Grid Layout */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 md:gap-x-10 md:gap-y-12">
          {members?.map((member, index) => (
            <div key={index} className="min-w-0">
              <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill={true}
                  className="object-cover"
                />
              </div>
              <h3 className="mt-2 text-[20px] font-semibold leading-tight md:text-xl">{member.name}</h3>
              <p className="text-[14px] leading-snug md:text-lg">{member.title}</p>
              {bioMD && (
                <p
                  dangerouslySetInnerHTML={{ __html: bioMD[index] }}
                  className="whitespace-pre-line pt-1 text-[11px] leading-relaxed md:text-[12px]"
                ></p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
