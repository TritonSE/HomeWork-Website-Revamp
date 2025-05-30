"use client";
import React, { useContext, useEffect, useState } from "react";

import { BoxLinkProps } from "@/components/BoxLink";
import BoxLinkGroup from "@/components/BoxLinkGroup";
import { EventsCarousel } from "@/components/EventsCarousel/EventsCarousel";
import { EventsCarouselCard } from "@/components/EventsCarousel/EventsCarouselCard";
import Header from "@/components/Header";
import HomeworkModel from "@/components/HomeworkModel";
import Mission from "@/components/Mission";
import NewsPastEvents, { NewsPastEventsData } from "@/components/NewsPastEvents";
import SuccessStories, { SuccessStoriesData } from "@/components/SuccessStories";
import { PageDataContext } from "@/contexts/pageDataContext";

type Event = {
  header: string;
  dateCreated: string;
  body: string;
  thumbnail: string;
  thumbnailAlt?: string;
  learnMoreUrl: string;
};

export default function HomePage() {
  const context = useContext(PageDataContext);
  const [isVisible, setIsVisible] = useState(false);

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

  if (!context) return <div>Error: Page data not available.</div>;
  const { pageData, loading } = context;
  if (loading) return null;

  const homeData = pageData.find((p) => p.pagename === "home");
  if (!homeData) return <div>No home page data found.</div>;

  // header
  const headerField = homeData.fields.find((f) => f.name === "header");
  if (!headerField) return <div>Header field missing</div>;
  const { imageUrl, header, subheader, fancy } = headerField.data as {
    imageUrl: string;
    header: string;
    subheader: string;
    fancy?: boolean;
  };

  // mission
  const missionField = homeData.fields.find((f) => f.name === "mission");
  const missionData = missionField?.data as {
    title: string;
    description: string;
    imageUrl: string;
    buttonText: string;
    buttonLink: string;
  };

  // BoxlinkGroup
  const boxLinksField = homeData.fields.find((f) => f.name === "boxLinks");
  const boxLinks = (boxLinksField?.data as BoxLinkProps[]) ?? [];

  // Homework Model
  const modelField = homeData.fields.find((f) => f.name === "homeworkModel");
  const modelData =
    (modelField?.data as {
      title: string;
      description: string;
      pillars: { title: string; subtitle: string; icon: string }[];
    }) ?? null;

  // Success Stories
  const successField = homeData.fields.find((f) => f.name === "successStories");
  const successData = (successField?.data as SuccessStoriesData) ?? null;

  // News Past Events
  const newsField = homeData.fields.find((f) => f.name === "newsPastEvents");
  const newsData = (newsField?.data as NewsPastEventsData) ?? null;

  // events carousel
  const eventsField = homeData.fields.find((f) => f.name === "events");
  const events: Event[] = (eventsField?.data as Event[]) ?? [];

  return (
    <div className={`transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
      <Header imageUrl={imageUrl} header={header} subheader={subheader} fancy={fancy} />

      {missionData && <Mission data={missionData} />}
      {boxLinks.length > 0 && <BoxLinkGroup data={boxLinks} />}
      {modelData && <HomeworkModel data={modelData} />}
      {successData && <SuccessStories data={successData} />}
      {newsData && <NewsPastEvents data={newsData} />}
      <div className="mb-10">
        <EventsCarousel>
          <EventsCarouselCard key="1" event={events[0]} />
          <EventsCarouselCard key="2" event={events[1]} />
          <EventsCarouselCard key="3" event={events[1]} />
          <EventsCarouselCard key="4" event={events[1]} />
        </EventsCarousel>
      </div>
    </div>
  );
}
