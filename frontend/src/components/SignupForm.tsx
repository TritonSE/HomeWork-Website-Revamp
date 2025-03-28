"use client";
import { Button, Icon, TextField } from "@tritonse/tse-constellation";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { createUser } from "../api/user";

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [emailError, setEmailError] = useState<string>("");
  const [nameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    // Clear errors when user types
    if (name === "email") setEmailError("");
    if (name === "password") {
      setPasswordError("");
      if (value.length > 0 && value.length < 6) {
        setPasswordError("Password must be at least 6 characters long");
      }
    }
    if (name === "confirmPassword") setConfirmPasswordError("");
  };

  const submitForm = async () => {
    setIsSubmitting(true);

    // Validate password length
    if (formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      setIsSubmitting(false);
      return;
    }

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    try {
      // Verify with backend
      const result = await createUser(formData.name, formData.email, formData.password);
      if (result.success) {
        console.log("User created successfully", result.data);
      } else {
        setEmailError("Email address already in use.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void submitForm();
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Image */}
      <div className="hidden md:block w-1/2 relative">
        <Image
          src="/images/homeworksignup.png"
          alt="Homework Signup"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Right side - Login Form */}
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

          <h1 className="text-3xl mb-2">Create An Account</h1>
          <p className="mb-10 text-[#909090]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#F26522] hover:underline">
              Log In
            </Link>
          </p>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              type="full-name"
              name="full-name"
              value={formData.name}
              onChange={(v) => {
                handleInputChange("name", v);
              }}
              placeholder="Enter your full name"
              errorText={nameError}
            />
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
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={(v) => {
                handleInputChange("password", v);
              }}
              placeholder="Enter password"
              errorText={passwordError}
            />
            <TextField
              label="Confirm Password"
              type="password"
              name="confirm-password"
              value={formData.confirmPassword}
              onChange={(v) => {
                handleInputChange("confirmPassword", v);
              }}
              placeholder="Re-enter password"
              errorText={confirmPasswordError}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#F26522] text-white py-2 rounded-md hover:bg-[#d55416]"
            >
              {isSubmitting ? "Logging in..." : "Continue"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
