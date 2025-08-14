"use client";
import {
  deleteObject,
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import FieldRenderer from "./fields/FieldRenderer";

import { updatePageData } from "@/api/pageData";
import { get } from "@/api/requests";
import { useAuthState } from "@/contexts/userContext";
import { storage } from "@/firebase/firebase";

type PageDataField = {
  name: string;
  type: string;
  data: Record<string, unknown> | unknown[];
};

type PageData = {
  _id: string;
  pagename: string;
  lastUpdate: string;
  fields: PageDataField[];
};

// Helper function to safely get string values
const getStringValue = (value: unknown): string => {
  if (typeof value === "string") {
    return value;
  }
  return "";
};

// Helper function to safely get image URL
const getImageUrl = (data: Record<string, unknown>): string => {
  const url = data.imageUrl;
  return typeof url === "string" ? url : "";
};

// Helper function to delete file from Firebase Storage
const deleteFirebaseFile = async (fileUrl: string) => {
  try {
    const urlObj = new URL(fileUrl);
    const encodedPath = urlObj.pathname.split("/o/")[1];
    const fullPath = decodeURIComponent(encodedPath);
    const fileRef = storageRef(storage, fullPath);
    await deleteObject(fileRef);
  } catch (err) {
    console.error("Error deleting file:", err);
  }
};

// Helper function to recursively find all image URLs in data structures
const extractAllImageUrls = (data: unknown, urls: Set<string> = new Set()): Set<string> => {
  if (typeof data === "string" && (data.startsWith("http") || data.startsWith("blob:"))) {
    urls.add(data);
  } else if (Array.isArray(data)) {
    data.forEach((item) => extractAllImageUrls(item, urls));
  } else if (data && typeof data === "object") {
    Object.entries(data).forEach(([key, value]) => {
      // Look for common image field names
      if (
        key === "imageUrl" ||
        key === "image" ||
        key === "thumbnail" ||
        key === "icon" ||
        key === "src"
      ) {
        if (typeof value === "string" && (value.startsWith("http") || value.startsWith("blob:"))) {
          urls.add(value);
        }
      }
      // Recursively check nested objects and arrays
      extractAllImageUrls(value, urls);
    });
  }
  return urls;
};

// Helper function to recursively replace blob URLs with Firebase URLs
const replaceImageUrls = (data: unknown, urlMapping: Map<string, string>): unknown => {
  if (typeof data === "string" && urlMapping.has(data)) {
    return urlMapping.get(data);
  } else if (Array.isArray(data)) {
    return data.map((item) => replaceImageUrls(item, urlMapping));
  } else if (data && typeof data === "object") {
    const result: Record<string, unknown> = {};
    Object.entries(data).forEach(([key, value]) => {
      result[key] = replaceImageUrls(value, urlMapping);
    });
    return result;
  }
  return data;
};

const EditPage: React.FC = () => {
  const [pages, setPages] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState<PageData | null>(null);
  const { firebaseUser } = useAuthState();
  const [wordCounts, setWordCounts] = useState<Record<string, number>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [editableFields, setEditableFields] = useState<PageDataField[]>([]);
  const [pendingFiles, setPendingFiles] = useState<Map<string, File>>(new Map());
  const [originalImageUrls, setOriginalImageUrls] = useState<Set<string>>(new Set());
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchPages = async (): Promise<void> => {
      try {
        if (!firebaseUser) return;

        const token = await firebaseUser.getIdToken();
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await get("/pageData/all", headers);
        const data = (await response.json()) as PageData[];
        console.log(data);
        setPages(data);
      } catch (error) {
        console.error("Error fetching pages:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchPages();
  }, [firebaseUser]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleOpenEditor = (page: PageData): void => {
    setSelectedPage(page);

    // Extract all image URLs from nested structures
    const imageUrls = new Set<string>();
    page.fields.forEach((field) => {
      extractAllImageUrls(field.data, imageUrls);
    });
    setOriginalImageUrls(imageUrls);
  };

  const handleCloseEditor = async (): Promise<void> => {
    // Clean up any blob URLs
    for (const blobUrl of pendingFiles.keys()) {
      URL.revokeObjectURL(blobUrl);
    }

    setPendingFiles(new Map());
    setOriginalImageUrls(new Set());
    setSelectedPage(null);
  };

  const handleSaveChanges = async (): Promise<void> => {
    if (!firebaseUser || !selectedPage) return;

    try {
      setUploading(true);
      const token = await firebaseUser.getIdToken();

      // Upload all pending files first
      const uploadPromises: Promise<{ blobUrl: string; firebaseUrl: string }>[] = [];

      for (const [blobUrl, file] of pendingFiles.entries()) {
        const uploadPromise = uploadFileToFirebase(file).then((firebaseUrl) => ({
          blobUrl,
          firebaseUrl,
        }));
        uploadPromises.push(uploadPromise);
      }

      const uploadResults = await Promise.all(uploadPromises);

      // Create a mapping of blob URLs to Firebase URLs
      const urlMapping = new Map<string, string>();
      uploadResults.forEach(({ blobUrl, firebaseUrl }) => {
        urlMapping.set(blobUrl, firebaseUrl);
      });

      // Update editableFields to replace ALL blob URLs with Firebase URLs recursively
      const updatedFields = editableFields.map((field) => ({
        ...field,
        data: replaceImageUrls(field.data, urlMapping) as Record<string, unknown> | unknown[],
      }));

      const payload = {
        pagename: selectedPage.pagename,
        fields: updatedFields.map((f) => ({
          name: f.name,
          data: f.data,
        })),
      };

      const result = await updatePageData(token, payload);

      if (!result.success) {
        alert(`Save failed: ${result.error}`);
        return;
      }

      const updated = result.data;

      // Clean up old images that were replaced
      const currentImageUrls = new Set<string>();
      updatedFields.forEach((field) => {
        extractAllImageUrls(field.data, currentImageUrls);
      });

      // Delete original images that are no longer being used
      for (const originalUrl of originalImageUrls) {
        if (!currentImageUrls.has(originalUrl)) {
          await deleteFirebaseFile(originalUrl);
        }
      }

      // Clean up blob URLs
      for (const blobUrl of pendingFiles.keys()) {
        URL.revokeObjectURL(blobUrl);
      }

      // Clear pending state and update local state with Firebase URLs
      setPendingFiles(new Map());
      setOriginalImageUrls(currentImageUrls);
      setEditableFields(updatedFields);

      setSelectedPage((prev) =>
        prev ? { ...prev, lastUpdate: updated.lastUpdate, fields: updatedFields } : prev,
      );
      setPages((prev) =>
        prev.map((p) =>
          p.pagename === updated.pagename ? { ...p, lastUpdate: updated.lastUpdate } : p,
        ),
      );
      alert("Page saved successfully!");
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving.");
    } finally {
      setUploading(false);
    }
  };

  // Helper function to upload file to Firebase
  const uploadFileToFirebase = async (file: File): Promise<string> => {
    const path = `page-images/${Date.now()}-${file.name}`;
    const ref = storageRef(storage, path);
    const uploadTask = uploadBytesResumable(ref, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Track upload progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        },
      );
    });
  };

  const countWords = (text: string): number => {
    if (!text || typeof text !== "string") {
      return 0;
    }
    return text.trim().split(/\s+/).filter(Boolean).length || 0;
  };

  const handleTextChange = (id: string, text: string): void => {
    setWordCounts((prev) => ({
      ...prev,
      [id]: countWords(text),
    }));
  };

  const toggleSection = (sectionId: string): void => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Handle pending file tracking
  const handlePendingFile = (blobUrl: string, file: File) => {
    setPendingFiles((prev) => new Map(prev).set(blobUrl, file));
  };

  const handleRemovePending = (blobUrl: string) => {
    setPendingFiles((prev) => {
      const newMap = new Map(prev);
      newMap.delete(blobUrl);
      return newMap;
    });
  };

  // Initialize expanded state for sections when page changes
  useEffect(() => {
    if (selectedPage) {
      // Start with all sections expanded
      const initialExpandedState: Record<string, boolean> = {};
      selectedPage.fields.forEach((field, index) => {
        initialExpandedState[`${field.name}-${index.toString()}`] = true;
      });
      setExpandedSections(initialExpandedState);
    }
  }, [selectedPage]);

  // Update editableFields when selectedPage changes
  useEffect(() => {
    if (selectedPage) {
      setEditableFields(selectedPage.fields.map((field) => ({ ...field })));
    }
  }, [selectedPage]);

  // Handler to update a field's data
  const handleFieldChange = (fieldIndex: number, newData: Record<string, unknown>) => {
    setEditableFields((prevFields: PageDataField[]) =>
      prevFields.map((field: PageDataField, idx: number) => {
        if (idx !== fieldIndex) return field;
        if ("data" in newData) {
          return { ...field, data: newData.data as Record<string, unknown> | unknown[] };
        }
        return { ...field, data: { ...field.data, ...newData } };
      }),
    );
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (selectedPage) {
    return (
      <div className="flex flex-col gap-4 bg-white min-h-screen p-4">
        <h1 className="text-4xl font-medium">Page Editor</h1>

        <div className="bg-[#F7F7F7] rounded-lg p-6">
          <div className="flex items-center justify-between border-b border-gray-200 mb-6 pb-1">
            {/* Page Tabs */}
            <div className="flex space-x-4 overflow-x-auto">
              {pages.map((page) => (
                <button
                  key={page._id}
                  className={`px-4 py-2 text-sm whitespace-nowrap ${
                    page._id === selectedPage._id
                      ? "text-[#f26522] border-b-2 border-[#f26522]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => {
                    setSelectedPage(page);
                  }}
                >
                  {page.pagename}
                </button>
              ))}
            </div>

            {/* Save and View Changes Buttons */}
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => void handleSaveChanges()}
                className="px-4 py-2 bg-[#f26522] text-white rounded-md flex items-center gap-2"
                disabled={uploading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 7V19C21 19.55 20.8043 20.021 20.413 20.413C20.0217 20.805 19.5507 21.0007 19 21H5C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H17L21 7ZM12 18C12.8333 18 13.5417 17.7083 14.125 17.125C14.7083 16.5417 15 15.8333 15 15C15 14.1667 14.7083 13.4583 14.125 12.875C13.5417 12.2917 12.8333 12 12 12C11.1667 12 10.4583 12.2917 9.875 12.875C9.29167 13.4583 9 14.1667 9 15C9 15.8333 9.29167 16.5417 9.875 17.125C10.4583 17.7083 11.1667 18 12 18ZM6 10H15V6H6V10Z"
                    fill="white"
                  />
                </svg>
                {uploading ? "Saving..." : "Save Changes"}
                {pendingFiles.size > 0 && (
                  <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full">
                    {pendingFiles.size}
                  </span>
                )}
              </button>
              <button
                onClick={() => void handleCloseEditor()}
                className="px-4 py-2 bg-white text-gray-700 rounded-md flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="16"
                  viewBox="0 0 21 16"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.5 8.05957C13.5 9.71657 12.157 11.0596 10.5 11.0596C8.843 11.0596 7.5 9.71657 7.5 8.05957C7.5 6.40257 8.843 5.05957 10.5 5.05957C12.157 5.05957 13.5 6.40257 13.5 8.05957ZM10.5 13.0596C7.739 13.0596 5.5 10.8216 5.5 8.05957C5.5 5.29857 7.739 3.05957 10.5 3.05957C13.262 3.05957 15.5 5.29857 15.5 8.05957C15.5 10.8216 13.262 13.0596 10.5 13.0596ZM10.5 0.55957C6.358 0.55957 1.729 3.97657 0 8.05957C1.729 12.1426 6.358 15.5596 10.5 15.5596C14.642 15.5596 19.271 12.1426 21 8.05957C19.271 3.97657 14.642 0.55957 10.5 0.55957Z"
                    fill="black"
                  />
                </svg>
                View Changes
              </button>
            </div>
          </div>

          <div className="space-y-6 bg-white px-6 py-8">
            {editableFields.map((field, index) => {
              const sectionId = `${field.name}-${index.toString()}`;
              const isExpanded = expandedSections[sectionId] ?? false;

              return (
                <div key={index} className="mb-6">
                  <div
                    className="bg-[#f26522] text-white p-3 rounded-t-md flex items-center cursor-pointer"
                    onClick={() => {
                      toggleSection(sectionId);
                    }}
                  >
                    {isExpanded ? (
                      <svg
                        className="w-5 h-5 mr-2 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 mr-2 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 15l7-7 7 7"
                        ></path>
                      </svg>
                    )}
                    <span className="font-medium capitalize">{field.name}</span>
                  </div>

                  {isExpanded && (
                    <div className="border border-gray-200 rounded-b-md p-4 space-y-4">
                      <FieldRenderer
                        field={{ ...field, data: field.data as Record<string, unknown> }}
                        index={index}
                        onTextChange={handleTextChange}
                        wordCounts={wordCounts}
                        countWords={countWords}
                        getStringValue={getStringValue}
                        onFieldChange={handleFieldChange}
                        pendingFiles={pendingFiles}
                        onPendingFile={handlePendingFile}
                        onRemovePending={handleRemovePending}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-lg p-6">
        <h1 className="text-4xl font-medium mb-8">Page Editor</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {pages.map((page) => (
            <div key={page._id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="relative h-[150px] w-full bg-gray-100">
                {page.fields.find(
                  (field) =>
                    (field.type === "header" ||
                      field.type === "mission" ||
                      field.type === "section") &&
                    getImageUrl(field.data as Record<string, unknown>),
                ) && (
                  <Image
                    src={getImageUrl(
                      (page.fields.find(
                        (field) =>
                          (field.type === "header" ||
                            field.type === "mission" ||
                            field.type === "section") &&
                          getImageUrl(field.data as Record<string, unknown>),
                      )?.data ?? {}) as Record<string, unknown>,
                    )}
                    alt={page.pagename}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium">{page.pagename}</h3>
                <p className="text-sm text-gray-500">Last Updated: {formatDate(page.lastUpdate)}</p>
                <button
                  onClick={() => {
                    handleOpenEditor(page);
                  }}
                  className="mt-4 px-4 py-2 bg-[#f26522] text-white rounded-md w-2/3"
                >
                  Open Editor
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditPage;
