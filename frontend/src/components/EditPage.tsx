"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { get } from "@/api/requests";
import { useAuthState } from "@/contexts/userContext";

type PageDataField = {
  name: string;
  type: string;
  data: Record<string, unknown>;
};

type PageData = {
  _id: string;
  pagename: string;
  lastUpdate: string;
  fields: PageDataField[];
};

// Helper function to safely get string values
const getStringValue = (value: unknown): string => {
  if (typeof value === 'string') {
    return value;
  }
  return '';
};

// Helper function to safely get image URL
const getImageUrl = (data: Record<string, unknown>): string => {
  const url = data.imageUrl;
  return typeof url === 'string' ? url : '';
};

const EditPage: React.FC = () => {
  const [pages, setPages] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState<PageData | null>(null);
  const { firebaseUser } = useAuthState();
  const [wordCounts, setWordCounts] = useState<Record<string, number>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchPages = async (): Promise<void> => {
      try {
        if (!firebaseUser) return;
        
        const token = await firebaseUser.getIdToken();
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        
        const response = await get("/pageData/all", headers);
        const data = await response.json() as PageData[];
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
  };

  const handleCloseEditor = (): void => {
    setSelectedPage(null);
  };

  const handleSaveChanges = (): void => {
    alert("Save changes functionality would go here");
    // This would update the page data on the backend
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
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-[#f26522] text-white rounded-md flex items-center gap-2"
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
                Save Changes
              </button>
              <button 
                onClick={handleCloseEditor}
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
            {selectedPage.fields.map((field, index) => {
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
                      {field.type === "header" && (
                        <>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Title
                            </label>
                            <input
                              type="text"
                              defaultValue={getStringValue(field.data.header) ?? getStringValue(field.data.title) ?? ""}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
                            />
                          </div>

                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Subtitle
                            </label>
                            <textarea
                              defaultValue={getStringValue(field.data.subheader) ?? getStringValue(field.data.subtitle) ?? ""}
                              rows={3}
                              id={`${field.name}-subtitle-${index.toString()}`}
                              onChange={(e) => {
                                handleTextChange(`${field.name}-subtitle-${index.toString()}`, e.target.value);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
                            />
                            <div className="text-xs text-gray-500 mt-1 text-right">
                              {wordCounts[`${field.name}-subtitle-${index.toString()}`] ??
                                countWords(getStringValue(field.data.subheader) ?? getStringValue(field.data.subtitle) ?? "")}
                              /200 words
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Section Image
                            </label>
                            <div className="border border-dashed border-gray-300 rounded-md p-4">
                              {getImageUrl(field.data) ? (
                                <div className="relative">
                                  <div className="relative h-32 w-32 mx-auto">
                                    <Image
                                      src={getImageUrl(field.data)}
                                      alt="Section image"
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
                                  <p className="mt-1 text-sm text-gray-500">Upload an image</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      )}

                      {field.type === "text" && (
                        <>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Title
                            </label>
                            <input
                              type="text"
                              defaultValue={getStringValue(field.data.title) ?? ""}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Subtext
                            </label>
                            <textarea
                              defaultValue={getStringValue(field.data.description) ?? ""}
                              rows={4}
                              id={`${field.name}-description-${index.toString()}`}
                              onChange={(e) => {
                                handleTextChange(
                                  `${field.name}-description-${index.toString()}`,
                                  e.target.value,
                                );
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
                            />
                            <div className="text-xs text-gray-500 mt-1 text-right">
                              {wordCounts[`${field.name}-description-${index.toString()}`] ??
                                countWords(getStringValue(field.data.description) ?? "")}
                              /200 words
                            </div>
                          </div>
                        </>
                      )}

                      {field.type === "section" && (
                        <>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Subtitle
                            </label>
                            <input
                              type="text"
                              defaultValue={getStringValue(field.data.title) ?? ""}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
                            />
                          </div>

                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Subtext
                            </label>
                            {Array.isArray(field.data.paragraphs) ? (
                              field.data.paragraphs.map((paragraph: unknown, i: number) => (
                                <div key={i} className="mb-2">
                                  <textarea
                                    defaultValue={typeof paragraph === 'string' ? paragraph : ''}
                                    rows={3}
                                    id={`${field.name}-paragraph-${index.toString()}-${i.toString()}`}
                                    onChange={(e) => {
                                      handleTextChange(
                                        `${field.name}-paragraph-${index.toString()}-${i.toString()}`,
                                        e.target.value,
                                      );
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
                                  />
                                  <div className="text-xs text-gray-500 mt-1 text-right">
                                    {wordCounts[`${field.name}-paragraph-${index.toString()}-${i.toString()}`] ??
                                      countWords(typeof paragraph === 'string' ? paragraph : '')}
                                    /200 words
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div>
                                <textarea
                                  defaultValue={getStringValue(field.data.description) ?? ""}
                                  rows={3}
                                  id={`${field.name}-description-${index.toString()}`}
                                  onChange={(e) => {
                                    handleTextChange(
                                      `${field.name}-description-${index.toString()}`,
                                      e.target.value,
                                    );
                                  }}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
                                />
                                <div className="text-xs text-gray-500 mt-1 text-right">
                                  {wordCounts[`${field.name}-description-${index.toString()}`] ??
                                    countWords(getStringValue(field.data.description) ?? "")}
                                  /200 words
                                </div>
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Section Image
                            </label>
                            <div className="border border-dashed border-gray-300 rounded-md p-4">
                              {getImageUrl(field.data) ? (
                                <div className="relative">
                                  <div className="relative h-32 w-32 mx-auto">
                                    <Image
                                      src={getImageUrl(field.data)}
                                      alt="Section image"
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
                                  <p className="mt-1 text-sm text-gray-500">Upload an image</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      )}

                      {field.type === "mission" && (
                        <>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Title
                            </label>
                            <input
                              type="text"
                              defaultValue={getStringValue(field.data.title) ?? ""}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
                            />
                          </div>

                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <textarea
                              defaultValue={getStringValue(field.data.description) ?? ""}
                              rows={3}
                              id={`${field.name}-description-${index.toString()}`}
                              onChange={(e) => {
                                handleTextChange(
                                  `${field.name}-description-${index.toString()}`,
                                  e.target.value,
                                );
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
                            />
                            <div className="text-xs text-gray-500 mt-1 text-right">
                              {wordCounts[`${field.name}-description-${index.toString()}`] ??
                                countWords(getStringValue(field.data.description) ?? "")}
                              /200 words
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Section Image
                            </label>
                            <div className="border border-dashed border-gray-300 rounded-md p-4">
                              {getImageUrl(field.data) ? (
                                <div className="relative">
                                  <div className="relative h-32 w-32 mx-auto">
                                    <Image
                                      src={getImageUrl(field.data)}
                                      alt="Mission image"
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
                                  <p className="mt-1 text-sm text-gray-500">Upload an image</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      )}
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
                    getImageUrl(field.data)
                ) && (
                  <Image
                    src={getImageUrl(
                      page.fields.find(
                        (field) =>
                          (field.type === "header" ||
                            field.type === "mission" ||
                            field.type === "section") &&
                          getImageUrl(field.data)
                      )?.data ?? {}
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
