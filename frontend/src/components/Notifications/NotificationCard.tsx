import Image from "next/image";
import React from "react";
type Props = {
  id: string;
  text: string;
  type: "success" | "error" | "info" | "warning";
  onClose: () => void;
};

const COLORS: Record<Props["type"], string> = {
  success: "bg-[#B5EFC9] text-black-800",
  error: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
  warning: "bg-yellow-100 text-yellow-800",
};

export const NotificationCard: React.FC<Props> = ({ text, type, onClose }) => (
  <div
    role="alert"
    className={`flex items-center gap-2 rounded-md px-4 py-3 shadow ${COLORS[type]} min-w-[384px]`}
  >
    <Image src="/images/ic_success.png" alt="a" width={38} height={38} />
    <span className="flex-1 break-words font-golos text-[16px]">{text}</span>

    <button
      aria-label="Dismiss notification"
      onClick={onClose}
      className="shrink-0 hover:opacity-70 px-4"
    >
      <Image src="/images/icon.png" alt="icon" width={14} height={14} />
    </button>
  </div>
);
