import Header from "@/components/Header";
import Mission from "@/components/Mission";
import BoxLinkGroup from "@/components/BoxLinkGroup";
import { EventsCarousel } from "@/components/EventsCarousel/EventsCarousel";
import { EventsCarouselCard } from "@/components/EventsCarousel/EventsCarouselCard";

export default function Page() {
  const event1: Event = {
    header: "Event 1",
    dateCreated: "2025-03-12",
    body: "This is the first event description.",
    thumbnail: "/path/to/thumbnail1.jpg", // Ensure this path is correct
    learnMoreUrl: "/event1",
    thumbnailAlt: "Thumbnail for Event 1", // Optional
  };

  return (
    <>
      <Header
        imageUrl="/home_page.png"
        header="Amplifying the voices of previously incarcerated individuals"
        subheader="We're committed to amplifying the voices of those rebuilding their lives, offering support, mentorship, and guidance for enduring personal growth within a nurturing community."
      />
      <Mission />
      <BoxLinkGroup />
      <EventsCarousel>
        {/* <EventsCarouselCard key="1" event={event1} />
        <EventsCarouselCard key="2" event={event1} />
        <EventsCarouselCard key="3" event={event1} />
        <EventsCarouselCard key="4" event={event1} /> */}
      </EventsCarousel>
    </>
  );
}
