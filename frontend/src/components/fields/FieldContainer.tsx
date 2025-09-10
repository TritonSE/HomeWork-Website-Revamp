import React from "react";

type FieldContainerProps = {
  children: React.ReactNode;
};

export const FieldContainer: React.FC<FieldContainerProps> = ({ children }) => {
  return <div className="p-4 border rounded-lg space-y-4">{children}</div>;
};
