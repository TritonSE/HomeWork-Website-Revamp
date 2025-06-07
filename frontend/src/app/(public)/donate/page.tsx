"use client";
import Image from "next/image";
import React, { useContext } from "react";

import Checkout from "@/components/Checkout";
import DonateCarousel from "@/components/DonateCarousel";
import Header from "@/components/Header";
import { PageDataContext } from "@/contexts/pageDataContext";

const DonationPage = () => {
  const context = useContext(PageDataContext);

  if (!context) return <div>Error: Page data not available.</div>;
  const { pageData, loading } = context;
  if (loading) return null;

  // 4) Pull page fields
  const donateData = pageData.find((p) => p.pagename === "donate");
  if (!donateData) return <div>No donation page data found.</div>;

  const introField = donateData.fields.find((f) => f.name === "intro");
  const statsField = donateData.fields.find((f) => f.name === "stats");
  const introImageField = donateData.fields.find((f) => f.name === "introImage");
  const thankYouField = donateData.fields.find((f) => f.name === "thankYou");

  if (!introField || !statsField || !introImageField || !thankYouField) {
    return <div>Donation page fields missing</div>;
  }

  const intro = introField.data as { title: string; description: string };
  const stats = statsField.data as { number: string; description: string }[];
  const introImage = introImageField.data as { imageUrl: string; alt: string };
  const thankYou = thankYouField.data as {
    title: string;
    paragraphs: string[];
    imageUrl: string;
  };
  return (
    <>
      <Header
        imageUrl={"/images/donate-header.png"}
        header={"Donate"}
        subheader={
          "Make a difference today! Your generous support helps us continue empowering families and creating meaningful change in our community. Every contribution, big or small, fuels our mission and brings us closer to a brighter future."
        }
      >
        <button
          onClick={() => {
            const el = document.getElementById("content");
            if (el) {
              const y = el.getBoundingClientRect().top + window.scrollY - 150;
              window.scrollTo({ top: y, behavior: "smooth" });
            }
          }}
          className="border rounded-lg px-6 py-4 bg-transparent hover:bg-white/25"
        >
          Donate Now
        </button>
      </Header>

      <DonateCarousel
        images={[
          "/images/donation-1.JPG",
          "/images/donation-2.JPG",
          "/images/donation-3.JPG",
        ]}
      />
      <div className="mx-8 my-16 grid md:grid-cols-2 gap-8">
        {/* Left Column - Impact Information */}
        <div id="content" className="space-y-6">
          <h1 className="text-4xl mb-4">{intro.title}</h1>
          <p className="text-[#1b1b1b] mb-6">{intro.description}</p>

          <div className="space-y-8">
            {stats.map((s, idx) => (
              <div key={idx} className="flex items-center">
                <span className="font-libre-baskerville font-semibold text-[#F26522] text-6xl mr-6">
                  {s.number}
                </span>
                <p className="text-[#1b1b1b]">{s.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Image src={introImage.imageUrl} alt={introImage.alt} width={600} height={431} />
          </div>
        </div>

        {/* Right Column - Stripe Checkout */}
        <div className="bg-white p-6 border-2 border-[#D9D9D9]">
          <h2 className="text-2xl mb-6">Make Your Donation</h2>
          <Checkout />
        </div>
      </div>

      {/* Thank You Section */}
      <div className="grid md:grid-cols-2 bg-[#F26522] overflow-hidden">
        <div className="p-12 text-white">
          <h2 className="text-6xl font-libre-baskerville mb-8">{thankYou.title}</h2>
          <div className="space-y-6">
            {thankYou.paragraphs.map((p, i) => (
              <p key={i} className="text-xl">
                {p}
              </p>
            ))}
          </div>
        </div>
        <div className="relative h-[400px]">
          <Image
            src={thankYou.imageUrl}
            alt="Homework Community Impact"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </>
  );
};

export default DonationPage;
