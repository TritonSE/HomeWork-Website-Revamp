export default function HomeworkModel() {
  const pillars = [
    {
      title: "Life Skills Development",
      subtitle: "Fostering Personal Growth",
      icon: "/icons/life-skills.svg",
    },
    {
      title: "Family Rebuilding",
      subtitle: "Restoring Relationships",
      icon: "/icons/family-rebuilding.svg",
    },
    {
      title: "Community Restoration",
      subtitle: "Rebuilding Neighborhoods",
      icon: "/icons/community-restoration.svg",
    },
    {
      title: "Civic Engagement",
      subtitle: "Advocating For Change",
      icon: "/icons/civic-engagement.svg",
    },
  ];

  return (
    <section className="px-8 md:px-16 py-12">
      <h2 className="text-[48px] font-bold text-gray-900">The Homework Model</h2>
      <p className="text-gray-600 mt-4 max-w-2xl">
        This isn&apos;t employment assistance; we&apos;re a close-knit family dedicated to your
        journey. Our Friday night meetings go beyond careers—they&apos;re chances for us to connect,
        share, and grow together. These are the 4 pillars that our organization prides itself on.
      </p>

      {/* Pillars Flexbox Layout - Ensuring All Items Stay in One Line */}
      <div className="mt-10 flex flex-nowrap justify-between gap-4">
        {pillars.map((pillar, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg p-6 text-center shadow-sm w-1/4 min-w-[200px]"
          >
            <img src={pillar.icon} alt={pillar.title} className="mx-auto h-16 mb-4" />
            <h3 className="text-xl font-semibold">{pillar.title}</h3>
            <p className="text-gray-600">{pillar.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
