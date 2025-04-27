"use client";
import { Button, TextField } from "@tritonse/tse-constellation";
import Image from "next/image";
import React, { useState } from "react";

const DonationPage = () => {
  const [formData, setFormData] = useState({
    isAnonymous: false,
    isDonatingOnBehalf: false,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "card", // 'card' or 'paypal'
  });

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    // console.log("Form submitted:", formData);
  };

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

        {/* Right Column - Donation Form */}
        <div className="bg-white p-6 border-2 border-[#D9D9D9]">
          <h2 className="text-2xl mb-6">Who&apos;s Donating?</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.isAnonymous}
                  onChange={(e) => {
                    handleInputChange("isAnonymous", e.target.checked);
                  }}
                  className="form-checkbox accent-[#F26522]"
                />
                <span>Keep my donation anonymous</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.isDonatingOnBehalf}
                  onChange={(e) => {
                    handleInputChange("isDonatingOnBehalf", e.target.checked);
                  }}
                  className="form-checkbox accent-[#F26522]"
                />
                <span>I would like to donate on the behalf of someone else</span>
              </label>
            </div>

            <TextField
              label="First Name"
              value={formData.firstName}
              onChange={(v: string) => {
                handleInputChange("firstName", v);
              }}
              placeholder="Enter your first name"
            />

            <TextField
              label="Last Name"
              value={formData.lastName}
              onChange={(v: string) => {
                handleInputChange("lastName", v);
              }}
              placeholder="Enter your last name"
            />

            <TextField
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(v: string) => {
                handleInputChange("email", v);
              }}
              placeholder="Enter email"
            />

            <TextField
              label="Phone"
              type="tel"
              value={formData.phone}
              onChange={(v: string) => {
                handleInputChange("phone", v);
              }}
              placeholder="Enter phone number"
            />

            <TextField
              label="Address"
              value={formData.address}
              onChange={(v: string) => {
                handleInputChange("address", v);
              }}
              placeholder="Enter street address"
            />

            <TextField
              label="City"
              value={formData.city}
              onChange={(v: string) => {
                handleInputChange("city", v);
              }}
              placeholder="Enter city name"
            />

            <TextField
              label="State"
              value={formData.state}
              onChange={(v: string) => {
                handleInputChange("state", v);
              }}
              placeholder="Enter state name"
            />

            <TextField
              label="Zip Code"
              value={formData.zipCode}
              onChange={(v: string) => {
                handleInputChange("zipCode", v);
              }}
              placeholder="Enter zip code"
            />

            <div className="space-y-4">
              <h3 className="text-2xl">Choose Payment Method</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={(e) => {
                      handleInputChange("paymentMethod", e.target.value);
                    }}
                    className="form-radio accent-[#F26522]"
                  />
                  <span>Credit Card / Debit Card</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === "paypal"}
                    onChange={(e) => {
                      handleInputChange("paymentMethod", e.target.value);
                    }}
                    className="form-radio accent-[#F26522]"
                  />
                  <span>PayPal / Venmo</span>
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#F26522] text-white py-3 rounded-md hover:bg-[#d55416] transition-colors"
            >
              Give Securely
            </Button>
          </form>
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
