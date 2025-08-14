"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import React, { ReactNode, useState } from "react";

export type CollapsibleSectionProps = {
  title: string;
  children: ReactNode;
  initialOpen?: boolean;
};

export default function CollapsibleSection({
  title,
  children,
  initialOpen = false,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(initialOpen);

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[1028px] bg-white px-6 py-8">
        {/* Header bar */}
        <button
          onClick={() => {
            setIsOpen((o) => !o);
          }}
          className="flex items-center w-full bg-[#F05629] text-white px-4 rounded-none"
          style={{ height: "33px" }}
          aria-expanded={isOpen}
        >
          {/* Icon on left */}
          {isOpen ? (
            <ChevronUp size={20} className="mr-2" />
          ) : (
            <ChevronDown size={20} className="mr-2" />
          )}
          <span className="font-normal text-sm leading-5">{title}</span>
        </button>

        {/* Collapsible content */}
        {isOpen && <div className="w-full mt-4">{children}</div>}
      </div>
    </div>
  );
}
