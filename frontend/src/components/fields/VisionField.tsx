import Image from "next/image";
import React from "react";

import { VisionData } from "@/types/fieldTypes";

type VisionFieldProps = {
  data: VisionData;
  index: number;
  fieldName: string;
  onTextChange: (id: string, text: string) => void;
  wordCounts: Record<string, number>;
  countWords: (text: string) => number;
  getStringValue: (value: unknown) => string;
};

const VisionField: React.FC<VisionFieldProps> = ({
  data,
  index,
  fieldName,
  onTextChange,
  wordCounts,
  countWords,
  getStringValue,
}) => {
  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          defaultValue={getStringValue(data.title) ?? ""}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          defaultValue={getStringValue(data.description) ?? ""}
          rows={3}
          id={`${fieldName}-description-${index.toString()}`}
          onChange={(e) => {
            onTextChange(`${fieldName}-description-${index.toString()}`, e.target.value);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
        />
        <div className="text-xs text-gray-500 mt-1 text-right">
          {wordCounts[`${fieldName}-description-${index.toString()}`] ??
            countWords(getStringValue(data.description) ?? "")}
          /200 words
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Pillars Title</label>
        <input
          type="text"
          defaultValue={getStringValue(data.pillars?.title) ?? ""}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Pillars Description</label>
        <textarea
          defaultValue={getStringValue(data.pillars?.description) ?? ""}
          rows={3}
          id={`${fieldName}-pillars-description-${index.toString()}`}
          onChange={(e) => {
            onTextChange(`${fieldName}-pillars-description-${index.toString()}`, e.target.value);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
        />
        <div className="text-xs text-gray-500 mt-1 text-right">
          {wordCounts[`${fieldName}-pillars-description-${index.toString()}`] ??
            countWords(getStringValue(data.pillars?.description) ?? "")}
          /200 words
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Pillar Cards</label>
        {data.pillars?.cards?.map((card, cardIndex) => (
          <div key={cardIndex} className="mb-4 p-4 border border-gray-200 rounded-md">
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Title</label>
              <input
                type="text"
                defaultValue={card.title}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Description
              </label>
              <input
                type="text"
                defaultValue={card.description}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Icon</label>
              <div className="border border-dashed border-gray-300 rounded-md p-4">
                {card.icon ? (
                  <div className="relative">
                    <div className="relative h-32 w-32 mx-auto">
                      <Image
                        src={card.icon}
                        alt={`${card.title} icon`}
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-md"
                      />
                      <button className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      ></path>
                    </svg>
                    <p className="mt-1 text-sm text-gray-500">Upload an icon</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default VisionField;
