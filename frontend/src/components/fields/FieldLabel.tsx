import React from "react";

type FieldLabelProps = {
  children: React.ReactNode;
};

export const FieldLabel: React.FC<FieldLabelProps> = ({ children }) => {
  return <label className="block text-sm font-medium text-gray-700 mb-1">{children}</label>;
};
