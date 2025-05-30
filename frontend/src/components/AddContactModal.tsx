import React, { useState } from "react";

import "@fontsource/golos-text/500.css";
import { post } from "../api/requests";

type AddContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: (msg: string) => void;
};

type ErrorMessage = {
  message: string;
};

const AddContactModal: React.FC<AddContactModalProps> = ({ isOpen, onClose, onSaved }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [formResult, setFormResult] = useState({ success: false, result: "" });
  const [showMessage, setShowMessage] = useState(false);
  const [membership, setMembership] = useState<string>("community");
  const [status, setStatus] = useState<string>("active");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation to check if required fields are filled
    if (!firstName || !lastName || !email) {
      setFormResult({
        success: false,
        result: "Please fill in all required fields.",
      });
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000); // Show message for 3 seconds
      return;
    }

    try {
      // Send the form data to the backend with the correct keys
      const _ = await post("/subscriptions/create", {
        firstname: firstName,
        lastname: lastName,
        email,
        status,
        membership,
      });

      onSaved?.("New contact added successfully");

      // Update the form result on successful submission
      setFormResult({
        success: true,
        result: `Successfully submitted! Hello, ${firstName} ${lastName}!`,
      });

      // Reset the form fields
      setFirstName("");
      setLastName("");
      setEmail("");

      // Close the modal after successful submission
      onClose();
    } catch (error: unknown) {
      const errorText = (error as Error).message;
      let message = errorText;
      try {
        const errorJSON = JSON.parse(errorText.split(": ")[1]) as ErrorMessage;
        message = errorJSON.message;
      } finally {
        // console.error("Error submitting the form:", errorText);
        setFormResult({ success: false, result: message });
        setShowMessage(true);
      }
    }

    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  };

  const handleDiscard = () => {
    // Reset the form fields to their initial empty states
    setFirstName("");
    setLastName("");
    setEmail("");
    setMembership("community"); // Reset membership to default
    setStatus("active"); // Reset status to default
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="bg-white rounded-lg relative w-[932px] h-[703px] gap-6 p-14">
        <div className="w-[812px] h-[583px] gap-7 flex flex-col">
          <div
            id="contact-modal-header"
            className="w-[812px] h-12 gap-5 font-golos-text font-bold text-3xl leading-[150%] tracking-normal text-black mb-5"
          >
            Add Contact
          </div>
          <form
            onSubmit={(e) => {
              void handleSubmit(e);
            }}
            className="w-full h-full gap-0.5 flex flex-col"
            aria-describedby="form-result"
          >
            {/* First Name */}
            <div className="font-golos-text font-medium text-base leading-[130%] tracking-normal text-[#484848]">
              First Name
            </div>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              className="p-2 mt-2 w-full text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
              required
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />

            {/* Last Name */}
            <div className="font-golos-text font-medium text-base leading-[130%] tracking-normal text-[#484848]">
              Last Name
            </div>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              className="p-2 mt-2 w-full text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
              required
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />

            {/* Email */}
            <div className="font-golos-text font-medium text-base leading-[130%] tracking-normal text-[#484848]">
              Email
            </div>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="p-2 mt-2 w-full text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <div className="font-golos-text font-medium text-xl leading-[130%] tracking-normal text-[#484848]">
              Status
            </div>
            <div className="flex gap-3 h-11 mb-5">
              <button
                type="button"
                onClick={() => {
                  setStatus("active");
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

            <div className="font-golos-text font-medium text-xl leading-[130%] tracking-normal text-[#484848]">
              Membership
            </div>
            <div className="flex gap-3 h-11 mb-5">
              <button
                type="button"
                onClick={() => {
                  setMembership("community");
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
            <div className="flex flex-row gap-3 items-center justify-end">
              <button
                type="button"
                onClick={handleDiscard} // Call the handleDiscard function
                className="w-[227px] h-12 pt-3 pb-3 pr-6 pl-6 gap-1.5 rounded-md border-2 border-[#b93b3b] flex flex-row items-center justify-center font-golos-text font-normal text-base leading-6 tracking-normal text-center align-middle text-[#b93b3b]"
              >
                <>
                  <img src="/icons/ic_crossExit.svg" width={14} height={14} alt="Discard" />
                  DISCARD CONTACT
                </>
              </button>

              {/* submit button */}
              <button
                type="submit"
                className="w-[197px] h-12 gap-1.5 rounded-md bg-[#f05629] flex flex-row items-center justify-center font-golos-text font-normal text-base leading-6 tracking-normal text-white"
              >
                <>
                  <img src="/icons/ic_submitCheck.svg" width={15} height={13} alt="Save" />
                  SAVE CONTACT
                </>
              </button>
            </div>
          </form>

          {showMessage && (
            <div
              className={`form-result ${
                formResult.success
                  ? "bg-green-100 border-green-400 text-green-700"
                  : "bg-red-100 border-red-400 text-red-700"
              } border-2 rounded-md p-4 mt-2 z-1000`}
            >
              {formResult.result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddContactModal;
