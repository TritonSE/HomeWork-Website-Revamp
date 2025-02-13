import QuoteCarousel from "../components/QuoteCarousel";
import { QuoteCarouselCardProps } from "../components/QuoteCarouselCard";

export default function Page() {
  //"/images/testimonial.png"
  const testimonials: QuoteCarouselCardProps[] = [
    {
      id: 1,
      name: "-- John Doe, Member of Homework",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      image: "/images/testimonial.png",
    },
    {
      id: 2,
      name: "-- John Doe, Member of Homework",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      image: "/images/testimonial.png",
    },
    {
      id: 3,
      name: "-- John Doe, Member of Homework",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      image: "/images/testimonial.png",
    },
    {
      id: 4,
      name: "-- John Doe, Member of Homework",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      image: "/images/testimonial.png",
    },
  ];
  return (
    <div>
      <QuoteCarousel item={testimonials} />
    </div>
  );
}
