import React from "react";

import { FieldImageUpload } from "./FieldImageUpload";

import { BoxLink, BoxLinksData } from "@/types/fieldTypes";

type BoxLinksFieldProps = {
  data: BoxLinksData;
  index: number;
  fieldName: string;
  onFieldChange: (fieldIndex: number, newData: Record<string, unknown>) => void;
};

const BoxLinksField: React.FC<BoxLinksFieldProps> = ({ data, index, onFieldChange }) => {
  const handleBoxLinkChange = (boxIndex: number, newBox: Partial<BoxLink>) => {
    const updated = data.map((box, i) => (i === boxIndex ? { ...box, ...newBox } : box));
    onFieldChange(index, { boxLinks: updated });
  };

  const handleAddBoxLink = () => {
    const updated = [...data, { tall: false, src: "", header: "", body: "", link: "" }];
    onFieldChange(index, { boxLinks: updated });
  };

  const handleRemoveBoxLink = (boxIndex: number) => {
    const updated = data.filter((_, i) => i !== boxIndex);
    onFieldChange(index, { boxLinks: updated });
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">Box Links</label>
        <button
          type="button"
          className="px-3 py-1 bg-[#f26522] text-white rounded-md"
          onClick={handleAddBoxLink}
        >
          Add Box Link
        </button>
      </div>
      <div className="space-y-6">
        {data.map((box, boxIndex) => (
          <div key={boxIndex} className="border border-gray-200 rounded-md p-4 relative">
            <button
              type="button"
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              onClick={() => {
                handleRemoveBoxLink(boxIndex);
              }}
              title="Remove box link"
            >
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
            <div className="mb-2 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-shrink-0">
                <FieldImageUpload
                  value={box.src || ""}
                  onChange={(url) => {
                    handleBoxLinkChange(boxIndex, { src: url });
                  }}
                />
              </div>
              <div className="flex-1">
                <div className="mb-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Header</label>
                  <input
                    type="text"
                    value={box.header}
                    onChange={(e) => {
                      handleBoxLinkChange(boxIndex, { header: e.target.value });
                    }}
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Body</label>
                  <textarea
                    value={box.body}
                    rows={2}
                    onChange={(e) => {
                      handleBoxLinkChange(boxIndex, { body: e.target.value });
                    }}
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Link</label>
                  <input
                    type="text"
                    value={box.link}
                    onChange={(e) => {
                      handleBoxLinkChange(boxIndex, { link: e.target.value });
                    }}
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
                  />
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={box.tall}
                    onChange={(e) => {
                      handleBoxLinkChange(boxIndex, { tall: e.target.checked });
                    }}
                    className="h-4 w-4 text-[#f26522] focus:ring-[#f26522] border-gray-300 rounded"
                  />
                  <label className="block text-xs font-medium text-gray-600">Tall</label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoxLinksField;
