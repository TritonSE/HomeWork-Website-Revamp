"use client";

import React, { useContext, useState } from "react";
import { Button, TextField } from "@tritonse/tse-constellation";
import { PageDataContext } from "@/contexts/pageDataContext";
import Checkout from "@/components/Checkout";
import Image from "next/image";

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
    <div className="pt-24">
      <div className="px-8 grid md:grid-cols-2 gap-8 mb-16">
        {/* Left Column - Impact Information */}
        <div className="space-y-6">
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
    </div>
  );
};

export default DonationPage;
