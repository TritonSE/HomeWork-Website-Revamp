import Image from "next/image";
export type Pillar = {
  title: string;
  subtitle: string;
  icon: string;
};

export default function HomeworkModel({
  data,
}: {
  data: {
    title: string;
    description: string;
    pillars: Pillar[];
  };
}) {
  const { title, description, pillars } = data;

  return (
    <section className="text-text_black md:p-12 p-6">
      <h2 className="text-[28px] md:text-[48px] font-medium ">{title}</h2>
      <p className="text-[14px] md:text-lg pt-4 leading-[20px] ">{description}</p>

      <div className="mt-10 h-auto md:h-60 grid grid-flow-row grid-rows-2 grid-cols-2 gap-8 md:flex md:flex-nowrap md:justify-between md:gap-6">
        {pillars.map((pillar, index) => (
          <div
            key={index}
            className="bg-gray-100 h-auto w-auto rounded-xl px-3 md:px-0 py-4 md:w-1/4 md:py-12 text-center shadow-sm md:min-w-[200px] h-full"
          >
            <div className="mx-auto w-[60px] md:w-[100px] h-[54px] md:h-[80px] mb-4 relative">
              <Image src={pillar.icon} alt={pillar.title} fill={true} className="object-fill" />
            </div>
            <h3 className="text-md pb-1 md:pb-0 md:text-xl font-semibold">{pillar.title}</h3>
            <p className="text-xs md:text-lg text-gray-600">{pillar.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
