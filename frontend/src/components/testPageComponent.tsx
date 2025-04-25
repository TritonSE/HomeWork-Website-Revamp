"use client";
import React from "react";
import { useRedirectToLogin } from "@/hooks/useRedirect";
const TestPage: React.FC = () => {
  useRedirectToLogin();
  return (
    <main className="flex h-screen items-center justify-center">
      <h1 className="text-2xl font-bold">Only viewable if an admin is logged in</h1>
    </main>
  );
};

export default TestPage;
