export default function OurTeamPage() {
  const teamMembers = [
    {
      name: "Jason Shanley",
      title: "Founder & CEO",
      position: "Fire Captain",
      imageUrl: "/images/jason-shanley.png",
    },
    {
      name: "Jason Shanley",
      title: "Founder & CEO",
      position: "Fire Captain",
      imageUrl: "/images/jason-shanley.png",
    },
    {
      name: "Jason Shanley",
      title: "Founder & CEO",
      position: "Fire Captain",
      imageUrl: "/images/jason-shanley.png",
    },
    {
      name: "Jason Shanley",
      title: "Founder & CEO",
      position: "Fire Captain",
      imageUrl: "/images/jason-shanley.png",
    },
    {
      name: "Jason Shanley",
      title: "Founder & CEO",
      position: "Fire Captain",
      imageUrl: "/images/jason-shanley.png",
    },
    {
      name: "Jason Shanley",
      title: "Founder & CEO",
      position: "Fire Captain",
      imageUrl: "/images/jason-shanley.png",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Large Image Section */}
      <div className="relative w-[1440px] h-[940px] mx-auto">
        <img src="/images/our-team.png" alt="Our Team" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start text-white text-left px-20">
          <h1 className="font-[libre-baskerville] font-bold text-[64px] leading-[96px] tracking-normal w-[1195px] h-[96px]">
            Our Team
          </h1>
          <p className="max-w-2xl text-lg">
            Our incredible staff that drives the spirit of Homework. We’re committed to helping you
            redefine what it means to be formerly incarcerated.
          </p>
        </div>
      </div>

      {/* Gap Section */}
      <div className="h-[10px]"></div>

      {/* Team Members Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="font-medium text-[48px] leading-[62.4px] tracking-normal w-[1280px] h-[62px] text-left px-5">
          Our Team
        </h2>

        <p className="text-center mb-12">
          We’re a team of XX, XX, and XX, actively changing what it means to be previously
          incarcerated. We’re XX, XX, and XX, and we’re just getting started.
        </p>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-[300px] h-[300px] mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-left px-6">{member.name}</h3>
              <p className="text-left px-6">{member.title}</p>
              <p className="text-sm text-left px-6">{member.position}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
