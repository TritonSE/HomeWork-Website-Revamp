import QuoteCarousel from "../components/QuoteCarousel";

import Header from "@/components/Header";

export default function Page() {
  const slides = [
    {
      id: 1,
      image: "/images/testimonial.png",
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "John Doe, Member of Homework",
    },
    {
      id: 2,
      image: "/images/testimonial.png",
      quote:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      author: "Jane Smith, CEO of Design Co.",
    },
    {
      id: 3,
      image: "/images/testimonial.png",
      quote:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      author: "Robert Johnson, Lead Developer",
    },
    {
      id: 4,
      image: "/images/testimonial.png",
      quote:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      author: "Sarah Williams, Project Manager",
    },
  ];
  return (
    <>
      <Header
        imageUrl="/home_page.png"
        header="Amplifying the voices of previously incarcerated individuals"
        subheader="We're committed to amplifying the voices of those rebuilding their lives, offering support, mentorship, and guidance for enduring personal growth within a nurturing community."
      />
      <QuoteCarousel slides={slides} />;<h1>Hello</h1>
    </>
  );
}
