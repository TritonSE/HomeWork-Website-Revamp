"use client";

import React, { useState } from "react";

import TestPageComponent from "../../..//components/testPageComponent";
import AddContactModal from "../../../components/AddContactModal";

const TestPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <TestPageComponent />
      <button
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Open Modal
      </button>
      <AddContactModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      />
    </>
  );
};

export default TestPage;
