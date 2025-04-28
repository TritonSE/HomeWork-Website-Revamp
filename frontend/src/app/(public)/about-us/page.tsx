"use client";
import { Button } from "@tritonse/tse-constellation";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Header from "../../../components/Header";

import { ourHistorySlides, ourValuesSlides } from "./ScrollThroughData";
import ScrollThrough from "@/components/ScrollThrough/ScrollThrough";

const InfoCard: React.FC<{ title: string; icon: string; description: string }> = ({
  title,
  icon,
  description,
}) => {
  return (
    <div className="bg-gray-100 rounded-xl px-6 md:px-0 py-12 text-center shadow-sm w-1/4 min-w-[200px] h-full">
      <div className="mx-auto w-1/3 h-[60%] mb-4 relative">
        <Image src={icon} alt={title} fill={true} className="object-fill" />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};
const Stat: React.FC<{ percentage: number; description: string }> = ({
  percentage,
  description,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="font-libre-baskerville text-[96px] font-bold text-secondary_highlight_1 pb-4">
        {percentage}%
      </div>
      <div className="font-golos text-[20px] font-normal">{description}</div>
    </div>
  );
};

const AboutUsPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col ">
      <Header
        imageUrl="/images/about_us_header_img.png"
        header="About Us"
        subheader="We’re a groundbreaking initiative changing what it means to be formerly incarcerated, changing the stigma of criminal history through recognizing resilience, rehabilitation, and capacity for positive change."
      ></Header>
      {/*our impact */}
      <div className="px-[50px]">
        <div className="font-golos py-[60px]">
          <div className="text-[48px] font-medium pb-4">Our Impact</div>
          <div className="text-[20px] font-normal pb-12">
            Since XX, we’ve shifted the narrative of previously incarcerated people.
          </div>
          <div className="flex flex-col md:flex-row justify-between  items-center md:px-[calc(10%)] gap-8">
            <Stat percentage={20} description="of people do this, this, and this."></Stat>
            <Stat percentage={40} description="of people do this, this, and this."></Stat>
            <Stat percentage={60} description="of people do this, this, and this."></Stat>
          </div>
        </div>
      </div>
      <ScrollThrough heading="Our History" slidesData={ourHistorySlides} />
      <div>
        <div className="flex md:flex-row flex-col md:justify-between bg-text_bg py-[50px] items-center mt-8">
          <div className="font-golos w-full max-w-[calc(80%)] md:max-w-[calc(50%)] ml-[50px] mr-4">
            <div className="text-[48px] font-medium pb-4">Our Mission</div>
            <div className="text-[20px] font-normal max-w-auto">
              We’re reducing recidivism, increasing public safety, and changing the narrative of
              what it means to be formerly incarcerated.
            </div>
          </div>
          <Image
            className="md:pt-0 pt-8 md:mr-[50px] md:max-w-[calc(50%)] max-w-[calc(80%)] mx-auto"
            src="/images/our-mission.png"
            alt="Our Mission"
            width={628}
            height={400}
          ></Image>
        </div>
      </div>
      {/**our vision */}
      <div className="mx-[50px] flex flex-col pt-16">
        <div className="flex flex-col font-golos">
          <div className="text-[48px] font-medium pb-4">Our Vision</div>
          <div className="text-[20px] font-normal pb-6">
            We’re working toward a world where, despite past challenges, people are empowered
            through holistic support— redefining societal perceptions and replacing stigma with a
            recognition of resilience, rehabilitation, and the untapped potential for positive
            change.
          </div>
          <div className="text-[32px] font-medium pb-[20px]">Our Pillars</div>
          <div className="text-[20px] font-normal pb-[60px]">
            This isn&apos;t employment assistance; we&apos;re a close-knit family dedicated to your
            journey. Our Friday night meetings go beyond careers—they&apos;re chances for us to
            connect, share, and grow together.&nbsp;These are the 4 pillars that our organization
            prides ourself on.
          </div>
        </div>
        <div className="mt-10 flex flex-nowrap justify-between gap-6 h-60">
          <InfoCard
            title="Life Skills Development"
            icon="/icons/life-skills.svg"
            description="Fostering Personal Growth"
          ></InfoCard>
          <InfoCard
            title="Family Rebuilding"
            icon="/icons/family-rebuilding.svg"
            description="Restoring Relationships"
          ></InfoCard>
          <InfoCard
            title="Community Restoration"
            icon="/icons/community-restoration.svg"
            description="Rebuilding Neighborhoods"
          ></InfoCard>
          <InfoCard
            title="Civic Engagement"
            icon="/icons/civic-engagement.svg"
            description="Advocating For Change"
          ></InfoCard>
        </div>
      </div>
      {/* our values*/}
      <ScrollThrough heading="Our Values" slidesData={ourValuesSlides} />
      {/**our team */}
      <div className="mx-[50px] flex md:flex-row flex-col md:justify-between md:items-center pt-16 mb-16">
        <div className="flex flex-col md:max-w-[calc(50%)]">
          <div className="font-golos pb-8">
            <div className="text-[48px] font-medium pb-4">Our Team</div>
            <div className="text-[20px] font-normal max-w-[calc(80%)]">
              We’re a team of XX, XX, and XX, actively changing what it means to be previously
              incarcerated. We’re XX, XX, and XX, and we’re just getting started.
            </div>
          </div>
          <Button
            className="max-w-44 mb-8"
            onClick={() => {
              router.push("/our-team");
            }}
          >
            Meet Our Team
          </Button>
        </div>
        <Image
          className="md:max-w-[calc(50%)] max-w-[calc(80%)] md:mx-0 mx-auto"
          src="/images/our-team2.png"
          alt="Our Team"
          width={628}
          height={471}
        ></Image>
      </div>
    </div>
  );
};
export default AboutUsPage;
