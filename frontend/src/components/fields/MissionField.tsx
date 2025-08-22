import React from "react";

import { FieldImageUpload } from "./FieldImageUpload";

import { MissionData } from "@/types/fieldTypes";

type MissionFieldProps = {
  data: MissionData;
  index: number;
  onFieldChange: (fieldIndex: number, newData: Record<string, unknown>) => void;
  onPendingFile?: (blobUrl: string, file: File) => void;
  onRemovePending?: (blobUrl: string) => void;
};

const MissionField: React.FC<MissionFieldProps> = ({
  data,
  index,
  onFieldChange,
  onPendingFile,
  onRemovePending,
}) => {
  const handleChange = (key: keyof MissionData, value: string) => {
    onFieldChange(index, { ...data, [key]: value });
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={data.title ?? ""}
          onChange={(e) => {
            handleChange("title", e.target.value);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={data.description ?? ""}
          rows={3}
          onChange={(e) => {
            handleChange("description", e.target.value);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Mission Image</label>
        <FieldImageUpload
          value={data.imageUrl ?? ""}
          onChange={(url) => {
            onFieldChange(index, { ...data, imageUrl: url });
          }}
          onPendingFile={onPendingFile}
          onRemovePending={onRemovePending}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
        <input
          type="text"
          value={data.buttonText ?? ""}
          onChange={(e) => {
            handleChange("buttonText", e.target.value);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
        <input
          type="text"
          value={data.buttonLink ?? ""}
          onChange={(e) => {
            handleChange("buttonLink", e.target.value);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
        />
      </div>
    </div>
  );
};

export default MissionField;
