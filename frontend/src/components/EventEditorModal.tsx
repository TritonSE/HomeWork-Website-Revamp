import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useRef, useState } from "react";

import { storage } from "../firebase/firebase";

import type { Article } from "@/hooks/useArticles";

import { post, put } from "@/api/requests";
import { useAuthState } from "@/contexts/userContext";

type EventEditorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  selectedArticle?: Article;
};

const EventEditorModal: React.FC<EventEditorModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  selectedArticle,
}) => {
  const { firebaseUser } = useAuthState();
  const [eventTitle, setEventTitle] = useState(selectedArticle?.header ?? "");
  const [eventDescription, setEventDescription] = useState(selectedArticle?.body ?? "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      onClose();
    }
  };

  const handleConfirmClose = (): void => {
    setShowConfirmDialog(false);
    onClose();
    setHasUnsavedChanges(false);
    setEventTitle("");
    setEventDescription("");
    setSelectedFile(null);
  };

  const triggerFileInput = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getProgressWidth = (progress: number): string => `${progress.toString()}%`;

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
        onClose();
        setEventTitle("");
        setEventDescription("");
        setSelectedFile(null);
        setUploadProgress(0);
        setHasUnsavedChanges(false);
        onSuccess();
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
      const thumbnailUrl = await uploadFileToFirebase(selectedFile);
      const headers = await getAuthHeader();

      const response = await post(
        "/articles/create",
        {
          header: eventTitle,
          body: eventDescription,
          author: firebaseUser?.displayName ?? "Admin",
          thumbnail: thumbnailUrl,
          isPublished: true,
        },
        headers,
      );

      if (response.ok) {
        onClose();
        setEventTitle("");
        setEventDescription("");
        setSelectedFile(null);
        setUploadProgress(0);
        setHasUnsavedChanges(false);
        onSuccess();
      } else {
        console.error("Failed to publish");
      }
    } catch (error) {
      console.error("Error publishing:", error);
    }
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
        onClose();
        setEventTitle("");
        setEventDescription("");
        setSelectedFile(null);
        setUploadProgress(0);
        setHasUnsavedChanges(false);
        onSuccess();
      } else {
        console.error("Failed to update event");
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
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
                className={`border border-dashed border-gray-300 rounded-md p-6 text-center ${
                  !isUploading ? "cursor-pointer hover:bg-gray-50" : ""
                }`}
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
                void (async () => {
                  if (selectedArticle) {
                    await handleUpdateEvent(false);
                  } else {
                    await handleSaveDraft();
                  }
                })();
              }}
              disabled={
                isUploading || !eventTitle || (!selectedFile && !selectedArticle?.thumbnail)
              }
              className={`px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2 ${
                isUploading || !eventTitle || (!selectedFile && !selectedArticle?.thumbnail)
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
              SAVE DRAFT
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
              disabled={
                isUploading || !eventTitle || (!selectedFile && !selectedArticle?.thumbnail)
              }
              className={`px-4 py-2 bg-[#f26522] text-white rounded-md flex items-center gap-2 ${
                isUploading || !eventTitle || (!selectedFile && !selectedArticle?.thumbnail)
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
    </>
  );
};

export default EventEditorModal;
