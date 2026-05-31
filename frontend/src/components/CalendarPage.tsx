"use client";

import Header from "./Header";

const CalendarPage: React.FC = () => {
  return (
    <>
      <Header
        imageUrl={"/images/calendar-header.png"}
        header={"Upcoming Events"}
        subheader={
          "Check out our weekly and special upcoming events! Join the Homework family today and connect with others while giving back to the community around you."
        }
      />
      <section className="mx-auto w-full max-w-6xl px-6 pb-14 pt-10 md:px-12 md:pb-20 md:pt-14">
        <h1 className="text-left font-golos text-[28px] font-medium leading-tight md:text-[48px]">
          Events Calendar
        </h1>
        <iframe
          className="mt-6 h-[560px] w-full border border-[#777] md:mt-10 md:h-[700px]"
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FLos_Angeles&showPrint=0&src=dHNlLmhvbWV3b3JrLmRldkBnbWFpbC5jb20&src=OWViMzgzM2YxNjI0OWRjNDhlOTU1YTk3MGM4ZDZmMjVjYTVhMGZjMGVlNjdjM2UzNTUzMzRjMjE3ZGRlOWJjYkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%23E67C73&color=%230B8043"
          title="Homework Events Calendar"
        ></iframe>
      </section>
    </>
  );
};
export default CalendarPage;
