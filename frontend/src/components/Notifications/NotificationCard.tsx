import React from "react";
import { X } from "lucide-react";

type Props = {
  id: string;
  text: string;
  type: "success" | "error" | "info" | "warning";
  onClose: () => void;
};

const COLORS: Record<Props["type"], string> = {
  success: "bg-green-100 text-green-800",
  error: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
  warning: "bg-yellow-100 text-yellow-800",
};

export const NotificationCard: React.FC<Props> = ({ text, type, onClose }) => (
  <div
    role="alert"
    className={`flex items-start gap-2 rounded-md px-4 py-3 shadow ${COLORS[type]} min-w-[280px]`}
  >
    {/* Left icon (✓, !, etc.) could go here */}
    <span className="flex-1 break-words">{text}</span>

    {/* Dismiss button */}
    <button
      aria-label="Dismiss notification"
      onClick={onClose}
      className="shrink-0 hover:opacity-70"
    >
      <X size={16} />
    </button>
  </div>
);
