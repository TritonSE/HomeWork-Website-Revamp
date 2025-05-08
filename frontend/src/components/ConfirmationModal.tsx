"use client";

import React, { FC } from "react";
import { Icon } from "@tritonse/tse-constellation"; // adjust import path if different

interface ConfirmationModalProps {
  open: boolean;
  selectedCount: number;
  onCancel: () => void;
  onConfirm: () => void;
}

/**
 * A centered confirmation dialog used when the user attempts to delete contacts.
 *
 * Dimensions: 423 px × 324 px
 * Colours:
 *   – Primary (danger): #F05629
 *   – Neutral button:    #909090
 */
const ConfirmationModal: FC<ConfirmationModalProps> = ({
  open,
  selectedCount,
  onCancel,
  onConfirm,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className="flex flex-col items-center rounded-lg bg-white p-8"
        style={{ width: 423, height: 324 }}
      >
        {/* Alert icon */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#F05629]">
          <Icon name="ic_alert" fill="white" className="h-8 w-8" />
        </div>

        <h2 className="mb-3 text-center text-2xl font-semibold leading-snug text-[#1B1B1B]">
          Are you sure you want to<br />
          delete these contacts ({selectedCount})?
        </h2>

        <p className="mb-8 text-center text-base text-[#1B1B1B] underline">
          This action cannot be undone.
        </p>

        <div className="flex w-full flex-col gap-3 px-4">
          <button
            className="h-12 w-full rounded-md bg-[#F05629] text-md font-medium text-white"
            onClick={onCancel}
          >
            No, Cancel
          </button>
          <button
            className="h-12 w-full rounded-md bg-[#909090] text-md font-medium text-white"
            onClick={onConfirm}
          >
            Yes, Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
