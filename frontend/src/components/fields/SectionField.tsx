import React from "react";

import { FieldImageUpload } from "./FieldImageUpload";

import { SectionData } from "@/types/fieldTypes";

type SectionFieldProps = {
  data: SectionData;
  index: number;
  fieldName: string;
  onFieldChange: (fieldIndex: number, newData: Record<string, unknown>) => void;
  pendingFiles?: Map<string, File>;
  onPendingFile?: (blobUrl: string, file: File) => void;
  onRemovePending?: (blobUrl: string) => void;
};

const SectionField: React.FC<SectionFieldProps> = ({
data,
index,
onFieldChange,
  pendingFiles,
  onPendingFile,
  onRemovePending,
}) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange(index, { ...data, title: e.target.value });
  };

  const handleParagraphChange = (pIndex: number, value: string) => {
    const updatedParagraphs = Array.isArray(data.paragraphs)
      ? data.paragraphs.map((p, i) => (i === pIndex ? value : p))
      : [];
    onFieldChange(index, { ...data, paragraphs: updatedParagraphs });
  };

  const handleAddParagraph = () => {
    const updatedParagraphs = Array.isArray(data.paragraphs) ? [...data.paragraphs, ""] : [""];
    onFieldChange(index, { ...data, paragraphs: updatedParagraphs });
  };

  const handleRemoveParagraph = (pIndex: number) => {
    const updatedParagraphs = Array.isArray(data.paragraphs)
      ? data.paragraphs.filter((_, i) => i !== pIndex)
      : [];
    onFieldChange(index, { ...data, paragraphs: updatedParagraphs });
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={data.title ?? ""}
          onChange={handleTitleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Paragraphs</label>
        <div className="space-y-2">
          {Array.isArray(data.paragraphs) &&
            data.paragraphs.map((p, pIndex) => (
              <div key={pIndex} className="flex gap-2 items-start">
                <textarea
                  value={p}
                  rows={2}
                  onChange={(e) => {
                    handleParagraphChange(pIndex, e.target.value);
                  }}
                  className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
                />
                <button
                  type="button"
                  className="mt-1 bg-red-500 text-white rounded-full p-1 h-8 w-8 flex items-center justify-center"
                  onClick={() => {
                    handleRemoveParagraph(pIndex);
                  }}
                  title="Remove paragraph"
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
              </div>
            ))}
        </div>
        <button
          type="button"
          className="mt-2 px-3 py-1 bg-[#f26522] text-white rounded-md"
          onClick={handleAddParagraph}
        >
          Add Paragraph
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Section Image</label>
        <FieldImageUpload
          value={data.imageUrl ?? ""}
          onChange={(url) => {
            onFieldChange(index, { ...data, imageUrl: url });
          }}
pendingFiles={pendingFiles}
          onPendingFile={onPendingFile}
          onRemovePending={onRemovePending}
        />
      </div>
    </div>
  );
};

export default SectionField;
