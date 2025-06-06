"use client";

import React from "react";
import ReactDOM from "react-dom";

type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  count?: number;
  title?: string;
  description?: string;
};

const ConfirmationModal: React.FC<Props> = ({
  open,
  count,
  onCancel,
  onConfirm,
  title,
  description,
}) => {
  if (!open) return null;
  const heading =
    title ??
    (count === 1
      ? "Are you sure you want to delete this contact?"
      : `Are you sure you want to delete these contacts (${String(count ?? 0)})?`);

  const bodyText = description ?? "This action cannot be undone.";

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className="bg-white rounded-md shadow-xl flex flex-col justify-between p-8 text-center"
        style={{ width: 433, height: 324 }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <img
              src="/icons/ic_exclamation.svg"
              alt="!"
              className="absolute inset-0 w-full h-full"
            />
            <img
              src="/icons/ic_exclamationMark.svg"
              alt="!"
              className="absolute inset-0 m-auto w-8 h-8"
            />
          </div>

          <h2 className="text-lg font-semibold leading-snug">{heading}</h2>
          <p
            className="text-center leading-6 text-base font-normal"
            style={{ fontFamily: "'Golos Text', sans-serif" }}
          >
            {bodyText}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-2">
          <button onClick={onCancel} className="h-11 rounded-md bg-[#E05432] text-white">
            No, Cancel
          </button>
          <button onClick={onConfirm} className="h-11 rounded-md bg-gray-400 text-white">
            Yes, Continue
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ConfirmationModal;
