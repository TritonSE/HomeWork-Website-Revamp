"use client";
import { Button } from "@tritonse/tse-constellation";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Header from "../../../components/Header";

import { ourHistorySlides, ourValuesSlides } from "./ScrollThroughData";

import DemoButton from "@/components/Notifications/DemoButton";
import { NotificationProvider } from "@/components/Notifications/NotificationProvider";
import ScrollThrough from "@/components/ScrollThrough/ScrollThrough";

const InfoCard: React.FC<{ title: string; icon: string; description: string }> = ({
  title,
  icon,
  description,
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center bg-text_bg rounded-xl p-8 pillars:w-[20%] md:w-[45%] w-full h-auto">
      <Image
        src={icon}
        alt={title}
        className="w-[30%] h-auto mx-auto"
        width={312}
        height={238}
      ></Image>

      <div className="text-center font-golos font-medium mt-2 text-[20px] max-w-xs">{title}</div>
      <div className="text-center font-golos font-normal mt-2 text-[16px]">{description}</div>
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
            Since 2019, we&apos;ve helped rewrite what life after incarceration can look like.
          </div>
          <div className="flex flex-col md:flex-row justify-between  items-center md:px-[calc(10%)] gap-8">
            <Stat
              percentage={68}
              description="of formerly incarcerated people in the U.S. return to prison."
            ></Stat>
            <Stat
              percentage={46}
              description="of formerly incarcerated people in California are reincarcerated."
            ></Stat>
            <Stat
              percentage={100}
              description="of our engaged members have stayed out of prison."
            ></Stat>
          </div>
        </div>
      </div>
      <NotificationProvider>
        <DemoButton />
      </NotificationProvider>
      <ScrollThrough heading="Our History" slidesData={ourHistorySlides} />
      <div>
        <div className="flex md:flex-row flex-col md:justify-between bg-text_bg py-[50px] items-center">
          <div className="font-golos w-full max-w-[calc(80%)] md:max-w-[calc(50%)] ml-[50px] mr-4">
            <div className="text-[48px] font-medium pb-4">Our Mission</div>
            <div className="text-[20px] font-normal max-w-auto">
              We&apos;re reducing recidivism, increasing public safety, and changing the narrative
              of what it means to be formerly incarcerated.
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
        <div className="flex flex-wrap pillars:justify-between justify-center md:gap-8 gap-y-12">
          <InfoCard
            title="Life Skills Development"
            icon="/images/flashcards/flashcard1.png"
            description="Fostering Personal Growth"
          ></InfoCard>
          <InfoCard
            title="Family Rebuilding"
            icon="/images/flashcards/flashcard2.png"
            description="Restoring Relationships"
          ></InfoCard>
          <InfoCard
            title="Community Restoration"
            icon="/images/flashcards/flashcard3.png"
            description="Rebuilding Neighborhoods"
          ></InfoCard>
          <InfoCard
            title="Civic Engagement"
            icon="/images/flashcards/flashcard4.png"
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
              We’re a team of 7 board members and 100+ members redefining what it means to be
              formerly incarcerated.
            </div>
          </div>
          <Button
            className="max-w-[calc(25%)] md:mx-0 mx-auto mb-8"
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
