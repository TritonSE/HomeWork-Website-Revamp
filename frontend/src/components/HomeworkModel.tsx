import React from "react";

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
    <section className="px-8 md:px-16 py-12">
      <h2 className="text-[48px] font-bold text-gray-900">{title}</h2>
      <p className="text-gray-600 mt-4 max-w-2xl">{description}</p>
      <div className="mt-10 flex flex-nowrap justify-between gap-4">
        {pillars.map((p, i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-lg p-6 text-center shadow-sm w-1/4 min-w-[200px]"
          >
            <img src={p.icon} alt={p.title} className="mx-auto h-16 mb-4" />
            <h3 className="text-xl font-semibold">{p.title}</h3>
            <p className="text-gray-600">{p.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
