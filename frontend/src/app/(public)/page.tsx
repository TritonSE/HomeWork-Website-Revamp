import BoxLinkGroup from "@/components/BoxLinkGroup";
import Checkout from "@/components/checkout";
import { EventsCarousel } from "@/components/EventsCarousel/EventsCarousel";
import { EventsCarouselCard } from "@/components/EventsCarousel/EventsCarouselCard";
import Header from "@/components/Header";
import HomeworkModel from "@/components/HomeworkModel";
import Mission from "@/components/Mission";
import NewsPastEvents from "@/components/NewsPastEvents";

type Event = {
  header: string;
  dateCreated: string;
  body: string;
  thumbnail: string;
  thumbnailAlt?: string;
  learnMoreUrl: string;
};

const events: Event[] = [
  {
    header: "ABC 10 News Features Community Connection",
    dateCreated: "January 15, 2025",
    body: "Tonight, Homework SD had our very first women's-only Building Trades event. We had Jenifer (Ironworkers Local 229), Jennifer...",
    thumbnail: "images/event1.png",
    learnMoreUrl: "https://example.com/event1",
  },
  {
    header: "First Women's Building Trades Event",
    dateCreated: "January 15, 2025",
    body: "Tonight, Homework SD had our very first women's-only Building Trades event. We had Jenifer (Ironworkers Local 229), Jennifer...",
    thumbnail: "images/event2.png",
    learnMoreUrl: "https://example.com/event1",
  },
];

export default function Page() {
  return (
    <>
      <Header
        imageUrl="/home_page.png"
        header="Amplifying the voices of previously incarcerated individuals"
        subheader="We're committed to amplifying the voices of those rebuilding their lives, offering support, mentorship, and guidance for enduring personal growth within a nurturing community."
        fancy={true}
      />
      <Checkout />
      <Mission />
      <BoxLinkGroup />
      <HomeworkModel />
      <NewsPastEvents />

      <div className="mb-10">
        <EventsCarousel>
          <EventsCarouselCard key="1" event={events[0]} />
          <EventsCarouselCard key="2" event={events[1]} />
          <EventsCarouselCard key="3" event={events[1]} />
          <EventsCarouselCard key="4" event={events[1]} />
        </EventsCarousel>
      </div>
    </>
  );
}
