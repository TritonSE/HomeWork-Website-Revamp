"use client";
import { Icon, Table } from "@tritonse/tse-constellation";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";

import { storage } from "../firebase/firebase";

import type { Article } from "@/hooks/useArticles";

import { del, get, post, put } from "@/api/requests";
import { useAuthState } from "@/contexts/userContext";
import { useRedirectToLogin } from "@/hooks/useRedirect";

type ArticleWithStatus = Article & {
  status: "Draft" | "Published";
};

type Row = {
  getValue: (key: keyof ArticleWithStatus) => string;
  index: number;
};

type Column = {
  header: string;
  accessorKey: keyof ArticleWithStatus;
  cell?: ({ row }: { row: Row }) => React.ReactNode;
};

const EventsTable: React.FC = () => {
  useRedirectToLogin();
  const { firebaseUser, loading } = useAuthState();
  const [articles, setArticles] = useState<Article[]>([]);
  const [_isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ArticleWithStatus | null>(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false);

  const getAuthHeader = async (): Promise<Record<string, string>> => {
    const token = await firebaseUser?.getIdToken();
    if (!token) {
      throw new Error('No authentication token available');
    }
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  const fetchArticles = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const headers = await getAuthHeader();
      const response = await get("/articles/all", headers);
      const data = (await response.json()) as Article[];
      data.sort((a, b) => {
        return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
      });
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchArticles();
  }, []);

  const articlesWithStatus: ArticleWithStatus[] = articles.map((article) => ({
    ...article,
    status: article.isPublished ? "Published" : "Draft",
  }));

  const filteredArticles = articlesWithStatus.filter((article) =>
    article.header.toLowerCase().startsWith(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const uploadFileToFirebase = async (file: File): Promise<string> => {
    setIsUploading(true);
    setUploadProgress(0);

    const storageRef = ref(storage, `event-images/${Date.now().toString()}-${file.name}`);

    const metadata = {
      contentType: file.type,
    };

    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload error:", error);
          setIsUploading(false);
          reject(new Error(error instanceof Error ? error.message : "Upload failed"));
        },
        () => {
          setIsUploading(false);
          setUploadProgress(100);

          void (async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            } catch (error) {
              console.error("Error getting download URL:", error);
              reject(new Error("Failed to get download URL"));
            }
          })();
        },
      );
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEventTitle(e.target.value);
    setHasUnsavedChanges(true);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setEventDescription(e.target.value);
    setHasUnsavedChanges(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setHasUnsavedChanges(true);
    }
  };

  const handleCloseModal = (): void => {
    if (hasUnsavedChanges) {
      setShowConfirmDialog(true);
    } else {
      setIsModalOpen(false);
    }
  };

  const handleConfirmClose = (): void => {
    setShowConfirmDialog(false);
    setIsModalOpen(false);
    setHasUnsavedChanges(false);
    setEventTitle("");
    setEventDescription("");
    setSelectedFile(null);
  };

  const showSuccessMessage = (message: string): void => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleSaveDraft = async (): Promise<void> => {
    if (!eventTitle || !selectedFile) return;

    try {
      const thumbnailUrl = await uploadFileToFirebase(selectedFile);
      const headers = await getAuthHeader();

      const response = await post(
        "/articles/create",
        {
          header: eventTitle,
          body: eventDescription,
          author: firebaseUser?.displayName ?? "Anonymous",
          thumbnail: thumbnailUrl,
          isPublished: false,
        },
        headers,
      );

      if (response.ok) {
        setIsModalOpen(false);
        setEventTitle("");
        setEventDescription("");
        setSelectedFile(null);
        setUploadProgress(0);
        setHasUnsavedChanges(false);
        showSuccessMessage("Event successfully saved as a draft.");
        await fetchArticles();
      } else {
        console.error("Failed to save draft");
      }
    } catch (error) {
      console.error("Error saving draft:", error);
    }
  };

  const handlePublish = async (): Promise<void> => {
    if (!eventTitle || !selectedFile) return;

    try {
      // First upload the file to Firebase Storage
      const thumbnailUrl = await uploadFileToFirebase(selectedFile);

      // Then create article with the download URL
      const response = await post("/articles/create", {
        header: eventTitle,
        body: eventDescription,
        author: "Admin", // Replace with actual user
        thumbnail: thumbnailUrl,
        isPublished: true,
      });

      if (response.ok) {
        setIsModalOpen(false);
        // Reset form
        setEventTitle("");
        setEventDescription("");
        setSelectedFile(null);
        setUploadProgress(0);
        setHasUnsavedChanges(false);
        showSuccessMessage("Event published successfully.");
        // Reload articles to show the new one
        await fetchArticles();
      } else {
        console.error("Failed to publish");
      }
    } catch (error) {
      console.error("Error publishing:", error);
    }
  };

  const triggerFileInput = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getProgressWidth = (progress: number): string => `${progress.toString()}%`;

  const handleRowClick = (index: number): void => {
    const article = paginatedArticles[index] ?? null;
    if (article) {
      setSelectedArticle(article);
      setIsDetailModalOpen(true);
    }
  };

  const handleDeleteConfirm = async (): Promise<void> => {
    if (!selectedArticle) return;

    try {
      const headers = await getAuthHeader();
      const response = await del(`/articles/${selectedArticle._id}`, headers);

      if (response.ok) {
        setIsDetailModalOpen(false);
        setSelectedArticle(null);
        setShowDeleteConfirmDialog(false);
        showSuccessMessage("Event deleted successfully.");
        await fetchArticles();
      } else {
        console.error("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleDeleteEvent = (): void => {
    setShowDeleteConfirmDialog(true);
  };

  const handleEditEvent = (): void => {
    if (!selectedArticle) return;

    // Populate the edit modal with the selected article data
    setEventTitle(selectedArticle.header);
    setEventDescription(selectedArticle.body ?? "");

    // Close detail modal and open edit modal
    setIsDetailModalOpen(false);
    setIsModalOpen(true);
  };

  const handleUpdateEvent = async (shouldPublish: boolean): Promise<void> => {
    if (!selectedArticle) return;

    try {
      let thumbnailUrl = selectedArticle.thumbnail;

      if (selectedFile) {
        thumbnailUrl = await uploadFileToFirebase(selectedFile);
      }

      const headers = await getAuthHeader();
      const response = await put(
        `/articles/${selectedArticle._id}`,
        {
          header: eventTitle,
          body: eventDescription,
          author: firebaseUser?.displayName ?? selectedArticle.author,
          thumbnail: thumbnailUrl,
          isPublished: shouldPublish,
        },
        headers,
      );

      if (response.ok) {
        setIsModalOpen(false);
        setEventTitle("");
        setEventDescription("");
        setSelectedFile(null);
        setUploadProgress(0);
        setHasUnsavedChanges(false);
        showSuccessMessage(
          shouldPublish ? "Event published successfully." : "Event successfully saved as a draft.",
        );
        await fetchArticles();
      } else {
        console.error("Failed to update event");
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const columns: Column[] = [
    {
      header: "Event Name",
      accessorKey: "header",
      cell: ({ row }) => (
        <div
          className="cursor-pointer hover:text-[#f26522]"
          onClick={(): void => {
            handleRowClick(row.index);
          }}
        >
          {row.getValue("header")}
        </div>
      ),
    },
    {
      header: "Posting Date",
      accessorKey: "dateCreated",
      cell: ({ row }) => (
        <div
          className="cursor-pointer"
          onClick={(): void => {
            handleRowClick(row.index);
          }}
        >
          {new Date(row.getValue("dateCreated")).toLocaleDateString()}
        </div>
      ),
    },
    {
      header: "Author",
      accessorKey: "author",
      cell: ({ row }) => (
        <div
          className="cursor-pointer"
          onClick={(): void => {
            handleRowClick(row.index);
          }}
        >
          {row.getValue("author")}
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <div
          className="cursor-pointer"
          onClick={(): void => {
            handleRowClick(row.index);
          }}
        >
          <span
            className={`px-2 py-1 rounded-sm text-sm ${
              row.getValue("status") === "Published"
                ? "bg-[#AFF4C6] text-[#1B1B1B]"
                : "bg-[#D9D9D9] text-[#1B1B1B]"
            }`}
          >
            {row.getValue("status")}
          </span>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#f26522]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {successMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-[#AFF4C6] text-[#1B1B1B] px-6 py-3 rounded-md flex items-center gap-2 z-[9998] shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          {successMessage}
          <button
            onClick={(): void => {
              setSuccessMessage("");
            }}
            className="ml-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle cx="32.0013" cy="32.0003" r="21.3333" fill="#F05629" />
                <path
                  d="M31.9987 39.9997C33.4715 39.9997 34.6654 41.1936 34.6654 42.6663C34.6654 44.1391 33.4715 45.333 31.9987 45.333C30.5259 45.333 29.332 44.1391 29.332 42.6663C29.332 41.1936 30.5259 39.9997 31.9987 39.9997Z"
                  fill="white"
                />
                <path
                  d="M33.9987 35.9997C33.9987 37.1042 33.1033 37.9997 31.9987 37.9997C30.8941 37.9997 29.9987 37.1042 29.9987 35.9997V21.333C29.9987 20.2284 30.8941 19.333 31.9987 19.333C33.1033 19.333 33.9987 20.2284 33.9987 21.333V35.9997Z"
                  fill="white"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">
              Are you sure you want delete your edits before saving?
            </h3>
            <p className="text-gray-600 text-center mb-6">This action cannot be undone.</p>
            <div className="flex flex-col gap-2">
              <button
                onClick={(): void => {
                  setShowConfirmDialog(false);
                }}
                className="w-full px-4 py-2 bg-[#f26522] text-white rounded-md hover:bg-[#e55511]"
              >
                No, Cancel
              </button>
              <button
                onClick={handleConfirmClose}
                className="w-full px-4 py-2 bg-[#909090] text-white rounded-md hover:bg-[#8A8A8A]"
              >
                Yes, Discard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle cx="32.0013" cy="32.0003" r="21.3333" fill="#F05629" />
                <path
                  d="M31.9987 39.9997C33.4715 39.9997 34.6654 41.1936 34.6654 42.6663C34.6654 44.1391 33.4715 45.333 31.9987 45.333C30.5259 45.333 29.332 44.1391 29.332 42.6663C29.332 41.1936 30.5259 39.9997 31.9987 39.9997Z"
                  fill="white"
                />
                <path
                  d="M33.9987 35.9997C33.9987 37.1042 33.1033 37.9997 31.9987 37.9997C30.8941 37.9997 29.9987 37.1042 29.9987 35.9997V21.333C29.9987 20.2284 30.8941 19.333 31.9987 19.333C33.1033 19.333 33.9987 20.2284 33.9987 21.333V35.9997Z"
                  fill="white"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">
              Are you sure you want to delete this event?
            </h3>
            <p className="text-gray-600 text-center mb-6">This action cannot be undone.</p>
            <div className="flex flex-col gap-2">
              <button
                onClick={(): void => {
                  setShowDeleteConfirmDialog(false);
                }}
                className="w-full px-4 py-2 bg-[#f26522] text-white rounded-md hover:bg-[#e55511]"
              >
                No, Cancel
              </button>
              <button
                onClick={(): void => {
                  void handleDeleteConfirm();
                }}
                className="w-full px-4 py-2 bg-[#909090] text-white rounded-md hover:bg-[#8A8A8A]"
              >
                Yes, Continue
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg p-6">
        <style jsx>{`
          :global(._headerCell_1autq_27) {
            color: #ffffff !important;
            font-weight: 500 !important;
          }
          :global(.tse-table th) {
            background-color: #f26522 !important;
          }
          :global(.tse-table tr:hover) {
            background-color: #f8f8f8 !important;
          }
          :global(.tse-table tr) {
            background-color: #ffffff !important;
            border: 1px solid #f3f3f3 !important;
          }
          :global(.tse-table td) {
            border-bottom: 1px solid #e5e7eb !important;
          }
          :global(._sortToggleContainer_1autq_41 svg) {
            fill: #ffffff !important;
          }
        `}</style>

        <h1 className="text-4xl font-medium mb-8">Event Manager</h1>
        <div className="flex justify-between items-center gap-4 mb-2">
          <div className="relative flex-1">
            <Icon
              name="ic_search"
              fill="black"
              className="absolute left-3 top-2.5 h-5 w-5 text-black"
            />
            <input
              type="text"
              placeholder="Search by event name and author"
              value={searchQuery}
              onChange={(e): void => {
                setSearchQuery(e.target.value);
              }}
              className="w-[95%] h-11 pl-10 pr-4 py-2 border border-[#e5e7eb] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
            />
          </div>
          <button
            onClick={(): void => {
              setIsModalOpen(true);
            }}
            className="bg-[#f26522] text-white px-6 py-2 rounded-md flex items-center gap-2 whitespace-nowrap"
          >
            <span className="text-xl">+</span> NEW
          </button>
        </div>

        <div className="overflow-x-auto">
          <Table
            columns={columns}
            data={paginatedArticles}
            className="w-full tse-table"
            enablePagination={false}
            enableSorting={true}
            enableGlobalFiltering={false}
          />
          {filteredArticles.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M29.3346 10.666C19.0253 10.666 10.668 19.0234 10.668 29.3327C10.668 39.642 19.0253 47.9993 29.3346 47.9993C33.5275 47.9993 37.3975 46.6169 40.5138 44.283L48.7823 52.5516C49.8237 53.593 51.5122 53.593 52.5536 52.5516C53.595 51.5102 53.595 49.8218 52.5536 48.7804L44.285 40.5118C46.6189 37.3956 48.0013 33.5256 48.0013 29.3327C48.0013 19.0234 39.6439 10.666 29.3346 10.666ZM16.0013 29.3327C16.0013 21.9689 21.9708 15.9993 29.3346 15.9993C36.6984 15.9993 42.668 21.9689 42.668 29.3327C42.668 36.6965 36.6984 42.666 29.3346 42.666C21.9708 42.666 16.0013 36.6965 16.0013 29.3327Z"
                  fill="#1B1B1B"
                />
              </svg>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Results Found</h3>
              <p className="text-gray-600 text-center">
                We can&apos;t find any events that match your search. Please double check your
                selection and try again.
              </p>
            </div>
          )}
        </div>

        {filteredArticles.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={(): void => {
                setCurrentPage((prev) => Math.max(prev - 1, 1));
              }}
              disabled={currentPage === 1}
              className="text-gray-500 disabled:opacity-50"
            >
              <Icon name="ic_caretleft" fill="black" />
            </button>
            <div className="flex items-center gap-2 text-gray-500">
              <span>page</span>
              <div className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded">
                {currentPage}
              </div>
              <span>of</span>
              <span>{totalPages}</span>
            </div>
            <button
              onClick={(): void => {
                setCurrentPage((prev) => Math.min(prev + 1, totalPages));
              }}
              disabled={currentPage === totalPages}
              className="text-gray-500 disabled:opacity-50"
            >
              <Icon name="ic_caretright" fill="black" />
            </button>
          </div>
        )}
      </div>

      {/* Event Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9997]">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-medium">Event Editor</h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={handleTitleChange}
                  placeholder="Enter event title here"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {99 - eventTitle.length}/99 characters remaining
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Description
                </label>
                <textarea
                  value={eventDescription}
                  onChange={handleDescriptionChange}
                  placeholder="Enter event description here"
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26522]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <div
                  onClick={!isUploading ? triggerFileInput : undefined}
                  className={`border border-dashed border-gray-300 rounded-md p-6 text-center ${!isUploading ? "cursor-pointer hover:bg-gray-50" : ""}`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className="hidden"
                    accept="image/*"
                    disabled={isUploading}
                  />
                  {isUploading ? (
                    <div className="space-y-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-[#f26522] h-2.5 rounded-full"
                          style={{ width: getProgressWidth(uploadProgress) }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Uploading... {Math.round(uploadProgress)}%
                      </p>
                    </div>
                  ) : selectedFile ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center justify-center w-full">
                        <img
                          src={URL.createObjectURL(selectedFile)}
                          alt="Preview"
                          className="max-h-32 object-contain"
                        />
                      </div>
                      <div className="flex items-center mt-2 text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <span className="ml-2">{selectedFile.name}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-left gap-4 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="41"
                        height="42"
                        viewBox="0 0 41 42"
                        fill="none"
                      >
                        <path
                          d="M5.125 5.62467C5.125 4.71852 5.48497 3.84948 6.12572 3.20873C6.76647 2.56798 7.63551 2.20801 8.54167 2.20801H25.5943C26.5003 2.2082 27.3692 2.5683 28.0098 3.20909L34.8739 10.0732C35.5147 10.7138 35.8748 11.5827 35.875 12.4888V36.3747C35.875 37.2808 35.515 38.1499 34.8743 38.7906C34.2335 39.4314 33.3645 39.7913 32.4583 39.7913H8.54167C7.63551 39.7913 6.76647 39.4314 6.12572 38.7906C5.48497 38.1499 5.125 37.2808 5.125 36.3747V5.62467ZM8.54167 4.77051C8.31513 4.77051 8.09787 4.8605 7.93768 5.02069C7.77749 5.18087 7.6875 5.39814 7.6875 5.62467V36.3747C7.6875 36.6012 7.77749 36.8185 7.93768 36.9787C8.09787 37.1388 8.31513 37.2288 8.54167 37.2288H32.4583C32.6849 37.2288 32.9021 37.1388 33.0623 36.9787C33.2225 36.8185 33.3125 36.6012 33.3125 36.3747V15.0205H26.4792C25.573 15.0205 24.704 14.6605 24.0632 14.0198C23.4225 13.379 23.0625 12.51 23.0625 11.6038V4.77051H8.54167ZM25.625 4.77051V11.6038C25.625 11.8304 25.715 12.0476 25.8752 12.2078C26.0354 12.368 26.2526 12.458 26.4792 12.458H33.3125C33.305 12.242 33.2158 12.0369 33.0631 11.884L26.199 5.01992C26.0461 4.86716 25.841 4.77803 25.625 4.77051Z"
                          fill="#B4B4B4"
                        />
                      </svg>
                      <div className="flex justify-center items-center">
                        <span className="mr-1">Upload a File</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-[#f26522]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={(): void => {
                  void handleSaveDraft();
                }}
                disabled={isUploading || !eventTitle || (!selectedFile && !selectedArticle)}
                className={`px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2 ${
                  isUploading || !eventTitle || (!selectedFile && !selectedArticle)
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-50"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {selectedArticle ? "SAVE DRAFT" : "SAVE DRAFT"}
              </button>
              <button
                onClick={(): void => {
                  void (async () => {
                    if (selectedArticle) {
                      await handleUpdateEvent(true);
                    } else {
                      await handlePublish();
                    }
                  })();
                }}
                disabled={isUploading || !eventTitle || (!selectedFile && !selectedArticle)}
                className={`px-4 py-2 bg-[#f26522] text-white rounded-md flex items-center gap-2 ${
                  isUploading || !eventTitle || (!selectedFile && !selectedArticle)
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#e55511]"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                {selectedArticle ? "PUBLISH" : "PUBLISH"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Event Detail Modal */}
      {isDetailModalOpen && selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* Image header - full width at top */}
            {selectedArticle.thumbnail && (
              <div className="relative w-full h-72">
                <div className="absolute inset-0 bg-black bg-opacity-30 z-10" />
                <img
                  src={selectedArticle.thumbnail}
                  alt={selectedArticle.header}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(): void => {
                    setIsDetailModalOpen(false);
                  }}
                  className="absolute top-4 right-4 text-white hover:text-gray-200 rounded-full p-1 z-20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}

            {/* Content section */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-bold">Event Details</h2>
                  <span
                    className={`px-3 py-1 rounded-md text-sm ${
                      selectedArticle.status === "Published"
                        ? "bg-[#AFF4C6] text-[#1B1B1B]"
                        : "bg-[#D9D9D9] text-[#1B1B1B]"
                    }`}
                  >
                    {selectedArticle.status}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleDeleteEvent}
                    className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50"
                  >
                    DELETE EVENT
                  </button>
                  <button
                    onClick={handleEditEvent}
                    className="px-4 py-2 bg-[#f26522] text-white rounded-md hover:bg-[#e55511] flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                    EDIT
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-1">Event Title</h3>
                  <p className="text-2xl">{selectedArticle.header}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-1">Last modified</h3>
                  <p className="text-base text-gray-600">
                    {new Date(selectedArticle.dateCreated).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-1">Event Description</h3>
                  <p className="text-base">{selectedArticle.body ?? "No description available."}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsTable;
