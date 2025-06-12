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
      <p className="text-[14px] md:text-lg pt-4">{description}</p>

      {/* Pillars Flexbox Layout - Ensuring All Items Stay in One Line */}
      <div className="mt-10 flex flex-nowrap justify-between gap-6 h-60">
        {pillars.map((pillar, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-xl px-6 md:px-0 py-12 text-center shadow-sm w-1/4 min-w-[200px] h-full"
          >
            <div className="mx-auto w-1/3 h-[60%] mb-4 relative">
              <Image src={pillar.icon} alt={pillar.title} fill={true} className="object-fill" />
            </div>
            <h3 className="text-xl font-semibold">{pillar.title}</h3>
            <p className="text-gray-600">{pillar.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
