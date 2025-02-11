"use client";
import { Button, Icon, TextField } from "@tritonse/tse-constellation";
import { signInWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { verifyUser } from "../api/user";
import { auth } from "../firebase/firebase";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    // Clear errors when user types
    if (name === "email") setEmailError("");
    if (name === "password") setPasswordError("");
  };

  const submitForm = async () => {
    setIsSubmitting(true);

    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      const token = await userCredential.user.getIdToken();

      // Verify with backend
      const result = await verifyUser(token);
      if (result.success) {
        console.log("User verified", result.data);
      } else {
        setEmailError("Authentication failed. Please try again.");
      }
    } catch (error) {
      if (error instanceof Error) {
        // Handle Firebase auth errors
        if (error.message.includes("auth/invalid-email")) {
          setEmailError("Invalid email address");
        } else if (error.message.includes("auth/wrong-password")) {
          setPasswordError("Incorrect password");
        } else if (error.message.includes("auth/user-not-found")) {
          setEmailError("No account found with this email");
        } else {
          setEmailError("Login failed. Please try again.");
        }
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
          src="/images/homeworkAdmin.png"
          alt="Homework Admin"
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

          <h1 className="text-3xl mb-2">Log In</h1>
          <p className="mb-10 text-[#909090]">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#F26522] hover:underline">
              Sign Up
            </Link>
          </p>

          <form onSubmit={handleSubmit}>
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

            <div className="flex flex-col mb-8">
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
              <div className="flex justify-end -mt-5">
                <Link href="/forgot-password" className="text-[#F26522] text-sm hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </div>

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

export default LoginForm;
