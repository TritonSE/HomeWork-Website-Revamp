"use client";
import { Button, Icon, TextField } from "@tritonse/tse-constellation";
import { sendPasswordResetEmail } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { auth } from "../firebase/firebase";

const ResetForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  const handleInputChange = (value: string) => {
    setEmail(value);
    setEmailError("");
  };

  const submitForm = async () => {
    setIsSubmitting(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setIsEmailSent(true);
    } catch (error) {
      if (error instanceof Error) {
        setEmailError("Failed to send reset email. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void submitForm();
  };

  const handleTryAgain = () => {
    setIsEmailSent(false);
    setEmail("");
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Image */}
      <div className="hidden md:block w-1/2 relative">
        <Image
          src="/images/homeworkAdmin.png"
          alt="Homework Admin"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <div className="flex items-start">
            <Link href="/" className="text-[#B4B4B4] hover:underline flex items-start gap-2">
              <Icon name="ic_arrowback" fill="#B4B4B4" size={16} />
              Back to Homework website
            </Link>
          </div>
          {/* Logo */}
          <div className="mt-10 mb-5 flex justify-left">
            <Image src="/images/homeworkLogo.png" alt="Homework Logo" width={155} height={86} />
          </div>

          {!isEmailSent ? (
            <>
              <h1 className="text-3xl mb-2">Forgot Password</h1>
              <p className="mb-4 text-[#909090]">
                Don&apos;t worry. Resetting your password is easy, just tell us the email address
                you registered.
              </p>

              <form onSubmit={handleSubmit}>
                <TextField
                  label="Email Address"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  errorText={emailError}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#F26522] text-white py-2 rounded-md hover:bg-[#d55416]"
                >
                  {isSubmitting ? "Submitting" : "Next"}
                </Button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-3xl mb-2">Reset Your Password</h1>
              <p className="mb-4 text-[#909090]">
                We sent a reset password email to <span className="font-semibold">{email}</span>.
                Please click the reset password link to set your new password.
              </p>

              <div className="mt-4">
                <p className="text-sm text-[#000]">Haven&apos;t received the email?</p>
                <p className="text-sm text-[#000]">
                  Please check your spam folder, or{" "}
                  <button onClick={handleTryAgain} className="text-[#F26522] hover:underline">
                    try again
                  </button>
                  .
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetForm;
