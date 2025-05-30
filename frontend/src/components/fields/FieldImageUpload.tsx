// src/components/fields/FieldImageUpload.tsx
"use client";

import React, { useRef, useState } from "react";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/firebase/firebase"; // adjust path as needed

type FieldImageUploadProps = {
  /** The current download URL (or empty string) */
  value: string;
  /**
   * Called with the new download URL (or "" if removed)
   */
  onChange: (url: string) => void;
};

export const FieldImageUpload: React.FC<FieldImageUploadProps> = ({ value, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  /** Given a download URL, delete that file from Storage */
  const deleteFirebaseFile = async (fileUrl: string) => {
    try {
      // Extract the path portion from the URL
      const urlObj = new URL(fileUrl);
      // Firebase URLs look like /o/<encodedPath>?...
      const encodedPath = urlObj.pathname.split("/o/")[1];
      const fullPath = decodeURIComponent(encodedPath);
      const fileRef = storageRef(storage, fullPath);
      await deleteObject(fileRef);
    } catch (err) {
      console.error("Error deleting old file:", err);
    }
  };

  /** Handle user selecting a new file */
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Remove previous file if one exists
    if (value) {
      await deleteFirebaseFile(value);
    }

    setUploading(true);
    setProgress(0);

    // Create a unique path in your bucket
    const path = `page-images/${Date.now()}-${file.name}`;
    const ref = storageRef(storage, path);
    const uploadTask = uploadBytesResumable(ref, file);

    // Listen for progress / errors / completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(pct);
      },
      (error) => {
        console.error("Upload error:", error);
        setUploading(false);
      },
      async () => {
        // On success, get public URL
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setUploading(false);
        setProgress(0);
        onChange(url);
      },
    );
  };

  /** Open the hidden file input */
  const handleClick = () => {
    if (!uploading) fileInputRef.current?.click();
  };

  /** Remove the current image and delete it from Storage */
  const handleRemove = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (value) {
      await deleteFirebaseFile(value);
    }
    onChange("");
  };

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
        disabled={uploading}
      />

      {uploading ? (
        <div className="text-center">Uploading… {Math.round(progress)}%</div>
      ) : value ? (
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
