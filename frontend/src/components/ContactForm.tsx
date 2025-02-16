"use client";
import { Button, TextField } from "@tritonse/tse-constellation";
import validator from "email-validator";
import phone from "phone";
import React, { useState } from "react";

import { post } from "../api/requests";
type ErrorResponse = {
  error?: string;
  message?: string;
};
const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [fullNameError, setFullNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [phoneNumberError, setPhoneNumberError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  const validateFullName = (name: string): boolean => {
    const fullNameRegex = /^[a-zA-Z]{2,}\s+[a-zA-Z]{2,}(?:\s+[a-zA-Z]{2,})*$/;
    return fullNameRegex.test(name.trim());
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validateFullName(formData.fullName)) {
      setFullNameError("Please enter a valid full name");
      return;
    }
    setFullNameError("");
    if (!validator.validate(formData.email)) {
      setEmailError("Please enter a valid email");
      return;
    }
    setEmailError("");
    if (!phone(formData.phoneNumber).isValid) {
      setPhoneNumberError("Please enter a valid phone number");
      return;
    }
    setPhoneNumberError("");
    setIsSubmitting(true);
    setResponseMessage(null);
    try {
      const response = await post("/contact", formData);
      if (response.ok) {
        setResponseMessage("Thank you for reaching out! We'll get back to you soon.");
        setFormData({ fullName: "", email: "", phoneNumber: "", message: "" });
      } else {
        const errorData = (await response.json()) as ErrorResponse;
        setResponseMessage(errorData.error ?? "Failed to submit your request.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setResponseMessage(error.message || "An error occurred while submitting your request.");
      } else {
        setResponseMessage("An unknown error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="p-8 w-[calc(100%)] sm:w-[calc(48%)]">
        <div className="relative flex flex-col">
          <h1 className="text-[48px] font-golos font-medium text-left pt-8">Get in Touch</h1>
          <p className="text-left mb-2 text-[20px]">
            Send us a quick message and we&apos;ll reach back out to you soon.
          </p>
          <p className="text-left mb-2 text-[20px]">We&apos;re excited to have you here!</p>
          <form
            onSubmit={(e) => {
              void handleSubmit(e);
            }}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div>
              <TextField
                label="Full Name"
                type="name"
                name="name"
                value={formData.fullName}
                onChange={(v) => {
                  handleInputChange("fullName", v);
                }}
                placeholder="Enter your full name"
                errorText={fullNameError}
              />
            </div>
            <div>
              <TextField
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={(v) => {
                  handleInputChange("email", v);
                }}
                placeholder="Enter email"
                errorText={emailError}
              />
            </div>
            <div>
              <TextField
                label="Phone Number"
                type="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={(v) => {
                  handleInputChange("phoneNumber", v);
                }}
                placeholder="Enter phone number"
                errorText={phoneNumberError}
              />
            </div>
            <div>
              <label className="text-[12px] sm:text-[14px] md:text-[16px]">Message</label>
              <textarea
                rows={5}
                placeholder="Write your message (optional)"
                name="message"
                value={formData.message}
                onChange={(e) => {
                  handleInputChange("message", e.target.value);
                }}
                className="mt-1 block w-full p-3 border border-[rgba(0,0,0,.4)] text-[12px] sm:text-[14px] md:text-[16px] rounded-md shadow-sm focus:outline-none focus:border-[var(--tse-constellation-color-secondary-highlight-1)]"
              ></textarea>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 px-5 py-2.5 text-align w-40"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
          {responseMessage && (
            <p style={{ marginTop: "15px", fontSize: "16px", color: "#333" }}>{responseMessage}</p>
          )}
        </div>
      </div>
      <div className="w-[calc(100%)] sm:w-[calc(52%)] flex justify-end">
        <img src="/images/map.png" alt="Map" />
      </div>
    </div>
  );
};

export default ContactForm;
