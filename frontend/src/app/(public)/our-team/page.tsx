"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";

import { PageDataContext } from "@/contexts/pageDataContext";

export default function OurTeamPage() {
  const context = useContext(PageDataContext);
  const [isVisible, setIsVisible] = useState(false);

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

  const headerData = headerField?.data as {
    title: string;
    description: string;
  };

  const teamMembers =
    (membersField?.data as { name: string; title: string; imageUrl: string }[]) ?? [];

  return (
    <div
      className={`min-h-screen bg-white transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="h-[20px] sm:h-[40px]" />
      <div className="mx-[32px] py-12">
        <h2 className="font-medium text-[2.5rem] sm:text-[3rem] leading-[3rem] sm:leading-[3.5rem] tracking-normal text-left mb-6">
          {headerData.title}
        </h2>
        <p className="mb-12 text-lg">{headerData.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <div key={index} className="mx-auto flex flex-col">
              <Image
                src={member.imageUrl}
                alt={member.name}
                width={300}
                height={300}
                className="mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              {member.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
