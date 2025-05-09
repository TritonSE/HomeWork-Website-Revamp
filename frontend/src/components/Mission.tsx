import Link from "next/link";

type MissionData = {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
};

export default function Mission({ data }: { data: MissionData }) {
  const { title, description, imageUrl, buttonText, buttonLink } = data;

  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-12">
      <div className="md:w-1/2">
        <h2 className="text-[48px] font-bold">{title}</h2>
        <p className="mt-4 text-lg text-gray-700">{description}</p>
        <Link href={buttonLink}>
          <button className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition">
            {buttonText}
          </button>
        </Link>
      </div>
      <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
        <img src={imageUrl} alt="Our Mission" className="w-full max-w-md shadow-lg" />
      </div>
    </section>
  );
}
