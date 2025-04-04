"use client";

import ScrollThrough from "./ScrollThrough";

// Example data for "Our Values"
const ourValuesSlides = [
  {
    title: "Self-Awareness",
    description:
      "We encourage self-awareness by recognizing the unique challenges individuals face post-incarceration. Understanding oneself is the first step toward meaningful reintegration.",
    image: "/images/ScrollThroughs/OurValues/self_awareness.svg",
  },
  {
    title: "Self-Advocacy",
    description:
      "We empower individuals to advocate for themselves, emphasizing the importance of asserting one's needs and aspirations in the journey to rebuilding lives.",
    image: "/images/ScrollThroughs/OurValues/self_advocacy.svg",
  },
  {
    title: "Self-Reflection",
    description:
      "We foster a culture of self-reflection, promoting an ongoing examination of personal growth and areas for improvement. This commitment to self-audit ensures continuous progress.",
    image: "/images/ScrollThroughs/OurValues/self_reflection.svg",
  },
  {
    title: "Resilience",
    description:
      "Embracing the inherent strength and resilience within each person, we foster an environment that encourages growth and transformation beyond past challenges.",
    image: "/images/ScrollThroughs/OurValues/resilience.svg",
  },
  {
    title: "Community",
    description:
      "We value the importance of community in the rehabilitation process, recognizing that strong connections and supportive networks are essential for successful reentry and increased public safety.",
    image: "/images/ScrollThroughs/OurValues/community.svg",
  },
  {
    title: "Equality and Inclusion",
    description:
      "We are committed to fostering an inclusive environment, advocating for equal opportunities and challenging stereotypes to ensure that formerly incarcerated individuals are treated with dignity and respect.",
    image: "/images/ScrollThroughs/OurValues/equality_inclusion.svg",
  },
  {
    title: "Collaboration",
    description:
      "We believe in the power of collaboration, forging partnerships with diverse stakeholders to create a unified front in our mission to enhance public safety and challenge societal narratives.",
    image: "/images/ScrollThroughs/OurValues/collaboration.svg",
  },
  {
    title: "Education",
    description:
      "We prioritize education as a transformative tool, promoting continuous learning and skill development to empower individuals with the knowledge necessary for a successful reintegration into society.",
    image: "/images/ScrollThroughs/OurValues/education.svg",
  },
  {
    title: "Compassion",
    description:
      "Infusing our work with compassion, we approach each individual with empathy and understanding, recognizing the potential for positive change and growth in every person.",
    image: "/images/ScrollThroughs/OurValues/compassion.svg",
  },
  {
    title: "Advocacy",
    description:
      "We are dedicated advocates for policy reforms that support the rehabilitation of formerly incarcerated individuals, working towards systemic changes that contribute to a more just and compassionate society.",
    image: "/images/ScrollThroughs/OurValues/advocacy.svg",
  },
];

// Example data for "Our History"
const ourHistorySlides = [
  {
    title: "2012",
    description: [
      "We're a groundbreaking initiative born out of the collaboration between local firefighter Jason Shanley and the San Diego Building And Construction Trades Council. ",
      "Recognizing the need for a paradigm shift in traditional job placement strategies for individuals returning from prison, Jason embarked on a mission to create a program that focuses on support during employment rather than pre-employment readiness.",
    ],
    image: "/images/ScrollThroughs/OurHistory/2012.svg",
  },
  {
    title: "2014",
    description: [
      "We're a groundbreaking initiative born out of the collaboration between local firefighter Jason Shanley and the San Diego Building And Construction Trades Council. ",
      "Recognizing the need for a paradigm shift in traditional job placement strategies for individuals returning from prison, Jason embarked on a mission to create a program that focuses on support during employment rather than pre-employment readiness.",
    ],
    image: "/images/ScrollThroughs/OurHistory/2014.svg",
  },
  {
    title: "2016",
    description: [
      "We're a groundbreaking initiative born out of the collaboration between local firefighter Jason Shanley and the San Diego Building And Construction Trades Council. ",
      "Recognizing the need for a paradigm shift in traditional job placement strategies for individuals returning from prison, Jason embarked on a mission to create a program that focuses on support during employment rather than pre-employment readiness.",
    ],
    image: "/images/ScrollThroughs/OurHistory/2016.svg",
  },
];

export default function ScrollThroughPage() {
  return (
    <main>
      {/* Section: Our Values */}
      <ScrollThrough heading="Our Values" slidesData={ourValuesSlides} />

      {/* Section: Our History */}
      <ScrollThrough heading="Our History" slidesData={ourHistorySlides} />
    </main>
  );
}
