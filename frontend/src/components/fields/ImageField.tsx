import React from "react";

import { FieldImageUpload } from "./FieldImageUpload";

import { ImageData } from "@/types/fieldTypes";

type ImageFieldProps = {
  data: ImageData;
  index: number;
  fieldName: string;
  onFieldChange: (fieldIndex: number, newData: Record<string, unknown>) => void;
  pendingFiles?: Map<string, File>;
  onPendingFile?: (blobUrl: string, file: File) => void;
  onRemovePending?: (blobUrl: string) => void;
};

const ImageField: React.FC<ImageFieldProps> = ({
  data,
  index,
fieldName,
onFieldChange,
  pendingFiles,
  onPendingFile,
  onRemovePending,
}) => {
  const handleAltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange(index, { ...data, alt: e.target.value });
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
        <FieldImageUpload
          value={data.imageUrl || ""}
          onChange={(url) => {
            onFieldChange(index, { ...data, imageUrl: url });
          }}
          pendingFiles={pendingFiles}
          onPendingFile={onPendingFile}
          onRemovePending={onRemovePending}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
        <input
          type="text"
          value={data.alt ?? ""}
          onChange={handleAltChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
        />
      </div>
    </div>
  );
};

export default ImageField;
