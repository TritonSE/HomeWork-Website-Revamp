"use client";

import React from "react";

import CollapsibleSection from "../../../components/CollapsibleSection";

import SignupForm from "@/components/SignupForm";

export default function PageEditor() {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // placeholder upload handler
    console.log("Uploading file:", e.target.files);
  };

  const updateField = (name: string, data: any) => {
    // placeholder update handler
    console.log(`Field ${name} updated:`, data);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-start py-8 space-y-8">
      <div className="w-[1028px] bg-white px-6 py-8">
        <CollapsibleSection title="Header" initialOpen>
          <div className="space-y-6">
            <div className="pl-12 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-base font-normal leading-5 text-[#6C6C6C] mb-1">
                  Title
                </label>
                <input
                  type="text"
                  defaultValue="Amplifying the voices of previously incarcerated individuals"
                  onChange={(e) => {
                    updateField("header.title", e.target.value);
                  }}
                  className="w-full border border-[#D9D9D9] rounded-sm px-3 py-2 text-base leading-5"
                />
              </div>

              {/* Subtext */}
              <div>
                <label className="block text-base font-normal leading-5 text-[#6C6C6C] mb-1">
                  Subtext
                </label>
                <textarea
                  defaultValue={
                    "We're committed to amplifying the voices of those rebuilding their lives, offering support, mentorship, and guidance for enduring personal growth within a nurturing community."
                  }
                  onChange={(e) => {
                    updateField("header.subtext", e.target.value);
                  }}
                  className="w-full border border-[#D9D9D9] rounded-sm px-3 py-2 text-base leading-5 text-gray-900 h-28"
                />
                <div className="text-sm text-gray-500 text-right mt-1">20 / 200 words</div>
              </div>

              {/* Section Image */}
              <div>
                <label className="block text-base font-normal leading-5 text-[#6C6C6C] mb-1">
                  Section Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block"
                />
              </div>
            </div>
          </div>
        </CollapsibleSection>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="px-6 py-3 bg-orange-500 text-white rounded-none"
            onClick={() => {
              console.log("Save Changes clicked");
            }}
          >
            Save Changes
          </button>
        </div>
        git
      </div>
    </div>
  );
}
