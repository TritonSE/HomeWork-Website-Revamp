"use client";

import React, { useCallback, useEffect, useState } from "react";

import ConfirmationModal from "./ConfirmationModal";

import { put } from "@/api/requests";
import "@fontsource/golos-text/500.css";
import { useAuthState } from "@/contexts/userContext";

type EditContactModalProps = {
  isOpen: boolean;
  contact: {
    firstName: string;
    lastName: string;
    emailAdd: string;
    membership: "community" | "family";
    status: "active" | "error";
  } | null;
  onClose: () => void;
  onSaved: (msg: string) => void;
};

type ErrorMessage = { message: string };

const EditContactModal: React.FC<EditContactModalProps> = ({
  isOpen,
  contact,
  onClose,
  onSaved,
}) => {
  const { firebaseUser } = useAuthState();
  const buildAuthHeader = useCallback(async () => {
    if (!firebaseUser) throw new Error("User not authenticated");
    const token = await firebaseUser.getIdToken(/* forceRefresh */ true);
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }, [firebaseUser]);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showUnsavedPrompt, setShowUnsavedPrompt] = useState(false);

  const markDirty = () => {
    setHasUnsavedChanges(true);
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAdd, setEmailAdd] = useState("");
  const [membership, setMembership] = useState<"community" | "family">("community");
  const [status, setStatus] = useState<"active" | "error">("active");

  const [formResult, setFormResult] = useState({ success: false, result: "" });
  const [showMessage, setShowMessage] = useState(false);

  const handleAttemptClose = () => {
    if (hasUnsavedChanges) {
      setShowUnsavedPrompt(true);
    } else {
      onClose();
    }
  };

  useEffect(() => {
    if (!contact) return;
    setFirstName(contact.firstName);
    setLastName(contact.lastName);
    setEmailAdd(contact.emailAdd);
    setMembership(contact.membership);
    setStatus(contact.status);
    setHasUnsavedChanges(false); // clean slate on load
  }, [contact]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const headers = await buildAuthHeader();
      await put(
        "/subscriptions/update",
        {
          email: emailAdd,
          firstname: firstName,
          lastname: lastName,
          membership,
          status,
        },
        headers,
      );

      setFormResult({ success: true, result: "Contact updated!" });
      setShowMessage(true);
      onSaved("Contact edited successfully");
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err: unknown) {
      let msg = (err as Error).message;
      try {
        const json = JSON.parse(msg.split(": ")[1]) as ErrorMessage;
        msg = json.message;
      } finally {
        setFormResult({ success: false, result: msg });
        setShowMessage(true);
      }
    }
  };

  if (!isOpen || !contact) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[932px] h-[703px] p-14 gap-6">
        <div className="flex flex-col gap-7 w-full h-full">
          <h2 className="font-golos-text font-bold text-3xl mb-5">Edit Contact</h2>

          <form
            onSubmit={(e) => void handleSubmit(e)}
            className="flex flex-col gap-0.5 h-full"
            aria-describedby="form-result"
          >
            <label className="font-golos-text font-medium text-base text-[#484848]">
              First Name
            </label>
            <input
              className="p-2 mt-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                markDirty();
              }}
              required
            />

            <label className="font-golos-text font-medium text-base text-[#484848]">
              Last Name
            </label>
            <input
              className="p-2 mt-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                markDirty();
              }}
              required
            />

            <label className="font-golos-text font-medium text-base text-[#484848]">Email</label>
            <input
              className="p-2 mt-2 w-full border border-gray-300 rounded-md bg-gray-100 mb-5"
              value={emailAdd}
              disabled
            />

            <label className="font-golos-text font-medium text-xl text-[#484848]">Status</label>
            <div className="flex gap-3 h-11 mb-5">
              <button
                type="button"
                onClick={() => {
                  setStatus("active");
                  markDirty();
                }}
                aria-pressed={status === "active"}
                className={`relative inline-flex items-center justify-center w-[82px] rounded-lg border-2 ${
                  status === "active"
                    ? "border-gray-300 shadow-[0px_1px_4px_rgba(12,12,13,0.05)]"
                    : "border-transparent"
                }`}
              >
                <span className="w-[58px] h-7 bg-[#aff4c6] rounded-md flex items-center justify-center text-sm text-[#02542d]">
                  Active
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setStatus("error");
                  markDirty();
                }}
                aria-pressed={status === "error"}
                className={`relative inline-flex items-center justify-center w-[82px] rounded-lg border-2 ${
                  status === "error"
                    ? "border-gray-300 shadow-[0px_1px_4px_rgba(12,12,13,0.05)]"
                    : "border-transparent"
                }`}
              >
                <span className="w-[58px] h-7 bg-[#fcb3ad] rounded-md flex items-center justify-center text-sm text-[#1b1b1b]">
                  Error
                </span>
              </button>
            </div>

            <label className="font-golos-text font-medium text-xl text-[#484848]">Membership</label>
            <div className="flex gap-3 h-11 mb-5">
              <button
                type="button"
                onClick={() => {
                  setMembership("community");
                  markDirty();
                }}
                aria-pressed={membership === "community"}
                className={`relative inline-flex items-center justify-center w-[118px] rounded-lg border-2 ${
                  membership === "community"
                    ? "border-gray-300 shadow-[0px_1px_4px_rgba(12,12,13,0.05)]"
                    : "border-transparent"
                }`}
              >
                <span className="w-[94px] h-7 bg-[#ffe8a3] rounded-md flex items-center justify-center text-sm text-[#975102]">
                  Community
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMembership("family");
                  markDirty();
                }}
                aria-pressed={membership === "family"}
                className={`relative inline-flex items-center justify-center w-[82px] rounded-lg border-2 ${
                  membership === "family"
                    ? "border-gray-300 shadow-[0px_1px_4px_rgba(12,12,13,0.05)]"
                    : "border-transparent"
                }`}
              >
                <span className="w-[61px] h-7 bg-[#dceeff] rounded-md flex items-center justify-center text-sm text-[#8a226f]">
                  Family
                </span>
              </button>
            </div>

            <div className="flex gap-3 justify-end mt-auto">
              <button
                type="button"
                onClick={handleAttemptClose}
                className="w-[227px] h-12 border-2 border-[#b93b3b] rounded-md text-[#b93b3b] flex items-center justify-center gap-1.5"
              >
                <img src="/icons/ic_crossExit.svg" width={14} height={14} alt="" />
                DISCARD CHANGES
              </button>
              <button
                type="submit"
                className="w-[197px] h-12 bg-[#f05629] text-white rounded-md flex items-center justify-center gap-1.5"
              >
                <img src="/icons/ic_submitCheck.svg" width={15} height={13} alt="" />
                SAVE CHANGES
              </button>
            </div>
          </form>

          {showMessage && (
            <div
              id="form-result"
              className={`border-2 rounded-md p-4 mt-4 ${
                formResult.success
                  ? "bg-green-100 border-green-400 text-green-700"
                  : "bg-red-100 border-red-400 text-red-700"
              }`}
            >
              {formResult.result}
            </div>
          )}
        </div>
      </div>

      <ConfirmationModal
        open={showUnsavedPrompt}
        onCancel={() => {
          setShowUnsavedPrompt(false);
        }}
        onConfirm={() => {
          setShowUnsavedPrompt(false);
          onClose(); // discard edits
        }}
        title="Are you sure you want to exit without saving?"
        description="Unsaved changes will be lost."
      />
    </div>
  );
};

export default EditContactModal;
