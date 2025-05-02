"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import { Button, TextField } from "@tritonse/tse-constellation";

import { PageDataContext } from "@/contexts/pageDataContext";

const DonationPage: React.FC = () => {
  const context = useContext(PageDataContext);

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
    paymentMethod: "card",
  });

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

  // 5) Handlers
  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  // 6) Render
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
              onChange={(v) => {
                handleInputChange("firstName", v);
              }}
              placeholder="Enter your first name"
            />

            <TextField
              label="Last Name"
              value={formData.lastName}
              onChange={(v) => {
                handleInputChange("lastName", v);
              }}
              placeholder="Enter your last name"
            />

            <TextField
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(v) => {
                handleInputChange("email", v);
              }}
              placeholder="Enter email"
            />

            <TextField
              label="Phone"
              type="tel"
              value={formData.phone}
              onChange={(v) => {
                handleInputChange("phone", v);
              }}
              placeholder="Enter phone number"
            />

            <TextField
              label="Address"
              value={formData.address}
              onChange={(v) => {
                handleInputChange("address", v);
              }}
              placeholder="Enter street address"
            />

            <TextField
              label="City"
              value={formData.city}
              onChange={(v) => {
                handleInputChange("city", v);
              }}
              placeholder="Enter city name"
            />

            <TextField
              label="State"
              value={formData.state}
              onChange={(v) => {
                handleInputChange("state", v);
              }}
              placeholder="Enter state name"
            />

            <TextField
              label="Zip Code"
              value={formData.zipCode}
              onChange={(v) => {
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
