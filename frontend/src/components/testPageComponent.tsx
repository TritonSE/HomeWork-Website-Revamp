"use client";

import React, { useState } from "react";

import CreateUserModal from "@/components/CreateUserModal";
import { useRedirectToLogin } from "@/hooks/useRedirect";

const TestPage: React.FC = () => {
  useRedirectToLogin();
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="flex flex-col h-screen items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">Only viewable if an admin is logged in</h1>

      <button
        onClick={() => {
          setShowModal(true);
        }}
        className="bg-orange-600 text-white px-4 py-2 rounded shadow"
      >
        + Create Account
      </button>

      {showModal && (
        <CreateUserModal
          onClose={() => {
            setShowModal(false);
          }}
        />
      )}
    </main>
  );
};

export default TestPage;
