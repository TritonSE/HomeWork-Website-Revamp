import React, { useState } from "react";

import "./Modal.css";
import "@fontsource/golos-text/500.css";
import { post } from "../api/requests"; // Assuming you have a post method for API requests

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [formResult, setFormResult] = useState({ success: false, result: "" });
  const [showMessage, setShowMessage] = useState(false);
  const [membership, setMembership] = useState<string>("community");
  const [status, setStatus] = useState<string>("active");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Log the form data for debugging
    console.log("Submitting form with data:", { firstName, lastName, email, status, membership });

    try {
      // Send the form data to the backend
      const response = await post("/subscriptions/create", {
        firstName,
        lastName,
        email,
      });

      console.log("Form response:", response); // Log the response for debugging

      // Update the form result based on success
      setFormResult({
        success: true,
        result: `Successfully submitted! Hello, ${firstName} ${lastName}!`,
      });

      // Reset the form fields
      setFirstName("");
      setLastName("");
      setEmail("");
    } catch (error) {
      console.error("Error submitting the form:", error); // Log any error

      setFormResult({
        success: false,
        result: "Error submitting the form. Please try again.",
      });
    }

    // Show the success or error message
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" aria-hidden="true">
      <div className="modal-container" role="dialog" aria-labelledby="contact-modal-header">
        <div id="contact-modal-header" className="header">
          Add Contact
        </div>
        <form
          onSubmit={() => {
            handleSubmit;
          }}
          className="form"
          aria-describedby="form-result"
        >
          {/* First Name */}
          <div className="subheader">First Name</div>
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
          <div className="subheader">Last Name</div>
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
          <div className="subheader">Email</div>
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

          {/* Status */}
          <div className="subheader-big">Status</div>
          <div className="toggle-container">
            <button
              type="button"
              onClick={() => {
                setStatus("active");
              }}
              aria-pressed={status === "active"}
              className={`status-button ${status === "active" ? "selected" : ""}`}
            >
              <div className={`status-box ${status === "active" ? "active-box" : ""}`} />
              <div className="button-color-green">
                <span>Active</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => {
                setStatus("inactive");
              }}
              aria-pressed={status === "inactive"}
              className={`status-button ${status === "inactive" ? "selected" : ""}`}
            >
              <div className={`status-box ${status === "inactive" ? "inactive-box" : ""}`} />
              <div className="button-color-red">
                <span>Inactive</span>
              </div>
            </button>
          </div>

          {/* Membership */}
          <div className="subheader-big">Membership</div>
          <div className="toggle-container">
            <button
              type="button"
              onClick={() => {
                setMembership("community");
              }}
              aria-pressed={membership === "community"}
              className={`status-button ${membership === "community" ? "selected" : ""}`}
            >
              <div className="button-color-yellow">
                <span>Community</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => {
                setMembership("family");
              }}
              aria-pressed={membership === "family"}
              className={`status-button ${membership === "family" ? "selected" : ""}`}
            >
              <div className={`status-box ${membership === "family" ? "inactive-box" : ""}`} />
              <div className="button-color-purple">
                <span>Family</span>
              </div>
            </button>
          </div>

          {/* Submit and Cancel */}
          <div className="flex flex-row gap-3 items-center justify-end">
            {/* cancel button */}
            <button type="button" onClick={onClose} className="cancel">
              <>
                <img src="cross_exit.svg" width={14} height={14}></img>
                DISCARD CONTACT
              </>
            </button>

            {/* submit button */}
            <button type="submit" className="submit">
              <>
                <img src="submit_check.svg" width={24} height={24}></img>
                SAVE CONTACT
              </>
            </button>
          </div>
        </form>

        {/* Success/Failure Message */}
        {showMessage && (
          <div className={`form-result ${formResult.success ? "success" : "error"}`}>
            {formResult.result}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
