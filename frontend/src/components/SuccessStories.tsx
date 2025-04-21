import QuoteCarousel from "./QuoteCarousel";

export default function SuccessStories() {
  return (
    <section className="px-8 md:px-16 py-12">
      <h2 className="text-[48px] font-bold text-gray-900">Success Stories</h2>
      <p className="text-gray-600 mt-4 max-w-2xl">
        Discover the transformative impact of our work through the success stories of individuals
        whose lives have changed through resilience and rehabilitation, supported by our
        contributions.
      </p>

      <div className="mt-10 flex flex-nowrap justify-between gap-4">
        <QuoteCarousel
          slides={[
            {
              id: 1,
              image: "images/tavo-vega.png",
              quote:
                "Being a part of HoMEworkSD gives me a safe space where I can be myself. My lived experiences may get me labeled as someone from a stigmatized community, but I am empowered to embrace my challenges and successes with HoMEworkSD.",
              author: "Tavo Vega, Member of Homework",
            },
            {
              id: 2,
              image: "images/coach-ed.png",
              quote:
                "HoMEwork has offered me the opportunity to build a foundation that has and will continue to, support both me and my family’s future. To build a legacy that will help others even after I am gone. To build an appreciation for community that resonates with the acronym TEAM, because Together Everyone Achieves More.",
              author: "Coach Ed Wallace, Member of Homework",
            },
            {
              id: 3,
              image: "images/adrian-vargas.png",
              quote:
                "15-0-10 KO HoMEwork is a safe place where I am not judged for my past nor the life I have lived. HoMEwork gave me the drive and the tools I needed to construct those bridges which I once tore down and was afraid to walk across.",
              author: "Adrian Vargas, Member of Homework",
            },
            {
              id: 4,
              image: "images/matt-edwards.png",
              quote:
                "HoMEwork embodies the four pillars: Family Rebuilding, Civic Engagement, Life Skills Development and Community Restoration. We offer a safe space, a community where individuals discover family, support, powerful networking and dedication to transformation. It means paving the way for a prosocial future worth having.",
              author: "Matt Edwards, Member of Homework",
            },
          ]}
        />
      </div>
    </section>
  );
}
