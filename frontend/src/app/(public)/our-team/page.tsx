import Image from "next/image";

export default function OurTeamPage() {
  const teamMembers = [
    {
      name: "Jason Shanley",
      title: "President & Founder",
      imageUrl: "/images/jason-shanley.jpeg",
    },
    {
      name: "Tom Lemmon",
      title: "Founding Board Member & Treasurer",
      imageUrl: "/images/tom-lemmon.jpg",
    },
    {
      name: "Geneviéve Jones-Wright",
      title: "Secretary",
      imageUrl: "/images/gen-jones-wright.png",
    },
    {
      name: "Amanda Cave",
      title: "Board member",
      imageUrl: "/images/amanda-cave.jpg",
    },
    {
      name: "Desirae Sanders",
      title: "Board member",
      imageUrl: "/images/desirae-sanders.jpeg",
    },
    {
      name: "Matt Edwards",
      title: "Facilitator, Mentor, & Leader",
      imageUrl: "/images/matt-edwards.png",
    },
    {
      name: "Christina Perry",
      title: "Executive Assistant",
      imageUrl: "/images/christina-perry.png",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}

      {/* Gap Section */}
      <div className="h-[20px] sm:h-[40px]"></div>

      {/* Team Members Section */}
      <div className="mx-[32px] py-12">
        <h2 className="font-medium text-[2.5rem] sm:text-[3rem] leading-[3rem] sm:leading-[3.5rem] tracking-normal text-left mb-6">
          Our Team
        </h2>

        <p className="mb-12 text-lg">
          We’re a team of 7 board members and 100+ members redefining what it means to be formerly
          incarcerated.
        </p>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <div key={index} className="mx-auto flex flex-col">
              <Image
                src={member.imageUrl}
                alt={member.name}
                width={300}
                height={300}
                className="mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              {member.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
