// src/components/fields/FieldImageUpload.tsx
"use client";

import React, { useEffect, useRef } from "react";

type FieldImageUploadProps = {
  value: string;
  onChange: (url: string, file?: File) => void;
  onPendingFile?: (url: string, file: File) => void;
  onRemovePending?: (url: string) => void;
};

export const FieldImageUpload: React.FC<FieldImageUploadProps> = ({
  value,
  onChange,
  onPendingFile,
  onRemovePending,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if current value is a blob URL (pending)
  const isPending = value.startsWith("blob:");

  /** Handle user selecting a new file */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // If there's a current blob URL, revoke it and remove from pending
    if (value && isPending) {
      URL.revokeObjectURL(value);
      onRemovePending?.(value);
    }

    // Create local blob URL for preview
    const blobUrl = URL.createObjectURL(file);

    // Track the file for later upload
    onPendingFile?.(blobUrl, file);
    onChange(blobUrl, file);
  };

  /** Open the hidden file input */
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  /** Remove the current image */
  const handleRemove = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (value) {
      if (isPending) {
        // If it's a blob URL, revoke it and remove from pending
        URL.revokeObjectURL(value);
        onRemovePending?.(value);
      }
      // If it's a saved Firebase URL, don't delete from storage yet
      onChange("");
    }
  };

  // Cleanup blob URLs when component unmounts
  useEffect(() => {
    return () => {
      if (value && isPending) {
        URL.revokeObjectURL(value);
      }
    };
  }, [value, isPending]);

  return (
    <div
      className="relative w-40 h-40 rounded-xl border border-gray-300 bg-white flex items-center justify-center cursor-pointer transition hover:shadow-sm"
      onClick={handleClick}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {/* Show pending indicator */}
      {isPending && (
        <div className="absolute top-1 left-1 bg-yellow-500 text-white text-xs px-2 py-1 rounded z-10">
          Pending
        </div>
      )}

      {value ? (
        <>
          <img
            src={value}
            alt="Preview"
            className="object-contain w-32 h-32 rounded-lg bg-gray-100"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center shadow hover:bg-red-600 z-10"
            tabIndex={-1}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full select-none">
          <div className="bg-gray-100 rounded-lg w-28 h-28 flex items-center justify-center mb-2">
            <svg
              className="w-12 h-12 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" fill="#e5eaf4" />
              <path
                d="M8 13l3 3 4-4 5 5"
                stroke="#4a90e2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="8.5" cy="9.5" r="1.5" fill="#4a90e2" />
            </svg>
          </div>
          <span className="text-xs text-gray-500">Click to upload</span>
        </div>
      )}
    </div>
  );
};
