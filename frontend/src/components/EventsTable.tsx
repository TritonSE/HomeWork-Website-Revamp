"use client";
import { Icon, Table } from "@tritonse/tse-constellation";
import React, { useEffect, useState } from "react";

import EventEditorModal from "./EventEditorModal";

import type { Article } from "@/hooks/useArticles";

import { del, get } from "@/api/requests";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ArticleWithStatus | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false);

  const getAuthHeader = async (): Promise<Record<string, string>> => {
    if (!firebaseUser) {
      throw new Error("User not authenticated");
    }
    const token = await firebaseUser.getIdToken();
    if (!token) {
      throw new Error("No authentication token available");
    }
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  const fetchArticles = async (): Promise<void> => {
    if (!firebaseUser) return;

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
    if (!loading && firebaseUser) {
      void fetchArticles();
    }
  }, [loading, firebaseUser]);

  const articlesWithStatus: ArticleWithStatus[] = articles.map((article) => ({
    ...article,
    status: article.isPublished ? "Published" : "Draft",
  }));
  const filteredArticles = articlesWithStatus.filter((article) =>
    article.header.toLowerCase().startsWith(searchQuery.toLowerCase()),
  );

  const showSuccessMessage = (message: string): void => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleRowClick = (index: number): void => {
    const article = filteredArticles[index] ?? null;
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

    // Close detail modal and open edit modal
    setIsDetailModalOpen(false);
    setIsModalOpen(true);
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
    <div className="flex flex-col gap-4 min-h-screen">
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

      <div className="bg-white rounded-lg p-6 flex flex-col flex-grow">
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
          :global(.tse-table._container_1autq_1) {
            flex: 1 1 auto !important;
            min-height: 0 !important;
            display: flex !important;
            flex-direction: column !important;
          }
          :global(.tse-table [class*="paginationContainer"]) {
            display: flex !important;
            justify-content: center !important;
            margin-top: auto !important;
            padding-top: 24px !important;
            bottom: 0 !important;
            margin-bottom: 24px !important;
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

        <div className="overflow-x-auto flex-grow flex flex-col">
          <Table
            columns={columns}
            data={filteredArticles}
            className="w-full tse-table"
            enablePagination={true}
            enableSorting={true}
            enableGlobalFiltering={false}
            autoResetPageIndex={true}
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
      </div>

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
                  <p className="text-base whitespace-pre-wrap">
                    {selectedArticle.body ?? "No description available."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event Editor Modal */}
      <EventEditorModal
        isOpen={isModalOpen}
        onClose={(): void => {
          setIsModalOpen(false);
          setSelectedArticle(null);
        }}
        onSuccess={(): void => {
          void fetchArticles();
          showSuccessMessage(
            selectedArticle ? "Event updated successfully." : "Event published successfully.",
          );
          setSelectedArticle(null);
        }}
        selectedArticle={selectedArticle ?? undefined}
      />
    </div>
  );
};

export default EventsTable;
