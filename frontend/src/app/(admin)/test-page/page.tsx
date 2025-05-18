"use client";

import React, { useState } from "react";

import TestPageComponent from "../../..//components/testPageComponent";
import ContactModal from "../../../components/ContactModal";

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
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      />
    </>
  );
};

export default TestPage;
