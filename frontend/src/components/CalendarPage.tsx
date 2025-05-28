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
      <div style={{ padding: "50px", maxWidth: "700px" }}>
        <h1 className="text-2xl text-[48px] font-golos font-medium text-left">Events Calendar</h1>
        <iframe
          className="mt-10"
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FLos_Angeles&showPrint=0&src=dHNlLmhvbWV3b3JrLmRldkBnbWFpbC5jb20&src=OWViMzgzM2YxNjI0OWRjNDhlOTU1YTk3MGM4ZDZmMjVjYTVhMGZjMGVlNjdjM2UzNTUzMzRjMjE3ZGRlOWJjYkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%23E67C73&color=%230B8043"
          style={{ border: "solid 1px #777" }}
          width="1000"
          height="600"
        ></iframe>
      </div>
    </>
  );
};
export default CalendarPage;
