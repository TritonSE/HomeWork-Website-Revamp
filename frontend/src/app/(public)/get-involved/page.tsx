import Image from "next/image";

import Header from "@/components/Header";

const Button: React.FC<{ text: string }> = ({ text }) => {
  return (
    <button className="p-3 pr-5 pl-5 w-fit rounded bg-orange-600 text-white font-golos text-xs sm:text-sm hover:bg-orange-500">
      {text}
    </button>
  );
};

const GetInvolvedPage = () => {
  return (
    <>
      <Header
        imageUrl="/images/get-involved-header.png"
        header="Get Involved"
        subheader="Want to get started helping someone you love or help put the ‘ME’ in HoMEwork? Learn how you can get started here."
      />
      <div className="flex flex-col gap-5 sm:gap-10 w-full p-5">
        <section className="flex flex-col sm:flex-row justify-between items-center gap-6 w-full p-5">
          <div className="flex flex-col gap-5 sm:w-7/12 sm:pr-5">
            <h1 className="mb-2 text-2xl sm:text-4xl font-medium font-golos">Attend an Event</h1>
            <p className="text-sm sm:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <Button text="Upcoming Events" />
          </div>
          <Image
            src="/images/get-involved-event.png"
            width={500}
            height={250}
            alt="get involved event"
            className="sm:w-5/12"
          ></Image>
        </section>
        <section className="flex flex-col-reverse sm:flex-row justify-between items-center gap-6 w-full p-5">
          <Image
            src="/images/get-involved-donate.png"
            width={500}
            height={250}
            alt="get involved event"
            className="sm:w-5/12"
          ></Image>
          <div className="flex flex-col gap-5 sm:w-7/12 sm:pl-5">
            <h1 className="mb-2 text-2xl sm:text-4xl font-medium font-golos">Donate</h1>
            <p className="text-sm sm:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <Button text="Donate" />
          </div>
        </section>
      </div>
    </>
  );
};
export default GetInvolvedPage;
