import QuoteCarousel from "./QuoteCarousel";

export default function SuccessStories() {
  return (
    <section className="pt-12 text-text_black">
      <h2 className="text-[48px] font-medium">Success Stories</h2>
      <p className="text-lg mt-4">
        Discover the transformative impact of our work through the success stories of individuals
        whose lives have changed through resilience and rehabilitation, supported by our
        contributions.
      </p>

      <div className="mt-10 flex flex-nowrap justify-between gap-4">
        <QuoteCarousel
          slides={[
            {
              id: 1,
              image: "images/testimonial.png",
              quote:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              author: "John Doe, Member of Homework",
            },
            {
              id: 2,
              image: "images/testimonial.png",
              quote:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              author: "John Doe, Member of Homework",
            },
            {
              id: 3,
              image: "images/testimonial.png",
              quote:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              author: "John Doe, Member of Homework",
            },
            {
              id: 4,
              image: "images/testimonial.png",
              quote:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              author: "John Doe, Member of Homework",
            },
            {
              id: 5,
              image: "images/testimonial.png",
              quote:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              author: "John Doe, Member of Homework",
            },
            {
              id: 6,
              image: "images/testimonial.png",
              quote:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              author: "John Doe, Member of Homework",
            },
          ]}
        />
      </div>
    </section>
  );
}
