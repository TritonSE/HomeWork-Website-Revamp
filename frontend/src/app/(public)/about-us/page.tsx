"use client";

"use client";

import { Button } from "@tritonse/tse-constellation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

import Header from "@/components/Header";
import ScrollThrough from "@/components/ScrollThrough/ScrollThrough";
import { PageDataContext } from "@/contexts/pageDataContext";

// Types for field.data

type Slide = {
  title: string;
  description: string[];
  image: string;
};

type HeaderData = {
  imageUrl: string;
  header: string;
  subheader: string;
  fancy?: boolean;
};

type ImpactData = {
  title: string;
  description: string;
  stats: { percentage: number; description: string }[];
};

type HistoryData = {
  heading: string;
  slidesData: Slide[];
};

type MissionData = {
  title: string;
  description: string;
  imageUrl?: string;
};

type VisionData = {
  title: string;
  description: string;
  pillars: {
    title: string;
    description: string;
    cards: { title: string; icon: string; description: string }[];
  };
};

type ValuesData = {
  heading: string;
  slidesData: Slide[];
};

type TeamData = {
  title: string;
  description: string;
  buttonLabel?: string;
  buttonLink?: string;
  imageUrl?: string;
};

// Components
const InfoCard: React.FC<{ title: string; icon: string; description: string }> = ({
  title,
  icon,
  description,
}) => (
  <div className="bg-gray-100 rounded-xl px-6 md:px-0 py-12 text-center shadow-sm w-1/4 min-w-[200px] h-full">
    <div className="mx-auto w-1/3 h-[60%] mb-4 relative">
      <Image src={icon} alt={title} fill={true} className="object-fill" />
    </div>
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Stat: React.FC<{ percentage: number; description: string }> = ({
  percentage,
  description,
}) => (
  <div className="flex flex-col items-center">
    <div className="font-libre-baskerville text-[96px] font-bold text-secondary_highlight_1 pb-4">
      {percentage}
    </div>
    <div className="font-golos text-[20px] font-normal">{description}</div>
  </div>
);

const AboutUsPage = () => {
  const router = useRouter();
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

  const aboutData = pageData.find((data) => data.pagename === "about-us");
  if (!aboutData) return <div>No About Us page data found.</div>;

  const headerField = aboutData.fields.find((field) => field.name === "header");
  const impactField = aboutData.fields.find((field) => field.name === "impact");
  const historyField = aboutData.fields.find((field) => field.name === "history");
  const missionField = aboutData.fields.find((field) => field.name === "mission");
  const visionField = aboutData.fields.find((field) => field.name === "vision");
  const valuesField = aboutData.fields.find((field) => field.name === "values");
  const teamField = aboutData.fields.find((field) => field.name === "team");

  const headerData = headerField?.data as HeaderData;
  const impactData = impactField?.data as ImpactData;
  if (!historyField) return null;
  const historyData = historyField?.data as HistoryData;
  const missionData = missionField?.data as MissionData;
  const visionData = visionField?.data as VisionData;
  const valuesData = valuesField?.data as ValuesData;
  const teamData = teamField?.data as TeamData;

  return (
    <div
      className={`flex flex-col transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Header Section */}
      {headerField && (
        <Header
          imageUrl={headerData.imageUrl}
          header={headerData.header}
          subheader={headerData.subheader}
          fancy={headerData.fancy}
        />
      )}
      {/* Our Impact Section */}
      {impactField && (
        <div className="px-12">
          <div className="font-golos py-[60px]">
            <div className="text-[48px] font-medium pb-4">{impactData.title}</div>
            <div className="text-[20px] font-normal pb-12">{impactData.description}</div>
            <div className="flex flex-col md:flex-row justify-between items-center md:px-[calc(10%)] gap-8">
              {impactData.stats.map((stat, index) => (
                <Stat key={index} percentage={stat.percentage} description={stat.description} />
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Our History Section */}
      {historyField && (
        <ScrollThrough heading={historyData.heading} slidesData={historyData.slidesData} />
      )}
      {/* Our Mission Section */}
      {missionField && (
        <div className="flex md:flex-row flex-col md:justify-between bg-text_bg py-[50px] items-center mt-8">
          <div className="font-golos w-full max-w-[calc(80%)] md:max-w-[calc(50%)] ml-[50px] mr-4">
            <div className="text-[48px] font-medium pb-4">{missionData.title}</div>
            <div className="text-[20px] font-normal max-w-auto">{missionData.description}</div>
          </div>
          {missionData.imageUrl && (
            <Image
              className="md:pt-0 pt-8 md:mr-[50px] md:max-w-[calc(50%)] max-w-[calc(80%)] mx-auto"
              src={missionData.imageUrl}
              alt="Our Mission"
              width={628}
              height={400}
            />
          )}
        </div>
      )}
      {/* Our Vision & Pillars Section */}
      {visionField && visionData.pillars && (
        <div className="mx-[50px] flex flex-col pt-16">
          <div className="flex flex-col font-golos">
            <div className="text-[48px] font-medium pb-4">{visionData.title}</div>
            <div className="text-[20px] font-normal pb-6">{visionData.description}</div>
            <div className="text-[32px] font-medium pb-[20px]">{visionData.pillars.title}</div>
            <div className="text-[20px] font-normal pb-[60px]">
              {visionData.pillars.description}
            </div>
          </div>
          <div className="mt-10 flex flex-nowrap justify-between gap-6 h-60">
            {visionData.pillars.cards.map((card, index) => (
              <InfoCard
                key={index}
                title={card.title}
                icon={card.icon}
                description={card.description}
              />
            ))}
          </div>
        </div>
      )}
      {/* Our Values Section */}
      {valuesField && (
        <ScrollThrough heading={valuesData.heading} slidesData={valuesData.slidesData} />
      )}
      {/* Our Team Section */}
      {teamField && (
        <div className="mx-[50px] flex md:flex-row flex-col md:justify-between md:items-center pt-16 mb-16">
          <div className="flex flex-col md:max-w-[calc(50%)]">
            <div className="font-golos pb-8">
              <div className="text-[48px] font-medium pb-4">{teamData.title}</div>
              <div className="text-[20px] font-normal max-w-[calc(80%)]">
                {teamData.description}
              </div>
            </div>
            {teamData.buttonLabel && (
              <Button
                className="max-w-44 mb-8"
                onClick={() => {
                  if (teamData.buttonLink) {
                    router.push(teamData.buttonLink);
                  }
                }}
              >
                {teamData.buttonLabel}
              </Button>
            )}
          </div>
          {teamData.imageUrl && (
            <Image
              className="md:max-w-[calc(50%)] max-w-[calc(80%)] md:mx-0 mx-auto"
              src={teamData.imageUrl}
              alt={teamData.title}
              width={628}
              height={471}
            />
          )}
        </div>
      )}
    </div>
  );
};
export default AboutUsPage;
