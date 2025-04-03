import Link from "next/link";
export default function Mission() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-12">
      <div className="md:w-1/2">
        <h2 className="text-[48px] font-bold">Our Mission</h2>
        <p className="mt-4 text-lg text-gray-700">
          We&apos;re Homework. We want to reduce recidivism, increase public safety, and change the
          narrative around what it means to be formerly incarcerated.
        </p>
        <Link href="/our-team">
          <button className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition">
            Learn More
          </button>
        </Link>
      </div>
      <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
        <img
          src="/images/mission_image.png"
          alt="Our Mission"
          className="w-full max-w-md shadow-lg"
        />
      </div>
    </section>
  );
}
