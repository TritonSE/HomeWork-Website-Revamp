import React from "react";

import { FieldImageUpload } from "./FieldImageUpload";

import { TeamData } from "@/types/fieldTypes";

type TeamFieldProps = {
  data: TeamData;
  index: number;
  onFieldChange: (fieldIndex: number, newData: Record<string, unknown>) => void;
  onPendingFile?: (blobUrl: string, file: File) => void;
  onRemovePending?: (blobUrl: string) => void;
};

const TeamField: React.FC<TeamFieldProps> = ({
  data,
  index,
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
          value={data.title}
          onChange={(e) => {
            onFieldChange(index, { title: e.target.value });
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={data.description}
          rows={3}
          onChange={(e) => {
            onFieldChange(index, { description: e.target.value });
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Team Image</label>
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Button Label</label>
        <input
          type="text"
          value={data.buttonLabel ?? ""}
          onChange={(e) => {
            onFieldChange(index, { buttonLabel: e.target.value });
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
            onFieldChange(index, { buttonLink: e.target.value });
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
        />
      </div>
    </>
  );
};

export default TeamField;
