import React from "react";

import { FieldImageUpload } from "./FieldImageUpload";

import { HeaderData } from "@/types/fieldTypes";

type HeaderFieldProps = {
  data: HeaderData;
  index: number;
  fieldName: string;
  onTextChange: (id: string, text: string) => void;
  wordCounts: Record<string, number>;
  countWords: (text: string) => number;
  getStringValue: (value: unknown) => string;
  onFieldChange: (fieldIndex: number, newData: Record<string, unknown>) => void;
  onPendingFile?: (blobUrl: string, file: File) => void;
  onRemovePending?: (blobUrl: string) => void;
};

const HeaderField: React.FC<HeaderFieldProps> = ({
  data,
  index,
  fieldName,
  onTextChange,
  wordCounts,
  countWords,
  getStringValue,
  onFieldChange,
  onPendingFile,
  onRemovePending,
}) => {
  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={getStringValue(data.header) ?? getStringValue(data.title) ?? ""}
          onChange={(e) => {
            onFieldChange(index, { header: e.target.value });
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
        <textarea
          value={getStringValue(data.subheader) ?? getStringValue(data.subtitle) ?? ""}
          rows={3}
          id={`${fieldName}-subtitle-${index.toString()}`}
          onChange={(e) => {
            onTextChange(`${fieldName}-subtitle-${index.toString()}`, e.target.value);
            onFieldChange(index, { subheader: e.target.value });
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
        />
        <div className="text-xs text-gray-500 mt-1 text-right">
          {wordCounts[`${fieldName}-subtitle-${index.toString()}`] ??
            countWords(getStringValue(data.subheader) ?? getStringValue(data.subtitle) ?? "")}
          /200 words
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Fancy Header</label>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={!!data.fancy}
            onChange={(e) => {
              onFieldChange(index, { fancy: e.target.checked });
            }}
            className="h-4 w-4 text-[#f26522] focus:ring-[#f26522] border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">Enable fancy header style</label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Header Image</label>
        <FieldImageUpload
          value={data.imageUrl ?? ""}
          onChange={(url) => {
            onFieldChange(index, { ...data, imageUrl: url });
          }}
          onPendingFile={onPendingFile}
          onRemovePending={onRemovePending}
        />
      </div>
    </>
  );
};

export default HeaderField;
