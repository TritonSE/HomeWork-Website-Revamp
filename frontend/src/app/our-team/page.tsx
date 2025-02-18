import Image from "next/image";

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
      <div className="relative w-full h-[60vh] mx-auto">
        <Image
          src="/images/our-team.png"
          alt="Our Team"
          layout="fill"
          objectFit="cover" // Ensures the image covers the area without leaving space
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start text-white text-left px-5 sm:px-10 lg:px-20">
          <h1 className="font-[libre-baskerville] font-bold text-[3rem] sm:text-[4rem] lg:text-[5rem] leading-[3.5rem] sm:leading-[4.5rem] lg:leading-[5rem] tracking-normal w-full max-w-[90%] sm:max-w-[80%] lg:max-w-[70%]">
            Our Team
          </h1>
          <p className="max-w-2xl text-lg mt-4">
            Our incredible staff that drives the spirit of Homework. We’re committed to helping you
            redefine what it means to be formerly incarcerated.
          </p>
        </div>
      </div>

      {/* Gap Section */}
      <div className="h-[20px] sm:h-[40px]"></div>

      {/* Team Members Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="font-medium text-[2.5rem] sm:text-[3rem] leading-[3rem] sm:leading-[3.5rem] tracking-normal text-left mb-6">
          Our Team
        </h2>

        <p className="text-center mb-12 text-lg">
          We’re a team of XX, XX, and XX, actively changing what it means to be previously
          incarcerated. We’re XX, XX, and XX, and we’re just getting started.
        </p>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center flex flex-col items-center">
              <Image
                src={member.imageUrl}
                alt={member.name}
                width={300}
                height={300}
                className="mx-auto mb-4 object-cover"
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
