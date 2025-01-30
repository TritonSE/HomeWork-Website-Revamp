"use client";
import { Button, TextField, Icon } from "@tritonse/tse-constellation";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [emailError, setEmailError] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleInputChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add Later
    };

    return (
        <div className="flex h-screen">
            {/* Left side - Image */}
            <div className="hidden md:block w-1/2 relative">
                <Image
                    src="/images/homeworkAdmin.png"
                    alt="Homework Admin"
                    layout="fill"
                    objectFit="cover"
                />
            </div>

            {/* Right side - Login Form */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-8">
                <div className="w-full max-w-md">
                    <div className="flex items-start">
                        <Link href="/" className="text-[#B4B4B4] hover:underline flex items-start gap-2">
                            <Icon name="ic_arrowback" fill="#B4B4B4" size={16} />
                            Back to Homework website
                        </Link>
                    </div>
                    {/* Logo */}
                    <div className="mb-8 flex justify-left">
                        <Image
                            src="/images/homeworkLogo.png"
                            alt="Homework Logo"
                            width={155}
                            height={86}
                        />
                    </div>

                    <h1 className="text-3xl mb-2">Log In</h1>
                    <p className="mb-8 text-[#909090]">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-[#F26522] hover:underline">
                            Sign Up
                        </Link>
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <TextField
                            label="Email Address"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={(v) => handleInputChange("email", v)}
                            placeholder="Enter email"
                            errorText={emailError}
                        />

                        <div>
                            <TextField
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={(v) => handleInputChange("password", v)}
                                placeholder="Enter password"
                            />
                            <div className="flex justify-end mt-1">
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
                            Continue
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
