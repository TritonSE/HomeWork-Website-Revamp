"use client";
import Checkout from "../../../components/Checkout";
import Image from "next/image";
import React from "react";

const DonationPage = () => {
  return (
    <div className="pt-24">
      <div className="px-8 grid md:grid-cols-2 gap-8 mb-16">
        {/* Left Column - Impact Information */}
        <div className="space-y-6">
          <h1 className="text-4xl mb-4">Make an Impact With Your Donation</h1>
          <p className="text-[#1b1b1b] mb-6">
            Your support makes a world of difference. Every contribution helps us provide vital
            resources, impactful programs, and lasting support to families in need. Thank you for
            making an impact!
          </p>

          <div className="space-y-8">
            <div className="flex items-center">
              <span className="font-libre-baskerville font-semibold text-[#F26522] text-6xl mr-6">
                312
              </span>
              <p className="text-[#1b1b1b]">
                Homework events have been held in total, since the organization&apos;s formation 6
                years ago!
              </p>
            </div>

            <div className="flex items-center">
              <span className="font-libre-baskerville font-semibold text-[#F26522] text-6xl mr-6">
                50+
              </span>
              <p className="text-gray-700">
                families affected and supported with generous donations from sponsors.
              </p>
            </div>

            <div className="flex items-center">
              <span className="font-libre-baskerville font-semibold text-[#F26522] text-6xl mr-6">
                120
              </span>
              <p className="text-[#1b1b1b]">
                current and past members of Homework, and we are always growing!
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Image src="/images/donate.jpeg" alt="Homework Impact" width={600} height={431} />
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
          <h2 className="text-6xl font-libre-baskerville mb-8">Thank you</h2>
          <div className="space-y-6">
            <p className="text-xl">
              Every donation directly contributes to empowering individuals to thrive beyond the
              challenges of incarceration, providing them with the tools for lasting success.
            </p>
            <p className="text-xl">
              Your support helps us create resilient communities, breaking down barriers and
              fostering understanding for a brighter future. Thank you!
            </p>
          </div>
        </div>
        <div className="relative h-[400px]">
          <Image
            src="/images/donateside.jpeg"
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
