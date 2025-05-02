"use client";

import React, { useContext, useEffect, useState } from "react";

import BoxLinkGroup from "@/components/BoxLinkGroup";
import { EventsCarousel } from "@/components/EventsCarousel/EventsCarousel";
import { EventsCarouselCard } from "@/components/EventsCarousel/EventsCarouselCard";
import Header from "@/components/Header";
import HomeworkModel from "@/components/HomeworkModel";
import Mission from "@/components/Mission";
import NewsPastEvents from "@/components/NewsPastEvents";
import SuccessStories from "@/components/SuccessStories";
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

  // events carousel
  const eventsField = homeData.fields.find((f) => f.name === "events");
  const events: Event[] = (eventsField?.data as Event[]) ?? [];

  return (
    <div className={`transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
      <Header imageUrl={imageUrl} header={header} subheader={subheader} fancy={fancy} />

      <Mission />
      <BoxLinkGroup />
      <HomeworkModel />
      <SuccessStories />
      <NewsPastEvents />

      <div className="mb-10">
        <EventsCarousel>
          {events.map((evt, i) => (
            <EventsCarouselCard key={i} event={evt} />
          ))}
        </EventsCarousel>
      </div>
    </div>
  );
}
